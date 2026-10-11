import assert from 'node:assert/strict';
import test from 'node:test';
import { handleRequest, markdownPath, prefersMarkdown } from './worker.mjs';

const base = 'https://docs.bnbchain.org';
function origin(responses) {
  const calls = [];
  const fetch = async (request) => {
    calls.push(request);
    const item = responses[new URL(request.url).pathname];
    return new Response(item?.body || null, { status: item?.status ?? (item ? 200 : 404), headers: item?.headers || {} });
  };
  return { fetch, calls };
}

test('only explicit, preferred Markdown opts into negotiation', () => {
  for (const header of ['', '*/*', 'text/html,application/xhtml+xml,*/*;q=0.8', 'text/markdown;q=0', 'text/markdown;q=0.5,text/html', 'text/markdown;q=bogus']) assert.equal(prefersMarkdown(header), false, header);
  for (const header of ['text/markdown', 'TEXT/MARKDOWN', 'text/markdown,text/html;q=0.8', 'text/markdown, */*;q=0.1', 'text/*;q=0.8,text/markdown']) assert.equal(prefersMarkdown(header), true, header);
});

test('maps homepage and directory/index URLs; skips ordinary static resources', () => {
  for (const [path, md] of [['/', '/index.md'], ['/guide/', '/guide.md'], ['/guide', '/guide.md'], ['/guide/index.html', '/guide/index.md']]) assert.equal(markdownPath(path), md);
  for (const path of ['/a.png', '/a.json', '/llms.txt', '/guide.md']) assert.equal(markdownPath(path), null);
});

test('negotiates Markdown without changing the client URL and removes HTML validators', async () => {
  const mock = origin({ '/guide.md': { body: '# Guide', headers: { 'Content-Type': 'text/plain', ETag: '"md"', 'Cache-Control': 'max-age=600', Vary: 'Origin' } } });
  const response = await handleRequest(new Request(`${base}/guide/?language=en`, { headers: { Accept: 'text/markdown', 'If-None-Match': '"html"' } }), mock.fetch);
  assert.equal(await response.text(), '# Guide');
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Vary'), 'Origin, Accept');
  assert.equal(response.headers.get('ETag'), '"md"');
  assert.equal(response.headers.get('Cache-Control'), 'max-age=600');
  assert.equal(mock.calls[0].url, `${base}/guide.md?language=en`);
  assert.equal(mock.calls[0].headers.has('If-None-Match'), false);
});

test('HTML and missing/soft-404 Markdown fall back to the original origin response', async () => {
  for (const md of [{ status: 404 }, { body: '<html>missing</html>', headers: { 'Content-Type': 'text/html' } }]) {
    const mock = origin({ '/guide.md': md, '/guide/': { status: 301, headers: { Location: '/new/' } } });
    const response = await handleRequest(new Request(`${base}/guide/`, { headers: { Accept: 'text/markdown' } }), mock.fetch);
    assert.equal(response.status, 301);
    assert.equal(response.headers.get('Location'), '/new/');
    assert.equal(response.headers.get('Vary'), 'Accept');
    assert.equal(mock.calls.length, 2);
  }
  const mock = origin({ '/guide/': { body: '<html>Guide</html>', headers: { 'Content-Type': 'text/html' } } });
  const response = await handleRequest(new Request(`${base}/guide/`, { headers: { Accept: 'text/html' } }), mock.fetch);
  assert.equal(await response.text(), '<html>Guide</html>');
  assert.equal(response.headers.get('Vary'), 'Accept');
  assert.equal(mock.calls.length, 1);
});

test('HEAD returns no body; unknown pages retain a real 404', async () => {
  const mock = origin({ '/index.md': { body: '# Home' } });
  const head = await handleRequest(new Request(`${base}/`, { method: 'HEAD', headers: { Accept: 'text/markdown' } }), mock.fetch);
  assert.equal(await head.text(), '');
  assert.equal(head.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(mock.calls[0].method, 'HEAD');
  const missing = await handleRequest(new Request(`${base}/missing/`, { headers: { Accept: 'text/markdown' } }), mock.fetch);
  assert.equal(missing.status, 404);
});

test('direct Markdown has the right type and static/protocol resources pass through', async () => {
  const mock = origin({ '/guide.md': { body: '# Guide', headers: { 'Content-Type': 'text/plain' } } });
  const response = await handleRequest(new Request(`${base}/guide.md`), mock.fetch);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  for (const [path, method] of [['/a.png', 'GET'], ['/.well-known/mcp', 'GET'], ['/greenfield-js-sdk/api/account/', 'GET'], ['/mcp', 'POST']]) {
    const mock = origin({ [path]: { body: 'unchanged' } });
    const response = await handleRequest(new Request(base + path, { method, headers: { Accept: 'text/markdown' } }), mock.fetch);
    assert.equal(await response.text(), 'unchanged');
    assert.equal(mock.calls.length, 1);
    assert.equal(mock.calls[0].url, base + path);
    assert.equal(response.headers.has('Vary'), false);
  }
});
