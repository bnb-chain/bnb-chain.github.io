import hashlib
import importlib.util
import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
import yaml

spec = importlib.util.spec_from_file_location('agent_discovery', Path(__file__).parents[1] / 'hooks/agent_discovery.py')
discovery = importlib.util.module_from_spec(spec)
spec.loader.exec_module(discovery)


class Discovery(unittest.TestCase):
    def test_public_skill_aliases_digest_and_mcp_manifest(self):
        with tempfile.TemporaryDirectory() as tmp:
            config = SimpleNamespace(site_dir=tmp, site_url='https://docs.example/', config_file_path=str(Path(__file__).parents[1] / 'mkdocs.yml'))
            discovery.on_post_build(config)
            site = Path(tmp)
            skill = (site / 'skill.md').read_bytes()
            meta = yaml.safe_load(skill.decode().split('---', 2)[1])
            self.assertEqual(meta['name'], 'bnb-chain-docs')
            self.assertTrue(meta['description'])
            self.assertEqual((site / 'SKILL.md').read_bytes(), skill)
            entry = json.loads((site / '.well-known/agent-skills/index.json').read_text())['skills'][0]
            self.assertEqual((site / entry['url'].lstrip('/')).read_bytes(), skill)
            self.assertEqual(entry['digest'], 'sha256:' + hashlib.sha256(skill).hexdigest())
            mcp = json.loads((site / '.well-known/mcp.json').read_text())
            self.assertEqual(mcp['url'], mcp['servers'][0]['url'])
            self.assertEqual(mcp['servers'][0]['authentication'], 'none')
            self.assertEqual(json.loads((site / '.well-known/mcp').read_text()), mcp)


if __name__ == '__main__': unittest.main()
