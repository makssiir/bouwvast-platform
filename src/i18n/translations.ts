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
    nav_area: "Werkgebied",
    nav_kennisbank: "Kennisbank",
    kb_page_title: "Kennisbank",
    kb_page_sub:
      "Praktische gidsen en algemene informatie voor uw verbouwing of renovatie.",
    nav_contact: "Contact",
    nav_cta: "Offerte aanvragen",
    nav_business: "Zakelijk",

    // Hero
    hero_label: "Bouw · renovatie · afbouw — regio Amersfoort",
    hero_title: "Bouwen, renoveren en afwerken.",
    hero_title_accent: "Van idee tot strak resultaat.",
    hero_sub:
      "Bouw-, renovatie- en afbouwwerkzaamheden voor woningen en bedrijven. Beschrijf uw plannen en ontvang een duidelijke, gespecificeerde offerte.",
    hero_cta_primary: "Offerte aanvragen",
    hero_trust_1: "Vrijblijvende aanvraag",
    hero_trust_2: "Gespecificeerde offerte vooraf",
    hero_trust_3: "Persoonlijk contact",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Vragen over uw verbouwing of richtprijs? Stuur ons gerust een bericht, ook met foto's van de ruimte.",
    nudge_wa_btn: "Start WhatsApp-chat",
    nudge_estimator_tip:
      "Tip: voeg foto's van de ruimte toe aan uw aanvraag, dan kunnen we gerichter reageren.",

    // Stats

    // Multi-step & CRO
    btn_next: "Volgende stap",
    btn_back: "Terug",
    btn_submit_request: "Aanvraag versturen",

    // Estimator
    est_eyebrow: "Direct inzicht",
    est_title: "Bereken direct uw richtprijs",
    est_sub:
      "Selecteer uw type werkzaamheden en oppervlakte voor een realtime indicatie van de kosten.",
    est_step_1: "Kies het type werkzaamheden",
    est_step_2: "Hoe groot is de ruimte?",
    est_step_3: "Kies het kwaliteitsniveau",
    est_tier_std: "Standaard",
    est_tier_std_desc: "Degelijke basiskwaliteit",
    est_tier_prem: "Premium",
    est_tier_prem_desc: "Hoogwaardige A-merken",
    est_tier_lux: "Luxe / design",
    est_tier_lux_desc: "High-end afwerking",
    est_opt_demo: "Inclusief sloopwerk & afvoer",
    est_opt_mat: "Inclusief materialen",
    est_est_price: "Uw richtprijs",
    est_apply_btn: "Offerte aanvragen voor deze berekening",
    est_disclaimer:
      "Indicatieve berekening incl. btw, geen offerte. De definitieve prijs volgt na een opname op locatie.",

    // Services section & pages
    services_label: "Onze vakgebieden",
    services_title: "Waarmee kan Bouwvast u helpen?",
    services_sub:
      "Bekijk per discipline wat we voor u kunnen betekenen en wat erbij hoort.",
    services_all: "Bekijk alle diensten",
    more_info: "Bekijk dienst",

    // Service names & descriptions
    svc_renovation: "Woningrenovatie",
    svc_renovation_desc:
      "Complete of gedeeltelijke renovatie van woningen en bedrijfsruimtes.",
    svc_finishing: "Afbouw & stucwerk",
    svc_finishing_desc:
      "Sausklaar stucen, behangklaar, pleisterwerk, scheidingswanden en plafonds.",
    svc_painting: "Binnen- & buitenschilderwerk",
    svc_painting_desc:
      "Vakkundig saus- en lakwerk voor particulieren en bedrijven met 9% btw voordeel.",
    svc_facade: "Gevel- & metselwerk",
    svc_facade_desc:
      "Voegwerk, scheurherstel, gevelreiniging en buitengevelisolatie.",
    svc_assembly: "Montage & afwerking",
    svc_assembly_desc:
      "Nauwkeurige montage van keukens, deuren, kasten en interieurelementen.",
    svc_maintenance: "Onderhoud & schadeherstel",
    svc_maintenance_desc:
      "Kleine en grotere onderhoudswerkzaamheden, vochtherstel en mutatieonderhoud.",
    svc_bathroom: "Badkamer & keuken",
    svc_bathroom_desc:
      "Complete renovatie, leidingwerk, tegelwerk en luxe sanitairmontage.",
    svc_carpenter: "Timmerman",
    svc_carpenter_desc:
      "Kozijnen, binnen- en buitendeuren, maatwerk inbouwkasten en aftimmerwerk.",
    svc_plumber: "Loodgieter",
    svc_plumber_desc:
      "Leidingwerk, sanitair aansluiten, vloerverwarming en lekkages verhelpen.",
    svc_general: "Algemene bouwwerkzaamheden",
    svc_general_desc:
      "Multidisciplinaire verbouwingen en projecten van ontwerp tot oplevering.",

    // Before/After
    ba_label: "Het verschil",
    ba_title: "Voor & na: zo kan het worden",
    ba_sub:
      "Sleep met de balk om het verschil tussen vóór en na de verbouwing te zien.",
    ba_before: "Voor",
    ba_after: "Na",
    ba_hint: "Sleep om te vergelijken",

    // Audience

    // How it works
    how_label: "Werkwijze",
    how_title: "In 4 stappen naar een geslaagde verbouwing",
    how_cta: "Vraag direct een offerte aan",
    how_1_title: "Vrijblijvende aanvraag",
    how_1_desc:
      "Beschrijf uw project via het online aanvraagformulier of bereken vooraf uw richtprijs.",
    how_2_title: "Opname & advies",
    how_2_desc:
      "We bespreken uw wensen en plannen zo nodig een opname op locatie in.",
    how_3_title: "Transparante offerte",
    how_3_desc:
      "U ontvangt een gespecificeerde offerte met duidelijke planning en vaste prijsafspraken.",
    how_4_title: "Vakkundige oplevering",
    how_4_desc:
      "Het werk wordt uitgevoerd volgens de afspraken in de offerte en samen met u opgeleverd.",

    // Reviews

    // Pricing

    // Founder Trust Card

    // Area & City Page
    area_page_title: "Werkgebied & gemeenten",
    area_page_sub:
      "Ons werkgebied ligt rond Amersfoort. Staat uw woonplaats er niet bij? Vraag het ons gerust.",
    area_places: "plaatsen",
    city_page_title: "Aannemer & verbouwing in",

    // Projects Page
    projects_title: "Projecten",
    projects_sub:
      "Hier tonen we eigen projecten, gepubliceerd met toestemming van onze opdrachtgevers.",

    // About Page

    // Business Page
    b2b_page_title: "Zakelijke samenwerking & partners",
    b2b_page_sub:
      "Uitvoerende bouwpartner voor aannemers, keukenzaken, VvE's en vastgoedbeheerders.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Veelgestelde vragen over verbouwen",
    faq_1_q: "Zijn prijzen inclusief btw?",
    faq_1_a: "In de offerte staat altijd duidelijk welk btw-tarief van toepassing is. Voor bepaalde arbeid aan woningen ouder dan 2 jaar (zoals schilder- en stucwerk) kan het verlaagde tarief van 9% gelden.",
    faq_1b_q: "Welke werkzaamheden voeren jullie uit?",
    faq_1b_a:
      "Wij voeren complete woningrenovaties, badkamers, stucwerk, schilderwerk, timmerwerk, loodgieterswerk, gevelwerk en onderhoud uit.",
    faq_2_q: "Wat als er tijdens de verbouwing verborgen gebreken opduiken?",
    faq_2_a: "Transparantie staat voorop. Mochten we onvoorziene zaken (zoals houtrot of leidinglekkages) tegenkomen, dan bespreken we dit direct met u. We bieden een oplossing en prijs aan vóórdat we verdere kosten maken. Geen verrassingen achteraf.",
    faq_2b_q: "Werken jullie ook voor zakelijke opdrachtgevers?",
    faq_2b_a:
      "Ja, u kunt ons benaderen als particulier, aannemer, VvE of vastgoedbeheerder.",
    faq_3_q: "In welke regio zijn jullie actief?",
    faq_3_a:
      "Ons werkgebied ligt rond Amersfoort. Vermeld uw woonplaats in de aanvraag; we laten u weten of we uw project kunnen aannemen.",
    faq_4_q: "Kan ik eerst een vrijblijvende offerte aanvragen?",
    faq_4_a:
      "Ja. Een aanvraag via deze website is vrijblijvend: u zit nergens aan vast totdat u een offerte ondertekent.",

    // Form & Modals
    form_title: "Vraag een offerte aan",
    form_sub: "Beschrijf uw project. We nemen contact met u op om de mogelijkheden te bespreken.",
    form_name: "Uw naam",
    form_phone: "Telefoonnummer",
    form_email: "E-mailadres",
    form_city: "Woonplaats of postcode",
    form_desc: "Beschrijf uw wensen en bijzonderheden",
    form_photos: "Foto's toevoegen",
    form_optional: "optioneel",
    form_photos_selected: "{n} foto('s) geselecteerd",
    form_privacy:
      "We gebruiken uw gegevens alleen om op deze aanvraag te reageren.",
    form_success_title: "Aanvraag ontvangen",
    form_success_sub:
      "Bedankt voor uw aanvraag. We nemen zo snel mogelijk contact met u op.",
    form_sending: "Bezig met verzenden…",
    form_error_title: "Verzenden is niet gelukt",
    form_error_retry: "Opnieuw proberen",
    form_error_whatsapp: "Via WhatsApp",
    form_error_email: "Via e-mail",
    form_error_call: "Bel ons",
    form_error_subject: "Offerteaanvraag",
    form_photos_too_big:
      "De foto's zijn samen te groot om mee te sturen. Uw aanvraag is verstuurd — stuur de foto's gerust na via WhatsApp of e-mail.",

    // Wizard Modal steps

    // CTA
    cta_sub:
      "Vraag vrijblijvend een offerte aan en beschrijf kort uw plannen.",
    cta_btn: "Offerte aanvragen",

    // Footer
    footer_desc:
      "Bouw-, renovatie- en afbouwwerkzaamheden in de regio Amersfoort, met duidelijke afspraken vooraf.",
    footer_info: "Informatie",
    footer_services: "Diensten",
    footer_cities: "Werkgebied",
    footer_privacy: "Privacybeleid",
    footer_terms: "Algemene voorwaarden",
    footer_partner: "Zakelijk & samenwerking",
    footer_rights: "Alle rechten voorbehouden.",

    // Global / UI
    skip_link: "Direct naar hoofdinhoud",
    nav_call: "Bellen",
    close: "Sluiten",

    // Home Sections
    // Regions
    region_kern: "Kernwerkgebied",
    region_utrecht: "Regio Utrecht",
    region_gooi: "Gooi & Eemland",
    region_gelderland: "Gelderland",

    // Page Specific
    city_hero_title: "Vakman in {city}",
    city_hero_sub: "Bouw-, renovatie- en onderhoudswerkzaamheden in {city} en omgeving. Vraag vrijblijvend een offerte aan.",
    city_services_eyebrow: "Diensten in {city}",
    city_services_title: "Werkzaamheden in {city}",
    city_seo_title: "Waarom kiezen voor Bouwvast in {city}?",
    city_seo_p1: "Woont u in {city} of heeft u hier een bedrijfspand en zoekt u een betrouwbare vakman voor uw verbouwing, badkamer, schilderwerk of onderhoud? Bouwvast biedt een compleet pakket van vakkundige disciplines onder één dak.",
    city_seo_p2: "U krijgt vooraf een gespecificeerde offerte met duidelijke afspraken over planning en prijs.",
    city_faq_title: "Veelgestelde vragen over {city}",
    city_quote_title: "Offerte in {city}",
    city_quote_sub: "Vrijblijvend · beschrijf kort uw project.",
    city_faq_1_q: "Voert Bouwvast ook werkzaamheden uit in {city}?",
    city_faq_1_a: "Vermeld in uw aanvraag dat het om {city} gaat; we laten u weten of we uw project daar kunnen uitvoeren.",
    city_faq_2_q: "Hoe snel kunnen jullie ter plaatse zijn voor een opname?",
    city_faq_2_a: "Dat hangt af van de planning en het soort klus. Na uw aanvraag stemmen we een moment voor een opname met u af.",
    city_faq_3_q: "Zijn de tarieven in alle gemeenten gelijk?",
    city_faq_3_a: "Eventuele reis- of voorrijkosten staan altijd vooraf in de offerte.",
    city_faq_4_q: "Krijg ik garantie op de werkzaamheden in mijn woning?",
    city_faq_4_a: "De garantievoorwaarden staan in de offerte. Daarnaast heeft u altijd de wettelijke rechten bij gebreken.",
    
    service_hero_suffix: " in uw regio",
    service_includes_eyebrow: "Wat valt hieronder",
    service_includes_title: "Werkzaamheden die wij verzorgen",
    service_process_eyebrow: "Aanpak",
    service_process_title: "Hoe wij te werk gaan",
    service_area_eyebrow: "Werkgebied",
    service_area_title: "{service} in uw regio",
    service_area_desc: "Bekijk de plaatsen in ons werkgebied of vermeld uw woonplaats in de aanvraag.",
    service_quote_title: "Vrijblijvende offerte",
    service_quote_sub: "Vraag direct een prijsindicatie aan voor {service}.",
    service_related_eyebrow: "Verder kijken",
    service_related_title: "Andere diensten van Bouwvast",
    

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
    svc_bathroom_inc_5: "Schimmelwerend sanitair kitwerk",

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

    svc_maintenance_intro: "Onderhoudswerkzaamheden en herstelklussen aan uw woning of vastgoedcomplex, preventief en vakkundig.",
    svc_maintenance_inc_1: "Herstel van vochtschade & stucwerk",
    svc_maintenance_inc_2: "Deursloten en hang- en sluitwerk vernieuwen (SKG***)",
    svc_maintenance_inc_3: "Vervangen van beschadigde tegels of plinten",
    svc_maintenance_inc_4: "Onderhoudsbeurten voor woningen en VvE's",
    svc_maintenance_inc_5: "Herstel van acute schade in overleg",

    svc_general_intro: "Heeft u een combinatieproject of een specifieke verbouwklus? Wij denken mee vanaf de ontwerpfase tot aan de bezemvaste oplevering.",
    svc_general_inc_1: "Multidisciplinaire verbouwingen",
    svc_general_inc_2: "Persoonlijk bouwadvies en opname op locatie",
    svc_general_inc_3: "Transparante calculatie zonder verborgen kosten",
    svc_general_inc_4: "Vaste planning met één bouwcoördinator",
    nav_home: "Home",
    link_more: "Meer informatie",
    privacy_meta_desc: "Hoe Bouwvast omgaat met de gegevens die u via het offerteformulier verstuurt.",
    terms_meta_desc: "Welke voorwaarden gelden voor offertes en opdrachten van Bouwvast.",
    notfound_title: "Pagina niet gevonden",
    notfound_sub: "Deze pagina bestaat niet (meer). Kies hieronder waar u verder wilt gaan.",
    kb_dutch_only: "",
    kb_read_article: "Lees artikel",
    kb_tips_title: "Tips",
    kb_disclaimer: "Dit artikel geeft algemene informatie. Genoemde bedragen en regels zijn indicatief en kunnen veranderen; ze zijn geen offerte. Controleer fiscale regels bij de Belastingdienst.",
    kb_more_articles: "Meer artikelen",
    legal_dutch_only: "",
    how_1_desc_form: "Beschrijf uw project kort via het aanvraagformulier, eventueel met foto's.",
    est_tab_1: "Type werk",
    est_tab_2: "Omvang",
    est_tab_3: "Kwaliteit",
    est_area: "Oppervlakte",
    est_less: "Minder",
    est_more: "Meer",
    est_opt_demo_desc: "Oude afwerking verwijderen en afvoeren",
    est_opt_mat_desc: "Wij kopen en leveren de materialen in",
    est_extra_demo: "sloopwerk & afvoer",
    est_extra_mat: "materialen",
    est_per_unit: "≈ {min} – {max} per m² · incl. btw",
    est_sum_work: "Werk",
    est_sum_area: "Oppervlakte",
    est_sum_quality: "Kwaliteit",
    est_sum_extras: "Extra",
    est_none: "Geen",
    est_apply_note: "Uw berekening wordt automatisch aan de aanvraag toegevoegd.",
    est_applied: "Uw berekening is toegevoegd aan het aanvraagformulier.",
    est_desc_seed: "Graag ontvang ik een offerte voor {service}: ongeveer {qty} m², kwaliteit {tier}{extras}.",
    est_desc_extras: ", inclusief {extras}",
    est_tip_wa: "Tip: stuur een foto van uw ruimte via WhatsApp voor een preciezere prijsindicatie.",
    est_tip_form: "Tip: voeg foto's van uw ruimte toe aan de aanvraag voor een preciezere prijsindicatie.",
    est_wa_btn: "Foto's via WhatsApp",
    est_wa_msg: "Hallo Bouwvast, ik heb de rekentool gebruikt ({summary}) en stuur graag foto's voor een prijsindicatie.",
    est_form_btn: "Foto's toevoegen",
    ba_slider: "Vergelijk voor en na",
    ba_value: "Voor: {before}%, na: {after}%",
    ba_choose: "Kies een voorbeeld",
    ba_impression: "Impressie",
    ba_impression_note: "Impressiebeelden: zo kan een vergelijkbare verbouwing eruitzien.",
    ba_scope: "Werkzaamheden",
    ba_service_link: "Bekijk de dienst",
    area_eyebrow: "Werkgebied & beschikbaarheid",
    area_title: "Controleer direct of Bouwvast in uw regio actief is",
    area_desc: "Wij voeren complete renovaties, stucwerk en badkamerverbouwingen uit in Midden-Nederland, regio Utrecht, 't\u00a0Gooi en omstreken.",
    area_free_survey: "Een opname is zonder voorrijkosten.",
    area_label: "Postcode of woonplaats",
    area_placeholder: "Bijv. 3811 of Amersfoort",
    area_btn: "Controleer",
    area_quick: "Snel bekijken:",
    area_ok_title: "Goed nieuws: {place} valt binnen ons werkgebied",
    area_ok_text: "Stuur een vrijblijvende aanvraag; we bevestigen de planning en mogelijkheden persoonlijk.",
    area_unknown_title: "{place} kunnen we niet direct bevestigen",
    area_unknown_text: "Vermeld uw woonplaats in de aanvraag, dan laten we u persoonlijk weten of we uw project kunnen uitvoeren.",
    area_invalid: "Vul een postcode (4 cijfers) of woonplaats in.",
    area_prefilled: "Uw woonplaats vullen we alvast voor u in.",
    area_city_link: "Meer over {city}",
    area_regions: "Onze regio's",
    nudge_wa_title: "Vragen? App ons",
    nudge_wa_msg: "Hallo Bouwvast, ik heb een vraag over mijn verbouwing.",
    nudge_quote_title: "Plannen voor een verbouwing?",
    nudge_quote_text: "Beschrijf uw project in een paar zinnen en ontvang een duidelijke, gespecificeerde offerte.",
    nudge_close: "Sluiten",
    hero_cta_calc: "Bereken uw richtprijs",
    est_show_result: "Bekijk uw richtprijs",
  },

  en: {
    // Navigation
    nav_services: "Services",
    nav_projects: "Projects",
    nav_area: "Service area",
    nav_kennisbank: "Knowledge base",
    kb_page_title: "Knowledge base",
    kb_page_sub:
      "Practical guides and general information for your renovation.",
    nav_contact: "Contact",
    nav_cta: "Request a quote",
    nav_business: "Business",
    btn_next: "Next step",
    btn_back: "Back",
    btn_submit_request: "Send request",

    // Hero
    hero_label: "Construction · renovation · finishing — Amersfoort region",
    hero_title: "Building, renovating and finishing.",
    hero_title_accent: "From concept to premium result.",
    hero_sub:
      "Construction, renovation and finishing work for homes and businesses. Describe your plans and receive a clear, itemised quote.",
    hero_cta_primary: "Request a quote",
    hero_trust_1: "No-obligation request",
    hero_trust_2: "Itemised quote up front",
    hero_trust_3: "Personal contact",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Questions about your renovation or the indicative price? Send us a message, photos of the space are welcome too.",
    nudge_wa_btn: "Start WhatsApp chat",
    nudge_estimator_tip:
      "Tip: add photos of the space to your request so we can respond more specifically.",

    // Stats

    // Estimator
    est_eyebrow: "Instant estimate",
    est_title: "Calculate your indicative price",
    est_sub:
      "Choose the type of work and the floor area for a real-time indication of the costs.",
    est_step_1: "Choose the type of work",
    est_step_2: "How large is the area?",
    est_step_3: "Choose the quality level",
    est_tier_std: "Standard",
    est_tier_std_desc: "Solid basic quality",
    est_tier_prem: "Premium",
    est_tier_prem_desc: "High-quality brand materials",
    est_tier_lux: "Luxury / design",
    est_tier_lux_desc: "High-end finish",
    est_opt_demo: "Including demolition & disposal",
    est_opt_mat: "Including materials",
    est_est_price: "Your indicative price",
    est_apply_btn: "Request a quote for this calculation",
    est_disclaimer:
      "Indicative calculation incl. VAT, not a quote. The final price follows after an on-site assessment.",

    // Services section & pages
    services_label: "Our disciplines",
    services_title: "How can Bouwvast assist your build?",
    services_sub:
      "See per discipline what we can do for you and what is included.",
    services_all: "View all services",
    more_info: "View service",

    // Service names & descriptions
    svc_renovation: "Home renovation",
    svc_renovation_desc:
      "Complete or partial turn-key renovation of homes and commercial spaces.",
    svc_finishing: "Plastering & drywall",
    svc_finishing_desc:
      "Smooth finish plastering, drywall partitions, suspended ceilings, and subfloors.",
    svc_painting: "Interior & exterior painting",
    svc_painting_desc:
      "Professional paint spraying and woodwork lacquering with 9% VAT benefit for residential.",
    svc_facade: "Facade & masonry",
    svc_facade_desc:
      "Tuckpointing, brickwork restoration, pressure cleaning, and exterior insulation.",
    svc_assembly: "Mounting & fitting",
    svc_assembly_desc:
      "Precision installation of kitchens, interior doors, custom cabinetry, and finishes.",
    svc_maintenance: "Maintenance & repairs",
    svc_maintenance_desc:
      "Small and large maintenance tasks, moisture repairs, and ongoing property maintenance.",
    svc_bathroom: "Bathroom & kitchen",
    svc_bathroom_desc:
      "Complete remodeling, plumbing, tile leveling, and luxury sanitary fitting.",
    svc_carpenter: "Carpenter",
    svc_carpenter_desc:
      "Window and door frames, hanging doors, built-in cabinetry and finish carpentry.",
    svc_plumber: "Plumber",
    svc_plumber_desc:
      "Pipework, sanitary connections, underfloor heating and leak repairs.",
    svc_general: "General building works",
    svc_general_desc:
      "Multidisciplinary construction projects coordinated from design to clean handover.",

    // Before/After
    ba_label: "The difference",
    ba_title: "Before & after: what it could look like",
    ba_sub: "Drag the slider to see the difference before and after the renovation.",
    ba_before: "Before",
    ba_after: "After",
    ba_hint: "Drag to compare",

    // Audience

    // How it works
    how_label: "Process",
    how_title: "Four steps to a smooth renovation",
    how_cta: "Request a quote",
    how_1_title: "No-obligation request",
    how_1_desc:
      "Tell us about your project via our form or calculate an online estimate in seconds.",
    how_2_title: "Survey & advice",
    how_2_desc:
      "We discuss your wishes and, if needed, schedule an on-site assessment.",
    how_3_title: "Transparent quote",
    how_3_desc:
      "You receive an itemized proposal with clear schedules, scope, and fixed pricing terms.",
    how_4_title: "Professional delivery",
    how_4_desc:
      "The work is carried out as agreed in the quote and handed over together with you.",

    // Reviews

    // Pricing

    // Founder Trust Card

    // Area & City Page
    area_page_title: "Service areas & municipalities",
    area_page_sub:
      "We work in the area around Amersfoort. Your town not listed? Just ask us.",
    area_places: "locations",
    city_page_title: "Contractor & renovations in",

    // Projects Page
    projects_title: "Projects",
    projects_sub:
      "Here we show our own projects, published with our clients' permission.",

    // About Page

    // Business Page
    b2b_page_title: "Business partnerships & B2B",
    b2b_page_sub:
      "Execution partner for contractors, kitchen retailers, owners' associations and property managers.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Frequently asked questions",
    faq_1_q: "Do prices include VAT?",
    faq_1_a: "The quote always states clearly which VAT rate applies. For certain labour on homes older than 2 years (such as painting and plastering) the reduced 9% rate may apply.",
    faq_1b_q: "What types of construction work do you handle?",
    faq_1b_a:
      "We manage complete home renovations, bathrooms, plastering, painting, carpentry, plumbing, masonry, and ongoing maintenance.",
    faq_2_q: "What if hidden defects arise during the renovation?",
    faq_2_a: "Transparency is our priority. Should we encounter unforeseen issues (like wood rot or pipe leaks), we discuss this directly with you. We offer a solution and price before incurring any further costs. No surprises afterwards.",
    faq_2b_q: "Do you work with commercial clients?",
    faq_2b_a:
      "Yes, you can contact us as a homeowner, contractor, owners' association or property manager.",
    faq_3_q: "In which areas do you operate?",
    faq_3_a:
      "We work in the area around Amersfoort. Mention your town in the request and we will let you know whether we can take on your project.",
    faq_4_q: "Is requesting a quote free of obligation?",
    faq_4_a:
      "Yes. A request through this website is without obligation: nothing is binding until you sign a quote.",

    // Form & Modals
    form_title: "Request a quote",
    form_sub: "Describe your project. We will contact you to discuss the options.",
    form_name: "Full name",
    form_phone: "Phone number",
    form_email: "Email address",
    form_city: "City or postcode",
    form_desc: "Describe your project and requirements",
    form_photos: "Attach photos",
    form_optional: "optional",
    form_photos_selected: "{n} photo(s) selected",
    form_privacy:
      "We only use your details to respond to this request.",
    form_success_title: "Request received",
    form_success_sub:
      "Thank you for your request. We will contact you as soon as possible.",
    form_sending: "Sending…",
    form_error_title: "Your request did not go through",
    form_error_retry: "Try again",
    form_error_whatsapp: "Via WhatsApp",
    form_error_email: "Via email",
    form_error_call: "Call us",
    form_error_subject: "Quote request",
    form_photos_too_big:
      "Your photos are too large to send along. The request itself went through — feel free to send the photos via WhatsApp or email.",

    // Wizard Modal steps

    // CTA
    cta_sub:
      "Request a no-obligation quote and briefly describe your plans.",
    cta_btn: "Request a quote",

    // Footer
    footer_desc:
      "Construction, renovation and finishing work in the Amersfoort region, with clear agreements up front.",
    footer_info: "Information",
    footer_services: "Services",
    footer_cities: "Service area",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms & conditions",
    footer_partner: "Business & partnerships",
    footer_rights: "All rights reserved.",

    // Global / UI
    skip_link: "Skip to main content",
    nav_call: "Call us",
    close: "Close",

    // Home Sections
    // Regions
    region_kern: "Core service area",
    region_utrecht: "Utrecht region",
    region_gooi: "Gooi & Eemland",
    region_gelderland: "Gelderland",

    // Page Specific
    city_hero_title: "Contractor in {city}",
    city_hero_sub: "Construction, renovation and maintenance work in {city} and the surrounding area. Request a no-obligation quote.",
    city_services_eyebrow: "Services in {city}",
    city_services_title: "Our work in {city}",
    city_seo_title: "Why choose Bouwvast in {city}?",
    city_seo_p1: "Do you live in {city} or have a commercial property here and are looking for a reliable contractor for your renovation, bathroom, painting or maintenance? Bouwvast offers a complete package of professional disciplines under one roof.",
    city_seo_p2: "You receive an itemised quote in advance with clear agreements on schedule and price.",
    city_faq_title: "Frequently asked questions about {city}",
    city_quote_title: "Quote in {city}",
    city_quote_sub: "No obligation · briefly describe your project.",
    city_faq_1_q: "Does Bouwvast also operate in {city}?",
    city_faq_1_a: "Mention {city} in your request and we will let you know whether we can carry out your project there.",
    city_faq_2_q: "How quickly can you be on-site for an inspection?",
    city_faq_2_a: "That depends on the schedule and the type of job. After your request we agree on a time for a site visit with you.",
    city_faq_3_q: "Are the rates the same in all municipalities?",
    city_faq_3_a: "Any travel or call-out costs are always stated in the quote in advance.",
    city_faq_4_q: "Do I get a warranty on the work in my home?",
    city_faq_4_a: "The warranty terms are set out in the quote. You also always have your statutory rights in case of defects.",
    
    service_hero_suffix: " in your region",
    service_includes_eyebrow: "What's included",
    service_includes_title: "Work that we provide",
    service_process_eyebrow: "Approach",
    service_process_title: "How we work",
    service_area_eyebrow: "Service area",
    service_area_title: "{service} in your region",
    service_area_desc: "See the places in our service area or mention your town in the request.",
    service_quote_title: "Free quote",
    service_quote_sub: "Request a price indication for {service} now.",
    service_related_eyebrow: "Explore more",
    service_related_title: "Other services by Bouwvast",
    

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
    svc_bathroom_inc_5: "Mould-resistant sanitary sealing",

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

    svc_maintenance_intro: "Maintenance and repair work on your home or property complex, preventive and professional.",
    svc_maintenance_inc_1: "Repairing moisture damage & plasterwork",
    svc_maintenance_inc_2: "Renewing door locks and hardware (SKG***)",
    svc_maintenance_inc_3: "Replacing damaged tiles or skirting boards",
    svc_maintenance_inc_4: "Maintenance services for homes and HOAs",
    svc_maintenance_inc_5: "Repair of urgent damage by arrangement",

    svc_general_intro: "Do you have a combination project or a specific remodeling job? We think along with you from the design phase to a broom-clean handover.",
    svc_general_inc_1: "Multidisciplinary renovations",
    svc_general_inc_2: "Personal building advice and on-site inspection",
    svc_general_inc_3: "Transparent calculation without hidden costs",
    svc_general_inc_4: "Fixed schedule with one building coordinator",
    nav_home: "Home",
    link_more: "More information",
    privacy_meta_desc: "How Bouwvast handles the data you send through the quote form.",
    terms_meta_desc: "Which terms apply to Bouwvast quotes and assignments.",
    notfound_title: "Page not found",
    notfound_sub: "This page does not exist (any more). Choose where you would like to go next.",
    kb_dutch_only: "Our articles are only available in Dutch for now.",
    kb_read_article: "Read article",
    kb_tips_title: "Tips",
    kb_disclaimer: "This article provides general information. Amounts and rules mentioned are indicative and may change; they are not a quote. Check tax rules with the Dutch Tax Administration.",
    kb_more_articles: "More articles",
    legal_dutch_only: "This text is available in Dutch only; the Dutch version applies.",
    how_1_desc_form: "Briefly describe your project using the request form, with photos if you like.",
    est_tab_1: "Type of work",
    est_tab_2: "Size",
    est_tab_3: "Quality",
    est_area: "Floor area",
    est_less: "Less",
    est_more: "More",
    est_opt_demo_desc: "Removing and disposing of the old finish",
    est_opt_mat_desc: "We source and supply the materials",
    est_extra_demo: "demolition & disposal",
    est_extra_mat: "materials",
    est_per_unit: "≈ {min} – {max} per m² · incl. VAT",
    est_sum_work: "Work",
    est_sum_area: "Area",
    est_sum_quality: "Quality",
    est_sum_extras: "Extras",
    est_none: "None",
    est_apply_note: "Your calculation is added to the request automatically.",
    est_applied: "Your calculation has been added to the request form.",
    est_desc_seed: "I would like a quote for {service}: about {qty} m², {tier} quality{extras}.",
    est_desc_extras: ", including {extras}",
    est_tip_wa: "Tip: send a photo of your space via WhatsApp for a more precise price indication.",
    est_tip_form: "Tip: add photos of your space to the request for a more precise price indication.",
    est_wa_btn: "Photos via WhatsApp",
    est_wa_msg: "Hello Bouwvast, I used the calculator ({summary}) and would like to send photos for a price indication.",
    est_form_btn: "Add photos",
    ba_slider: "Compare before and after",
    ba_value: "Before: {before}%, after: {after}%",
    ba_choose: "Choose an example",
    ba_impression: "Illustration",
    ba_impression_note: "Illustrative images: what a similar renovation can look like.",
    ba_scope: "Work involved",
    ba_service_link: "View the service",
    area_eyebrow: "Service area & availability",
    area_title: "Check right away whether Bouwvast works in your area",
    area_desc: "We carry out complete renovations, plastering and bathroom remodels in the centre of the Netherlands, the Utrecht region, 't\u00a0Gooi and surroundings.",
    area_free_survey: "An on-site survey comes without call-out charges.",
    area_label: "Postcode or town",
    area_placeholder: "E.g. 3811 or Amersfoort",
    area_btn: "Check",
    area_quick: "Quick check:",
    area_ok_title: "Good news: {place} is within our service area",
    area_ok_text: "Send a no-obligation request; we confirm the planning and options personally.",
    area_unknown_title: "We can't confirm {place} right away",
    area_unknown_text: "Mention your town in the request and we'll let you know personally whether we can take on your project.",
    area_invalid: "Enter a postcode (4 digits) or a town.",
    area_prefilled: "We'll fill in your town for you.",
    area_city_link: "More about {city}",
    area_regions: "Our regions",
    nudge_wa_title: "Questions? Message us",
    nudge_wa_msg: "Hello Bouwvast, I have a question about my renovation.",
    nudge_quote_title: "Planning a renovation?",
    nudge_quote_text: "Describe your project in a few sentences and receive a clear, itemised quote.",
    nudge_close: "Close",
    hero_cta_calc: "Estimate your price",
    est_show_result: "See your estimate",
  },

  uk: {
    // Navigation
    nav_services: "Послуги",
    nav_projects: "Проєкти",
    nav_area: "Регіон робіт",
    nav_kennisbank: "База знань",
    kb_page_title: "База знань",
    kb_page_sub:
      "Практичні посібники та загальна інформація для вашого ремонту.",
    nav_contact: "Контакти",
    nav_cta: "Замовити пропозицію",
    nav_business: "Для бізнесу",
    btn_next: "Наступний крок",
    btn_back: "Назад",
    btn_submit_request: "Надіслати запит",

    // Hero
    hero_label: "Будівництво · ремонт · оздоблення — регіон Амерсфорт",
    hero_title: "Будівництво, ремонт і оздоблення.",
    hero_title_accent: "Від ідеї до якісного результату.",
    hero_sub:
      "Будівельні, ремонтні та оздоблювальні роботи для житла й бізнесу. Опишіть свої плани та отримайте зрозумілу, детальну пропозицію.",
    hero_cta_primary: "Замовити пропозицію",
    hero_trust_1: "Запит без зобов'язань",
    hero_trust_2: "Детальний кошторис заздалегідь",
    hero_trust_3: "Особистий контакт",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Маєте питання щодо ремонту чи орієнтовної ціни? Напишіть нам — можна з фото приміщення.",
    nudge_wa_btn: "Написати в WhatsApp",
    nudge_estimator_tip:
      "Порада: додайте до запиту фото приміщення — так ми зможемо відповісти точніше.",

    // Stats

    // Estimator
    est_eyebrow: "Миттєва оцінка",
    est_title: "Розрахуйте орієнтовну вартість",
    est_sub: "Оберіть тип робіт і площу — і одразу побачите орієнтовну вартість.",
    est_step_1: "Оберіть тип робіт",
    est_step_2: "Яка площа приміщення?",
    est_step_3: "Оберіть рівень якості",
    est_tier_std: "Стандарт",
    est_tier_std_desc: "Надійна базова якість",
    est_tier_prem: "Преміум",
    est_tier_prem_desc: "Якісні матеріали відомих брендів",
    est_tier_lux: "Люкс / дизайн",
    est_tier_lux_desc: "Висококласне оздоблення",
    est_opt_demo: "З демонтажем і вивезенням",
    est_opt_mat: "З матеріалами",
    est_est_price: "Орієнтовна вартість",
    est_apply_btn: "Замовити пропозицію за цим розрахунком",
    est_disclaimer:
      "Орієнтовний розрахунок з ПДВ, не є пропозицією. Остаточна ціна — після огляду на об'єкті.",

    // Services section & pages
    services_label: "Наші напрями",
    services_title: "Чим Bouwvast може вам допомогти?",
    services_sub:
      "Перегляньте за напрямами, що ми можемо для вас зробити і що входить у роботи.",
    services_all: "Усі послуги",
    more_info: "Детальніше про послугу",

    // Service names & descriptions
    svc_renovation: "Комплексний ремонт житла",
    svc_renovation_desc:
      "Повний або частковий ремонт будинків та комерційних приміщень під ключ.",
    svc_finishing: "Штукатурка та оздоблення",
    svc_finishing_desc:
      "Ідеально рівна штукатурка під фарбування, гіпсокартонні перегородки та стелі.",
    svc_painting: "Малярні роботи (інтер'єр і фасад)",
    svc_painting_desc:
      "Професійне безповітряне фарбування стін, лакування вікон і дверей зі зниженою ставкою ПДВ 9%.",
    svc_facade: "Фасадні та мурувальні роботи",
    svc_facade_desc:
      "Оновлення швів, ремонт цегляної кладки, гідрофобізація та утеплення фасадів.",
    svc_assembly: "Монтаж та встановлення",
    svc_assembly_desc:
      "Точний монтаж кухонь, дверей, вбудованих шаф та інших інтер'єрних конструкцій.",
    svc_maintenance: "Обслуговування та ремонт",
    svc_maintenance_desc:
      "Дрібні та великі ремонтні роботи, усунення вологи та регулярний догляд за нерухомістю.",
    svc_bathroom: "Ванні кімнати та санвузли",
    svc_bathroom_desc:
      "Повна реновація ванних кімнат, душових зон, великоформатна плитка та сантехніка.",
    svc_carpenter: "Теслярські роботи",
    svc_carpenter_desc:
      "Віконні та дверні коробки, навішування дверей, вбудовані шафи та оздоблення деревом.",
    svc_plumber: "Сантехнічні роботи",
    svc_plumber_desc:
      "Трубопроводи, підключення сантехніки, тепла підлога та усунення протікань.",
    svc_general: "Загальнобудівельні роботи",
    svc_general_desc:
      "Мультидисциплінарні будівельні проєкти від планування до чистової здачі.",

    // Before/After
    ba_label: "Різниця",
    ba_title: "До і після: як це може виглядати",
    ba_sub:
      "Перетягніть повзунок, щоб побачити різницю до і після ремонту.",
    ba_before: "До",
    ba_after: "Після",
    ba_hint: "Перетягніть, щоб порівняти",

    // Audience

    // How it works
    how_label: "Процес",
    how_title: "4 кроки до якісного ремонту",
    how_cta: "Замовити пропозицію",
    how_1_title: "Запит без зобов'язань",
    how_1_desc:
      "Опишіть завдання через форму або миттєво розрахуйте орієнтовну вартість у калькуляторі.",
    how_2_title: "Огляд і консультація",
    how_2_desc:
      "Обговорюємо ваші побажання і, за потреби, плануємо огляд на об'єкті.",
    how_3_title: "Прозорий кошторис",
    how_3_desc:
      "Ви отримуєте деталізовану комерційну пропозицію з фіксованими термінами та ціною.",
    how_4_title: "Якісне виконання",
    how_4_desc:
      "Роботи виконуються згідно з домовленостями в пропозиції та здаються разом із вами.",

    // Reviews

    // Pricing

    // Founder Trust Card

    // Area & City Page
    area_page_title: "Зона робіт та муніципалітети",
    area_page_sub:
      "Ми працюємо в регіоні навколо Амерсфорта. Вашого міста немає в списку? Просто запитайте нас.",
    area_places: "локацій",
    city_page_title: "Підрядник та ремонт у м.",

    // Projects Page
    projects_title: "Проєкти",
    projects_sub: "Тут ми показуємо власні проєкти, опубліковані за згодою наших замовників.",

    // About Page

    // Business Page
    b2b_page_title: "Для бізнесу та партнерів",
    b2b_page_sub:
      "Партнер із виконання робіт для підрядників, кухонних салонів, об'єднань власників і керуючих нерухомістю.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Часті запитання про ремонт",
    faq_1_q: "Чи включають ціни ПДВ?",
    faq_1_a: "У пропозиції завжди чітко зазначено, яка ставка ПДВ застосовується. Для деяких робіт у житлі, старшому за 2 роки (наприклад, фарбування та штукатурка), може діяти знижена ставка 9%.",
    faq_1b_q: "Які саме роботи ви виконуєте?",
    faq_1b_a:
      "Ми виконуємо повний комплекс будівельних робіт: ремонт житла, санвузлів, штукатурку, фарбування, столярні роботи, сантехніку, фасадні роботи та технічне обслуговування.",
    faq_2_q: "Що робити, якщо під час ремонту виявляться приховані дефекти?",
    faq_2_a: "Прозорість — наш пріоритет. Якщо ми виявимо непередбачувані проблеми, наприклад гниття деревини або протікання труб, ми негайно обговоримо це з вами. Ми запропонуємо рішення та ціну до того, як візьмемося за додаткові роботи. Ніяких сюрпризів.",
    faq_2b_q: "Чи працюєте ви з юридичними особами?",
    faq_2b_a:
      "Так, до нас можуть звертатися приватні особи, підрядники, об'єднання власників (VvE) та керуючі нерухомістю.",
    faq_3_q: "У яких регіонах ви працюєте?",
    faq_3_a:
      "Ми працюємо в регіоні навколо Амерсфорта. Вкажіть своє місто в запиті, і ми повідомимо, чи можемо взятися за ваш проєкт.",
    faq_4_q: "Чи зобов'язує мене до чогось запит кошторису?",
    faq_4_a:
      "Так. Запит через сайт ні до чого не зобов'язує, доки ви не підпишете пропозицію.",

    // Form & Modals
    form_title: "Замовте пропозицію",
    form_sub: "Опишіть свій проєкт. Ми зв'яжемося з вами, щоб обговорити можливості.",
    form_name: "Ваше ім'я",
    form_phone: "Номер телефону",
    form_email: "Електронна пошта",
    form_city: "Місто або індекс",
    form_desc: "Опишіть свій проєкт та особливості",
    form_photos: "Додати фотографії",
    form_optional: "необов'язково",
    form_photos_selected: "Обрано {n} фото",
    form_privacy:
      "Ми використовуємо ваші дані лише для відповіді на цей запит.",
    form_success_title: "Запит отримано",
    form_success_sub:
      "Дякуємо за запит. Ми зв'яжемося з вами якнайшвидше.",
    form_sending: "Надсилаємо…",
    form_error_title: "Заявку не вдалося надіслати",
    form_error_retry: "Спробувати ще раз",
    form_error_whatsapp: "Через WhatsApp",
    form_error_email: "Електронною поштою",
    form_error_call: "Зателефонувати",
    form_error_subject: "Запит на кошторис",
    form_photos_too_big:
      "Фотографії разом занадто великі, щоб надіслати їх із заявкою. Саму заявку ми вже отримали — надішліть фото через WhatsApp або поштою.",

    // Wizard Modal steps

    // CTA
    cta_sub:
      "Замовте пропозицію без зобов'язань і коротко опишіть свої плани.",
    cta_btn: "Замовити пропозицію",

    // Footer
    footer_desc:
      "Будівельні, ремонтні та оздоблювальні роботи в регіоні Амерсфорт із чіткими домовленостями заздалегідь.",
    footer_info: "Інформація",
    footer_services: "Послуги",
    footer_cities: "Регіон роботи",
    footer_privacy: "Політика конфіденційності",
    footer_terms: "Умови надання послуг",
    footer_partner: "Співпраця та бізнес",
    footer_rights: "Усі права захищено.",

    // Global / UI
    skip_link: "Перейти до основного контенту",
    nav_call: "Зателефонувати",
    close: "Закрити",

    // Home Sections
    // Regions
    region_kern: "Основна зона обслуговування",
    region_utrecht: "Регіон Утрехт",
    region_gooi: "Гой та Емланд",
    region_gelderland: "Гелдерланд",

    // Page Specific
    city_hero_title: "Підрядник у {city}",
    city_hero_sub: "Будівельні, ремонтні роботи та обслуговування в {city} та околицях. Замовте пропозицію без зобов'язань.",
    city_services_eyebrow: "Послуги в {city}",
    city_services_title: "Наші роботи в {city}",
    city_seo_title: "Чому обирають Bouwvast у {city}?",
    city_seo_p1: "Ви живете в {city} або маєте тут комерційну нерухомість і шукаєте надійного підрядника для ремонту, санвузла, малярних робіт чи обслуговування? Bouwvast пропонує повний комплекс професійних послуг під одним дахом.",
    city_seo_p2: "Ви заздалегідь отримуєте детальну пропозицію з чіткими домовленостями щодо графіка та ціни.",
    city_faq_title: "Часті запитання про {city}",
    city_quote_title: "Кошторис у {city}",
    city_quote_sub: "Без зобов'язань · коротко опишіть проєкт.",
    city_faq_1_q: "Чи працює Bouwvast також у {city}?",
    city_faq_1_a: "Вкажіть у запиті, що йдеться про {city}, і ми повідомимо, чи можемо виконати там ваш проєкт.",
    city_faq_2_q: "Як швидко ви можете приїхати для огляду?",
    city_faq_2_a: "Це залежить від графіка та типу робіт. Після запиту ми узгодимо з вами час огляду.",
    city_faq_3_q: "Чи однакові тарифи в усіх муніципалітетах?",
    city_faq_3_a: "Можливі витрати на виїзд завжди заздалегідь зазначаються в пропозиції.",
    city_faq_4_q: "Чи отримую я гарантію на роботи в моєму будинку?",
    city_faq_4_a: "Гарантійні умови зазначені в пропозиції. Крім того, у вас завжди є передбачені законом права щодо дефектів.",

    service_hero_suffix: " у вашому регіоні",
    service_includes_eyebrow: "Що входить",
    service_includes_title: "Роботи, які ми виконуємо",
    service_process_eyebrow: "Підхід",
    service_process_title: "Як ми працюємо",
    service_area_eyebrow: "Зона робіт",
    service_area_title: "{service} у вашому регіоні",
    service_area_desc: "Перегляньте населені пункти в нашій зоні роботи або вкажіть своє місто в запиті.",
    service_quote_title: "Безкоштовний кошторис",
    service_quote_sub: "Замовте орієнтовний розрахунок вартості для послуги {service} прямо зараз.",
    service_related_eyebrow: "Дізнатися більше",
    service_related_title: "Інші послуги від Bouwvast",


    // Service Intros & Includes
    svc_renovation_intro: "Від однієї кімнати до повної реконструкції будинку під ключ. Ми супроводжуємо ваш ремонт від демонтажу до здачі, з єдиним контактом, чітким графіком і фіксованими цінами.",
    svc_renovation_inc_1: "Комплексний ремонт будинку та перепланування",
    svc_renovation_inc_2: "Демонтаж несучих стін та сталеві балки",
    svc_renovation_inc_3: "Ізоляція підлоги, стяжка та тепла підлога",
    svc_renovation_inc_4: "Стелі, штукатурка та чистове оздоблення",
    svc_renovation_inc_5: "Здача під ключ з вивозом будівельного сміття",

    svc_bathroom_intro: "Спеціаліст з комплексного ремонту ванних кімнат і кухонь. Від прокладання труб та гідроізоляції до укладання великоформатної плитки та монтажу елітної сантехніки.",
    svc_bathroom_inc_1: "Повний ремонт ванної кімнати та душових зон",
    svc_bathroom_inc_2: "Штроблення труб (вода, каналізація, електрика)",
    svc_bathroom_inc_3: "Укладання великоформатної плитки та точне вирівнювання",
    svc_bathroom_inc_4: "Професійний монтаж та підключення кухонь",
    svc_bathroom_inc_5: "Санітарне герметизування, стійке до плісняви",

    svc_finishing_intro: "Гладка штукатурка та повне оздоблення для ремонту та новобудов. Дзеркально-гладка штукатурка під фарбування, перегородки та підвісні стелі.",
    svc_finishing_inc_1: "Штукатурка під фарбування (дзеркально-гладка)",
    svc_finishing_inc_2: "Штукатурка під шпалери та поклейка склополотна",
    svc_finishing_inc_3: "Гіпсокартонні перегородки на металевому профілі та ізоляція",
    svc_finishing_inc_4: "Гіпсокартонні стелі з вбудованими світильниками",
    svc_finishing_inc_5: "Чистове оздоблення дверних та віконних отворів",

    svc_painting_intro: "Професійне внутрішнє та зовнішнє фарбування професійними системами. Рівні стіни, сатиновий лак на віконних рамах та ретельне усунення гниття деревини.",
    svc_painting_inc_1: "Безповітряне фарбування та ручне фарбування стін",
    svc_painting_inc_2: "Лакування віконних рам, вікон та міжкімнатних дверей",
    svc_painting_inc_3: "Зовнішнє фарбування та обробка фасадів",
    svc_painting_inc_4: "Відновлення гнилої деревини двокомпонентною епоксидною смолою",
    svc_painting_inc_5: "Знижена ставка ПДВ 9% для відповідних робіт",

    svc_carpenter_intro: "Досвідчені теслярі для виготовлення дерев'яних конструкцій на замовлення, навішування міжкімнатних дверей, заміни віконних рам та оздоблення мансард.",
    svc_carpenter_inc_1: "Встановлення дерев'яних та пластикових віконних рам",
    svc_carpenter_inc_2: "Навішування міжкімнатних та вхідних дверей",
    svc_carpenter_inc_3: "Вбудовані шафи на замовлення та кінотеки",
    svc_carpenter_inc_4: "Оздоблення мансардних вікон та горищ",
    svc_carpenter_inc_5: "Монтаж дерев'яних підлог та плінтусів",

    svc_facade_intro: "Екологічне відновлення та обслуговування зовнішньої оболонки вашого будинку. Розшивка швів, ремонт цегляної кладки, очищення фасадів та зовнішнє утеплення.",
    svc_facade_inc_1: "Розшивка та оновлення швів",
    svc_facade_inc_2: "Відновлення цегляної кладки та ремонт тріщин",
    svc_facade_inc_3: "Очищення та просочення фасадів",
    svc_facade_inc_4: "Оновлення вітрових дощок та водостоків",
    svc_facade_inc_5: "Зовнішнє утеплення стін та оздоблення",

    svc_assembly_intro: "Точні монтажні роботи для житлових та комерційних приміщень. Від шаф та розсувних стінок до дверей, освітлення та встановлення меблів.",
    svc_assembly_inc_1: "Монтаж кухонь та встановлення техніки",
    svc_assembly_inc_2: "Двері, розсувні системи та фурнітура",
    svc_assembly_inc_3: "Стінові панелі, акустичні панелі та кінотеки",
    svc_assembly_inc_4: "Монтаж мансардних вікон (Velux) та оздоблення",
    svc_assembly_inc_5: "Точне різання плінтусів та молдингів під кутом",

    svc_plumber_intro: "Надійні сантехніки для прокладання труб під час ремонту, підключення сантехніки, теплої підлоги та усунення аварійних протікань.",
    svc_plumber_inc_1: "Перенесення водопровідних та каналізаційних труб",
    svc_plumber_inc_2: "Підключення душових трапів та вбудованих змішувачів",
    svc_plumber_inc_3: "Розподільники та труби теплої підлоги",
    svc_plumber_inc_4: "Виявлення протікань та їхнє негайне усунення",
    svc_plumber_inc_5: "Заміна радіаторів та налаштування центрального опалення",

    svc_maintenance_intro: "Роботи з обслуговування та ремонту вашого житла чи комплексу нерухомості — профілактично та професійно.",
    svc_maintenance_inc_1: "Усунення пошкоджень від вологи та штукатурення",
    svc_maintenance_inc_2: "Заміна дверних замків та фурнітури (SKG***)",
    svc_maintenance_inc_3: "Заміна пошкодженої плитки або плінтусів",
    svc_maintenance_inc_4: "Послуги з обслуговування для будинків та ОСББ",
    svc_maintenance_inc_5: "Усунення термінових пошкоджень за домовленістю",

    svc_general_intro: "У вас комбінований проєкт або специфічна робота з реконструкції? Ми працюємо разом з вами від етапу планування до здачі об'єкта в чистоті.",
    svc_general_inc_1: "Мультидисциплінарні реконструкції",
    svc_general_inc_2: "Особисті будівельні консультації та огляд на місці",
    svc_general_inc_3: "Прозорий розрахунок без прихованих витрат",
    svc_general_inc_4: "Фіксований графік з одним координатором робіт",
    nav_home: "Головна",
    link_more: "Детальніше",
    privacy_meta_desc: "Як Bouwvast обробляє дані, які ви надсилаєте через форму запиту.",
    terms_meta_desc: "Які умови застосовуються до пропозицій і замовлень Bouwvast.",
    notfound_title: "Сторінку не знайдено",
    notfound_sub: "Цієї сторінки не існує (більше). Оберіть, куди перейти далі.",
    kb_dutch_only: "Наразі наші статті доступні лише нідерландською мовою.",
    kb_read_article: "Читати статтю",
    kb_tips_title: "Поради",
    kb_disclaimer: "Ця стаття містить загальну інформацію. Наведені суми та правила орієнтовні й можуть змінюватися; це не пропозиція. Податкові правила перевіряйте в Belastingdienst.",
    kb_more_articles: "Більше статей",
    legal_dutch_only: "Цей текст доступний лише нідерландською мовою; чинною є нідерландська версія.",
    how_1_desc_form: "Коротко опишіть свій проєкт у формі запиту, за бажанням — з фото.",
    est_tab_1: "Тип робіт",
    est_tab_2: "Обсяг",
    est_tab_3: "Якість",
    est_area: "Площа",
    est_less: "Менше",
    est_more: "Більше",
    est_opt_demo_desc: "Демонтаж і вивезення старого оздоблення",
    est_opt_mat_desc: "Ми закуповуємо та доставляємо матеріали",
    est_extra_demo: "демонтаж і вивезення",
    est_extra_mat: "матеріали",
    est_per_unit: "≈ {min} – {max} за м² · з ПДВ",
    est_sum_work: "Роботи",
    est_sum_area: "Площа",
    est_sum_quality: "Якість",
    est_sum_extras: "Додатково",
    est_none: "Немає",
    est_apply_note: "Розрахунок автоматично додається до запиту.",
    est_applied: "Розрахунок додано до форми запиту.",
    est_desc_seed: "Прошу надіслати пропозицію: {service}, близько {qty} м², якість «{tier}»{extras}.",
    est_desc_extras: ", включно з: {extras}",
    est_tip_wa: "Порада: надішліть фото приміщення у WhatsApp для точнішої оцінки.",
    est_tip_form: "Порада: додайте фото приміщення до запиту для точнішої оцінки.",
    est_wa_btn: "Фото у WhatsApp",
    est_wa_msg: "Вітаю, Bouwvast! Я скористався калькулятором ({summary}) і хочу надіслати фото для оцінки.",
    est_form_btn: "Додати фото",
    ba_slider: "Порівняти до і після",
    ba_value: "До: {before}%, після: {after}%",
    ba_choose: "Оберіть приклад",
    ba_impression: "Ілюстрація",
    ba_impression_note: "Ілюстративні зображення: так може виглядати подібний ремонт.",
    ba_scope: "Роботи",
    ba_service_link: "Переглянути послугу",
    area_eyebrow: "Зона роботи та доступність",
    area_title: "Перевірте, чи працює Bouwvast у вашому регіоні",
    area_desc: "Ми виконуємо комплексні ремонти, штукатурні роботи та ремонт ванних кімнат у центральних Нідерландах, регіоні Утрехт, Гої та околицях.",
    area_free_survey: "Огляд на об'єкті — без плати за виїзд.",
    area_label: "Поштовий індекс або місто",
    area_placeholder: "Напр. 3811 або Amersfoort",
    area_btn: "Перевірити",
    area_quick: "Швидка перевірка:",
    area_ok_title: "Чудово: {place} входить у нашу зону роботи",
    area_ok_text: "Надішліть запит без зобов'язань — ми особисто підтвердимо терміни та можливості.",
    area_unknown_title: "Ми не можемо одразу підтвердити {place}",
    area_unknown_text: "Вкажіть своє місто в запиті, і ми особисто повідомимо, чи зможемо виконати ваш проєкт.",
    area_invalid: "Введіть поштовий індекс (4 цифри) або місто.",
    area_prefilled: "Ваше місто ми заповнимо автоматично.",
    area_city_link: "Детальніше про {city}",
    area_regions: "Наші регіони",
    nudge_wa_title: "Є питання? Напишіть нам",
    nudge_wa_msg: "Вітаю, Bouwvast! У мене питання щодо ремонту.",
    nudge_quote_title: "Плануєте ремонт?",
    nudge_quote_text: "Опишіть проєкт кількома реченнями та отримайте зрозумілу детальну пропозицію.",
    nudge_close: "Закрити",
    hero_cta_calc: "Розрахувати орієнтовну ціну",
    est_show_result: "Переглянути орієнтовну ціну",
  },

  ru: {
    // Navigation
    nav_services: "Услуги",
    nav_projects: "Проекты",
    nav_area: "Зона работ",
    nav_kennisbank: "База знаний",
    kb_page_title: "База знаний",
    kb_page_sub:
      "Практические руководства и общая информация для вашего ремонта.",
    nav_contact: "Контакты",
    nav_cta: "Запросить предложение",
    nav_business: "Для бизнеса",
    btn_next: "Следующий шаг",
    btn_back: "Назад",
    btn_submit_request: "Отправить заявку",

    // Hero
    hero_label: "Строительство · ремонт · отделка — регион Амерсфорт",
    hero_title: "Строительство, ремонт и отделка.",
    hero_title_accent: "От идеи к безупречному результату.",
    hero_sub:
      "Строительные, ремонтные и отделочные работы для жилья и бизнеса. Опишите свои планы и получите понятное, детальное предложение.",
    hero_cta_primary: "Запросить предложение",
    hero_trust_1: "Запрос без обязательств",
    hero_trust_2: "Детальная смета заранее",
    hero_trust_3: "Личный контакт",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Есть вопросы по ремонту или ориентировочной цене? Напишите нам — можно с фото помещения.",
    nudge_wa_btn: "Написать в WhatsApp",
    nudge_estimator_tip:
      "Совет: добавьте к запросу фото помещения — так мы сможем ответить точнее.",

    // Stats

    // Estimator
    est_eyebrow: "Мгновенная оценка",
    est_title: "Рассчитайте ориентировочную стоимость",
    est_sub:
      "Выберите тип работ и площадь — и сразу увидите ориентировочную стоимость.",
    est_step_1: "Выберите тип работ",
    est_step_2: "Какова площадь помещения?",
    est_step_3: "Выберите уровень качества",
    est_tier_std: "Стандарт",
    est_tier_std_desc: "Надёжное базовое качество",
    est_tier_prem: "Премиум",
    est_tier_prem_desc: "Качественные материалы известных брендов",
    est_tier_lux: "Люкс / дизайн",
    est_tier_lux_desc: "Отделка высокого класса",
    est_opt_demo: "С демонтажем и вывозом",
    est_opt_mat: "С материалами",
    est_est_price: "Ориентировочная стоимость",
    est_apply_btn: "Запросить предложение по этому расчёту",
    est_disclaimer:
      "Ориентировочный расчёт с НДС, не является предложением. Окончательная цена — после осмотра на объекте.",

    // Services section & pages
    services_label: "Наши направления",
    services_title: "Чем Bouwvast может вам помочь?",
    services_sub:
      "Посмотрите по направлениям, что мы можем для вас сделать и что входит в работы.",
    services_all: "Все услуги",
    more_info: "Подробнее об услуге",

    // Service names & descriptions
    svc_renovation: "Комплексный ремонт жилья",
    svc_renovation_desc:
      "Полный или частичный ремонт домов и коммерческих помещений «под ключ».",
    svc_finishing: "Штукатурка и отделка",
    svc_finishing_desc:
      "Идеально гладкая штукатурка под покраску, перегородки из гипсокартона и потолки.",
    svc_painting: "Малярные работы (интерьер и фасад)",
    svc_painting_desc:
      "Профессиональная безвоздушная покраска стен, лакировка окон и дверей со сниженным НДС 9%.",
    svc_facade: "Фасадные и каменные работы",
    svc_facade_desc:
      "Обновление швов, ремонт кирпичной кладки, гидрофобизация и утепление фасадов.",
    svc_assembly: "Монтаж и установка",
    svc_assembly_desc:
      "Точная установка кухонь, дверей, встроенных шкафов и элементов интерьера.",
    svc_maintenance: "Обслуживание и ремонт",
    svc_maintenance_desc:
      "Мелкий и крупный ремонт, устранение сырости и плановое обслуживание недвижимости.",
    svc_bathroom: "Ванные комнаты и санузлы",
    svc_bathroom_desc:
      "Полный ремонт ванных, душевые трапы, крупноформатная плитка и монтаж сантехники.",
    svc_carpenter: "Плотник",
    svc_carpenter_desc:
      "Оконные и дверные коробки, навеска дверей, встроенные шкафы и столярная отделка.",
    svc_plumber: "Сантехник",
    svc_plumber_desc:
      "Трубопроводы, подключение сантехники, тёплый пол и устранение протечек.",
    svc_general: "Общестроительные работы",
    svc_general_desc:
      "Мультидисциплинарные строительные проекты от проектирования до чистовой сдачи.",

    // Before/After
    ba_label: "Разница",
    ba_title: "До и после: как это может выглядеть",
    ba_sub:
      "Потяните ползунок, чтобы увидеть разницу до и после ремонта.",
    ba_before: "До",
    ba_after: "После",
    ba_hint: "Потяните, чтобы сравнить",

    // Audience

    // How it works
    how_label: "Процесс",
    how_title: "4 шага к качественному ремонту",
    how_cta: "Запросить предложение",
    how_1_title: "Запрос без обязательств",
    how_1_desc:
      "Опишите задачу через форму или мгновенно рассчитайте примерную стоимость в калькуляторе.",
    how_2_title: "Осмотр и консультация",
    how_2_desc:
      "Обсуждаем ваши пожелания и при необходимости планируем осмотр на объекте.",
    how_3_title: "Прозрачная смета",
    how_3_desc:
      "Вы получаете детализированное предложение с фиксированными сроками и стоимостью.",
    how_4_title: "Качественная сдача",
    how_4_desc:
      "Работы выполняются согласно договорённостям в предложении и сдаются вместе с вами.",

    // Reviews

    // Pricing

    // Founder Trust Card

    // Area & City Page
    area_page_title: "Зона обслуживания и города",
    area_page_sub:
      "Мы работаем в регионе вокруг Амерсфорта. Вашего города нет в списке? Просто спросите нас.",
    area_places: "городов",
    city_page_title: "Подрядчик и ремонт в г.",

    // Projects Page
    projects_title: "Проекты",
    projects_sub: "Здесь мы показываем собственные проекты, опубликованные с согласия наших заказчиков.",

    // About Page

    // Business Page
    b2b_page_title: "Для бизнеса и партнёров",
    b2b_page_sub:
      "Партнёр по выполнению работ для подрядчиков, кухонных салонов, объединений собственников и управляющих недвижимостью.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Частые вопросы о ремонте",
    faq_1_q: "Включают ли цены НДС?",
    faq_1_a: "В предложении всегда чётко указано, какая ставка НДС применяется. Для некоторых работ в жилье старше 2 лет (например, покраска и штукатурка) может действовать сниженная ставка 9%.",
    faq_1b_q: "Какие виды работ вы выполняете?",
    faq_1b_a:
      "Мы выполняем полный комплекс: ремонт жилья, санузлы, штукатурку, покраску, столярные работы, сантехнику, фасады и обслуживание.",
    faq_2_q: "Что делать, если во время ремонта обнаружатся скрытые дефекты?",
    faq_2_a: "Прозрачность - наш приоритет. Если мы обнаружим непредвиденные проблемы (например, гниение древесины или протечки труб), мы немедленно обсудим это с вами. Мы предложим решение и цену до того, как понесем дополнительные расходы. Никаких сюрпризов.",
    faq_2b_q: "Работаете ли вы с компаниями?",
    faq_2b_a:
      "Да, к нам могут обращаться частные лица, подрядчики, объединения собственников (VvE) и управляющие недвижимостью.",
    faq_3_q: "В каких регионах вы работаете?",
    faq_3_a: "Мы работаем в регионе вокруг Амерсфорта. Укажите свой город в запросе, и мы сообщим, можем ли взяться за ваш проект.",
    faq_4_q: "Обязывает ли меня к чему-то расчет сметы?",
    faq_4_a:
      "Да. Запрос через сайт ни к чему не обязывает, пока вы не подпишете предложение.",

    // Form & Modals
    form_title: "Запросите предложение",
    form_sub: "Опишите свой проект. Мы свяжемся с вами, чтобы обсудить возможности.",
    form_name: "Ваше имя",
    form_phone: "Номер телефона",
    form_email: "Электронная почта",
    form_city: "Город или индекс",
    form_desc: "Опишите ваш проект и пожелания",
    form_photos: "Добавить фото",
    form_optional: "опционально",
    form_photos_selected: "Выбрано {n} фото",
    form_privacy:
      "Мы используем ваши данные только для ответа на этот запрос.",
    form_success_title: "Запрос получен",
    form_success_sub:
      "Спасибо за запрос. Мы свяжемся с вами как можно скорее.",
    form_sending: "Отправляем…",
    form_error_title: "Заявку не удалось отправить",
    form_error_retry: "Попробовать ещё раз",
    form_error_whatsapp: "Через WhatsApp",
    form_error_email: "По электронной почте",
    form_error_call: "Позвонить",
    form_error_subject: "Запрос сметы",
    form_photos_too_big:
      "Фотографии вместе слишком большие, чтобы отправить их с заявкой. Сама заявка отправлена — пришлите фото через WhatsApp или по почте.",

    // Wizard Modal steps

    // CTA
    cta_sub:
      "Запросите предложение без обязательств и кратко опишите свои планы.",
    cta_btn: "Запросить предложение",

    // Footer
    footer_desc:
      "Строительные, ремонтные и отделочные работы в регионе Амерсфорт с чёткими договорённостями заранее.",
    footer_info: "Информация",
    footer_services: "Услуги",
    footer_cities: "Регион работы",
    footer_privacy: "Политика конфиденциальности",
    footer_terms: "Условия использования",
    footer_partner: "Сотрудничество и бизнес",
    footer_rights: "Все права защищены.",

    // Global / UI
    skip_link: "Перейти к основному контенту",
    nav_call: "Позвонить",
    close: "Закрыть",

    // Home Sections
    // Regions
    region_kern: "Основная зона обслуживания",
    region_utrecht: "Регион Утрехт",
    region_gooi: "Гой и Эмланд",
    region_gelderland: "Гелдерланд",

    // Page Specific
    city_hero_title: "Подрядчик в г. {city}",
    city_hero_sub: "Строительные, ремонтные работы и обслуживание в {city} и окрестностях. Запросите предложение без обязательств.",
    city_services_eyebrow: "Услуги в г. {city}",
    city_services_title: "Наши работы в г. {city}",
    city_seo_title: "Почему выбирают Bouwvast в г. {city}?",
    city_seo_p1: "Вы живете в г. {city} или у вас здесь коммерческая недвижимость, и вы ищете надежного подрядчика для ремонта, санузла, малярных работ или обслуживания? Bouwvast предлагает полный комплекс профессиональных услуг под одной крышей.",
    city_seo_p2: "Вы заранее получаете детальное предложение с чёткими договорённостями о графике и цене.",
    city_faq_title: "Частые вопросы о г. {city}",
    city_quote_title: "Смета в г. {city}",
    city_quote_sub: "Без обязательств · кратко опишите проект.",
    city_faq_1_q: "Работает ли Bouwvast также в г. {city}?",
    city_faq_1_a: "Укажите в запросе, что речь идёт о {city}, и мы сообщим, можем ли выполнить там ваш проект.",
    city_faq_2_q: "Как быстро вы можете приехать для осмотра?",
    city_faq_2_a: "Это зависит от графика и типа работ. После запроса мы согласуем с вами время осмотра.",
    city_faq_3_q: "Одинаковы ли тарифы во всех муниципалитетах?",
    city_faq_3_a: "Возможные расходы на выезд всегда заранее указываются в предложении.",
    city_faq_4_q: "Получаю ли я гарантию на работы в моем доме?",
    city_faq_4_a: "Гарантийные условия указаны в предложении. Кроме того, у вас всегда есть предусмотренные законом права в случае дефектов.",
    
    service_hero_suffix: " в вашем регионе",
    service_includes_eyebrow: "Что сюда входит",
    service_includes_title: "Работы, которые мы выполняем",
    service_process_eyebrow: "Подход",
    service_process_title: "Как мы работаем",
    service_area_eyebrow: "Зона работ",
    service_area_title: "{service} в вашем регионе",
    service_area_desc: "Посмотрите населённые пункты в нашей зоне работы или укажите свой город в запросе.",
    service_quote_title: "Бесплатная смета",
    service_quote_sub: "Запросите ориентировочный расчет стоимости на услугу {service} прямо сейчас.",
    service_related_eyebrow: "Узнать больше",
    service_related_title: "Другие услуги от Bouwvast",
    

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
    svc_bathroom_inc_5: "Санитарная герметизация, устойчивая к плесени",

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

    svc_maintenance_intro: "Работы по обслуживанию и ремонту вашего жилья или комплекса недвижимости — профилактически и профессионально.",
    svc_maintenance_inc_1: "Устранение повреждений от влаги и оштукатуривание",
    svc_maintenance_inc_2: "Замена дверных замков и фурнитуры (SKG***)",
    svc_maintenance_inc_3: "Замена поврежденной плитки или плинтусов",
    svc_maintenance_inc_4: "Услуги по обслуживанию для домов и ТСЖ",
    svc_maintenance_inc_5: "Устранение срочных повреждений по договорённости",

    svc_general_intro: "У вас комбинированный проект или специфическая работа по реконструкции? Мы думаем вместе с вами от этапа проектирования до сдачи объекта в чистоте.",
    svc_general_inc_1: "Мультидисциплинарные реконструкции",
    svc_general_inc_2: "Личные строительные консультации и осмотр на месте",
    svc_general_inc_3: "Прозрачный расчет без скрытых расходов",
    svc_general_inc_4: "Фиксированный график с одним координатором работ",
    nav_home: "Главная",
    link_more: "Подробнее",
    privacy_meta_desc: "Как Bouwvast обрабатывает данные, которые вы отправляете через форму запроса.",
    terms_meta_desc: "Какие условия применяются к предложениям и заказам Bouwvast.",
    notfound_title: "Страница не найдена",
    notfound_sub: "Этой страницы не существует (больше). Выберите, куда перейти дальше.",
    kb_dutch_only: "Пока наши статьи доступны только на нидерландском языке.",
    kb_read_article: "Читать статью",
    kb_tips_title: "Советы",
    kb_disclaimer: "Эта статья содержит общую информацию. Указанные суммы и правила ориентировочные и могут меняться; это не предложение. Налоговые правила проверяйте в Belastingdienst.",
    kb_more_articles: "Больше статей",
    legal_dutch_only: "Этот текст доступен только на нидерландском языке; действует нидерландская версия.",
    how_1_desc_form: "Кратко опишите свой проект в форме запроса, по желанию — с фото.",
    est_tab_1: "Тип работ",
    est_tab_2: "Объём",
    est_tab_3: "Качество",
    est_area: "Площадь",
    est_less: "Меньше",
    est_more: "Больше",
    est_opt_demo_desc: "Демонтаж и вывоз старой отделки",
    est_opt_mat_desc: "Мы закупаем и доставляем материалы",
    est_extra_demo: "демонтаж и вывоз",
    est_extra_mat: "материалы",
    est_per_unit: "≈ {min} – {max} за м² · с НДС",
    est_sum_work: "Работы",
    est_sum_area: "Площадь",
    est_sum_quality: "Качество",
    est_sum_extras: "Дополнительно",
    est_none: "Нет",
    est_apply_note: "Расчёт автоматически добавляется к запросу.",
    est_applied: "Расчёт добавлен в форму запроса.",
    est_desc_seed: "Прошу прислать предложение: {service}, около {qty} м², качество «{tier}»{extras}.",
    est_desc_extras: ", включая: {extras}",
    est_tip_wa: "Совет: отправьте фото помещения в WhatsApp для более точной оценки.",
    est_tip_form: "Совет: добавьте фото помещения к запросу для более точной оценки.",
    est_wa_btn: "Фото в WhatsApp",
    est_wa_msg: "Здравствуйте, Bouwvast! Я воспользовался калькулятором ({summary}) и хочу отправить фото для оценки.",
    est_form_btn: "Добавить фото",
    ba_slider: "Сравнить до и после",
    ba_value: "До: {before}%, после: {after}%",
    ba_choose: "Выберите пример",
    ba_impression: "Иллюстрация",
    ba_impression_note: "Иллюстративные изображения: так может выглядеть подобный ремонт.",
    ba_scope: "Работы",
    ba_service_link: "Посмотреть услугу",
    area_eyebrow: "Зона работы и доступность",
    area_title: "Проверьте, работает ли Bouwvast в вашем регионе",
    area_desc: "Мы выполняем комплексный ремонт, штукатурные работы и ремонт ванных комнат в центральных Нидерландах, регионе Утрехт, Гое и окрестностях.",
    area_free_survey: "Осмотр на объекте — без оплаты выезда.",
    area_label: "Почтовый индекс или город",
    area_placeholder: "Напр. 3811 или Amersfoort",
    area_btn: "Проверить",
    area_quick: "Быстрая проверка:",
    area_ok_title: "Отлично: {place} входит в нашу зону работы",
    area_ok_text: "Отправьте запрос без обязательств — мы лично подтвердим сроки и возможности.",
    area_unknown_title: "Мы не можем сразу подтвердить {place}",
    area_unknown_text: "Укажите свой город в запросе, и мы лично сообщим, сможем ли выполнить ваш проект.",
    area_invalid: "Введите почтовый индекс (4 цифры) или город.",
    area_prefilled: "Ваш город мы заполним автоматически.",
    area_city_link: "Подробнее о {city}",
    area_regions: "Наши регионы",
    nudge_wa_title: "Есть вопросы? Напишите нам",
    nudge_wa_msg: "Здравствуйте, Bouwvast! У меня вопрос по ремонту.",
    nudge_quote_title: "Планируете ремонт?",
    nudge_quote_text: "Опишите проект в нескольких предложениях и получите понятное подробное предложение.",
    nudge_close: "Закрыть",
    hero_cta_calc: "Рассчитать ориентировочную цену",
    est_show_result: "Посмотреть ориентировочную цену",
  },
} as const

export default translations

export function t(lang: Lang, key: TranslationKey): string {
  const dict = translations[lang] || translations.nl
  return (dict[key] || translations.nl[key] || key) as string
}
