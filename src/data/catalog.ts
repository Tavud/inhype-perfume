import {
  DiscoveryAnswers,
  DiscoveryMatchResult,
  FragranceCategory,
  Locale,
  PerfumeProduct,
  ScentFamily,
} from '@/types/perfume';

/**
 * Centralized catalog data structure.
 * Note: Items marked with `isDemoData: true` serve as structured demonstration entries
 * to showcase catalog filtering, olfactory pyramids, and the scent discovery matching engine
 * prior to connecting live production inventory in Supabase.
 */
export const DEMO_CATALOG: PerfumeProduct[] = [
  {
    id: 'inhype-01',
    slug: 'velours-d-ombre-extrait',
    brand: 'MAISON CRIVELLI · DEMO',
    name: {
      ru: 'Velours d’Ombre',
      kz: 'Velours d’Ombre',
      en: 'Velours d’Ombre',
    },
    subtitle: {
      ru: 'Тёмный бархат какао, дымный ветивер и смолистый лабданум',
      kz: 'Қара барқыт какао, түтінді ветивер және шайырлы лабданум',
      en: 'Dark velvet cacao, smoky vetiver, and resinous labdanum',
    },
    description: {
      ru: 'Глубокая вечерняя композиция, построенная на контрасте сухого гаитянского ветивера и тёплой бархатистой амбры. Раскрывается плотным, но сдержанным шлейфом с оттенками горького какао и выдержанной древесины.',
      kz: 'Құрғақ Гаити ветивері мен жылы барқыт амбраның контрастына құрылған терең кешкі композиция. Ащы какао мен ағаш реңктері бар ұстамды шлейфпен ашылады.',
      en: 'A nocturnal composition built on the interplay of dry Haitian vetiver and warm velvety amber. Evolves into an enveloping, tailored trail nuanced with bitter cacao and aged woods.',
    },
    editorialNote: {
      ru: 'Идеален для прохладного вечера и камерных пространств. На тёплой коже на первый план выходят смолистые полутона лабданума.',
      kz: 'Салқын кеш пен камералық кездесулерге мінсіз үйлеседі. Жылы теріде лабданумның шайырлы реңктері айқындалады.',
      en: 'Suited for cool evenings and intimate interiors. On warm skin, the resinous facets of labdanum take center stage.',
    },
    category: 'extrait',
    scentFamilies: ['woody', 'oriental'],
    character: ['mysterious', 'enveloping'],
    intensity: 'intense',
    occasions: ['evening-soiree', 'cold-season'],
    concentration: 'Extrait de Parfum · 32%',
    olfactoryPyramid: {
      top: [
        { ru: 'Розовый перец', kz: 'Қызғылт бұрыш', en: 'Pink Pepper' },
        { ru: 'Бергамот из Калабрии', kz: 'Калабрия бергамоты', en: 'Calabrian Bergamot' },
        { ru: 'Семена кардамона', kz: 'Кардамон дәндері', en: 'Cardamom Seeds' },
      ],
      heart: [
        { ru: 'Абсолют какао', kz: 'Какао абсолюті', en: 'Cacao Absolute' },
        { ru: 'Дамасская роза', kz: 'Дамаск раушаны', en: 'Damask Rose' },
        { ru: 'Кедр Атласский', kz: 'Атлас балқарағайы', en: 'Atlas Cedar' },
      ],
      base: [
        { ru: 'Гаитянский ветивер', kz: 'Гаити ветивері', en: 'Haitian Vetiver' },
        { ru: 'Испанский лабданум', kz: 'Испан лабданумы', en: 'Spanish Labdanum' },
        { ru: 'Листья пачули', kz: 'Пачули жапырақтары', en: 'Patchouli Leaf' },
      ],
    },
    volumes: [
      { volumeMl: 30, priceKzt: 78000, inStock: true, sku: 'INH-VO-030' },
      { volumeMl: 50, priceKzt: 118000, inStock: true, sku: 'INH-VO-050' },
      { volumeMl: 100, priceKzt: 168000, inStock: false, sku: 'INH-VO-100' },
    ],
    images: [
      '/images/perfumes/velours-d-ombre-1.svg',
      '/images/perfumes/velours-d-ombre-2.svg',
      '/images/perfumes/velours-d-ombre-3.svg',
    ],
    featured: true,
    inStock: true,
    isDemoData: true,
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'inhype-02',
    slug: 'iris-mineral-edp',
    brand: 'ATELIER MATERI · DEMO',
    name: {
      ru: 'Iris Minéral',
      kz: 'Iris Minéral',
      en: 'Iris Minéral',
    },
    subtitle: {
      ru: 'Прохладный корень ириса, белый мускус и минеральный аккорд камня',
      kz: 'Салқын ирис тамыры, ақ мускус және тастың минералды аккорды',
      en: 'Cool iris pallida rhizome, white musk, and mineral stone accord',
    },
    description: {
      ru: 'Чистая архитектурная композиция, вдохновлённая прикосновением к прохладному необработанному мрамору. Пудровая мягкость флорентийского ириса уравновешена свежим альдегидно-минеральным стартом и тонким древесным фоном.',
      kz: 'Салқын мәрмәр тастың әсерінен шабыт алған таза архитектуралық композиция. Флоренциялық иристің жұмсақтығы минералды бастаумен және нәзік ағаш фонымен теңгерілген.',
      en: 'A clean architectural composition inspired by cool unpolished marble. The powdery softness of Florentine iris is balanced by a crisp mineral opening and a sheer woody foundation.',
    },
    editorialNote: {
      ru: 'Безупречен в качестве повседневного парфюмерного почерка. Звучит деликатно, создавая ощущение чистоты и собранности.',
      kz: 'Күнделікті парфюмерлік қолтаңба ретінде мінсіз. Тазалық пен жинақылық сезімін сыйлайды.',
      en: 'Impeccable as a daily olfactory signature. Wears close to the skin with an aura of composure and clarity.',
    },
    category: 'eau-de-parfum',
    scentFamilies: ['musky', 'floral', 'woody'],
    character: ['architectural', 'intimate'],
    intensity: 'delicate',
    occasions: ['daily-signature', 'warm-season'],
    concentration: 'Eau de Parfum · 20%',
    olfactoryPyramid: {
      top: [
        { ru: 'Семена ангелики', kz: 'Ангелика дәндері', en: 'Angelica Seeds' },
        { ru: 'Лист фиалки', kz: 'Шегіргүл жапырағы', en: 'Violet Leaf' },
        { ru: 'Минеральный аккорд', kz: 'Минералды аккорд', en: 'Mineral Accord' },
      ],
      heart: [
        { ru: 'Масло ириса Паллида', kz: 'Ирис Паллида майы', en: 'Iris Pallida Butter' },
        { ru: 'Белый чай', kz: 'Ақ шай', en: 'White Tea' },
        { ru: 'Гелиотроп', kz: 'Гелиотроп', en: 'Heliotrope' },
      ],
      base: [
        { ru: 'Амбретта (растительный мускус)', kz: 'Амбретта (өсімдік мускусы)', en: 'Ambrette Seed' },
        { ru: 'Белый кедр', kz: 'Ақ балқарағай', en: 'White Cedarwood' },
        { ru: 'Кашмеран', kz: 'Кашмеран', en: 'Cashmeran' },
      ],
    },
    volumes: [
      { volumeMl: 50, priceKzt: 96000, inStock: true, sku: 'INH-IM-050' },
      { volumeMl: 100, priceKzt: 138000, inStock: true, sku: 'INH-IM-100' },
    ],
    images: [
      '/images/perfumes/iris-mineral-1.svg',
      '/images/perfumes/iris-mineral-2.svg',
      '/images/perfumes/iris-mineral-3.svg',
    ],
    featured: true,
    inStock: true,
    isDemoData: true,
    createdAt: '2026-01-20T10:00:00Z',
  },
  {
    id: 'inhype-03',
    slug: 'cuir-de-steppe-atelier',
    brand: 'INHYPE ATELIER SELECTION · DEMO',
    name: {
      ru: 'Cuir de Steppe',
      kz: 'Cuir de Steppe',
      en: 'Cuir de Steppe',
    },
    subtitle: {
      ru: 'Пряный шафран, тонкая замша, дикая полынь и тёплый сандал',
      kz: 'Татымды запырангүл, жұмсақ күдері, дала жусаны және жылы сандал',
      en: 'Spiced saffron, supple suede, wild artemisia, and warm sandalwood',
    },
    description: {
      ru: 'Посвящение простору и тёплому ветру: травянистая горечь полыни и благородный шафран плавно переходят в мягкий аккорд светлой замши и сливочного сандала.',
      kz: 'Кең дала мен жылы желге арнау: жусанның ащы реңкі мен запырангүл біртіндеп ашық күдері мен жұмсақ сандал аккордына ұласады.',
      en: 'An ode to open horizons and warm winds: the herbal bitterness of artemisia and noble saffron melt into supple blond suede and creamy sandalwood.',
    },
    editorialNote: {
      ru: 'Сбалансированный кожаный аромат без тяжести: замшевый аккорд звучит мягко и пластично в любое время года.',
      kz: 'Ауырлықсыз теңгерімді былғары хош иісі: күдері аккорды жылдың кез келген мезгілінде жұмсақ ашылады.',
      en: 'A refined leather composition without heaviness; the suede accord wears effortlessly across seasons.',
    },
    category: 'atelier-edition',
    scentFamilies: ['leather', 'woody', 'oriental'],
    character: ['enveloping', 'architectural'],
    intensity: 'expressive',
    occasions: ['daily-signature', 'cold-season', 'evening-soiree'],
    concentration: 'Eau de Parfum Concentrée · 25%',
    olfactoryPyramid: {
      top: [
        { ru: 'Дикая полынь', kz: 'Дала жусаны', en: 'Wild Artemisia' },
        { ru: 'Красный шафран', kz: 'Қызыл запырангүл', en: 'Red Saffron' },
        { ru: 'Ягоды можжевельника', kz: 'Арша жидектері', en: 'Juniper Berries' },
      ],
      heart: [
        { ru: 'Светлая замша', kz: 'Ашық күдері', en: 'Blond Suede' },
        { ru: 'Лист табака', kz: 'Темекі жапырағы', en: 'Tobacco Leaf' },
        { ru: 'Корень ириса', kz: 'Ирис тамыры', en: 'Orris Root' },
      ],
      base: [
        { ru: 'Австралийский сандал', kz: 'Австралия сандалы', en: 'Australian Sandalwood' },
        { ru: 'Смола элеми', kz: 'Элеми шайыры', en: 'Elemi Resin' },
        { ru: 'Сухая амбра', kz: 'Құрғақ амбра', en: 'Dry Amber' },
      ],
    },
    volumes: [
      { volumeMl: 30, priceKzt: 69000, inStock: true, sku: 'INH-CS-030' },
      { volumeMl: 50, priceKzt: 105000, inStock: true, sku: 'INH-CS-050' },
      { volumeMl: 100, priceKzt: 152000, inStock: true, sku: 'INH-CS-100' },
    ],
    images: [
      '/images/perfumes/cuir-de-steppe-1.svg',
      '/images/perfumes/cuir-de-steppe-2.svg',
      '/images/perfumes/cuir-de-steppe-3.svg',
    ],
    featured: true,
    inStock: true,
    isDemoData: true,
    createdAt: '2026-02-02T10:00:00Z',
  },
  {
    id: 'inhype-04',
    slug: 'lumiere-de-neroli-edp',
    brand: 'MATIERE PREMIERE · DEMO',
    name: {
      ru: 'Lumière de Néroli',
      kz: 'Lumière de Néroli',
      en: 'Lumière de Néroli',
    },
    subtitle: {
      ru: 'Солнечный нероли, горький петитгрейн, инжирный лист и белый кедр',
      kz: 'Шуақты нероли, ащы петитгрейн, інжір жапырағы және ақ балқарағай',
      en: 'Sunlit neroli, bitter petitgrain, fig leaf, and white cedar',
    },
    description: {
      ru: 'Светлая средиземноморская композиция с высокой концентрацией натурального масла цветков горького апельсина. Зелёная свежесть инжирного листа придаёт цитрусовому старту современную глубину и стойкость.',
      kz: 'Ащы апельсин гүлдерінің табиғи майы негізіндегі жарқын композиция. Інжір жапырағының жасыл балғындығы цитрусты бастауға тереңдік пен тұрақтылық береді.',
      en: 'A luminous composition centered around natural bitter orange blossom oil. Crisp green fig leaf lends contemporary depth and remarkable longevity to the citrus opening.',
    },
    editorialNote: {
      ru: 'Дарит ощущение утреннего света и свежего воздуха. Особенно красиво раскрывается в тёплую погоду и в дневное время.',
      kz: 'Таңғы жарық пен таза ауа сезімін сыйлайды. Жылы маусымда және күндізгі уақытта ерекше әдемі ашылады.',
      en: 'Evokes morning light and open air. Blossoms effortlessly in warmer weather and daytime settings.',
    },
    category: 'eau-de-parfum',
    scentFamilies: ['fresh', 'floral'],
    character: ['luminous', 'intimate'],
    intensity: 'moderate',
    occasions: ['warm-season', 'daily-signature'],
    concentration: 'Eau de Parfum · 22%',
    olfactoryPyramid: {
      top: [
        { ru: 'Зелёный бергамот', kz: 'Жасыл бергамот', en: 'Green Bergamot' },
        { ru: 'Петитгрейн из Парагвая', kz: 'Парагвай петитгрейні', en: 'Paraguayan Petitgrain' },
        { ru: 'Лист инжира', kz: 'Інжір жапырағы', en: 'Fig Leaf' },
      ],
      heart: [
        { ru: 'Тунисский нероли', kz: 'Тунис неролиі', en: 'Tunisian Neroli' },
        { ru: 'Абсолют флёрдоранжа', kz: 'Флердоранж абсолюті', en: 'Orange Blossom Absolute' },
        { ru: 'Семена кориандра', kz: 'Кориандр дәндері', en: 'Coriander Seed' },
      ],
      base: [
        { ru: 'Белый мускус', kz: 'Ақ мускус', en: 'White Musk' },
        { ru: 'Кедр Вирджиния', kz: 'Вирджиния балқарағайы', en: 'Virginia Cedar' },
        { ru: 'Ветивер', kz: 'Ветивер', en: 'Vetiver' },
      ],
    },
    volumes: [
      { volumeMl: 30, priceKzt: 64000, inStock: true, sku: 'INH-LN-030' },
      { volumeMl: 100, priceKzt: 129000, inStock: true, sku: 'INH-LN-100' },
    ],
    images: [
      '/images/perfumes/lumiere-de-neroli-1.svg',
      '/images/perfumes/lumiere-de-neroli-2.svg',
      '/images/perfumes/lumiere-de-neroli-3.svg',
    ],
    featured: true,
    inStock: true,
    isDemoData: true,
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'inhype-05',
    slug: 'ambre-santal-nocturne',
    brand: 'BDK PARFUMS · DEMO',
    name: {
      ru: 'Ambre Santal Nocturne',
      kz: 'Ambre Santal Nocturne',
      en: 'Ambre Santal Nocturne',
    },
    subtitle: {
      ru: 'Чёрная ваниль Мадагаскара, обжаренный миндаль, бензоин и сандал',
      kz: 'Мадагаскар қара ванилі, қуырылған бадам, бензоин және сандал',
      en: 'Madagascar black vanilla, roasted almond, benzoin resin, and sandalwood',
    },
    description: {
      ru: 'Утончённая гурманско-древесная симфония без излишней сладости. Стручки мадагаскарской ванили и сиамский бензоин переплетаются с сухой древесиной сандала и пряным мускатным орехом.',
      kz: 'Артық тәттіліксіз талғампаз гурман-ағаш симфониясы. Мадагаскар ванилі мен бензоин құрғақ сандал ағашымен және мускат жаңғағымен үйлеседі.',
      en: 'A sophisticated gourmand-woody composition free of cloying sweetness. Madagascar vanilla pods and Siamese benzoin intertwine with dry sandalwood and nutmeg.',
    },
    category: 'extrait',
    scentFamilies: ['gourmand', 'oriental', 'woody'],
    character: ['enveloping', 'mysterious'],
    intensity: 'intense',
    occasions: ['evening-soiree', 'cold-season'],
    concentration: 'Extrait de Parfum · 30%',
    olfactoryPyramid: {
      top: [
        { ru: 'Горький миндаль', kz: 'Ащы бадам', en: 'Bitter Almond' },
        { ru: 'Мускатный орех', kz: 'Мускат жаңғағы', en: 'Nutmeg' },
        { ru: 'Ром выдержанный', kz: 'Кәрі ром аккорды', en: 'Aged Rum Accord' },
      ],
      heart: [
        { ru: 'Сиамский бензоин', kz: 'Сиам бензоині', en: 'Siamese Benzoin' },
        { ru: 'Абсолют бобов тонка', kz: 'Тонка бұршағы абсолюті', en: 'Tonka Bean Absolute' },
        { ru: 'Корица цейлонская', kz: 'Цейлон даршыны', en: 'Ceylon Cinnamon' },
      ],
      base: [
        { ru: 'Чёрная ваниль', kz: 'Қара ваниль', en: 'Black Vanilla Pod' },
        { ru: 'Сандал Майсур', kz: 'Майсур сандалы', en: 'Mysore Sandalwood' },
        { ru: 'Гваяковое дерево', kz: 'Гваяк ағашы', en: 'Guaiac Wood' },
      ],
    },
    volumes: [
      { volumeMl: 50, priceKzt: 112000, inStock: true, sku: 'INH-ASN-050' },
      { volumeMl: 100, priceKzt: 159000, inStock: true, sku: 'INH-ASN-100' },
    ],
    images: [
      '/images/perfumes/ambre-santal-nocturne-1.svg',
      '/images/perfumes/ambre-santal-nocturne-2.svg',
      '/images/perfumes/ambre-santal-nocturne-3.svg',
    ],
    featured: false,
    inStock: true,
    isDemoData: true,
    createdAt: '2026-02-14T10:00:00Z',
  },
  {
    id: 'inhype-06',
    slug: 'rose-encens-brut',
    brand: 'LIQUIDES IMAGINAIRES · DEMO',
    name: {
      ru: 'Rose Encens Brut',
      kz: 'Rose Encens Brut',
      en: 'Rose Encens Brut',
    },
    subtitle: {
      ru: 'Бордовая роза, оманский ладан, чёрный перец и папирус',
      kz: 'Қою қызыл раушан, Оман ладаны, қара бұрыш және папирус',
      en: 'Crimson rose, Omani frankincense, black pepper, and papyrus',
    },
    description: {
      ru: 'Драматичный взгляд на классическую розу: лепестки майской розы погружены в прохладный дым белого оманского ладана и сухую древесную фактуру папируса.',
      kz: 'Классикалық раушанға жаңа көзқарас: раушан күлтелері Оман ладанының салқын түтіні мен папирустың құрғақ ағаш фактурасына оранған.',
      en: 'A dramatic study of rose: crimson petals immersed in cool white Omani frankincense smoke and the dry woody texture of papyrus.',
    },
    category: 'eau-de-parfum',
    scentFamilies: ['floral', 'woody', 'oriental'],
    character: ['mysterious', 'architectural'],
    intensity: 'expressive',
    occasions: ['evening-soiree', 'cold-season'],
    concentration: 'Eau de Parfum · 24%',
    olfactoryPyramid: {
      top: [
        { ru: 'Чёрный перец Мадагаскара', kz: 'Мадагаскар қара бұрышы', en: 'Madagascar Black Pepper' },
        { ru: 'Олибанум (ладан)', kz: 'Олибанум (ладан)', en: 'Olibanum' },
      ],
      heart: [
        { ru: 'Абсолют турецкой розы', kz: 'Түрік раушаны абсолюті', en: 'Turkish Rose Absolute' },
        { ru: 'Герань бурбон', kz: 'Бурбон герані', en: 'Bourbon Geranium' },
        { ru: 'Мирра', kz: 'Мирра', en: 'Myrrh Resin' },
      ],
      base: [
        { ru: 'Папирус', kz: 'Папирус', en: 'Papyrus Wood' },
        { ru: 'Кедр', kz: 'Балқарағай', en: 'Cedarwood' },
        { ru: 'Лабданум', kz: 'Лабданум', en: 'Labdanum' },
      ],
    },
    volumes: [
      { volumeMl: 50, priceKzt: 98000, inStock: true, sku: 'INH-REB-050' },
      { volumeMl: 100, priceKzt: 142000, inStock: true, sku: 'INH-REB-100' },
    ],
    images: [
      '/images/perfumes/rose-encens-brut-1.svg',
      '/images/perfumes/rose-encens-brut-2.svg',
      '/images/perfumes/rose-encens-brut-3.svg',
    ],
    featured: false,
    inStock: true,
    isDemoData: true,
    createdAt: '2026-02-18T10:00:00Z',
  },
  {
    id: 'inhype-07',
    slug: 'cedre-blanc-vapeur',
    brand: 'BYREDO · DEMO',
    name: {
      ru: 'Cèdre Blanc Vapeur',
      kz: 'Cèdre Blanc Vapeur',
      en: 'Cèdre Blanc Vapeur',
    },
    subtitle: {
      ru: 'Светлая древесина хиноки, сибирская сосна, зелёный чай и чистый мускус',
      kz: 'Хиноки ағашы, сібір қарағайы, көк шай және таза мускус',
      en: 'Pale hinoki wood, Siberian pine needle, green tea, and sheer musk',
    },
    description: {
      ru: 'Медитативный древесно-свежий аромат, передающий атмосферу утреннего хвойного леса после дождя и тёплого пара японского кипариса хиноки.',
      kz: 'Жаңбырдан кейінгі қылқан жапырақты орман мен жапондық хиноки ағашының атмосферасын беретін медитативті ағаш-балғын хош иіс.',
      en: 'A meditative woody-fresh composition capturing a rain-washed coniferous forest and the warm steam of Japanese hinoki cypress.',
    },
    category: 'eau-de-parfum',
    scentFamilies: ['woody', 'fresh', 'musky'],
    character: ['luminous', 'architectural', 'intimate'],
    intensity: 'moderate',
    occasions: ['daily-signature', 'warm-season'],
    concentration: 'Eau de Parfum · 18%',
    olfactoryPyramid: {
      top: [
        { ru: 'Юзу японский', kz: 'Жапон юзуы', en: 'Japanese Yuzu' },
        { ru: 'Иглы сосны', kz: 'Қарағай инелері', en: 'Pine Needles' },
        { ru: 'Эвкалипт', kz: 'Эвкалипт', en: 'Eucalyptus Leaf' },
      ],
      heart: [
        { ru: 'Древесина хиноки', kz: 'Хиноки ағашы', en: 'Hinoki Wood' },
        { ru: 'Лист сенча', kz: 'Сенча шай жапырағы', en: 'Sencha Tea Leaf' },
        { ru: 'Лаванда горная', kz: 'Тау лавандасы', en: 'High-Altitude Lavender' },
      ],
      base: [
        { ru: 'Кедр', kz: 'Балқарағай', en: 'Cedarwood' },
        { ru: 'Ветивер', kz: 'Ветивер', en: 'Vetiver' },
        { ru: 'Прозрачный мускус', kz: 'Мөлдір мускус', en: 'Sheer White Musk' },
      ],
    },
    volumes: [
      { volumeMl: 50, priceKzt: 89000, inStock: false, sku: 'INH-CBV-050' },
      { volumeMl: 100, priceKzt: 132000, inStock: false, sku: 'INH-CBV-100' },
    ],
    images: [
      '/images/perfumes/cedre-blanc-vapeur-1.svg',
      '/images/perfumes/cedre-blanc-vapeur-2.svg',
      '/images/perfumes/cedre-blanc-vapeur-3.svg',
    ],
    featured: false,
    inStock: false,
    isDemoData: true,
    createdAt: '2026-02-22T10:00:00Z',
  },
  {
    id: 'inhype-08',
    slug: 'atelier-discovery-coffret',
    brand: 'INHYPE ATELIER SELECTION · DEMO',
    name: {
      ru: 'Atelier Discovery Coffret (5 × 3 мл)',
      kz: 'Atelier Discovery Coffret (5 × 3 мл)',
      en: 'Atelier Discovery Coffret (5 × 3 ml)',
    },
    subtitle: {
      ru: 'Кураторский сет из пяти знаковых направлений для знакомства на коже',
      kz: 'Теріде сынап көруге арналған бес негізгі бағыттағы кураторлық жинақ',
      en: 'Curated set of five signature olfactory directions for skin testing',
    },
    description: {
      ru: 'Набор атомайзеров в фирменном футляре цвета тёплой слоновой кости. Позволяет спокойно разносить пять различных ольфакторных профилей (древесный, минерально-ирисовый, кожаный, цитрусовый нероли и пряно-амбровый) в разное время суток.',
      kz: 'Фирмалық қораптағы атомайзерлер жинағы. Бес түрлі ольфакторлық профильді тәуліктің әр уақытында асықпай сынап көруге мүмкіндік береді.',
      en: 'A set of five glass atomizers presented in an ivory atelier case. Designed to let you experience five distinct olfactory profiles across different hours and settings.',
    },
    category: 'discovery-set',
    scentFamilies: ['woody', 'floral', 'oriental', 'fresh', 'leather'],
    character: ['intimate', 'luminous', 'enveloping'],
    intensity: 'moderate',
    occasions: ['daily-signature', 'evening-soiree', 'warm-season', 'cold-season'],
    concentration: 'Extrait & Eau de Parfum Assortment',
    volumes: [
      { volumeMl: 15, priceKzt: 32000, inStock: true, sku: 'INH-SET-015' },
    ],
    images: [
      '/images/perfumes/atelier-discovery-coffret-1.svg',
      '/images/perfumes/atelier-discovery-coffret-2.svg',
      '/images/perfumes/atelier-discovery-coffret-3.svg',
    ],
    featured: false,
    inStock: true,
    isDemoData: true,
    createdAt: '2026-02-25T10:00:00Z',
  },
];

export function getMinimumPrice(product: PerfumeProduct): number {
  if (!product.volumes.length) return 0;
  return Math.min(...product.volumes.map((v) => v.priceKzt));
}

export function getAllBrands(products: PerfumeProduct[]): string[] {
  return Array.from(new Set(products.map((p) => p.brand))).sort();
}

export function getProductBySlug(
  slug: string,
  products: PerfumeProduct[] = DEMO_CATALOG
): PerfumeProduct | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  current: PerfumeProduct,
  products: PerfumeProduct[] = DEMO_CATALOG,
  limit = 3
): PerfumeProduct[] {
  return products
    .filter((p) => p.id !== current.id)
    .map((candidate) => {
      const sharedFamilies = candidate.scentFamilies.filter((f) =>
        current.scentFamilies.includes(f)
      ).length;
      const sharedCharacter = candidate.character.filter((c) =>
        current.character.includes(c)
      ).length;
      const sameCategory = candidate.category === current.category ? 1 : 0;
      return {
        product: candidate,
        score: sharedFamilies * 3 + sharedCharacter * 2 + sameCategory,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);
}

/**
 * Deterministic scent matching engine that evaluates customer quiz answers
 * against real product attributes (character, scent families, intensity, occasion, and volume pricing).
 */
export function matchFragrancesToAnswers(
  answers: DiscoveryAnswers,
  products: PerfumeProduct[] = DEMO_CATALOG
): DiscoveryMatchResult[] {
  const results: DiscoveryMatchResult[] = [];

  for (const product of products) {
    let score = 0;
    let maxPossible = 0;
    const matchedReasons: { ru: string; kz: string; en: string }[] = [];

    // 1. Character match (weight: 30)
    if (answers.character) {
      maxPossible += 30;
      if (product.character.includes(answers.character)) {
        score += 30;
        matchedReasons.push({
          ru: 'Совпадает с выбранным характером звучания',
          kz: 'Таңдалған хош иіс мінезімен сәйкес келеді',
          en: 'Matches your preferred fragrance character',
        });
      }
    }

    // 2. Scent families match (weight: 35)
    if (answers.families.length > 0) {
      maxPossible += 35;
      const matchingFamilies = product.scentFamilies.filter((f: ScentFamily) =>
        answers.families.includes(f)
      );
      if (matchingFamilies.length > 0) {
        const ratio = Math.min(
          1,
          matchingFamilies.length / Math.min(2, answers.families.length)
        );
        score += Math.round(35 * ratio);
        matchedReasons.push({
          ru: `Содержит любимые ольфакторные направления (${matchingFamilies.length})`,
          kz: `Таңдалған хош иіс бағыттарын қамтиды (${matchingFamilies.length})`,
          en: `Features your selected olfactory families (${matchingFamilies.length})`,
        });
      }
    }

    // 3. Intensity match (weight: 15)
    if (answers.intensity) {
      maxPossible += 15;
      if (product.intensity === answers.intensity) {
        score += 15;
        matchedReasons.push({
          ru: 'Точное совпадение по интенсивности и шлейфу',
          kz: 'Қарқындылығы мен шлейфі бойынша дәл сәйкестік',
          en: 'Exact match for your preferred intensity and sillage',
        });
      }
    }

    // 4. Occasion match (weight: 10)
    if (answers.occasion) {
      maxPossible += 10;
      if (product.occasions.includes(answers.occasion)) {
        score += 10;
        matchedReasons.push({
          ru: 'Подходит для выбранного сезона и ситуации',
          kz: 'Таңдалған маусым мен жағдайға сай келеді',
          en: 'Tailored for your chosen season and setting',
        });
      }
    }

    // 5. Budget match (weight: 10)
    if (answers.budgetRange && answers.budgetRange !== 'any') {
      maxPossible += 10;
      const fitsBudget = product.volumes.some((v) => {
        if (answers.budgetRange === 'under-80k') return v.priceKzt <= 80000;
        if (answers.budgetRange === '80k-140k')
          return v.priceKzt >= 80000 && v.priceKzt <= 140000;
        if (answers.budgetRange === 'above-140k') return v.priceKzt >= 140000;
        return true;
      });
      if (fitsBudget) {
        score += 10;
        matchedReasons.push({
          ru: 'Доступен объём в рамках указанного бюджета',
          kz: 'Көрсетілген бюджет аясында қолжетімді көлемі бар',
          en: 'Offers a bottle volume within your selected budget',
        });
      }
    }

    const matchPercentage =
      maxPossible > 0 ? Math.round((score / maxPossible) * 100) : 0;

    if (matchPercentage >= 35) {
      results.push({
        product,
        score,
        matchPercentage,
        matchedReasons,
      });
    }
  }

  return results.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

export function getLocalizedText(
  text: { ru: string; kz: string; en: string } | undefined,
  locale: Locale
): string {
  if (!text) return '';
  return text[locale] || text.ru;
}

export const CATEGORY_LIST: FragranceCategory[] = [
  'extrait',
  'eau-de-parfum',
  'atelier-edition',
  'discovery-set',
];

export const SCENT_FAMILY_LIST: ScentFamily[] = [
  'woody',
  'oriental',
  'floral',
  'fresh',
  'leather',
  'gourmand',
  'musky',
];
