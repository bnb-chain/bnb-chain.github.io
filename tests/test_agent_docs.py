"""Regression checks for the public Markdown export contract."""
import importlib.util
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace

spec = importlib.util.spec_from_file_location('agent_docs', Path(__file__).parents[1] / 'hooks/agent_docs.py')
agent_docs = importlib.util.module_from_spec(spec)
spec.loader.exec_module(agent_docs)


class MarkdownExports(unittest.TestCase):
    def test_url_variants(self):
        for url, expected in [('', '/index.md'), ('/', '/index.md'), ('topic/', 'topic.md'),
                              ('topic/index.html', 'topic/index.md')]:
            self.assertEqual(agent_docs.markdown_path(url), expected)

    def test_body_preserves_tabs_code_and_portable_links(self):
        page = SimpleNamespace(title='Guide', canonical_url='https://docs.example/guide/')
        config = SimpleNamespace(site_url='https://docs.example/')
        html = '<h1>Guide<a class="headerlink">¶</a></h1><div class="tabbed-labels">Tab labels</div><div><h2>Python</h2><pre><code class="language-python">print(1)\n</code></pre></div><div><h2>JavaScript</h2><pre><code>run()</code></pre></div><a href="../other/">Other</a><img src="../img/test.png"><script>hidden()</script>'
        md = agent_docs.export_markdown(page, html, config, {'https://docs.example/other/': 'https://docs.example/other.md'})
        for value in ('# Guide', 'llms.txt', '## Python', '## JavaScript', '```python', 'print(1)', 'run()', 'https://docs.example/other.md', 'https://docs.example/img/test.png'):
            self.assertIn(value, md)
        for value in ('Tab labels', 'hidden()', '¶'): self.assertNotIn(value, md)

    def test_build_generates_aliases_and_resets_between_builds(self):
        with tempfile.TemporaryDirectory() as tmp:
            config = SimpleNamespace(site_url='https://docs.example/', site_dir=tmp)
            page = SimpleNamespace(title='Topic', canonical_url='https://docs.example/topic/', url='topic/', file=SimpleNamespace(src_uri='topic/index.md'))
            agent_docs.on_pre_build(config)
            agent_docs.on_page_content('<p>Complete content</p>', page, config, None)
            agent_docs.on_post_build(config)
            for name in ('topic.md', 'topic/index.md', 'topic/.md'):
                self.assertIn('Complete content', (Path(tmp) / name).read_text())
            agent_docs.on_pre_build(config)
            self.assertEqual(agent_docs._pages, {})


if __name__ == '__main__': unittest.main()
