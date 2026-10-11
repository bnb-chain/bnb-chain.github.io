"""Export the rendered body of every public MkDocs page as portable Markdown."""

import re
from pathlib import Path
from urllib.parse import urljoin, urlsplit

from bs4 import BeautifulSoup
from markdownify import MarkdownConverter

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


class PortableMarkdown(MarkdownConverter):
    def convert_pre(self, element, text, parent_tags):
        result = super().convert_pre(element, text, parent_tags)
        if not result or '```' not in text:
            return result
        fence = '`' * max(3, max(len(run) for run in re.findall(r'`+', text)) + 1)
        result = result.replace('```', fence, 1)
        head, tail = result.rsplit('```', 1)
        return head + fence + tail


def export_markdown(page, html, config, page_urls):
    """Convert only the content body, never navigation or theme boilerplate."""
    soup = BeautifulSoup(html, 'html.parser')
    for tag in soup.select('script, style, .headerlink, .tabbed-labels'):
        tag.decompose()
    heading = soup.find('h1')
    if heading:
        heading.extract()
        soup.insert(0, heading)
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
    body = PortableMarkdown(heading_style='ATX', bullets='-', code_language_callback=code_language).convert(str(soup)).strip()
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
    redirects = config.plugins['redirects'].config['redirect_maps'] if getattr(config, 'plugins', None) and 'redirects' in config.plugins else {}
    for source, target in redirects.items():
        if source in _pages and target in _pages:
            page_urls[_pages[source][0].canonical_url] = page_urls[_pages[target][0].canonical_url]
    exports = []
    for page, html in _pages.values():
        original = page
        target = redirects.get(page.file.src_uri)
        if target in _pages:
            page, html = _pages[target]
        content = export_markdown(page, html, config, page_urls)
        if original.file.src_uri not in redirects:
            exports.append((page, content))
        page = original
        # Support /topic.md, /topic/index.md and /topic/.md (appending .md to /topic/).
        paths = {markdown_path(page.url).lstrip('/'), page.file.src_uri}
        if not page.url or page.url.endswith('/'):
            paths.add(page.url + '.md')
        for relative in paths:
            target = site / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_text(content, encoding='utf-8')
    write_indexes(config, exports)


def corpus_section(title, url, content):
    """Demote document headings without altering headings inside code fences."""
    lines = content.splitlines()[1:]  # The linked section title replaces the page H1.
    output = ['## [' + title + '](' + url + ')', '']
    fence = None
    for line in lines:
        stripped = line.lstrip()
        match = re.match(r'^(`{3,}|~{3,})(.*)$', stripped)
        if match:
            marker = match[1]
            if fence is None:
                fence = marker
            elif marker[0] == fence[0] and len(marker) >= len(fence) and not match[2].strip():
                fence = None
        if fence is None and line.startswith('#'):
            line = '#' + line if not line.startswith('######') else line
        output.append(line)
    return '\n'.join(output).strip() + '\n\n'


def write_indexes(config, exports):
    site = Path(config.site_dir)
    names = {'announce': 'Announcements', 'bnb-smart-chain': 'BNB Smart Chain',
             'bnb-opbnb': 'opBNB', 'bnb-greenfield': 'BNB Greenfield',
             'bc-fusion': 'BNB Chain Fusion', 'developer-kit': 'Developer Kit',
             'showcase': 'Showcases', 'faq': 'FAQ', 'join-ecosystem': 'Join the Ecosystem'}
    header = '# BNB Chain Documentation\n\n> Documentation for BNB Smart Chain, opBNB, and BNB Greenfield.\n> The links below provide page-level Markdown for all published documentation.\n\n'
    header += 'For one complete snapshot, see [llms-full.txt](' + urljoin(config.site_url, 'llms-full.txt') + ').\n\n'
    groups = {}
    full = '# BNB Chain Documentation — Full Content\n\n> Complete Markdown snapshot of all published documentation.\n> Discover individual pages in [llms.txt](' + urljoin(config.site_url, 'llms.txt') + ').\n\n'
    bsc = '# BNB Smart Chain Documentation — Full Content\n\n> Markdown snapshot of the BNB Smart Chain documentation.\n> Discover all chains in [llms.txt](' + urljoin(config.site_url, 'llms.txt') + ').\n\n'
    for page, content in sorted(exports, key=lambda item: item[0].file.src_uri):
        title = BeautifulSoup(page.title, 'html.parser').get_text().replace('[', '\\[').replace(']', '\\]').replace('\n', ' ')
        url = urljoin(config.site_url, markdown_path(page.url).lstrip('/'))
        group = page.file.src_uri.split('/')[0]
        group = names.get(group, 'General')
        groups.setdefault(group, []).append('- [' + title + '](' + url + ')')
        section = corpus_section(title, url, content)
        full += section
        if page.file.src_uri.startswith('bnb-smart-chain/'):
            bsc += section
    index = header + '\n\n'.join('## ' + name + '\n\n' + '\n'.join(links) for name, links in groups.items()) + '\n'
    if len(index) >= 50000:
        raise ValueError('llms.txt exceeds the 50,000-character single-fetch budget')
    (site / 'llms.txt').write_text(index, encoding='utf-8')
    (site / 'llms-full.txt').write_text(full, encoding='utf-8')
    (site / 'llms-full-bnb-smart-chain.txt').write_text(bsc, encoding='utf-8')
