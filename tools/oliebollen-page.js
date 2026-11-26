"use strict";
// Builds /oliebollen/ and /nl/oliebollen/. Stand data lives in oliebollen-stands.js
// and is never added to EVENTS or the homepage map.

const { OLIEBOLLEN_STANDS, OLIEBOLLEN_BAKERIES, DISTRICT_ORDER } = require("./oliebollen-stands");

const OLIEBOLLEN_ALT = {en: "/oliebollen/", nl: "/nl/oliebollen/"};

const COPY = {
  en: {
    title: "Oliebollen stands in Amsterdam 2026 · Amsterdam Pop-ups",
    desc: "A map of seasonal oliebollen stands in Amsterdam for winter 2026, with locations, hours, prices and links we have checked.",
    keywords: "oliebollen Amsterdam, oliebollenkraam, oliebollen stands, New Year's Eve Amsterdam, pop-ups, pop ups",
    imageAlt: "Amsterdam Pop-ups — oliebollen stands in Amsterdam",
    h1: "Oliebollen stands in Amsterdam",
    intro: [
      "Oliebollen are a bit like doughnuts: soft balls of dough, fried until golden. They often have currants or raisins in the dough, and are eaten warm with powdered sugar. In the Netherlands they are a favourite on New Year's Eve, a custom that took hold in the nineteenth century. Seasonal stalls usually appear from October, and 31 December is the busiest day."
    ],
    tipsHeading: "A few practical tips",
    tips: [
      "On 31 December, go earlier in the day: queues at busy squares can get long before lunch.",
      "Hours can change in bad weather, so check the stall's page before you make a special trip.",
      "Where we found a published price, a plain oliebol is usually between €1 and €2."
    ],
    mapH: "Map of oliebollen stands",
    mapLabel: "Map of oliebollen stand locations in Amsterdam",
    mapDesc: "Interactive map of oliebollen stands in Amsterdam. Use arrow keys to pan, plus and minus to zoom, and click a marker for details. The full list appears below the map.",
    listH: "Stands by district",
    hoursLabel: "Hours",
    priceLabel: "Plain oliebol",
    sourceLabel: "Source",
    bakeriesH: "Bakeries",
    formH: "Spotted a stall we missed?",
    formIntro: "Tell us about an oliebollen stand and we will check it.",
    fName: "Stand name",
    fLocation: "Location",
    fHours: "Hours and price (optional)",
    fEmail: "Your email (optional)",
    fSend: "Send tip",
    fThanks: "Thanks — tip received. We'll take a look.",
    fPriv: "We only use this to follow up on your tip. See the Privacy page.",
    fHoneypot: "Don't fill this in:",
    formError: "Something went wrong — please try again.",
    footerText: "A map of seasonal oliebollen stands in Amsterdam for winter 2026.",
    skip: "Skip to the list of stands"
  },
  nl: {
    title: "Oliebollenkramen in Amsterdam 2026 · Amsterdam Pop-ups",
    desc: "Een kaart van oliebollenkramen in Amsterdam voor de winter van 2026, met locaties, openingstijden, prijzen en links die we hebben nagelopen.",
    keywords: "oliebollen Amsterdam, oliebollenkraam, oliebollenkramen, oud en nieuw Amsterdam",
    imageAlt: "Amsterdam Pop-ups — oliebollenkramen in Amsterdam",
    h1: "Oliebollenkramen in Amsterdam",
    intro: [
      "We weten hoe lekker ze zijn.",
      "Hier staan de kramen die we dit seizoen hebben gecontroleerd."
    ],
    tipsHeading: "",
    tips: [],
    mapH: "Kaart met oliebollenkramen",
    mapLabel: "Kaart met locaties van oliebollenkramen in Amsterdam",
    mapDesc: "Interactieve kaart van oliebollenkramen in Amsterdam. Gebruik de pijltjestoetsen om te verschuiven, plus en min om te zoomen, en klik op een markering voor de details. De volledige lijst staat onder de kaart.",
    listH: "Kramen per stadsdeel",
    hoursLabel: "Openingstijden",
    priceLabel: "Gewone oliebol",
    sourceLabel: "Bron",
    bakeriesH: "Bakkerijen",
    formH: "Een kraam gezien die wij missen?",
    formIntro: "Laat het ons weten, dan kijken we ernaar.",
    fName: "Naam van de kraam",
    fLocation: "Locatie",
    fHours: "Openingstijden en prijs (optioneel)",
    fEmail: "Je e-mail (optioneel)",
    fSend: "Stuur tip",
    fThanks: "Bedankt — tip ontvangen. We kijken ernaar.",
    fPriv: "We gebruiken dit alleen om op je tip te reageren. Zie de Privacy-pagina.",
    fHoneypot: "Dit veld niet invullen:",
    formError: "Er ging iets mis — probeer het opnieuw.",
    footerText: "Een kaart van oliebollenkramen in Amsterdam voor de winter van 2026.",
    skip: "Naar de lijst met kramen"
  }
};

const EXTRA_CSS = `
.oliebollen-tips{margin:0 0 1.2rem;padding:0 0 0 1.2rem}
.oliebollen-tips li{margin:0 0 .35rem}
.oliebollen-district{margin:0 0 1.4rem}
.oliebollen-district h3{font-size:1.05rem;margin:0 0 .45rem}
.oliebollen-list{list-style:none;padding:0;margin:0}
.oliebollen-list > li{border-top:1px solid var(--line);padding:.85rem 0}
.oliebollen-list > li:first-child{border-top:0;padding-top:0}
.oliebollen-list h4{margin:0 0 .25rem;font-size:1rem}
.oliebollen-list p{margin:0 0 .25rem;font-size:14px}
.oliebollen-bakeries{list-style:none;padding:0;margin:0 0 1.6rem}
.oliebollen-bakeries li{border-top:1px solid var(--line);padding:.85rem 0}
.oliebollen-bakeries li:first-child{border-top:0;padding-top:0}
.oliebollen-bakeries h3{margin:0 0 .25rem;font-size:1rem}
.leaflet-marker-icon.oliebol-marker{background:transparent;border:0}
.leaflet-marker-icon.oliebol-marker:focus,
.leaflet-marker-icon.oliebol-marker:focus-visible{
  outline:3px solid var(--red);
  outline-offset:3px;
  border-radius:50%;
}
.oliebol-icon{display:block;width:38px;height:38px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))}
.field{margin-bottom:13px}
.field label{display:block;font-size:13px;color:var(--muted);margin-bottom:5px}
.field input,.field textarea{width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:10px;font-family:inherit;font-size:14px;background:var(--card);color:var(--ink);box-sizing:border-box}
.field textarea{min-height:74px;resize:vertical}
.field input:focus,.field textarea:focus{outline:none;border-color:var(--red);box-shadow:0 0 0 3px rgba(218,18,25,.25)}
.submit{appearance:none;border:0;background:var(--red);color:#fff;font-family:inherit;font-weight:500;font-size:14px;padding:11px 20px;border-radius:10px;cursor:pointer;margin-top:4px}
.submit:hover{filter:brightness(.95)}
.submit:focus,.submit:focus-visible{outline:3px solid var(--red);outline-offset:2px}
.form-thanks{display:none;margin-top:14px;padding:12px 14px;background:var(--red-tint, #f8e8e8);border:1px solid var(--red-tint-border, #e8c8c8);border-radius:10px;font-size:13.5px;color:var(--red-deep, #7a1212)}
.form-note{font-size:12px;color:var(--faint);margin-top:10px}
.form-note a{color:var(--red);font-weight:500}
.hp{position:absolute;left:-9999px}
#oliebollen-form{position:relative;max-width:36rem}
`;

function oliebolIconHtml(id){
  const g = "bol-" + id;
  return `<svg class="oliebol-icon" viewBox="0 0 38 38" width="38" height="38" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="${g}" cx="34%" cy="30%" r="72%">
      <stop offset="0%" stop-color="#F6D7A8"/>
      <stop offset="45%" stop-color="#C9842E"/>
      <stop offset="100%" stop-color="#7A3E12"/>
    </radialGradient>
  </defs>
  <circle cx="19" cy="19" r="16.2" fill="url(#${g})" stroke="#5C2E0C" stroke-width="1.1"/>
  <ellipse cx="13.2" cy="15" rx="1.7" ry="1.35" fill="#2A1410" transform="rotate(-22 13.2 15)"/>
  <ellipse cx="20.8" cy="13.4" rx="1.45" ry="1.2" fill="#2A1410" transform="rotate(16 20.8 13.4)"/>
  <ellipse cx="16.6" cy="22.6" rx="1.55" ry="1.25" fill="#24110D" transform="rotate(-8 16.6 22.6)"/>
  <ellipse cx="24.8" cy="21.2" rx="1.3" ry="1.1" fill="#2A1410" transform="rotate(28 24.8 21.2)"/>
  <circle cx="15.2" cy="10.6" r=".7" fill="#fff" opacity=".8"/>
  <circle cx="22.4" cy="9.8" r=".55" fill="#fff" opacity=".7"/>
  <circle cx="18.6" cy="16.4" r=".45" fill="#fff" opacity=".55"/>
  <circle cx="12.4" cy="19.2" r=".5" fill="#fff" opacity=".65"/>
  <circle cx="26.2" cy="16.6" r=".45" fill="#fff" opacity=".6"/>
  <circle cx="21.2" cy="25.4" r=".4" fill="#fff" opacity=".5"/>
</svg>`;
}

function mapScript(esc){
  return `(function(){
  var el = document.getElementById("map");
  if(!el) return;
  var loaded = false;
  function load(){
    if(loaded) return;
    loaded = true;
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(css);
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    s.onload = initOliebollenMap;
    document.body.appendChild(s);
  }
  if("IntersectionObserver" in window){
    var io = new IntersectionObserver(function(entries){
      if(entries.some(function(e){ return e.isIntersecting; })){ io.disconnect(); load(); }
    }, {rootMargin:"200px"});
    io.observe(el);
  } else { load(); }
})();
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;","'":"&#39;"}[c];
  });
}
function oliebolIcon(id){
  var g = "bol-" + id;
  var html = '<svg class="oliebol-icon" viewBox="0 0 38 38" width="38" height="38" aria-hidden="true" focusable="false"><defs><radialGradient id="'+g+'" cx="34%" cy="30%" r="72%"><stop offset="0%" stop-color="#F6D7A8"/><stop offset="45%" stop-color="#C9842E"/><stop offset="100%" stop-color="#7A3E12"/></radialGradient></defs><circle cx="19" cy="19" r="16.2" fill="url(#'+g+')" stroke="#5C2E0C" stroke-width="1.1"/><ellipse cx="13.2" cy="15" rx="1.7" ry="1.35" fill="#2A1410" transform="rotate(-22 13.2 15)"/><ellipse cx="20.8" cy="13.4" rx="1.45" ry="1.2" fill="#2A1410" transform="rotate(16 20.8 13.4)"/><ellipse cx="16.6" cy="22.6" rx="1.55" ry="1.25" fill="#24110D" transform="rotate(-8 16.6 22.6)"/><ellipse cx="24.8" cy="21.2" rx="1.3" ry="1.1" fill="#2A1410" transform="rotate(28 24.8 21.2)"/><circle cx="15.2" cy="10.6" r=".7" fill="#fff" opacity=".8"/><circle cx="22.4" cy="9.8" r=".55" fill="#fff" opacity=".7"/><circle cx="18.6" cy="16.4" r=".45" fill="#fff" opacity=".55"/><circle cx="12.4" cy="19.2" r=".5" fill="#fff" opacity=".65"/><circle cx="26.2" cy="16.6" r=".45" fill="#fff" opacity=".6"/><circle cx="21.2" cy="25.4" r=".4" fill="#fff" opacity=".5"/></svg>';
  return L.divIcon({className:"oliebol-marker", iconSize:[38,38], iconAnchor:[19,19], popupAnchor:[0,-16], html:html});
}
function initOliebollenMap(){
  var el = document.getElementById("map");
  var dataEl = document.getElementById("map-stands");
  if(!el || !dataEl || typeof L === "undefined") return;
  var stands;
  try { stands = JSON.parse(dataEl.textContent || "[]"); } catch (err){ return; }
  stands = stands.filter(function(s){ return typeof s.lat === "number" && typeof s.lng === "number"; });
  if(!stands.length) return;
  var CARTO_KEY = "cb1_59ke_1_cd5111510aa2bc631ba544ae";
  var dark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var variant = dark ? "dark_all" : "light_all";
  var map = L.map("map", {scrollWheelZoom:false, keyboard:true}).setView([52.3676, 4.9041], 12);
  var usingFallback = false;
  var carto = L.tileLayer("https://{s}.basemaps.cartocdn.com/" + variant + "/{z}/{x}/{y}{r}.png?key=" + CARTO_KEY, {
    subdomains:"abcd", maxZoom:19, crossOrigin:true,
    attribution:"&copy; OpenStreetMap &copy; CARTO"
  }).addTo(map);
  carto.on("tileerror", function(){
    if(usingFallback) return;
    usingFallback = true;
    map.removeLayer(carto);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom:19, crossOrigin:true, attribution:"&copy; OpenStreetMap contributors"
    }).addTo(map);
  });
  var labels = {
    hours: el.getAttribute("data-hours-label") || "Hours",
    price: el.getAttribute("data-price-label") || "Plain oliebol",
    source: el.getAttribute("data-source-label") || "Source"
  };
  stands.forEach(function(s){
    var html = "<div><b>" + escapeHtml(s.name) + "</b><br>" +
      escapeHtml(s.location) + "<br>" +
      escapeHtml(labels.hours) + ": " + escapeHtml(s.hours) + "<br>" +
      escapeHtml(labels.price) + ": " + escapeHtml(s.price) + "<br>" +
      "<a href=\\"" + escapeHtml(s.source) + "\\" target=\\"_blank\\" rel=\\"noopener\\">" + escapeHtml(labels.source) + " \\u2197</a></div>";
    L.marker([s.lat, s.lng], {icon:oliebolIcon(s.id), alt:s.name, keyboard:true, title:s.name})
      .bindPopup(html, {maxWidth:280, closeButton:true, closeOnEscapeKey:true, autoPan:true, autoPanPaddingTopLeft:[50,10]})
      .addTo(map);
  });
  map.on("popupopen", function(e){
    var root = e.popup && e.popup.getElement();
    if(!root) return;
    var close = root.querySelector("a.leaflet-popup-close-button");
    var isNl = (document.documentElement.lang || "en").slice(0, 2) === "nl";
    if(close) close.setAttribute("aria-label", isNl ? "Sluiten" : "Close");
  });
  document.addEventListener("keydown", function(e){
    if(e.key !== "Escape") return;
    if(!document.querySelector(".leaflet-popup")) return;
    e.preventDefault();
    map.closePopup();
  });
  map.fitBounds(stands.map(function(s){ return [s.lat, s.lng]; }), {padding:[40,40], maxZoom:14});
  setTimeout(function(){ map.invalidateSize(); }, 0);
}
function submitTip(e){
  e.preventDefault();
  var form = e.target;
  var btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  var err = form.getAttribute("data-error") || "Something went wrong — please try again.";
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" }
  }).then(function(r){
    if(r.ok){
      document.getElementById("formThanks").style.display = "block";
      form.reset();
    } else {
      alert(err);
    }
  }).catch(function(){ alert(err); })
    .finally(function(){ btn.disabled = false; });
  return false;
}
`;
}

function groupedStands(){
  const by = {};
  for(const s of OLIEBOLLEN_STANDS){
    (by[s.district] || (by[s.district] = [])).push(s);
  }
  return DISTRICT_ORDER.filter(d => by[d] && by[d].length).map(d => [d, by[d]]);
}

function pageHtml(L, deps){
  const {
    esc, siteChrome, STYLE, GA_HEAD, consentBlock, hreflang, socialMeta,
    SITE, GENERATED, TXT, browseNav, path
  } = deps;
  const C = COPY[L];
  const T = TXT[L];
  const url = OLIEBOLLEN_ALT[L];
  const mapData = OLIEBOLLEN_STANDS.map(s => ({
    id: s.id,
    name: s.name[L],
    location: s.location[L],
    hours: s.hours[L],
    price: s.price[L],
    source: s.source,
    lat: s.lat,
    lng: s.lng
  }));
  const intro = C.intro.map(p => `  <p>${esc(p)}</p>`).join("\n");
  const tips = C.tips.length
    ? `  <h2>${esc(C.tipsHeading)}</h2>\n  <ul class="oliebollen-tips">\n${C.tips.map(t => `    <li>${esc(t)}</li>`).join("\n")}\n  </ul>\n`
    : "";
  const list = groupedStands().map(([district, stands]) => {
    const items = stands.map(s => `      <li id="stand-${esc(s.id)}">
        <h4>${esc(s.name[L])}</h4>
        <p>${esc(s.location[L])}</p>
        <p>${esc(C.hoursLabel)}: ${esc(s.hours[L])}</p>
        <p>${esc(C.priceLabel)}: ${esc(s.price[L])}</p>
        <p><a href="${esc(s.source)}" rel="noopener">${esc(C.sourceLabel)}</a></p>
      </li>`).join("\n");
    return `    <section class="oliebollen-district" aria-labelledby="d-${esc(district)}">
      <h3 id="d-${esc(district)}">${esc(district)}</h3>
      <ul class="oliebollen-list">
${items}
      </ul>
    </section>`;
  }).join("\n");
  const bakeries = OLIEBOLLEN_BAKERIES.map(b => `      <li>
        <h3>${esc(b.name[L])}</h3>
        <p>${esc(b.location[L])}</p>
        <p>${esc(b.note[L])}</p>
        <p><a href="${esc(b.source)}" rel="noopener">${esc(C.sourceLabel)}</a></p>
      </li>`).join("\n");
  const privacyHref = "/privacy.html";
  const privNote = C.fPriv.replace(
    L === "nl" ? "Privacy-pagina" : "Privacy page",
    `<a href="${privacyHref}">${L === "nl" ? "Privacy-pagina" : "Privacy page"}</a>`
  );
  return `<!DOCTYPE html>
<html lang="${L}">
<head>
${GENERATED}
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<title>${esc(C.title)}</title>
<meta name="description" content="${esc(C.desc)}" />
<meta name="keywords" content="${esc(C.keywords)}" />
<link rel="canonical" href="${SITE}${url}" />
${hreflang(OLIEBOLLEN_ALT)}
${socialMeta({L, title:C.title, desc:C.desc, url, imageAlt:C.imageAlt})}
${GA_HEAD}${STYLE}<style>
${EXTRA_CSS}
</style>
</head>
<body>
${siteChrome(L, {alt:OLIEBOLLEN_ALT, skipHref:"#stands", skipText:C.skip})}
<main>
<div class="wrap">
  <h1>${esc(C.h1)}</h1>
${intro}
${tips}  <section class="season-map" aria-labelledby="map-h">
    <h2 id="map-h">${esc(C.mapH)}</h2>
    <p id="map-desc" class="sr-only">${esc(C.mapDesc)}</p>
    <div id="map" role="region" aria-label="${esc(C.mapLabel)}" aria-describedby="map-desc" data-hours-label="${esc(C.hoursLabel)}" data-price-label="${esc(C.priceLabel)}" data-source-label="${esc(C.sourceLabel)}"></div>
    <script type="application/json" id="map-stands">${JSON.stringify(mapData).replace(/</g, "\\u003c")}</script>
  </section>
  <script>
${mapScript(esc)}  </script>
  <h2 id="stands">${esc(C.listH)}</h2>
${list}
  <h2 id="bakeries">${esc(C.bakeriesH)}</h2>
  <ul class="oliebollen-bakeries">
${bakeries}
  </ul>
  <section id="oliebollen-tip" aria-labelledby="form-h">
    <h2 id="form-h">${esc(C.formH)}</h2>
    <p>${esc(C.formIntro)}</p>
    <form id="oliebollen-form" name="oliebollen-tip" action="https://formspree.io/f/xjgqowrq" method="POST" onsubmit="return submitTip(event)" data-error="${esc(C.formError)}">
      <p class="hp" aria-hidden="true"><label>${esc(C.fHoneypot)} <input name="_gotcha" tabindex="-1" autocomplete="off" /></label></p>
      <input type="hidden" name="_subject" value="Oliebollen Spotted!" />
      <input type="hidden" name="submitter_type" value="oliebollen" />
      <div class="field"><label for="ob-name">${esc(C.fName)}</label><input id="ob-name" name="stand_name" required autocomplete="off" /></div>
      <div class="field"><label for="ob-location">${esc(C.fLocation)}</label><input id="ob-location" name="location" required autocomplete="off" /></div>
      <div class="field"><label for="ob-hours">${esc(C.fHours)}</label><textarea id="ob-hours" name="hours_price"></textarea></div>
      <div class="field"><label for="ob-email">${esc(C.fEmail)}</label><input id="ob-email" name="email" type="email" autocomplete="email" /></div>
      <button class="submit" type="submit">${esc(C.fSend)}</button>
      <div class="form-thanks" id="formThanks" role="status">${esc(C.fThanks)}</div>
      <p class="form-note">${privNote}</p>
    </form>
  </section>
</div>
</main>
<footer>
<div class="wrap">
${browseNav(L)}  <p>${esc(C.footerText)} <a href="${L === "nl" ? "/nl/" : "/"}">${T.back}</a> · <a href="${L === "nl" ? "/nl/over/" : "/about/"}">${T.about}</a> · <a href="/privacy.html">${T.privacy}</a> · ${T.tip} <a href="mailto:hello@amsterdampopups.com">hello@amsterdampopups.com</a></p>
</div>
</footer>
${consentBlock(L)}
</body>
</html>
`;
}

function buildOliebollenPages(deps){
  if(OLIEBOLLEN_STANDS.length !== 19){
    throw new Error(`expected 19 confirmed 2026 oliebollen stands, found ${OLIEBOLLEN_STANDS.length}`);
  }
  for(const s of OLIEBOLLEN_STANDS){
    if(typeof s.lat !== "number" || typeof s.lng !== "number") throw new Error(`missing coordinates for ${s.id}`);
    if(s.lat < 52.28 || s.lat > 52.43 || s.lng < 4.73 || s.lng > 5.08){
      throw new Error(`coordinates for ${s.id} look outside Amsterdam municipality: ${s.lat}, ${s.lng}`);
    }
  }
  return [
    [deps.path.join("oliebollen", "index.html"), pageHtml("en", deps)],
    [deps.path.join("nl", "oliebollen", "index.html"), pageHtml("nl", deps)]
  ];
}

module.exports = { buildOliebollenPages, OLIEBOLLEN_ALT, OLIEBOLLEN_STANDS };
