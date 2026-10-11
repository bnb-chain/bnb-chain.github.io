/** Optional Cloudflare Worker route in front of the existing GitHub Pages origin. */
function quality(accept, type) {
  let best = -1;
  let q = 0;
  for (const entry of accept.toLowerCase().split(',')) {
    const [media, ...params] = entry.trim().split(';');
    const specificity = media === type ? 2 : media === `${type.split('/')[0]}/*` ? 1 : media === '*/*' ? 0 : -1;
    if (specificity < 0) continue;
    const weight = params.find((p) => p.trim().startsWith('q='));
    const value = weight ? Number(weight.trim().slice(2)) : 1;
    const valid = Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0;
    if (specificity > best) { best = specificity; q = valid; }
    else if (specificity === best) q = Math.max(q, valid);
  }
  return q;
}

export function prefersMarkdown(accept) {
  // A browser's */* must never opt it into Markdown.
  if (!accept.toLowerCase().split(',').some((entry) => entry.trim().split(';')[0] === 'text/markdown')) return false;
  const markdown = quality(accept, 'text/markdown');
  const html = Math.max(quality(accept, 'text/html'), quality(accept, 'application/xhtml+xml'));
  return markdown > 0 && markdown >= html;
}

export function markdownPath(path) {
  if (path === '/') return '/index.md';
  if (path.endsWith('/index.html')) return path.slice(0, -5) + '.md';
  if (path.endsWith('/')) return path.slice(0, -1) + '.md';
  if (!path.split('/').pop().includes('.')) return path + '.md';
  return null;
}

function withVary(response, markdown = false, method = 'GET') {
  const headers = new Headers(response.headers);
  const vary = headers.get('Vary') || '';
  if (vary !== '*' && !vary.toLowerCase().split(',').map((v) => v.trim()).includes('accept')) {
    headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
  }
  if (markdown && response.ok) headers.set('Content-Type', 'text/markdown; charset=utf-8');
  return new Response(method === 'HEAD' ? null : response.body, { status: response.status, statusText: response.statusText, headers });
}

export async function handleRequest(request, originFetch = fetch) {
  const url = new URL(request.url);
  // These resources and the separately hosted SDK site have their own delivery rules.
  if (!['GET', 'HEAD'].includes(request.method) || url.pathname.startsWith('/.well-known/') || url.pathname.startsWith('/greenfield-js-sdk/')) {
    return originFetch(request);
  }
  if (url.pathname.endsWith('.md')) {
    const response = await originFetch(request);
    const type = response.headers.get('Content-Type') || '';
    return withVary(response, response.ok && !type.includes('text/html'), request.method);
  }
  const target = markdownPath(url.pathname);
  if (!target) return originFetch(request);
  if (prefersMarkdown(request.headers.get('Accept') || '')) {
    const mdUrl = new URL(url);
    mdUrl.pathname = target;
    const headers = new Headers(request.headers);
    headers.set('Accept', 'text/plain, text/markdown');
    // Validators for an HTML representation must not be reused for its Markdown body.
    for (const name of ['If-None-Match', 'If-Modified-Since', 'If-Range', 'Range']) headers.delete(name);
    const response = await originFetch(new Request(mdUrl, { method: request.method, headers, redirect: 'manual' }));
    const type = response.headers.get('Content-Type') || '';
    if (response.ok && !type.includes('text/html')) {
      return withVary(response, true, request.method);
    }
    // Legacy redirects, nonexistent pages, or unavailable exports use the origin's
    // real response, including its status and redirect behavior.
    if (response.body) await response.body.cancel();
  }
  return withVary(await originFetch(request), false, request.method);
}

export default { fetch(request) { return handleRequest(request); } };
