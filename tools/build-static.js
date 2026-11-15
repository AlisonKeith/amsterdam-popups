#!/usr/bin/env node
// Builds the no-JavaScript copies of this week's list from the EVENTS data in index.html:
//   this-week.html  plain HTML list for crawlers, AI search and readers without JavaScript
//   llms.txt        short site summary for AI tools (https://llmstxt.org)
// and sets the this-week.html <lastmod> in sitemap.xml.
// Run after every weekly edition is staged:  node tools/build-static.js
// Uses only Node's standard library. Exits non-zero if the data cannot be read.
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SITE = "https://www.amsterdampopups.com";
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

// Pull a top-level `const NAME = [ ... ];` literal out of index.html and evaluate it.
function readConst(name){
  const start = html.indexOf(`const ${name} = [`);
  if(start < 0) throw new Error(`const ${name} not found in index.html`);
  const end = html.indexOf("\n];", start);
  return Function(`"use strict"; return ${html.slice(html.indexOf("[", start), end + 2)};`)();
}
const WEEKS = readConst("WEEKS");
const CATEGORIES = readConst("CATEGORIES");
const EVENTS = readConst("EVENTS");

const week = WEEKS[0];
const catLabel = Object.fromEntries(CATEGORIES.map(c => [c.id, c.label.en]));
const list = EVENTS
  .filter(e => e.week === week.id)
  .map((e, i) => ({e, i, first:(e.days && e.days[0]) || "9999"}))
  .sort((a, b) => a.first.localeCompare(b.first) || a.i - b.i)
  .map(x => x.e);
if(!list.length) throw new Error(`no events for week ${week.id}`);

const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const priceText = e => e.price === null ? "Free" : (e.price && e.price.en) || "";

const items = list.map(e => `    <li>
      <article>
        <h2>${esc(e.name)}</h2>
        <p class="meta">${e.cats.map(c => esc(catLabel[c] || c)).join(" · ")}${e.recur === "regular" ? " · Regular" : ""}</p>
        <dl>
          <dt>When</dt><dd>${esc(e.when.en)}${e.time && e.time.en ? ", " + esc(e.time.en) : ""}</dd>
          <dt>Where</dt><dd>${esc(e.addr.en)}${e.hood && e.hood.en ? " (" + esc(e.hood.en) + ")" : ""}</dd>
          <dt>Price</dt><dd>${esc(priceText(e))}</dd>
        </dl>
        <p>${esc(e.blurb.en)}</p>
        <p><a href="${esc(e.url)}">Details and tickets for ${esc(e.name)}<span class="sr-only"> (organiser's site)</span></a></p>
      </article>
    </li>`).join("\n");

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="favicon.svg" type="image/svg+xml" />
<title>Amsterdam pop-ups this week, ${esc(week.label.en)} · plain list</title>
<meta name="description" content="All ${list.length} pop-ups and one-off events in Amsterdam for ${esc(week.label.en)}: food, art, family and culture, with dates, times, venues, prices and organiser links." />
<link rel="canonical" href="${SITE}/this-week.html" />
<style>
:root{--red:#DA1219;--ink:#1A1A1A;--page:#FBFAF8;--muted:#5F5B55;--line:#E6E2DB}
*{box-sizing:border-box}
body{margin:0;background:var(--page);color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.6}
.wrap{max-width:720px;margin:0 auto;padding:0 18px}
a{color:var(--red)} a:focus-visible{outline:2px solid var(--ink);outline-offset:2px}
.skip-link{position:absolute;left:-9999px}.skip-link:focus{left:8px;top:8px;background:#fff;padding:6px 10px}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
h1{font-size:1.5rem;margin:18px 0 6px} h2{font-size:1.1rem;margin:0 0 4px}
ol{list-style:none;padding:0;margin:0} li{border-top:1px solid var(--line);padding:16px 0}
.meta{color:var(--muted);font-size:.9rem;margin:0 0 6px}
dl{display:grid;grid-template-columns:max-content 1fr;gap:2px 12px;margin:0 0 8px;font-size:.95rem} dt{font-weight:600} dd{margin:0}
p{margin:0 0 8px} footer{border-top:1px solid var(--line);margin:24px 0;padding-top:12px;font-size:.9rem;color:var(--muted)}
</style>
</head>
<body>
<a class="skip-link" href="#list">Skip to the list</a>
<div class="wrap">
<header>
  <p><a href="/">Amsterdam Pop-ups</a>: the interactive guide with map, filters and Dutch version</p>
</header>
<main>
  <h1>Amsterdam pop-ups this week: ${esc(week.label.en)}</h1>
  <p>${list.length} temporary and one-off events: food, art, family and culture, from markets and supper clubs to comedy, music and nightlife. Every listing is checked on the organiser's own page. Times and prices can change, so check the organiser's link before you go.</p>
  <ol id="list">
${items}
  </ol>
</main>
<footer>
  <p>Generated from the weekly edition (week starting ${esc(week.id)}). <a href="/">Back to the full guide</a> · <a href="/privacy.html">Privacy</a> · Know a pop-up? Email <a href="mailto:hello@amsterdampopups.com">hello@amsterdampopups.com</a></p>
</footer>
</div>
</body>
</html>
`;

const cats = CATEGORIES.map(c => `- ${c.label.en} (NL: ${c.label.nl})`).join("\n");
const llms = `# Amsterdam Pop-ups

> A weekly, map-first guide to temporary, pop-up and one-off events in Amsterdam: food, art, family and culture. Every event is checked on the organiser's own page before it is listed. English and Dutch.

The guide is edited by hand and updated every week (Monday to Sunday). Each listing has a date, time, venue address, price and a link to the organiser's page. Past weeks stay in the Archive on the main site.

## This week (${week.label.en}, ${list.length} events)

- [This week's events as a plain list](${SITE}/this-week.html): every event with date, time, venue, price, description and organiser link; readable without JavaScript
- [Interactive guide](${SITE}/): map, category and day filters, English/Dutch toggle, archive

## Categories

${cats}

Events can belong to several categories. "Regular" marks weekly or recurring series; everything else is a one-off or limited run.

## Contact

- Tips and corrections: hello@amsterdampopups.com
- [Privacy](${SITE}/privacy.html)
`;

fs.writeFileSync(path.join(ROOT, "this-week.html"), page);
fs.writeFileSync(path.join(ROOT, "llms.txt"), llms);

const smPath = path.join(ROOT, "sitemap.xml");
const sm = fs.readFileSync(smPath, "utf8");
const re = /(<loc>https:\/\/www\.amsterdampopups\.com\/this-week\.html<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/;
if(!re.test(sm)) throw new Error("sitemap.xml has no this-week.html entry with <lastmod>");
fs.writeFileSync(smPath, sm.replace(re, `$1${week.id}$2`));

console.log(`this-week.html: ${list.length} events (${week.label.en}); llms.txt: ${CATEGORIES.length} categories; sitemap lastmod ${week.id}`);
