"""Export the rendered body of every public MkDocs page as portable Markdown."""

from pathlib import Path
from urllib.parse import urljoin, urlsplit

from bs4 import BeautifulSoup
from markdownify import markdownify

# Reset for each build, including repeated builds under `mkdocs serve`.
_pages = {}


def markdown_path(url):
    """Canonical .md variant of a MkDocs URL, including the homepage."""
    path = urlsplit(url).path
    return (path.rstrip('/') or '/index') + '.md' if not path or path.endswith('/') else str(Path(path).with_suffix('.md'))


def on_pre_build(config):
    _pages.clear()


def on_page_content(html, page, config, files):
    _pages[page.file.src_uri] = (page, html)
    return html


def code_language(element):
    code = element.find('code')
    for tag in (element, code):
        if tag:
            for cls in tag.get('class', []):
                if cls.startswith('language-'):
                    return cls[len('language-'):]
    return None


def export_markdown(page, html, config, page_urls):
    """Convert only the content body, never navigation or theme boilerplate."""
    soup = BeautifulSoup(html, 'html.parser')
    for tag in soup.select('script, style, .headerlink, .tabbed-labels'):
        tag.decompose()
    # The tab panels themselves remain in document order, including inactive tabs.
    for tag in soup.find_all(['a', 'img']):
        attr = 'href' if tag.name == 'a' else 'src'
        value = tag.get(attr)
        if not value or value.startswith(('mailto:', 'tel:', 'data:')):
            continue
        absolute = urljoin(page.canonical_url, value)
        parsed = urlsplit(absolute)
        base = parsed._replace(query='', fragment='').geturl()
        target = page_urls.get(base)
        if target:
            absolute = target + ('?' + parsed.query if parsed.query else '') + ('#' + parsed.fragment if parsed.fragment else '')
        tag[attr] = absolute
    body = markdownify(str(soup), heading_style='ATX', bullets='-', code_language_callback=code_language).strip()
    if not soup.find('h1'):
        body = '# ' + page.title + '\n\n' + body
    directive = '> For the complete documentation index, see [llms.txt](' + urljoin(config.site_url, 'llms.txt') + ').'
    # Keep the page heading first, and place the discovery directive immediately below.
    heading, separator, rest = body.partition('\n')
    return heading + '\n\n' + directive + '\n\n' + rest.lstrip() + '\n'


def on_post_build(config):
    page_urls = {page.canonical_url: urljoin(config.site_url, markdown_path(page.url).lstrip('/'))
                 for page, _ in _pages.values()}
    site = Path(config.site_dir)
    for page, html in _pages.values():
        content = export_markdown(page, html, config, page_urls)
        # Support /topic.md, /topic/index.md and /topic/.md (appending .md to /topic/).
        paths = {markdown_path(page.url).lstrip('/'), page.file.src_uri}
        if not page.url or page.url.endswith('/'):
            paths.add(page.url + '.md')
        for relative in paths:
            target = site / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding='utf-8')
