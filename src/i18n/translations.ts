export type Lang = "nl" | "en" | "uk" | "ru"

export const LANG_LABELS: Record<Lang, string> = {
  nl: "NL",
  en: "EN",
  uk: "UA",
  ru: "RU",
}

export const LANG_NAMES: Record<Lang, string> = {
  nl: "Nederlands",
  en: "English",
  uk: "Українська",
  ru: "Русский",
}

export type TranslationKey = keyof typeof translations.nl

const translations = {
  nl: {
    // Navigation
    nav_services: "Diensten",
    nav_projects: "Projecten",
    nav_about: "Over ons",
    nav_area: "Werkgebied",
    nav_kennisbank: "Kennisbank",
    kb_page_title: "Kennisbank",
    kb_page_sub:
      "Praktische gidsen, actuele richtprijzen en vakkundig advies voor uw verbouwing of renovatie.",
    nav_contact: "Contact",
    nav_cta: "Offerte aanvragen",
    nav_business: "Zakelijk",

    // Hero
    hero_label: "Vakmannen & Aannemers in Nederland",
    hero_title: "Bouwen, renoveren en afwerken.",
    hero_title_accent: "Van idee tot strak resultaat.",
    hero_sub:
      "Professionele bouw-, renovatie- en afbouwwerkzaamheden voor woningen en bedrijven. Eén aanspreekpunt, transparante calculaties en garantie op oplevering.",
    hero_cta_primary: "Direct offerte aanvragen",
    hero_cta_secondary: "Bekijk onze diensten",
    hero_trust_1: "Snelle reactie binnen 24u",
    hero_trust_2: "Vaste prijsafspraak vooraf",
    hero_trust_3: "Vakkundige garantie",

    // Nudges & Conversion triggers
    nudge_wa_online: "Nu online · reactie < 15 min",
    nudge_wa_bubble:
      "Vragen over uw verbouwing of richtprijs? App ons gerust met foto's voor direct advies 💬",
    nudge_wa_btn: "Start WhatsApp chat",
    nudge_bar_text:
      "Plannen voor een verbouwing? Ontvang binnen 24u een gratis richtprijs.",
    nudge_bar_wa: "App uw foto's 💬",
    nudge_bar_quote: "Offerte aanvragen ⚡",
    nudge_estimator_tip:
      "Tip: Stuur een foto van uw ruimte via WhatsApp voor een exacte prijsindicatie binnen 2 uur!",

    // Stats
    stat_1_val: "25+",
    stat_1_lbl: "jaar ervaring",
    stat_2_val: "1.500+",
    stat_2_lbl: "projecten afgerond",
    stat_3_val: "VCA",
    stat_3_lbl: "gecertificeerd",
    stat_4_val: "€55",
    stat_4_lbl: "vanaf tarief p/u incl. btw",

    // Multi-step & CRO
    btn_next: "Volgende stap",
    btn_back: "Terug",
    btn_submit_request: "Verstuur Aanvraag",
    step_1_of_3: "Stap 1 van 3",
    step_2_of_3: "Stap 2 van 3",
    step_3_of_3: "Stap 3 van 3",
    step_1_of_2: "Stap 1 van 2",
    step_2_of_2: "Stap 2 van 2",
    badge_best_value: "Meest gekozen",

    // Estimator
    est_eyebrow: "Direct inzicht",
    est_title: "Bereken direct uw richtprijs",
    est_sub:
      "Selecteer uw type werkzaamheden en oppervlakte voor een realtime indicatie van de kosten.",
    est_step_1: "1. Kies het type werkzaamheden",
    est_step_2: "2. Oppervlakte / Omvang",
    est_step_3: "3. Kwaliteitsniveau van materialen",
    est_tier_std: "Standaard",
    est_tier_std_desc: "Degelijke basiskwaliteit",
    est_tier_prem: "Premium",
    est_tier_prem_desc: "Hoogwaardige A-merken",
    est_tier_lux: "Luxe / Design",
    est_tier_lux_desc: "High-end afwerking",
    est_opt_demo: "Inclusief sloopwerk & afvoer",
    est_opt_mat: "Inclusief hoogwaardige materialen",
    est_est_price: "Geschatte richtprijs:",
    est_apply_btn: "Offerte aanvragen voor deze berekening",
    est_disclaimer:
      "* Indicatieve berekening incl. btw. Definitieve prijs volgt na vrijblijvende opname op locatie.",

    // Services section & pages
    services_label: "Onze Vakgebieden",
    services_title: "Waarmee kan Bouwvast u helpen?",
    services_sub:
      "Bekijk per discipline wat we voor u kunnen betekenen, wat erbij hoort en welke richtprijzen gelden.",
    services_all: "Bekijk alle diensten",
    more_info: "Bekijk dienst →",

    // Service names & descriptions
    svc_renovation: "Woningrenovatie",
    svc_renovation_desc:
      "Complete of gedeeltelijke renovatie van woningen en bedrijfsruimtes.",
    svc_finishing: "Afbouw & Stucwerk",
    svc_finishing_desc:
      "Sausklaar stucen, behangklaar, pleisterwerk, scheidingswanden en plafonds.",
    svc_painting: "Binnen- & Buitenschilderwerk",
    svc_painting_desc:
      "Vakkundig saus- en lakwerk voor particulieren en bedrijven met 9% btw voordeel.",
    svc_facade: "Gevel- & Metselwerk",
    svc_facade_desc:
      "Voegwerk, scheurherstel, gevelreiniging en buitengevelisolatie.",
    svc_assembly: "Montage & Afwerking",
    svc_assembly_desc:
      "Nauwkeurige montage van keukens, deuren, kasten en interieurelementen.",
    svc_maintenance: "Onderhoud & Schadeherstel",
    svc_maintenance_desc:
      "Kleine en grotere onderhoudswerkzaamheden, vochtherstel en mutatieonderhoud.",
    svc_bathroom: "Badkamer & Keuken",
    svc_bathroom_desc:
      "Complete renovatie, leidingwerk, tegelwerk en luxe sanitairmontage.",
    svc_carpenter: "Timmerman",
    svc_carpenter_desc:
      "Kozijnen, binnen- en buitendeuren, maatwerk inbouwkasten en aftimmerwerk.",
    svc_plumber: "Loodgieter",
    svc_plumber_desc:
      "Leidingwerk, sanitair aansluiten, vloerverwarming en lekkages verhelpen.",
    svc_general: "Algemene Bouwwerkzaamheden",
    svc_general_desc:
      "Multidisciplinaire verbouwingen en projecten van ontwerp tot oplevering.",

    // Before/After
    ba_label: "Het verschil",
    ba_title: "Voor & Na: Echte transformaties",
    ba_sub:
      "Sleep met de balk om het verschil vóór en na onze werkzaamheden te bekijken.",
    ba_before: "VOOR",
    ba_after: "NA",
    ba_hint: "Sleep om te vergelijken",

    // Audience
    aud_label: "Voor wie",
    aud_title: "Voor particulieren én zakelijke partners",
    aud_sub:
      "Of u nu een woning verbouwt, een badkamer renoveert of als beheerder vaste capaciteit zoekt: Bouwvast staat klaar.",
    aud_part_title: "Particulier",
    aud_part_heading: "Voor uw woning en verbouwing",
    aud_part_desc:
      "Van badkamerrenovatie tot complete woningverbouwing. Eerlijke offertes, duidelijke afspraken en één vast aanspreekpunt.",
    aud_b2b_title: "Zakelijk",
    aud_b2b_heading: "Voor aannemers, VvE's en beheerders",
    aud_b2b_desc:
      "Flexibele inzet van vakkundige bouwteams. Onderhoud, afbouw, renovatie en projectmatige capaciteit op locatie.",

    // How it works
    how_label: "Werkwijze",
    how_title: "In 4 stappen naar een geslaagde verbouwing",
    how_cta: "Vraag direct een offerte aan",
    how_1_title: "1. Vrijblijvende Aanvraag",
    how_1_desc:
      "Beschrijf uw project via het online aanvraagformulier of bereken vooraf uw richtprijs.",
    how_2_title: "2. Opname & Advies",
    how_2_desc:
      "We bespreken uw wensen en plannen eventueel een vrijblijvende inspectie op locatie in.",
    how_3_title: "3. Transparante Offerte",
    how_3_desc:
      "U ontvangt een gespecificeerde offerte met duidelijke planning en vaste prijsafspraken.",
    how_4_title: "4. Vakkundige Oplevering",
    how_4_desc:
      "Onze vaklieden voeren het werk strak uit. Oplevering pas als u 100% tevreden bent.",

    // Reviews
    rev_label: "Klanttevredenheid",
    rev_title: "Beoordeeld met een 4.9 / 5.0",
    rev_sub:
      "Gebaseerd op meer dan 120 geverifieerde reviews van huiseigenaren en zakelijke opdrachtgevers.",

    // Pricing
    price_label: "Tarieven",
    price_title: "Duidelijke prijzen vooraf",
    price_sub:
      "Bij Bouwvast hanteren we transparante tarieven zonder verborgen kosten achteraf.",

    // Founder Trust Card
    trust_card_label: "Vakmanschap & Betrouwbaarheid",
    trust_card_title: '"Bouwen op vertrouwen en heldere afspraken."',
    trust_card_desc:
      "Bij Bouwvast geloven we dat een verbouwing soepel en zorgeloos moet verlopen. Wij combineren jarenlange praktijkervaring met één vast aanspreekpunt en transparante prijzen. Geen verrassingen achteraf, maar een resultaat waar u jarenlang van geniet.",
    trust_badge_1: "VCA Gecertificeerd",
    trust_badge_2: "Garantie op Uitvoering",
    trust_badge_3: "Vaste Prijscalculatie",

    // Area & City Page
    area_page_title: "Werkgebied & Gemeenten",
    area_page_sub:
      "Bouwvast is actief in heel Midden-Nederland en alle grote steden. Bekijk alle gemeenten en plaatsen binnen ons werkgebied.",
    area_places: "plaatsen",
    city_page_title: "Aannemer & Verbouwing in",
    city_page_sub:
      "Vakkundige woningrenovatie, badkamers, stucwerk en schilderwerk in",

    // Projects Page
    projects_label: "Ons Portfolio",
    projects_title: "Recent opgeleverde projecten",
    projects_sub:
      "Een greep uit onze recente verbouwingen en renovaties in Nederland.",

    // About Page
    about_page_title: "Over Bouwvast Nederland",
    about_page_sub:
      "Betrouwbaar vakmanschap, één vast aanspreekpunt en garantie op elke verbouwing.",

    // Business Page
    b2b_page_title: "Zakelijke Samenwerking & Partners",
    b2b_page_sub:
      "Uw betrouwbare uitvoerende bouwpartner voor aannemers, keukenzaken, VvE's en vastgoedbeheerders.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Veelgestelde vragen over verbouwen",
    faq_1_q: "Zijn de getoonde prijzen inclusief BTW?",
    faq_1_a: "Onze calculator toont richtprijzen exclusief BTW, aangezien veel particuliere woningen (ouder dan 2 jaar) in aanmerking komen voor het lage 9% BTW-tarief op specifieke werkzaamheden. In een formele offerte splitsen we dit exact voor u uit.",
    faq_1b_q: "Welke werkzaamheden voeren jullie uit?",
    faq_1b_a:
      "Wij voeren complete woningrenovaties, badkamers, stucwerk, schilderwerk, timmerwerk, loodgieterswerk, gevelwerk en onderhoud uit.",
    faq_2_q: "Wat als er tijdens de verbouwing verborgen gebreken opduiken?",
    faq_2_a: "Transparantie staat voorop. Mochten we onvoorziene zaken (zoals houtrot of leidinglekkages) tegenkomen, dan bespreken we dit direct met u. We bieden een oplossing en prijs aan vóórdat we verdere kosten maken. Geen verrassingen achteraf.",
    faq_2b_q: "Werken jullie ook voor zakelijke opdrachtgevers?",
    faq_2b_a:
      "Ja, wij werken dagelijks voor particulieren, aannemers, VvE's en vastgoedbeheerders.",
    faq_3_q: "In welke regio zijn jullie actief?",
    faq_3_a:
      "Wij zijn actief in heel Nederland, met focus op grote steden zoals Amersfoort, Utrecht, Amsterdam, Hilversum en omstreken.",
    faq_4_q: "Kan ik eerst een vrijblijvende offerte aanvragen?",
    faq_4_a:
      "Ja, al onze offertes en berekeningen zijn 100% gratis en geheel vrijblijvend.",

    // Form & Modals
    form_title: "Vraag direct een offerte aan",
    form_sub: "Binnen 24 uur een heldere reactie en prijsopgave.",
    form_name: "Uw naam",
    form_phone: "Telefoonnummer",
    form_email: "E-mailadres",
    form_city: "Woonplaats / Postcode",
    form_type: "Type werkzaamheden",
    form_desc: "Beschrijf uw wensen en bijzonderheden...",
    form_time: "Gewenste startperiode",
    form_choose_time: "Selecteer gewenste startperiode...",
    form_time_morning: "Zo snel mogelijk / met spoed",
    form_time_afternoon: "Binnen 1 maand",
    form_time_all_day: "Binnen 1 tot 3 maanden",
    form_time_consultation: "Nog aan het oriënteren",
    form_photos: "Foto's toevoegen",
    form_optional: "optioneel",
    form_photos_hint:
      "Upload maximaal 5 foto's (JPG, PNG, WebP) voor een snellere offerte.",
    form_photos_selected: "{n} foto('s) geselecteerd",
    form_required: "Selecteer type werk...",
    form_submit: "Verstuur aanvraag →",
    form_privacy:
      "Uw gegevens worden vertrouwelijk behandeld en uitsluitend voor deze offerte gebruikt.",
    form_success_title: "Aanvraag succesvol ontvangen!",
    form_success_sub:
      "Bedankt voor uw aanvraag. Een van onze bouwadviseurs neemt binnen 24 uur contact met u op.",
    form_sending: "Bezig met verzenden…",
    form_error_title: "Verzenden is niet gelukt",
    form_error_sub:
      "Uw aanvraag is niet bij ons aangekomen. Uw gegevens staan nog ingevuld — stuur ze direct via WhatsApp of e-mail, of bel ons.",
    form_error_queued:
      "We proberen het automatisch opnieuw zodra uw verbinding er weer is.",
    form_error_retry: "Opnieuw proberen",
    form_error_whatsapp: "Via WhatsApp",
    form_error_email: "Via e-mail",
    form_error_call: "Bel ons",
    form_error_subject: "Offerteaanvraag",
    form_photos_too_big:
      "De foto's zijn samen te groot om mee te sturen. Uw aanvraag is verstuurd — stuur de foto's gerust na via WhatsApp of e-mail.",

    // Wizard Modal steps
    wizard_step_1_title: "1. Waarmee kunnen we u helpen?",
    wizard_step_2_title: "2. Omschrijf uw klus of verbouwing",
    wizard_step_3_title: "3. Contactgegevens voor offerte",
    wizard_next: "Volgende stap →",
    wizard_back: "← Vorige",
    wizard_modal_title: "Offerte Aanvragen",

    // CTA
    cta_title: "Klaar om uw verbouwing te starten?",
    cta_sub:
      "Vraag vandaag nog een vrijblijvende offerte aan of bel direct met een van onze adviseurs.",
    cta_btn: "Offerte aanvragen",

    // Footer
    footer_desc:
      "Hét betrouwbare bouw- en renovatieplatform van Nederland. Vakkundige uitvoering, transparante prijzen en heldere communicatie voor elke verbouwing.",
    footer_info: "Informatie",
    footer_services: "Diensten",
    footer_cities: "Grote Steden",
    footer_privacy: "Privacybeleid",
    footer_terms: "Algemene voorwaarden",
    footer_partner: "Vakman worden",
    footer_rights: "Alle rechten voorbehouden.",

    // Global / UI
    skip_link: "Direct naar hoofdinhoud",
    nav_call: "Bellen",
    close: "Sluiten",
    cookie_title: "Cookies & Privacy",
    cookie_desc:
      "Wij gebruiken functionele en analytische cookies om onze website te optimaliseren en u een soepele gebruikservaring te bieden.",
    cookie_decline: "Weigeren",
    cookie_accept: "Accepteren",
    toast_new: "Nieuwe",
    toast_ago: "geleden",
    toast_minutes: "minuten",
    toast_hour: "uur",
    toast_request: "aanvraag",
    toast_quote: "offerte",
    nudge_close: "Sluit melding",
    nudge_bar_close: "Sluit balk",

    // Home Sections
    portfolio_label: "Ons Portfolio",
    portfolio_title: "Recent opgeleverde projecten",
    portfolio_all: "Bekijk alle projecten",
    types_label: "Soorten Projecten",
    types_title: "Wat voor projecten doen we?",
    types_discuss: "Project bespreken",
    whyus_label: "Waarom Bouwvast?",
    whyus_title: "Betrouwbaar en transparant",
    whyus_sub:
      "Jarenlange ervaring en één vast aanspreekpunt voor uw verbouwing.",
    // Regions
    region_groot: "Grote Steden Nederland",
    region_kern: "Kernwerkgebied",
    region_utrecht: "Regio Utrecht",
    region_gooi: "Gooi & Eemland",
    region_gelderland: "Gelderland",

    // Page Specific
    city_hero_title: "Vakman in {city} — Bouwvast",
    city_hero_sub: "Betrouwbare bouw-, renovatie- en onderhoudswerkzaamheden in {city} en omstreken.",
    city_services_eyebrow: "Diensten in {city}",
    city_services_title: "Werkzaamheden in {city}",
    city_seo_title: "Waarom kiezen voor Bouwvast in {city}?",
    city_seo_p1: "Woont u in {city} of heeft u hier een bedrijfspand en zoekt u een betrouwbare vakman voor uw verbouwing, badkamer, schilderwerk of onderhoud? Bouwvast biedt een compleet pakket van vakkundige disciplines onder één dak.",
    city_seo_p2: "Met één vast aanspreekpunt, duidelijke afspraken en vakmensen met jarenlange ervaring garanderen we dat uw project soepel en naar volle tevredenheid verloopt.",
    city_faq_title: "Veelgestelde vragen over {city}",
    city_quote_title: "Offerte in {city}",
    city_quote_sub: "Vrijblijvende prijsindicatie binnen 24 uur.",
    city_faq_1_q: "Voert Bouwvast ook werkzaamheden uit in {city}?",
    city_faq_1_a: "Ja, {city} valt binnen ons vaste werkgebied. We verzorgen hier regelmatig verbouwingen, renovaties, schilderwerk en onderhoud.",
    city_faq_2_q: "Hoe snel kunnen jullie ter plaatse zijn voor een opname?",
    city_faq_2_a: "Voor een vrijblijvende opname of spoedklus in de regio kunnen we meestal binnen enkele werkdagen bij u langskomen.",
    city_faq_3_q: "Zijn de tarieven in alle gemeenten gelijk?",
    city_faq_3_a: "Ja, wij hanteren transparante tarieven zonder onverwachte voorrijkosten binnen ons kernwerkgebied.",
    city_faq_4_q: "Krijg ik garantie op de werkzaamheden in mijn woning?",
    city_faq_4_a: "Zeker, op alle uitgevoerde werkzaamheden en geleverde materialen ontvangt u standaard volledige kwaliteitsgarantie.",
    
    service_hero_suffix: " in uw regio",
    service_includes_eyebrow: "Wat valt hieronder",
    service_includes_title: "Werkzaamheden die wij verzorgen",
    service_process_eyebrow: "Aanpak",
    service_process_title: "Hoe wij te werk gaan",
    service_area_eyebrow: "Werkgebied",
    service_area_title: "{service} in uw regio",
    service_area_desc: "Wij zijn actief in en rondom grote steden. Bekijk wat we in uw woonplaats voor u kunnen verzorgen.",
    service_quote_title: "Vrijblijvende offerte",
    service_quote_sub: "Vraag direct een prijsindicatie aan voor {service}.",
    service_related_eyebrow: "Verder kijken",
    service_related_title: "Andere diensten van Bouwvast",
    
    area_direct_municipality: "Direct naar uw gemeente",

    // Service Intros & Includes
    svc_renovation_intro: "Van een enkele woonlaag tot een complete turn-key woningrenovatie. We begeleiden uw verbouwing van sloop tot oplevering met één vast aanspreekpunt, heldere planning en vaste prijsafspraken.",
    svc_renovation_inc_1: "Complete woningrenovatie en herindeling",
    svc_renovation_inc_2: "Draagmuur doorbraken & stalen balken (berekend)",
    svc_renovation_inc_3: "Vloerisolatie, dekvloeren & vloerverwarming",
    svc_renovation_inc_4: "Plafonds, stucwerk en schilderklare afwerking",
    svc_renovation_inc_5: "Turn-key oplevering inclusief bouwafval afvoer",

    svc_bathroom_intro: "Specialist in complete badkamer- en keukenverbouwingen. Van leidingwerk en waterdichte kimband tot grootformaat tegelwerk en luxe sanitairmontage.",
    svc_bathroom_inc_1: "Volledige badkamerrenovatie & inloopdouche",
    svc_bathroom_inc_2: "Leidingen infrezen (water, afvoer, elektra)",
    svc_bathroom_inc_3: "Grootformaat tegelwerk & precisie leveling",
    svc_bathroom_inc_4: "Keukens vakkundig plaatsen en aansluiten",
    svc_bathroom_inc_5: "Schimmelwerend sanitair kitwerk met garantie",

    svc_finishing_intro: "Strak stucwerk en complete afbouw voor renovatie en nieuwbouw. Spiegelglad sausklaar pleisterwerk, scheidingswanden en verlaagde plafonds.",
    svc_finishing_inc_1: "Sausklaar stucwerk (spiegelglad)",
    svc_finishing_inc_2: "Behangklaar stucen & renovlies aanbrengen",
    svc_finishing_inc_3: "Metal-stud scheidingswanden & isolatie",
    svc_finishing_inc_4: "Gipsplaten plafonds met inbouwspots",
    svc_finishing_inc_5: "Deuropeningen en kozijnen strak afwerken",

    svc_painting_intro: "Vakkundig binnen- en buitenschilderwerk met professionele verfsystemen. Strakke sauswanden, zijdeglans lakwerk op kozijnen en grondig houtrotherstel.",
    svc_painting_inc_1: "Airless spuitwerk & handmatig sauswerk",
    svc_painting_inc_2: "Kozijnen, ramen en binnendeuren lakken",
    svc_painting_inc_3: "Buitenschilderwerk & gevelbehandeling",
    svc_painting_inc_4: "Houtrotherstel met 2-componenten epoxy",
    svc_painting_inc_5: "Profiteer van 9% verlaagd btw-tarief",

    svc_carpenter_intro: "Ervaren timmerlieden voor maatwerk houtconstructies, binnendeuren afhangen, kozijnen vernieuwen en dakkapel aftimmering.",
    svc_carpenter_inc_1: "Hardhouten & kunststof kozijnen plaatsen",
    svc_carpenter_inc_2: "Binnendeuren en buitendeuren afhangen",
    svc_carpenter_inc_3: "Maatwerk inbouwkasten & cinewalls",
    svc_carpenter_inc_4: "Dakkapel en zolder aftimmering",
    svc_carpenter_inc_5: "Houten vloeren en plinten monteren",

    svc_facade_intro: "Duurzaam herstel en onderhoud aan de buitenschil van uw woning. Voegwerk, metselreparaties, gevelreiniging en buitengevelisolatie.",
    svc_facade_inc_1: "Voegwerk uithakken & opnieuw invoegen",
    svc_facade_inc_2: "Metselwerk herstellen & scheurvorming repareren",
    svc_facade_inc_3: "Gevelreiniging & hydrofoberen (impregneren)",
    svc_facade_inc_4: "Boeidelen en dakgoten vernieuwen",
    svc_facade_inc_5: "Buitengevelisolatie en afwerking",

    svc_assembly_intro: "Nauwkeurig montagewerk voor woningen en bedrijfspanden. Van kasten en schuifwanden tot deuren, verlichting en meubelinstallatie.",
    svc_assembly_inc_1: "Keukenmontage & apparatuur inbouw",
    svc_assembly_inc_2: "Deuren, schuifdeursystemen & hang- en sluitwerk",
    svc_assembly_inc_3: "Wandpanelen, akoestische panelen & cinewalls",
    svc_assembly_inc_4: "Dakraam (Velux) montage & aftimmering",
    svc_assembly_inc_5: "Plinten en lijstwerk strak verstek zagen",

    svc_plumber_intro: "Betrouwbare loodgieters voor leidingwerk bij verbouwingen, sanitair aansluiten, vloerverwarming en acute lekkages.",
    svc_plumber_inc_1: "Water- en afvoerleidingen verleggen",
    svc_plumber_inc_2: "Inloopdouche drains & inbouwkranen aansluiten",
    svc_plumber_inc_3: "Vloerverwarming verdelers & leidingen",
    svc_plumber_inc_4: "Lekkages opsporen en direct verhelpen",
    svc_plumber_inc_5: "Radiatoren vervangen & CV-aanpassingen",

    svc_maintenance_intro: "Onderhoudswerkzaamheden en herstelklussen aan uw woning of vastgoedcomplex. Preventief, vakkundig en met garantie.",
    svc_maintenance_inc_1: "Herstel van vochtschade & stucwerk",
    svc_maintenance_inc_2: "Deursloten en hang- en sluitwerk vernieuwen (SKG***)",
    svc_maintenance_inc_3: "Vervangen van beschadigde tegels of plinten",
    svc_maintenance_inc_4: "Onderhoudsbeurten voor woningen en VvE's",
    svc_maintenance_inc_5: "Snel ter plaatse voor noodreparaties",

    svc_general_intro: "Heeft u een combinatieproject of een specifieke verbouwklus? Wij denken mee vanaf de ontwerpfase tot aan de bezemvaste oplevering.",
    svc_general_inc_1: "Multidisciplinaire verbouwingen",
    svc_general_inc_2: "Persoonlijk bouwadvies en opname op locatie",
    svc_general_inc_3: "Transparante calculatie zonder verborgen kosten",
    svc_general_inc_4: "Vaste planning met één bouwcoördinator",
  },

  en: {
    // Navigation
    nav_services: "Services",
    nav_projects: "Projects",
    nav_about: "About Us",
    nav_area: "Service Area",
    nav_kennisbank: "Knowledge Base",
    kb_page_title: "Knowledge Base",
    kb_page_sub:
      "Practical guides, current price indications and expert advice for your renovation or building project.",
    nav_contact: "Contact",
    nav_cta: "Request a Quote",
    nav_business: "Business",
    btn_next: "Next step",
    btn_back: "Back",
    btn_submit_request: "Submit Request",
    step_1_of_3: "Step 1 of 3",
    step_2_of_3: "Step 2 of 3",
    step_3_of_3: "Step 3 of 3",
    step_1_of_2: "Step 1 of 2",
    step_2_of_2: "Step 2 of 2",
    badge_best_value: "Most popular",

    // Hero
    hero_label: "Professional Contractors & Builders in the Netherlands",
    hero_title: "Building, renovating and finishing.",
    hero_title_accent: "From concept to premium result.",
    hero_sub:
      "Professional construction, renovation, and finishing services for homes and businesses. Single point of contact, transparent calculations, and guaranteed quality.",
    hero_cta_primary: "Request a Quote Now",
    hero_cta_secondary: "View Our Services",
    hero_trust_1: "Quick response within 24h",
    hero_trust_2: "Fixed price agreement upfront",
    hero_trust_3: "Workmanship warranty",

    // Nudges & Conversion triggers
    nudge_wa_online: "Now online · reply < 15 min",
    nudge_wa_bubble:
      "Questions about your renovation or estimate? Chat with us on WhatsApp for fast advice 💬",
    nudge_wa_btn: "Start WhatsApp chat",
    nudge_bar_text:
      "Planning a renovation? Get a free estimate within 24 hours.",
    nudge_bar_wa: "Chat on WhatsApp 💬",
    nudge_bar_quote: "Request Quote ⚡",
    nudge_estimator_tip:
      "Tip: Send a photo of your space via WhatsApp for an exact price estimate within 2 hours!",

    // Stats
    stat_1_val: "25+",
    stat_1_lbl: "years experience",
    stat_2_val: "1,500+",
    stat_2_lbl: "completed projects",
    stat_3_val: "VCA",
    stat_3_lbl: "certified",
    stat_4_val: "€55",
    stat_4_lbl: "starting rate p/h incl. VAT",

    // Estimator
    est_eyebrow: "Instant Estimate",
    est_title: "Calculate your estimated price online",
    est_sub:
      "Select your project type and square footage for a real-time price range estimation.",
    est_step_1: "1. Select service type",
    est_step_2: "2. Surface / Project size",
    est_step_3: "3. Material quality tier",
    est_tier_std: "Standard",
    est_tier_std_desc: "Solid baseline quality",
    est_tier_prem: "Premium",
    est_tier_prem_desc: "High-quality A-brands",
    est_tier_lux: "Luxury / Design",
    est_tier_lux_desc: "High-end bespoke finish",
    est_opt_demo: "Include demolition & waste removal",
    est_opt_mat: "Include premium materials",
    est_est_price: "Estimated price range:",
    est_apply_btn: "Request quote for this calculation",
    est_disclaimer:
      "* Indicative calculation incl. VAT. Final price confirmed after non-binding on-site inspection.",

    // Services section & pages
    services_label: "Our Disciplines",
    services_title: "How can Bouwvast assist your build?",
    services_sub:
      "Explore each discipline, what deliverables are included, and transparent pricing benchmarks.",
    services_all: "View all services",
    more_info: "View service →",

    // Service names & descriptions
    svc_renovation: "Home Renovation",
    svc_renovation_desc:
      "Complete or partial turn-key renovation of homes and commercial spaces.",
    svc_finishing: "Plastering & Drywall",
    svc_finishing_desc:
      "Smooth finish plastering, drywall partitions, suspended ceilings, and subfloors.",
    svc_painting: "Interior & Exterior Painting",
    svc_painting_desc:
      "Professional paint spraying and woodwork lacquering with 9% VAT benefit for residential.",
    svc_facade: "Facade & Masonry",
    svc_facade_desc:
      "Tuckpointing, brickwork restoration, pressure cleaning, and exterior insulation.",
    svc_assembly: "Mounting & Fitting",
    svc_assembly_desc:
      "Precision installation of kitchens, interior doors, custom cabinetry, and finishes.",
    svc_maintenance: "Maintenance & Repairs",
    svc_maintenance_desc:
      "Small and large maintenance tasks, moisture repairs, and ongoing property maintenance.",
    svc_bathroom: "Bathroom & Kitchen",
    svc_bathroom_desc:
      "Complete remodeling, plumbing, tile leveling, and luxury sanitary fitting.",
    svc_carpenter: "Carpenter",
    svc_carpenter_desc:
      "Window and door frames, hanging doors, built-in cabinetry and finish carpentry.",
    svc_plumber: "Plumber",
    svc_plumber_desc:
      "Pipework, sanitary connections, underfloor heating and leak repairs.",
    svc_general: "General Building Works",
    svc_general_desc:
      "Multidisciplinary construction projects coordinated from design to clean handover.",

    // Before/After
    ba_label: "The Difference",
    ba_title: "Before & After: Real Transformations",
    ba_sub: "Slide the divider to inspect the space before and after our work.",
    ba_before: "BEFORE",
    ba_after: "AFTER",
    ba_hint: "Drag to compare",

    // Audience
    aud_label: "Who We Serve",
    aud_title: "For Homeowners and Business Partners",
    aud_sub:
      "Whether you are remodeling a residence, updating a bathroom, or seeking contractor capacity: Bouwvast is ready.",
    aud_part_title: "Homeowners",
    aud_part_heading: "For your home & living space",
    aud_part_desc:
      "From bathroom renovations to complete home remodeling. Fair quotes, clear agreements, and a dedicated contact person.",
    aud_b2b_title: "Commercial & Partners",
    aud_b2b_heading: "For general contractors, HOAs & property managers",
    aud_b2b_desc:
      "Flexible deployment of skilled building teams. Maintenance, plastering, renovation, and scalable on-site capacity.",

    // How it works
    how_label: "Process",
    how_title: "4 Steps to a Smooth Renovation",
    how_cta: "Request a free quote",
    how_1_title: "1. Free Inquiry",
    how_1_desc:
      "Tell us about your project via our form or calculate an online estimate in seconds.",
    how_2_title: "2. Survey & Advice",
    how_2_desc:
      "We review your requirements and schedule a complimentary on-site inspection if needed.",
    how_3_title: "3. Transparent Quote",
    how_3_desc:
      "You receive an itemized proposal with clear schedules, scope, and fixed pricing terms.",
    how_4_title: "4. Professional Delivery",
    how_4_desc:
      "Our craftsmen execute the work neatly. Handover occurs only when you are 100% satisfied.",

    // Reviews
    rev_label: "Customer Rating",
    rev_title: "Rated 4.9 / 5.0 by Clients",
    rev_sub:
      "Based on over 120 verified reviews from homeowners and business clients across the Netherlands.",

    // Pricing
    price_label: "Pricing",
    price_title: "Transparent Rates Upfront",
    price_sub:
      "At Bouwvast, we practice transparent rates without unexpected surprise fees.",

    // Founder Trust Card
    trust_card_label: "Craftsmanship & Reliability",
    trust_card_title: '"Building on trust and clear agreements."',
    trust_card_desc:
      "At Bouwvast, we believe renovations should be smooth and worry-free. We combine decades of experience with a single point of contact and transparent pricing.",
    trust_badge_1: "VCA Certified",
    trust_badge_2: "Execution Warranty",
    trust_badge_3: "Fixed Calculation",

    // Area & City Page
    area_page_title: "Service Areas & Municipalities",
    area_page_sub:
      "Bouwvast is active throughout Central Netherlands and all major metropolitan cities.",
    area_places: "locations",
    city_page_title: "Contractor & Renovations in",
    city_page_sub:
      "Professional home renovation, bathroom remodeling, plastering, and painting in",

    // Projects Page
    projects_label: "Our Portfolio",
    projects_title: "Recently completed projects",
    projects_sub:
      "A selection of our recent renovations and builds across the Netherlands.",

    // About Page
    about_page_title: "About Bouwvast Netherlands",
    about_page_sub:
      "Reliable craftsmanship, dedicated contact person, and full warranty on every build.",

    // Business Page
    b2b_page_title: "Business Partnerships & B2B",
    b2b_page_sub:
      "Your trusted executing construction partner for general contractors, showrooms, and HOAs.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Frequently Asked Questions",
    faq_1_q: "Are the prices shown inclusive of VAT?",
    faq_1_a: "Our calculator shows estimates excluding VAT, as many private homes (older than 2 years) qualify for the reduced 9% VAT rate on specific works. In a formal quote, we detail this exactly for you.",
    faq_1b_q: "What types of construction work do you handle?",
    faq_1b_a:
      "We manage complete home renovations, bathrooms, plastering, painting, carpentry, plumbing, masonry, and ongoing maintenance.",
    faq_2_q: "What if hidden defects arise during the renovation?",
    faq_2_a: "Transparency is our priority. Should we encounter unforeseen issues (like wood rot or pipe leaks), we discuss this directly with you. We offer a solution and price before incurring any further costs. No surprises afterwards.",
    faq_2b_q: "Do you work with commercial clients?",
    faq_2b_a:
      "Yes, we partner daily with private homeowners, general contractors, HOAs (VvE), and property managers.",
    faq_3_q: "In which areas do you operate?",
    faq_3_a:
      "We operate nationwide across the Netherlands, with strong focus on major metropolitan hubs.",
    faq_4_q: "Is requesting a quote free of obligation?",
    faq_4_a:
      "Yes, all our estimates and online calculations are 100% free and carry zero commitment.",

    // Form & Modals
    form_title: "Request your free quote",
    form_sub: "Clear response and price estimate within 24 hours.",
    form_name: "Full Name",
    form_phone: "Phone Number",
    form_email: "Email Address",
    form_city: "City / Postal Code",
    form_type: "Service Category",
    form_desc: "Describe your project requirements...",
    form_time: "Preferred Start Period",
    form_choose_time: "Select preferred start period...",
    form_time_morning: "As soon as possible / Urgent",
    form_time_afternoon: "Within 1 month",
    form_time_all_day: "Within 1 to 3 months",
    form_time_consultation: "Still orienting / Planning",
    form_photos: "Attach Photos",
    form_optional: "optional",
    form_photos_hint:
      "Upload up to 5 photos (JPG, PNG, WebP) for faster and more precise pricing.",
    form_photos_selected: "{n} photo(s) selected",
    form_required: "Select service...",
    form_submit: "Submit Quote Request →",
    form_privacy:
      "Your details are treated confidentially and used solely for this quotation.",
    form_success_title: "Inquiry Successfully Received!",
    form_success_sub:
      "Thank you for reaching out. One of our building advisors will contact you within 24 hours.",
    form_sending: "Sending…",
    form_error_title: "Your request did not go through",
    form_error_sub:
      "We did not receive your request. Your details are still filled in — send them straight through WhatsApp or email, or give us a call.",
    form_error_queued:
      "We will try again automatically as soon as your connection is back.",
    form_error_retry: "Try again",
    form_error_whatsapp: "Via WhatsApp",
    form_error_email: "Via email",
    form_error_call: "Call us",
    form_error_subject: "Quote request",
    form_photos_too_big:
      "Your photos are too large to send along. The request itself went through — feel free to send the photos via WhatsApp or email.",

    // Wizard Modal steps
    wizard_step_1_title: "1. How can we help you?",
    wizard_step_2_title: "2. Describe your renovation or project",
    wizard_step_3_title: "3. Contact details for your quote",
    wizard_next: "Next Step →",
    wizard_back: "← Back",
    wizard_modal_title: "Request a Quote",

    // CTA
    cta_title: "Ready to start your building project?",
    cta_sub:
      "Request a free non-binding quote today or call our advisors directly.",
    cta_btn: "Request a Quote",

    // Footer
    footer_desc:
      "The trusted building and renovation platform in the Netherlands. Skilled craftsmanship, transparent pricing, and clear communication for every project.",
    footer_info: "Information",
    footer_services: "Services",
    footer_cities: "Major Cities",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms & Conditions",
    footer_partner: "Become a Partner",
    footer_rights: "All rights reserved.",

    // Global / UI
    skip_link: "Skip to main content",
    nav_call: "Call Us",
    close: "Close",
    cookie_title: "Cookies & Privacy",
    cookie_desc:
      "We use functional and analytical cookies to optimize our website and provide you with a smooth user experience.",
    cookie_decline: "Decline",
    cookie_accept: "Accept",
    toast_new: "New",
    toast_ago: "ago",
    toast_minutes: "minutes",
    toast_hour: "hour",
    toast_request: "request",
    toast_quote: "quote",
    nudge_close: "Close notification",
    nudge_bar_close: "Close bar",

    // Home Sections
    portfolio_label: "Our Portfolio",
    portfolio_title: "Recently completed projects",
    portfolio_all: "View all projects",
    types_label: "Project Types",
    types_title: "What kind of projects do we do?",
    types_discuss: "Discuss project",
    whyus_label: "Why Bouwvast?",
    whyus_title: "Reliable and transparent",
    whyus_sub:
      "Years of experience and a single point of contact for your renovation.",
    // Regions
    region_groot: "Major Cities Netherlands",
    region_kern: "Core Service Area",
    region_utrecht: "Utrecht Region",
    region_gooi: "Gooi & Eemland",
    region_gelderland: "Gelderland",

    // Page Specific
    city_hero_title: "Contractor in {city} — Bouwvast",
    city_hero_sub: "Reliable construction, renovation, and maintenance services in and around {city}.",
    city_services_eyebrow: "Services in {city}",
    city_services_title: "Our Work in {city}",
    city_seo_title: "Why choose Bouwvast in {city}?",
    city_seo_p1: "Do you live in {city} or have a commercial property here and are looking for a reliable contractor for your renovation, bathroom, painting or maintenance? Bouwvast offers a complete package of professional disciplines under one roof.",
    city_seo_p2: "With a single point of contact, clear agreements and craftsmen with years of experience, we guarantee that your project will run smoothly and to your full satisfaction.",
    city_faq_title: "Frequently Asked Questions about {city}",
    city_quote_title: "Quote in {city}",
    city_quote_sub: "Free price indication within 24 hours.",
    city_faq_1_q: "Does Bouwvast also operate in {city}?",
    city_faq_1_a: "Yes, {city} falls within our regular service area. We frequently handle renovations, painting, and maintenance projects here.",
    city_faq_2_q: "How quickly can you be on-site for an inspection?",
    city_faq_2_a: "For a non-binding inspection or urgent job in the region, we can usually visit you within a few working days.",
    city_faq_3_q: "Are the rates the same in all municipalities?",
    city_faq_3_a: "Yes, we apply transparent rates without unexpected call-out fees within our core working area.",
    city_faq_4_q: "Do I get a warranty on the work in my home?",
    city_faq_4_a: "Certainly, you receive a standard full quality warranty on all work performed and materials supplied.",
    
    service_hero_suffix: " in your region",
    service_includes_eyebrow: "What's included",
    service_includes_title: "Work that we provide",
    service_process_eyebrow: "Approach",
    service_process_title: "How we work",
    service_area_eyebrow: "Service Area",
    service_area_title: "{service} in your region",
    service_area_desc: "We are active in and around major cities. See what we can do for you in your hometown.",
    service_quote_title: "Free quote",
    service_quote_sub: "Request a price indication for {service} now.",
    service_related_eyebrow: "Explore more",
    service_related_title: "Other services by Bouwvast",
    
    area_direct_municipality: "Directly to your municipality",

    // Service Intros & Includes
    svc_renovation_intro: "From a single floor to a complete turn-key home renovation. We guide your remodel from demolition to handover with one fixed point of contact, clear scheduling and fixed prices.",
    svc_renovation_inc_1: "Complete home renovation and remodeling",
    svc_renovation_inc_2: "Load-bearing wall breakthroughs & steel beams",
    svc_renovation_inc_3: "Floor insulation, screeds & underfloor heating",
    svc_renovation_inc_4: "Ceilings, plastering and paint-ready finish",
    svc_renovation_inc_5: "Turn-key delivery including construction waste removal",

    svc_bathroom_intro: "Specialist in complete bathroom and kitchen renovations. From plumbing and waterproofing to large-format tiling and luxury sanitary installation.",
    svc_bathroom_inc_1: "Full bathroom renovation & walk-in shower",
    svc_bathroom_inc_2: "Milling pipes (water, drainage, electrics)",
    svc_bathroom_inc_3: "Large format tiling & precision leveling",
    svc_bathroom_inc_4: "Expert kitchen installation and connection",
    svc_bathroom_inc_5: "Anti-mold sanitary sealing with warranty",

    svc_finishing_intro: "Sleek plastering and complete finishing for renovation and new construction. Mirror-smooth paint-ready plastering, partition walls and suspended ceilings.",
    svc_finishing_inc_1: "Paint-ready plastering (mirror-smooth)",
    svc_finishing_inc_2: "Wallpaper-ready plastering & applying renovlies",
    svc_finishing_inc_3: "Metal-stud partition walls & insulation",
    svc_finishing_inc_4: "Plasterboard ceilings with recessed spotlights",
    svc_finishing_inc_5: "Sleek finishing of doorways and window frames",

    svc_painting_intro: "Professional interior and exterior painting with pro paint systems. Sleek walls, satin gloss lacquer on window frames and thorough wood rot repair.",
    svc_painting_inc_1: "Airless spraying & manual painting",
    svc_painting_inc_2: "Lacquering window frames, windows and interior doors",
    svc_painting_inc_3: "Exterior painting & facade treatment",
    svc_painting_inc_4: "Wood rot repair with 2-component epoxy",
    svc_painting_inc_5: "Benefit from 9% reduced VAT rate",

    svc_carpenter_intro: "Experienced carpenters for custom wood constructions, hanging interior doors, renewing window frames and dormer finishing.",
    svc_carpenter_inc_1: "Installing hardwood & plastic window frames",
    svc_carpenter_inc_2: "Hanging interior and exterior doors",
    svc_carpenter_inc_3: "Custom built-in wardrobes & cinewalls",
    svc_carpenter_inc_4: "Dormer and attic finishing",
    svc_carpenter_inc_5: "Installing wooden floors and skirting boards",

    svc_facade_intro: "Sustainable restoration and maintenance of your home's exterior shell. Pointing, masonry repairs, facade cleaning and exterior wall insulation.",
    svc_facade_inc_1: "Chipping out & renewing pointing",
    svc_facade_inc_2: "Restoring masonry & repairing cracks",
    svc_facade_inc_3: "Facade cleaning & impregnating",
    svc_facade_inc_4: "Renewing fascia boards and gutters",
    svc_facade_inc_5: "Exterior wall insulation and finishing",

    svc_assembly_intro: "Precise assembly work for homes and commercial premises. From cabinets and sliding walls to doors, lighting and furniture installation.",
    svc_assembly_inc_1: "Kitchen assembly & appliance installation",
    svc_assembly_inc_2: "Doors, sliding door systems & hardware",
    svc_assembly_inc_3: "Wall panels, acoustic panels & cinewalls",
    svc_assembly_inc_4: "Skylight (Velux) installation & finishing",
    svc_assembly_inc_5: "Precision miter cutting of skirting and molding",

    svc_plumber_intro: "Reliable plumbers for pipework during renovations, sanitary connections, underfloor heating and acute leaks.",
    svc_plumber_inc_1: "Rerouting water and drainage pipes",
    svc_plumber_inc_2: "Connecting walk-in shower drains & built-in taps",
    svc_plumber_inc_3: "Underfloor heating distributors & pipes",
    svc_plumber_inc_4: "Detecting leaks and resolving them immediately",
    svc_plumber_inc_5: "Replacing radiators & central heating adjustments",

    svc_maintenance_intro: "Maintenance and repair jobs for your home or real estate complex. Preventive, professional and with warranty.",
    svc_maintenance_inc_1: "Repairing moisture damage & plasterwork",
    svc_maintenance_inc_2: "Renewing door locks and hardware (SKG***)",
    svc_maintenance_inc_3: "Replacing damaged tiles or skirting boards",
    svc_maintenance_inc_4: "Maintenance services for homes and HOAs",
    svc_maintenance_inc_5: "Quickly on-site for emergency repairs",

    svc_general_intro: "Do you have a combination project or a specific remodeling job? We think along with you from the design phase to a broom-clean handover.",
    svc_general_inc_1: "Multidisciplinary renovations",
    svc_general_inc_2: "Personal building advice and on-site inspection",
    svc_general_inc_3: "Transparent calculation without hidden costs",
    svc_general_inc_4: "Fixed schedule with one building coordinator",
  },

  uk: {
    // Navigation
    nav_services: "Послуги",
    nav_projects: "Проєкти",
    nav_about: "Про нас",
    nav_area: "Регіон роботи",
    nav_kennisbank: "База знань",
    kb_page_title: "База знань",
    kb_page_sub:
      "Практичні поради, актуальні орієнтири цін та експертні матеріали про ремонт і будівництво.",
    nav_contact: "Контакти",
    nav_cta: "Замовити розрахунок",
    nav_business: "Для бізнесу",
    btn_next: "Наступний крок",
    btn_back: "Назад",
    btn_submit_request: "Надіслати запит",
    step_1_of_3: "Крок 1 з 3",
    step_2_of_3: "Крок 2 з 3",
    step_3_of_3: "Крок 3 з 3",
    step_1_of_2: "Крок 1 з 2",
    step_2_of_2: "Крок 2 з 2",
    badge_best_value: "Найпопулярніший",

    // Hero
    hero_label: "Професійні майстри та будівельники в Нідерландах",
    hero_title: "Будівництво, ремонт та оздоблення.",
    hero_title_accent: "Від ідеї до якісного результату.",
    hero_sub:
      "Професійні будівельні, ремонтні та оздоблювальні роботи для житла та бізнесу. Єдиний контакт, прозорий кошторис і гарантія на виконані роботи.",
    hero_cta_primary: "Отримати кошторис онлайн",
    hero_cta_secondary: "Наші послуги",
    hero_trust_1: "Швидка відповідь протягом 24 год",
    hero_trust_2: "Фіксована ціна заздалегідь",
    hero_trust_3: "Офіційна гарантія якості",

    // Nudges & Conversion triggers
    nudge_wa_online: "Зараз онлайн · відповідь < 15 хв",
    nudge_wa_bubble:
      "Є питання щодо ремонту чи вартості? Напишіть нам у WhatsApp з фото для швидкої оцінки 💬",
    nudge_wa_btn: "Написати у WhatsApp",
    nudge_bar_text:
      "Плануєте ремонт? Отримайте безкоштовний кошторис за 24 години.",
    nudge_bar_wa: "Фото у WhatsApp 💬",
    nudge_bar_quote: "Замовити кошторис ⚡",
    nudge_estimator_tip:
      "Порада: Надішліть фото вашого приміщення у WhatsApp для точної оцінки за 2 години!",

    // Stats
    stat_1_val: "25+",
    stat_1_lbl: "років досвіду",
    stat_2_val: "1.500+",
    stat_2_lbl: "завершених об'єктів",
    stat_3_val: "VCA",
    stat_3_lbl: "сертифікація",
    stat_4_val: "€55",
    stat_4_lbl: "ставка від €55/год з ПДВ",

    // Estimator
    est_eyebrow: "Швидкий розрахунок",
    est_title: "Розрахуйте орієнтовну вартість онлайн",
    est_sub: "Оберіть тип робіт та площу для миттєвої оцінки вартості ремонту.",
    est_step_1: "1. Оберіть тип робіт",
    est_step_2: "2. Площа / Обсяг",
    est_step_3: "3. Рівень якості матеріалів",
    est_tier_std: "Стандарт",
    est_tier_std_desc: "Надійна базова якість",
    est_tier_prem: "Преміум",
    est_tier_prem_desc: "Високоякісні європейські бренди",
    est_tier_lux: "Люкс / Дизайн",
    est_tier_lux_desc: "Ексклюзивне оздоблення",
    est_opt_demo: "Включити демонтаж та вивіз сміття",
    est_opt_mat: "Включити якісні будівельні матеріали",
    est_est_price: "Орієнтовна вартість:",
    est_apply_btn: "Замовити розрахунок за цією калькуляцією",
    est_disclaimer:
      "* Орієнтовний розрахунок з ПДВ. Точна ціна визначається після безкоштовного огляду на об'єкті.",

    // Services section & pages
    services_label: "Наші Напрямки",
    services_title: "Чим Bouwvast може вам допомогти?",
    services_sub:
      "Дізнайтеся більше про кожен напрямок, перелік робіт та прозорі цінові орієнтири.",
    services_all: "Усі послуги",
    more_info: "Детальніше про послугу →",

    // Service names & descriptions
    svc_renovation: "Комплексний Ремонт Житла",
    svc_renovation_desc:
      "Повний або частковий ремонт будинків та комерційних приміщень «під ключ».",
    svc_finishing: "Штукатурка та Оздоблення",
    svc_finishing_desc:
      "Ідеально гладка штукатурка під фарбування, гіпсокартонні перегородки та стелі.",
    svc_painting: "Малярні Роботи (Інтер'єр та Фасад)",
    svc_painting_desc:
      "Професійне безповітряне фарбування стін, лакування вікон та дверей зі зниженим ПДВ 9%.",
    svc_facade: "Фасадні та Мурувальні Роботи",
    svc_facade_desc:
      "Оновлення швів, ремонт цегляної кладки, гідрофобізація та утеплення фасадів.",
    svc_assembly: "Монтаж та Встановлення",
    svc_assembly_desc:
      "Точний монтаж кухонь, дверей, вбудованих шаф та інтер'єрних конструкцій.",
    svc_maintenance: "Обслуговування та Ремонт",
    svc_maintenance_desc:
      "Дрібні та великі ремонтні роботи, усунення вологи та плановий догляд за нерухомістю.",
    svc_bathroom: "Ванні Кімнати та Санвузли",
    svc_bathroom_desc:
      "Повна реновація ванних, душові зони, великоформатна плитка та сантехніка.",
    svc_carpenter: "Тесляр",
    svc_carpenter_desc:
      "Віконні та дверні коробки, навішування дверей, вбудовані шафи й оздоблення деревом.",
    svc_plumber: "Сантехнік",
    svc_plumber_desc:
      "Трубопроводи, підключення сантехніки, тепла підлога та усунення протікань.",
    svc_general: "Загальнобудівельні Роботи",
    svc_general_desc:
      "Мультидисциплінарні будівельні проєкти від планування до чистової здачі.",

    // Before/After
    ba_label: "Різниця",
    ba_title: "До і Після: Реальні трансформації",
    ba_sub:
      "Потягніть повзунок, щоб побачити приміщення до та після нашої роботи.",
    ba_before: "ДО",
    ba_after: "ПІСЛЯ",
    ba_hint: "Тягніть для порівняння",

    // Audience
    aud_label: "Для кого",
    aud_title: "Для приватних клієнтів та бізнес-партнерів",
    aud_sub:
      "Будь то ремонт квартири, оновлення санвузла чи потреба генпідрядника в надійних будівельних бригадах — Bouwvast до ваших послуг.",
    aud_part_title: "Приватні клієнти",
    aud_part_heading: "Для вашого дому та ремонту",
    aud_part_desc:
      "Від ремонту ванної кімнати до повної реновації будинку. Чесні кошториси та персональний контакт.",
    aud_b2b_title: "Бізнес та Партнери",
    aud_b2b_heading: "Для забудовників, ОСББ (VvE) та керуючих компаній",
    aud_b2b_desc:
      "Гнучке залучення кваліфікованих будівельних бригад на об'єкти будь-якого масштабу.",

    // How it works
    how_label: "Процес",
    how_title: "4 кроки до якісного ремонту",
    how_cta: "Замовити безкоштовний кошторис",
    how_1_title: "1. Онлайн-заявка",
    how_1_desc:
      "Опишіть завдання через форму або миттєво порахуйте орієнтовну вартість у калькуляторі.",
    how_2_title: "2. Огляд та Консультація",
    how_2_desc:
      "Узгоджуємо деталі та за потреби проводимо безкоштовний огляд об'єкта.",
    how_3_title: "3. Прозорий Кошторис",
    how_3_desc:
      "Ви отримуєте деталізовану комерційну пропозицію з фіксованими термінами та ціною.",
    how_4_title: "4. Якісне Виконання",
    how_4_desc:
      "Наші майстри виконують роботи за стандартами. Здача об'єкта — після вашого 100% схвалення.",

    // Reviews
    rev_label: "Відгуки клієнтів",
    rev_title: "Оцінка 4.9 / 5.0",
    rev_sub:
      "На основі понад 120 перевірених відгуків власників житла та бізнес-клієнтів по всій країні.",

    // Pricing
    price_label: "Тарифи",
    price_title: "Прозорі розцінки заздалегідь",
    price_sub:
      "У Bouwvast діють прозорі ціни без прихованих платежів чи непередбачених витрат.",

    // Founder Trust Card
    trust_card_label: "Майстерність та Надійність",
    trust_card_title: '"Будуємо на довірі та чітких домовленостях."',
    trust_card_desc:
      "У Bouwvast ми переконані, що ремонт має бути спокійним та комфортним. Ми поєднуємо багаторічний досвід, персональний контакт та прозорі ціни.",
    trust_badge_1: "VCA Сертифікація",
    trust_badge_2: "Гарантія на Роботи",
    trust_badge_3: "Фіксований Розрахунок",

    // Area & City Page
    area_page_title: "Зона робіт та Муніципалітети",
    area_page_sub:
      "Bouwvast працює по всьому центральному регіону та у великих містах Нідерландів.",
    area_places: "локацій",
    city_page_title: "Підрядник та Ремонт у м.",
    city_page_sub:
      "Професійний ремонт житла, санвузли, штукатурка та малярні роботи у",

    // Projects Page
    projects_label: "Наше Портфоліо",
    projects_title: "Нещодавно виконані об'єкти",
    projects_sub: "Добірка реалізованих проєктів та ремонтів у Нідерландах.",

    // About Page
    about_page_title: "Про компанію Bouwvast Нідерланди",
    about_page_sub:
      "Надійна майстерність, персональний контакт та офіційна гарантія на кожен проєкт.",

    // Business Page
    b2b_page_title: "Для Бізнесу та Партнерів",
    b2b_page_sub:
      "Ваш надійний генеральний підрядник для будівельних компаній, ОСББ (VvE) та керуючих організацій.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Часті запитання про ремонт",
    faq_1_q: "Чи включають ціни ПДВ?",
    faq_1_a: "Наш калькулятор показує орієнтовні ціни без ПДВ, оскільки багато приватних будинків (старше 2 років) мають право на знижену ставку ПДВ 9% на певні роботи. В офіційній пропозиції ми детально це розпишемо.",
    faq_1b_q: "Які саме роботи ви виконуєте?",
    faq_1b_a:
      "Ми виконуємо повний комплекс будівельних робіт: ремонт житла, санвузли, штукатурку, фарбування, столярні роботи, сантехніку, фасади та обслуговування.",
    faq_2_q: "Що робити, якщо під час ремонту виявляться приховані дефекти?",
    faq_2_a: "Прозорість - наш пріоритет. Якщо ми виявимо непередбачувані проблеми (наприклад, гниття деревини або протікання труб), ми негайно обговоримо це з вами. Ми запропонуємо рішення та ціну до того, як понесемо додаткові витрати. Ніяких сюрпризів.",
    faq_2b_q: "Чи працюєте ви з юридичними особами?",
    faq_2b_a:
      "Так, ми щодня співпрацюємо з приватними замовниками, будівельними компаніями, ОСББ (VvE) та управляючими організаціями.",
    faq_3_q: "У яких регіонах ви працюєте?",
    faq_3_a:
      "Працюємо по всій території Нідерландів, з фокусом на великих містах.",
    faq_4_q: "Чи зобов'язує мене до чогось запит кошторису?",
    faq_4_a:
      "Ні, розрахунок вартості та консультація є абсолютно безкоштовними і ні до чого вас не зобов'язують.",

    // Form & Modals
    form_title: "Замовте безкоштовний розрахунок",
    form_sub: "Чітка відповідь та кошторис протягом 24 годин.",
    form_name: "Ваше ім'я",
    form_phone: "Номер телефону",
    form_email: "Електронна пошта",
    form_city: "Місто / Поштовий індекс",
    form_type: "Категорія робіт",
    form_desc: "Опишіть ваш проєкт та особливості...",
    form_time: "Бажаний період початку",
    form_choose_time: "Оберіть період початку...",
    form_time_morning: "Якомога швидше / Терміново",
    form_time_afternoon: "Протягом 1 місяця",
    form_time_all_day: "Протягом 1-3 місяців",
    form_time_consultation: "Планування / Консультація",
    form_photos: "Додати фотографії",
    form_optional: "опціонально",
    form_photos_hint:
      "Завантажте до 5 фото (JPG, PNG, WebP) для швидкого та точного кошторису.",
    form_photos_selected: "Обрано {n} фото",
    form_required: "Оберіть послугу...",
    form_submit: "Надіслати запит →",
    form_privacy:
      "Ваші дані конфіденційні та використовуються виключно для складання пропозиції.",
    form_success_title: "Запит успішно надіслано!",
    form_success_sub:
      "Дякуємо! Наш будівельний консультант зв'яжеться з вами протягом 24 годин.",
    form_sending: "Надсилаємо…",
    form_error_title: "Заявку не вдалося надіслати",
    form_error_sub:
      "Ваша заявка до нас не дійшла. Дані залишилися заповненими — надішліть їх одразу через WhatsApp чи електронною поштою або зателефонуйте нам.",
    form_error_queued:
      "Ми спробуємо ще раз автоматично, щойно відновиться зʼєднання.",
    form_error_retry: "Спробувати ще раз",
    form_error_whatsapp: "Через WhatsApp",
    form_error_email: "Електронною поштою",
    form_error_call: "Зателефонувати",
    form_error_subject: "Запит на кошторис",
    form_photos_too_big:
      "Фотографії разом завеликі, щоб надіслати їх із заявкою. Саму заявку надіслано — надішліть фото через WhatsApp або поштою.",

    // Wizard Modal steps
    wizard_step_1_title: "1. Чим ми можемо вам допомогти?",
    wizard_step_2_title: "2. Опишіть завдання або ремонт",
    wizard_step_3_title: "3. Контактні дані для кошторису",
    wizard_next: "Наступний крок →",
    wizard_back: "← Назад",
    wizard_modal_title: "Замовити Кошторис",

    // CTA
    cta_title: "Готові розпочати ремонт?",
    cta_sub:
      "Замовте розрахунок вартості вже сьогодні або зателефонуйте нашим спеціалістам.",
    cta_btn: "Отримати пропозицію",

    // Footer
    footer_desc:
      "Надійна будівельно-ремонтна платформа Нідерландів. Майстерність, прозорі ціни та чітка комунікація для кожного проєкту.",
    footer_info: "Інформація",
    footer_services: "Послуги",
    footer_cities: "Великі Міста",
    footer_privacy: "Політика конфіденційності",
    footer_terms: "Умови надання послуг",
    footer_partner: "Стати партнером",
    footer_rights: "Усі права захищено.",

    // Global / UI
    skip_link: "Перейти до основного контенту",
    nav_call: "Зателефонувати",
    close: "Закрити",
    cookie_title: "Файли cookie та конфіденційність",
    cookie_desc:
      "Ми використовуємо файли cookie для оптимізації роботи сайту та забезпечення зручності користування.",
    cookie_decline: "Відхилити",
    cookie_accept: "Прийняти",
    toast_new: "Новий",
    toast_ago: "тому",
    toast_minutes: "хвилин",
    toast_hour: "година",
    toast_request: "запит",
    toast_quote: "кошторис",
    nudge_close: "Закрити сповіщення",
    nudge_bar_close: "Закрити панель",

    // Home Sections
    portfolio_label: "Наше Портфоліо",
    portfolio_title: "Нещодавно виконані об'єкти",
    portfolio_all: "Всі проєкти",
    types_label: "Типи проєктів",
    types_title: "Які проєкти ми виконуємо?",
    types_discuss: "Обговорити проєкт",
    whyus_label: "Чому Bouwvast?",
    whyus_title: "Надійно та прозоро",
    whyus_sub: "Багаторічний досвід та єдиний контакт для вашого ремонту.",
    // Regions
    region_groot: "Великі міста Нідерландів",
    region_kern: "Основна зона обслуговування",
    region_utrecht: "Регіон Утрехт",
    region_gooi: "Гой та Емланд",
    region_gelderland: "Гелдерланд",

    // Page Specific
    city_hero_title: "Підрядник у {city} — Bouwvast",
    city_hero_sub: "Надійні будівельні, ремонтні та сервісні роботи в {city} та околицях.",
    city_services_eyebrow: "Послуги в {city}",
    city_services_title: "Наші роботи в {city}",
    city_seo_title: "Чому обирають Bouwvast у {city}?",
    city_seo_p1: "Ви живете в {city} або маєте тут комерційну нерухомість і шукаєте надійного підрядника для ремонту, санвузла, малярних робіт чи обслуговування? Bouwvast пропонує повний комплекс професійних послуг під одним дахом.",
    city_seo_p2: "З єдиним контактним центром, чіткими домовленостями та майстрами з багаторічним досвідом ми гарантуємо, що ваш проєкт пройде гладко та з максимальним результатом.",
    city_faq_title: "Часті запитання про {city}",
    city_quote_title: "Кошторис у {city}",
    city_quote_sub: "Безкоштовна оцінка вартості протягом 24 годин.",
    city_faq_1_q: "Чи працює Bouwvast також у {city}?",
    city_faq_1_a: "Так, {city} входить до нашої постійної зони обслуговування. Ми регулярно виконуємо тут ремонти, малярні роботи та обслуговування.",
    city_faq_2_q: "Як швидко ви можете приїхати для огляду?",
    city_faq_2_a: "Для безкоштовного огляду або термінового замовлення в регіоні ми зазвичай можемо приїхати до вас протягом кількох робочих днів.",
    city_faq_3_q: "Чи однакові тарифи в усіх муніципалітетах?",
    city_faq_3_a: "Так, ми застосовуємо прозорі тарифи без непередбачуваних витрат на виїзд у межах нашої основної зони роботи.",
    city_faq_4_q: "Чи отримую я гарантію на роботи в моєму будинку?",
    city_faq_4_a: "Звісно, ви отримуєте стандартну повну гарантію якості на всі виконані роботи та надані матеріали.",
    
    service_hero_suffix: " у вашому регіоні",
    service_includes_eyebrow: "Що сюди входить",
    service_includes_title: "Роботи, які ми виконуємо",
    service_process_eyebrow: "Підхід",
    service_process_title: "Як ми працюємо",
    service_area_eyebrow: "Зона робіт",
    service_area_title: "{service} у вашому регіоні",
    service_area_desc: "Ми працюємо у великих містах та їхніх околицях. Подивіться, що ми можемо зробити для вас у вашому місті.",
    service_quote_title: "Безкоштовний кошторис",
    service_quote_sub: "Замовте орієнтовний розрахунок вартості на послугу {service} прямо зараз.",
    service_related_eyebrow: "Дізнатися більше",
    service_related_title: "Інші послуги від Bouwvast",
    
    area_direct_municipality: "Перейти до вашого муніципалітету",

    // Service Intros & Includes
    svc_renovation_intro: "Від однієї кімнати до повної реконструкції будинку «під ключ». Ми супроводжуємо ваш ремонт від демонтажу до здачі з єдиним контактом, чітким графіком та фіксованими цінами.",
    svc_renovation_inc_1: "Комплексний ремонт будинку та перепланування",
    svc_renovation_inc_2: "Демонтаж несучих стін та сталеві балки",
    svc_renovation_inc_3: "Ізоляція підлоги, стяжка та тепла підлога",
    svc_renovation_inc_4: "Стелі, штукатурка та чистове оздоблення",
    svc_renovation_inc_5: "Здача «під ключ», включаючи вивіз будівельного сміття",

    svc_bathroom_intro: "Спеціаліст з комплексного ремонту ванних кімнат та кухонь. Від прокладання труб та гідроізоляції до укладання великоформатної плитки та монтажу елітної сантехніки.",
    svc_bathroom_inc_1: "Повний ремонт ванної кімнати та душові кабіни",
    svc_bathroom_inc_2: "Штроблення труб (вода, каналізація, електрика)",
    svc_bathroom_inc_3: "Укладання великоформатної плитки та точне вирівнювання",
    svc_bathroom_inc_4: "Професійний монтаж та підключення кухонь",
    svc_bathroom_inc_5: "Антигрибкова герметизація сантехніки з гарантією",

    svc_finishing_intro: "Гладка штукатурка та повне оздоблення для ремонту та новобудов. Дзеркально-гладка штукатурка під фарбування, перегородки та підвісні стелі.",
    svc_finishing_inc_1: "Штукатурка під фарбування (дзеркально гладка)",
    svc_finishing_inc_2: "Штукатурка під шпалери та поклейка склополотна",
    svc_finishing_inc_3: "Гіпсокартонні перегородки на металевому профілі та ізоляція",
    svc_finishing_inc_4: "Гіпсокартонні стелі з вбудованими світильниками",
    svc_finishing_inc_5: "Чистове оздоблення дверних та віконних отворів",

    svc_painting_intro: "Професійне внутрішнє та зовнішнє фарбування професійними системами. Гладкі стіни, сатиновий лак на віконних рамах та ретельне усунення гниття деревини.",
    svc_painting_inc_1: "Безповітряне фарбування та ручне фарбування стін",
    svc_painting_inc_2: "Лакування віконних рам, вікон та міжкімнатних дверей",
    svc_painting_inc_3: "Зовнішнє фарбування та обробка фасадів",
    svc_painting_inc_4: "Відновлення гнилої деревини двокомпонентною епоксидною смолою",
    svc_painting_inc_5: "Скористайтеся зниженою ставкою ПДВ 9%",

    svc_carpenter_intro: "Досвідчені теслярі для виготовлення дерев'яних конструкцій на замовлення, навішування міжкімнатних дверей, заміни віконних рам та оздоблення мансард.",
    svc_carpenter_inc_1: "Встановлення дерев'яних та пластикових віконних рам",
    svc_carpenter_inc_2: "Навішування міжкімнатних та вхідних дверей",
    svc_carpenter_inc_3: "Вбудовані шафи на замовлення та кіностіни",
    svc_carpenter_inc_4: "Оздоблення мансардних вікон та горищ",
    svc_carpenter_inc_5: "Монтаж дерев'яних підлог та плінтусів",

    svc_facade_intro: "Екологічне відновлення та обслуговування зовнішньої оболонки вашого будинку. Розшивка швів, ремонт цегляної кладки, очищення фасадів та зовнішнє утеплення.",
    svc_facade_inc_1: "Вибивання та оновлення швів",
    svc_facade_inc_2: "Відновлення цегляної кладки та ремонт тріщин",
    svc_facade_inc_3: "Очищення та просочення фасадів",
    svc_facade_inc_4: "Оновлення вітрових дощок та водостоків",
    svc_facade_inc_5: "Зовнішнє утеплення стін та оздоблення",

    svc_assembly_intro: "Точні монтажні роботи для житлових та комерційних приміщень. Від шаф та розсувних стінок до дверей, освітлення та встановлення меблів.",
    svc_assembly_inc_1: "Монтаж кухонь та встановлення техніки",
    svc_assembly_inc_2: "Двері, розсувні системи та фурнітура",
    svc_assembly_inc_3: "Стінові панелі, акустичні панелі та кіностіни",
    svc_assembly_inc_4: "Монтаж мансардних вікон (Velux) та оздоблення",
    svc_assembly_inc_5: "Точне різання плінтусів та молдингів під кутом",

    svc_plumber_intro: "Надійні сантехніки для прокладання труб під час ремонту, підключення сантехніки, теплої підлоги та усунення гострих протікань.",
    svc_plumber_inc_1: "Перенесення водопровідних та каналізаційних труб",
    svc_plumber_inc_2: "Підключення душових трапів та вбудованих змішувачів",
    svc_plumber_inc_3: "Розподільники та труби теплої підлоги",
    svc_plumber_inc_4: "Виявлення протікань та їх негайне усунення",
    svc_plumber_inc_5: "Заміна радіаторів та налаштування центрального опалення",

    svc_maintenance_intro: "Роботи з технічного обслуговування та ремонту вашого будинку або комплексу нерухомості. Профілактично, професійно та з гарантією.",
    svc_maintenance_inc_1: "Усунення пошкоджень від вологи та штукатурення",
    svc_maintenance_inc_2: "Заміна дверних замків та фурнітури (SKG***)",
    svc_maintenance_inc_3: "Заміна пошкодженої плитки або плінтусів",
    svc_maintenance_inc_4: "Послуги з обслуговування для будинків та ОСББ",
    svc_maintenance_inc_5: "Швидкий виїзд на місце для аварійного ремонту",

    svc_general_intro: "У вас комбінований проєкт чи специфічна робота з реконструкції? Ми думаємо разом з вами від етапу проєктування до здачі об'єкта в чистоті.",
    svc_general_inc_1: "Мультидисциплінарні реконструкції",
    svc_general_inc_2: "Особисті будівельні консультації та огляд на місці",
    svc_general_inc_3: "Прозорий розрахунок без прихованих витрат",
    svc_general_inc_4: "Фіксований графік з одним координатором робіт",
  },

  ru: {
    // Navigation
    nav_services: "Услуги",
    nav_projects: "Проекты",
    nav_about: "О нас",
    nav_area: "Зона работ",
    nav_kennisbank: "База знаний",
    kb_page_title: "База знаний",
    kb_page_sub:
      "Практические руководства, актуальные ориентировочные цены и профессиональные советы по ремонту и строительству.",
    nav_contact: "Контакты",
    nav_cta: "Запросить смету",
    nav_business: "Для бизнеса",
    btn_next: "Следующий шаг",
    btn_back: "Назад",
    btn_submit_request: "Отправить заявку",
    step_1_of_3: "Шаг 1 из 3",
    step_2_of_3: "Шаг 2 из 3",
    step_3_of_3: "Шаг 3 из 3",
    step_1_of_2: "Шаг 1 из 2",
    step_2_of_2: "Шаг 2 из 2",
    badge_best_value: "Наиболее популярный",

    // Hero
    hero_label: "Мастера и Подрядчики в Нидерландах",
    hero_title: "Строительство, ремонт и отделка.",
    hero_title_accent: "От идеи к безупречному результату.",
    hero_sub:
      "Профессиональные строительные, ремонтные и отделочные работы для дома и бизнеса. Единый контакт, прозрачные расчеты и гарантия качества.",
    hero_cta_primary: "Рассчитать смету онлайн",
    hero_cta_secondary: "Посмотреть услуги",
    hero_trust_1: "Быстрый ответ в течение 24ч",
    hero_trust_2: "Фиксированная цена заранее",
    hero_trust_3: "Официальная гарантия",

    // Nudges & Conversion triggers
    nudge_wa_online: "Сейчас онлайн · ответ < 15 мин",
    nudge_wa_bubble:
      "Есть вопросы по ремонту или смете? Напишите нам в WhatsApp с фото для быстрой оценки 💬",
    nudge_wa_btn: "Написать в WhatsApp",
    nudge_bar_text: "Планируете ремонт? Получите бесплатную смету за 24 часа.",
    nudge_bar_wa: "Фото в WhatsApp 💬",
    nudge_bar_quote: "Запросить смету ⚡",
    nudge_estimator_tip:
      "Совет: Отправьте фото вашего помещения в WhatsApp для точной оценки за 2 часа!",

    // Stats
    stat_1_val: "25+",
    stat_1_lbl: "лет опыта",
    stat_2_val: "1.500+",
    stat_2_lbl: "завершенных проектов",
    stat_3_val: "VCA",
    stat_3_lbl: "сертификация",
    stat_4_val: "€55",
    stat_4_lbl: "ставка от €55/час с НДС",

    // Estimator
    est_eyebrow: "Быстрый расчет",
    est_title: "Рассчитайте ориентировочную стоимость онлайн",
    est_sub:
      "Выберите тип работ и площадь для мгновенной оценки стоимости проекта.",
    est_step_1: "1. Выберите тип работ",
    est_step_2: "2. Площадь / Объем",
    est_step_3: "3. Качество материалов",
    est_tier_std: "Стандарт",
    est_tier_std_desc: "Надежное базовое качество",
    est_tier_prem: "Премиум",
    est_tier_prem_desc: "Высококачественные европейские бренды",
    est_tier_lux: "Люкс / Дизайн",
    est_tier_lux_desc: "Эксклюзивная отделка",
    est_opt_demo: "Включить демонтаж и вывоз мусора",
    est_opt_mat: "Включить качественные материалы",
    est_est_price: "Ориентировочная стоимость:",
    est_apply_btn: "Запросить смету по этому расчету",
    est_disclaimer:
      "* Ориентировочный расчет с НДС. Точная стоимость определяется после бесплатного выезда на объект.",

    // Services section & pages
    services_label: "Наши Направления",
    services_title: "Чем Bouwvast может вам помочь?",
    services_sub:
      "Узнайте больше о каждом направлении, перечне работ и прозрачных ценах.",
    services_all: "Все услуги",
    more_info: "Подробнее об услуге →",

    // Service names & descriptions
    svc_renovation: "Комплексный Ремонт Жилья",
    svc_renovation_desc:
      "Полный или частичный ремонт домов и коммерческих помещений «под ключ».",
    svc_finishing: "Штукатурка и Отделка",
    svc_finishing_desc:
      "Идеально гладкая штукатурка под покраску, перегородки из гипсокартона и потолки.",
    svc_painting: "Малярные Работы (Интерьер и Фасад)",
    svc_painting_desc:
      "Профессиональная безвоздушная покраска стен, лакировка окон и дверей со сниженным НДС 9%.",
    svc_facade: "Фасадные и Каменные Работы",
    svc_facade_desc:
      "Обновление швов, ремонт кирпичной кладки, гидрофобизация и утепление фасадов.",
    svc_assembly: "Монтаж и Установка",
    svc_assembly_desc:
      "Точная установка кухонь, дверей, встроенных шкафов и элементов интерьера.",
    svc_maintenance: "Обслуживание и Ремонт",
    svc_maintenance_desc:
      "Мелкий и крупный ремонт, устранение сырости и плановое обслуживание недвижимости.",
    svc_bathroom: "Ванные Комнаты и Санузлы",
    svc_bathroom_desc:
      "Полный ремонт ванных, душевые трапы, крупноформатная плитка и монтаж сантехники.",
    svc_carpenter: "Плотник",
    svc_carpenter_desc:
      "Оконные и дверные коробки, навеска дверей, встроенные шкафы и столярная отделка.",
    svc_plumber: "Сантехник",
    svc_plumber_desc:
      "Трубопроводы, подключение сантехники, тёплый пол и устранение протечек.",
    svc_general: "Общестроительные Работы",
    svc_general_desc:
      "Мультидисциплинарные строительные проекты от проектирования до чистовой сдачи.",

    // Before/After
    ba_label: "Разница",
    ba_title: "До и После: Реальные превращения",
    ba_sub:
      "Потяните ползунок, чтобы увидеть пространство до и после наших работ.",
    ba_before: "ДО",
    ba_after: "ПОСЛЕ",
    ba_hint: "Тяните для сравнения",

    // Audience
    aud_label: "Для кого",
    aud_title: "Для частных клиентов и партнеров",
    aud_sub:
      "Будь то ремонт квартиры, ванной или потребность генподрядчика в надежных бригадах — Bouwvast готов помочь.",
    aud_part_title: "Частные клиенты",
    aud_part_heading: "Для вашего дома и ремонта",
    aud_part_desc:
      "От ремонта санузла до полной реновации дома. Честные сметы и персональный менеджер.",
    aud_b2b_title: "Бизнес и Партнеры",
    aud_b2b_heading: "Для застройщиков, ТСЖ (VvE) и управляющих компаний",
    aud_b2b_desc:
      "Гибкое предоставление опытных строительных бригад на объекты любого масштаба.",

    // How it works
    how_label: "Процесс",
    how_title: "4 шага к качественному ремонту",
    how_cta: "Запросить бесплатную смету",
    how_1_title: "1. Онлайн-заявка",
    how_1_desc:
      "Опишите задачу через форму или мгновенно рассчитайте примерную стоимость в калькуляторе.",
    how_2_title: "2. Осмотр и Консультация",
    how_2_desc:
      "Обсуждаем детали и при необходимости проводим бесплатный осмотр на объекте.",
    how_3_title: "3. Прозрачная Смета",
    how_3_desc:
      "Вы получаете детализированное предложение с фиксированными сроками и стоимостью.",
    how_4_title: "4. Качественная Сдача",
    how_4_desc:
      "Наши мастера аккуратно выполняют работу. Сдача объекта происходит после вашего полного одобрения.",

    // Reviews
    rev_label: "Отзывы клиентов",
    rev_title: "Рейтинг 4.9 / 5.0",
    rev_sub:
      "На основе более 120 проверенных отзывов владельцев жилья и бизнес-клиентов по всей стране.",

    // Pricing
    price_label: "Тарифы",
    price_title: "Прозрачные расценки заранее",
    price_sub:
      "В Bouwvast действуют прозрачные цены без скрытых платежей и непредвиденных доплат.",

    // Founder Trust Card
    trust_card_label: "Мастерство и Надежность",
    trust_card_title: '"Строим на доверии и четких договоренностях."',
    trust_card_desc:
      "В Bouwvast мы убеждены, что ремонт должен проходить спокойно и комфортно. Мы объединяем многолетний опыт, единого менеджера и прозрачные расчеты.",
    trust_badge_1: "VCA Сертификация",
    trust_badge_2: "Гарантия на Работы",
    trust_badge_3: "Фиксированный Расчет",

    // Area & City Page
    area_page_title: "Зона обслуживания и Города",
    area_page_sub:
      "Bouwvast работает по всем Нидерландам и во всех крупных городах.",
    area_places: "городов",
    city_page_title: "Подрядчик и Ремонт в г.",
    city_page_sub:
      "Профессиональный ремонт квартир, санузлы, штукатурка и покраска в",

    // Projects Page
    projects_label: "Наше Портфолио",
    projects_title: "Недавно сданные объекты",
    projects_sub: "Подборка реализованных проектов и ремонтов в Нидерландах.",

    // About Page
    about_page_title: "О компании Bouwvast Нидерланды",
    about_page_sub:
      "Надежное мастерство, единый менеджер и гарантия на каждый проект.",

    // Business Page
    b2b_page_title: "Для Бизнеса и Партнеров",
    b2b_page_sub:
      "Ваш надежный генеральный подрядчик для строителей, шоурумов и ТСЖ (VvE).",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Частые вопросы о ремонте",
    faq_1_q: "Включен ли НДС в цены?",
    faq_1_a: "Наш калькулятор показывает ориентировочные цены без НДС, так как многие частные дома (старше 2 лет) имеют право на сниженную ставку НДС 9% на определенные работы. В официальном предложении мы детально это распишем.",
    faq_1b_q: "Какие виды работ вы выполняете?",
    faq_1b_a:
      "Мы выполняем полный комплекс: ремонт жилья, санузлы, штукатурку, покраску, столярные работы, сантехнику, фасады и обслуживание.",
    faq_2_q: "Что делать, если во время ремонта обнаружатся скрытые дефекты?",
    faq_2_a: "Прозрачность - наш приоритет. Если мы обнаружим непредвиденные проблемы (например, гниение древесины или протечки труб), мы немедленно обсудим это с вами. Мы предложим решение и цену до того, как понесем дополнительные расходы. Никаких сюрпризов.",
    faq_2b_q: "Работаете ли вы с компаниями?",
    faq_2b_a:
      "Да, мы ежедневно сотрудничаем с частными клиентами, генподрядчиками, ТСЖ (VvE) и управляющими компаниями.",
    faq_3_q: "В каких регионах вы работаете?",
    faq_3_a: "Работаем по всем Нидерландам с фокусом на крупных городах.",
    faq_4_q: "Обязывает ли меня к чему-то расчет сметы?",
    faq_4_a:
      "Нет, расчет стоимости и консультация абсолютно бесплатны и ни к чему не обязывают.",

    // Form & Modals
    form_title: "Запросите бесплатную смету",
    form_sub: "Четкий ответ и расчет стоимости в течение 24 часов.",
    form_name: "Ваше имя",
    form_phone: "Номер телефона",
    form_email: "Электронная почта",
    form_city: "Город / Индекс",
    form_type: "Категория работ",
    form_desc: "Опишите ваш проект и пожелания...",
    form_time: "Желаемый период начала",
    form_choose_time: "Выберите период начала...",
    form_time_morning: "Как можно скорее / Срочно",
    form_time_afternoon: "В течение 1 месяца",
    form_time_all_day: "В течение 1-3 месяцев",
    form_time_consultation: "Планирование / Консультация",
    form_photos: "Добавить фото",
    form_optional: "опционально",
    form_photos_hint:
      "Загрузите до 5 фото (JPG, PNG, WebP) для быстрого и точного расчета сметы.",
    form_photos_selected: "Выбрано {n} фото",
    form_required: "Выберите услугу...",
    form_submit: "Отправить заявку →",
    form_privacy:
      "Ваши данные строго конфиденциальны и используются только для составления сметы.",
    form_success_title: "Заявка успешно принята!",
    form_success_sub:
      "Спасибо! Наш специалист свяжется с вами в течение 24 часов.",
    form_sending: "Отправляем…",
    form_error_title: "Заявку не удалось отправить",
    form_error_sub:
      "Ваша заявка до нас не дошла. Данные остались заполненными — отправьте их сразу через WhatsApp или по электронной почте либо позвоните нам.",
    form_error_queued:
      "Мы попробуем ещё раз автоматически, как только связь восстановится.",
    form_error_retry: "Попробовать ещё раз",
    form_error_whatsapp: "Через WhatsApp",
    form_error_email: "По электронной почте",
    form_error_call: "Позвонить",
    form_error_subject: "Запрос сметы",
    form_photos_too_big:
      "Фотографии вместе слишком большие, чтобы отправить их с заявкой. Сама заявка отправлена — пришлите фото через WhatsApp или по почте.",

    // Wizard Modal steps
    wizard_step_1_title: "1. Чем мы можем вам помочь?",
    wizard_step_2_title: "2. Опишите проект или ремонт",
    wizard_step_3_title: "3. Контактные данные для сметы",
    wizard_next: "Следующий шаг →",
    wizard_back: "← Назад",
    wizard_modal_title: "Запросить Смету",

    // CTA
    cta_title: "Готовы начать ремонт?",
    cta_sub:
      "Запросите бесплатную смету прямо сейчас или позвоните нашим специалистам.",
    cta_btn: "Получить смету",

    // Footer
    footer_desc:
      "Надежная строительно-ремонтная платформа Нидерландов. Мастерство, прозрачные цены и четкая коммуникация для каждого проекта.",
    footer_info: "Информация",
    footer_services: "Услуги",
    footer_cities: "Крупные Города",
    footer_privacy: "Политика конфиденциальности",
    footer_terms: "Условия использования",
    footer_partner: "Стать партнером",
    footer_rights: "Все права защищены.",

    // Global / UI
    skip_link: "Перейти к основному контенту",
    nav_call: "Позвонить",
    close: "Закрыть",
    cookie_title: "Файлы cookie и конфиденциальность",
    cookie_desc:
      "Мы используем файлы cookie для оптимизации работы сайта и обеспечения удобства использования.",
    cookie_decline: "Отклонить",
    cookie_accept: "Принять",
    toast_new: "Новый",
    toast_ago: "назад",
    toast_minutes: "минут",
    toast_hour: "час",
    toast_request: "запрос",
    toast_quote: "смета",
    nudge_close: "Закрыть уведомление",
    nudge_bar_close: "Закрыть панель",

    // Home Sections
    portfolio_label: "Наше Портфолио",
    portfolio_title: "Недавно завершенные проекты",
    portfolio_all: "Все проекты",
    types_label: "Типы проектов",
    types_title: "Какие проекты мы выполняем?",
    types_discuss: "Обсудить проект",
    whyus_label: "Почему Bouwvast?",
    whyus_title: "Надежно и прозрачно",
    whyus_sub: "Многолетний опыт и единый контакт для вашего ремонта.",
    // Regions
    region_groot: "Крупные города Нидерландов",
    region_kern: "Основная зона обслуживания",
    region_utrecht: "Регион Утрехт",
    region_gooi: "Гой и Эмланд",
    region_gelderland: "Гелдерланд",

    // Page Specific
    city_hero_title: "Подрядчик в г. {city} — Bouwvast",
    city_hero_sub: "Надежные строительные, ремонтные и сервисные работы в {city} и окрестностях.",
    city_services_eyebrow: "Услуги в г. {city}",
    city_services_title: "Наши работы в г. {city}",
    city_seo_title: "Почему выбирают Bouwvast в г. {city}?",
    city_seo_p1: "Вы живете в г. {city} или у вас здесь коммерческая недвижимость, и вы ищете надежного подрядчика для ремонта, санузла, малярных работ или обслуживания? Bouwvast предлагает полный комплекс профессиональных услуг под одной крышей.",
    city_seo_p2: "С единым контактным лицом, четкими договоренностями и мастерами с многолетним опытом мы гарантируем, что ваш проект пройдет гладко и с максимальным результатом.",
    city_faq_title: "Частые вопросы о г. {city}",
    city_quote_title: "Смета в г. {city}",
    city_quote_sub: "Бесплатная оценка стоимости в течение 24 часов.",
    city_faq_1_q: "Работает ли Bouwvast также в г. {city}?",
    city_faq_1_a: "Да, {city} входит в нашу постоянную зону обслуживания. Мы регулярно выполняем здесь ремонты, малярные работы и обслуживание.",
    city_faq_2_q: "Как быстро вы можете приехать для осмотра?",
    city_faq_2_a: "Для бесплатного осмотра или срочного заказа в регионе мы обычно можем приехать к вам в течение нескольких рабочих дней.",
    city_faq_3_q: "Одинаковы ли тарифы во всех муниципалитетах?",
    city_faq_3_a: "Да, мы применяем прозрачные тарифы без непредвиденных расходов на выезд в пределах нашей основной зоны работы.",
    city_faq_4_q: "Получаю ли я гарантию на работы в моем доме?",
    city_faq_4_a: "Конечно, вы получаете стандартную полную гарантию качества на все выполненные работы и предоставленные материалы.",
    
    service_hero_suffix: " в вашем регионе",
    service_includes_eyebrow: "Что сюда входит",
    service_includes_title: "Работы, которые мы выполняем",
    service_process_eyebrow: "Подход",
    service_process_title: "Как мы работаем",
    service_area_eyebrow: "Зона работ",
    service_area_title: "{service} в вашем регионе",
    service_area_desc: "Мы работаем в крупных городах и их окрестностях. Посмотрите, что мы можем сделать для вас в вашем городе.",
    service_quote_title: "Бесплатная смета",
    service_quote_sub: "Запросите ориентировочный расчет стоимости на услугу {service} прямо сейчас.",
    service_related_eyebrow: "Узнать больше",
    service_related_title: "Другие услуги от Bouwvast",
    
    area_direct_municipality: "Перейти к вашему муниципалитету",

    // Service Intros & Includes
    svc_renovation_intro: "От одной комнаты до полной реконструкции дома «под ключ». Мы сопровождаем ваш ремонт от демонтажа до сдачи с единым контактным лицом, четким графиком и фиксированными ценами.",
    svc_renovation_inc_1: "Комплексный ремонт дома и перепланировка",
    svc_renovation_inc_2: "Демонтаж несущих стен и стальные балки",
    svc_renovation_inc_3: "Изоляция пола, стяжка и теплый пол",
    svc_renovation_inc_4: "Потолки, штукатурка и чистовая отделка",
    svc_renovation_inc_5: "Сдача «под ключ», включая вывоз строительного мусора",

    svc_bathroom_intro: "Специалист по комплексному ремонту ванных комнат и кухонь. От прокладки труб и гидроизоляции до укладки крупноформатной плитки и монтажа элитной сантехники.",
    svc_bathroom_inc_1: "Полный ремонт ванной комнаты и душевые кабины",
    svc_bathroom_inc_2: "Штробление труб (вода, канализация, электрика)",
    svc_bathroom_inc_3: "Укладка крупноформатной плитки и точное выравнивание",
    svc_bathroom_inc_4: "Профессиональный монтаж и подключение кухонь",
    svc_bathroom_inc_5: "Антигрибковая герметизация сантехники с гарантией",

    svc_finishing_intro: "Гладкая штукатурка и полная отделка для ремонта и новостроек. Зеркально-гладкая штукатурка под покраску, перегородки и подвесные потолки.",
    svc_finishing_inc_1: "Штукатурка под покраску (зеркально гладкая)",
    svc_finishing_inc_2: "Штукатурка под обои и поклейка стеклохолста",
    svc_finishing_inc_3: "Гипсокартонные перегородки на металлическом профиле и изоляция",
    svc_finishing_inc_4: "Гипсокартонные потолки со встроенными светильниками",
    svc_finishing_inc_5: "Чистовая отделка дверных и оконных проемов",

    svc_painting_intro: "Профессиональная внутренняя и наружная покраска профессиональными системами. Гладкие стены, сатиновый лак на оконных рамах и тщательное устранение гниения древесины.",
    svc_painting_inc_1: "Безвоздушная покраска и ручная покраска стен",
    svc_painting_inc_2: "Лакировка оконных рам, окон и межкомнатных дверей",
    svc_painting_inc_3: "Наружная покраска и обработка фасадов",
    svc_painting_inc_4: "Восстановление сгнившей древесины двухкомпонентной эпоксидной смолой",
    svc_painting_inc_5: "Воспользуйтесь сниженной ставкой НДС 9%",

    svc_carpenter_intro: "Опытные плотники для изготовления деревянных конструкций на заказ, навешивания межкомнатных дверей, замены оконных рам и отделки мансард.",
    svc_carpenter_inc_1: "Установка деревянных и пластиковых оконных рам",
    svc_carpenter_inc_2: "Навешивание межкомнатных и входных дверей",
    svc_carpenter_inc_3: "Встроенные шкафы на заказ и киностены",
    svc_carpenter_inc_4: "Отделка мансардных окон и чердаков",
    svc_carpenter_inc_5: "Монтаж деревянных полов и плинтусов",

    svc_facade_intro: "Экологичное восстановление и обслуживание внешней оболочки вашего дома. Расшивка швов, ремонт кирпичной кладки, очистка фасадов и наружное утепление.",
    svc_facade_inc_1: "Выбивание и обновление швов",
    svc_facade_inc_2: "Восстановление кирпичной кладки и ремонт трещин",
    svc_facade_inc_3: "Очистка и пропитка фасадов",
    svc_facade_inc_4: "Обновление ветровых досок и водостоков",
    svc_facade_inc_5: "Наружное утепление стен и отделка",

    svc_assembly_intro: "Точные монтажные работы для жилых и коммерческих помещений. От шкафов и раздвижных стенок до дверей, освещения и установки мебели.",
    svc_assembly_inc_1: "Монтаж кухонь и установка техники",
    svc_assembly_inc_2: "Двери, раздвижные системы и фурнитура",
    svc_assembly_inc_3: "Стеновые панели, акустические панели и киностены",
    svc_assembly_inc_4: "Монтаж мансардных окон (Velux) и отделка",
    svc_assembly_inc_5: "Точная резка плинтусов и молдингов под углом",

    svc_plumber_intro: "Надежные сантехники для прокладки труб во время ремонта, подключения сантехники, теплого пола и устранения острых протечек.",
    svc_plumber_inc_1: "Перенос водопроводных и канализационных труб",
    svc_plumber_inc_2: "Подключение душевых трапов и встроенных смесителей",
    svc_plumber_inc_3: "Распределители и трубы теплого пола",
    svc_plumber_inc_4: "Обнаружение протечек и их немедленное устранение",
    svc_plumber_inc_5: "Замена радиаторов и настройка центрального отопления",

    svc_maintenance_intro: "Работы по техническому обслуживанию и ремонту вашего дома или комплекса недвижимости. Профилактически, профессионально и с гарантией.",
    svc_maintenance_inc_1: "Устранение повреждений от влаги и оштукатуривание",
    svc_maintenance_inc_2: "Замена дверных замков и фурнитуры (SKG***)",
    svc_maintenance_inc_3: "Замена поврежденной плитки или плинтусов",
    svc_maintenance_inc_4: "Услуги по обслуживанию для домов и ТСЖ",
    svc_maintenance_inc_5: "Быстрый выезд на место для аварийного ремонта",

    svc_general_intro: "У вас комбинированный проект или специфическая работа по реконструкции? Мы думаем вместе с вами от этапа проектирования до сдачи объекта в чистоте.",
    svc_general_inc_1: "Мультидисциплинарные реконструкции",
    svc_general_inc_2: "Личные строительные консультации и осмотр на месте",
    svc_general_inc_3: "Прозрачный расчет без скрытых расходов",
    svc_general_inc_4: "Фиксированный график с одним координатором работ",
  },
} as const

export default translations

export function t(lang: Lang, key: TranslationKey): string {
  const dict = translations[lang] || translations.nl
  return (dict[key] || translations.nl[key] || key) as string
}
