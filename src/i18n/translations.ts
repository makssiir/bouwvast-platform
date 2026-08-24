export type Lang = "nl" | "en" | "uk" | "ru";

export const LANG_LABELS: Record<Lang, string> = {
  nl: "NL",
  en: "EN",
  uk: "UA",
  ru: "RU",
};

export const LANG_NAMES: Record<Lang, string> = {
  nl: "Nederlands",
  en: "English",
  uk: "Українська",
  ru: "Русский",
};

export type TranslationKey = keyof typeof translations.nl;

const translations = {
  nl: {
    // Nav
    nav_services: "Diensten",
    nav_projects: "Projecten",
    nav_about: "Over ons",
    nav_area: "Werkgebied",
    nav_kennisbank: "Kennisbank",
    nav_contact: "Contact",
    nav_cta: "Offerte aanvragen",
    nav_business: "Zakelijk",

    // Hero
    hero_label: "Vakmannen & Aannemers in Nederland",
    hero_title: "Bouwen, renoveren en afwerken.",
    hero_title_accent: "Van idee tot strak resultaat.",
    hero_sub: "Professionele bouw-, renovatie- en afbouwwerkzaamheden voor woningen en bedrijven. Eén aanspreekpunt, transparante calculaties en garantie op oplevering.",
    hero_cta_primary: "Direct offerte aanvragen",
    hero_cta_secondary: "Bekijk onze diensten",
    hero_trust_1: "Snelle reactie binnen 24u",
    hero_trust_2: "Vaste prijsafspraak vooraf",
    hero_trust_3: "Vakkundige garantie",

    // Nudges & Conversion triggers
    nudge_wa_online: "Nu online · reactie < 15 min",
    nudge_wa_bubble: "Vragen over uw verbouwing of richtprijs? App ons gerust met foto's voor direct advies 💬",
    nudge_wa_btn: "Start WhatsApp chat",
    nudge_bar_text: "Plannen voor een verbouwing? Ontvang binnen 24u een gratis richtprijs.",
    nudge_bar_wa: "App uw foto's 💬",
    nudge_bar_quote: "Offerte aanvragen ⚡",
    nudge_estimator_tip: "Tip: Stuur een foto van uw ruimte via WhatsApp voor een exacte prijsindicatie binnen 2 uur!",

    // Stats
    stat_1_val: "25+", stat_1_lbl: "jaar ervaring",
    stat_2_val: "1.500+", stat_2_lbl: "projecten afgerond",
    stat_3_val: "VCA", stat_3_lbl: "gecertificeerd",
    stat_4_val: "€55", stat_4_lbl: "vanaf tarief p/u incl. btw",

    // Estimator
    est_eyebrow: "Direct inzicht",
    est_title: "Bereken direct uw richtprijs",
    est_sub: "Selecteer uw type werkzaamheden en oppervlakte voor een realtime indicatie van de kosten.",
    est_step_1: "1. Kies het type werkzaamheden",
    est_step_2: "2. Oppervlakte / Omvang",
    est_step_3: "3. Kwaliteitsniveau van materialen",
    est_tier_std: "Standaard", est_tier_std_desc: "Degelijke basiskwaliteit",
    est_tier_prem: "Premium", est_tier_prem_desc: "Meest gekozen A-merk",
    est_tier_lux: "Luxe / Design", est_tier_lux_desc: "High-end afwerking",
    est_opt_demo: "Inclusief sloopwerk & afvoer",
    est_opt_mat: "Inclusief hoogwaardige materialen",
    est_est_price: "Geschatte richtprijs:",
    est_apply_btn: "Offerte aanvragen voor deze berekening",
    est_disclaimer: "* Indicatieve berekening incl. btw. Definitieve prijs volgt na vrijblijvende opname op locatie.",

    // Services section
    services_label: "Onze Vakgebieden",
    services_title: "Waarmee kan Bouwvast u helpen?",
    services_sub: "Bekijk per discipline wat we voor u kunnen betekenen, wat erbij hoort en welke richtprijzen gelden.",
    services_all: "Bekijk alle diensten",
    more_info: "Bekijk dienst →",

    // Service names & descriptions
    svc_renovation: "Woningrenovatie",
    svc_renovation_desc: "Complete of gedeeltelijke renovatie van woningen en bedrijfsruimtes.",
    svc_finishing: "Afbouw & Stucwerk",
    svc_finishing_desc: "Sausklaar stucen, behangklaar, pleisterwerk, scheidingswanden en plafonds.",
    svc_painting: "Binnen- & Buitenschilderwerk",
    svc_painting_desc: "Vakkundig saus- en lakwerk voor particulieren en bedrijven met 9% btw voordeel.",
    svc_facade: "Gevel- & Metselwerk",
    svc_facade_desc: "Voegwerk, scheurherstel, gevelreiniging en buitengevelisolatie.",
    svc_assembly: "Montage & Afwerking",
    svc_assembly_desc: "Nauwkeurige montage van keukens, deuren, kasten en interieurelementen.",
    svc_maintenance: "Onderhoud & Schadeherstel",
    svc_maintenance_desc: "Kleine en grotere onderhoudswerkzaamheden, vochtherstel en mutatieonderhoud.",
    svc_bathroom: "Badkamer & Keuken",
    svc_bathroom_desc: "Complete renovatie, leidingwerk, tegelwerk en luxe sanitairmontage.",
    svc_general: "Algemene Bouwwerkzaamheden",
    svc_general_desc: "Multidisciplinaire verbouwingen en projecten van ontwerp tot oplevering.",

    // Before/After
    ba_label: "Het verschil",
    ba_title: "Voor & Na: Echte transformaties",
    ba_sub: "Sleep met de balk om het verschil vóór en na onze werkzaamheden te bekijken.",
    ba_before: "VOOR",
    ba_after: "NA",
    ba_hint: "Sleep om te vergelijken",

    // Audience
    aud_label: "Voor wie",
    aud_title: "Voor particulieren én zakelijke partners",
    aud_sub: "Of u nu een woning verbouwt, een badkamer renoveert of als beheerder vaste capaciteit zoekt: Bouwvast staat klaar.",
    aud_part_title: "Particulier",
    aud_part_heading: "Voor uw woning en verbouwing",
    aud_part_desc: "Van badkamerrenovatie tot complete woningverbouwing. Eerlijke offertes, duidelijke afspraken en één vast aanspreekpunt.",
    aud_b2b_title: "Zakelijk",
    aud_b2b_heading: "Voor aannemers, VvE's en beheerders",
    aud_b2b_desc: "Flexibele inzet van vakkundige bouwteams. Onderhoud, afbouw, renovatie en projectmatige capaciteit op locatie.",

    // How it works
    how_label: "Werkwijze",
    how_title: "In 4 stappen naar een geslaagde verbouwing",
    how_cta: "Vraag direct een offerte aan",
    how_1_title: "1. Vrijblijvende Aanvraag",
    how_1_desc: "Beschrijf uw project via het online aanvraagformulier of bereken vooraf uw richtprijs.",
    how_2_title: "2. Opname & Advies",
    how_2_desc: "We bespreken uw wensen en plannen eventueel een vrijblijvende inspectie op locatie in.",
    how_3_title: "3. Transparante Offerte",
    how_3_desc: "U ontvangt een gespecificeerde offerte met duidelijke planning en vaste prijsafspraken.",
    how_4_title: "4. Vakkundige Oplevering",
    how_4_desc: "Onze vaklieden voeren het werk strak uit. Oplevering pas als u 100% tevreden bent.",

    // Reviews
    rev_label: "Klanttevredenheid",
    rev_title: "Beoordeeld met een 4.9 / 5.0",
    rev_sub: "Gebaseerd op meer dan 120 geverifieerde reviews van huiseigenaren en zakelijke opdrachtgevers.",

    // Pricing
    price_label: "Tarieven",
    price_title: "Duidelijke prijzen vooraf",
    price_sub: "Bij Bouwvast hanteren we transparante tarieven zonder verborgen kosten achteraf.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Veelgestelde vragen over verbouwen",
    faq_1_q: "Welke werkzaamheden voeren jullie uit?",
    faq_1_a: "Wij voeren complete woningrenovaties, badkamers, stucwerk, schilderwerk, timmerwerk, loodgieterswerk, gevelwerk en onderhoud uit.",
    faq_2_q: "Werken jullie ook voor zakelijke opdrachtgevers?",
    faq_2_a: "Ja, wij werken dagelijks voor particulieren, aannemers, VvE's en vastgoedbeheerders.",
    faq_3_q: "In welke regio zijn jullie actief?",
    faq_3_a: "Wij zijn actief in heel Nederland, met focus op grote steden zoals Amersfoort, Utrecht, Amsterdam, Hilversum en omstreken.",
    faq_4_q: "Kan ik eerst een vrijblijvende offerte aanvragen?",
    faq_4_a: "Ja, al onze offertes en berekeningen zijn 100% gratis en geheel vrijblijvend.",

    // Form & Modals
    form_title: "Vraag direct een offerte aan",
    form_sub: "Binnen 24 uur een heldere reactie en prijsopgave.",
    form_name: "Uw naam",
    form_phone: "Telefoonnummer",
    form_email: "E-mailadres",
    form_city: "Woonplaats / Postcode",
    form_type: "Type werkzaamheden",
    form_desc: "Beschrijf uw wensen en bijzonderheden...",
    form_date: "Gewenste startdatum",
    form_submit: "Verstuur aanvraag →",
    form_privacy: "Uw gegevens worden vertrouwelijk behandeld en uitsluitend voor deze offerte gebruikt.",
    form_success_title: "Aanvraag succesvol ontvangen!",
    form_success_sub: "Bedankt voor uw aanvraag. Een van onze bouwadviseurs neemt binnen 24 uur contact met u op.",

    // CTA
    cta_title: "Klaar om uw verbouwing te starten?",
    cta_sub: "Vraag vandaag nog een vrijblijvende offerte aan of bel direct met een van onze adviseurs.",
    cta_btn: "Offerte aanvragen",

    // Footer
    footer_desc: "Hét betrouwbare bouw- en renovatieplatform van Nederland. Vakkundige uitvoering, transparante prijzen en heldere communicatie voor elke verbouwing.",
    footer_info: "Informatie",
    footer_services: "Diensten",
    footer_cities: "Grote Steden",
    footer_privacy: "Privacybeleid",
    footer_terms: "Algemene voorwaarden",
    footer_partner: "Vakman worden",
    footer_rights: "Alle rechten voorbehouden.",
  },

  en: {
    // Nav
    nav_services: "Services",
    nav_projects: "Projects",
    nav_about: "About Us",
    nav_area: "Service Area",
    nav_kennisbank: "Knowledge Base",
    nav_contact: "Contact",
    nav_cta: "Request a Quote",
    nav_business: "Business",

    // Hero
    hero_label: "Professional Contractors & Builders in the Netherlands",
    hero_title: "Building, renovating and finishing.",
    hero_title_accent: "From concept to premium result.",
    hero_sub: "Professional construction, renovation, and finishing services for homes and businesses. Single point of contact, transparent calculations, and guaranteed quality.",
    hero_cta_primary: "Request a Quote Now",
    hero_cta_secondary: "View Our Services",
    hero_trust_1: "Quick response within 24h",
    hero_trust_2: "Fixed price agreement upfront",
    hero_trust_3: "Workmanship warranty",

    // Nudges & Conversion triggers
    nudge_wa_online: "Now online · reply < 15 min",
    nudge_wa_bubble: "Questions about your renovation or estimate? Chat with us on WhatsApp for fast advice 💬",
    nudge_wa_btn: "Start WhatsApp chat",
    nudge_bar_text: "Planning a renovation? Get a free estimate within 24 hours.",
    nudge_bar_wa: "Chat on WhatsApp 💬",
    nudge_bar_quote: "Request Quote ⚡",
    nudge_estimator_tip: "Tip: Send a photo of your space via WhatsApp for an exact price estimate within 2 hours!",

    // Stats
    stat_1_val: "25+", stat_1_lbl: "years experience",
    stat_2_val: "1,500+", stat_2_lbl: "completed projects",
    stat_3_val: "VCA", stat_3_lbl: "certified",
    stat_4_val: "€55", stat_4_lbl: "starting rate p/h incl. VAT",

    // Estimator
    est_eyebrow: "Instant Estimate",
    est_title: "Calculate your estimated price online",
    est_sub: "Select your project type and square footage for a real-time price range estimation.",
    est_step_1: "1. Select service type",
    est_step_2: "2. Surface / Project size",
    est_step_3: "3. Material quality tier",
    est_tier_std: "Standard", est_tier_std_desc: "Solid baseline quality",
    est_tier_prem: "Premium", est_tier_prem_desc: "Most popular A-brand",
    est_tier_lux: "Luxury / Design", est_tier_lux_desc: "High-end bespoke finish",
    est_opt_demo: "Include demolition & waste removal",
    est_opt_mat: "Include premium materials",
    est_est_price: "Estimated price range:",
    est_apply_btn: "Request quote for this calculation",
    est_disclaimer: "* Indicative calculation incl. VAT. Final price confirmed after non-binding on-site inspection.",

    // Services section
    services_label: "Our Disciplines",
    services_title: "How can Bouwvast assist your build?",
    services_sub: "Explore each discipline, what deliverables are included, and transparent pricing benchmarks.",
    services_all: "View all services",
    more_info: "View service →",

    // Service names & descriptions
    svc_renovation: "Home Renovation",
    svc_renovation_desc: "Complete or partial turn-key renovation of homes and commercial spaces.",
    svc_finishing: "Plastering & Drywall",
    svc_finishing_desc: "Smooth finish plastering, drywall partitions, suspended ceilings, and subfloors.",
    svc_painting: "Interior & Exterior Painting",
    svc_painting_desc: "Professional paint spraying and woodwork lacquering with 9% VAT benefit for residential.",
    svc_facade: "Facade & Masonry",
    svc_facade_desc: "Tuckpointing, brickwork restoration, pressure cleaning, and exterior insulation.",
    svc_assembly: "Mounting & Fitting",
    svc_assembly_desc: "Precision installation of kitchens, interior doors, custom cabinetry, and finishes.",
    svc_maintenance: "Maintenance & Repairs",
    svc_maintenance_desc: "Small and large maintenance tasks, moisture repairs, and ongoing property maintenance.",
    svc_bathroom: "Bathroom & Kitchen",
    svc_bathroom_desc: "Complete remodeling, plumbing, tile leveling, and luxury sanitary fitting.",
    svc_general: "General Building Works",
    svc_general_desc: "Multidisciplinary construction projects coordinated from design to clean handover.",

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
    aud_sub: "Whether you are remodeling a residence, updating a bathroom, or seeking contractor capacity: Bouwvast is ready.",
    aud_part_title: "Homeowners",
    aud_part_heading: "For your home & living space",
    aud_part_desc: "From bathroom renovations to complete home remodeling. Fair quotes, clear agreements, and a dedicated contact person.",
    aud_b2b_title: "Commercial & Partners",
    aud_b2b_heading: "For general contractors, HOAs & property managers",
    aud_b2b_desc: "Flexible deployment of skilled building teams. Maintenance, plastering, renovation, and scalable on-site capacity.",

    // How it works
    how_label: "Process",
    how_title: "4 Steps to a Smooth Renovation",
    how_cta: "Request a free quote",
    how_1_title: "1. Free Inquiry",
    how_1_desc: "Tell us about your project via our form or calculate an online estimate in seconds.",
    how_2_title: "2. Survey & Advice",
    how_2_desc: "We review your requirements and schedule a complimentary on-site inspection if needed.",
    how_3_title: "3. Transparent Quote",
    how_3_desc: "You receive an itemized proposal with clear schedules, scope, and fixed pricing terms.",
    how_4_title: "4. Professional Delivery",
    how_4_desc: "Our craftsmen execute the work neatly. Handover occurs only when you are 100% satisfied.",

    // Reviews
    rev_label: "Customer Rating",
    rev_title: "Rated 4.9 / 5.0 by Clients",
    rev_sub: "Based on over 120 verified reviews from homeowners and business clients across the Netherlands.",

    // Pricing
    price_label: "Pricing",
    price_title: "Transparent Rates Upfront",
    price_sub: "At Bouwvast, we practice transparent rates without unexpected surprise fees.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Frequently Asked Questions",
    faq_1_q: "What types of construction work do you handle?",
    faq_1_a: "We manage complete home renovations, bathrooms, plastering, painting, carpentry, plumbing, masonry, and ongoing maintenance.",
    faq_2_q: "Do you work with commercial clients?",
    faq_2_a: "Yes, we partner daily with private homeowners, general contractors, HOAs (VvE), and property managers.",
    faq_3_q: "In which areas do you operate?",
    faq_3_a: "We operate nationwide across the Netherlands, with strong focus on major metropolitan hubs.",
    faq_4_q: "Is requesting a quote free of obligation?",
    faq_4_a: "Yes, all our estimates and online calculations are 100% free and carry zero commitment.",

    // Form & Modals
    form_title: "Request your free quote",
    form_sub: "Clear response and price estimate within 24 hours.",
    form_name: "Full Name",
    form_phone: "Phone Number",
    form_email: "Email Address",
    form_city: "City / Postal Code",
    form_type: "Service Category",
    form_desc: "Describe your project requirements...",
    form_date: "Preferred Start Date",
    form_submit: "Submit Quote Request →",
    form_privacy: "Your details are treated confidentially and used solely for this quotation.",
    form_success_title: "Inquiry Successfully Received!",
    form_success_sub: "Thank you for reaching out. One of our building advisors will contact you within 24 hours.",

    // CTA
    cta_title: "Ready to start your building project?",
    cta_sub: "Request a free non-binding quote today or call our advisors directly.",
    cta_btn: "Request a Quote",

    // Footer
    footer_desc: "The trusted building and renovation platform in the Netherlands. Skilled craftsmanship, transparent pricing, and clear communication for every project.",
    footer_info: "Information",
    footer_services: "Services",
    footer_cities: "Major Cities",
    footer_privacy: "Privacy Policy",
    footer_terms: "Terms & Conditions",
    footer_partner: "Become a Partner",
    footer_rights: "All rights reserved.",
  },

  uk: {
    // Nav
    nav_services: "Послуги",
    nav_projects: "Проєкти",
    nav_about: "Про нас",
    nav_area: "Зона робіт",
    nav_kennisbank: "База знань",
    nav_contact: "Контакти",
    nav_cta: "Замовити розрахунок",
    nav_business: "Для бізнесу",

    // Hero
    hero_label: "Майстри та Будівельники в Нідерландах",
    hero_title: "Будівництво, ремонт та оздоблення.",
    hero_title_accent: "Від ідеї до ідеального результату.",
    hero_sub: "Професійні будівельні, ремонтні та оздоблювальні роботи для житла та бізнесу. Єдиний контакт, прозорий кошторис та гарантія на здачу об'єкта.",
    hero_cta_primary: "Отримати кошторис онлайн",
    hero_cta_secondary: "Наші послуги",
    hero_trust_1: "Швидка відповідь протягом 24г",
    hero_trust_2: "Фіксована ціна заздалегідь",
    hero_trust_3: "Офіційна гарантія якості",

    // Nudges & Conversion triggers
    nudge_wa_online: "Зараз онлайн · відповідь < 15 хв",
    nudge_wa_bubble: "Є питання щодо ремонту чи вартості? Напишіть нам у WhatsApp з фото для швидкої оцінки 💬",
    nudge_wa_btn: "Написати у WhatsApp",
    nudge_bar_text: "Плануєте ремонт? Отримайте безкоштовний кошторис за 24 години.",
    nudge_bar_wa: "Фото у WhatsApp 💬",
    nudge_bar_quote: "Замовити кошторис ⚡",
    nudge_estimator_tip: "Порада: Надішліть фото вашого приміщення у WhatsApp для точної оцінки за 2 години!",

    // Stats
    stat_1_val: "25+", stat_1_lbl: "років досвіду",
    stat_2_val: "1.500+", stat_2_lbl: "завершених об'єктів",
    stat_3_val: "VCA", stat_3_lbl: "сертифікація",
    stat_4_val: "€55", stat_4_lbl: "ставка від €55/год з ПДВ",

    // Estimator
    est_eyebrow: "Швидкий розрахунок",
    est_title: "Розрахуйте орієнтовну вартість онлайн",
    est_sub: "Оберіть тип робіт та площу для миттєвої оцінки вартості ремонту.",
    est_step_1: "1. Оберіть тип робіт",
    est_step_2: "2. Площа / Обсяг",
    est_step_3: "3. Рівень якості матеріалів",
    est_tier_std: "Стандарт", est_tier_std_desc: "Надійна базова якість",
    est_tier_prem: "Преміум", est_tier_prem_desc: "Найпопулярніші європейські бренди",
    est_tier_lux: "Люкс / Дизайн", est_tier_lux_desc: "Ексклюзивне оздоблення",
    est_opt_demo: "Включити демонтаж та вивіз сміття",
    est_opt_mat: "Включити якісні будівельні матеріали",
    est_est_price: "Орієнтовна вартість:",
    est_apply_btn: "Замовити розрахунок за цією калькуляцією",
    est_disclaimer: "* Орієнтовний розрахунок з ПДВ. Точна ціна визначається після безкоштовного огляду на об'єкті.",

    // Services section
    services_label: "Наші Напрямки",
    services_title: "Чим Bouwvast може вам допомогти?",
    services_sub: "Дізнайтеся більше про кожен напрямок, перелік робіт та прозорі цінові орієнтири.",
    services_all: "Усі послуги",
    more_info: "Детальніше про послугу →",

    // Service names & descriptions
    svc_renovation: "Комплексний Ремонт Житла",
    svc_renovation_desc: "Повний або частковий ремонт будинків та комерційних приміщень «під ключ».",
    svc_finishing: "Штукатурка та Оздоблення",
    svc_finishing_desc: "Ідеально гладка штукатурка під фарбування, гіпсокартонні перегородки та стелі.",
    svc_painting: "Малярні Роботи (Інтер'єр та Фасад)",
    svc_painting_desc: "Професійне безповітряне фарбування стін, лакування вікон та дверей зі зниженим ПДВ 9%.",
    svc_facade: "Фасадні та Мурувальні Роботи",
    svc_facade_desc: "Оновлення швів, ремонт цегляної кладки, гідрофобізація та утеплення фасадів.",
    svc_assembly: "Монтаж та Встановлення",
    svc_assembly_desc: "Точний монтаж кухонь, дверей, вбудованих шаф та інтер'єрних конструкцій.",
    svc_maintenance: "Обслуговування та Ремонт",
    svc_maintenance_desc: "Дрібні та великі ремонтні роботи, усунення вологи та плановий догляд за нерухомістю.",
    svc_bathroom: "Ванні Кімнати та Санвузли",
    svc_bathroom_desc: "Повна реновація ванних, душові зони, великоформатна плитка та сантехніка.",
    svc_general: "Загальнобудівельні Роботи",
    svc_general_desc: "Мультидисциплінарні будівельні проєкти від планування до чистової здачі.",

    // Before/After
    ba_label: "Різниця",
    ba_title: "До і Після: Реальні трансформації",
    ba_sub: "Потягніть повзунок, щоб побачити приміщення до та після нашої роботи.",
    ba_before: "ДО",
    ba_after: "ПІСЛЯ",
    ba_hint: "Тягніть для порівняння",

    // Audience
    aud_label: "Для кого",
    aud_title: "Для приватних клієнтів та бізнес-партнерів",
    aud_sub: "Будь то ремонт квартири, оновлення санвузла чи потреба генпідрядника в надійних будівельних бригадах — Bouwvast до ваших послуг.",
    aud_part_title: "Приватні клієнти",
    aud_part_heading: "Для вашого дому та ремонту",
    aud_part_desc: "Від ремонту ванної кімнати до повної реновації будинку. Чесні кошториси та персональний контакт.",
    aud_b2b_title: "Бізнес та Партнери",
    aud_b2b_heading: "Для забудовників, ОСББ (VvE) та керуючих компаній",
    aud_b2b_desc: "Гнучке залучення кваліфікованих будівельних бригад на об'єкти будь-якого масштабу.",

    // How it works
    how_label: "Процес",
    how_title: "4 кроки до якісного ремонту",
    how_cta: "Замовити безкоштовний кошторис",
    how_1_title: "1. Онлайн-заявка",
    how_1_desc: "Опишіть завдання через форму або миттєво порахуйте орієнтовну вартість у калькуляторі.",
    how_2_title: "2. Огляд та Консультація",
    how_2_desc: "Узгоджуємо деталі та за потреби проводимо безкоштовний огляд об'єкта.",
    how_3_title: "3. Прозорий Кошторис",
    how_3_desc: "Ви отримуєте деталізовану комерційну пропозицію з фіксованими термінами та ціною.",
    how_4_title: "4. Якісне Виконання",
    how_4_desc: "Наші майстри виконують роботи за стандартами. Здача об'єкта — після вашого 100% схвалення.",

    // Reviews
    rev_label: "Відгуки клієнтів",
    rev_title: "Оцінка 4.9 / 5.0",
    rev_sub: "На основі понад 120 перевірених відгуків власників житла та бізнес-клієнтів по всій країні.",

    // Pricing
    price_label: "Тарифи",
    price_title: "Прозорі розцінки заздалегідь",
    price_sub: "У Bouwvast діють прозорі ціни без прихованих платежів чи непередбачених витрат.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Часті запитання про ремонт",
    faq_1_q: "Які саме роботи ви виконуєте?",
    faq_1_a: "Ми виконуємо повний комплекс будівельних робіт: ремонт житла, санвузли, штукатурку, фарбування, столярні роботи, сантехніку, фасади та обслуговування.",
    faq_2_q: "Чи працюєте ви з юридичними особами?",
    faq_2_a: "Так, ми щодня співпрацюємо з приватними замовниками, будівельними компаніями, ОСББ (VvE) та управляючими організаціями.",
    faq_3_q: "У яких регіонах ви працюєте?",
    faq_3_a: "Працюємо по всій території Нідерландів, з фокусом на великих містах.",
    faq_4_q: "Чи зобов'язує мене до чогось запит кошторису?",
    faq_4_a: "Ні, розрахунок вартості та консультація є абсолютно безкоштовними і ні до чого вас не зобов'язують.",

    // Form & Modals
    form_title: "Замовте безкоштовний розрахунок",
    form_sub: "Чітка відповідь та кошторис протягом 24 годин.",
    form_name: "Ваше ім'я",
    form_phone: "Номер телефону",
    form_email: "Електронна пошта",
    form_city: "Місто / Поштовий індекс",
    form_type: "Категорія робіт",
    form_desc: "Опишіть ваш проєкт та особливості...",
    form_date: "Бажана дата початку",
    form_submit: "Надіслати запит →",
    form_privacy: "Ваші дані конфіденційні та використовуються виключно для складання пропозиції.",
    form_success_title: "Запит успішно надіслано!",
    form_success_sub: "Дякуємо! Наш будівельний консультант зв'яжеться з вами протягом 24 годин.",

    // CTA
    cta_title: "Готові розпочати ремонт?",
    cta_sub: "Замовте розрахунок вартості вже сьогодні або зателефонуйте нашим спеціалістам.",
    cta_btn: "Отримати пропозицію",

    // Footer
    footer_desc: "Надійна будівельно-ремонтна платформа Нідерландів. Майстерність, прозорі ціни та чітка комунікація для кожного проєкту.",
    footer_info: "Інформація",
    footer_services: "Послуги",
    footer_cities: "Великі Міста",
    footer_privacy: "Політика конфіденційності",
    footer_terms: "Умови надання послуг",
    footer_partner: "Стати партнером",
    footer_rights: "Усі права захищено.",
  },

  ru: {
    // Nav
    nav_services: "Услуги",
    nav_projects: "Проекты",
    nav_about: "О нас",
    nav_area: "Зона работ",
    nav_kennisbank: "База знаний",
    nav_contact: "Контакты",
    nav_cta: "Запросить смету",
    nav_business: "Для бизнеса",

    // Hero
    hero_label: "Мастера и Подрядчики в Нидерландах",
    hero_title: "Строительство, ремонт и отделка.",
    hero_title_accent: "От идеи к безупречному результату.",
    hero_sub: "Профессиональные строительные, ремонтные и отделочные работы для дома и бизнеса. Единый контакт, прозрачные расчеты и гарантия качества.",
    hero_cta_primary: "Рассчитать смету онлайн",
    hero_cta_secondary: "Посмотреть услуги",
    hero_trust_1: "Быстрый ответ в течение 24ч",
    hero_trust_2: "Фиксированная цена заранее",
    hero_trust_3: "Официальная гарантия",

    // Nudges & Conversion triggers
    nudge_wa_online: "Сейчас онлайн · ответ < 15 мин",
    nudge_wa_bubble: "Есть вопросы по ремонту или смете? Напишите нам в WhatsApp с фото для быстрой оценки 💬",
    nudge_wa_btn: "Написать в WhatsApp",
    nudge_bar_text: "Планируете ремонт? Получите бесплатную смету за 24 часа.",
    nudge_bar_wa: "Фото в WhatsApp 💬",
    nudge_bar_quote: "Запросить смету ⚡",
    nudge_estimator_tip: "Совет: Отправьте фото вашего помещения в WhatsApp для точной оценки за 2 часа!",

    // Stats
    stat_1_val: "25+", stat_1_lbl: "лет опыта",
    stat_2_val: "1.500+", stat_2_lbl: "завершенных проектов",
    stat_3_val: "VCA", stat_3_lbl: "сертификация",
    stat_4_val: "€55", stat_4_lbl: "ставка от €55/час с НДС",

    // Estimator
    est_eyebrow: "Быстрый расчет",
    est_title: "Рассчитайте ориентировочную стоимость онлайн",
    est_sub: "Выберите тип работ и площадь для мгновенной оценки стоимости проекта.",
    est_step_1: "1. Выберите тип работ",
    est_step_2: "2. Площадь / Объем",
    est_step_3: "3. Качество материалов",
    est_tier_std: "Стандарт", est_tier_std_desc: "Надежное базовое качество",
    est_tier_prem: "Премиум", est_tier_prem_desc: "Популярные европейские бренды",
    est_tier_lux: "Люкс / Дизайн", est_tier_lux_desc: "Эксклюзивная отделка",
    est_opt_demo: "Включить демонтаж и вывоз мусора",
    est_opt_mat: "Включить качественные материалы",
    est_est_price: "Ориентировочная стоимость:",
    est_apply_btn: "Запросить смету по этому расчету",
    est_disclaimer: "* Ориентировочный расчет с НДС. Точная стоимость определяется после бесплатного выезда на объект.",

    // Services section
    services_label: "Наши Направления",
    services_title: "Чем Bouwvast может вам помочь?",
    services_sub: "Узнайте больше о каждом направлении, перечне работ и прозрачных ценах.",
    services_all: "Все услуги",
    more_info: "Подробнее об услуге →",

    // Service names & descriptions
    svc_renovation: "Комплексный Ремонт Жилья",
    svc_renovation_desc: "Полный или частичный ремонт домов и коммерческих помещений «под ключ».",
    svc_finishing: "Штукатурка и Отделка",
    svc_finishing_desc: "Идеально гладкая штукатурка под покраску, перегородки из гипсокартона и потолки.",
    svc_painting: "Малярные Работы (Интерьер и Фасад)",
    svc_painting_desc: "Профессиональная безвоздушная покраска стен, лакировка окон и дверей со сниженным НДС 9%.",
    svc_facade: "Фасадные и Каменные Работы",
    svc_facade_desc: "Обновление швов, ремонт кирпичной кладки, гидрофобизация и утепление фасадов.",
    svc_assembly: "Монтаж и Установка",
    svc_assembly_desc: "Точная установка кухонь, дверей, встроенных шкафов и элементов интерьера.",
    svc_maintenance: "Обслуживание и Ремонт",
    svc_maintenance_desc: "Мелкий и крупный ремонт, устранение сырости и плановое обслуживание недвижимости.",
    svc_bathroom: "Ванные Комнаты и Санузлы",
    svc_bathroom_desc: "Полный ремонт ванных, душевые трапы, крупноформатная плитка и монтаж сантехники.",
    svc_general: "Общестроительные Работы",
    svc_general_desc: "Мультидисциплинарные строительные проекты от проектирования до чистовой сдачи.",

    // Before/After
    ba_label: "Разница",
    ba_title: "До и После: Реальные превращения",
    ba_sub: "Потяните ползунок, чтобы увидеть пространство до и после наших работ.",
    ba_before: "ДО",
    ba_after: "ПОСЛЕ",
    ba_hint: "Тяните для сравнения",

    // Audience
    aud_label: "Для кого",
    aud_title: "Для частных клиентов и партнеров",
    aud_sub: "Будь то ремонт квартиры, ванной или потребность генподрядчика в надежных бригадах — Bouwvast готов помочь.",
    aud_part_title: "Частные клиенты",
    aud_part_heading: "Для вашего дома и ремонта",
    aud_part_desc: "От ремонта санузла до полной реновации дома. Честные сметы и персональный менеджер.",
    aud_b2b_title: "Бизнес и Партнеры",
    aud_b2b_heading: "Для застройщиков, ТСЖ (VvE) и управляющих компаний",
    aud_b2b_desc: "Гибкое предоставление опытных строительных бригад на объекты любого масштаба.",

    // How it works
    how_label: "Процесс",
    how_title: "4 шага к качественному ремонту",
    how_cta: "Запросить бесплатную смету",
    how_1_title: "1. Онлайн-заявка",
    how_1_desc: "Опишите задачу через форму или мгновенно рассчитайте примерную стоимость в калькуляторе.",
    how_2_title: "2. Осмотр и Консультация",
    how_2_desc: "Обсуждаем детали и при необходимости проводим бесплатный осмотр на объекте.",
    how_3_title: "3. Прозрачная Смета",
    how_3_desc: "Вы получаете детализированное предложение с фиксированными сроками и стоимостью.",
    how_4_title: "4. Качественная Сдача",
    how_4_desc: "Наши мастера аккуратно выполняют работу. Сдача объекта происходит после вашего полного одобрения.",

    // Reviews
    rev_label: "Отзывы клиентов",
    rev_title: "Рейтинг 4.9 / 5.0",
    rev_sub: "На основе более 120 проверенных отзывов владельцев жилья и бизнес-клиентов по всей стране.",

    // Pricing
    price_label: "Тарифы",
    price_title: "Прозрачные расценки заранее",
    price_sub: "В Bouwvast действуют прозрачные цены без скрытых платежей и непредвиденных доплат.",

    // FAQ
    faq_label: "FAQ",
    faq_title: "Частые вопросы о ремонте",
    faq_1_q: "Какие виды работ вы выполняете?",
    faq_1_a: "Мы выполняем полный комплекс: ремонт жилья, санузлы, штукатурку, покраску, столярные работы, сантехнику, фасады и обслуживание.",
    faq_2_q: "Работаете ли вы с компаниями?",
    faq_2_a: "Да, мы ежедневно сотрудничаем с частными клиентами, генподрядчиками, ТСЖ (VvE) и управляющими компаниями.",
    faq_3_q: "В каких регионах вы работаете?",
    faq_3_a: "Работаем по всем Нидерландам с фокусом на крупных городах.",
    faq_4_q: "Обязывает ли меня к чему-то расчет сметы?",
    faq_4_a: "Нет, расчет стоимости и консультация абсолютно бесплатны и ни к чему не обязывают.",

    // Form & Modals
    form_title: "Запросите бесплатную смету",
    form_sub: "Четкий ответ и расчет стоимости в течение 24 часов.",
    form_name: "Ваше имя",
    form_phone: "Номер телефона",
    form_email: "Электронная почта",
    form_city: "Город / Индекс",
    form_type: "Категория работ",
    form_desc: "Опишите ваш проект и пожелания...",
    form_date: "Желаемая дата начала",
    form_submit: "Отправить заявку →",
    form_privacy: "Ваши данные строго конфиденциальны и используются только для составления сметы.",
    form_success_title: "Заявка успешно принята!",
    form_success_sub: "Спасибо! Наш специалист свяжется с вами в течение 24 часов.",

    // CTA
    cta_title: "Готовы начать ремонт?",
    cta_sub: "Запросите бесплатную смету прямо сейчас или позвоните нашим специалистам.",
    cta_btn: "Получить смету",

    // Footer
    footer_desc: "Надежная строительно-ремонтная платформа Нидерландов. Мастерство, прозрачные цены и четкая коммуникация для каждого проекта.",
    footer_info: "Информация",
    footer_services: "Услуги",
    footer_cities: "Крупные Города",
    footer_privacy: "Политика конфиденциальности",
    footer_terms: "Условия использования",
    footer_partner: "Стать партнером",
    footer_rights: "Все права защищены.",
  },
} as const;

export default translations;

export function t(lang: Lang, key: TranslationKey): string {
  const dict = translations[lang] || translations.nl;
  return (dict[key] || translations.nl[key] || key) as string;
}
