#!/usr/bin/env python3
"""Render og-image.png (1200x630) from the site's colours, flag mark and tagline.

Run from the repo root or this folder:  python3 tools/make-og-image.py
Uses Playwright and the Archivo variable font already on this machine (same family
as the site wordmark). No stock photos. Re-run only when the card design changes.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image
import io

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "og-image.png"
FONT = Path("/usr/share/fonts/truetype/sand-box/google/Archivo/Archivo-VariableFont_wdth,wght.ttf")
if not FONT.exists():
    raise SystemExit(f"Archivo font not found at {FONT}")

# Site tokens from index.html :root (light theme)
PAGE = "#FBFAF8"
INK = "#1A1A1A"
INK_SOFT = "#141414"
RED = "#DA1219"
MUTED = "#5F5E5A"
LINE = "#E6E2DB"

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
@font-face {{
  font-family: "Archivo";
  src: url("file://{FONT}");
  font-weight: 100 900;
  font-stretch: 50% 150%;
}}
html, body {{
  margin: 0;
  width: 1200px;
  height: 630px;
  background: {PAGE};
  color: {INK};
  font-family: "Archivo", system-ui, sans-serif;
}}
.card {{
  box-sizing: border-box;
  width: 1200px;
  height: 630px;
  padding: 0;
  position: relative;
  background: {PAGE};
}}
.flag {{
  display: flex;
  height: 18px;
}}
.flag .r {{ flex: 1; background: {RED}; }}
.flag .b {{ width: 200px; background: {INK_SOFT}; }}
.inner {{
  padding: 120px 100px 0;
  display: flex;
  align-items: center;
  gap: 36px;
}}
.mark {{ flex: 0 0 160px; }}
.text {{ min-width: 0; }}
.wordmark {{
  font-family: "Archivo", sans-serif;
  font-weight: 700;
  font-stretch: 125%;
  font-size: 72px;
  letter-spacing: -1.2px;
  line-height: 1.05;
  color: {INK};
  margin: 0 0 16px;
}}
.tagline {{
  font-family: "Archivo", sans-serif;
  font-weight: 500;
  font-stretch: 100%;
  font-size: 32px;
  line-height: 1.25;
  color: {MUTED};
  margin: 0;
}}
.bar {{
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 18px;
  background: {RED};
}}
</style>
</head>
<body>
  <div class="card">
    <div class="flag" aria-hidden="true"><span class="r"></span><span class="b"></span><span class="r"></span></div>
    <div class="inner">
      <svg class="mark" viewBox="0 0 40 40" width="160" height="160" aria-hidden="true">
        <rect x="0" y="0" width="40" height="40" fill="#DA1219"/>
        <rect x="13" y="0" width="14" height="40" fill="#111111"/>
        <g stroke="#fff" stroke-width="3.2" stroke-linecap="square">
          <line x1="14.8" y1="4" x2="25.2" y2="14"/><line x1="25.2" y1="4" x2="14.8" y2="14"/>
          <line x1="14.8" y1="15" x2="25.2" y2="25"/><line x1="25.2" y1="15" x2="14.8" y2="25"/>
          <line x1="14.8" y1="26" x2="25.2" y2="36"/><line x1="25.2" y1="26" x2="14.8" y2="36"/>
        </g>
      </svg>
      <div class="text">
        <p class="wordmark">Amsterdam Pop-ups</p>
        <p class="tagline">Pop-ups, one-offs and hidden gems</p>
      </div>
    </div>
    <div class="bar" aria-hidden="true"></div>
  </div>
</body>
</html>
"""

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path="/usr/bin/google-chrome",
            args=["--no-sandbox", "--disable-dev-shm-usage"],
        )
        page = browser.new_page(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
        page.set_content(html, wait_until="networkidle")
        png = page.locator(".card").screenshot(type="png")
        browser.close()
    im = Image.open(io.BytesIO(png)).convert("RGB")
    if im.size != (1200, 630):
        im = im.resize((1200, 630), Image.Resampling.LANCZOS)
    # Flat colours: a tight palette keeps the file small without visible loss.
    im = im.quantize(colors=24, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE)
    im.save(OUT, format="PNG", optimize=True)
    size = OUT.stat().st_size
    print(f"wrote {OUT} ({im.size[0]}x{im.size[1]}, {size} bytes)")
    if size > 150_000:
        raise SystemExit(f"og-image.png is {size} bytes; keep it under 150KB")

if __name__ == "__main__":
    main()
