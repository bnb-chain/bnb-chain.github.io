"""Check agent resources against the built sitemap (no network required)."""
import argparse
import re
from pathlib import Path
from urllib.parse import unquote, urlsplit
from xml.etree import ElementTree as ET


def check_fences(text, name):
    opening = None
    for line in text.splitlines():
        match = re.match(r'^\s*(`{3,}|~{3,})(.*)$', line)
        if not match:
            continue
        marker = match[1]
        if opening is None:
            opening = marker
        elif marker[0] == opening[0] and len(marker) >= len(opening) and not match[2].strip():
            opening = None
    assert opening is None, 'Unclosed code fence in ' + name


def check(site):
    index = (site / 'llms.txt').read_text(encoding='utf-8')
    full = (site / 'llms-full.txt').read_text(encoding='utf-8')
    assert len(index) < 50000, 'llms.txt exceeds the single-fetch budget'
    for name, text in [('llms.txt', index), ('llms-full.txt', full)]:
        assert text.startswith('# '), name + ' needs a document title'
        assert re.search(r'^> ', text, re.M), name + ' needs an introduction'
        assert re.search(r'^## ', text, re.M), name + ' needs sections'
    check_fences(full, 'llms-full.txt')
    links = set(re.findall(r'\]\((https?://[^)]+)\)', index))
    urls = [node.text for node in ET.parse(site / 'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    for url in urls:
        path = urlsplit(url).path.rstrip('/') or '/index'
        md_url = urlsplit(url)._replace(path=path + '.md').geturl()
        assert md_url in links, 'Page absent from llms.txt: ' + url
        target = site / unquote(path.lstrip('/') + '.md')
        content = target.read_text(encoding='utf-8')
        assert content.startswith('# '), 'Missing Markdown title: ' + url
        check_fences(content, url)
        assert 'llms.txt' in content[:1000], 'Missing Markdown discovery directive: ' + url
        assert md_url in full, 'Page absent from llms-full.txt: ' + url
    print(f'Agent exports: {len(urls)}/{len(urls)} sitemap pages; index {len(index):,} characters; full corpus {len(full):,} characters.')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', nargs='?', type=Path, default=Path('site'))
    check(parser.parse_args().site)
