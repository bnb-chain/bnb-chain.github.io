"""Publish skill and MCP discovery resources without adding them to human navigation."""
import hashlib
import json
from pathlib import Path
from urllib.parse import urljoin

from mkdocs.plugins import event_priority
import yaml


@event_priority(-100)
def on_post_build(config):
    # Run after Markdown/index generation when the export hook is also installed.
    site = Path(config.site_dir)
    source = Path(config.config_file_path).parent / 'agent-resources/SKILL.md'
    skill = source.read_bytes()
    meta = yaml.safe_load(skill.decode('utf-8').split('---', 2)[1])
    name = meta['name']
    for path in ('skill.md', 'SKILL.md', f'.well-known/skills/{name}/SKILL.md',
                 f'.well-known/agent-skills/{name}/SKILL.md'):
        target = site / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(skill)
    modern = {'$schema': 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
              'skills': [{'name': name, 'type': 'skill-md', 'description': meta['description'],
                          'url': f'/.well-known/agent-skills/{name}/SKILL.md',
                          'digest': 'sha256:' + hashlib.sha256(skill).hexdigest()}]}
    legacy = {'skills': [{'name': name, 'description': meta['description'], 'files': ['SKILL.md']}]}
    endpoint = 'https://api.superintern.ai/agent/async/mcp/mcp'
    mcp = {'version': '1.0.0', 'transport': 'http', 'url': endpoint,
           'servers': [{'name': 'bnbchain-askai', 'url': endpoint, 'transport': 'http',
                        'authentication': 'none'}]}
    for path, value in (('.well-known/agent-skills/index.json', modern),
                        ('.well-known/skills/index.json', legacy),
                        ('.well-known/mcp.json', mcp), ('.well-known/mcp', mcp), ('mcp.json', mcp)):
        target = site / path
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8')
    index = site / 'llms.txt'
    if index.exists():
        text = index.read_text(encoding='utf-8')
        text += '\n## Agent resources\n\n'
        text += '- [BNB Chain documentation skill](' + urljoin(config.site_url, 'skill.md') + ')\n'
        text += '- [MCP discovery](' + urljoin(config.site_url, '.well-known/mcp.json') + '): Public read-only documentation search.\n'
        index.write_text(text, encoding='utf-8')
