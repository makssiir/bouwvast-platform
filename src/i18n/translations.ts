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
    hero_label: "Verbouwen · renoveren · onderhoud aan huis",
    hero_title: "Meer ruimte.",
    hero_title_second: "Meer wooncomfort.",
    hero_title_accent: "Uw verbouwing begint hier.",
    hero_sub: "Een nieuwe badkamer of keuken, een uitbouw of uw hele woning vernieuwen. Vertel wat u wilt veranderen en werk met ons toe naar een duidelijke, gespecificeerde offerte.",
    hero_cta_primary: "Bespreek uw project",
    hero_trust_1: "Vrijblijvende aanvraag",
    hero_trust_2: "Gespecificeerde offerte vooraf",
    hero_trust_3: "Persoonlijk contact",

    // Project-first request flow and honest reassurance
    trust_short_1: "Vrijblijvend",
    trust_short_2: "Offerte vooraf",
    trust_short_3: "Persoonlijk",
    hero_inspiration: "Wooninspiratie · impressie",
    quote_project_first: "Eerst uw project. Contactgegevens pas bij de laatste stap.",
    quote_progress: "Stappen van uw aanvraag",
    quote_tab_1: "Project",
    quote_tab_2: "Details",
    quote_tab_3: "Contact",
    quote_step_count: "Stap {n} van 3",
    quote_question_1: "Wat wilt u aanpakken?",
    quote_question_2: "Vertel iets over uw plannen",
    quote_question_3: "Waar kunnen we u bereiken?",
    quote_hint_1: "Kies uw project om te beginnen. U hoeft nu nog geen gegevens in te vullen.",
    quote_hint_2: "Een globaal idee is genoeg. Afmetingen en foto's mogen ook later.",
    quote_hint_3: "Controleer uw project en laat uw contactgegevens achter. Pas hieronder verstuurt u uw aanvraag.",
    quote_other: "Andere klus of onderhoud",
    quote_choose_error: "Kies het soort project waarmee we u kunnen helpen.",
    quote_change: "Wijzigen",
    quote_new_request: "Nog een aanvraag doen",
    quote_summary: "Uw project",
    quote_continue: "Naar contact",
    quote_desc_placeholder: "Bijv. een nieuwe badkamer, meer leefruimte of een complete renovatie. Wat is voor u belangrijk?",
    quote_no_commitment: "Dit is een vrijblijvende aanvraag, geen opdracht.",
    quote_after_title: "Wat gebeurt er na uw aanvraag?",
    quote_decide_title: "U beslist of u verdergaat",
    quote_decide_text: "Bespreek de offerte en stel uw vragen. Een aanvraag verplicht u tot niets.",
    quote_js_required: "Schakel JavaScript in om de stappen te doorlopen en uw aanvraag te versturen.",
    ba_view: "Weergave van het voorbeeld",
    ba_compare: "Vergelijk",
    ba_project_prompt: "Ook plannen voor uw woning?",
    ba_project_cta: "Bespreek mijn project",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Vragen over uw verbouwing of richtprijs? Stuur ons gerust een bericht, ook met foto's van de ruimte.",
    nudge_wa_btn: "Start WhatsApp-chat",

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
    services_title: "Waarmee kan Huisklusdienst u helpen?",
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
    area_page_title: "Werkgebied: plaatsen door heel Nederland",
    area_page_sub:
      "Kies uw plaats voor lokale informatie en de klussen die we daar doen. Staat uw woonplaats er niet bij? Vul uw postcode in, dan bekijken we het persoonlijk.",
    area_places: "plaatsen",

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
    faq_3_q: "In welke plaatsen zijn jullie actief?",
    faq_3_a:
      "We nemen klussen aan in plaatsen door heel Nederland; op de pagina Werkgebied staan ze per provincie. Staat uw woonplaats er niet bij? Vermeld hem in de aanvraag, dan laten we u weten of we uw klus kunnen aannemen.",
    faq_4_q: "Kan ik eerst een vrijblijvende offerte aanvragen?",
    faq_4_a:
      "Ja. Een aanvraag via deze website is vrijblijvend: u zit nergens aan vast totdat u een offerte ondertekent.",

    // Form & Modals
    form_title: "Vraag een offerte aan",
    form_sub: "Kies uw project. We bespreken uw plannen en de mogelijkheden, zonder dat u ergens aan vastzit.",
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
      "Verbouwing, renovatie, onderhoud en reparaties aan huis, in plaatsen door heel Nederland, met duidelijke afspraken vooraf.",
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

    // Page Specific
    city_hero_title: "Klusbedrijf in {city}",
    city_hero_sub: "Verbouwing, renovatie, onderhoud en reparaties in {city}. Beschrijf uw klus en ontvang een duidelijke offerte.",
    city_services_eyebrow: "Diensten in {city}",
    city_services_title: "Waarmee kunnen we u helpen in {city}?",
    city_faq_title: "Veelgestelde vragen over {city}",
    city_quote_title: "Offerte aanvragen in {city}",
    city_quote_sub: "Beschrijf kort uw klus; we nemen contact met u op.",
    city_faq_1_q: "Welke klussen doet Huisklusdienst in {city}?",
    city_faq_1_a: "Van complete woningrenovaties, uitbouwen en dakkapellen tot een nieuwe badkamer of keuken, schilderwerk, timmerwerk, loodgieterswerk, onderhoud en reparaties. We nemen klussen aan in heel {city}, bijvoorbeeld in {districts}.",
    city_faq_2_q: "Hoe snel kan er iemand komen kijken in {city}?",
    city_faq_2_a: "Dat hangt af van de planning en het soort klus. Na uw aanvraag nemen we contact met u op en spreken we een moment af om de klus te bekijken.",
    city_faq_3_q: "Wat kost een klus in {city}?",
    city_faq_3_a: "Dat hangt af van de omvang, de materialen en de staat van de woning. U krijgt vooraf een gespecificeerde offerte, waarin eventuele reiskosten altijd staan. Voor een aantal klussen geeft de rekenhulp op de site alvast een richtprijs.",
    city_faq_4_q: "Heb ik een vergunning nodig voor mijn verbouwing in {city}?",
    city_faq_4_a: "Voor veel werk binnenshuis niet. Voor een uitbouw, een dakkapel aan de voorkant of werk aan een monument vaak wel. Met de vergunningcheck in het Omgevingsloket ziet u wat er voor uw adres geldt; bij de opname kijken we met u mee.",
    
    service_hero_suffix: " in uw regio",
    service_includes_eyebrow: "Wat valt hieronder",
    service_includes_title: "Werkzaamheden die wij verzorgen",
    service_process_eyebrow: "Aanpak",
    service_process_title: "Hoe wij te werk gaan",
    service_area_eyebrow: "Werkgebied",
    service_area_title: "{service} bij u in de buurt",
    service_area_desc: "Kies uw plaats voor lokale informatie, of vermeld uw woonplaats in de aanvraag.",
    service_quote_title: "Vrijblijvende offerte",
    service_quote_sub: "Vraag direct een prijsindicatie aan voor {service}.",
    service_related_eyebrow: "Verder kijken",
    service_related_title: "Andere diensten van Huisklusdienst",
    

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
    privacy_meta_desc: "Hoe Huisklusdienst omgaat met de gegevens die u via het offerteformulier verstuurt.",
    terms_meta_desc: "Welke voorwaarden gelden voor offertes en opdrachten van Huisklusdienst.",
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
    est_wa_msg: "Hallo Huisklusdienst, ik heb de rekentool gebruikt ({summary}) en stuur graag foto's voor een prijsindicatie.",
    est_form_btn: "Foto's toevoegen",
    ba_slider: "Vergelijk voor en na",
    ba_value: "Voor: {before}%, na: {after}%",
    ba_choose: "Kies een voorbeeld",
    ba_impression: "Impressie",
    ba_impression_note: "Dit zijn impressiebeelden, geen door Huisklusdienst uitgevoerde projecten.",
    ba_scope: "Werkzaamheden",
    ba_service_link: "Bekijk de dienst",
    area_eyebrow: "Werkgebied",
    area_title: "Vul uw postcode in en vertel ons wat er moet gebeuren",
    area_desc: "Van een lekkende kraan tot een complete renovatie of uitbouw: we nemen klussen aan in plaatsen door heel Nederland. Vul uw postcode of woonplaats in, kies de klus en laat weten hoe we u het best bereiken.",
    area_label: "Postcode of woonplaats",
    area_placeholder: "Bijv. 1012 AB of Utrecht",
    area_btn: "Verder",
    area_invalid: "Vul een postcode (bijv. 1012 AB) of woonplaats in.",
    nudge_wa_title: "Vragen? App ons",
    nudge_wa_msg: "Hallo Huisklusdienst, ik heb een vraag over mijn verbouwing.",
    nudge_quote_title: "Plannen voor een verbouwing?",
    nudge_quote_text: "Beschrijf uw project in een paar zinnen en ontvang een duidelijke, gespecificeerde offerte.",
    nudge_close: "Sluiten",
    hero_cta_calc: "Bereken uw richtprijs",
    est_show_result: "Bekijk uw richtprijs",
    word_and: "en",
    svc_extension: "Uitbouw & aanbouw",
    svc_extension_desc: "Meer woonruimte met een uitbouw of aanbouw: van fundering en constructie tot een afgewerkte ruimte.",
    svc_extension_intro: "Een uitbouw of aanbouw geeft uw woning meer ruimte zonder dat u hoeft te verhuizen. Vooraf zoeken we met u uit of er een omgevingsvergunning nodig is (dat kunt u ook zelf checken in het Omgevingsloket) en of er een constructieve berekening moet komen. Daarna verzorgen we het werk van fundering tot afwerking.",
    svc_extension_inc_1: "Uitbouw aan de achterzijde of zijkant",
    svc_extension_inc_2: "Fundering, vloer en constructie",
    svc_extension_inc_3: "Doorbraak naar de bestaande woning",
    svc_extension_inc_4: "Dak, kozijnen en isolatie",
    svc_extension_inc_5: "Afbouw: stucwerk, vloer en schilderwerk",
    svc_dormer: "Dakkapel & zolderverbouwing",
    svc_dormer_desc: "Een dakkapel plaatsen of de zolder verbouwen tot een volwaardige slaap- of werkkamer.",
    svc_dormer_intro: "Met een dakkapel en een verbouwde zolder wint u een volwaardige kamer onder het dak. Een dakkapel aan de achterkant is onder voorwaarden vaak vergunningvrij, aan de voorkant meestal niet; dat zoeken we vooraf met u uit. Daarna verzorgen we het werk, van dakkapel en isolatie tot trap, wanden en afwerking.",
    svc_dormer_inc_1: "Dakkapel plaatsen of vervangen",
    svc_dormer_inc_2: "Zolder isoleren en afwerken",
    svc_dormer_inc_3: "Vaste trap naar de zolder",
    svc_dormer_inc_4: "Wanden, knieschotten en bergruimte",
    svc_dormer_inc_5: "Dakramen en ventilatie",
    city_meta_desc: "Renovatie, badkamer en keuken, uitbouw, dakkapel en onderhoud in {city}, ook in {districts}. Beschrijf uw klus en ontvang een duidelijke offerte.",
    city_meta_desc_short: "Renovatie, badkamer en keuken, uitbouw, dakkapel en onderhoud in {city}. Beschrijf uw klus en ontvang een duidelijke offerte.",
    city_traits_eyebrow: "Wonen in {city}",
    city_traits_title: "Waar we rekening mee houden in {city}",
    city_districts_title: "Wijken en kernen",
    city_districts_note: "Staat uw wijk of kern er niet bij? Vermeld uw adres gewoon in de aanvraag.",
    city_faq_1_a_short: "Van complete woningrenovaties, uitbouwen en dakkapellen tot een nieuwe badkamer of keuken, schilderwerk, timmerwerk, loodgieterswerk, onderhoud en reparaties, in {city} en omgeving.",
    city_nearby_title: "Ook actief in de buurt van {city}",
    sc_meta_desc: "{Noun} in {city}, ook in {districts}? Beschrijf uw klus en ontvang een duidelijke, gespecificeerde offerte van Huisklusdienst.",
    sc_meta_desc_short: "{Noun} in {city}? Beschrijf uw klus en ontvang een duidelijke, gespecificeerde offerte van Huisklusdienst.",
    sc_lead: "{Noun} in {city}, bijvoorbeeld in {districts}? Beschrijf uw klus in een paar zinnen. We nemen contact met u op en u ontvangt vooraf een duidelijke, gespecificeerde offerte.",
    sc_about_title: "Zo pakken we het aan in {city}",
    sc_tips_eyebrow: "Lokale kennis",
    sc_tips_title: "Goed om te weten in {city}",
    sc_districts_title: "Waar we werken in {city}",
    sc_districts_text: "Onder meer in deze wijken en kernen. Staat de uwe er niet bij? Vermeld uw adres gewoon in de aanvraag.",
    sc_faq_cost_q: "Wat kost {noun} in {city}?",
    sc_faq_cost_a: "Dat hangt af van de omvang van de klus, de materialen en de staat van de woning. Na een opname krijgt u een gespecificeerde offerte, zodat u vooraf weet waar u aan toe bent. Eventuele reiskosten staan daar altijd in.",
    sc_faq_cost_a_calc: "Met de rekenhulp op deze pagina ziet u alvast een richtprijs.",
    sc_faq_start_q: "Hoe snel kunnen jullie beginnen in {city}?",
    sc_faq_start_a: "Dat hangt af van de planning en de omvang van de klus. Na uw aanvraag nemen we contact met u op, bekijken we de klus en spreken we samen een startdatum af.",
    sc_faq_districts_q: "Werken jullie ook in {districts}?",
    sc_faq_districts_a: "Ja, we nemen klussen aan in heel {city}, onder meer in {allDistricts}. Vermeld uw adres in de aanvraag, dan houden we bij de planning rekening met parkeren en bereikbaarheid.",
    sc_faq_permit_q: "Heb ik een vergunning nodig in {city}?",
    sc_faq_permit_a: "Voor veel werk binnenshuis niet. Voor bijvoorbeeld een uitbouw, een dakkapel aan de voorkant of een andere gevel kan dat wel. Met de vergunningcheck in het Omgevingsloket ziet u wat er voor uw adres geldt; bij de opname kijken we met u mee.",
    sc_faq_permit_monuments: "In {city} staan veel monumenten en beschermde stadsgezichten; daar is vaker een vergunning nodig, soms ook voor werk binnen.",
    sc_faq_vve_q: "Ik woon in een appartement in {city}. Waar moet ik op letten?",
    sc_faq_vve_a: "Voor werk aan gemeenschappelijke delen, zoals de gevel, het dak of de standleidingen, is vaak toestemming van de VvE nodig. Kijk ook in het huishoudelijk reglement, bijvoorbeeld voor werktijden en geluidsisolatie bij een nieuwe vloer. De planning stemmen we graag met de VvE af.",
    sc_other_title: "Andere klussen in {city}",
    sc_nearby_title: "{service} in de buurt van {city}",
    home_meta_title: "Klusbedrijf voor verbouwing, renovatie en onderhoud",
    home_meta_desc: "Verbouwing, renovatie, badkamer en keuken, uitbouw, dakkapel en onderhoud aan huis, in plaatsen door heel Nederland. Beschrijf uw klus en ontvang een duidelijke offerte.",
    area_cta_title: "Staat uw woonplaats er niet bij?",
    area_cta_text: "Beschrijf uw klus en vermeld uw woonplaats in de aanvraag. We laten u persoonlijk weten of we u kunnen helpen.",
    area_points: "Eén aanvraag voor kleine en grote klussen · U kiest zelf hoe we contact opnemen · Vrijblijvend",
    area_modal_title: "Waarmee kunnen we u helpen?",
    area_modal_sub: "Voor {place}. Kies de klus en laat uw gegevens achter. We nemen contact met u op en laten u persoonlijk weten of en wanneer we uw klus kunnen doen.",
    area_modal_service: "Wat wilt u laten doen?",
    area_modal_other: "Iets anders",
    area_modal_desc_label: "Korte omschrijving",
    area_modal_desc_placeholder: "Bijv. badkamer van 6 m² vernieuwen, inclusief tegelwerk",
    area_modal_desc_required: "Kies een klus of beschrijf kort wat er moet gebeuren.",
    area_modal_contact: "Hoe mogen we contact met u opnemen?",
    area_modal_pref_phone: "Bellen",
    area_modal_pref_whatsapp: "WhatsApp",
    area_modal_pref_email: "E-mail",
    area_modal_email_required: "Vul uw e-mailadres in als we u per e-mail mogen benaderen.",
    area_modal_submit: "Klus doorgeven",
    area_modal_success_title: "Bedankt, uw aanvraag is binnen",
    area_modal_success_text: "We nemen zo snel mogelijk contact met u op om de klus en de planning door te nemen.",
    area_modal_pref_label: "Contactvoorkeur",
    area_places_one: "plaats",
    area_places_few: "plaatsen",
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
    hero_label: "Building · renovation · home maintenance",
    hero_title: "More space.",
    hero_title_second: "A home that works.",
    hero_title_accent: "Let’s plan your renovation.",
    hero_sub: "A new bathroom or kitchen, an extension or a whole-home renovation. Tell us what you would like to change and work towards a clear, itemised quote.",
    hero_cta_primary: "Discuss your project",
    hero_trust_1: "No-obligation request",
    hero_trust_2: "Itemised quote up front",
    hero_trust_3: "Personal contact",

    // Project-first request flow and honest reassurance
    trust_short_1: "No obligation",
    trust_short_2: "Quote up front",
    trust_short_3: "Personal contact",
    hero_inspiration: "Home inspiration · illustration",
    quote_project_first: "Your project first. Contact details only in the last step.",
    quote_progress: "Steps in your request",
    quote_tab_1: "Project",
    quote_tab_2: "Details",
    quote_tab_3: "Contact",
    quote_step_count: "Step {n} of 3",
    quote_question_1: "What would you like to change?",
    quote_question_2: "Tell us about your plans",
    quote_question_3: "How can we reach you?",
    quote_hint_1: "Choose a project to get started. No personal details needed yet.",
    quote_hint_2: "A rough idea is enough. Measurements and photos can come later.",
    quote_hint_3: "Check your project and add your contact details. Only the button below sends your request.",
    quote_other: "Other work or maintenance",
    quote_choose_error: "Choose the type of project you need help with.",
    quote_change: "Change",
    quote_new_request: "Start another request",
    quote_summary: "Your project",
    quote_continue: "Contact details",
    quote_desc_placeholder: "For example, a new bathroom, more living space or a complete renovation. What matters to you?",
    quote_no_commitment: "This is a no-obligation enquiry, not an order.",
    quote_after_title: "What happens after your request?",
    quote_decide_title: "You decide whether to go ahead",
    quote_decide_text: "Review the quote and ask your questions. An enquiry does not commit you to anything.",
    quote_js_required: "Enable JavaScript to go through the steps and send your request.",
    ba_view: "Example view",
    ba_compare: "Compare",
    ba_project_prompt: "Have plans for your home too?",
    ba_project_cta: "Discuss my project",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Questions about your renovation or the indicative price? Send us a message, photos of the space are welcome too.",
    nudge_wa_btn: "Start WhatsApp chat",

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
    services_title: "How can Huisklusdienst assist your build?",
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
    area_page_title: "Service area: places across the Netherlands",
    area_page_sub:
      "Choose your town for local information and the jobs we do there. Your town not listed? Enter your postcode and we will look into it personally.",
    area_places: "places",

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
    faq_3_q: "Which places do you work in?",
    faq_3_a:
      "We take on jobs in places across the Netherlands; the Service area page lists them by province. Your town not listed? Mention it in your request and we will let you know whether we can take on your job.",
    faq_4_q: "Is requesting a quote free of obligation?",
    faq_4_a:
      "Yes. A request through this website is without obligation: nothing is binding until you sign a quote.",

    // Form & Modals
    form_title: "Request a quote",
    form_sub: "Choose your project. We will discuss your plans and the options, with no obligation to go ahead.",
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
      "Building work, renovation, maintenance and repairs for your home, in places across the Netherlands, with clear agreements in advance.",
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

    // Page Specific
    city_hero_title: "Renovation and home repairs in {city}",
    city_hero_sub: "Building work, renovation, maintenance and repairs in {city}. Describe your job and receive a clear quote.",
    city_services_eyebrow: "Services in {city}",
    city_services_title: "How can we help you in {city}?",
    city_faq_title: "Frequently asked questions about {city}",
    city_quote_title: "Request a quote in {city}",
    city_quote_sub: "Briefly describe your job; we will get in touch.",
    city_faq_1_q: "What jobs does Huisklusdienst take on in {city}?",
    city_faq_1_a: "From complete home renovations, extensions and dormers to a new bathroom or kitchen, painting, carpentry, plumbing, maintenance and repairs. We take on jobs throughout {city}, for example in {districts}.",
    city_faq_2_q: "How soon can someone come and take a look in {city}?",
    city_faq_2_a: "That depends on the schedule and the kind of job. After your request we get in touch and agree on a time to look at the job.",
    city_faq_3_q: "What does a job in {city} cost?",
    city_faq_3_a: "That depends on the scope, the materials and the condition of the home. You receive an itemised quote in advance, which always includes any travel costs. For several jobs, the calculator on the site gives you an indicative price first.",
    city_faq_4_q: "Do I need a permit for my renovation in {city}?",
    city_faq_4_a: "For much work indoors, no. For an extension, a dormer at the front or work on a listed building, often yes. The permit check in the Omgevingsloket shows what applies to your address; we go through it with you during the visit.",
    
    service_hero_suffix: " in your region",
    service_includes_eyebrow: "What's included",
    service_includes_title: "Work that we provide",
    service_process_eyebrow: "Approach",
    service_process_title: "How we work",
    service_area_eyebrow: "Service area",
    service_area_title: "{service} near you",
    service_area_desc: "Choose your town for local information, or mention it in your request.",
    service_quote_title: "Free quote",
    service_quote_sub: "Request a price indication for {service} now.",
    service_related_eyebrow: "Explore more",
    service_related_title: "Other services by Huisklusdienst",
    

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
    privacy_meta_desc: "How Huisklusdienst handles the data you send through the quote form.",
    terms_meta_desc: "Which terms apply to Huisklusdienst quotes and assignments.",
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
    est_wa_msg: "Hello Huisklusdienst, I used the calculator ({summary}) and would like to send photos for a price indication.",
    est_form_btn: "Add photos",
    ba_slider: "Compare before and after",
    ba_value: "Before: {before}%, after: {after}%",
    ba_choose: "Choose an example",
    ba_impression: "Illustration",
    ba_impression_note: "These are illustrative images, not projects carried out by Huisklusdienst.",
    ba_scope: "Work involved",
    ba_service_link: "View the service",
    area_eyebrow: "Service area",
    area_title: "Enter your postcode and tell us what needs doing",
    area_desc: "From a leaking tap to a complete renovation or extension: we take on jobs in places across the Netherlands. Enter your postcode or town, choose the job and tell us how best to reach you.",
    area_label: "Postcode or town",
    area_placeholder: "E.g. 1012 AB or Utrecht",
    area_btn: "Continue",
    area_invalid: "Enter a postcode (e.g. 1012 AB) or town.",
    nudge_wa_title: "Questions? Message us",
    nudge_wa_msg: "Hello Huisklusdienst, I have a question about my renovation.",
    nudge_quote_title: "Planning a renovation?",
    nudge_quote_text: "Describe your project in a few sentences and receive a clear, itemised quote.",
    nudge_close: "Close",
    hero_cta_calc: "Estimate your price",
    est_show_result: "See your estimate",
    word_and: "and",
    svc_extension: "Extensions",
    svc_extension_desc: "More living space with a rear or side extension: from foundations and structure to a finished room.",
    svc_extension_intro: "An extension gives your home more space without having to move. Before we start, we find out with you whether an environmental permit is needed (you can also check this yourself in the Omgevingsloket) and whether a structural calculation is required. Then we take care of the work, from foundations to finish.",
    svc_extension_inc_1: "Rear or side extension",
    svc_extension_inc_2: "Foundations, floor and structure",
    svc_extension_inc_3: "Opening into the existing house",
    svc_extension_inc_4: "Roof, window frames and insulation",
    svc_extension_inc_5: "Finishing: plastering, flooring and painting",
    svc_dormer: "Dormers & loft conversions",
    svc_dormer_desc: "Fitting a dormer or converting the loft into a proper bedroom or study.",
    svc_dormer_intro: "A dormer and a converted loft give you a proper room under the roof. A dormer at the rear is often permit-free under certain conditions, one at the front usually is not; we find this out with you in advance. Then we take care of the work, from the dormer and insulation to the stairs, walls and finishing.",
    svc_dormer_inc_1: "Fitting or replacing a dormer",
    svc_dormer_inc_2: "Insulating and finishing the loft",
    svc_dormer_inc_3: "Fixed staircase to the loft",
    svc_dormer_inc_4: "Walls, knee walls and storage space",
    svc_dormer_inc_5: "Roof windows and ventilation",
    city_meta_desc: "Renovation, bathrooms and kitchens, extensions, dormers and maintenance in {city}, including {districts}. Describe your job and receive a clear quote.",
    city_meta_desc_short: "Renovation, bathrooms and kitchens, extensions, dormers and maintenance in {city}. Describe your job and receive a clear quote.",
    city_traits_eyebrow: "Homes in {city}",
    city_traits_title: "What we take into account in {city}",
    city_districts_title: "Districts and villages",
    city_districts_note: "Your area not listed? Simply mention your address in your request.",
    city_faq_1_a_short: "From complete home renovations, extensions and dormers to a new bathroom or kitchen, painting, carpentry, plumbing, maintenance and repairs, in {city} and the surrounding area.",
    city_nearby_title: "Also working near {city}",
    sc_meta_desc: "{Noun} in {city}, including {districts}? Describe your job and receive a clear, itemised quote from Huisklusdienst.",
    sc_meta_desc_short: "{Noun} in {city}? Describe your job and receive a clear, itemised quote from Huisklusdienst.",
    sc_lead: "{Noun} in {city}, for example in {districts}? Describe your job in a few sentences. We will get in touch and you receive a clear, itemised quote in advance.",
    sc_about_title: "How we go about it in {city}",
    sc_tips_eyebrow: "Local knowledge",
    sc_tips_title: "Good to know in {city}",
    sc_districts_title: "Where we work in {city}",
    sc_districts_text: "Including these districts. Yours not listed? Simply mention your address in your request.",
    sc_faq_cost_q: "What does {noun} in {city} cost?",
    sc_faq_cost_a: "That depends on the scope of the job, the materials and the condition of the home. After a visit you receive an itemised quote, so you know where you stand in advance. Any travel costs are always included in it.",
    sc_faq_cost_a_calc: "The calculator on this page gives you an indicative price first.",
    sc_faq_start_q: "How soon can you start in {city}?",
    sc_faq_start_a: "That depends on the schedule and the size of the job. After your request we get in touch, look at the job and agree on a start date together.",
    sc_faq_districts_q: "Do you also work in {districts}?",
    sc_faq_districts_a: "Yes, we take on jobs throughout {city}, including {allDistricts}. Mention your address in your request and we will take parking and access into account when planning.",
    sc_faq_permit_q: "Do I need a permit in {city}?",
    sc_faq_permit_a: "For much work indoors, no. For an extension, a dormer at the front or changes to the facade, it may be. The permit check in the Omgevingsloket shows what applies to your address; we go through it with you during the visit.",
    sc_faq_permit_monuments: "{city} has many listed buildings and conservation areas, where a permit is needed more often, sometimes also for indoor work.",
    sc_faq_vve_q: "I live in an apartment in {city}. What should I keep in mind?",
    sc_faq_vve_a: "Work on shared parts such as the facade, the roof or the main pipes often needs permission from the owners' association (VvE). Also check the house rules, for example on working hours and sound insulation under a new floor. We are happy to coordinate the schedule with the VvE.",
    sc_other_title: "Other jobs in {city}",
    sc_nearby_title: "{service} near {city}",
    home_meta_title: "Contractor for building work, renovation and maintenance",
    home_meta_desc: "Building work, renovation, bathrooms and kitchens, extensions, dormers and home maintenance in places across the Netherlands. Describe your job and receive a clear quote.",
    area_cta_title: "Is your town not listed?",
    area_cta_text: "Describe your job and mention your town in the request. We will let you know personally whether we can help.",
    area_points: "One request for small and large jobs · You choose how we contact you · No obligation",
    area_modal_title: "How can we help?",
    area_modal_sub: "For {place}. Choose the job and leave your details. We will get in touch and let you know personally whether and when we can do your job.",
    area_modal_service: "What would you like done?",
    area_modal_other: "Something else",
    area_modal_desc_label: "Short description",
    area_modal_desc_placeholder: "E.g. renew a 6 m² bathroom, including tiling",
    area_modal_desc_required: "Choose a job or briefly describe what needs doing.",
    area_modal_contact: "How should we contact you?",
    area_modal_pref_phone: "Phone call",
    area_modal_pref_whatsapp: "WhatsApp",
    area_modal_pref_email: "Email",
    area_modal_email_required: "Enter your email address if you would like us to email you.",
    area_modal_submit: "Send my request",
    area_modal_success_title: "Thank you, we have received your request",
    area_modal_success_text: "We will get in touch as soon as we can to go through the job and the schedule.",
    area_modal_pref_label: "Contact preference",
    area_places_one: "place",
    area_places_few: "places",
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
    hero_label: "Будівництво · ремонт · обслуговування житла",
    hero_title: "Більше простору.",
    hero_title_second: "Більше комфорту.",
    hero_title_accent: "Почнімо з вашого задуму.",
    hero_sub: "Нова ванна чи кухня, прибудова або повне оновлення житла. Розкажіть, що хочете змінити, щоб ми могли підготувати зрозумілий детальний кошторис.",
    hero_cta_primary: "Обговорити мій проєкт",
    hero_trust_1: "Запит без зобов'язань",
    hero_trust_2: "Детальний кошторис заздалегідь",
    hero_trust_3: "Особистий контакт",

    // Project-first request flow and honest reassurance
    trust_short_1: "Без зобов'язань",
    trust_short_2: "Кошторис до робіт",
    trust_short_3: "Особистий контакт",
    hero_inspiration: "Інтер’єр для натхнення · ілюстрація",
    quote_project_first: "Спочатку ваш проєкт. Контактні дані — лише на останньому кроці.",
    quote_progress: "Кроки вашого запиту",
    quote_tab_1: "Проєкт",
    quote_tab_2: "Деталі",
    quote_tab_3: "Контакти",
    quote_step_count: "Крок {n} із 3",
    quote_question_1: "Що ви плануєте змінити?",
    quote_question_2: "Розкажіть про ваші плани",
    quote_question_3: "Як з вами зв'язатися?",
    quote_hint_1: "Виберіть вид робіт. Зараз не потрібно вказувати особисті дані.",
    quote_hint_2: "Достатньо загального задуму. Розміри та фото можна додати пізніше.",
    quote_hint_3: "Перевірте опис проєкту та залиште контакти. Запит буде надіслано лише кнопкою нижче.",
    quote_other: "Інші роботи чи обслуговування",
    quote_choose_error: "Виберіть вид робіт, з якими вам потрібна допомога.",
    quote_change: "Змінити",
    quote_new_request: "Створити новий запит",
    quote_summary: "Ваш проєкт",
    quote_continue: "До контактів",
    quote_desc_placeholder: "Наприклад: нова ванна кімната, більше житлового простору чи повний ремонт. Що для вас важливо?",
    quote_no_commitment: "Це запит без зобов'язань, а не замовлення робіт.",
    quote_after_title: "Що буде після вашого запиту?",
    quote_decide_title: "Рішення залишається за вами",
    quote_decide_text: "Обговоріть кошторис і поставте запитання. Надсилання запиту ні до чого вас не зобов'язує.",
    quote_js_required: "Увімкніть JavaScript, щоб пройти кроки та надіслати запит.",
    ba_view: "Перегляд прикладу",
    ba_compare: "Порівняти",
    ba_project_prompt: "Теж плануєте оновити житло?",
    ba_project_cta: "Обговорити мій проєкт",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Маєте питання щодо ремонту чи орієнтовної ціни? Напишіть нам — можна з фото приміщення.",
    nudge_wa_btn: "Написати в WhatsApp",

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
    services_title: "Чим Huisklusdienst може вам допомогти?",
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
    svc_bathroom: "Ванна кімната та кухня",
    svc_bathroom_desc:
      "Ремонт ванних кімнат і кухонь: сантехніка, електрика, плитка та монтаж обладнання.",
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
    area_page_title: "Де ми працюємо: міста по всіх Нідерландах",
    area_page_sub:
      "Виберіть своє місто, щоб побачити місцеву інформацію та роботи, які ми там виконуємо. Вашого міста немає? Введіть поштовий індекс, і ми розглянемо запит особисто.",
    area_places: "міст",

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
    faq_3_q: "У яких містах ви працюєте?",
    faq_3_a:
      "Ми беремо замовлення в містах по всіх Нідерландах; на сторінці «Де ми працюємо» вони згруповані за провінціями. Вашого міста немає? Вкажіть його в запиті, і ми повідомимо, чи зможемо взятися за вашу роботу.",
    faq_4_q: "Чи зобов'язує мене до чогось запит кошторису?",
    faq_4_a:
      "Так. Запит через сайт ні до чого не зобов'язує, доки ви не підпишете пропозицію.",

    // Form & Modals
    form_title: "Замовте пропозицію",
    form_sub: "Виберіть вид робіт. Обговоримо ваші плани й можливості без жодних зобов'язань з вашого боку.",
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
      "Будівельні роботи, ремонт, обслуговування та дрібний ремонт житла в містах по всіх Нідерландах — із чіткими домовленостями заздалегідь.",
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

    // Page Specific
    city_hero_title: "Ремонт і будівельні роботи у {city}",
    city_hero_sub: "Будівельні роботи, ремонт, обслуговування та дрібний ремонт у {city}. Опишіть роботу й отримайте зрозумілу пропозицію.",
    city_services_eyebrow: "Послуги у {city}",
    city_services_title: "Чим ми можемо допомогти у {city}?",
    city_faq_title: "Поширені запитання: {city}",
    city_quote_title: "Запит пропозиції у {city}",
    city_quote_sub: "Коротко опишіть роботу — ми з вами зв'яжемося.",
    city_faq_1_q: "Які роботи Huisklusdienst виконує у {city}?",
    city_faq_1_a: "Від повного ремонту житла, прибудов і дормерів до нової ванної чи кухні, фарбування, теслярських і сантехнічних робіт, обслуговування та дрібного ремонту. Ми беремо замовлення по всьому {city}, наприклад у {districts}.",
    city_faq_2_q: "Як швидко хтось може приїхати на огляд у {city}?",
    city_faq_2_a: "Це залежить від графіка та виду роботи. Після запиту ми зв'яжемося з вами й домовимося про час огляду.",
    city_faq_3_q: "Скільки коштує робота у {city}?",
    city_faq_3_a: "Це залежить від обсягу, матеріалів і стану житла. Заздалегідь ви отримуєте детальну пропозицію, де завжди вказано можливі витрати на дорогу. Для деяких робіт калькулятор на сайті одразу покаже орієнтовну ціну.",
    city_faq_4_q: "Чи потрібен дозвіл на перебудову у {city}?",
    city_faq_4_a: "Для багатьох робіт усередині — ні. Для прибудови, дормера на фасаді чи робіт у пам'ятці архітектури — часто так. Перевірка в Omgevingsloket покаже, що діє для вашої адреси; під час огляду ми розберемося разом з вами.",

    service_hero_suffix: " у вашому регіоні",
    service_includes_eyebrow: "Що входить",
    service_includes_title: "Роботи, які ми виконуємо",
    service_process_eyebrow: "Підхід",
    service_process_title: "Як ми працюємо",
    service_area_eyebrow: "Зона робіт",
    service_area_title: "{service} поруч з вами",
    service_area_desc: "Виберіть своє місто, щоб побачити місцеву інформацію, або вкажіть його в запиті.",
    service_quote_title: "Безкоштовний кошторис",
    service_quote_sub: "Замовте орієнтовний розрахунок вартості для послуги {service} прямо зараз.",
    service_related_eyebrow: "Дізнатися більше",
    service_related_title: "Інші послуги від Huisklusdienst",


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
    privacy_meta_desc: "Як Huisklusdienst обробляє дані, які ви надсилаєте через форму запиту.",
    terms_meta_desc: "Які умови застосовуються до пропозицій і замовлень Huisklusdienst.",
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
    est_wa_msg: "Вітаю, Huisklusdienst! Я скористався калькулятором ({summary}) і хочу надіслати фото для оцінки.",
    est_form_btn: "Додати фото",
    ba_slider: "Порівняти до і після",
    ba_value: "До: {before}%, після: {after}%",
    ba_choose: "Оберіть приклад",
    ba_impression: "Ілюстрація",
    ba_impression_note: "Це ілюстративні зображення, а не проєкти, виконані Huisklusdienst.",
    ba_scope: "Роботи",
    ba_service_link: "Переглянути послугу",
    area_eyebrow: "Де ми працюємо",
    area_title: "Введіть поштовий індекс і розкажіть, що потрібно зробити",
    area_desc: "Від крана, що протікає, до повного ремонту чи прибудови: ми беремо замовлення в містах по всіх Нідерландах. Введіть поштовий індекс або місто, виберіть роботу й скажіть, як вам зручніше зв'язатися.",
    area_label: "Поштовий індекс або місто",
    area_placeholder: "Напр. 1012 AB або Utrecht",
    area_btn: "Далі",
    area_invalid: "Введіть поштовий індекс (напр. 1012 AB) або місто.",
    nudge_wa_title: "Є питання? Напишіть нам",
    nudge_wa_msg: "Вітаю, Huisklusdienst! У мене питання щодо ремонту.",
    nudge_quote_title: "Плануєте ремонт?",
    nudge_quote_text: "Опишіть проєкт кількома реченнями та отримайте зрозумілу детальну пропозицію.",
    nudge_close: "Закрити",
    hero_cta_calc: "Розрахувати орієнтовну ціну",
    est_show_result: "Переглянути орієнтовну ціну",
    word_and: "і",
    svc_extension: "Прибудова",
    svc_extension_desc: "Більше житлового простору завдяки прибудові: від фундаменту й конструкції до готового приміщення.",
    svc_extension_intro: "Прибудова дає вашому дому більше простору без переїзду. Перед початком ми разом з вами з'ясовуємо, чи потрібен дозвіл (omgevingsvergunning; це можна перевірити й самостійно в Omgevingsloket) і чи потрібен конструктивний розрахунок. Далі виконуємо роботи — від фундаменту до оздоблення.",
    svc_extension_inc_1: "Прибудова ззаду чи збоку будинку",
    svc_extension_inc_2: "Фундамент, підлога та конструкція",
    svc_extension_inc_3: "Проріз у наявну частину будинку",
    svc_extension_inc_4: "Дах, віконні рами та утеплення",
    svc_extension_inc_5: "Оздоблення: штукатурка, підлога, фарбування",
    svc_dormer: "Дормер і облаштування горища",
    svc_dormer_desc: "Встановлення дормера або перетворення горища на повноцінну спальню чи кабінет.",
    svc_dormer_intro: "Дормер і облаштоване горище дають повноцінну кімнату під дахом. Дормер на задньому схилі даху за певних умов часто можна встановити без дозволу, на фасадному — зазвичай ні; ми з'ясуємо це з вами заздалегідь. Далі виконуємо роботи — від дормера й утеплення до сходів, стін і оздоблення.",
    svc_dormer_inc_1: "Встановлення або заміна дормера",
    svc_dormer_inc_2: "Утеплення та оздоблення горища",
    svc_dormer_inc_3: "Стаціонарні сходи на горище",
    svc_dormer_inc_4: "Стіни, низькі перегородки й місця для зберігання",
    svc_dormer_inc_5: "Мансардні вікна та вентиляція",
    city_meta_desc: "Ремонт житла, ванні та кухні, прибудови, дормери й обслуговування у {city} (зокрема {districts}). Опишіть роботу й отримайте зрозумілу пропозицію.",
    city_meta_desc_short: "Ремонт житла, ванні та кухні, прибудови, дормери й обслуговування у {city}. Опишіть роботу й отримайте зрозумілу пропозицію.",
    city_traits_eyebrow: "Житло у {city}",
    city_traits_title: "Що ми враховуємо у {city}",
    city_districts_title: "Райони та населені пункти",
    city_districts_note: "Вашого району немає в списку? Просто вкажіть адресу в запиті.",
    city_faq_1_a_short: "Від повного ремонту житла, прибудов і дормерів до нової ванної чи кухні, фарбування, теслярських і сантехнічних робіт, обслуговування та дрібного ремонту — у {city} та околицях.",
    city_nearby_title: "Також працюємо поблизу {city}",
    sc_meta_desc: "{Noun} у {city} (зокрема {districts})? Опишіть роботу й отримайте зрозумілу детальну пропозицію від Huisklusdienst.",
    sc_meta_desc_short: "{Noun} у {city}? Опишіть роботу й отримайте зрозумілу детальну пропозицію від Huisklusdienst.",
    sc_lead: "{Noun} у {city}, наприклад у {districts}? Опишіть роботу кількома реченнями. Ми зв'яжемося з вами, і ви заздалегідь отримаєте зрозумілу детальну пропозицію.",
    sc_about_title: "Як ми працюємо у {city}",
    sc_tips_eyebrow: "Місцеві особливості",
    sc_tips_title: "Що варто знати у {city}",
    sc_districts_title: "Де ми працюємо у {city}",
    sc_districts_text: "Зокрема в цих районах. Вашого немає в списку? Просто вкажіть адресу в запиті.",
    sc_faq_cost_q: "{Noun} у {city}: скільки це коштує?",
    sc_faq_cost_a: "Це залежить від обсягу роботи, матеріалів і стану житла. Після огляду ви отримуєте детальну пропозицію й заздалегідь знаєте, на що розраховувати. Можливі витрати на дорогу там завжди вказано.",
    sc_faq_cost_a_calc: "Калькулятор на цій сторінці одразу покаже орієнтовну ціну.",
    sc_faq_start_q: "Як швидко ви можете почати у {city}?",
    sc_faq_start_a: "Це залежить від графіка та обсягу роботи. Після запиту ми зв'яжемося з вами, оглянемо роботу й разом домовимося про дату початку.",
    sc_faq_districts_q: "Ви працюєте також у {districts}?",
    sc_faq_districts_a: "Так, ми беремо замовлення по всьому {city}, зокрема: {allDistricts}. Вкажіть адресу в запиті, і ми врахуємо паркування та під'їзд під час планування.",
    sc_faq_permit_q: "Чи потрібен дозвіл у {city}?",
    sc_faq_permit_a: "Для багатьох робіт усередині — ні. Для прибудови, дормера на фасаді чи змін фасаду — може знадобитися. Перевірка в Omgevingsloket покаже, що діє для вашої адреси; під час огляду ми розберемося разом з вами.",
    sc_faq_permit_monuments: "У {city} багато пам'яток і захищених історичних кварталів; там дозвіл потрібен частіше, іноді й для робіт усередині.",
    sc_faq_vve_q: "Я живу в квартирі у {city}. На що звернути увагу?",
    sc_faq_vve_a: "Для робіт зі спільними частинами будинку — фасадом, дахом чи стояками — часто потрібна згода об'єднання власників (VvE). Перегляньте також правила будинку, наприклад щодо робочого часу та звукоізоляції під новою підлогою. Графік ми охоче погодимо з VvE.",
    sc_other_title: "Інші роботи у {city}",
    sc_nearby_title: "{service} поблизу {city}",
    home_meta_title: "Будівельні роботи, ремонт і обслуговування житла",
    home_meta_desc: "Будівельні роботи, ремонт, ванні та кухні, прибудови, дормери й обслуговування житла в містах по всіх Нідерландах. Опишіть роботу й отримайте зрозумілу пропозицію.",
    area_cta_title: "Вашого міста немає у списку?",
    area_cta_text: "Опишіть роботу й укажіть місто в запиті. Ми особисто повідомимо, чи зможемо допомогти.",
    area_points: "Один запит для малих і великих робіт · Ви самі обираєте спосіб зв'язку · Без зобов'язань",
    area_modal_title: "Чим ми можемо допомогти?",
    area_modal_sub: "Місце робіт: {place}. Виберіть роботу й залиште контакти. Ми зв'яжемося з вами й особисто повідомимо, чи і коли зможемо виконати вашу роботу.",
    area_modal_service: "Що потрібно зробити?",
    area_modal_other: "Інше",
    area_modal_desc_label: "Короткий опис",
    area_modal_desc_placeholder: "Напр.: оновити ванну 6 м² разом із плиткою",
    area_modal_desc_required: "Виберіть роботу або коротко опишіть, що потрібно зробити.",
    area_modal_contact: "Як нам із вами зв'язатися?",
    area_modal_pref_phone: "Дзвінок",
    area_modal_pref_whatsapp: "WhatsApp",
    area_modal_pref_email: "E-mail",
    area_modal_email_required: "Вкажіть e-mail, якщо хочете, щоб ми написали вам на пошту.",
    area_modal_submit: "Надіслати запит",
    area_modal_success_title: "Дякуємо, ваш запит отримано",
    area_modal_success_text: "Ми зв'яжемося з вами якнайшвидше, щоб обговорити роботу та графік.",
    area_modal_pref_label: "Спосіб зв'язку",
    area_places_one: "місто",
    area_places_few: "міста",
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
    hero_label: "Строительство · ремонт · обслуживание жилья",
    hero_title: "Больше пространства.",
    hero_title_second: "Больше комфорта.",
    hero_title_accent: "Начнём с вашего замысла.",
    hero_sub: "Новая ванная или кухня, пристройка или полное обновление жилья. Расскажите, что хотите изменить, чтобы мы могли подготовить понятную подробную смету.",
    hero_cta_primary: "Обсудить мой проект",
    hero_trust_1: "Запрос без обязательств",
    hero_trust_2: "Детальная смета заранее",
    hero_trust_3: "Личный контакт",

    // Project-first request flow and honest reassurance
    trust_short_1: "Без обязательств",
    trust_short_2: "Смета до работ",
    trust_short_3: "Личный контакт",
    hero_inspiration: "Интерьер для вдохновения · иллюстрация",
    quote_project_first: "Сначала ваш проект. Контактные данные — только на последнем шаге.",
    quote_progress: "Шаги вашего запроса",
    quote_tab_1: "Проект",
    quote_tab_2: "Детали",
    quote_tab_3: "Контакты",
    quote_step_count: "Шаг {n} из 3",
    quote_question_1: "Что вы планируете изменить?",
    quote_question_2: "Расскажите о ваших планах",
    quote_question_3: "Как с вами связаться?",
    quote_hint_1: "Выберите вид работ. Сейчас не нужно указывать личные данные.",
    quote_hint_2: "Достаточно общего замысла. Размеры и фото можно добавить позже.",
    quote_hint_3: "Проверьте описание проекта и оставьте контакты. Запрос будет отправлен только кнопкой ниже.",
    quote_other: "Другие работы или обслуживание",
    quote_choose_error: "Выберите вид работ, с которыми вам нужна помощь.",
    quote_change: "Изменить",
    quote_new_request: "Создать новый запрос",
    quote_summary: "Ваш проект",
    quote_continue: "К контактам",
    quote_desc_placeholder: "Например: новая ванная, больше жилого пространства или полный ремонт. Что для вас важно?",
    quote_no_commitment: "Это запрос без обязательств, а не заказ работ.",
    quote_after_title: "Что будет после вашего запроса?",
    quote_decide_title: "Решение остаётся за вами",
    quote_decide_text: "Обсудите смету и задайте вопросы. Отправка запроса ни к чему вас не обязывает.",
    quote_js_required: "Включите JavaScript, чтобы пройти шаги и отправить запрос.",
    ba_view: "Просмотр примера",
    ba_compare: "Сравнить",
    ba_project_prompt: "Тоже планируете обновить жильё?",
    ba_project_cta: "Обсудить мой проект",

    // Nudges & Conversion triggers
    nudge_wa_bubble:
      "Есть вопросы по ремонту или ориентировочной цене? Напишите нам — можно с фото помещения.",
    nudge_wa_btn: "Написать в WhatsApp",

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
    services_title: "Чем Huisklusdienst может вам помочь?",
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
    svc_bathroom: "Ванная комната и кухня",
    svc_bathroom_desc:
      "Ремонт ванных комнат и кухонь: сантехника, электрика, плитка и монтаж оборудования.",
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
    area_page_title: "Где мы работаем: города по всем Нидерландам",
    area_page_sub:
      "Выберите свой город, чтобы увидеть местную информацию и работы, которые мы там выполняем. Вашего города нет? Введите почтовый индекс, и мы рассмотрим запрос лично.",
    area_places: "городов",

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
    faq_3_q: "В каких городах вы работаете?",
    faq_3_a: "Мы берём заказы в городах по всем Нидерландам; на странице «Где мы работаем» они сгруппированы по провинциям. Вашего города нет? Укажите его в запросе, и мы сообщим, сможем ли взяться за вашу работу.",
    faq_4_q: "Обязывает ли меня к чему-то расчет сметы?",
    faq_4_a:
      "Да. Запрос через сайт ни к чему не обязывает, пока вы не подпишете предложение.",

    // Form & Modals
    form_title: "Запросите предложение",
    form_sub: "Выберите вид работ. Обсудим ваши планы и возможности без каких-либо обязательств с вашей стороны.",
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
      "Строительные работы, ремонт, обслуживание и мелкий ремонт жилья в городах по всем Нидерландам — с чёткими договорённостями заранее.",
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

    // Page Specific
    city_hero_title: "Ремонт и строительные работы в {city}",
    city_hero_sub: "Строительные работы, ремонт, обслуживание и мелкий ремонт в {city}. Опишите работу и получите понятное предложение.",
    city_services_eyebrow: "Услуги в {city}",
    city_services_title: "Чем мы можем помочь в {city}?",
    city_faq_title: "Частые вопросы: {city}",
    city_quote_title: "Запрос предложения в {city}",
    city_quote_sub: "Кратко опишите работу — мы с вами свяжемся.",
    city_faq_1_q: "Какие работы Huisklusdienst выполняет в {city}?",
    city_faq_1_a: "От полного ремонта жилья, пристроек и дормеров до новой ванной или кухни, покраски, плотницких и сантехнических работ, обслуживания и мелкого ремонта. Мы берём заказы по всему {city}, например в {districts}.",
    city_faq_2_q: "Как быстро кто-то может приехать на осмотр в {city}?",
    city_faq_2_a: "Это зависит от графика и вида работы. После запроса мы свяжемся с вами и договоримся о времени осмотра.",
    city_faq_3_q: "Сколько стоит работа в {city}?",
    city_faq_3_a: "Это зависит от объёма, материалов и состояния жилья. Заранее вы получаете подробное предложение, где всегда указаны возможные расходы на дорогу. Для некоторых работ калькулятор на сайте сразу покажет ориентировочную цену.",
    city_faq_4_q: "Нужно ли разрешение на перестройку в {city}?",
    city_faq_4_a: "Для многих работ внутри — нет. Для пристройки, дормера на фасаде или работ в памятнике архитектуры — часто да. Проверка в Omgevingsloket покажет, что действует для вашего адреса; во время осмотра мы разберёмся вместе с вами.",
    
    service_hero_suffix: " в вашем регионе",
    service_includes_eyebrow: "Что сюда входит",
    service_includes_title: "Работы, которые мы выполняем",
    service_process_eyebrow: "Подход",
    service_process_title: "Как мы работаем",
    service_area_eyebrow: "Зона работ",
    service_area_title: "{service} рядом с вами",
    service_area_desc: "Выберите свой город, чтобы увидеть местную информацию, или укажите его в запросе.",
    service_quote_title: "Бесплатная смета",
    service_quote_sub: "Запросите ориентировочный расчет стоимости на услугу {service} прямо сейчас.",
    service_related_eyebrow: "Узнать больше",
    service_related_title: "Другие услуги от Huisklusdienst",
    

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
    privacy_meta_desc: "Как Huisklusdienst обрабатывает данные, которые вы отправляете через форму запроса.",
    terms_meta_desc: "Какие условия применяются к предложениям и заказам Huisklusdienst.",
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
    est_wa_msg: "Здравствуйте, Huisklusdienst! Я воспользовался калькулятором ({summary}) и хочу отправить фото для оценки.",
    est_form_btn: "Добавить фото",
    ba_slider: "Сравнить до и после",
    ba_value: "До: {before}%, после: {after}%",
    ba_choose: "Выберите пример",
    ba_impression: "Иллюстрация",
    ba_impression_note: "Это иллюстративные изображения, а не проекты, выполненные Huisklusdienst.",
    ba_scope: "Работы",
    ba_service_link: "Посмотреть услугу",
    area_eyebrow: "Где мы работаем",
    area_title: "Введите почтовый индекс и расскажите, что нужно сделать",
    area_desc: "От протекающего крана до полного ремонта или пристройки: мы берём заказы в городах по всем Нидерландам. Введите почтовый индекс или город, выберите работу и скажите, как вам удобнее связаться.",
    area_label: "Почтовый индекс или город",
    area_placeholder: "Напр. 1012 AB или Utrecht",
    area_btn: "Далее",
    area_invalid: "Введите почтовый индекс (напр. 1012 AB) или город.",
    nudge_wa_title: "Есть вопросы? Напишите нам",
    nudge_wa_msg: "Здравствуйте, Huisklusdienst! У меня вопрос по ремонту.",
    nudge_quote_title: "Планируете ремонт?",
    nudge_quote_text: "Опишите проект в нескольких предложениях и получите понятное подробное предложение.",
    nudge_close: "Закрыть",
    hero_cta_calc: "Рассчитать ориентировочную цену",
    est_show_result: "Посмотреть ориентировочную цену",
    word_and: "и",
    svc_extension: "Пристройка",
    svc_extension_desc: "Больше жилого пространства благодаря пристройке: от фундамента и конструкции до готового помещения.",
    svc_extension_intro: "Пристройка даёт вашему дому больше пространства без переезда. Перед началом мы вместе с вами выясняем, нужно ли разрешение (omgevingsvergunning; это можно проверить и самостоятельно в Omgevingsloket) и требуется ли конструктивный расчёт. Затем выполняем работы — от фундамента до отделки.",
    svc_extension_inc_1: "Пристройка сзади или сбоку дома",
    svc_extension_inc_2: "Фундамент, пол и конструкция",
    svc_extension_inc_3: "Проём в существующую часть дома",
    svc_extension_inc_4: "Крыша, оконные рамы и утепление",
    svc_extension_inc_5: "Отделка: штукатурка, пол, покраска",
    svc_dormer: "Дормер и обустройство чердака",
    svc_dormer_desc: "Установка дормера или превращение чердака в полноценную спальню или кабинет.",
    svc_dormer_intro: "Дормер и обустроенный чердак дают полноценную комнату под крышей. Дормер на заднем скате крыши при определённых условиях часто можно установить без разрешения, на фасадном — обычно нет; мы выясним это с вами заранее. Затем выполняем работы — от дормера и утепления до лестницы, стен и отделки.",
    svc_dormer_inc_1: "Установка или замена дормера",
    svc_dormer_inc_2: "Утепление и отделка чердака",
    svc_dormer_inc_3: "Стационарная лестница на чердак",
    svc_dormer_inc_4: "Стены, низкие перегородки и места для хранения",
    svc_dormer_inc_5: "Мансардные окна и вентиляция",
    city_meta_desc: "Ремонт жилья, ванные и кухни, пристройки, дормеры и обслуживание в {city} (в том числе {districts}). Опишите работу и получите понятное предложение.",
    city_meta_desc_short: "Ремонт жилья, ванные и кухни, пристройки, дормеры и обслуживание в {city}. Опишите работу и получите понятное предложение.",
    city_traits_eyebrow: "Жильё в {city}",
    city_traits_title: "Что мы учитываем в {city}",
    city_districts_title: "Районы и населённые пункты",
    city_districts_note: "Вашего района нет в списке? Просто укажите адрес в запросе.",
    city_faq_1_a_short: "От полного ремонта жилья, пристроек и дормеров до новой ванной или кухни, покраски, плотницких и сантехнических работ, обслуживания и мелкого ремонта — в {city} и окрестностях.",
    city_nearby_title: "Также работаем рядом с {city}",
    sc_meta_desc: "{Noun} в {city} (в том числе {districts})? Опишите работу и получите понятное подробное предложение от Huisklusdienst.",
    sc_meta_desc_short: "{Noun} в {city}? Опишите работу и получите понятное подробное предложение от Huisklusdienst.",
    sc_lead: "{Noun} в {city}, например в {districts}? Опишите работу в нескольких предложениях. Мы свяжемся с вами, и вы заранее получите понятное подробное предложение.",
    sc_about_title: "Как мы работаем в {city}",
    sc_tips_eyebrow: "Местные особенности",
    sc_tips_title: "Что стоит знать в {city}",
    sc_districts_title: "Где мы работаем в {city}",
    sc_districts_text: "В том числе в этих районах. Вашего нет в списке? Просто укажите адрес в запросе.",
    sc_faq_cost_q: "{Noun} в {city}: сколько это стоит?",
    sc_faq_cost_a: "Это зависит от объёма работы, материалов и состояния жилья. После осмотра вы получаете подробное предложение и заранее знаете, на что рассчитывать. Возможные расходы на дорогу там всегда указаны.",
    sc_faq_cost_a_calc: "Калькулятор на этой странице сразу покажет ориентировочную цену.",
    sc_faq_start_q: "Как быстро вы можете начать в {city}?",
    sc_faq_start_a: "Это зависит от графика и объёма работы. После запроса мы свяжемся с вами, осмотрим работу и вместе договоримся о дате начала.",
    sc_faq_districts_q: "Вы работаете также в {districts}?",
    sc_faq_districts_a: "Да, мы берём заказы по всему {city}, в том числе: {allDistricts}. Укажите адрес в запросе, и мы учтём парковку и подъезд при планировании.",
    sc_faq_permit_q: "Нужно ли разрешение в {city}?",
    sc_faq_permit_a: "Для многих работ внутри — нет. Для пристройки, дормера на фасаде или изменения фасада — может понадобиться. Проверка в Omgevingsloket покажет, что действует для вашего адреса; во время осмотра мы разберёмся вместе с вами.",
    sc_faq_permit_monuments: "В {city} много памятников и охраняемых исторических кварталов; там разрешение нужно чаще, иногда и для работ внутри.",
    sc_faq_vve_q: "Я живу в квартире в {city}. На что обратить внимание?",
    sc_faq_vve_a: "Для работ с общими частями дома — фасадом, крышей или стояками — часто нужно согласие объединения собственников (VvE). Посмотрите также правила дома, например о рабочем времени и звукоизоляции под новым полом. График мы охотно согласуем с VvE.",
    sc_other_title: "Другие работы в {city}",
    sc_nearby_title: "{service} рядом с {city}",
    home_meta_title: "Строительные работы, ремонт и обслуживание жилья",
    home_meta_desc: "Строительные работы, ремонт, ванные и кухни, пристройки, дормеры и обслуживание жилья в городах по всем Нидерландам. Опишите работу и получите понятное предложение.",
    area_cta_title: "Вашего города нет в списке?",
    area_cta_text: "Опишите работу и укажите город в запросе. Мы лично сообщим, сможем ли помочь.",
    area_points: "Один запрос для мелких и крупных работ · Вы сами выбираете способ связи · Без обязательств",
    area_modal_title: "Чем мы можем помочь?",
    area_modal_sub: "Место работ: {place}. Выберите работу и оставьте контакты. Мы свяжемся с вами и лично сообщим, сможем ли и когда выполнить вашу работу.",
    area_modal_service: "Что нужно сделать?",
    area_modal_other: "Другое",
    area_modal_desc_label: "Краткое описание",
    area_modal_desc_placeholder: "Напр.: обновить ванную 6 м² вместе с плиткой",
    area_modal_desc_required: "Выберите работу или кратко опишите, что нужно сделать.",
    area_modal_contact: "Как нам с вами связаться?",
    area_modal_pref_phone: "Звонок",
    area_modal_pref_whatsapp: "WhatsApp",
    area_modal_pref_email: "E-mail",
    area_modal_email_required: "Укажите e-mail, если хотите, чтобы мы написали вам на почту.",
    area_modal_submit: "Отправить запрос",
    area_modal_success_title: "Спасибо, ваш запрос получен",
    area_modal_success_text: "Мы свяжемся с вами как можно скорее, чтобы обсудить работу и график.",
    area_modal_pref_label: "Способ связи",
    area_places_one: "город",
    area_places_few: "города",
  },
} as const

export default translations

export function t(lang: Lang, key: TranslationKey): string {
  const dict = translations[lang] || translations.nl
  return (dict[key] || translations.nl[key] || key) as string
}
