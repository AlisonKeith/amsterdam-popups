"use strict";
// Seasonal oliebollen stand data for the /oliebollen/ pages only.
// Do not import this into EVENTS or the homepage map.

const OLIEBOLLEN_STANDS = [
  {
    id: "westermarkt",
    district: "Centrum",
    name: {en: "Oliebollenkraam Westermarkt (Amsterdamse Gebakkraam)", nl: "Oliebollenkraam Westermarkt (Amsterdamse Gebakkraam)"},
    location: {en: "Westermarkt, beside the Westerkerk, 1016 DL", nl: "Westermarkt, naast de Westerkerk, 1016 DL"},
    hours: {
      en: "Wednesday, Saturday and Sunday 11:00–18:00. On 31 December 2026 open from 10:00; closing time not published.",
      nl: "Woensdag, zaterdag en zondag 11.00–18.00. Op 31 december 2026 open vanaf 10.00; sluitingstijd niet bekend."
    },
    price: {en: "€2", nl: "€2"},
    source: "https://oliebollengids.nl/amsterdam/oliebollenkraam-westermarkt-amsterdam",
    lat: 52.3744897, lng: 4.8845596
  },
  {
    id: "bakkers",
    district: "West",
    name: {en: "Bakker's Oliebollenkraam", nl: "Bakker's Oliebollenkraam"},
    location: {en: "Spaarndammerstraat 792, 1013 TK", nl: "Spaarndammerstraat 792, 1013 TK"},
    hours: {
      en: "From 1 October 2026. Monday–Saturday 10:00–19:00; Sunday 11:00–19:00 (Sunday start time: ask at the stall).",
      nl: "Vanaf 1 oktober 2026. Maandag t/m zaterdag 10.00–19.00; zondag 11.00–19.00 (begintijd op zondag navragen bij de kraam)."
    },
    price: {en: "€1.50", nl: "€1,50"},
    source: "https://oliebollengids.nl/amsterdam/bakkers-oliebollenkraam-amsterdam",
    lat: 52.3909696, lng: 4.8784189
  },
  {
    id: "hugo-de-grootplein",
    district: "West",
    name: {en: "Hollandse Gebakkraam Hugo de Grootplein", nl: "Hollandse Gebakkraam Hugo de Grootplein"},
    location: {en: "Hugo de Grootplein, 1052 KV", nl: "Hugo de Grootplein, 1052 KV"},
    hours: {
      en: "Tuesday–Saturday 10:30–20:00; Sunday 12:00–18:00. 5 and 24 December 10:30–18:00; 25–26 December and 1 January closed; 31 December 07:00–18:00; also 2 January 10:30–20:00 and 3 January 12:00–18:00.",
      nl: "Dinsdag t/m zaterdag 10.30–20.00; zondag 12.00–18.00. 5 en 24 december 10.30–18.00; 25–26 december en 1 januari gesloten; 31 december 7.00–18.00; ook 2 januari 10.30–20.00 en 3 januari 12.00–18.00."
    },
    price: {en: "€1.50", nl: "€1,50"},
    source: "https://oliebollengids.nl/amsterdam/hollandse-gebakkraam-hugo-de-grootplein-amsterdam",
    lat: 52.3744983, lng: 4.8728149
  },
  {
    id: "belgieplein",
    district: "Nieuw-West",
    name: {en: "De Amsterdamse Oliebollenkraam (Belgiëplein)", nl: "De Amsterdamse Oliebollenkraam (Belgiëplein)"},
    location: {en: "Belgiëplein, 1066 RC, Nieuw Sloten", nl: "Belgiëplein, 1066 RC, Nieuw Sloten"},
    hours: {
      en: "Standing in late October 2026; season dates and hours not published.",
      nl: "Stond er eind oktober 2026; seizoensdata en openingstijden niet bekend."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://www.metronieuws.nl/lifestyle/eten-drinken/2026/10/durf-jij-het-aan-een-oliebol-met-pizzasmaak-gesmolten-kaas-salami/",
    lat: 52.3457509, lng: 4.8111832
  },
  {
    id: "van-den-noord",
    district: "Nieuw-West",
    name: {en: "Oliebollenkraam Van den Noord", nl: "Oliebollenkraam Van den Noord"},
    location: {en: "Lambertus Zijlplein, Geuzenveld", nl: "Lambertus Zijlplein, Geuzenveld"},
    hours: {
      en: "From 1 October 2026 (third season). Hours not published in the news report.",
      nl: "Vanaf 1 oktober 2026 (derde seizoen). Openingstijden niet vermeld in het nieuwsbericht."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://www.at5.nl/artikelen/240728/oliebollenbakker-yessin-laat-zich-niet-uit-het-veld-slaan-ondanks-vernielingen-wil-klanten-blij-maken",
    lat: 52.3774908, lng: 4.8027827
  },
  {
    id: "sierplein",
    district: "Nieuw-West",
    name: {en: "Oliebollenkraam Sierplein", nl: "Oliebollenkraam Sierplein"},
    location: {en: "Sierplein, 1065 LM", nl: "Sierplein, 1065 LM"},
    hours: {
      en: "1 October–31 December 2026. Monday–Friday 11:00–19:00; Saturday 11:00–18:00; Sunday closed. Holiday hours: ask at the stall.",
      nl: "1 oktober t/m 31 december 2026. Maandag t/m vrijdag 11.00–19.00; zaterdag 11.00–18.00; zondag gesloten. Feestdaguren navragen bij de kraam."
    },
    price: {en: "€1", nl: "€1"},
    source: "https://oliebollengids.nl/amsterdam/oliebollenkraam-sierplein-amsterdam",
    lat: 52.3555607, lng: 4.8265086
  },
  {
    id: "plein-40-45",
    district: "Nieuw-West",
    name: {en: "Oliebollenkraam Plein ’40-’45 (W. Reede & Zonen)", nl: "Oliebollenkraam Plein ’40-’45 (W. Reede & Zonen)"},
    location: {en: "Plein ’40-’45, Slotermeer", nl: "Plein ’40-’45, Slotermeer"},
    hours: {
      en: "Monday–Saturday 10:00–18:00; Sunday 11:00–18:00. Holiday hours not confirmed.",
      nl: "Maandag t/m zaterdag 10.00–18.00; zondag 11.00–18.00. Feestdaguren niet bevestigd."
    },
    price: {en: "€1.50", nl: "€1,50"},
    source: "https://oliebollengids.nl/amsterdam/oliebollenkraam-plein-40-45-amsterdam",
    lat: 52.3800585, lng: 4.8215334
  },
  {
    id: "gekroonde-oliebol",
    district: "Nieuw-West",
    name: {en: "De Gekroonde Oliebol", nl: "De Gekroonde Oliebol"},
    location: {en: "Car park at Tuincentrum Osdorp, Osdorperweg 247, 1069 LL", nl: "Parkeerplaats Tuincentrum Osdorp, Osdorperweg 247, 1069 LL"},
    hours: {
      en: "Almost year-round; closed in very hot weather. Monday–Saturday 10:00–17:30; Sunday 10:00–17:00.",
      nl: "Bijna het hele jaar; gesloten bij grote hitte. Maandag t/m zaterdag 10.00–17.30; zondag 10.00–17.00."
    },
    price: {en: "€1.75", nl: "€1,75"},
    source: "https://www.degekroondeoliebol.nl/",
    lat: 52.3520073, lng: 4.7900035
  },
  {
    id: "museumplein",
    district: "Zuid",
    name: {en: "Oliebollenkraam Museumplein", nl: "Oliebollenkraam Museumplein"},
    location: {
      en: "Van Baerlestraat side of Museumplein, opposite the Concertgebouw, by the Q-Park entrance",
      nl: "Aan de Van Baerlestraat-kant van het Museumplein, tegenover het Concertgebouw, bij de ingang van Q-Park"
    },
    note: {
      en: "A long-running winter stall on Museumplein, open again this season.",
      nl: "Een vaste winterkraam op het Museumplein, ook dit seizoen weer open."
    },
    lat: 52.3571060, lng: 4.8797028
  },
  {
    id: "van-woustraat",
    district: "Zuid",
    name: {en: "Oliebollenkraam Van Woustraat", nl: "Oliebollenkraam Van Woustraat"},
    location: {en: "Van Woustraat 246, 1073 NC", nl: "Van Woustraat 246, 1073 NC"},
    hours: {
      en: "10 October 2026–3 January. Tuesday–Saturday 10:00–19:00; Sunday 11:00–19:00; Monday closed; 24 December 10:00–17:00; 25–26 December closed; 1 January 12:00–18:00.",
      nl: "10 oktober 2026 t/m 3 januari. Dinsdag t/m zaterdag 10.00–19.00; zondag 11.00–19.00; maandag gesloten; 24 december 10.00–17.00; 25–26 december gesloten; 1 januari 12.00–18.00."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://oliebollenkaart.nl/kraam/amsterdam-oliebollenkraam-van-woustraat-1c5325",
    lat: 52.3493195, lng: 4.9038118
  },
  {
    id: "marie-heinekenplein",
    district: "Zuid",
    name: {en: "Oliebollenkraam Marie Heinekenplein (family Geisterfer)", nl: "Oliebollenkraam Marie Heinekenplein (familie Geisterfer)"},
    location: {en: "Marie Heinekenplein, 1072 MH", nl: "Marie Heinekenplein, 1072 MH"},
    hours: {
      en: "1 October–31 December 2026. Monday 11:00–19:00; Tuesday–Friday 10:00–19:00; Saturday 10:00–18:00; Sunday 11:00–18:00.",
      nl: "1 oktober t/m 31 december 2026. Maandag 11.00–19.00; dinsdag t/m vrijdag 10.00–19.00; zaterdag 10.00–18.00; zondag 11.00–18.00."
    },
    price: {en: "€1.40", nl: "€1,40"},
    source: "https://oliebollengids.nl/amsterdam/de-hollandse-gebakkraam-amsterdam",
    lat: 52.3571117, lng: 4.8915465
  },
  {
    id: "cornelis-troostplein",
    district: "Zuid",
    name: {en: "Oliebollenkraam JT van Gemert", nl: "Oliebollenkraam JT van Gemert"},
    location: {en: "Cornelis Troostplein, 1072 JJ", nl: "Cornelis Troostplein, 1072 JJ"},
    hours: {
      en: "Wednesday–Saturday 09:00–18:00; Sunday 10:00–18:00; 25–26 December closed; 31 December 03:00–17:00 (as published).",
      nl: "Woensdag t/m zaterdag 9.00–18.00; zondag 10.00–18.00; 25–26 december gesloten; 31 december 3.00–17.00 (zo gepubliceerd)."
    },
    price: {en: "€1.50", nl: "€1,50"},
    source: "https://oliebollengids.nl/amsterdam/van-gemert-cornelis-troostplein-amsterdam",
    lat: 52.3511725, lng: 4.8917082
  },
  {
    id: "stadionplein",
    district: "Zuid",
    name: {en: "Oliebollenkraam Stadionplein (Jan van Gemert)", nl: "Oliebollenkraam Stadionplein (Jan van Gemert)"},
    location: {en: "Stadionplein, opposite the Olympisch Stadion, by the large Albert Heijn, 1076 CK", nl: "Stadionplein, tegenover het Olympisch Stadion, bij de grote Albert Heijn, 1076 CK"},
    hours: {
      en: "Wednesday, Thursday, Saturday and Sunday 09:00–18:00 (Friday not listed); 25–26 December and 1 January closed; 31 December hours not published.",
      nl: "Woensdag, donderdag, zaterdag en zondag 9.00–18.00 (vrijdag niet vermeld); 25–26 december en 1 januari gesloten; openingstijden op 31 december niet bekend."
    },
    price: {en: "€1.50", nl: "€1,50"},
    source: "https://oliebollengids.nl/amsterdam/oliebollenkraam-j-c-van-gemert-en-zn-amsterdam",
    lat: 52.3436442, lng: 4.8571618
  },
  {
    id: "hoofddorpplein",
    district: "Zuid",
    name: {en: "Gebakkraam Hoofddorpplein", nl: "Gebakkraam Hoofddorpplein"},
    location: {en: "Hoofddorpplein, 1059 CV", nl: "Hoofddorpplein, 1059 CV"},
    hours: {
      en: "Monday–Friday 11:00–19:00; Saturday 11:00–18:00; Sunday closed.",
      nl: "Maandag t/m vrijdag 11.00–19.00; zaterdag 11.00–18.00; zondag gesloten."
    },
    price: {en: "€1.50", nl: "€1,50"},
    source: "https://oliebollengids.nl/amsterdam/gebakkraam-hoofddorpplein-amsterdam",
    lat: 52.3511136, lng: 4.8502977
  },
  {
    id: "w-boon",
    district: "Oost",
    name: {en: "Oliebollenkraam W. Boon, Zeeburg", nl: "Oliebollenkraam W. Boon, Zeeburg"},
    location: {en: "Oostelijke Handelskade, by Winkelcentrum Brazilië (near 1065)", nl: "Oostelijke Handelskade, bij Winkelcentrum Brazilië (ter hoogte van 1065)"},
    hours: {
      en: "From 5 October. Tuesday–Saturday 10:00–18:30; Sunday 11:00–18:00 (Monday not listed).",
      nl: "Vanaf 5 oktober. Dinsdag t/m zaterdag 10.00–18.30; zondag 11.00–18.00 (maandag niet vermeld)."
    },
    price: {en: "€1.50", nl: "€1,50"},
    source: "https://oliebollengids.nl/amsterdam/oliebollenkraam-w-boon-amsterdam",
    lat: 52.3739386, lng: 4.9386165
  },
  {
    id: "de-beer",
    district: "Oost",
    name: {en: "Oliebollenkraam De Beer", nl: "Oliebollenkraam De Beer"},
    location: {en: "Oetewalerbrug, Linnaeusstraat/Middenweg, by the Linnaeuskade", nl: "Oetewalerbrug, Linnaeusstraat/Middenweg, bij de Linnaeuskade"},
    hours: {
      en: "From 1 November 2026. Hours not published.",
      nl: "Vanaf 1 november 2026. Openingstijden niet bekend."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://oliebollengids.nl/amsterdam/de-hollandse-gebakkraam-amsterdam-2",
    lat: 52.3553334, lng: 4.9282265
  },
  {
    id: "old-dutch-holendrecht",
    district: "Zuidoost",
    name: {en: "Old Dutch Bakery", nl: "Old Dutch Bakery"},
    location: {en: "Opposite station Holendrecht and Amsterdam UMC", nl: "Tegenover station Holendrecht en Amsterdam UMC"},
    hours: {
      en: "3 September 2026–31 March. 10:00–18:30; New Year's Eve until late; 25–26 December closed.",
      nl: "3 september 2026 t/m 31 maart. 10.00–18.30; oudejaarsdag tot laat; 25–26 december gesloten."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://oliebollenkaart.nl/kraam/amsterdam-old-dutch-bakery-10e26a/",
    lat: 52.29715, lng: 4.9589885
  },
  {
    id: "oliebollen-arena",
    district: "Zuidoost",
    name: {en: "Oliebollen Arena", nl: "Oliebollen Arena"},
    location: {en: "Johan Cruijff Boulevard 600, 1101 DS", nl: "Johan Cruijff Boulevard 600, 1101 DS"},
    hours: {
      en: "From 1 October 2026. Daily 11:00–19:00.",
      nl: "Vanaf 1 oktober 2026. Dagelijks 11.00–19.00."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://oliebollengids.nl/amsterdam/oliebollen-arena-amsterdam",
    lat: 52.3123633, lng: 4.9457053
  },
  {
    id: "bijlmerplein",
    district: "Zuidoost",
    name: {en: "Verwijk's Oliebollen Bijlmerplein", nl: "Verwijk's Oliebollen Bijlmerplein"},
    location: {en: "Bijlmerplein, Zuidoost", nl: "Bijlmerplein, Zuidoost"},
    hours: {
      en: "1 October–31 December 2026. Daily 10:00–17:30.",
      nl: "1 oktober t/m 31 december 2026. Dagelijks 10.00–17.30."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://oliebollengids.nl/amsterdam/oliebollenkraam-amsterdam-8",
    lat: 52.314578, lng: 4.9542585
  },
  {
    id: "gebakkraam-bos",
    district: "Zuidoost",
    name: {en: "Gebakkraam Bos, Mega Praxis car park", nl: "Gebakkraam Bos, parkeerplaats Mega Praxis"},
    location: {en: "Stekkenbergweg, Mega Praxis car park, Zuidoost", nl: "Stekkenbergweg, parkeerplaats Mega Praxis, Zuidoost"},
    hours: {
      en: "From 1 October 2026. Daily 10:00–17:30.",
      nl: "Vanaf 1 oktober 2026. Dagelijks 10.00–17.30."
    },
    price: {en: "Plain oliebol price not published", nl: "Prijs van een gewone oliebol niet bekend"},
    source: "https://oliebollengids.nl/amsterdam/oliebollenkraam-amsterdam-7",
    lat: 52.2960119, lng: 4.9474215
  }
];

const OLIEBOLLEN_BAKERIES = [
  {
    id: "bakkerszonen-beukenplein",
    name: {en: "De Bakkerszonen, Beukenplein", nl: "De Bakkerszonen, Beukenplein"},
    location: {en: "Beukenplein 8, 1091 KG", nl: "Beukenplein 8, 1091 KG"},
    note: {
      en: "A dedicated oliebollen bakery that fries all year.",
      nl: "Een bakkerij die het hele jaar oliebollen bakt."
    },
    source: "https://mosveld.debakkerszonen.nl/over-ons/winkels",
    lat: 52.3571939, lng: 4.9176183
  },
  {
    id: "hartogs-volkoren",
    name: {en: "Hartog's Volkoren", nl: "Hartog's Volkoren"},
    location: {en: "Wibautstraat 77, 1091 GK", nl: "Wibautstraat 77, 1091 GK"},
    note: {
      en: "Listed in 2026 guides as a bakery that sells oliebollen, especially around New Year's Eve. Regular shop hours on its own site: Monday–Friday 07:00–18:00, Saturday 07:00–17:00, Sunday closed.",
      nl: "In gidsen uit 2026 genoemd als bakkerij die oliebollen verkoopt, vooral rond oud en nieuw. Gewone openingstijden op de eigen site: maandag t/m vrijdag 7.00–18.00, zaterdag 7.00–17.00, zondag gesloten."
    },
    source: "https://www.volkorenbrood.nl/",
    lat: 52.3568082, lng: 4.9110461
  }
];

const DISTRICT_ORDER = ["Centrum", "West", "Nieuw-West", "Zuid", "Oost", "Noord", "Zuidoost"];

module.exports = { OLIEBOLLEN_STANDS, OLIEBOLLEN_BAKERIES, DISTRICT_ORDER };
