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
      "Oliebollen are a Dutch seasonal speciality, a bit like doughnuts: beautiful fluffy dough, fried until golden and sprinkled with sugar. Some are plain, and others have currants or raisins in the dough. In the Netherlands they are a favourite on New Year's Eve, a custom that took hold in the nineteenth century. Seasonal stalls usually appear from October, and 31 December is the busiest day."
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
    skip: "Skip to the list of stands",
    unconfirmedLabel: "Unconfirmed: permit granted",
    unconfirmedGroup: "Permit granted, not yet confirmed",
    confirmedLegend: "Confirmed stand",
    unconfirmedLegend: "Unconfirmed: permit granted",
    legendAria: "Map legend",
    confirmNote: "Stands marked “Unconfirmed: permit granted” have a city permit this season; we have not yet confirmed they are open.",
    voteQ: "Seen it open?",
    voteYes: "Yes, it's open",
    voteNo: "No, not there",
    voteThanks: "Thanks — we'll take a look."
  },
  nl: {
    title: "Oliebollenkramen in Amsterdam 2026 · Amsterdam Pop-ups",
    desc: "Een kaart van oliebollenkramen in Amsterdam voor de winter van 2026, met locaties, openingstijden, prijzen en links die we hebben nagelopen.",
    keywords: "oliebollen Amsterdam, oliebollenkraam, oliebollenkramen, oud en nieuw Amsterdam",
    imageAlt: "Amsterdam Pop-ups — oliebollenkramen in Amsterdam",
    h1: "Oliebollenkramen in Amsterdam",
    intro: [
      "We weten hoe lekker ze zijn.",
      "Hier staan de kramen die we dit seizoen hebben gecontroleerd, plus standplaatsen met een gemeentelijke vergunning die we nog niet hebben bevestigd."
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
    skip: "Naar de lijst met kramen",
    unconfirmedLabel: "Niet bevestigd: vergunning verleend",
    unconfirmedGroup: "Vergunning verleend, nog niet bevestigd",
    confirmedLegend: "Bevestigde kraam",
    unconfirmedLegend: "Niet bevestigd: vergunning verleend",
    legendAria: "Legenda van de kaart",
    confirmNote: "Kramen met het label “Niet bevestigd: vergunning verleend” hebben dit seizoen een gemeentelijke vergunning; we hebben nog niet bevestigd dat ze open zijn.",
    voteQ: "Zelf open gezien?",
    voteYes: "Ja, open",
    voteNo: "Nee, staat er niet",
    voteThanks: "Bedankt — we kijken ernaar."
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
.oliebol-icon{display:block;width:44px;height:44px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))}
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
.oliebol-legend{display:flex;flex-wrap:wrap;gap:.4rem 1.25rem;list-style:none;padding:0;margin:.7rem 0 0;font-size:13.5px;color:var(--ink)}
.oliebol-legend li{display:flex;align-items:center;gap:.45rem}
.oliebol-legend .oliebol-icon{width:28px;height:28px;flex:0 0 28px}
.oliebollen-confirm-note{font-size:14px;color:var(--muted);margin:0 0 1.1rem}
.oliebollen-unconfirmed-group{font-size:.95rem;font-weight:600;margin:1.05rem 0 .45rem;color:var(--ink)}
.oliebollen-status{font-size:13px;font-weight:600;margin:0 0 .35rem;color:var(--ink)}
.oliebol-icon-unconfirmed{opacity:.52;filter:grayscale(.22) drop-shadow(0 1px 2px rgba(0,0,0,.25))}
.oliebol-vote{margin:.55rem 0 0}
.oliebol-vote-q{font-size:14px;font-weight:600;margin:0 0 .4rem}
.oliebol-vote-actions{display:flex;flex-wrap:wrap;gap:.4rem}
.oliebol-vote-btn{appearance:none;font-family:inherit;font-size:13.5px;font-weight:500;line-height:1.2;padding:8px 12px;border-radius:8px;cursor:pointer;border:1px solid var(--ink);background:var(--card);color:var(--ink)}
.oliebol-vote-btn[data-vote="yes"]{background:var(--red);border-color:var(--red);color:#fff}
.oliebol-vote-btn:hover:not(:disabled){filter:brightness(.96)}
.oliebol-vote-btn:focus,.oliebol-vote-btn:focus-visible{outline:3px solid var(--red);outline-offset:2px}
.oliebol-vote-btn:disabled{opacity:.55;cursor:default}
.oliebol-vote-thanks{font-size:13.5px;margin:.5rem 0 0;color:var(--red-deep, #7a1212)}
.oliebol-vote-thanks:empty{display:none}
.leaflet-popup .oliebol-vote{margin-top:.65rem}
.leaflet-popup .oliebollen-status{margin:.35rem 0;font-weight:600}
`;

function oliebolIconHtml(id, unconfirmed){
  const g = "bol-" + id;
  const c = "c-bol-" + id;
  const p = "p-bol-" + id;
  const cls = unconfirmed ? "oliebol-icon oliebol-icon-unconfirmed" : "oliebol-icon";
  return `<svg class="${cls}" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" focusable="false">
  <defs>
    <radialGradient id="${g}" cx="33%" cy="30%" r="72%">
      <stop offset="0%" stop-color="#F6D7A8"/>
      <stop offset="26%" stop-color="#D4953A"/>
      <stop offset="58%" stop-color="#A35A18"/>
      <stop offset="82%" stop-color="#6B2E0C"/>
      <stop offset="100%" stop-color="#3F1A06"/>
    </radialGradient>
    <clipPath id="${c}"><path d="M 39.87 22.00 C 39.92 23.99 39.78 25.69 39.17 27.58 C 38.55 29.47 37.81 31.12 36.45 32.50 C 35.09 33.88 33.36 34.51 31.61 35.22 C 29.85 35.94 28.43 36.11 26.70 36.48 C 24.98 36.85 23.78 37.01 22.00 37.27 C 20.22 37.52 18.67 38.13 16.83 37.90 C 15.00 37.68 13.35 37.10 11.81 36.03 C 10.27 34.96 9.23 33.59 8.27 31.97 C 7.31 30.36 7.13 28.84 6.46 27.05 C 5.79 25.25 4.92 23.93 4.56 22.00 C 4.20 20.07 3.95 18.20 4.49 16.31 C 5.02 14.42 6.23 13.01 7.53 11.49 C 8.83 9.97 10.12 9.05 11.72 7.86 C 13.33 6.66 14.58 5.47 16.43 4.87 C 18.28 4.26 20.02 4.42 22.00 4.50 C 23.98 4.59 25.51 4.81 27.41 5.34 C 29.32 5.86 30.99 6.29 32.61 7.40 C 34.23 8.51 35.28 9.89 36.42 11.53 C 37.55 13.16 38.28 14.62 38.91 16.51 C 39.53 18.39 39.83 20.01 39.87 22.00 Z"/></clipPath>
    <filter id="${p}" x="-15%" y="-15%" width="130%" height="130%">
      <feGaussianBlur stdDeviation="0.42"/>
    </filter>
  </defs>
  <path d="M 39.87 22.00 C 39.92 23.99 39.78 25.69 39.17 27.58 C 38.55 29.47 37.81 31.12 36.45 32.50 C 35.09 33.88 33.36 34.51 31.61 35.22 C 29.85 35.94 28.43 36.11 26.70 36.48 C 24.98 36.85 23.78 37.01 22.00 37.27 C 20.22 37.52 18.67 38.13 16.83 37.90 C 15.00 37.68 13.35 37.10 11.81 36.03 C 10.27 34.96 9.23 33.59 8.27 31.97 C 7.31 30.36 7.13 28.84 6.46 27.05 C 5.79 25.25 4.92 23.93 4.56 22.00 C 4.20 20.07 3.95 18.20 4.49 16.31 C 5.02 14.42 6.23 13.01 7.53 11.49 C 8.83 9.97 10.12 9.05 11.72 7.86 C 13.33 6.66 14.58 5.47 16.43 4.87 C 18.28 4.26 20.02 4.42 22.00 4.50 C 23.98 4.59 25.51 4.81 27.41 5.34 C 29.32 5.86 30.99 6.29 32.61 7.40 C 34.23 8.51 35.28 9.89 36.42 11.53 C 37.55 13.16 38.28 14.62 38.91 16.51 C 39.53 18.39 39.83 20.01 39.87 22.00 Z" fill="url(#${g})" stroke="#4A1E08" stroke-width="0.85" stroke-linejoin="round"/>
  <g clip-path="url(#${c})">
    <path d="M 38.28 30.20 C 38.21 30.80 37.86 31.30 37.30 31.56 C 36.74 31.82 36.25 31.69 35.75 31.39 C 35.25 31.09 34.98 30.83 35.03 30.21 C 35.08 29.59 35.40 28.88 35.96 28.57 C 36.53 28.27 37.10 28.46 37.61 28.81 C 38.12 29.17 38.35 29.59 38.28 30.20 Z" fill="#4A1E08" opacity="0.15"/>
    <path d="M 17.25 6.43 C 17.26 6.89 17.03 7.09 16.32 7.25 C 15.61 7.41 14.89 7.39 14.00 7.14 C 13.12 6.89 12.22 6.53 12.30 6.11 C 12.39 5.68 13.52 5.41 14.39 5.20 C 15.26 4.99 15.64 4.88 16.27 5.15 C 16.89 5.42 17.24 5.97 17.25 6.43 Z" fill="#4A1E08" opacity="0.13"/>
    <path d="M 25.91 38.84 C 25.87 39.51 25.68 40.20 25.15 40.54 C 24.61 40.88 24.03 40.73 23.47 40.37 C 22.91 40.01 22.57 39.50 22.58 38.91 C 22.59 38.31 22.90 37.98 23.51 37.67 C 24.12 37.36 24.82 37.23 25.35 37.48 C 25.88 37.74 25.96 38.17 25.91 38.84 Z" fill="#4A1E08" opacity="0.16"/>
    <path d="M 40.66 25.25 C 40.61 25.97 40.48 26.70 39.76 27.13 C 39.04 27.56 38.06 27.62 37.38 27.21 C 36.71 26.80 36.58 25.99 36.68 25.29 C 36.78 24.58 37.13 24.32 37.85 24.00 C 38.58 23.68 39.35 23.56 39.97 23.83 C 40.59 24.11 40.70 24.52 40.66 25.25 Z" fill="#4A1E08" opacity="0.15"/>
    <path d="M 36.11 32.16 C 36.13 32.85 36.21 33.45 35.35 33.68 C 34.49 33.92 33.02 33.54 32.21 33.22 C 31.39 32.90 31.52 32.83 31.63 32.21 C 31.75 31.60 31.94 30.81 32.74 30.44 C 33.54 30.08 34.52 30.18 35.26 30.56 C 36.00 30.94 36.10 31.47 36.11 32.16 Z" fill="#4A1E08" opacity="0.16"/>
    <path d="M 8.86 27.51 C 8.69 28.09 8.11 28.82 7.36 29.19 C 6.60 29.55 6.07 29.52 5.43 29.17 C 4.79 28.82 4.44 28.28 4.44 27.60 C 4.44 26.92 4.62 26.31 5.42 26.09 C 6.22 25.86 7.34 26.27 8.09 26.58 C 8.85 26.90 9.02 26.94 8.86 27.51 Z" fill="#4A1E08" opacity="0.18"/>
    <path d="M 24.41 6.80 C 24.49 7.49 24.18 7.77 23.33 8.07 C 22.48 8.37 21.44 8.43 20.56 8.17 C 19.68 7.91 19.29 7.52 19.32 6.90 C 19.35 6.29 19.89 5.81 20.69 5.37 C 21.50 4.94 22.16 4.60 22.98 4.92 C 23.80 5.23 24.33 6.11 24.41 6.80 Z" fill="#4A1E08" opacity="0.13"/>
    <path d="M 15.68 35.84 C 15.55 36.63 15.20 37.48 14.52 37.81 C 13.84 38.14 13.19 37.67 12.59 37.35 C 11.99 37.02 11.81 36.91 11.79 36.32 C 11.77 35.74 11.76 35.15 12.49 34.69 C 13.22 34.24 14.42 34.01 15.12 34.26 C 15.82 34.51 15.81 35.06 15.68 35.84 Z" fill="#4A1E08" opacity="0.12"/>
    <path d="M 39.87 22.00 C 39.92 23.99 39.78 25.69 39.17 27.58 C 38.55 29.47 37.81 31.12 36.45 32.50 C 35.09 33.88 33.36 34.51 31.61 35.22 C 29.85 35.94 28.43 36.11 26.70 36.48 C 24.98 36.85 23.78 37.01 22.00 37.27 C 20.22 37.52 18.67 38.13 16.83 37.90 C 15.00 37.68 13.35 37.10 11.81 36.03 C 10.27 34.96 9.23 33.59 8.27 31.97 C 7.31 30.36 7.13 28.84 6.46 27.05 C 5.79 25.25 4.92 23.93 4.56 22.00 C 4.20 20.07 3.95 18.20 4.49 16.31 C 5.02 14.42 6.23 13.01 7.53 11.49 C 8.83 9.97 10.12 9.05 11.72 7.86 C 13.33 6.66 14.58 5.47 16.43 4.87 C 18.28 4.26 20.02 4.42 22.00 4.50 C 23.98 4.59 25.51 4.81 27.41 5.34 C 29.32 5.86 30.99 6.29 32.61 7.40 C 34.23 8.51 35.28 9.89 36.42 11.53 C 37.55 13.16 38.28 14.62 38.91 16.51 C 39.53 18.39 39.83 20.01 39.87 22.00 Z" fill="none" stroke="#4A1E08" stroke-width="2.2" opacity="0.22"/>
    <path d="M 20.87 15.14 C 20.83 16.26 20.22 16.65 19.20 17.29 C 18.18 17.93 17.50 18.26 16.22 18.04 C 14.94 17.83 14.11 17.37 13.37 16.31 C 12.64 15.24 12.46 14.04 12.89 13.20 C 13.32 12.37 13.90 12.72 15.32 12.51 C 16.75 12.29 18.14 11.64 19.36 12.22 C 20.58 12.80 20.90 14.03 20.87 15.14 Z" fill="#FBE9C8" opacity="0.20"/>
    <g filter="url(#${p})">
    <path d="M 20.65 18.47 C 20.69 19.18 20.18 19.55 19.01 20.10 C 17.83 20.65 16.96 20.92 15.31 20.97 C 13.66 21.02 12.41 20.88 11.52 20.33 C 10.63 19.78 11.23 19.31 11.25 18.48 C 11.26 17.65 10.71 17.28 11.59 16.56 C 12.46 15.84 13.61 15.13 15.21 15.20 C 16.80 15.26 17.62 16.14 18.82 16.86 C 20.02 17.58 20.61 17.76 20.65 18.47 Z" fill="#fff" opacity="0.11616215098741936"/>
    <path d="M 28.40 21.25 C 28.48 22.40 28.51 22.20 27.97 22.97 C 27.43 23.74 26.72 24.67 25.94 24.75 C 25.15 24.83 25.12 24.26 24.39 23.35 C 23.66 22.43 22.70 21.54 22.62 20.58 C 22.54 19.62 23.31 19.65 24.02 18.97 C 24.73 18.29 25.05 17.75 25.84 17.48 C 26.62 17.21 27.04 16.93 27.60 17.76 C 28.17 18.59 28.32 20.11 28.40 21.25 Z" fill="#fff" opacity="0.16035794322000957"/>
    <path d="M 20.36 22.08 C 20.48 23.06 21.24 23.47 20.51 24.34 C 19.78 25.21 18.28 25.80 17.05 26.05 C 15.83 26.29 15.58 26.32 14.95 25.45 C 14.32 24.57 14.09 23.25 14.18 22.07 C 14.27 20.90 14.62 20.87 15.34 20.12 C 16.07 19.36 16.45 18.68 17.48 18.64 C 18.50 18.59 19.36 19.15 19.99 19.91 C 20.63 20.67 20.25 21.11 20.36 22.08 Z" fill="#fff" opacity="0.20641410751966585"/>
    <path d="M 30.05 20.29 C 30.23 21.14 30.35 21.37 29.88 22.04 C 29.41 22.70 28.89 23.37 27.91 23.31 C 26.93 23.25 26.13 22.55 25.43 21.78 C 24.73 21.01 24.59 20.65 24.72 19.80 C 24.86 18.95 25.31 18.55 26.03 17.92 C 26.75 17.29 27.34 16.88 28.01 16.94 C 28.68 16.99 28.62 17.42 29.07 18.16 C 29.52 18.90 29.87 19.43 30.05 20.29 Z" fill="#fff" opacity="0.1741708975926076"/>
    <path d="M 22.70 19.56 C 22.64 20.89 22.37 22.33 21.70 23.30 C 21.03 24.27 20.81 24.21 19.67 23.97 C 18.53 23.73 17.13 22.91 16.53 22.19 C 15.93 21.47 16.72 21.71 16.94 20.70 C 17.16 19.69 17.06 18.72 17.53 17.59 C 17.99 16.46 18.08 15.64 19.05 15.56 C 20.03 15.48 21.17 16.34 21.97 17.22 C 22.77 18.10 22.76 18.22 22.70 19.56 Z" fill="#fff" opacity="0.20191645107149464"/>
    <path d="M 27.02 21.48 C 27.16 22.46 27.41 23.17 26.65 23.83 C 25.88 24.49 24.82 24.42 23.56 24.49 C 22.30 24.55 22.14 24.67 20.92 24.12 C 19.70 23.57 18.27 22.98 18.02 21.98 C 17.76 20.99 18.70 20.34 19.75 19.59 C 20.79 18.84 21.39 18.62 22.77 18.57 C 24.15 18.53 25.07 18.76 26.01 19.40 C 26.94 20.04 26.88 20.51 27.02 21.48 Z" fill="#fff" opacity="0.2017084563501083"/>
    <path d="M 30.55 21.93 C 30.85 22.79 31.39 22.76 30.84 23.34 C 30.28 23.93 29.30 24.52 28.04 24.58 C 26.78 24.65 25.86 24.17 25.11 23.64 C 24.36 23.11 24.69 22.97 24.64 22.18 C 24.58 21.40 24.14 20.74 24.85 20.05 C 25.56 19.36 26.86 19.19 27.88 19.05 C 28.89 18.92 28.88 18.80 29.47 19.43 C 30.06 20.07 30.25 21.07 30.55 21.93 Z" fill="#fff" opacity="0.15730541552851193"/>
    <path d="M 27.25 17.97 C 27.02 19.21 27.32 19.92 26.53 20.88 C 25.73 21.83 24.80 22.46 23.62 22.31 C 22.45 22.16 22.08 21.10 21.18 20.20 C 20.27 19.29 19.69 19.34 19.51 18.19 C 19.33 17.04 19.57 15.92 20.36 14.96 C 21.16 14.00 21.55 13.76 23.13 13.83 C 24.71 13.89 26.64 14.35 27.54 15.26 C 28.45 16.17 27.47 16.74 27.25 17.97 Z" fill="#fff" opacity="0.1200787536606527"/>
    <path d="M 34.55 13.59 C 34.52 14.76 33.51 15.50 32.49 16.24 C 31.47 16.97 31.21 16.86 29.92 16.93 C 28.63 17.00 27.58 17.21 26.62 16.55 C 25.66 15.89 25.47 15.17 25.55 13.92 C 25.63 12.68 25.93 11.72 26.98 10.88 C 28.03 10.05 29.09 10.11 30.33 10.12 C 31.57 10.13 31.69 10.16 32.62 10.92 C 33.55 11.69 34.58 12.42 34.55 13.59 Z" fill="#fff" opacity="0.13704123867837176"/>
    <path d="M 17.86 15.42 C 17.72 16.31 18.02 17.22 17.16 17.98 C 16.31 18.74 15.39 18.97 13.98 18.89 C 12.56 18.80 11.55 18.25 10.74 17.59 C 9.94 16.93 10.06 16.82 10.31 15.88 C 10.56 14.93 11.15 13.90 11.88 13.31 C 12.61 12.72 12.33 13.05 13.63 13.19 C 14.93 13.34 16.87 13.47 17.80 13.96 C 18.73 14.45 18.00 14.54 17.86 15.42 Z" fill="#fff" opacity="0.14915636411427186"/>
    <path d="M 26.62 22.22 C 26.70 23.32 26.80 23.24 26.15 24.07 C 25.50 24.89 24.75 25.72 23.66 25.98 C 22.57 26.24 22.06 26.08 21.20 25.23 C 20.35 24.38 19.98 23.32 19.78 22.13 C 19.58 20.93 19.50 20.64 20.28 19.81 C 21.06 18.98 22.11 18.50 23.32 18.34 C 24.52 18.18 25.04 18.22 25.77 19.08 C 26.49 19.93 26.53 21.13 26.62 22.22 Z" fill="#fff" opacity="0.21210259776061477"/>
    <path d="M 21.52 16.93 C 21.48 17.94 21.90 18.91 21.46 19.57 C 21.03 20.24 20.52 19.83 19.53 19.97 C 18.54 20.10 17.77 20.76 16.96 20.17 C 16.16 19.59 15.74 18.59 15.89 17.29 C 16.03 15.99 16.99 15.13 17.62 14.27 C 18.26 13.41 17.88 13.24 18.77 13.40 C 19.66 13.56 21.06 14.22 21.66 14.99 C 22.27 15.77 21.57 15.92 21.52 16.93 Z" fill="#fff" opacity="0.15400704688885455"/>
    <path d="M 21.64 16.25 C 21.79 17.31 20.75 17.75 19.62 18.60 C 18.50 19.44 17.94 20.08 16.51 20.10 C 15.09 20.12 13.94 19.61 13.14 18.67 C 12.33 17.73 12.75 16.95 12.86 15.82 C 12.96 14.70 12.82 14.46 13.61 13.56 C 14.41 12.67 15.29 11.70 16.47 11.75 C 17.64 11.80 17.81 12.80 18.95 13.79 C 20.09 14.78 21.49 15.19 21.64 16.25 Z" fill="#fff" opacity="0.17070572079381485"/>
    <path d="M 28.30 18.15 C 28.48 18.76 28.17 19.33 27.21 19.72 C 26.25 20.12 25.28 19.86 23.94 19.93 C 22.61 20.01 22.02 20.37 21.14 20.07 C 20.26 19.77 19.97 19.33 19.93 18.56 C 19.88 17.80 20.01 17.11 20.92 16.59 C 21.84 16.07 22.89 16.11 24.09 16.19 C 25.30 16.27 25.46 16.53 26.38 16.96 C 27.31 17.39 28.12 17.55 28.30 18.15 Z" fill="#fff" opacity="0.1531524268342583"/>
    <ellipse cx="27.87" cy="16.89" rx="0.20" ry="0.32" transform="rotate(98.6 27.87 16.89)" fill="#fff" opacity="0.59"/>
    <circle cx="33.86" cy="24.00" r="0.31" fill="#fff" opacity="0.64"/>
    <ellipse cx="32.31" cy="20.58" rx="0.43" ry="0.51" transform="rotate(140.0 32.31 20.58)" fill="#fff" opacity="0.64"/>
    <circle cx="19.24" cy="5.83" r="0.37" fill="#fff" opacity="0.70"/>
    <circle cx="35.69" cy="14.96" r="0.51" fill="#fff" opacity="0.60"/>
    <ellipse cx="17.80" cy="18.12" rx="0.27" ry="0.34" transform="rotate(55.7 17.80 18.12)" fill="#fff" opacity="0.60"/>
    <circle cx="35.80" cy="27.18" r="0.53" fill="#fff" opacity="0.56"/>
    <circle cx="28.72" cy="25.87" r="0.31" fill="#fff" opacity="0.68"/>
    <circle cx="27.84" cy="9.94" r="0.48" fill="#fff" opacity="0.74"/>
    <circle cx="31.28" cy="10.28" r="0.45" fill="#fff" opacity="0.77"/>
    <circle cx="16.17" cy="26.08" r="0.38" fill="#fff" opacity="0.76"/>
    <circle cx="23.40" cy="22.05" r="0.39" fill="#fff" opacity="0.75"/>
    <circle cx="24.24" cy="18.29" r="0.32" fill="#fff" opacity="0.72"/>
    <circle cx="21.20" cy="23.72" r="0.40" fill="#fff" opacity="0.75"/>
    <ellipse cx="28.58" cy="16.44" rx="0.38" ry="0.48" transform="rotate(28.9 28.58 16.44)" fill="#fff" opacity="0.77"/>
    <circle cx="24.12" cy="7.88" r="0.33" fill="#fff" opacity="0.78"/>
    <ellipse cx="33.09" cy="34.11" rx="0.55" ry="0.48" transform="rotate(134.0 33.09 34.11)" fill="#fff" opacity="0.63"/>
    <ellipse cx="32.03" cy="27.48" rx="0.42" ry="0.43" transform="rotate(82.7 32.03 27.48)" fill="#fff" opacity="0.70"/>
    <ellipse cx="37.91" cy="20.95" rx="0.29" ry="0.23" transform="rotate(161.6 37.91 20.95)" fill="#fff" opacity="0.67"/>
    <circle cx="35.41" cy="13.37" r="0.31" fill="#fff" opacity="0.52"/>
    <circle cx="7.80" cy="25.15" r="0.39" fill="#fff" opacity="0.62"/>
    <ellipse cx="14.13" cy="30.55" rx="0.34" ry="0.35" transform="rotate(123.3 14.13 30.55)" fill="#fff" opacity="0.69"/>
    <circle cx="30.21" cy="16.20" r="0.54" fill="#fff" opacity="0.70"/>
    <circle cx="12.81" cy="18.24" r="0.45" fill="#fff" opacity="0.51"/>
    <circle cx="30.24" cy="26.95" r="0.34" fill="#fff" opacity="0.73"/>
    <circle cx="29.53" cy="17.64" r="0.36" fill="#fff" opacity="0.77"/>
    <ellipse cx="27.15" cy="19.83" rx="0.21" ry="0.19" transform="rotate(58.1 27.15 19.83)" fill="#fff" opacity="0.69"/>
    <circle cx="27.33" cy="31.56" r="0.51" fill="#fff" opacity="0.78"/>
    <ellipse cx="31.59" cy="32.45" rx="0.51" ry="0.46" transform="rotate(136.8 31.59 32.45)" fill="#fff" opacity="0.61"/>
    <circle cx="22.53" cy="7.86" r="0.27" fill="#fff" opacity="0.76"/>
    <circle cx="13.73" cy="32.99" r="0.39" fill="#fff" opacity="0.59"/>
    <circle cx="24.01" cy="11.59" r="0.46" fill="#fff" opacity="0.77"/>
    <circle cx="27.22" cy="18.69" r="0.43" fill="#fff" opacity="0.73"/>
    <circle cx="15.22" cy="29.77" r="0.38" fill="#fff" opacity="0.57"/>
    <circle cx="6.63" cy="25.41" r="0.34" fill="#fff" opacity="0.55"/>
    <circle cx="17.05" cy="19.12" r="0.54" fill="#fff" opacity="0.56"/>
    <circle cx="22.62" cy="30.61" r="0.44" fill="#fff" opacity="0.72"/>
    <ellipse cx="11.62" cy="16.05" rx="0.32" ry="0.49" transform="rotate(31.4 11.62 16.05)" fill="#fff" opacity="0.52"/>
    <circle cx="22.16" cy="10.85" r="0.54" fill="#fff" opacity="0.68"/>
    <circle cx="34.60" cy="31.19" r="0.37" fill="#fff" opacity="0.51"/>
    <circle cx="22.19" cy="23.85" r="0.39" fill="#fff" opacity="0.63"/>
    <circle cx="26.10" cy="14.15" r="0.52" fill="#fff" opacity="0.54"/>
    <ellipse cx="18.93" cy="35.35" rx="0.53" ry="0.29" transform="rotate(121.7 18.93 35.35)" fill="#fff" opacity="0.74"/>
    <circle cx="28.49" cy="9.09" r="0.47" fill="#fff" opacity="0.67"/>
    <circle cx="24.05" cy="34.58" r="0.32" fill="#fff" opacity="0.63"/>
    <circle cx="29.79" cy="32.58" r="0.48" fill="#fff" opacity="0.51"/>
    <circle cx="34.57" cy="15.89" r="0.53" fill="#fff" opacity="0.77"/>
    <ellipse cx="21.56" cy="12.94" rx="0.41" ry="0.38" transform="rotate(6.9 21.56 12.94)" fill="#fff" opacity="0.59"/>
    <circle cx="20.66" cy="7.07" r="0.36" fill="#fff" opacity="0.70"/>
    <circle cx="34.27" cy="24.34" r="0.43" fill="#fff" opacity="0.55"/>
    <ellipse cx="26.09" cy="10.63" rx="0.46" ry="0.37" transform="rotate(54.7 26.09 10.63)" fill="#fff" opacity="0.73"/>
    <circle cx="21.72" cy="26.50" r="0.50" fill="#fff" opacity="0.61"/>
    <circle cx="36.06" cy="17.72" r="0.29" fill="#fff" opacity="0.57"/>
    <circle cx="34.18" cy="17.31" r="0.36" fill="#fff" opacity="0.73"/>
    <ellipse cx="12.59" cy="16.05" rx="0.54" ry="0.45" transform="rotate(30.5 12.59 16.05)" fill="#fff" opacity="0.67"/>
    <circle cx="13.50" cy="22.22" r="0.54" fill="#fff" opacity="0.56"/>
    <circle cx="31.09" cy="22.30" r="0.45" fill="#fff" opacity="0.64"/>
    <circle cx="10.43" cy="16.21" r="0.33" fill="#fff" opacity="0.76"/>
    <circle cx="36.85" cy="24.63" r="0.31" fill="#fff" opacity="0.62"/>
    <circle cx="27.46" cy="17.90" r="0.35" fill="#fff" opacity="0.64"/>
    <circle cx="8.49" cy="25.15" r="0.55" fill="#fff" opacity="0.52"/>
    <ellipse cx="25.95" cy="7.68" rx="0.54" ry="0.57" transform="rotate(143.7 25.95 7.68)" fill="#fff" opacity="0.59"/>
    <ellipse cx="16.22" cy="20.69" rx="0.32" ry="0.37" transform="rotate(67.3 16.22 20.69)" fill="#fff" opacity="0.57"/>
    <ellipse cx="11.42" cy="18.91" rx="0.44" ry="0.40" transform="rotate(146.2 11.42 18.91)" fill="#fff" opacity="0.68"/>
    <ellipse cx="10.84" cy="17.26" rx="0.56" ry="0.36" transform="rotate(49.6 10.84 17.26)" fill="#fff" opacity="0.68"/>
    <circle cx="27.13" cy="12.13" r="0.30" fill="#fff" opacity="0.75"/>
    <circle cx="31.62" cy="23.15" r="0.36" fill="#fff" opacity="0.58"/>
    <circle cx="29.93" cy="12.32" r="0.40" fill="#fff" opacity="0.75"/>
    <circle cx="27.69" cy="14.34" r="0.35" fill="#fff" opacity="0.59"/>
    <circle cx="15.49" cy="18.57" r="0.42" fill="#fff" opacity="0.76"/>
    <circle cx="33.38" cy="22.34" r="0.44" fill="#fff" opacity="0.52"/>
    <circle cx="24.83" cy="9.99" r="0.41" fill="#fff" opacity="0.68"/>
    <ellipse cx="11.59" cy="16.56" rx="0.36" ry="0.27" transform="rotate(47.8 11.59 16.56)" fill="#fff" opacity="0.63"/>
    <circle cx="27.49" cy="29.84" r="0.43" fill="#fff" opacity="0.64"/>
    <circle cx="23.51" cy="8.04" r="0.30" fill="#fff" opacity="0.54"/>
    <circle cx="24.54" cy="13.17" r="0.33" fill="#fff" opacity="0.62"/>
    <circle cx="15.53" cy="15.29" r="0.38" fill="#fff" opacity="0.78"/>
    <circle cx="23.06" cy="27.44" r="0.54" fill="#fff" opacity="0.57"/>
    <ellipse cx="17.36" cy="24.99" rx="0.33" ry="0.28" transform="rotate(32.9 17.36 24.99)" fill="#fff" opacity="0.69"/>
    <ellipse cx="9.04" cy="20.59" rx="0.43" ry="0.39" transform="rotate(12.4 9.04 20.59)" fill="#fff" opacity="0.73"/>
    <ellipse cx="33.96" cy="24.13" rx="0.43" ry="0.43" transform="rotate(154.7 33.96 24.13)" fill="#fff" opacity="0.77"/>
    <ellipse cx="30.78" cy="28.54" rx="0.48" ry="0.50" transform="rotate(22.5 30.78 28.54)" fill="#fff" opacity="0.72"/>
    <ellipse cx="30.81" cy="11.66" rx="0.41" ry="0.26" transform="rotate(105.7 30.81 11.66)" fill="#fff" opacity="0.59"/>
    <circle cx="17.89" cy="9.86" r="0.49" fill="#fff" opacity="0.58"/>
    <circle cx="24.91" cy="33.98" r="0.40" fill="#fff" opacity="0.70"/>
    <circle cx="29.57" cy="22.72" r="0.32" fill="#fff" opacity="0.69"/>
    <ellipse cx="22.78" cy="28.25" rx="0.43" ry="0.25" transform="rotate(52.5 22.78 28.25)" fill="#fff" opacity="0.74"/>
    <circle cx="29.19" cy="10.74" r="0.30" fill="#fff" opacity="0.64"/>
    <circle cx="37.67" cy="24.91" r="0.27" fill="#fff" opacity="0.76"/>
    <circle cx="16.46" cy="13.63" r="0.33" fill="#fff" opacity="0.64"/>
    <circle cx="31.40" cy="28.45" r="0.44" fill="#fff" opacity="0.77"/>
    <ellipse cx="35.09" cy="17.61" rx="0.41" ry="0.24" transform="rotate(16.1 35.09 17.61)" fill="#fff" opacity="0.76"/>
    <circle cx="32.51" cy="25.46" r="0.49" fill="#fff" opacity="0.72"/>
    <circle cx="15.93" cy="28.54" r="0.39" fill="#fff" opacity="0.59"/>
    <circle cx="18.96" cy="18.02" r="0.53" fill="#fff" opacity="0.54"/>
    <circle cx="23.00" cy="22.10" r="0.54" fill="#fff" opacity="0.59"/>
    <circle cx="22.61" cy="17.34" r="0.44" fill="#fff" opacity="0.74"/>
    <circle cx="28.36" cy="22.95" r="0.51" fill="#fff" opacity="0.56"/>
    <circle cx="12.75" cy="10.81" r="0.45" fill="#fff" opacity="0.65"/>
    <circle cx="20.57" cy="14.24" r="0.28" fill="#fff" opacity="0.66"/>
    <circle cx="17.45" cy="14.34" r="0.55" fill="#fff" opacity="0.67"/>
    <circle cx="20.69" cy="31.03" r="0.50" fill="#fff" opacity="0.59"/>
    <circle cx="35.27" cy="19.52" r="0.49" fill="#fff" opacity="0.58"/>
    <circle cx="14.21" cy="28.97" r="0.54" fill="#fff" opacity="0.59"/>
    <circle cx="21.05" cy="13.51" r="0.39" fill="#fff" opacity="0.62"/>
    <ellipse cx="34.43" cy="17.69" rx="0.30" ry="0.33" transform="rotate(145.4 34.43 17.69)" fill="#fff" opacity="0.66"/>
    <circle cx="22.84" cy="19.10" r="0.44" fill="#fff" opacity="0.71"/>
    <ellipse cx="30.78" cy="19.48" rx="0.34" ry="0.26" transform="rotate(119.2 30.78 19.48)" fill="#fff" opacity="0.61"/>
    <circle cx="10.03" cy="21.80" r="0.37" fill="#fff" opacity="0.72"/>
    <circle cx="34.40" cy="21.37" r="0.40" fill="#fff" opacity="0.66"/>
    <circle cx="6.71" cy="21.61" r="0.30" fill="#fff" opacity="0.60"/>
    <circle cx="15.52" cy="15.06" r="0.48" fill="#fff" opacity="0.73"/>
    <ellipse cx="26.22" cy="17.63" rx="0.34" ry="0.42" transform="rotate(133.9 26.22 17.63)" fill="#fff" opacity="0.62"/>
    <ellipse cx="26.25" cy="32.64" rx="0.30" ry="0.34" transform="rotate(63.1 26.25 32.64)" fill="#fff" opacity="0.60"/>
    <circle cx="30.14" cy="20.68" r="0.39" fill="#fff" opacity="0.56"/>
    <ellipse cx="24.96" cy="6.90" rx="0.44" ry="0.35" transform="rotate(46.9 24.96 6.90)" fill="#fff" opacity="0.76"/>
    <circle cx="16.04" cy="26.54" r="0.44" fill="#fff" opacity="0.55"/>
    <circle cx="21.76" cy="19.61" r="0.37" fill="#fff" opacity="0.68"/>
    <ellipse cx="20.53" cy="20.63" rx="0.50" ry="0.40" transform="rotate(35.0 20.53 20.63)" fill="#fff" opacity="0.54"/>
    <circle cx="20.39" cy="19.45" r="0.41" fill="#fff" opacity="0.63"/>
    <ellipse cx="16.04" cy="25.02" rx="0.49" ry="0.40" transform="rotate(63.4 16.04 25.02)" fill="#fff" opacity="0.53"/>
    <circle cx="12.80" cy="27.46" r="0.53" fill="#fff" opacity="0.63"/>
    <ellipse cx="12.98" cy="22.10" rx="0.35" ry="0.42" transform="rotate(15.5 12.98 22.10)" fill="#fff" opacity="0.61"/>
    <circle cx="9.52" cy="12.17" r="0.43" fill="#fff" opacity="0.63"/>
    <circle cx="20.51" cy="12.54" r="0.26" fill="#fff" opacity="0.76"/>
    <circle cx="24.16" cy="32.82" r="0.31" fill="#fff" opacity="0.71"/>
    <ellipse cx="32.86" cy="29.06" rx="0.34" ry="0.24" transform="rotate(172.8 32.86 29.06)" fill="#fff" opacity="0.61"/>
    <circle cx="23.38" cy="23.84" r="0.38" fill="#fff" opacity="0.58"/>
    <ellipse cx="17.18" cy="29.22" rx="0.27" ry="0.21" transform="rotate(39.6 17.18 29.22)" fill="#fff" opacity="0.61"/>
    <circle cx="34.07" cy="21.43" r="0.44" fill="#fff" opacity="0.73"/>
    <circle cx="20.94" cy="20.33" r="0.41" fill="#fff" opacity="0.73"/>
    <ellipse cx="33.56" cy="32.78" rx="0.42" ry="0.43" transform="rotate(47.2 33.56 32.78)" fill="#fff" opacity="0.59"/>
    <circle cx="29.53" cy="12.18" r="0.49" fill="#fff" opacity="0.65"/>
    <circle cx="14.33" cy="13.20" r="0.40" fill="#fff" opacity="0.74"/>
    <circle cx="15.66" cy="19.73" r="0.52" fill="#fff" opacity="0.69"/>
    <circle cx="15.80" cy="26.11" r="0.28" fill="#fff" opacity="0.59"/>
    <ellipse cx="22.06" cy="28.19" rx="0.39" ry="0.55" transform="rotate(158.6 22.06 28.19)" fill="#fff" opacity="0.54"/>
    <ellipse cx="19.04" cy="14.46" rx="0.57" ry="0.51" transform="rotate(48.6 19.04 14.46)" fill="#fff" opacity="0.70"/>
    <circle cx="20.47" cy="21.66" r="0.29" fill="#fff" opacity="0.52"/>
    <ellipse cx="9.79" cy="25.84" rx="0.43" ry="0.59" transform="rotate(58.2 9.79 25.84)" fill="#fff" opacity="0.58"/>
    <ellipse cx="26.18" cy="23.18" rx="0.40" ry="0.30" transform="rotate(175.9 26.18 23.18)" fill="#fff" opacity="0.75"/>
    <circle cx="15.69" cy="17.00" r="0.35" fill="#fff" opacity="0.65"/>
    <circle cx="6.60" cy="26.80" r="0.27" fill="#fff" opacity="0.60"/>
    <circle cx="34.55" cy="13.02" r="0.37" fill="#fff" opacity="0.60"/>
    <circle cx="7.60" cy="14.70" r="0.30" fill="#fff" opacity="0.72"/>
    <circle cx="30.25" cy="21.71" r="0.43" fill="#fff" opacity="0.74"/>
    <circle cx="31.70" cy="31.60" r="0.31" fill="#fff" opacity="0.55"/>
    <ellipse cx="6.17" cy="25.33" rx="0.57" ry="0.38" transform="rotate(18.4 6.17 25.33)" fill="#fff" opacity="0.54"/>
    <circle cx="34.84" cy="30.50" r="0.52" fill="#fff" opacity="0.74"/>
    <circle cx="22.19" cy="24.53" r="0.32" fill="#fff" opacity="0.76"/>
    <circle cx="16.52" cy="27.60" r="0.44" fill="#fff" opacity="0.75"/>
    <ellipse cx="8.80" cy="19.35" rx="0.43" ry="0.41" transform="rotate(178.2 8.80 19.35)" fill="#fff" opacity="0.58"/>
    <circle cx="6.61" cy="16.68" r="0.53" fill="#fff" opacity="0.54"/>
    <circle cx="29.08" cy="17.34" r="0.33" fill="#fff" opacity="0.56"/>
    <ellipse cx="14.88" cy="19.40" rx="0.41" ry="0.28" transform="rotate(82.7 14.88 19.40)" fill="#fff" opacity="0.65"/>
    <ellipse cx="8.69" cy="15.45" rx="0.46" ry="0.38" transform="rotate(49.8 8.69 15.45)" fill="#fff" opacity="0.54"/>
    <circle cx="17.25" cy="26.10" r="0.43" fill="#fff" opacity="0.50"/>
    </g>
    <circle cx="25.96" cy="21.12" r="0.44" fill="#fff" opacity="0.93"/>
    <ellipse cx="29.15" cy="8.83" rx="0.60" ry="0.59" transform="rotate(2.7 29.15 8.83)" fill="#fff" opacity="0.95"/>
    <ellipse cx="23.20" cy="12.22" rx="0.48" ry="0.47" transform="rotate(113.4 23.20 12.22)" fill="#fff" opacity="0.86"/>
    <circle cx="9.10" cy="25.50" r="0.68" fill="#fff" opacity="0.95"/>
    <circle cx="9.06" cy="15.86" r="0.56" fill="#fff" opacity="0.93"/>
    <circle cx="24.51" cy="23.77" r="0.44" fill="#fff" opacity="0.90"/>
    <circle cx="34.21" cy="27.69" r="0.56" fill="#fff" opacity="0.89"/>
    <circle cx="30.28" cy="21.05" r="0.44" fill="#fff" opacity="0.85"/>
    <circle cx="13.48" cy="16.70" r="0.56" fill="#fff" opacity="0.93"/>
    <circle cx="36.35" cy="21.64" r="0.32" fill="#fff" opacity="0.97"/>
    <circle cx="23.83" cy="6.73" r="0.68" fill="#fff" opacity="0.87"/>
    <circle cx="15.38" cy="12.02" r="0.68" fill="#fff" opacity="0.90"/>
    <circle cx="15.30" cy="28.94" r="0.56" fill="#fff" opacity="0.90"/>
    <circle cx="12.51" cy="25.97" r="0.44" fill="#fff" opacity="0.89"/>
    <circle cx="16.35" cy="13.68" r="0.68" fill="#fff" opacity="0.88"/>
    <circle cx="12.83" cy="24.68" r="0.56" fill="#fff" opacity="0.97"/>
    <ellipse cx="33.10" cy="31.89" rx="0.46" ry="0.48" transform="rotate(24.6 33.10 31.89)" fill="#fff" opacity="0.91"/>
    <ellipse cx="32.97" cy="10.82" rx="0.91" ry="0.72" transform="rotate(46.9 32.97 10.82)" fill="#fff" opacity="0.85"/>
    <ellipse cx="20.03" cy="9.36" rx="0.46" ry="0.54" transform="rotate(173.4 20.03 9.36)" fill="#fff" opacity="0.96"/>
    <circle cx="9.33" cy="19.26" r="0.56" fill="#fff" opacity="0.84"/>
    <circle cx="14.77" cy="20.51" r="0.32" fill="#fff" opacity="0.90"/>
    <ellipse cx="29.45" cy="9.04" rx="0.61" ry="0.72" transform="rotate(86.0 29.45 9.04)" fill="#fff" opacity="0.93"/>
    <circle cx="22.77" cy="25.50" r="0.44" fill="#fff" opacity="0.87"/>
    <circle cx="20.54" cy="14.38" r="0.44" fill="#fff" opacity="0.94"/>
    <ellipse cx="6.29" cy="23.64" rx="0.45" ry="0.46" transform="rotate(165.0 6.29 23.64)" fill="#fff" opacity="0.91"/>
    <ellipse cx="14.68" cy="9.62" rx="0.52" ry="0.43" transform="rotate(119.9 14.68 9.62)" fill="#fff" opacity="0.96"/>
    <ellipse cx="28.93" cy="32.74" rx="0.41" ry="0.47" transform="rotate(6.9 28.93 32.74)" fill="#fff" opacity="0.96"/>
    <circle cx="30.00" cy="8.45" r="0.56" fill="#fff" opacity="0.86"/>
    <circle cx="17.96" cy="35.13" r="0.68" fill="#fff" opacity="0.93"/>
    <circle cx="9.91" cy="20.75" r="0.56" fill="#fff" opacity="0.94"/>
    <circle cx="29.88" cy="23.39" r="0.56" fill="#fff" opacity="0.96"/>
    <ellipse cx="14.85" cy="25.77" rx="0.61" ry="0.50" transform="rotate(108.3 14.85 25.77)" fill="#fff" opacity="0.85"/>
    <circle cx="24.72" cy="16.81" r="0.56" fill="#fff" opacity="0.92"/>
    <circle cx="16.56" cy="31.11" r="0.32" fill="#fff" opacity="0.89"/>
    <ellipse cx="14.92" cy="17.00" rx="0.42" ry="0.58" transform="rotate(118.4 14.92 17.00)" fill="#fff" opacity="0.90"/>
    <ellipse cx="17.83" cy="25.01" rx="0.68" ry="0.46" transform="rotate(122.1 17.83 25.01)" fill="#fff" opacity="0.90"/>
    <ellipse cx="10.64" cy="26.04" rx="0.33" ry="0.40" transform="rotate(125.8 10.64 26.04)" fill="#fff" opacity="0.96"/>
    <ellipse cx="23.52" cy="33.79" rx="0.41" ry="0.34" transform="rotate(141.2 23.52 33.79)" fill="#fff" opacity="0.96"/>
    <ellipse cx="13.80" cy="15.20" rx="0.35" ry="0.28" transform="rotate(156.8 13.80 15.20)" fill="#fff" opacity="0.95"/>
    <circle cx="31.98" cy="10.97" r="0.78" fill="#fff" opacity="0.90"/>
    <ellipse cx="16.00" cy="16.00" rx="0.36" ry="0.35" transform="rotate(168.4 16.00 16.00)" fill="#fff" opacity="0.89"/>
    <ellipse cx="32.61" cy="25.74" rx="0.74" ry="0.54" transform="rotate(115.3 32.61 25.74)" fill="#fff" opacity="0.95"/>
    <ellipse cx="9.28" cy="13.86" rx="0.56" ry="0.53" transform="rotate(16.8 9.28 13.86)" fill="#fff" opacity="0.95"/>
    <circle cx="34.89" cy="20.07" r="0.68" fill="#fff" opacity="0.97"/>
    <circle cx="20.95" cy="12.17" r="0.44" fill="#fff" opacity="0.90"/>
    <ellipse cx="18.14" cy="33.80" rx="0.26" ry="0.31" transform="rotate(122.2 18.14 33.80)" fill="#fff" opacity="0.93"/>
    <ellipse cx="35.21" cy="19.49" rx="0.79" ry="0.43" transform="rotate(133.5 35.21 19.49)" fill="#fff" opacity="0.95"/>
    <circle cx="15.21" cy="26.38" r="0.44" fill="#fff" opacity="0.94"/>
    <circle cx="6.70" cy="24.73" r="0.44" fill="#fff" opacity="0.96"/>
    <circle cx="18.47" cy="12.61" r="0.44" fill="#fff" opacity="0.86"/>
    <circle cx="25.43" cy="14.98" r="0.44" fill="#fff" opacity="0.97"/>
    <circle cx="19.77" cy="21.87" r="0.68" fill="#fff" opacity="0.88"/>
    <ellipse cx="26.32" cy="32.06" rx="0.34" ry="0.24" transform="rotate(96.8 26.32 32.06)" fill="#fff" opacity="0.93"/>
    <ellipse cx="16.10" cy="14.04" rx="0.48" ry="0.34" transform="rotate(1.4 16.10 14.04)" fill="#fff" opacity="0.89"/>
    <ellipse cx="11.19" cy="23.85" rx="0.38" ry="0.64" transform="rotate(105.7 11.19 23.85)" fill="#fff" opacity="0.90"/>
    <circle cx="16.00" cy="27.06" r="0.56" fill="#fff" opacity="0.95"/>
    <circle cx="28.41" cy="13.73" r="0.56" fill="#fff" opacity="0.84"/>
    <ellipse cx="32.90" cy="11.09" rx="0.63" ry="0.57" transform="rotate(112.7 32.90 11.09)" fill="#fff" opacity="0.89"/>
    <circle cx="9.12" cy="31.41" r="0.78" fill="#fff" opacity="0.90"/>
    <ellipse cx="34.96" cy="12.15" rx="0.39" ry="0.49" transform="rotate(23.6 34.96 12.15)" fill="#fff" opacity="0.88"/>
    <circle cx="7.06" cy="25.54" r="0.44" fill="#fff" opacity="0.91"/>
    <ellipse cx="7.66" cy="26.10" rx="0.83" ry="0.69" transform="rotate(43.4 7.66 26.10)" fill="#fff" opacity="0.88"/>
    <ellipse cx="19.37" cy="29.92" rx="0.47" ry="0.59" transform="rotate(32.8 19.37 29.92)" fill="#fff" opacity="0.88"/>
    <circle cx="15.34" cy="8.00" r="0.44" fill="#fff" opacity="0.98"/>
    <circle cx="11.06" cy="24.25" r="0.68" fill="#fff" opacity="0.92"/>
    <ellipse cx="27.44" cy="33.31" rx="0.34" ry="0.35" transform="rotate(45.4 27.44 33.31)" fill="#fff" opacity="0.88"/>
    <ellipse cx="32.86" cy="23.23" rx="0.64" ry="0.39" transform="rotate(86.2 32.86 23.23)" fill="#fff" opacity="0.93"/>
    <ellipse cx="31.64" cy="27.77" rx="0.38" ry="0.43" transform="rotate(53.0 31.64 27.77)" fill="#fff" opacity="0.90"/>
    <ellipse cx="15.62" cy="26.39" rx="0.56" ry="0.64" transform="rotate(91.6 15.62 26.39)" fill="#fff" opacity="0.91"/>
    <circle cx="9.48" cy="25.34" r="0.56" fill="#fff" opacity="0.98"/>
    <circle cx="34.08" cy="27.30" r="0.56" fill="#fff" opacity="0.90"/>
    <circle cx="25.72" cy="11.37" r="0.44" fill="#fff" opacity="0.85"/>
    <ellipse cx="20.11" cy="20.04" rx="0.73" ry="0.78" transform="rotate(96.2 20.11 20.04)" fill="#fff" opacity="0.92"/>
    <circle cx="14.30" cy="31.26" r="0.78" fill="#fff" opacity="0.90"/>
    <circle cx="29.70" cy="27.70" r="0.68" fill="#fff" opacity="0.97"/>
    <ellipse cx="14.26" cy="8.16" rx="0.37" ry="0.32" transform="rotate(17.4 14.26 8.16)" fill="#fff" opacity="0.86"/>
    <circle cx="21.99" cy="34.38" r="0.68" fill="#fff" opacity="0.92"/>
    <circle cx="13.75" cy="26.68" r="0.44" fill="#fff" opacity="0.84"/>
    <ellipse cx="14.09" cy="28.38" rx="0.83" ry="0.67" transform="rotate(110.4 14.09 28.38)" fill="#fff" opacity="0.84"/>
    <circle cx="11.86" cy="11.35" r="0.68" fill="#fff" opacity="0.95"/>
    <circle cx="15.77" cy="18.58" r="0.56" fill="#fff" opacity="0.92"/>
    <circle cx="33.68" cy="32.90" r="0.68" fill="#fff" opacity="0.86"/>
    <circle cx="24.81" cy="20.05" r="0.44" fill="#fff" opacity="0.91"/>
    <ellipse cx="25.13" cy="16.45" rx="0.77" ry="0.54" transform="rotate(20.1 25.13 16.45)" fill="#fff" opacity="0.95"/>
    <ellipse cx="19.30" cy="8.46" rx="0.63" ry="0.86" transform="rotate(146.1 19.30 8.46)" fill="#fff" opacity="0.87"/>
    <circle cx="36.74" cy="18.91" r="0.78" fill="#fff" opacity="0.95"/>
    <ellipse cx="21.87" cy="10.49" rx="0.52" ry="0.69" transform="rotate(2.5 21.87 10.49)" fill="#fff" opacity="0.85"/>
    <ellipse cx="6.41" cy="18.13" rx="0.51" ry="0.36" transform="rotate(85.0 6.41 18.13)" fill="#fff" opacity="0.94"/>
    <ellipse cx="31.18" cy="24.45" rx="0.59" ry="0.50" transform="rotate(120.2 31.18 24.45)" fill="#fff" opacity="0.94"/>
    <circle cx="18.80" cy="5.76" r="0.68" fill="#fff" opacity="0.97"/>
    <circle cx="24.50" cy="7.17" r="0.44" fill="#fff" opacity="0.89"/>
    <circle cx="37.10" cy="18.29" r="0.68" fill="#fff" opacity="0.90"/>
    <ellipse cx="17.27" cy="10.38" rx="0.41" ry="0.43" transform="rotate(120.7 17.27 10.38)" fill="#fff" opacity="0.96"/>
    <circle cx="15.20" cy="27.24" r="0.44" fill="#fff" opacity="0.95"/>
    <ellipse cx="31.49" cy="16.96" rx="0.41" ry="0.53" transform="rotate(60.7 31.49 16.96)" fill="#fff" opacity="0.86"/>
    <circle cx="17.49" cy="23.13" r="0.78" fill="#fff" opacity="0.86"/>
    <circle cx="27.17" cy="21.82" r="0.44" fill="#fff" opacity="0.95"/>
    <ellipse cx="14.51" cy="9.17" rx="0.61" ry="0.62" transform="rotate(46.2 14.51 9.17)" fill="#fff" opacity="0.95"/>
    <circle cx="20.91" cy="16.84" r="0.56" fill="#fff" opacity="0.98"/>
    <ellipse cx="23.16" cy="33.43" rx="0.54" ry="0.59" transform="rotate(2.8 23.16 33.43)" fill="#fff" opacity="0.95"/>
    <circle cx="20.12" cy="29.69" r="0.44" fill="#fff" opacity="0.89"/>
    <circle cx="24.05" cy="34.24" r="0.44" fill="#fff" opacity="0.91"/>
    <circle cx="12.17" cy="12.77" r="0.56" fill="#fff" opacity="0.85"/>
    <ellipse cx="22.33" cy="25.70" rx="0.57" ry="0.51" transform="rotate(2.6 22.33 25.70)" fill="#fff" opacity="0.84"/>
    <ellipse cx="32.86" cy="18.53" rx="0.57" ry="0.46" transform="rotate(127.3 32.86 18.53)" fill="#fff" opacity="0.97"/>
    <ellipse cx="6.98" cy="18.97" rx="0.79" ry="0.65" transform="rotate(11.5 6.98 18.97)" fill="#fff" opacity="0.98"/>
    <circle cx="31.83" cy="21.76" r="0.44" fill="#fff" opacity="0.90"/>
    <ellipse cx="11.16" cy="22.45" rx="0.70" ry="0.73" transform="rotate(45.9 11.16 22.45)" fill="#fff" opacity="0.90"/>
    <circle cx="25.73" cy="18.47" r="0.68" fill="#fff" opacity="0.93"/>
    <ellipse cx="15.67" cy="11.56" rx="0.38" ry="0.48" transform="rotate(44.0 15.67 11.56)" fill="#fff" opacity="0.89"/>
    <circle cx="35.15" cy="20.28" r="0.56" fill="#fff" opacity="0.93"/>
    <circle cx="29.61" cy="20.05" r="0.78" fill="#fff" opacity="0.92"/>
    <ellipse cx="22.68" cy="21.04" rx="0.52" ry="0.49" transform="rotate(25.6 22.68 21.04)" fill="#fff" opacity="0.85"/>
    <circle cx="32.19" cy="12.16" r="0.56" fill="#fff" opacity="0.97"/>
    <ellipse cx="20.95" cy="20.37" rx="0.47" ry="0.36" transform="rotate(165.6 20.95 20.37)" fill="#fff" opacity="0.91"/>
    <ellipse cx="28.69" cy="31.84" rx="0.44" ry="0.40" transform="rotate(116.2 28.69 31.84)" fill="#fff" opacity="0.89"/>
    <ellipse cx="22.42" cy="18.80" rx="0.55" ry="0.44" transform="rotate(151.8 22.42 18.80)" fill="#fff" opacity="0.89"/>
    <circle cx="18.02" cy="17.00" r="0.44" fill="#fff" opacity="0.86"/>
    <circle cx="7.10" cy="16.26" r="0.68" fill="#fff" opacity="0.85"/>
    <ellipse cx="12.28" cy="17.93" rx="0.37" ry="0.34" transform="rotate(72.7 12.28 17.93)" fill="#fff" opacity="0.89"/>
    <ellipse cx="18.80" cy="32.51" rx="0.61" ry="0.43" transform="rotate(52.2 18.80 32.51)" fill="#fff" opacity="0.91"/>
    <circle cx="30.64" cy="27.88" r="0.56" fill="#fff" opacity="0.93"/>
    <circle cx="8.68" cy="31.05" r="0.56" fill="#fff" opacity="0.94"/>
    <circle cx="31.71" cy="18.36" r="0.56" fill="#fff" opacity="0.90"/>
    <ellipse cx="14.46" cy="19.30" rx="0.41" ry="0.42" transform="rotate(148.8 14.46 19.30)" fill="#fff" opacity="0.94"/>
    <circle cx="29.86" cy="22.98" r="0.68" fill="#fff" opacity="0.86"/>
    <circle cx="25.63" cy="28.34" r="0.44" fill="#fff" opacity="0.97"/>
    <circle cx="22.90" cy="13.14" r="0.56" fill="#fff" opacity="0.85"/>
    <circle cx="24.66" cy="6.93" r="0.44" fill="#fff" opacity="0.86"/>
    <circle cx="19.51" cy="20.76" r="0.44" fill="#fff" opacity="0.90"/>
    <circle cx="18.00" cy="26.11" r="0.44" fill="#fff" opacity="0.86"/>
    <ellipse cx="32.82" cy="28.13" rx="0.59" ry="0.51" transform="rotate(60.8 32.82 28.13)" fill="#fff" opacity="0.91"/>
    <ellipse cx="9.34" cy="16.51" rx="0.49" ry="0.45" transform="rotate(174.3 9.34 16.51)" fill="#fff" opacity="0.97"/>
    <circle cx="19.08" cy="28.20" r="0.56" fill="#fff" opacity="0.87"/>
    <circle cx="35.40" cy="13.29" r="0.56" fill="#fff" opacity="0.91"/>
    <circle cx="34.36" cy="16.08" r="0.56" fill="#fff" opacity="0.89"/>
    <ellipse cx="21.24" cy="17.34" rx="0.40" ry="0.41" transform="rotate(73.2 21.24 17.34)" fill="#fff" opacity="0.94"/>
    <circle cx="30.81" cy="20.81" r="0.44" fill="#fff" opacity="0.97"/>
    <circle cx="9.95" cy="25.19" r="0.56" fill="#fff" opacity="0.96"/>
    <circle cx="8.36" cy="12.64" r="0.56" fill="#fff" opacity="0.94"/>
    <ellipse cx="25.15" cy="22.90" rx="0.45" ry="0.56" transform="rotate(84.1 25.15 22.90)" fill="#fff" opacity="0.88"/>
    <circle cx="25.73" cy="9.03" r="0.68" fill="#fff" opacity="0.95"/>
    <circle cx="20.63" cy="14.45" r="0.56" fill="#fff" opacity="0.87"/>
    <circle cx="12.60" cy="15.61" r="0.56" fill="#fff" opacity="0.87"/>
    <ellipse cx="24.36" cy="10.19" rx="0.74" ry="0.52" transform="rotate(48.1 24.36 10.19)" fill="#fff" opacity="0.88"/>
    <ellipse cx="9.49" cy="14.19" rx="0.34" ry="0.49" transform="rotate(79.5 9.49 14.19)" fill="#fff" opacity="0.98"/>
    <circle cx="35.15" cy="26.77" r="0.56" fill="#fff" opacity="0.89"/>
    <ellipse cx="20.53" cy="10.46" rx="0.65" ry="0.61" transform="rotate(4.8 20.53 10.46)" fill="#fff" opacity="0.88"/>
    <ellipse cx="12.54" cy="32.92" rx="0.61" ry="0.42" transform="rotate(51.0 12.54 32.92)" fill="#fff" opacity="0.86"/>
    <ellipse cx="16.28" cy="11.59" rx="0.55" ry="0.46" transform="rotate(152.3 16.28 11.59)" fill="#fff" opacity="0.96"/>
    <circle cx="14.11" cy="19.96" r="0.68" fill="#fff" opacity="0.92"/>
    <circle cx="13.20" cy="32.76" r="0.44" fill="#fff" opacity="0.96"/>
    <circle cx="30.59" cy="18.29" r="0.32" fill="#fff" opacity="0.90"/>
    <ellipse cx="11.66" cy="18.76" rx="0.47" ry="0.61" transform="rotate(31.6 11.66 18.76)" fill="#fff" opacity="0.87"/>
    <circle cx="34.26" cy="19.40" r="0.68" fill="#fff" opacity="0.90"/>
    <circle cx="18.67" cy="23.92" r="0.56" fill="#fff" opacity="0.95"/>
    <circle cx="24.28" cy="13.94" r="0.56" fill="#fff" opacity="0.88"/>
    <ellipse cx="36.77" cy="15.77" rx="0.64" ry="0.71" transform="rotate(147.7 36.77 15.77)" fill="#fff" opacity="0.94"/>
    <ellipse cx="13.67" cy="9.56" rx="0.31" ry="0.47" transform="rotate(22.8 13.67 9.56)" fill="#fff" opacity="0.97"/>
    <ellipse cx="8.31" cy="28.97" rx="0.58" ry="0.42" transform="rotate(144.6 8.31 28.97)" fill="#fff" opacity="0.93"/>
    <circle cx="18.80" cy="20.60" r="0.32" fill="#fff" opacity="0.87"/>
    <circle cx="17.32" cy="24.24" r="0.56" fill="#fff" opacity="0.87"/>
    <ellipse cx="37.46" cy="24.80" rx="0.42" ry="0.42" transform="rotate(69.8 37.46 24.80)" fill="#fff" opacity="0.88"/>
    <circle cx="12.71" cy="14.24" r="0.76" fill="#fff" opacity="0.93"/>
    <circle cx="13.63" cy="14.26" r="0.40" fill="#fff" opacity="0.83"/>
    <circle cx="13.69" cy="13.24" r="0.47" fill="#fff" opacity="0.86"/>
    <circle cx="12.17" cy="14.26" r="0.49" fill="#fff" opacity="0.87"/>
    <circle cx="14.51" cy="14.39" r="0.66" fill="#fff" opacity="0.83"/>
    <ellipse cx="12.36" cy="15.22" rx="0.29" ry="0.27" transform="rotate(93.0 12.36 15.22)" fill="#fff" opacity="0.94"/>
    <circle cx="13.81" cy="14.64" r="0.42" fill="#fff" opacity="0.84"/>
    <circle cx="13.54" cy="14.79" r="0.41" fill="#fff" opacity="0.79"/>
    <circle cx="13.54" cy="15.91" r="0.75" fill="#fff" opacity="0.91"/>
    <circle cx="13.83" cy="14.70" r="0.69" fill="#fff" opacity="0.81"/>
    <ellipse cx="14.25" cy="15.51" rx="0.37" ry="0.29" transform="rotate(134.1 14.25 15.51)" fill="#fff" opacity="0.79"/>
    <ellipse cx="14.07" cy="14.46" rx="0.35" ry="0.26" transform="rotate(64.4 14.07 14.46)" fill="#fff" opacity="0.93"/>
    <circle cx="14.02" cy="14.24" r="0.54" fill="#fff" opacity="0.89"/>
    <circle cx="28.50" cy="17.61" r="0.47" fill="#fff" opacity="0.87"/>
    <ellipse cx="28.39" cy="17.63" rx="0.49" ry="0.36" transform="rotate(133.8 28.39 17.63)" fill="#fff" opacity="0.84"/>
    <ellipse cx="27.99" cy="17.64" rx="0.54" ry="0.45" transform="rotate(58.8 27.99 17.64)" fill="#fff" opacity="0.84"/>
    <ellipse cx="28.58" cy="17.32" rx="0.44" ry="0.38" transform="rotate(65.2 28.58 17.32)" fill="#fff" opacity="0.82"/>
    <ellipse cx="27.31" cy="18.51" rx="0.58" ry="0.57" transform="rotate(6.4 27.31 18.51)" fill="#fff" opacity="0.86"/>
    <circle cx="27.04" cy="16.97" r="0.37" fill="#fff" opacity="0.83"/>
    <circle cx="28.30" cy="17.72" r="0.50" fill="#fff" opacity="0.88"/>
    <ellipse cx="28.06" cy="17.74" rx="0.33" ry="0.31" transform="rotate(58.3 28.06 17.74)" fill="#fff" opacity="0.93"/>
    <ellipse cx="27.98" cy="16.89" rx="0.26" ry="0.25" transform="rotate(97.7 27.98 16.89)" fill="#fff" opacity="0.89"/>
    <ellipse cx="28.75" cy="18.56" rx="0.61" ry="0.58" transform="rotate(92.0 28.75 18.56)" fill="#fff" opacity="0.87"/>
    <circle cx="28.28" cy="17.76" r="0.43" fill="#fff" opacity="0.87"/>
    <circle cx="28.15" cy="16.15" r="0.75" fill="#fff" opacity="0.84"/>
    <ellipse cx="28.04" cy="17.81" rx="0.43" ry="0.54" transform="rotate(5.4 28.04 17.81)" fill="#fff" opacity="0.84"/>
    <circle cx="28.26" cy="16.74" r="0.70" fill="#fff" opacity="0.87"/>
    <ellipse cx="28.16" cy="16.94" rx="0.53" ry="0.43" transform="rotate(17.7 28.16 16.94)" fill="#fff" opacity="0.93"/>
    <circle cx="23.59" cy="17.06" r="0.59" fill="#fff" opacity="0.96"/>
    <circle cx="22.36" cy="18.28" r="0.61" fill="#fff" opacity="0.91"/>
    <ellipse cx="24.25" cy="17.50" rx="0.31" ry="0.36" transform="rotate(70.0 24.25 17.50)" fill="#fff" opacity="0.91"/>
    <circle cx="23.41" cy="17.32" r="0.32" fill="#fff" opacity="0.85"/>
    <ellipse cx="23.06" cy="16.09" rx="0.55" ry="0.35" transform="rotate(18.8 23.06 16.09)" fill="#fff" opacity="0.93"/>
    <circle cx="23.51" cy="17.23" r="0.60" fill="#fff" opacity="0.88"/>
    <circle cx="23.95" cy="18.81" r="0.55" fill="#fff" opacity="0.90"/>
    <ellipse cx="24.19" cy="16.86" rx="0.48" ry="0.57" transform="rotate(121.4 24.19 16.86)" fill="#fff" opacity="0.90"/>
    <ellipse cx="23.09" cy="17.62" rx="0.59" ry="0.37" transform="rotate(126.6 23.09 17.62)" fill="#fff" opacity="0.95"/>
    <circle cx="23.44" cy="18.03" r="0.39" fill="#fff" opacity="0.90"/>
    <ellipse cx="23.82" cy="18.38" rx="0.48" ry="0.61" transform="rotate(87.0 23.82 18.38)" fill="#fff" opacity="0.87"/>
    <circle cx="23.41" cy="17.37" r="0.74" fill="#fff" opacity="0.85"/>
    <ellipse cx="22.74" cy="17.02" rx="0.33" ry="0.41" transform="rotate(96.2 22.74 17.02)" fill="#fff" opacity="0.82"/>
    <ellipse cx="22.22" cy="18.19" rx="0.68" ry="0.60" transform="rotate(71.2 22.22 18.19)" fill="#fff" opacity="0.86"/>
    <ellipse cx="30.32" cy="15.22" rx="0.70" ry="0.55" transform="rotate(84.8 30.32 15.22)" fill="#fff" opacity="0.82"/>
    <circle cx="30.14" cy="14.82" r="0.66" fill="#fff" opacity="0.91"/>
    <ellipse cx="29.72" cy="16.26" rx="0.48" ry="0.32" transform="rotate(143.2 29.72 16.26)" fill="#fff" opacity="0.93"/>
    <circle cx="30.13" cy="16.01" r="0.29" fill="#fff" opacity="0.85"/>
    <circle cx="30.46" cy="13.94" r="0.72" fill="#fff" opacity="0.84"/>
    <ellipse cx="29.45" cy="15.93" rx="0.38" ry="0.47" transform="rotate(94.7 29.45 15.93)" fill="#fff" opacity="0.80"/>
    <ellipse cx="30.82" cy="14.58" rx="0.70" ry="0.48" transform="rotate(3.7 30.82 14.58)" fill="#fff" opacity="0.91"/>
    <circle cx="30.37" cy="15.58" r="0.48" fill="#fff" opacity="0.84"/>
    <circle cx="30.23" cy="15.49" r="0.46" fill="#fff" opacity="0.94"/>
    <circle cx="31.63" cy="15.96" r="0.49" fill="#fff" opacity="0.85"/>
    <circle cx="31.13" cy="14.42" r="0.40" fill="#fff" opacity="0.85"/>
    <circle cx="30.30" cy="15.26" r="0.37" fill="#fff" opacity="0.89"/>
    <circle cx="30.25" cy="15.24" r="0.43" fill="#fff" opacity="0.82"/>
    <circle cx="30.70" cy="14.63" r="0.40" fill="#fff" opacity="0.91"/>
    <circle cx="18.12" cy="16.56" r="0.62" fill="#fff" opacity="0.84"/>
    <circle cx="18.82" cy="17.55" r="0.73" fill="#fff" opacity="0.93"/>
    <circle cx="17.28" cy="17.18" r="0.32" fill="#fff" opacity="0.83"/>
    <circle cx="19.07" cy="15.70" r="0.54" fill="#fff" opacity="0.89"/>
    <circle cx="18.01" cy="16.25" r="0.30" fill="#fff" opacity="0.81"/>
    <ellipse cx="18.07" cy="16.77" rx="0.42" ry="0.40" transform="rotate(119.6 18.07 16.77)" fill="#fff" opacity="0.84"/>
    <circle cx="18.61" cy="18.05" r="0.49" fill="#fff" opacity="0.82"/>
    <circle cx="18.06" cy="16.54" r="0.74" fill="#fff" opacity="0.84"/>
    <ellipse cx="18.39" cy="17.07" rx="0.48" ry="0.43" transform="rotate(118.5 18.39 17.07)" fill="#fff" opacity="0.87"/>
    <ellipse cx="19.55" cy="16.14" rx="0.46" ry="0.45" transform="rotate(124.0 19.55 16.14)" fill="#fff" opacity="0.88"/>
    <ellipse cx="16.51" cy="16.18" rx="0.68" ry="0.41" transform="rotate(30.8 16.51 16.18)" fill="#fff" opacity="0.96"/>
    <circle cx="18.72" cy="17.80" r="0.69" fill="#fff" opacity="0.92"/>
    <circle cx="15.36" cy="19.02" r="0.63" fill="#fff" opacity="0.79"/>
    <circle cx="15.12" cy="19.15" r="0.76" fill="#fff" opacity="0.86"/>
    <circle cx="14.88" cy="19.97" r="0.61" fill="#fff" opacity="0.86"/>
    <ellipse cx="16.10" cy="19.69" rx="0.33" ry="0.38" transform="rotate(86.7 16.10 19.69)" fill="#fff" opacity="0.80"/>
    <ellipse cx="15.79" cy="18.18" rx="0.56" ry="0.54" transform="rotate(103.7 15.79 18.18)" fill="#fff" opacity="0.87"/>
    <circle cx="14.85" cy="19.95" r="0.45" fill="#fff" opacity="0.78"/>
    <ellipse cx="15.08" cy="18.29" rx="0.73" ry="0.42" transform="rotate(24.1 15.08 18.29)" fill="#fff" opacity="0.89"/>
    <circle cx="15.17" cy="19.23" r="0.58" fill="#fff" opacity="0.82"/>
    <circle cx="16.57" cy="18.25" r="0.38" fill="#fff" opacity="0.82"/>
    <ellipse cx="15.42" cy="18.77" rx="0.65" ry="0.59" transform="rotate(45.3 15.42 18.77)" fill="#fff" opacity="0.84"/>
    <circle cx="14.16" cy="18.39" r="0.34" fill="#fff" opacity="0.84"/>
    <ellipse cx="14.42" cy="19.29" rx="0.85" ry="0.55" transform="rotate(129.0 14.42 19.29)" fill="#fff" opacity="0.79"/>
    <circle cx="17.59" cy="12.20" r="0.50" fill="#fff" opacity="0.82"/>
    <ellipse cx="18.27" cy="12.74" rx="0.49" ry="0.56" transform="rotate(158.3 18.27 12.74)" fill="#fff" opacity="0.83"/>
    <circle cx="18.55" cy="13.06" r="0.77" fill="#fff" opacity="0.86"/>
    <ellipse cx="18.66" cy="13.93" rx="0.37" ry="0.31" transform="rotate(168.6 18.66 13.93)" fill="#fff" opacity="0.80"/>
    <ellipse cx="17.59" cy="14.32" rx="0.64" ry="0.45" transform="rotate(53.2 17.59 14.32)" fill="#fff" opacity="0.94"/>
    <circle cx="17.31" cy="12.66" r="0.68" fill="#fff" opacity="0.82"/>
    <circle cx="17.93" cy="13.01" r="0.71" fill="#fff" opacity="0.94"/>
    <circle cx="18.82" cy="14.04" r="0.63" fill="#fff" opacity="0.83"/>
    <circle cx="18.31" cy="12.98" r="0.76" fill="#fff" opacity="0.91"/>
    <circle cx="18.33" cy="13.06" r="0.56" fill="#fff" opacity="0.92"/>
    <circle cx="18.67" cy="12.99" r="0.40" fill="#fff" opacity="0.94"/>
    <circle cx="18.72" cy="13.10" r="0.38" fill="#fff" opacity="0.79"/>
  </g>
  <ellipse cx="19.96" cy="4.39" rx="0.41" ry="0.47" transform="rotate(123.6 19.96 4.39)" fill="#fff" opacity="0.86"/>
    <circle cx="35.88" cy="10.84" r="0.36" fill="#fff" opacity="0.72"/>
    <circle cx="28.04" cy="5.37" r="0.52" fill="#fff" opacity="0.70"/>
    <circle cx="26.42" cy="4.69" r="0.37" fill="#fff" opacity="0.86"/>
    <circle cx="8.63" cy="10.12" r="0.44" fill="#fff" opacity="0.90"/>
    <circle cx="5.29" cy="13.66" r="0.32" fill="#fff" opacity="0.86"/>
    <ellipse cx="11.67" cy="7.14" rx="0.35" ry="0.41" transform="rotate(68.5 11.67 7.14)" fill="#fff" opacity="0.86"/>
    <ellipse cx="39.06" cy="16.73" rx="0.54" ry="0.48" transform="rotate(164.6 39.06 16.73)" fill="#fff" opacity="0.75"/>
    <circle cx="18.55" cy="4.16" r="0.55" fill="#fff" opacity="0.85"/>
    <circle cx="39.57" cy="18.66" r="0.61" fill="#fff" opacity="0.71"/>
    <circle cx="26.64" cy="4.68" r="0.48" fill="#fff" opacity="0.79"/>
    <circle cx="21.48" cy="4.07" r="0.50" fill="#fff" opacity="0.75"/>
    <ellipse cx="29.24" cy="5.55" rx="0.26" ry="0.34" transform="rotate(90.7 29.24 5.55)" fill="#fff" opacity="0.88"/>
    <ellipse cx="7.91" cy="10.71" rx="0.41" ry="0.38" transform="rotate(173.9 7.91 10.71)" fill="#fff" opacity="0.73"/>
    <ellipse cx="4.28" cy="16.19" rx="0.40" ry="0.41" transform="rotate(99.1 4.28 16.19)" fill="#fff" opacity="0.78"/>
    <circle cx="33.04" cy="7.37" r="0.58" fill="#fff" opacity="0.72"/>

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
function oliebolIcon(id, unconfirmed){
  var g = "bol-" + id;
  var c = "c-bol-" + id;
  var p = "p-bol-" + id;
  var html = '<svg class="oliebol-icon' + (unconfirmed ? ' oliebol-icon-unconfirmed' : '') + '" viewBox="0 0 44 44" width="44" height="44" aria-hidden="true" focusable="false"><defs><radialGradient id="'+g+'" cx="33%" cy="30%" r="72%"><stop offset="0%" stop-color="#F6D7A8"/><stop offset="26%" stop-color="#D4953A"/><stop offset="58%" stop-color="#A35A18"/><stop offset="82%" stop-color="#6B2E0C"/><stop offset="100%" stop-color="#3F1A06"/></radialGradient><clipPath id="'+c+'"><path d="M 39.87 22.00 C 39.92 23.99 39.78 25.69 39.17 27.58 C 38.55 29.47 37.81 31.12 36.45 32.50 C 35.09 33.88 33.36 34.51 31.61 35.22 C 29.85 35.94 28.43 36.11 26.70 36.48 C 24.98 36.85 23.78 37.01 22.00 37.27 C 20.22 37.52 18.67 38.13 16.83 37.90 C 15.00 37.68 13.35 37.10 11.81 36.03 C 10.27 34.96 9.23 33.59 8.27 31.97 C 7.31 30.36 7.13 28.84 6.46 27.05 C 5.79 25.25 4.92 23.93 4.56 22.00 C 4.20 20.07 3.95 18.20 4.49 16.31 C 5.02 14.42 6.23 13.01 7.53 11.49 C 8.83 9.97 10.12 9.05 11.72 7.86 C 13.33 6.66 14.58 5.47 16.43 4.87 C 18.28 4.26 20.02 4.42 22.00 4.50 C 23.98 4.59 25.51 4.81 27.41 5.34 C 29.32 5.86 30.99 6.29 32.61 7.40 C 34.23 8.51 35.28 9.89 36.42 11.53 C 37.55 13.16 38.28 14.62 38.91 16.51 C 39.53 18.39 39.83 20.01 39.87 22.00 Z"/></clipPath><filter id="'+p+'" x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="0.42"/></filter></defs><path d="M 39.87 22.00 C 39.92 23.99 39.78 25.69 39.17 27.58 C 38.55 29.47 37.81 31.12 36.45 32.50 C 35.09 33.88 33.36 34.51 31.61 35.22 C 29.85 35.94 28.43 36.11 26.70 36.48 C 24.98 36.85 23.78 37.01 22.00 37.27 C 20.22 37.52 18.67 38.13 16.83 37.90 C 15.00 37.68 13.35 37.10 11.81 36.03 C 10.27 34.96 9.23 33.59 8.27 31.97 C 7.31 30.36 7.13 28.84 6.46 27.05 C 5.79 25.25 4.92 23.93 4.56 22.00 C 4.20 20.07 3.95 18.20 4.49 16.31 C 5.02 14.42 6.23 13.01 7.53 11.49 C 8.83 9.97 10.12 9.05 11.72 7.86 C 13.33 6.66 14.58 5.47 16.43 4.87 C 18.28 4.26 20.02 4.42 22.00 4.50 C 23.98 4.59 25.51 4.81 27.41 5.34 C 29.32 5.86 30.99 6.29 32.61 7.40 C 34.23 8.51 35.28 9.89 36.42 11.53 C 37.55 13.16 38.28 14.62 38.91 16.51 C 39.53 18.39 39.83 20.01 39.87 22.00 Z" fill="url(#'+g+')" stroke="#4A1E08" stroke-width="0.85" stroke-linejoin="round"/><g clip-path="url(#'+c+')"><path d="M 38.28 30.20 C 38.21 30.80 37.86 31.30 37.30 31.56 C 36.74 31.82 36.25 31.69 35.75 31.39 C 35.25 31.09 34.98 30.83 35.03 30.21 C 35.08 29.59 35.40 28.88 35.96 28.57 C 36.53 28.27 37.10 28.46 37.61 28.81 C 38.12 29.17 38.35 29.59 38.28 30.20 Z" fill="#4A1E08" opacity="0.15"/><path d="M 17.25 6.43 C 17.26 6.89 17.03 7.09 16.32 7.25 C 15.61 7.41 14.89 7.39 14.00 7.14 C 13.12 6.89 12.22 6.53 12.30 6.11 C 12.39 5.68 13.52 5.41 14.39 5.20 C 15.26 4.99 15.64 4.88 16.27 5.15 C 16.89 5.42 17.24 5.97 17.25 6.43 Z" fill="#4A1E08" opacity="0.13"/><path d="M 25.91 38.84 C 25.87 39.51 25.68 40.20 25.15 40.54 C 24.61 40.88 24.03 40.73 23.47 40.37 C 22.91 40.01 22.57 39.50 22.58 38.91 C 22.59 38.31 22.90 37.98 23.51 37.67 C 24.12 37.36 24.82 37.23 25.35 37.48 C 25.88 37.74 25.96 38.17 25.91 38.84 Z" fill="#4A1E08" opacity="0.16"/><path d="M 40.66 25.25 C 40.61 25.97 40.48 26.70 39.76 27.13 C 39.04 27.56 38.06 27.62 37.38 27.21 C 36.71 26.80 36.58 25.99 36.68 25.29 C 36.78 24.58 37.13 24.32 37.85 24.00 C 38.58 23.68 39.35 23.56 39.97 23.83 C 40.59 24.11 40.70 24.52 40.66 25.25 Z" fill="#4A1E08" opacity="0.15"/><path d="M 36.11 32.16 C 36.13 32.85 36.21 33.45 35.35 33.68 C 34.49 33.92 33.02 33.54 32.21 33.22 C 31.39 32.90 31.52 32.83 31.63 32.21 C 31.75 31.60 31.94 30.81 32.74 30.44 C 33.54 30.08 34.52 30.18 35.26 30.56 C 36.00 30.94 36.10 31.47 36.11 32.16 Z" fill="#4A1E08" opacity="0.16"/><path d="M 8.86 27.51 C 8.69 28.09 8.11 28.82 7.36 29.19 C 6.60 29.55 6.07 29.52 5.43 29.17 C 4.79 28.82 4.44 28.28 4.44 27.60 C 4.44 26.92 4.62 26.31 5.42 26.09 C 6.22 25.86 7.34 26.27 8.09 26.58 C 8.85 26.90 9.02 26.94 8.86 27.51 Z" fill="#4A1E08" opacity="0.18"/><path d="M 24.41 6.80 C 24.49 7.49 24.18 7.77 23.33 8.07 C 22.48 8.37 21.44 8.43 20.56 8.17 C 19.68 7.91 19.29 7.52 19.32 6.90 C 19.35 6.29 19.89 5.81 20.69 5.37 C 21.50 4.94 22.16 4.60 22.98 4.92 C 23.80 5.23 24.33 6.11 24.41 6.80 Z" fill="#4A1E08" opacity="0.13"/><path d="M 15.68 35.84 C 15.55 36.63 15.20 37.48 14.52 37.81 C 13.84 38.14 13.19 37.67 12.59 37.35 C 11.99 37.02 11.81 36.91 11.79 36.32 C 11.77 35.74 11.76 35.15 12.49 34.69 C 13.22 34.24 14.42 34.01 15.12 34.26 C 15.82 34.51 15.81 35.06 15.68 35.84 Z" fill="#4A1E08" opacity="0.12"/><path d="M 39.87 22.00 C 39.92 23.99 39.78 25.69 39.17 27.58 C 38.55 29.47 37.81 31.12 36.45 32.50 C 35.09 33.88 33.36 34.51 31.61 35.22 C 29.85 35.94 28.43 36.11 26.70 36.48 C 24.98 36.85 23.78 37.01 22.00 37.27 C 20.22 37.52 18.67 38.13 16.83 37.90 C 15.00 37.68 13.35 37.10 11.81 36.03 C 10.27 34.96 9.23 33.59 8.27 31.97 C 7.31 30.36 7.13 28.84 6.46 27.05 C 5.79 25.25 4.92 23.93 4.56 22.00 C 4.20 20.07 3.95 18.20 4.49 16.31 C 5.02 14.42 6.23 13.01 7.53 11.49 C 8.83 9.97 10.12 9.05 11.72 7.86 C 13.33 6.66 14.58 5.47 16.43 4.87 C 18.28 4.26 20.02 4.42 22.00 4.50 C 23.98 4.59 25.51 4.81 27.41 5.34 C 29.32 5.86 30.99 6.29 32.61 7.40 C 34.23 8.51 35.28 9.89 36.42 11.53 C 37.55 13.16 38.28 14.62 38.91 16.51 C 39.53 18.39 39.83 20.01 39.87 22.00 Z" fill="none" stroke="#4A1E08" stroke-width="2.2" opacity="0.22"/><path d="M 20.87 15.14 C 20.83 16.26 20.22 16.65 19.20 17.29 C 18.18 17.93 17.50 18.26 16.22 18.04 C 14.94 17.83 14.11 17.37 13.37 16.31 C 12.64 15.24 12.46 14.04 12.89 13.20 C 13.32 12.37 13.90 12.72 15.32 12.51 C 16.75 12.29 18.14 11.64 19.36 12.22 C 20.58 12.80 20.90 14.03 20.87 15.14 Z" fill="#FBE9C8" opacity="0.20"/><g filter="url(#'+p+')"><path d="M 20.65 18.47 C 20.69 19.18 20.18 19.55 19.01 20.10 C 17.83 20.65 16.96 20.92 15.31 20.97 C 13.66 21.02 12.41 20.88 11.52 20.33 C 10.63 19.78 11.23 19.31 11.25 18.48 C 11.26 17.65 10.71 17.28 11.59 16.56 C 12.46 15.84 13.61 15.13 15.21 15.20 C 16.80 15.26 17.62 16.14 18.82 16.86 C 20.02 17.58 20.61 17.76 20.65 18.47 Z" fill="#fff" opacity="0.11616215098741936"/><path d="M 28.40 21.25 C 28.48 22.40 28.51 22.20 27.97 22.97 C 27.43 23.74 26.72 24.67 25.94 24.75 C 25.15 24.83 25.12 24.26 24.39 23.35 C 23.66 22.43 22.70 21.54 22.62 20.58 C 22.54 19.62 23.31 19.65 24.02 18.97 C 24.73 18.29 25.05 17.75 25.84 17.48 C 26.62 17.21 27.04 16.93 27.60 17.76 C 28.17 18.59 28.32 20.11 28.40 21.25 Z" fill="#fff" opacity="0.16035794322000957"/><path d="M 20.36 22.08 C 20.48 23.06 21.24 23.47 20.51 24.34 C 19.78 25.21 18.28 25.80 17.05 26.05 C 15.83 26.29 15.58 26.32 14.95 25.45 C 14.32 24.57 14.09 23.25 14.18 22.07 C 14.27 20.90 14.62 20.87 15.34 20.12 C 16.07 19.36 16.45 18.68 17.48 18.64 C 18.50 18.59 19.36 19.15 19.99 19.91 C 20.63 20.67 20.25 21.11 20.36 22.08 Z" fill="#fff" opacity="0.20641410751966585"/><path d="M 30.05 20.29 C 30.23 21.14 30.35 21.37 29.88 22.04 C 29.41 22.70 28.89 23.37 27.91 23.31 C 26.93 23.25 26.13 22.55 25.43 21.78 C 24.73 21.01 24.59 20.65 24.72 19.80 C 24.86 18.95 25.31 18.55 26.03 17.92 C 26.75 17.29 27.34 16.88 28.01 16.94 C 28.68 16.99 28.62 17.42 29.07 18.16 C 29.52 18.90 29.87 19.43 30.05 20.29 Z" fill="#fff" opacity="0.1741708975926076"/><path d="M 22.70 19.56 C 22.64 20.89 22.37 22.33 21.70 23.30 C 21.03 24.27 20.81 24.21 19.67 23.97 C 18.53 23.73 17.13 22.91 16.53 22.19 C 15.93 21.47 16.72 21.71 16.94 20.70 C 17.16 19.69 17.06 18.72 17.53 17.59 C 17.99 16.46 18.08 15.64 19.05 15.56 C 20.03 15.48 21.17 16.34 21.97 17.22 C 22.77 18.10 22.76 18.22 22.70 19.56 Z" fill="#fff" opacity="0.20191645107149464"/><path d="M 27.02 21.48 C 27.16 22.46 27.41 23.17 26.65 23.83 C 25.88 24.49 24.82 24.42 23.56 24.49 C 22.30 24.55 22.14 24.67 20.92 24.12 C 19.70 23.57 18.27 22.98 18.02 21.98 C 17.76 20.99 18.70 20.34 19.75 19.59 C 20.79 18.84 21.39 18.62 22.77 18.57 C 24.15 18.53 25.07 18.76 26.01 19.40 C 26.94 20.04 26.88 20.51 27.02 21.48 Z" fill="#fff" opacity="0.2017084563501083"/><path d="M 30.55 21.93 C 30.85 22.79 31.39 22.76 30.84 23.34 C 30.28 23.93 29.30 24.52 28.04 24.58 C 26.78 24.65 25.86 24.17 25.11 23.64 C 24.36 23.11 24.69 22.97 24.64 22.18 C 24.58 21.40 24.14 20.74 24.85 20.05 C 25.56 19.36 26.86 19.19 27.88 19.05 C 28.89 18.92 28.88 18.80 29.47 19.43 C 30.06 20.07 30.25 21.07 30.55 21.93 Z" fill="#fff" opacity="0.15730541552851193"/><path d="M 27.25 17.97 C 27.02 19.21 27.32 19.92 26.53 20.88 C 25.73 21.83 24.80 22.46 23.62 22.31 C 22.45 22.16 22.08 21.10 21.18 20.20 C 20.27 19.29 19.69 19.34 19.51 18.19 C 19.33 17.04 19.57 15.92 20.36 14.96 C 21.16 14.00 21.55 13.76 23.13 13.83 C 24.71 13.89 26.64 14.35 27.54 15.26 C 28.45 16.17 27.47 16.74 27.25 17.97 Z" fill="#fff" opacity="0.1200787536606527"/><path d="M 34.55 13.59 C 34.52 14.76 33.51 15.50 32.49 16.24 C 31.47 16.97 31.21 16.86 29.92 16.93 C 28.63 17.00 27.58 17.21 26.62 16.55 C 25.66 15.89 25.47 15.17 25.55 13.92 C 25.63 12.68 25.93 11.72 26.98 10.88 C 28.03 10.05 29.09 10.11 30.33 10.12 C 31.57 10.13 31.69 10.16 32.62 10.92 C 33.55 11.69 34.58 12.42 34.55 13.59 Z" fill="#fff" opacity="0.13704123867837176"/><path d="M 17.86 15.42 C 17.72 16.31 18.02 17.22 17.16 17.98 C 16.31 18.74 15.39 18.97 13.98 18.89 C 12.56 18.80 11.55 18.25 10.74 17.59 C 9.94 16.93 10.06 16.82 10.31 15.88 C 10.56 14.93 11.15 13.90 11.88 13.31 C 12.61 12.72 12.33 13.05 13.63 13.19 C 14.93 13.34 16.87 13.47 17.80 13.96 C 18.73 14.45 18.00 14.54 17.86 15.42 Z" fill="#fff" opacity="0.14915636411427186"/><path d="M 26.62 22.22 C 26.70 23.32 26.80 23.24 26.15 24.07 C 25.50 24.89 24.75 25.72 23.66 25.98 C 22.57 26.24 22.06 26.08 21.20 25.23 C 20.35 24.38 19.98 23.32 19.78 22.13 C 19.58 20.93 19.50 20.64 20.28 19.81 C 21.06 18.98 22.11 18.50 23.32 18.34 C 24.52 18.18 25.04 18.22 25.77 19.08 C 26.49 19.93 26.53 21.13 26.62 22.22 Z" fill="#fff" opacity="0.21210259776061477"/><path d="M 21.52 16.93 C 21.48 17.94 21.90 18.91 21.46 19.57 C 21.03 20.24 20.52 19.83 19.53 19.97 C 18.54 20.10 17.77 20.76 16.96 20.17 C 16.16 19.59 15.74 18.59 15.89 17.29 C 16.03 15.99 16.99 15.13 17.62 14.27 C 18.26 13.41 17.88 13.24 18.77 13.40 C 19.66 13.56 21.06 14.22 21.66 14.99 C 22.27 15.77 21.57 15.92 21.52 16.93 Z" fill="#fff" opacity="0.15400704688885455"/><path d="M 21.64 16.25 C 21.79 17.31 20.75 17.75 19.62 18.60 C 18.50 19.44 17.94 20.08 16.51 20.10 C 15.09 20.12 13.94 19.61 13.14 18.67 C 12.33 17.73 12.75 16.95 12.86 15.82 C 12.96 14.70 12.82 14.46 13.61 13.56 C 14.41 12.67 15.29 11.70 16.47 11.75 C 17.64 11.80 17.81 12.80 18.95 13.79 C 20.09 14.78 21.49 15.19 21.64 16.25 Z" fill="#fff" opacity="0.17070572079381485"/><path d="M 28.30 18.15 C 28.48 18.76 28.17 19.33 27.21 19.72 C 26.25 20.12 25.28 19.86 23.94 19.93 C 22.61 20.01 22.02 20.37 21.14 20.07 C 20.26 19.77 19.97 19.33 19.93 18.56 C 19.88 17.80 20.01 17.11 20.92 16.59 C 21.84 16.07 22.89 16.11 24.09 16.19 C 25.30 16.27 25.46 16.53 26.38 16.96 C 27.31 17.39 28.12 17.55 28.30 18.15 Z" fill="#fff" opacity="0.1531524268342583"/><ellipse cx="27.87" cy="16.89" rx="0.20" ry="0.32" transform="rotate(98.6 27.87 16.89)" fill="#fff" opacity="0.59"/><circle cx="33.86" cy="24.00" r="0.31" fill="#fff" opacity="0.64"/><ellipse cx="32.31" cy="20.58" rx="0.43" ry="0.51" transform="rotate(140.0 32.31 20.58)" fill="#fff" opacity="0.64"/><circle cx="19.24" cy="5.83" r="0.37" fill="#fff" opacity="0.70"/><circle cx="35.69" cy="14.96" r="0.51" fill="#fff" opacity="0.60"/><ellipse cx="17.80" cy="18.12" rx="0.27" ry="0.34" transform="rotate(55.7 17.80 18.12)" fill="#fff" opacity="0.60"/><circle cx="35.80" cy="27.18" r="0.53" fill="#fff" opacity="0.56"/><circle cx="28.72" cy="25.87" r="0.31" fill="#fff" opacity="0.68"/><circle cx="27.84" cy="9.94" r="0.48" fill="#fff" opacity="0.74"/><circle cx="31.28" cy="10.28" r="0.45" fill="#fff" opacity="0.77"/><circle cx="16.17" cy="26.08" r="0.38" fill="#fff" opacity="0.76"/><circle cx="23.40" cy="22.05" r="0.39" fill="#fff" opacity="0.75"/><circle cx="24.24" cy="18.29" r="0.32" fill="#fff" opacity="0.72"/><circle cx="21.20" cy="23.72" r="0.40" fill="#fff" opacity="0.75"/><ellipse cx="28.58" cy="16.44" rx="0.38" ry="0.48" transform="rotate(28.9 28.58 16.44)" fill="#fff" opacity="0.77"/><circle cx="24.12" cy="7.88" r="0.33" fill="#fff" opacity="0.78"/><ellipse cx="33.09" cy="34.11" rx="0.55" ry="0.48" transform="rotate(134.0 33.09 34.11)" fill="#fff" opacity="0.63"/><ellipse cx="32.03" cy="27.48" rx="0.42" ry="0.43" transform="rotate(82.7 32.03 27.48)" fill="#fff" opacity="0.70"/><ellipse cx="37.91" cy="20.95" rx="0.29" ry="0.23" transform="rotate(161.6 37.91 20.95)" fill="#fff" opacity="0.67"/><circle cx="35.41" cy="13.37" r="0.31" fill="#fff" opacity="0.52"/><circle cx="7.80" cy="25.15" r="0.39" fill="#fff" opacity="0.62"/><ellipse cx="14.13" cy="30.55" rx="0.34" ry="0.35" transform="rotate(123.3 14.13 30.55)" fill="#fff" opacity="0.69"/><circle cx="30.21" cy="16.20" r="0.54" fill="#fff" opacity="0.70"/><circle cx="12.81" cy="18.24" r="0.45" fill="#fff" opacity="0.51"/><circle cx="30.24" cy="26.95" r="0.34" fill="#fff" opacity="0.73"/><circle cx="29.53" cy="17.64" r="0.36" fill="#fff" opacity="0.77"/><ellipse cx="27.15" cy="19.83" rx="0.21" ry="0.19" transform="rotate(58.1 27.15 19.83)" fill="#fff" opacity="0.69"/><circle cx="27.33" cy="31.56" r="0.51" fill="#fff" opacity="0.78"/><ellipse cx="31.59" cy="32.45" rx="0.51" ry="0.46" transform="rotate(136.8 31.59 32.45)" fill="#fff" opacity="0.61"/><circle cx="22.53" cy="7.86" r="0.27" fill="#fff" opacity="0.76"/><circle cx="13.73" cy="32.99" r="0.39" fill="#fff" opacity="0.59"/><circle cx="24.01" cy="11.59" r="0.46" fill="#fff" opacity="0.77"/><circle cx="27.22" cy="18.69" r="0.43" fill="#fff" opacity="0.73"/><circle cx="15.22" cy="29.77" r="0.38" fill="#fff" opacity="0.57"/><circle cx="6.63" cy="25.41" r="0.34" fill="#fff" opacity="0.55"/><circle cx="17.05" cy="19.12" r="0.54" fill="#fff" opacity="0.56"/><circle cx="22.62" cy="30.61" r="0.44" fill="#fff" opacity="0.72"/><ellipse cx="11.62" cy="16.05" rx="0.32" ry="0.49" transform="rotate(31.4 11.62 16.05)" fill="#fff" opacity="0.52"/><circle cx="22.16" cy="10.85" r="0.54" fill="#fff" opacity="0.68"/><circle cx="34.60" cy="31.19" r="0.37" fill="#fff" opacity="0.51"/><circle cx="22.19" cy="23.85" r="0.39" fill="#fff" opacity="0.63"/><circle cx="26.10" cy="14.15" r="0.52" fill="#fff" opacity="0.54"/><ellipse cx="18.93" cy="35.35" rx="0.53" ry="0.29" transform="rotate(121.7 18.93 35.35)" fill="#fff" opacity="0.74"/><circle cx="28.49" cy="9.09" r="0.47" fill="#fff" opacity="0.67"/><circle cx="24.05" cy="34.58" r="0.32" fill="#fff" opacity="0.63"/><circle cx="29.79" cy="32.58" r="0.48" fill="#fff" opacity="0.51"/><circle cx="34.57" cy="15.89" r="0.53" fill="#fff" opacity="0.77"/><ellipse cx="21.56" cy="12.94" rx="0.41" ry="0.38" transform="rotate(6.9 21.56 12.94)" fill="#fff" opacity="0.59"/><circle cx="20.66" cy="7.07" r="0.36" fill="#fff" opacity="0.70"/><circle cx="34.27" cy="24.34" r="0.43" fill="#fff" opacity="0.55"/><ellipse cx="26.09" cy="10.63" rx="0.46" ry="0.37" transform="rotate(54.7 26.09 10.63)" fill="#fff" opacity="0.73"/><circle cx="21.72" cy="26.50" r="0.50" fill="#fff" opacity="0.61"/><circle cx="36.06" cy="17.72" r="0.29" fill="#fff" opacity="0.57"/><circle cx="34.18" cy="17.31" r="0.36" fill="#fff" opacity="0.73"/><ellipse cx="12.59" cy="16.05" rx="0.54" ry="0.45" transform="rotate(30.5 12.59 16.05)" fill="#fff" opacity="0.67"/><circle cx="13.50" cy="22.22" r="0.54" fill="#fff" opacity="0.56"/><circle cx="31.09" cy="22.30" r="0.45" fill="#fff" opacity="0.64"/><circle cx="10.43" cy="16.21" r="0.33" fill="#fff" opacity="0.76"/><circle cx="36.85" cy="24.63" r="0.31" fill="#fff" opacity="0.62"/><circle cx="27.46" cy="17.90" r="0.35" fill="#fff" opacity="0.64"/><circle cx="8.49" cy="25.15" r="0.55" fill="#fff" opacity="0.52"/><ellipse cx="25.95" cy="7.68" rx="0.54" ry="0.57" transform="rotate(143.7 25.95 7.68)" fill="#fff" opacity="0.59"/><ellipse cx="16.22" cy="20.69" rx="0.32" ry="0.37" transform="rotate(67.3 16.22 20.69)" fill="#fff" opacity="0.57"/><ellipse cx="11.42" cy="18.91" rx="0.44" ry="0.40" transform="rotate(146.2 11.42 18.91)" fill="#fff" opacity="0.68"/><ellipse cx="10.84" cy="17.26" rx="0.56" ry="0.36" transform="rotate(49.6 10.84 17.26)" fill="#fff" opacity="0.68"/><circle cx="27.13" cy="12.13" r="0.30" fill="#fff" opacity="0.75"/><circle cx="31.62" cy="23.15" r="0.36" fill="#fff" opacity="0.58"/><circle cx="29.93" cy="12.32" r="0.40" fill="#fff" opacity="0.75"/><circle cx="27.69" cy="14.34" r="0.35" fill="#fff" opacity="0.59"/><circle cx="15.49" cy="18.57" r="0.42" fill="#fff" opacity="0.76"/><circle cx="33.38" cy="22.34" r="0.44" fill="#fff" opacity="0.52"/><circle cx="24.83" cy="9.99" r="0.41" fill="#fff" opacity="0.68"/><ellipse cx="11.59" cy="16.56" rx="0.36" ry="0.27" transform="rotate(47.8 11.59 16.56)" fill="#fff" opacity="0.63"/><circle cx="27.49" cy="29.84" r="0.43" fill="#fff" opacity="0.64"/><circle cx="23.51" cy="8.04" r="0.30" fill="#fff" opacity="0.54"/><circle cx="24.54" cy="13.17" r="0.33" fill="#fff" opacity="0.62"/><circle cx="15.53" cy="15.29" r="0.38" fill="#fff" opacity="0.78"/><circle cx="23.06" cy="27.44" r="0.54" fill="#fff" opacity="0.57"/><ellipse cx="17.36" cy="24.99" rx="0.33" ry="0.28" transform="rotate(32.9 17.36 24.99)" fill="#fff" opacity="0.69"/><ellipse cx="9.04" cy="20.59" rx="0.43" ry="0.39" transform="rotate(12.4 9.04 20.59)" fill="#fff" opacity="0.73"/><ellipse cx="33.96" cy="24.13" rx="0.43" ry="0.43" transform="rotate(154.7 33.96 24.13)" fill="#fff" opacity="0.77"/><ellipse cx="30.78" cy="28.54" rx="0.48" ry="0.50" transform="rotate(22.5 30.78 28.54)" fill="#fff" opacity="0.72"/><ellipse cx="30.81" cy="11.66" rx="0.41" ry="0.26" transform="rotate(105.7 30.81 11.66)" fill="#fff" opacity="0.59"/><circle cx="17.89" cy="9.86" r="0.49" fill="#fff" opacity="0.58"/><circle cx="24.91" cy="33.98" r="0.40" fill="#fff" opacity="0.70"/><circle cx="29.57" cy="22.72" r="0.32" fill="#fff" opacity="0.69"/><ellipse cx="22.78" cy="28.25" rx="0.43" ry="0.25" transform="rotate(52.5 22.78 28.25)" fill="#fff" opacity="0.74"/><circle cx="29.19" cy="10.74" r="0.30" fill="#fff" opacity="0.64"/><circle cx="37.67" cy="24.91" r="0.27" fill="#fff" opacity="0.76"/><circle cx="16.46" cy="13.63" r="0.33" fill="#fff" opacity="0.64"/><circle cx="31.40" cy="28.45" r="0.44" fill="#fff" opacity="0.77"/><ellipse cx="35.09" cy="17.61" rx="0.41" ry="0.24" transform="rotate(16.1 35.09 17.61)" fill="#fff" opacity="0.76"/><circle cx="32.51" cy="25.46" r="0.49" fill="#fff" opacity="0.72"/><circle cx="15.93" cy="28.54" r="0.39" fill="#fff" opacity="0.59"/><circle cx="18.96" cy="18.02" r="0.53" fill="#fff" opacity="0.54"/><circle cx="23.00" cy="22.10" r="0.54" fill="#fff" opacity="0.59"/><circle cx="22.61" cy="17.34" r="0.44" fill="#fff" opacity="0.74"/><circle cx="28.36" cy="22.95" r="0.51" fill="#fff" opacity="0.56"/><circle cx="12.75" cy="10.81" r="0.45" fill="#fff" opacity="0.65"/><circle cx="20.57" cy="14.24" r="0.28" fill="#fff" opacity="0.66"/><circle cx="17.45" cy="14.34" r="0.55" fill="#fff" opacity="0.67"/><circle cx="20.69" cy="31.03" r="0.50" fill="#fff" opacity="0.59"/><circle cx="35.27" cy="19.52" r="0.49" fill="#fff" opacity="0.58"/><circle cx="14.21" cy="28.97" r="0.54" fill="#fff" opacity="0.59"/><circle cx="21.05" cy="13.51" r="0.39" fill="#fff" opacity="0.62"/><ellipse cx="34.43" cy="17.69" rx="0.30" ry="0.33" transform="rotate(145.4 34.43 17.69)" fill="#fff" opacity="0.66"/><circle cx="22.84" cy="19.10" r="0.44" fill="#fff" opacity="0.71"/><ellipse cx="30.78" cy="19.48" rx="0.34" ry="0.26" transform="rotate(119.2 30.78 19.48)" fill="#fff" opacity="0.61"/><circle cx="10.03" cy="21.80" r="0.37" fill="#fff" opacity="0.72"/><circle cx="34.40" cy="21.37" r="0.40" fill="#fff" opacity="0.66"/><circle cx="6.71" cy="21.61" r="0.30" fill="#fff" opacity="0.60"/><circle cx="15.52" cy="15.06" r="0.48" fill="#fff" opacity="0.73"/><ellipse cx="26.22" cy="17.63" rx="0.34" ry="0.42" transform="rotate(133.9 26.22 17.63)" fill="#fff" opacity="0.62"/><ellipse cx="26.25" cy="32.64" rx="0.30" ry="0.34" transform="rotate(63.1 26.25 32.64)" fill="#fff" opacity="0.60"/><circle cx="30.14" cy="20.68" r="0.39" fill="#fff" opacity="0.56"/><ellipse cx="24.96" cy="6.90" rx="0.44" ry="0.35" transform="rotate(46.9 24.96 6.90)" fill="#fff" opacity="0.76"/><circle cx="16.04" cy="26.54" r="0.44" fill="#fff" opacity="0.55"/><circle cx="21.76" cy="19.61" r="0.37" fill="#fff" opacity="0.68"/><ellipse cx="20.53" cy="20.63" rx="0.50" ry="0.40" transform="rotate(35.0 20.53 20.63)" fill="#fff" opacity="0.54"/><circle cx="20.39" cy="19.45" r="0.41" fill="#fff" opacity="0.63"/><ellipse cx="16.04" cy="25.02" rx="0.49" ry="0.40" transform="rotate(63.4 16.04 25.02)" fill="#fff" opacity="0.53"/><circle cx="12.80" cy="27.46" r="0.53" fill="#fff" opacity="0.63"/><ellipse cx="12.98" cy="22.10" rx="0.35" ry="0.42" transform="rotate(15.5 12.98 22.10)" fill="#fff" opacity="0.61"/><circle cx="9.52" cy="12.17" r="0.43" fill="#fff" opacity="0.63"/><circle cx="20.51" cy="12.54" r="0.26" fill="#fff" opacity="0.76"/><circle cx="24.16" cy="32.82" r="0.31" fill="#fff" opacity="0.71"/><ellipse cx="32.86" cy="29.06" rx="0.34" ry="0.24" transform="rotate(172.8 32.86 29.06)" fill="#fff" opacity="0.61"/><circle cx="23.38" cy="23.84" r="0.38" fill="#fff" opacity="0.58"/><ellipse cx="17.18" cy="29.22" rx="0.27" ry="0.21" transform="rotate(39.6 17.18 29.22)" fill="#fff" opacity="0.61"/><circle cx="34.07" cy="21.43" r="0.44" fill="#fff" opacity="0.73"/><circle cx="20.94" cy="20.33" r="0.41" fill="#fff" opacity="0.73"/><ellipse cx="33.56" cy="32.78" rx="0.42" ry="0.43" transform="rotate(47.2 33.56 32.78)" fill="#fff" opacity="0.59"/><circle cx="29.53" cy="12.18" r="0.49" fill="#fff" opacity="0.65"/><circle cx="14.33" cy="13.20" r="0.40" fill="#fff" opacity="0.74"/><circle cx="15.66" cy="19.73" r="0.52" fill="#fff" opacity="0.69"/><circle cx="15.80" cy="26.11" r="0.28" fill="#fff" opacity="0.59"/><ellipse cx="22.06" cy="28.19" rx="0.39" ry="0.55" transform="rotate(158.6 22.06 28.19)" fill="#fff" opacity="0.54"/><ellipse cx="19.04" cy="14.46" rx="0.57" ry="0.51" transform="rotate(48.6 19.04 14.46)" fill="#fff" opacity="0.70"/><circle cx="20.47" cy="21.66" r="0.29" fill="#fff" opacity="0.52"/><ellipse cx="9.79" cy="25.84" rx="0.43" ry="0.59" transform="rotate(58.2 9.79 25.84)" fill="#fff" opacity="0.58"/><ellipse cx="26.18" cy="23.18" rx="0.40" ry="0.30" transform="rotate(175.9 26.18 23.18)" fill="#fff" opacity="0.75"/><circle cx="15.69" cy="17.00" r="0.35" fill="#fff" opacity="0.65"/><circle cx="6.60" cy="26.80" r="0.27" fill="#fff" opacity="0.60"/><circle cx="34.55" cy="13.02" r="0.37" fill="#fff" opacity="0.60"/><circle cx="7.60" cy="14.70" r="0.30" fill="#fff" opacity="0.72"/><circle cx="30.25" cy="21.71" r="0.43" fill="#fff" opacity="0.74"/><circle cx="31.70" cy="31.60" r="0.31" fill="#fff" opacity="0.55"/><ellipse cx="6.17" cy="25.33" rx="0.57" ry="0.38" transform="rotate(18.4 6.17 25.33)" fill="#fff" opacity="0.54"/><circle cx="34.84" cy="30.50" r="0.52" fill="#fff" opacity="0.74"/><circle cx="22.19" cy="24.53" r="0.32" fill="#fff" opacity="0.76"/><circle cx="16.52" cy="27.60" r="0.44" fill="#fff" opacity="0.75"/><ellipse cx="8.80" cy="19.35" rx="0.43" ry="0.41" transform="rotate(178.2 8.80 19.35)" fill="#fff" opacity="0.58"/><circle cx="6.61" cy="16.68" r="0.53" fill="#fff" opacity="0.54"/><circle cx="29.08" cy="17.34" r="0.33" fill="#fff" opacity="0.56"/><ellipse cx="14.88" cy="19.40" rx="0.41" ry="0.28" transform="rotate(82.7 14.88 19.40)" fill="#fff" opacity="0.65"/><ellipse cx="8.69" cy="15.45" rx="0.46" ry="0.38" transform="rotate(49.8 8.69 15.45)" fill="#fff" opacity="0.54"/><circle cx="17.25" cy="26.10" r="0.43" fill="#fff" opacity="0.50"/></g><circle cx="25.96" cy="21.12" r="0.44" fill="#fff" opacity="0.93"/><ellipse cx="29.15" cy="8.83" rx="0.60" ry="0.59" transform="rotate(2.7 29.15 8.83)" fill="#fff" opacity="0.95"/><ellipse cx="23.20" cy="12.22" rx="0.48" ry="0.47" transform="rotate(113.4 23.20 12.22)" fill="#fff" opacity="0.86"/><circle cx="9.10" cy="25.50" r="0.68" fill="#fff" opacity="0.95"/><circle cx="9.06" cy="15.86" r="0.56" fill="#fff" opacity="0.93"/><circle cx="24.51" cy="23.77" r="0.44" fill="#fff" opacity="0.90"/><circle cx="34.21" cy="27.69" r="0.56" fill="#fff" opacity="0.89"/><circle cx="30.28" cy="21.05" r="0.44" fill="#fff" opacity="0.85"/><circle cx="13.48" cy="16.70" r="0.56" fill="#fff" opacity="0.93"/><circle cx="36.35" cy="21.64" r="0.32" fill="#fff" opacity="0.97"/><circle cx="23.83" cy="6.73" r="0.68" fill="#fff" opacity="0.87"/><circle cx="15.38" cy="12.02" r="0.68" fill="#fff" opacity="0.90"/><circle cx="15.30" cy="28.94" r="0.56" fill="#fff" opacity="0.90"/><circle cx="12.51" cy="25.97" r="0.44" fill="#fff" opacity="0.89"/><circle cx="16.35" cy="13.68" r="0.68" fill="#fff" opacity="0.88"/><circle cx="12.83" cy="24.68" r="0.56" fill="#fff" opacity="0.97"/><ellipse cx="33.10" cy="31.89" rx="0.46" ry="0.48" transform="rotate(24.6 33.10 31.89)" fill="#fff" opacity="0.91"/><ellipse cx="32.97" cy="10.82" rx="0.91" ry="0.72" transform="rotate(46.9 32.97 10.82)" fill="#fff" opacity="0.85"/><ellipse cx="20.03" cy="9.36" rx="0.46" ry="0.54" transform="rotate(173.4 20.03 9.36)" fill="#fff" opacity="0.96"/><circle cx="9.33" cy="19.26" r="0.56" fill="#fff" opacity="0.84"/><circle cx="14.77" cy="20.51" r="0.32" fill="#fff" opacity="0.90"/><ellipse cx="29.45" cy="9.04" rx="0.61" ry="0.72" transform="rotate(86.0 29.45 9.04)" fill="#fff" opacity="0.93"/><circle cx="22.77" cy="25.50" r="0.44" fill="#fff" opacity="0.87"/><circle cx="20.54" cy="14.38" r="0.44" fill="#fff" opacity="0.94"/><ellipse cx="6.29" cy="23.64" rx="0.45" ry="0.46" transform="rotate(165.0 6.29 23.64)" fill="#fff" opacity="0.91"/><ellipse cx="14.68" cy="9.62" rx="0.52" ry="0.43" transform="rotate(119.9 14.68 9.62)" fill="#fff" opacity="0.96"/><ellipse cx="28.93" cy="32.74" rx="0.41" ry="0.47" transform="rotate(6.9 28.93 32.74)" fill="#fff" opacity="0.96"/><circle cx="30.00" cy="8.45" r="0.56" fill="#fff" opacity="0.86"/><circle cx="17.96" cy="35.13" r="0.68" fill="#fff" opacity="0.93"/><circle cx="9.91" cy="20.75" r="0.56" fill="#fff" opacity="0.94"/><circle cx="29.88" cy="23.39" r="0.56" fill="#fff" opacity="0.96"/><ellipse cx="14.85" cy="25.77" rx="0.61" ry="0.50" transform="rotate(108.3 14.85 25.77)" fill="#fff" opacity="0.85"/><circle cx="24.72" cy="16.81" r="0.56" fill="#fff" opacity="0.92"/><circle cx="16.56" cy="31.11" r="0.32" fill="#fff" opacity="0.89"/><ellipse cx="14.92" cy="17.00" rx="0.42" ry="0.58" transform="rotate(118.4 14.92 17.00)" fill="#fff" opacity="0.90"/><ellipse cx="17.83" cy="25.01" rx="0.68" ry="0.46" transform="rotate(122.1 17.83 25.01)" fill="#fff" opacity="0.90"/><ellipse cx="10.64" cy="26.04" rx="0.33" ry="0.40" transform="rotate(125.8 10.64 26.04)" fill="#fff" opacity="0.96"/><ellipse cx="23.52" cy="33.79" rx="0.41" ry="0.34" transform="rotate(141.2 23.52 33.79)" fill="#fff" opacity="0.96"/><ellipse cx="13.80" cy="15.20" rx="0.35" ry="0.28" transform="rotate(156.8 13.80 15.20)" fill="#fff" opacity="0.95"/><circle cx="31.98" cy="10.97" r="0.78" fill="#fff" opacity="0.90"/><ellipse cx="16.00" cy="16.00" rx="0.36" ry="0.35" transform="rotate(168.4 16.00 16.00)" fill="#fff" opacity="0.89"/><ellipse cx="32.61" cy="25.74" rx="0.74" ry="0.54" transform="rotate(115.3 32.61 25.74)" fill="#fff" opacity="0.95"/><ellipse cx="9.28" cy="13.86" rx="0.56" ry="0.53" transform="rotate(16.8 9.28 13.86)" fill="#fff" opacity="0.95"/><circle cx="34.89" cy="20.07" r="0.68" fill="#fff" opacity="0.97"/><circle cx="20.95" cy="12.17" r="0.44" fill="#fff" opacity="0.90"/><ellipse cx="18.14" cy="33.80" rx="0.26" ry="0.31" transform="rotate(122.2 18.14 33.80)" fill="#fff" opacity="0.93"/><ellipse cx="35.21" cy="19.49" rx="0.79" ry="0.43" transform="rotate(133.5 35.21 19.49)" fill="#fff" opacity="0.95"/><circle cx="15.21" cy="26.38" r="0.44" fill="#fff" opacity="0.94"/><circle cx="6.70" cy="24.73" r="0.44" fill="#fff" opacity="0.96"/><circle cx="18.47" cy="12.61" r="0.44" fill="#fff" opacity="0.86"/><circle cx="25.43" cy="14.98" r="0.44" fill="#fff" opacity="0.97"/><circle cx="19.77" cy="21.87" r="0.68" fill="#fff" opacity="0.88"/><ellipse cx="26.32" cy="32.06" rx="0.34" ry="0.24" transform="rotate(96.8 26.32 32.06)" fill="#fff" opacity="0.93"/><ellipse cx="16.10" cy="14.04" rx="0.48" ry="0.34" transform="rotate(1.4 16.10 14.04)" fill="#fff" opacity="0.89"/><ellipse cx="11.19" cy="23.85" rx="0.38" ry="0.64" transform="rotate(105.7 11.19 23.85)" fill="#fff" opacity="0.90"/><circle cx="16.00" cy="27.06" r="0.56" fill="#fff" opacity="0.95"/><circle cx="28.41" cy="13.73" r="0.56" fill="#fff" opacity="0.84"/><ellipse cx="32.90" cy="11.09" rx="0.63" ry="0.57" transform="rotate(112.7 32.90 11.09)" fill="#fff" opacity="0.89"/><circle cx="9.12" cy="31.41" r="0.78" fill="#fff" opacity="0.90"/><ellipse cx="34.96" cy="12.15" rx="0.39" ry="0.49" transform="rotate(23.6 34.96 12.15)" fill="#fff" opacity="0.88"/><circle cx="7.06" cy="25.54" r="0.44" fill="#fff" opacity="0.91"/><ellipse cx="7.66" cy="26.10" rx="0.83" ry="0.69" transform="rotate(43.4 7.66 26.10)" fill="#fff" opacity="0.88"/><ellipse cx="19.37" cy="29.92" rx="0.47" ry="0.59" transform="rotate(32.8 19.37 29.92)" fill="#fff" opacity="0.88"/><circle cx="15.34" cy="8.00" r="0.44" fill="#fff" opacity="0.98"/><circle cx="11.06" cy="24.25" r="0.68" fill="#fff" opacity="0.92"/><ellipse cx="27.44" cy="33.31" rx="0.34" ry="0.35" transform="rotate(45.4 27.44 33.31)" fill="#fff" opacity="0.88"/><ellipse cx="32.86" cy="23.23" rx="0.64" ry="0.39" transform="rotate(86.2 32.86 23.23)" fill="#fff" opacity="0.93"/><ellipse cx="31.64" cy="27.77" rx="0.38" ry="0.43" transform="rotate(53.0 31.64 27.77)" fill="#fff" opacity="0.90"/><ellipse cx="15.62" cy="26.39" rx="0.56" ry="0.64" transform="rotate(91.6 15.62 26.39)" fill="#fff" opacity="0.91"/><circle cx="9.48" cy="25.34" r="0.56" fill="#fff" opacity="0.98"/><circle cx="34.08" cy="27.30" r="0.56" fill="#fff" opacity="0.90"/><circle cx="25.72" cy="11.37" r="0.44" fill="#fff" opacity="0.85"/><ellipse cx="20.11" cy="20.04" rx="0.73" ry="0.78" transform="rotate(96.2 20.11 20.04)" fill="#fff" opacity="0.92"/><circle cx="14.30" cy="31.26" r="0.78" fill="#fff" opacity="0.90"/><circle cx="29.70" cy="27.70" r="0.68" fill="#fff" opacity="0.97"/><ellipse cx="14.26" cy="8.16" rx="0.37" ry="0.32" transform="rotate(17.4 14.26 8.16)" fill="#fff" opacity="0.86"/><circle cx="21.99" cy="34.38" r="0.68" fill="#fff" opacity="0.92"/><circle cx="13.75" cy="26.68" r="0.44" fill="#fff" opacity="0.84"/><ellipse cx="14.09" cy="28.38" rx="0.83" ry="0.67" transform="rotate(110.4 14.09 28.38)" fill="#fff" opacity="0.84"/><circle cx="11.86" cy="11.35" r="0.68" fill="#fff" opacity="0.95"/><circle cx="15.77" cy="18.58" r="0.56" fill="#fff" opacity="0.92"/><circle cx="33.68" cy="32.90" r="0.68" fill="#fff" opacity="0.86"/><circle cx="24.81" cy="20.05" r="0.44" fill="#fff" opacity="0.91"/><ellipse cx="25.13" cy="16.45" rx="0.77" ry="0.54" transform="rotate(20.1 25.13 16.45)" fill="#fff" opacity="0.95"/><ellipse cx="19.30" cy="8.46" rx="0.63" ry="0.86" transform="rotate(146.1 19.30 8.46)" fill="#fff" opacity="0.87"/><circle cx="36.74" cy="18.91" r="0.78" fill="#fff" opacity="0.95"/><ellipse cx="21.87" cy="10.49" rx="0.52" ry="0.69" transform="rotate(2.5 21.87 10.49)" fill="#fff" opacity="0.85"/><ellipse cx="6.41" cy="18.13" rx="0.51" ry="0.36" transform="rotate(85.0 6.41 18.13)" fill="#fff" opacity="0.94"/><ellipse cx="31.18" cy="24.45" rx="0.59" ry="0.50" transform="rotate(120.2 31.18 24.45)" fill="#fff" opacity="0.94"/><circle cx="18.80" cy="5.76" r="0.68" fill="#fff" opacity="0.97"/><circle cx="24.50" cy="7.17" r="0.44" fill="#fff" opacity="0.89"/><circle cx="37.10" cy="18.29" r="0.68" fill="#fff" opacity="0.90"/><ellipse cx="17.27" cy="10.38" rx="0.41" ry="0.43" transform="rotate(120.7 17.27 10.38)" fill="#fff" opacity="0.96"/><circle cx="15.20" cy="27.24" r="0.44" fill="#fff" opacity="0.95"/><ellipse cx="31.49" cy="16.96" rx="0.41" ry="0.53" transform="rotate(60.7 31.49 16.96)" fill="#fff" opacity="0.86"/><circle cx="17.49" cy="23.13" r="0.78" fill="#fff" opacity="0.86"/><circle cx="27.17" cy="21.82" r="0.44" fill="#fff" opacity="0.95"/><ellipse cx="14.51" cy="9.17" rx="0.61" ry="0.62" transform="rotate(46.2 14.51 9.17)" fill="#fff" opacity="0.95"/><circle cx="20.91" cy="16.84" r="0.56" fill="#fff" opacity="0.98"/><ellipse cx="23.16" cy="33.43" rx="0.54" ry="0.59" transform="rotate(2.8 23.16 33.43)" fill="#fff" opacity="0.95"/><circle cx="20.12" cy="29.69" r="0.44" fill="#fff" opacity="0.89"/><circle cx="24.05" cy="34.24" r="0.44" fill="#fff" opacity="0.91"/><circle cx="12.17" cy="12.77" r="0.56" fill="#fff" opacity="0.85"/><ellipse cx="22.33" cy="25.70" rx="0.57" ry="0.51" transform="rotate(2.6 22.33 25.70)" fill="#fff" opacity="0.84"/><ellipse cx="32.86" cy="18.53" rx="0.57" ry="0.46" transform="rotate(127.3 32.86 18.53)" fill="#fff" opacity="0.97"/><ellipse cx="6.98" cy="18.97" rx="0.79" ry="0.65" transform="rotate(11.5 6.98 18.97)" fill="#fff" opacity="0.98"/><circle cx="31.83" cy="21.76" r="0.44" fill="#fff" opacity="0.90"/><ellipse cx="11.16" cy="22.45" rx="0.70" ry="0.73" transform="rotate(45.9 11.16 22.45)" fill="#fff" opacity="0.90"/><circle cx="25.73" cy="18.47" r="0.68" fill="#fff" opacity="0.93"/><ellipse cx="15.67" cy="11.56" rx="0.38" ry="0.48" transform="rotate(44.0 15.67 11.56)" fill="#fff" opacity="0.89"/><circle cx="35.15" cy="20.28" r="0.56" fill="#fff" opacity="0.93"/><circle cx="29.61" cy="20.05" r="0.78" fill="#fff" opacity="0.92"/><ellipse cx="22.68" cy="21.04" rx="0.52" ry="0.49" transform="rotate(25.6 22.68 21.04)" fill="#fff" opacity="0.85"/><circle cx="32.19" cy="12.16" r="0.56" fill="#fff" opacity="0.97"/><ellipse cx="20.95" cy="20.37" rx="0.47" ry="0.36" transform="rotate(165.6 20.95 20.37)" fill="#fff" opacity="0.91"/><ellipse cx="28.69" cy="31.84" rx="0.44" ry="0.40" transform="rotate(116.2 28.69 31.84)" fill="#fff" opacity="0.89"/><ellipse cx="22.42" cy="18.80" rx="0.55" ry="0.44" transform="rotate(151.8 22.42 18.80)" fill="#fff" opacity="0.89"/><circle cx="18.02" cy="17.00" r="0.44" fill="#fff" opacity="0.86"/><circle cx="7.10" cy="16.26" r="0.68" fill="#fff" opacity="0.85"/><ellipse cx="12.28" cy="17.93" rx="0.37" ry="0.34" transform="rotate(72.7 12.28 17.93)" fill="#fff" opacity="0.89"/><ellipse cx="18.80" cy="32.51" rx="0.61" ry="0.43" transform="rotate(52.2 18.80 32.51)" fill="#fff" opacity="0.91"/><circle cx="30.64" cy="27.88" r="0.56" fill="#fff" opacity="0.93"/><circle cx="8.68" cy="31.05" r="0.56" fill="#fff" opacity="0.94"/><circle cx="31.71" cy="18.36" r="0.56" fill="#fff" opacity="0.90"/><ellipse cx="14.46" cy="19.30" rx="0.41" ry="0.42" transform="rotate(148.8 14.46 19.30)" fill="#fff" opacity="0.94"/><circle cx="29.86" cy="22.98" r="0.68" fill="#fff" opacity="0.86"/><circle cx="25.63" cy="28.34" r="0.44" fill="#fff" opacity="0.97"/><circle cx="22.90" cy="13.14" r="0.56" fill="#fff" opacity="0.85"/><circle cx="24.66" cy="6.93" r="0.44" fill="#fff" opacity="0.86"/><circle cx="19.51" cy="20.76" r="0.44" fill="#fff" opacity="0.90"/><circle cx="18.00" cy="26.11" r="0.44" fill="#fff" opacity="0.86"/><ellipse cx="32.82" cy="28.13" rx="0.59" ry="0.51" transform="rotate(60.8 32.82 28.13)" fill="#fff" opacity="0.91"/><ellipse cx="9.34" cy="16.51" rx="0.49" ry="0.45" transform="rotate(174.3 9.34 16.51)" fill="#fff" opacity="0.97"/><circle cx="19.08" cy="28.20" r="0.56" fill="#fff" opacity="0.87"/><circle cx="35.40" cy="13.29" r="0.56" fill="#fff" opacity="0.91"/><circle cx="34.36" cy="16.08" r="0.56" fill="#fff" opacity="0.89"/><ellipse cx="21.24" cy="17.34" rx="0.40" ry="0.41" transform="rotate(73.2 21.24 17.34)" fill="#fff" opacity="0.94"/><circle cx="30.81" cy="20.81" r="0.44" fill="#fff" opacity="0.97"/><circle cx="9.95" cy="25.19" r="0.56" fill="#fff" opacity="0.96"/><circle cx="8.36" cy="12.64" r="0.56" fill="#fff" opacity="0.94"/><ellipse cx="25.15" cy="22.90" rx="0.45" ry="0.56" transform="rotate(84.1 25.15 22.90)" fill="#fff" opacity="0.88"/><circle cx="25.73" cy="9.03" r="0.68" fill="#fff" opacity="0.95"/><circle cx="20.63" cy="14.45" r="0.56" fill="#fff" opacity="0.87"/><circle cx="12.60" cy="15.61" r="0.56" fill="#fff" opacity="0.87"/><ellipse cx="24.36" cy="10.19" rx="0.74" ry="0.52" transform="rotate(48.1 24.36 10.19)" fill="#fff" opacity="0.88"/><ellipse cx="9.49" cy="14.19" rx="0.34" ry="0.49" transform="rotate(79.5 9.49 14.19)" fill="#fff" opacity="0.98"/><circle cx="35.15" cy="26.77" r="0.56" fill="#fff" opacity="0.89"/><ellipse cx="20.53" cy="10.46" rx="0.65" ry="0.61" transform="rotate(4.8 20.53 10.46)" fill="#fff" opacity="0.88"/><ellipse cx="12.54" cy="32.92" rx="0.61" ry="0.42" transform="rotate(51.0 12.54 32.92)" fill="#fff" opacity="0.86"/><ellipse cx="16.28" cy="11.59" rx="0.55" ry="0.46" transform="rotate(152.3 16.28 11.59)" fill="#fff" opacity="0.96"/><circle cx="14.11" cy="19.96" r="0.68" fill="#fff" opacity="0.92"/><circle cx="13.20" cy="32.76" r="0.44" fill="#fff" opacity="0.96"/><circle cx="30.59" cy="18.29" r="0.32" fill="#fff" opacity="0.90"/><ellipse cx="11.66" cy="18.76" rx="0.47" ry="0.61" transform="rotate(31.6 11.66 18.76)" fill="#fff" opacity="0.87"/><circle cx="34.26" cy="19.40" r="0.68" fill="#fff" opacity="0.90"/><circle cx="18.67" cy="23.92" r="0.56" fill="#fff" opacity="0.95"/><circle cx="24.28" cy="13.94" r="0.56" fill="#fff" opacity="0.88"/><ellipse cx="36.77" cy="15.77" rx="0.64" ry="0.71" transform="rotate(147.7 36.77 15.77)" fill="#fff" opacity="0.94"/><ellipse cx="13.67" cy="9.56" rx="0.31" ry="0.47" transform="rotate(22.8 13.67 9.56)" fill="#fff" opacity="0.97"/><ellipse cx="8.31" cy="28.97" rx="0.58" ry="0.42" transform="rotate(144.6 8.31 28.97)" fill="#fff" opacity="0.93"/><circle cx="18.80" cy="20.60" r="0.32" fill="#fff" opacity="0.87"/><circle cx="17.32" cy="24.24" r="0.56" fill="#fff" opacity="0.87"/><ellipse cx="37.46" cy="24.80" rx="0.42" ry="0.42" transform="rotate(69.8 37.46 24.80)" fill="#fff" opacity="0.88"/><circle cx="12.71" cy="14.24" r="0.76" fill="#fff" opacity="0.93"/><circle cx="13.63" cy="14.26" r="0.40" fill="#fff" opacity="0.83"/><circle cx="13.69" cy="13.24" r="0.47" fill="#fff" opacity="0.86"/><circle cx="12.17" cy="14.26" r="0.49" fill="#fff" opacity="0.87"/><circle cx="14.51" cy="14.39" r="0.66" fill="#fff" opacity="0.83"/><ellipse cx="12.36" cy="15.22" rx="0.29" ry="0.27" transform="rotate(93.0 12.36 15.22)" fill="#fff" opacity="0.94"/><circle cx="13.81" cy="14.64" r="0.42" fill="#fff" opacity="0.84"/><circle cx="13.54" cy="14.79" r="0.41" fill="#fff" opacity="0.79"/><circle cx="13.54" cy="15.91" r="0.75" fill="#fff" opacity="0.91"/><circle cx="13.83" cy="14.70" r="0.69" fill="#fff" opacity="0.81"/><ellipse cx="14.25" cy="15.51" rx="0.37" ry="0.29" transform="rotate(134.1 14.25 15.51)" fill="#fff" opacity="0.79"/><ellipse cx="14.07" cy="14.46" rx="0.35" ry="0.26" transform="rotate(64.4 14.07 14.46)" fill="#fff" opacity="0.93"/><circle cx="14.02" cy="14.24" r="0.54" fill="#fff" opacity="0.89"/><circle cx="28.50" cy="17.61" r="0.47" fill="#fff" opacity="0.87"/><ellipse cx="28.39" cy="17.63" rx="0.49" ry="0.36" transform="rotate(133.8 28.39 17.63)" fill="#fff" opacity="0.84"/><ellipse cx="27.99" cy="17.64" rx="0.54" ry="0.45" transform="rotate(58.8 27.99 17.64)" fill="#fff" opacity="0.84"/><ellipse cx="28.58" cy="17.32" rx="0.44" ry="0.38" transform="rotate(65.2 28.58 17.32)" fill="#fff" opacity="0.82"/><ellipse cx="27.31" cy="18.51" rx="0.58" ry="0.57" transform="rotate(6.4 27.31 18.51)" fill="#fff" opacity="0.86"/><circle cx="27.04" cy="16.97" r="0.37" fill="#fff" opacity="0.83"/><circle cx="28.30" cy="17.72" r="0.50" fill="#fff" opacity="0.88"/><ellipse cx="28.06" cy="17.74" rx="0.33" ry="0.31" transform="rotate(58.3 28.06 17.74)" fill="#fff" opacity="0.93"/><ellipse cx="27.98" cy="16.89" rx="0.26" ry="0.25" transform="rotate(97.7 27.98 16.89)" fill="#fff" opacity="0.89"/><ellipse cx="28.75" cy="18.56" rx="0.61" ry="0.58" transform="rotate(92.0 28.75 18.56)" fill="#fff" opacity="0.87"/><circle cx="28.28" cy="17.76" r="0.43" fill="#fff" opacity="0.87"/><circle cx="28.15" cy="16.15" r="0.75" fill="#fff" opacity="0.84"/><ellipse cx="28.04" cy="17.81" rx="0.43" ry="0.54" transform="rotate(5.4 28.04 17.81)" fill="#fff" opacity="0.84"/><circle cx="28.26" cy="16.74" r="0.70" fill="#fff" opacity="0.87"/><ellipse cx="28.16" cy="16.94" rx="0.53" ry="0.43" transform="rotate(17.7 28.16 16.94)" fill="#fff" opacity="0.93"/><circle cx="23.59" cy="17.06" r="0.59" fill="#fff" opacity="0.96"/><circle cx="22.36" cy="18.28" r="0.61" fill="#fff" opacity="0.91"/><ellipse cx="24.25" cy="17.50" rx="0.31" ry="0.36" transform="rotate(70.0 24.25 17.50)" fill="#fff" opacity="0.91"/><circle cx="23.41" cy="17.32" r="0.32" fill="#fff" opacity="0.85"/><ellipse cx="23.06" cy="16.09" rx="0.55" ry="0.35" transform="rotate(18.8 23.06 16.09)" fill="#fff" opacity="0.93"/><circle cx="23.51" cy="17.23" r="0.60" fill="#fff" opacity="0.88"/><circle cx="23.95" cy="18.81" r="0.55" fill="#fff" opacity="0.90"/><ellipse cx="24.19" cy="16.86" rx="0.48" ry="0.57" transform="rotate(121.4 24.19 16.86)" fill="#fff" opacity="0.90"/><ellipse cx="23.09" cy="17.62" rx="0.59" ry="0.37" transform="rotate(126.6 23.09 17.62)" fill="#fff" opacity="0.95"/><circle cx="23.44" cy="18.03" r="0.39" fill="#fff" opacity="0.90"/><ellipse cx="23.82" cy="18.38" rx="0.48" ry="0.61" transform="rotate(87.0 23.82 18.38)" fill="#fff" opacity="0.87"/><circle cx="23.41" cy="17.37" r="0.74" fill="#fff" opacity="0.85"/><ellipse cx="22.74" cy="17.02" rx="0.33" ry="0.41" transform="rotate(96.2 22.74 17.02)" fill="#fff" opacity="0.82"/><ellipse cx="22.22" cy="18.19" rx="0.68" ry="0.60" transform="rotate(71.2 22.22 18.19)" fill="#fff" opacity="0.86"/><ellipse cx="30.32" cy="15.22" rx="0.70" ry="0.55" transform="rotate(84.8 30.32 15.22)" fill="#fff" opacity="0.82"/><circle cx="30.14" cy="14.82" r="0.66" fill="#fff" opacity="0.91"/><ellipse cx="29.72" cy="16.26" rx="0.48" ry="0.32" transform="rotate(143.2 29.72 16.26)" fill="#fff" opacity="0.93"/><circle cx="30.13" cy="16.01" r="0.29" fill="#fff" opacity="0.85"/><circle cx="30.46" cy="13.94" r="0.72" fill="#fff" opacity="0.84"/><ellipse cx="29.45" cy="15.93" rx="0.38" ry="0.47" transform="rotate(94.7 29.45 15.93)" fill="#fff" opacity="0.80"/><ellipse cx="30.82" cy="14.58" rx="0.70" ry="0.48" transform="rotate(3.7 30.82 14.58)" fill="#fff" opacity="0.91"/><circle cx="30.37" cy="15.58" r="0.48" fill="#fff" opacity="0.84"/><circle cx="30.23" cy="15.49" r="0.46" fill="#fff" opacity="0.94"/><circle cx="31.63" cy="15.96" r="0.49" fill="#fff" opacity="0.85"/><circle cx="31.13" cy="14.42" r="0.40" fill="#fff" opacity="0.85"/><circle cx="30.30" cy="15.26" r="0.37" fill="#fff" opacity="0.89"/><circle cx="30.25" cy="15.24" r="0.43" fill="#fff" opacity="0.82"/><circle cx="30.70" cy="14.63" r="0.40" fill="#fff" opacity="0.91"/><circle cx="18.12" cy="16.56" r="0.62" fill="#fff" opacity="0.84"/><circle cx="18.82" cy="17.55" r="0.73" fill="#fff" opacity="0.93"/><circle cx="17.28" cy="17.18" r="0.32" fill="#fff" opacity="0.83"/><circle cx="19.07" cy="15.70" r="0.54" fill="#fff" opacity="0.89"/><circle cx="18.01" cy="16.25" r="0.30" fill="#fff" opacity="0.81"/><ellipse cx="18.07" cy="16.77" rx="0.42" ry="0.40" transform="rotate(119.6 18.07 16.77)" fill="#fff" opacity="0.84"/><circle cx="18.61" cy="18.05" r="0.49" fill="#fff" opacity="0.82"/><circle cx="18.06" cy="16.54" r="0.74" fill="#fff" opacity="0.84"/><ellipse cx="18.39" cy="17.07" rx="0.48" ry="0.43" transform="rotate(118.5 18.39 17.07)" fill="#fff" opacity="0.87"/><ellipse cx="19.55" cy="16.14" rx="0.46" ry="0.45" transform="rotate(124.0 19.55 16.14)" fill="#fff" opacity="0.88"/><ellipse cx="16.51" cy="16.18" rx="0.68" ry="0.41" transform="rotate(30.8 16.51 16.18)" fill="#fff" opacity="0.96"/><circle cx="18.72" cy="17.80" r="0.69" fill="#fff" opacity="0.92"/><circle cx="15.36" cy="19.02" r="0.63" fill="#fff" opacity="0.79"/><circle cx="15.12" cy="19.15" r="0.76" fill="#fff" opacity="0.86"/><circle cx="14.88" cy="19.97" r="0.61" fill="#fff" opacity="0.86"/><ellipse cx="16.10" cy="19.69" rx="0.33" ry="0.38" transform="rotate(86.7 16.10 19.69)" fill="#fff" opacity="0.80"/><ellipse cx="15.79" cy="18.18" rx="0.56" ry="0.54" transform="rotate(103.7 15.79 18.18)" fill="#fff" opacity="0.87"/><circle cx="14.85" cy="19.95" r="0.45" fill="#fff" opacity="0.78"/><ellipse cx="15.08" cy="18.29" rx="0.73" ry="0.42" transform="rotate(24.1 15.08 18.29)" fill="#fff" opacity="0.89"/><circle cx="15.17" cy="19.23" r="0.58" fill="#fff" opacity="0.82"/><circle cx="16.57" cy="18.25" r="0.38" fill="#fff" opacity="0.82"/><ellipse cx="15.42" cy="18.77" rx="0.65" ry="0.59" transform="rotate(45.3 15.42 18.77)" fill="#fff" opacity="0.84"/><circle cx="14.16" cy="18.39" r="0.34" fill="#fff" opacity="0.84"/><ellipse cx="14.42" cy="19.29" rx="0.85" ry="0.55" transform="rotate(129.0 14.42 19.29)" fill="#fff" opacity="0.79"/><circle cx="17.59" cy="12.20" r="0.50" fill="#fff" opacity="0.82"/><ellipse cx="18.27" cy="12.74" rx="0.49" ry="0.56" transform="rotate(158.3 18.27 12.74)" fill="#fff" opacity="0.83"/><circle cx="18.55" cy="13.06" r="0.77" fill="#fff" opacity="0.86"/><ellipse cx="18.66" cy="13.93" rx="0.37" ry="0.31" transform="rotate(168.6 18.66 13.93)" fill="#fff" opacity="0.80"/><ellipse cx="17.59" cy="14.32" rx="0.64" ry="0.45" transform="rotate(53.2 17.59 14.32)" fill="#fff" opacity="0.94"/><circle cx="17.31" cy="12.66" r="0.68" fill="#fff" opacity="0.82"/><circle cx="17.93" cy="13.01" r="0.71" fill="#fff" opacity="0.94"/><circle cx="18.82" cy="14.04" r="0.63" fill="#fff" opacity="0.83"/><circle cx="18.31" cy="12.98" r="0.76" fill="#fff" opacity="0.91"/><circle cx="18.33" cy="13.06" r="0.56" fill="#fff" opacity="0.92"/><circle cx="18.67" cy="12.99" r="0.40" fill="#fff" opacity="0.94"/><circle cx="18.72" cy="13.10" r="0.38" fill="#fff" opacity="0.79"/></g><ellipse cx="19.96" cy="4.39" rx="0.41" ry="0.47" transform="rotate(123.6 19.96 4.39)" fill="#fff" opacity="0.86"/><circle cx="35.88" cy="10.84" r="0.36" fill="#fff" opacity="0.72"/><circle cx="28.04" cy="5.37" r="0.52" fill="#fff" opacity="0.70"/><circle cx="26.42" cy="4.69" r="0.37" fill="#fff" opacity="0.86"/><circle cx="8.63" cy="10.12" r="0.44" fill="#fff" opacity="0.90"/><circle cx="5.29" cy="13.66" r="0.32" fill="#fff" opacity="0.86"/><ellipse cx="11.67" cy="7.14" rx="0.35" ry="0.41" transform="rotate(68.5 11.67 7.14)" fill="#fff" opacity="0.86"/><ellipse cx="39.06" cy="16.73" rx="0.54" ry="0.48" transform="rotate(164.6 39.06 16.73)" fill="#fff" opacity="0.75"/><circle cx="18.55" cy="4.16" r="0.55" fill="#fff" opacity="0.85"/><circle cx="39.57" cy="18.66" r="0.61" fill="#fff" opacity="0.71"/><circle cx="26.64" cy="4.68" r="0.48" fill="#fff" opacity="0.79"/><circle cx="21.48" cy="4.07" r="0.50" fill="#fff" opacity="0.75"/><ellipse cx="29.24" cy="5.55" rx="0.26" ry="0.34" transform="rotate(90.7 29.24 5.55)" fill="#fff" opacity="0.88"/><ellipse cx="7.91" cy="10.71" rx="0.41" ry="0.38" transform="rotate(173.9 7.91 10.71)" fill="#fff" opacity="0.73"/><ellipse cx="4.28" cy="16.19" rx="0.40" ry="0.41" transform="rotate(99.1 4.28 16.19)" fill="#fff" opacity="0.78"/><circle cx="33.04" cy="7.37" r="0.58" fill="#fff" opacity="0.72"/></svg>';
  return L.divIcon({className:"oliebol-marker" + (unconfirmed ? " oliebol-marker-unconfirmed" : ""), iconSize:[44,44], iconAnchor:[22,22], popupAnchor:[0,-20], html:html});
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
    source: el.getAttribute("data-source-label") || "Source",
    unconfirmed: el.getAttribute("data-unconfirmed-label") || "Unconfirmed: permit granted",
    voteQ: el.getAttribute("data-vote-q") || "Seen it open?",
    voteYes: el.getAttribute("data-vote-yes") || "Yes, it's open",
    voteNo: el.getAttribute("data-vote-no") || "No, not there",
    voteThanks: el.getAttribute("data-vote-thanks") || "Thanks — we'll take a look.",
    voteError: el.getAttribute("data-vote-error") || "Something went wrong — please try again.",
    lang: el.getAttribute("data-lang") || "en"
  };
  stands.forEach(function(s){
    var status = s.unconfirmed ? labels.unconfirmed : "";
    var accessibleName = status ? (s.name + " (" + status + ")") : s.name;
    var html = "<div><b>" + escapeHtml(s.name) + "</b>";
    if(status) html += "<div class=\\"oliebollen-status\\">" + escapeHtml(status) + "</div>";
    html += "<br>" + escapeHtml(s.location);
    if(s.note) html += "<br>" + escapeHtml(s.note);
    if(s.hours) html += "<br>" + escapeHtml(labels.hours) + ": " + escapeHtml(s.hours);
    if(s.price) html += "<br>" + escapeHtml(labels.price) + ": " + escapeHtml(s.price);
    if(s.source) html += "<br><a href=\\"" + escapeHtml(s.source) + "\\" target=\\"_blank\\" rel=\\"noopener\\">" + escapeHtml(labels.source) + " \\u2197</a>";
    if(s.unconfirmed){
      html += "<div class=\\"oliebol-vote\\" data-stand-id=\\"" + escapeHtml(s.id) + "\\" data-stand-name=\\"" + escapeHtml(s.name) + "\\" data-lang=\\"" + escapeHtml(labels.lang) + "\\" data-error=\\"" + escapeHtml(labels.voteError) + "\\" data-thanks=\\"" + escapeHtml(labels.voteThanks) + "\\">";
      html += "<p class=\\"oliebol-vote-q\\">" + escapeHtml(labels.voteQ) + "</p>";
      html += "<div class=\\"oliebol-vote-actions\\" role=\\"group\\" aria-label=\\"" + escapeHtml(labels.voteQ) + "\\">";
      html += "<button type=\\"button\\" class=\\"oliebol-vote-btn\\" data-vote=\\"yes\\">" + escapeHtml(labels.voteYes) + "</button>";
      html += "<button type=\\"button\\" class=\\"oliebol-vote-btn\\" data-vote=\\"no\\">" + escapeHtml(labels.voteNo) + "</button>";
      html += "</div><p class=\\"oliebol-vote-thanks\\" aria-live=\\"polite\\"></p></div>";
    }
    html += "</div>";
    L.marker([s.lat, s.lng], {icon:oliebolIcon(s.id, s.unconfirmed), alt:accessibleName, keyboard:true, title:accessibleName})
      .bindPopup(html, {maxWidth:280, closeButton:true, closeOnEscapeKey:true, autoPan:true, autoPanPaddingTopLeft:[50,10]})
      .addTo(map);
  });
  map.on("popupopen", function(e){
    var root = e.popup && e.popup.getElement();
    if(!root) return;
    var close = root.querySelector("a.leaflet-popup-close-button");
    var isNl = (document.documentElement.lang || "en").slice(0, 2) === "nl";
    if(close) close.setAttribute("aria-label", isNl ? "Sluiten" : "Close");
    if(typeof applyOliebollenVoteState === "function") applyOliebollenVoteState(root);
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
var VOTE_STORE = "amsterdampopups-oliebollen-vote:";
function oliebolVoteKey(id){ return VOTE_STORE + id; }
function hasOliebollenVote(id){
  try { return !!localStorage.getItem(oliebolVoteKey(id)); } catch (err){ return false; }
}
function rememberOliebollenVote(id, vote){
  try { localStorage.setItem(oliebolVoteKey(id), vote); } catch (err){}
}
function applyOliebollenVoteState(root){
  if(!root) return;
  var widgets = [];
  if(root.classList && root.classList.contains("oliebol-vote")) widgets = [root];
  else if(root.querySelectorAll) widgets = Array.prototype.slice.call(root.querySelectorAll(".oliebol-vote"));
  widgets.forEach(function(w){
    var id = w.getAttribute("data-stand-id");
    if(!id || !hasOliebollenVote(id)) return;
    var thanksText = w.getAttribute("data-thanks") || "";
    w.querySelectorAll("button").forEach(function(b){ b.disabled = true; });
    var thanks = w.querySelector(".oliebol-vote-thanks");
    if(thanks && thanksText) thanks.textContent = thanksText;
  });
}
function submitOliebollenVote(widget, vote){
  var id = widget.getAttribute("data-stand-id");
  var name = widget.getAttribute("data-stand-name") || "";
  var lang = widget.getAttribute("data-lang") || "en";
  var errMsg = widget.getAttribute("data-error") || "Something went wrong — please try again.";
  var thanksText = widget.getAttribute("data-thanks") || "";
  var buttons = widget.querySelectorAll("button");
  buttons.forEach(function(b){ b.disabled = true; });
  var fd = new FormData();
  fd.append("submitter_type", "oliebollen-vote");
  fd.append("stand", name);
  fd.append("vote", vote);
  fd.append("lang", lang);
  fd.append("_gotcha", "");
  fd.append("_subject", "Oliebollen vote: " + name);
  fetch("https://formspree.io/f/xjgqowrq", {
    method: "POST",
    body: fd,
    headers: { Accept: "application/json" }
  }).then(function(r){
    if(!r.ok) throw new Error("bad status");
    rememberOliebollenVote(id, vote);
    var thanks = widget.querySelector(".oliebol-vote-thanks");
    if(thanks) thanks.textContent = thanksText;
  }).catch(function(){
    buttons.forEach(function(b){ b.disabled = false; });
    alert(errMsg);
  });
}
document.addEventListener("click", function(e){
  var btn = e.target && e.target.closest && e.target.closest(".oliebol-vote-btn");
  if(!btn || btn.disabled) return;
  var widget = btn.closest(".oliebol-vote");
  if(!widget) return;
  var id = widget.getAttribute("data-stand-id");
  if(!id || hasOliebollenVote(id)) return;
  var vote = btn.getAttribute("data-vote");
  if(vote !== "yes" && vote !== "no") return;
  submitOliebollenVote(widget, vote);
});
document.addEventListener("DOMContentLoaded", function(){ applyOliebollenVoteState(document); });
`;
}

function groupedStands(){
  const by = {};
  for(const s of OLIEBOLLEN_STANDS){
    (by[s.district] || (by[s.district] = [])).push(s);
  }
  return DISTRICT_ORDER.filter(d => by[d] && by[d].length).map(d => {
    const stands = by[d].slice().sort((a, b) => Number(!!a.unconfirmed) - Number(!!b.unconfirmed));
    return [d, stands];
  });
}

function voteWidgetHtml(s, L, C, esc){
  if(!s.unconfirmed) return "";
  return `        <div class="oliebol-vote" data-stand-id="${esc(s.id)}" data-stand-name="${esc(s.name[L])}" data-lang="${esc(L)}" data-error="${esc(C.formError)}" data-thanks="${esc(C.voteThanks)}">
        <p class="oliebol-vote-q">${esc(C.voteQ)}</p>
        <div class="oliebol-vote-actions" role="group" aria-label="${esc(C.voteQ)}">
          <button type="button" class="oliebol-vote-btn" data-vote="yes">${esc(C.voteYes)}</button>
          <button type="button" class="oliebol-vote-btn" data-vote="no">${esc(C.voteNo)}</button>
        </div>
        <p class="oliebol-vote-thanks" aria-live="polite"></p>
      </div>`;
}

function pageHtml(L, deps){
  const {
    esc, siteChrome, STYLE, GA_HEAD, consentBlock, hreflang, socialMeta,
    SITE, GENERATED, TXT, browseNav, path
  } = deps;
  const C = COPY[L];
  const T = TXT[L];
  const url = OLIEBOLLEN_ALT[L];
  const mapData = OLIEBOLLEN_STANDS.map(s => {
    const row = {
      id: s.id,
      name: s.name[L],
      location: s.location[L],
      lat: s.lat,
      lng: s.lng
    };
    if(s.note) row.note = s.note[L];
    if(s.hours) row.hours = s.hours[L];
    if(s.price) row.price = s.price[L];
    if(s.source) row.source = s.source;
    if(s.unconfirmed) row.unconfirmed = true;
    return row;
  });
  const intro = C.intro.map(p => `  <p>${esc(p)}</p>`).join("\n");
  const tips = C.tips.length
    ? `  <h2>${esc(C.tipsHeading)}</h2>\n  <ul class="oliebollen-tips">\n${C.tips.map(t => `    <li>${esc(t)}</li>`).join("\n")}\n  </ul>\n`
    : "";
  const list = groupedStands().map(([district, stands]) => {
    const renderItem = s => {
      const rows = [
        `        <h4>${esc(s.name[L])}</h4>`
      ];
      if(s.unconfirmed) rows.push(`        <p class="oliebollen-status">${esc(C.unconfirmedLabel)}</p>`);
      rows.push(`        <p>${esc(s.location[L])}</p>`);
      if(s.note) rows.push(`        <p>${esc(s.note[L])}</p>`);
      if(s.hours) rows.push(`        <p>${esc(C.hoursLabel)}: ${esc(s.hours[L])}</p>`);
      if(s.price) rows.push(`        <p>${esc(C.priceLabel)}: ${esc(s.price[L])}</p>`);
      if(s.source) rows.push(`        <p><a href="${esc(s.source)}" rel="noopener">${esc(C.sourceLabel)}</a></p>`);
      const vote = voteWidgetHtml(s, L, C, esc);
      if(vote) rows.push(vote);
      const cls = s.unconfirmed ? ' class="oliebollen-unconfirmed"' : "";
      return `      <li id="stand-${esc(s.id)}"${cls}>\n${rows.join("\n")}\n      </li>`;
    };
    const confirmed = stands.filter(s => !s.unconfirmed);
    const unconfirmed = stands.filter(s => s.unconfirmed);
    let body = "";
    if(confirmed.length){
      body += `      <ul class="oliebollen-list">\n${confirmed.map(renderItem).join("\n")}\n      </ul>\n`;
    }
    if(unconfirmed.length){
      body += `      <h4 class="oliebollen-unconfirmed-group" id="u-${esc(district)}">${esc(C.unconfirmedGroup)}</h4>\n      <ul class="oliebollen-list oliebollen-list-unconfirmed" aria-labelledby="u-${esc(district)}">\n${unconfirmed.map(renderItem).join("\n")}\n      </ul>\n`;
    }
    return `    <section class="oliebollen-district" aria-labelledby="d-${esc(district)}">
      <h3 id="d-${esc(district)}">${esc(district)}</h3>
${body}    </section>`;
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
    <div id="map" role="region" aria-label="${esc(C.mapLabel)}" aria-describedby="map-desc" data-lang="${L}" data-hours-label="${esc(C.hoursLabel)}" data-price-label="${esc(C.priceLabel)}" data-source-label="${esc(C.sourceLabel)}" data-unconfirmed-label="${esc(C.unconfirmedLabel)}" data-vote-q="${esc(C.voteQ)}" data-vote-yes="${esc(C.voteYes)}" data-vote-no="${esc(C.voteNo)}" data-vote-thanks="${esc(C.voteThanks)}" data-vote-error="${esc(C.formError)}"></div>
    <ul class="oliebol-legend" aria-label="${esc(C.legendAria)}">
      <li>${oliebolIconHtml("legend-confirmed")}<span>${esc(C.confirmedLegend)}</span></li>
      <li>${oliebolIconHtml("legend-unconfirmed", true)}<span>${esc(C.unconfirmedLegend)}</span></li>
    </ul>
    <script type="application/json" id="map-stands">${JSON.stringify(mapData).replace(/</g, "\\u003c")}</script>
  </section>
  <script>
${mapScript(esc)}  </script>
  <h2 id="stands">${esc(C.listH)}</h2>
  <p class="oliebollen-confirm-note">${esc(C.confirmNote)}</p>
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
  const confirmedCount = OLIEBOLLEN_STANDS.filter(s => !s.unconfirmed).length;
  const unconfirmedCount = OLIEBOLLEN_STANDS.filter(s => s.unconfirmed).length;
  if(confirmedCount !== 24 || unconfirmedCount !== 20){
    throw new Error(`expected 24 confirmed and 20 unconfirmed 2026 oliebollen stands, found ${confirmedCount} confirmed and ${unconfirmedCount} unconfirmed`);
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
