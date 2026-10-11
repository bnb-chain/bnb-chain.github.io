"""Check same-site links in rendered documentation bodies, excluding theme navigation."""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit


class BodyLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_article = False
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == 'article': self.in_article = True
        if self.in_article:
            attrs = dict(attrs)
            for attr in ('href', 'src', 'poster'):
                if attrs.get(attr): self.links.append(attrs[attr])

    def handle_endtag(self, tag):
        if tag == 'article': self.in_article = False


def check(site, site_url):
    host = urlsplit(site_url).netloc
    failures = []
    count = 0
    for file in site.rglob('*.html'):
        parser = BodyLinks()
        parser.feed(file.read_text(encoding='utf-8'))
        relative = file.relative_to(site).as_posix()
        base = urljoin(site_url.rstrip('/') + '/', relative)
        for href in parser.links:
            target = urlsplit(urljoin(base, href))
            if target.netloc != host or target.scheme not in ('http', 'https'):
                continue
            # This separately built SDK site shares the docs hostname. Its endpoints
            # were verified live; its files are not part of this MkDocs deployment.
            if target.path.startswith('/greenfield-js-sdk/'):
                continue
            count += 1
            if not (site / unquote(target.path.lstrip('/'))).exists():
                failures.append(f'{relative}: {href}')
    if failures:
        raise SystemExit('Broken documentation links:\n' + '\n'.join(sorted(set(failures))))
    print(f'Checked {count} same-site documentation links and assets: all resolve.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', nargs='?', type=Path, default=Path('site'))
    parser.add_argument('--site-url', default='https://docs.bnbchain.org/')
    args = parser.parse_args()
    check(args.site, args.site_url)
