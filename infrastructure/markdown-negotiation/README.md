# Markdown content negotiation

This optional Cloudflare Worker lets agents request the existing documentation URL
with `Accept: text/markdown`. It fetches the matching static `.md` export from the
GitHub Pages origin and returns it with `Content-Type: text/markdown; charset=utf-8`.
HTML clients continue to receive HTML. It also sets the Markdown content type on
direct `.md` requests.

Deploy the Markdown-export PR first. Merging this PR alone does **not** change HTTP
responses: GitHub Pages cannot execute the Worker. This repository's existing Pages
deployment stays in place. A hosting owner must install the Worker route separately.

## Validate

With Node.js 22 or newer, from the repository root:

```bash
node --test infrastructure/markdown-negotiation/worker.test.mjs
```

The tests use an in-memory origin and exercise quality weights, HTML fallbacks,
static resources, GET/HEAD, conditional headers, and response caching metadata.

## Deploy on an existing Cloudflare zone

Use this option only if `docs.bnbchain.org` already uses a proxied Cloudflare DNS
record and you administer the `bnbchain.org` zone. Review other Workers on this
route before deploying. For a different proxy, implement the same routing contract
below in that service; there is no need to migrate the documentation site.

1. Merge the Markdown-export PR and let GitHub Pages finish deploying.
2. Check that `https://docs.bnbchain.org/index.md` and a nested `.md` export resolve.
3. Copy `wrangler.example.jsonc` to a local `wrangler.jsonc` beside `worker.mjs`.
   Set the account/zone details for your deployment. Do not commit credentials.
4. Authenticate Wrangler with your normal deployment credentials and deploy:

   ```bash
   cd infrastructure/markdown-negotiation
   npx wrangler deploy --config wrangler.jsonc
   ```

5. Keep the existing origin DNS target. This is a **Worker route**, which permits
   `fetch()` to reach the existing origin; a Worker custom domain would change that
   behavior. See [Cloudflare routes](https://developers.cloudflare.com/workers/configuration/routing/routes/).
6. Ensure any additional CDN cache rules separate the HTML and Markdown variants.
   The Worker fetches different origin URLs and sends `Vary: Accept` to downstream
   caches. Purge old HTML entries if another cache sits in front of the Worker.

## Routing contract for another proxy

- Only negotiate GET and HEAD requests with an explicit acceptable `text/markdown`
  media type, considering its quality weight relative to HTML.
- Map `/` to `/index.md`, `/topic/` or `/topic` to `/topic.md`, and
  `/topic/index.html` to `/topic/index.md`.
- Serve a successful Markdown response with `Content-Type: text/markdown; charset=utf-8`
  and `Vary: Accept`. Add `Vary: Accept` to HTML responses on negotiated routes too.
- Keep validators and cache keys specific to the representation. Do not forward an
  HTML ETag to the Markdown origin URL.
- If Markdown is missing, fall back to the original URL and preserve its status and
  redirect behavior. Do not turn a 404 into a successful Markdown response.
- Leave static assets, discovery JSON, non-GET/HEAD methods, and the separately
  deployed `/greenfield-js-sdk/` site alone.

## Verify after deployment

```bash
curl -i -H 'Accept: text/markdown' https://docs.bnbchain.org/bnb-smart-chain/overview/
curl -i -H 'Accept: text/html' https://docs.bnbchain.org/bnb-smart-chain/overview/
curl -I -H 'Accept: text/markdown' https://docs.bnbchain.org/
curl -i -H 'Accept: text/markdown' https://docs.bnbchain.org/does-not-exist/
```

The first request should contain the Markdown title and discovery directive, the
second HTML, the third Markdown headers with no body, and the last a genuine 404.
Then rerun [Mintlify Agent Score](https://www.mintlify.com/score/bnbchain).

## Roll back

Remove this Worker's `docs.bnbchain.org/*` route in Cloudflare and purge any cached
negotiated responses. GitHub Pages immediately resumes serving the existing HTML
and static Markdown files. No documentation content or Pages workflow is replaced.
