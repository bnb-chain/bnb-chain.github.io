"""
Generate llms.txt at build time from mkdocs nav + page front-matter.

- Replaces the hand-maintained static docs/llms.txt (which drifts out of date).
- Per-page description: front-matter `description:` if present, else the first
  content paragraph (truncated).
- Editorial opt-out: `llms_exclude: true` in a page's front-matter keeps it out
  of llms.txt while leaving the page on the site.
- Header prose lives in docs/.llms-header.md (edit freely, no code change).

Wire up in mkdocs.yml:
    hooks:
      - overrides/hooks/gen_llms_txt.py
"""
import os, re

MAX_DESC = 110
HEADER_FILE = ".llms-header.md"
SKIP_TOP = {"Home"}                          # nav tabs to skip entirely
RENAME_TOP = {"Announcements": "Optional"}   # llms.txt spec: skippable section

def _frontmatter_and_body(path):
    try:
        text = open(path, encoding="utf-8").read()
    except OSError:
        return {}, ""
    meta = {}
    body = text
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            for line in text[3:end].splitlines():
                if ":" in line:
                    k, _, v = line.partition(":")
                    meta[k.strip()] = v.strip().strip("'\"")
            body = text[end + 4:]
    return meta, body

def _first_paragraph(body):
    body = re.sub(r"<[^>]+>", " ", body)
    for para in body.split("\n\n"):
        p = " ".join(para.split())
        if not p or p.startswith(("#", "!", "|", "```", "---", "-", "*", "1.")):
            continue
        p = re.sub(r"[#*`>\[\]]", "", p).strip()
        if len(p) < 25:
            continue
        return (p[:MAX_DESC].rsplit(" ", 1)[0] + "…") if len(p) > MAX_DESC else p
    return ""

def _page_url(site_url, src):
    src = src.replace("\\", "/")
    if src.endswith("index.md"):
        rel = src[: -len("index.md")]
    else:
        rel = src[:-3] + "/"
    return site_url.rstrip("/") + "/" + rel.lstrip("./")

def _excluded(meta):
    """Editorial opt-out via front-matter."""
    return str(meta.get("llms_exclude", "")).lower() in ("true", "yes") or \
           str(meta.get("llms", "")).lower() in ("false", "no")

def _describe(docs_dir, src):
    meta, body = _frontmatter_and_body(os.path.join(docs_dir, src))
    if _excluded(meta):
        return None
    return meta.get("description") or _first_paragraph(body) or ""

def _walk(items, docs_dir, site_url, depth, out):
    for item in items:
        if not isinstance(item, dict):
            continue
        for title, val in item.items():
            if isinstance(val, str):
                if val.startswith(("http://", "https://")):
                    out.append("  " * depth + f"- [{title}]({val})")
                elif val.endswith(".md"):
                    desc = _describe(docs_dir, val)
                    if desc is None:            # excluded via front-matter
                        continue
                    url = _page_url(site_url, val)
                    out.append("  " * depth + (f"- [{title}]({url}): {desc}" if desc else f"- [{title}]({url})"))
            elif isinstance(val, list):
                out.append("  " * depth + f"- **{title}**")
                _walk(val, docs_dir, site_url, depth + 1, out)

def on_post_build(config):
    docs_dir = config["docs_dir"]
    site_url = config.get("site_url") or "/"
    lines = []
    header = os.path.join(docs_dir, HEADER_FILE)
    if os.path.exists(header):
        lines.append(open(header, encoding="utf-8").read().rstrip())
    else:
        lines.append(f"# {config.get('site_name', 'Documentation')}")
    nav = [i for i in config["nav"] if isinstance(i, dict)]
    nav.sort(key=lambda i: list(i)[0] in RENAME_TOP)   # Optional section last
    for item in nav:
        for title, val in item.items():
            if title in SKIP_TOP or (isinstance(val, str) and not isinstance(val, list)):
                continue
            lines.append("")
            lines.append(f"## {RENAME_TOP.get(title, title)}")
            lines.append("")
            body = []
            _walk(val, docs_dir, site_url, 0, body)
            lines.extend(body)
    out_path = os.path.join(config["site_dir"], "llms.txt")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"INFO    -  gen_llms_txt: wrote {out_path} ({len(lines)} lines)")

