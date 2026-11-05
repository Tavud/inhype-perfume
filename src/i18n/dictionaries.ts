import {
  FragranceCategory,
  Locale,
  ScentCharacter,
  ScentFamily,
  ScentIntensity,
  ScentOccasion,
} from '@/types/perfume';

export interface Dictionary {
  meta: {
    siteTitle: string;
    siteDescription: string;
    catalogTitle: string;
    catalogDescription: string;
    discoveryTitle: string;
    discoveryDescription: string;
    favoritesTitle: string;
    cartTitle: string;
    checkoutTitle: string;
  };
  nav: {
    brandSubtitle: string;
    catalog: string;
    discovery: string;
    about: string;
    boutiques: string;
    favorites: string;
    cart: string;
    admin: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    editorialCaption: string;
  };
  featured: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAll: string;
    viewProduct: string;
    demoNotice: string;
  };
  discoveryBanner: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    stepLabel: string;
  };
  philosophy: {
    eyebrow: string;
    title: string;
    lead: string;
    paragraph1: string;
    paragraph2: string;
    pillars: {
      curationTitle: string;
      curationText: string;
      consultationTitle: string;
      consultationText: string;
      atmosphereTitle: string;
      atmosphereText: string;
    };
  };
  boutiquesSection: {
    eyebrow: string;
    title: string;
    subtitle: string;
    unconfirmedBadge: string;
    confirmedBadge: string;
    addressLabel: string;
    hoursLabel: string;
    contactLabel: string;
    verificationDisclaimer: string;
  };
  catalog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filtersTitle: string;
    brandFilter: string;
    allBrands: string;
    categoryFilter: string;
    allCategories: string;
    scentFamilyFilter: string;
    allFamilies: string;
    availabilityFilter: string;
    inStockOnly: string;
    sortLabel: string;
    sortFeatured: string;
    sortPriceAsc: string;
    sortPriceDesc: string;
    sortNameAsc: string;
    resetFilters: string;
    showingCount: string;
    emptyTitle: string;
    emptyDescription: string;
    inStock: string;
    outOfStock: string;
    fromPrice: string;
    volumesAvailable: string;
    viewDetails: string;
    addToFavorites: string;
    removeFromFavorites: string;
    demoCatalogBanner: string;
  };
  product: {
    backToCatalog: string;
    selectVolume: string;
    quantity: string;
    addToCart: string;
    addedToCart: string;
    inStock: string;
    outOfStock: string;
    olfactoryPyramid: string;
    topNotes: string;
    heartNotes: string;
    baseNotes: string;
    characterLabel: string;
    intensityLabel: string;
    occasionLabel: string;
    categoryLabel: string;
    scentFamiliesLabel: string;
    editorialNoteTitle: string;
    relatedTitle: string;
    relatedSubtitle: string;
    demoBadge: string;
    consultWhatsApp: string;
  };
  cart: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDescription: string;
    exploreCatalog: string;
    volume: string;
    remove: string;
    subtotal: string;
    total: string;
    proceedToCheckout: string;
    continueShopping: string;
    conciergeNote: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    backToCart: string;
    customerDetails: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    commentLabel: string;
    commentPlaceholder: string;
    orderSummary: string;
    submitWhatsApp: string;
    submitting: string;
    preparedTitle: string;
    preparedNotice: string;
    openWhatsAppAction: string;
    copyOrderText: string;
    copiedText: string;
    whatsappNotConfiguredTitle: string;
    whatsappNotConfiguredText: string;
    validation: {
      nameRequired: string;
      phoneInvalid: string;
      cityRequired: string;
      cartEmpty: string;
    };
    disclaimer: string;
  };
  discovery: {
    eyebrow: string;
    title: string;
    subtitle: string;
    stepOf: string;
    nextStep: string;
    prevStep: string;
    seeResults: string;
    restartQuiz: string;
    questions: {
      characterTitle: string;
      characterSubtitle: string;
      familiesTitle: string;
      familiesSubtitle: string;
      intensityTitle: string;
      intensitySubtitle: string;
      occasionTitle: string;
      occasionSubtitle: string;
      budgetTitle: string;
      budgetSubtitle: string;
    };
    budgetOptions: {
      under80k: string;
      between80kAnd140k: string;
      above140k: string;
      any: string;
    };
    results: {
      eyebrow: string;
      title: string;
      subtitle: string;
      matchScore: string;
      whyItMatches: string;
      noExactMatchTitle: string;
      noExactMatchText: string;
      consultSpecialist: string;
    };
  };
  favorites: {
    eyebrow: string;
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDescription: string;
    exploreCatalog: string;
    moveToCart: string;
    remove: string;
    syncNote: string;
  };
  footer: {
    description: string;
    navigationTitle: string;
    contactsTitle: string;
    legalTitle: string;
    instagramLabel: string;
    citiesLabel: string;
    citiesValue: string;
    privacyPolicy: string;
    orderTerms: string;
    copyright: string;
  };
  legal: {
    privacyTitle: string;
    privacyIntro: string;
    privacyPoints: string[];
    termsTitle: string;
    termsIntro: string;
    termsPoints: string[];
  };
  categories: Record<FragranceCategory, string>;
  scentFamilies: Record<ScentFamily, string>;
  characters: Record<ScentCharacter, string>;
  intensities: Record<ScentIntensity, string>;
  occasions: Record<ScentOccasion, string>;
}

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    meta: {
      siteTitle: 'INHYPE Perfume Atelier — Парфюмерное пространство в Казахстане',
      siteDescription:
        'Парфюмерное ателье INHYPE в Астане и Актобе. Кураторская селекция редких ароматов, индивидуальный подбор и консультации.',
      catalogTitle: 'Каталог ароматов — INHYPE Perfume Atelier',
      catalogDescription:
        'Исследуйте коллекцию селективной и нишевой парфюмерии в INHYPE Perfume Atelier. Фильтрация по нотам, семействам и характеру.',
      discoveryTitle: 'Интерактивный подбор аромата — INHYPE Perfume Atelier',
      discoveryDescription:
        'Ответьте на 5 вопросов о характере, нотах и поводе, чтобы найти ароматы, близкие вашей индивидуальности.',
      favoritesTitle: 'Избранные ароматы — INHYPE Perfume Atelier',
      cartTitle: 'Корзина — INHYPE Perfume Atelier',
      checkoutTitle: 'Оформление заказа — INHYPE Perfume Atelier',
    },
    nav: {
      brandSubtitle: 'Perfume Atelier',
      catalog: 'Каталог',
      discovery: 'Подбор аромата',
      about: 'О бренде',
      boutiques: 'Бутики',
      favorites: 'Избранное',
      cart: 'Корзина',
      admin: 'Ателье / Admin',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
    },
    hero: {
      eyebrow: 'INHYPE PERFUME ATELIER · KAZAKHSTAN',
      title: 'У каждого аромата свой характер. У каждого человека — свой',
      subtitle: 'Откройте аромат, который станет частью вашей индивидуальности',
      primaryCta: 'Исследовать ароматы',
      secondaryCta: 'Найти свой аромат',
      editorialCaption: 'Ольфакторная эстетика тишины, фактуры и личной памяти',
    },
    featured: {
      eyebrow: 'КУРАТОРСКАЯ СЕЛЕКЦИЯ',
      title: 'Ароматы, к которым возвращаются',
      subtitle:
        'Композиции с выразительной структурой и благородным звучанием на коже',
      viewAll: 'Перейти в полный каталог',
      viewProduct: 'Подробнее',
      demoNotice:
        'Демонстрационная витрина для предпросмотра архитектуры каталога до загрузки фактической номенклатуры',
    },
    discoveryBanner: {
      eyebrow: 'ОЛЬФАКТОРНЫЙ ПРОФИЛЬ',
      title: 'Не знаете, с чего начать?',
      description:
        'Ответьте на несколько вопросов, чтобы найти ароматы, близкие вашему характеру и предпочтениям',
      cta: 'Подобрать аромат',
      stepLabel: '5 вопросов · Персональный алгоритм сопоставления нот',
    },
    philosophy: {
      eyebrow: 'ФИЛОСОФИЯ ПРОСТРАНСТВА',
      title: 'Парфюмерия как продолжение внутреннего голоса',
      lead: 'INHYPE Perfume Atelier создано для вдумчивого знакомства с ароматами — без суеты, шаблонных решений и навязанных трендов.',
      paragraph1:
        'Мы рассматриваем парфюм не как аксессуар, а как невидимую архитектуру образа. Один и тот же аккорд звучит по-разному в зависимости от температуры кожи, ритма дня и настроения человека.',
      paragraph2:
        'В пространстве INHYPE внимание уделяется диалогу: от первого знакомства на блоттере до того, как базовые ноты раскрываются спустя часы.',
      pillars: {
        curationTitle: 'Вдумчивый отбор',
        curationText:
          'Внимание к чистоте композиции, глубине базы и многослойному раскрытию аромата во времени.',
        consultationTitle: 'Индивидуальный диалог',
        consultationText:
          'Подбор парфюмерного гардероба на основе ваших ольфакторных привычек, климата и случая.',
        atmosphereTitle: 'Камерная эстетика',
        atmosphereText:
          'Пространство в Астане и Актобе, где можно спокойно послушать и сравнить композиции.',
      },
    },
    boutiquesSection: {
      eyebrow: 'ГЕОГРАФИЯ ПРИСУТСТВИЯ',
      title: 'Пространства INHYPE в Казахстане',
      subtitle:
        'Посетите ателье для личной ольфакторной консультации или свяжитесь с нами онлайн',
      unconfirmedBadge: 'Демо-запись · Требует подтверждения перед публикацией',
      confirmedBadge: 'Подтверждённый филиал',
      addressLabel: 'Адрес',
      hoursLabel: 'График работы',
      contactLabel: 'Контакт',
      verificationDisclaimer:
        'Внимание: точные адреса, телефоны и часы работы филиалов в Астане и Актобе отображаются в режиме предпросмотра и требуют утверждения перед публичным запуском.',
    },
    catalog: {
      eyebrow: 'КОЛЛЕКЦИЯ ATELIER',
      title: 'Каталог парфюмерии',
      subtitle:
        'Исследуйте композиции по ольфакторным семействам, концентрации и характеру звучания',
      searchPlaceholder: 'Поиск по названию или бренду...',
      filtersTitle: 'Фильтры',
      brandFilter: 'Бренд',
      allBrands: 'Все бренды',
      categoryFilter: 'Категория',
      allCategories: 'Все категории',
      scentFamilyFilter: 'Ароматическое направление',
      allFamilies: 'Все направления',
      availabilityFilter: 'Наличие',
      inStockOnly: 'Только в наличии',
      sortLabel: 'Сортировка',
      sortFeatured: 'Рекомендуемые',
      sortPriceAsc: 'Цена: по возрастанию',
      sortPriceDesc: 'Цена: по убыванию',
      sortNameAsc: 'По названию (А–Я)',
      resetFilters: 'Сбросить фильтры',
      showingCount: 'Найдено позиций',
      emptyTitle: 'Ароматы по выбранным параметрам не найдены',
      emptyDescription:
        'Попробуйте сбросить часть фильтров или воспользуйтесь интерактивным подбором аромата.',
      inStock: 'В наличии',
      outOfStock: 'Нет в наличии',
      fromPrice: 'от',
      volumesAvailable: 'Объёмы',
      viewDetails: 'Открыть карточку',
      addToFavorites: 'Добавить в избранное',
      removeFromFavorites: 'Убрать из избранного',
      demoCatalogBanner:
        'Демонстрационный каталог: представленные позиции служат образцом структуры данных до синхронизации с базой INHYPE.',
    },
    product: {
      backToCatalog: 'Вернуться в каталог',
      selectVolume: 'Выберите доступный объём',
      quantity: 'Количество',
      addToCart: 'Добавить в корзину',
      addedToCart: 'Добавлено в корзину',
      inStock: 'В наличии в ателье',
      outOfStock: 'Временно отсутствует',
      olfactoryPyramid: 'Ольфакторная пирамида',
      topNotes: 'Верхние ноты',
      heartNotes: 'Средние ноты (сердце)',
      baseNotes: 'Базовые ноты (шлейф)',
      characterLabel: 'Характер аромата',
      intensityLabel: 'Интенсивность',
      occasionLabel: 'Сезон и ситуация',
      categoryLabel: 'Формат / Концентрация',
      scentFamiliesLabel: 'Направление',
      editorialNoteTitle: 'Заметка куратора',
      relatedTitle: 'Близкие по звучанию композиции',
      relatedSubtitle:
        'Ароматы со схожим ольфакторным профилем и характером раскрытия',
      demoBadge: 'Демонстрационная позиция',
      consultWhatsApp: 'Уточнить у консультанта',
    },
    cart: {
      title: 'Ваша корзина',
      subtitle: 'Проверьте выбранные композиции и объёмы перед передачей заказа консультанту',
      emptyTitle: 'Ваша корзина пуста',
      emptyDescription:
        'Исследуйте каталог или пройдите персональный подбор, чтобы найти близкие вам ароматы.',
      exploreCatalog: 'Перейти в каталог',
      volume: 'Объём',
      remove: 'Удалить',
      subtotal: 'Промежуточный итог',
      total: 'Итоговая сумма',
      proceedToCheckout: 'Перейти к оформлению',
      continueShopping: 'Продолжить выбор',
      conciergeNote:
        'Заказ передаётся напрямую консультанту INHYPE через WhatsApp для подтверждения наличия и согласования удобного способа получения.',
    },
    checkout: {
      title: 'Оформление заказа',
      subtitle:
        'Заполните контактные данные, чтобы сформировать карточку заказа для консультанта в WhatsApp',
      backToCart: 'Вернуться в корзину',
      customerDetails: 'Контактные данные покупателя',
      fullNameLabel: 'Ваше имя *',
      fullNamePlaceholder: 'Например, Алия Нурланова',
      phoneLabel: 'Телефон для связи *',
      phonePlaceholder: '+7 (700) 000-00-00',
      cityLabel: 'Город *',
      cityPlaceholder: 'Астана, Актобе или другой город Казахстана',
      commentLabel: 'Комментарий к заказу',
      commentPlaceholder:
        'Пожелания по упаковке, времени связи или вопросы консультанту',
      orderSummary: 'Состав заказа',
      submitWhatsApp: 'Сформировать заказ для WhatsApp',
      submitting: 'Формирование сообщения...',
      preparedTitle: 'Сообщение заказа сформировано',
      preparedNotice:
        'Внимание: заказ ещё не отправлен в компанию. Нажмите кнопку ниже, чтобы открыть WhatsApp и передать сформированный список консультанту INHYPE.',
      openWhatsAppAction: 'Открыть WhatsApp и отправить консультанту',
      copyOrderText: 'Скопировать текст заказа',
      copiedText: 'Текст заказа скопирован',
      whatsappNotConfiguredTitle: 'Контактный номер WhatsApp не настроен',
      whatsappNotConfiguredText:
        'Номер телефона компании (NEXT_PUBLIC_WHATSAPP_NUMBER) ещё не указан в конфигурации проекта. Вы можете скопировать сформированный текст заказа ниже и отправить его в Instagram @inhype_perfume.',
      validation: {
        nameRequired: 'Пожалуйста, укажите ваше имя (не менее 2 символов).',
        phoneInvalid: 'Пожалуйста, укажите корректный номер телефона.',
        cityRequired: 'Пожалуйста, укажите город получения.',
        cartEmpty: 'Ваша корзина пуста.',
      },
      disclaimer:
        'Нажимая кнопку, вы формируете текстовую заявку на стороне браузера. Онлайн-оплата на сайте не взимается — детали подтверждаются лично консультантом.',
    },
    discovery: {
      eyebrow: 'ATELIER SCENT PROFILING',
      title: 'Интерактивный подбор аромата',
      subtitle:
        'Алгоритм сопоставляет ваши ответы с реальными характеристиками, нотами и интенсивностью композиций в каталоге',
      stepOf: 'Шаг',
      nextStep: 'Далее',
      prevStep: 'Назад',
      seeResults: 'Показать рекомендации',
      restartQuiz: 'Начать опрос заново',
      questions: {
        characterTitle: 'Какой характер звучания вам ближе сейчас?',
        characterSubtitle:
          'Выберите настроение, которое должен передавать аромат при нанесении',
        familiesTitle: 'Какие ароматические направления вы предпочитаете?',
        familiesSubtitle: 'Можно выбрать от одного до трёх направлений',
        intensityTitle: 'Желаемая интенсивность и шлейф',
        intensitySubtitle:
          'Насколько заметно аромат должен ощущаться в пространстве',
        occasionTitle: 'Предпочтительное время года или ситуация',
        occasionSubtitle: 'Где и когда вы планируете носить этот аромат чаще всего',
        budgetTitle: 'Ориентировочный бюджет за флакон',
        budgetSubtitle:
          'Мы учтём доступные объёмы (30 мл, 50 мл, 100 мл) в рамках выбранного диапазона',
      },
      budgetOptions: {
        under80k: 'До 80 000 ₸',
        between80kAnd140k: '80 000 — 140 000 ₸',
        above140k: 'От 140 000 ₸',
        any: 'Не имеет значения',
      },
      results: {
        eyebrow: 'ВАША ОЛЬФАКТОРНАЯ ПОДБОРКА',
        title: 'Рекомендованные композиции',
        subtitle:
          'Ароматы отобраны на основе совпадения характера, нот, интенсивности и бюджета',
        matchScore: 'Совпадение профиля',
        whyItMatches: 'Почему подходит:',
        noExactMatchTitle: 'Точных совпадений по всем критериям не найдено',
        noExactMatchText:
          'Попробуйте смягчить ограничения по бюджету или изменить ответы, либо обратитесь к нашему консультанту для индивидуального подбора.',
        consultSpecialist: 'Связаться с консультантом в Instagram',
      },
    },
    favorites: {
      eyebrow: 'ЛИЧНАЯ КОЛЛЕКЦИЯ',
      title: 'Избранные ароматы',
      subtitle:
        'Сохранённые композиции, к которым вы хотите вернуться или протестировать в бутике',
      emptyTitle: 'Список избранного пока пуст',
      emptyDescription:
        'Отмечайте понравившиеся ароматы в каталоге значком закладки, чтобы сравнивать их ноты и объёмы.',
      exploreCatalog: 'Исследовать каталог',
      moveToCart: 'В корзину',
      remove: 'Удалить',
      syncNote:
        'Список сохраняется в вашем браузере и готов к синхронизации с профилем клиента при подключении личного кабинета.',
    },
    footer: {
      description:
        'Парфюмерное пространство в Казахстане. Подбор редких композиций, внимание к индивидуальности и эстетике каждого флакона.',
      navigationTitle: 'Навигация',
      contactsTitle: 'Контакты и города',
      legalTitle: 'Информация',
      instagramLabel: 'Официальный Instagram',
      citiesLabel: 'Присутствие',
      citiesValue: 'Казахстан · Астана и Актобе',
      privacyPolicy: 'Политика конфиденциальности',
      orderTerms: 'Условия оформления заказа',
      copyright: '© INHYPE Perfume Atelier. Все права защищены.',
    },
    legal: {
      privacyTitle: 'Политика конфиденциальности',
      privacyIntro:
        'INHYPE Perfume Atelier бережно относится к персональным данным посетителей сайта.',
      privacyPoints: [
        'Контактные данные (имя, телефон, город), вводимые при оформлении заказа, используются исключительно для связи консультанта с покупателем и уточнения деталей заказа.',
        'Корзина и список избранных ароматов сохраняются локально на вашем устройстве (localStorage) для удобства навигации.',
        'Мы не передаём контактные данные третьим лицам в рекламных целях.',
      ],
      termsTitle: 'Условия оформления заказа',
      termsIntro:
        'Порядок формирования заявки и консультации в INHYPE Perfume Atelier:',
      termsPoints: [
        'Формирование заявки на сайте создаёт структурированное сообщение для мессенджера WhatsApp и не является автоматическим договором купли-продажи.',
        'Актуальное наличие выбранного объёма, итоговая стоимость и сроки доставки в Астане, Актобе и других городах Казахстана подтверждаются консультантом лично.',
        'Онлайн-оплата на сайте не осуществляется до подтверждения заказа специалистом ателье.',
      ],
    },
    categories: {
      extrait: 'Extrait de Parfum',
      'eau-de-parfum': 'Eau de Parfum',
      'atelier-edition': 'Atelier Edition',
      'discovery-set': 'Discovery Set',
    },
    scentFamilies: {
      woody: 'Древесные',
      oriental: 'Восточно-амбровые',
      floral: 'Цветочные',
      fresh: 'Свежие и цитрусовые',
      leather: 'Кожаные и дымные',
      gourmand: 'Гурманские',
      musky: 'Мускусные и пудровые',
    },
    characters: {
      intimate: 'Камерный и деликатный (близко к коже)',
      enveloping: 'Тёплый и обволакивающий',
      architectural: 'Строгий, структурный и минеральный',
      luminous: 'Светлый, воздушный и сияющий',
      mysterious: 'Глубокий, вечерний и загадочный',
    },
    intensities: {
      delicate: 'Вуаль (тонкое интимное звучание)',
      moderate: 'Сбалансированная (умеренный шлейф)',
      expressive: 'Выразительная (заметный шлейф)',
      intense: 'Экстракт (максимальная глубина и стойкость)',
    },
    occasions: {
      'daily-signature': 'Повседневная подпись и деловой ритм',
      'evening-soiree': 'Вечерний выход и особый случай',
      'warm-season': 'Тёплый сезон и воздух',
      'cold-season': 'Прохладный сезон и камерная атмосфера',
    },
  },
  kz: {
    meta: {
      siteTitle: 'INHYPE Perfume Atelier — Қазақстандағы парфюмерлік кеңістік',
      siteDescription:
        'Астана мен Ақтөбедегі INHYPE парфюмерлік ательесі. Таңдаулы хош иістер топтамасы, жеке іріктеу және кеңес беру.',
      catalogTitle: 'Хош иістер каталогы — INHYPE Perfume Atelier',
      catalogDescription:
        'INHYPE Perfume Atelier селективті және нишалық парфюмерия топтамасын зерттеңіз. Ноталар, бағыттар және сипаты бойынша сүзгілеу.',
      discoveryTitle: 'Интерактивті хош иіс таңдау — INHYPE Perfume Atelier',
      discoveryDescription:
        'Болмысыңызға жақын композицияларды табу үшін 5 сұраққа жауап беріңіз.',
      favoritesTitle: 'Таңдаулы хош иістер — INHYPE Perfume Atelier',
      cartTitle: 'Себет — INHYPE Perfume Atelier',
      checkoutTitle: 'Тапсырысты рәсімдеу — INHYPE Perfume Atelier',
    },
    nav: {
      brandSubtitle: 'Perfume Atelier',
      catalog: 'Каталог',
      discovery: 'Хош иіс таңдау',
      about: 'Бренд туралы',
      boutiques: 'Бутиктер',
      favorites: 'Таңдаулы',
      cart: 'Себет',
      admin: 'Ателье / Admin',
      openMenu: 'Мәзірді ашу',
      closeMenu: 'Мәзірді жабу',
    },
    hero: {
      eyebrow: 'INHYPE PERFUME ATELIER · QAZAQSTAN',
      title: 'Әр хош иістің өз мінезі бар. Әр адамның — өз болмысы бар',
      subtitle: 'Даралығыңыздың бір бөлігіне айналатын хош иісті ашыңыз',
      primaryCta: 'Хош иістерді зерттеу',
      secondaryCta: 'Өз хош иісіңді табу',
      editorialCaption: 'Тыныштық, фактура және жеке естеліктердің ольфакторлық эстетикасы',
    },
    featured: {
      eyebrow: 'КУРАТОРЛЫҚ ТОПТАМА',
      title: 'Қайта оралғың келетін хош иістер',
      subtitle: 'Теріде терең әрі үйлесімді ашылатын айқын құрылымды композициялар',
      viewAll: 'Толық каталогқа өту',
      viewProduct: 'Толығырақ',
      demoNotice:
        'Нақты ассортимент жүктелгенге дейін каталог құрылымын көрсетуге арналған демонстрациялық витрина',
    },
    discoveryBanner: {
      eyebrow: 'ОЛЬФАКТОРЛЫҚ ПРОФИЛЬ',
      title: 'Неден бастарыңызды білмейсіз бе?',
      description:
        'Мінезіңіз бен талғамыңызға жақын хош иістерді табу үшін бірнеше сұраққа жауап беріңіз',
      cta: 'Хош иіс таңдау',
      stepLabel: '5 сұрақ · Ноталарды сәйкестендірудің жеке алгоритмі',
    },
    philosophy: {
      eyebrow: 'КЕҢІСТІК ФИЛОСОФИЯСЫ',
      title: 'Парфюмерия ішкі үннің жалғасы ретінде',
      lead: 'INHYPE Perfume Atelier хош иістермен асықпай, терең танысу үшін құрылған кеңістік.',
      paragraph1:
        'Біз парфюмді жай ғана аксессуар емес, бейненің көрінбейтін архитектурасы деп білеміз. Бір аккорд терінің температурасына, күн ырғағына және көңіл-күйге байланысты әрқалай ашылады.',
      paragraph2:
        'INHYPE кеңістігінде блоттердегі алғашқы танысудан бастап, базалық ноталардың сағаттар өткен соң қалай сақталатынына дейін мән беріледі.',
      pillars: {
        curationTitle: 'Мұқият іріктеу',
        curationText:
          'Композицияның тазалығына, базаның тереңдігіне және уақыт өте келе көпқабатты ашылуына назар аудару.',
        consultationTitle: 'Жеке диалог',
        consultationText:
          'Ольфакторлық әдеттеріңізге, климатқа және жағдайға сай парфюмерлік гардеробты таңдау.',
        atmosphereTitle: 'Камералық эстетика',
        atmosphereText:
          'Астана мен Ақтөбеде композицияларды асықпай тыңдап, салыстыруға болатын кеңістік.',
      },
    },
    boutiquesSection: {
      eyebrow: 'ГЕОГРАФИЯ',
      title: 'Қазақстандағы INHYPE кеңістіктері',
      subtitle:
        'Жеке ольфакторлық кеңес алу үшін ательеге келіңіз немесе онлайн байланысыңыз',
      unconfirmedBadge: 'Демо-жазба · Жариялау алдында растауды қажет етеді',
      confirmedBadge: 'Расталған филиал',
      addressLabel: 'Мекенжайы',
      hoursLabel: 'Жұмыс уақыты',
      contactLabel: 'Байланыс',
      verificationDisclaimer:
        'Назар аударыңыз: Астана мен Ақтөбедегі филиалдардың нақты мекенжайлары, телефондары мен жұмыс кестесі алдын ала қарау режимінде көрсетілген және ресми іске қосу алдында нақтыланады.',
    },
    catalog: {
      eyebrow: 'ATELIER КОЛЛЕКЦИЯСЫ',
      title: 'Парфюмерия каталогы',
      subtitle:
        'Композицияларды ольфакторлық бағыттары, концентрациясы және сипаты бойынша зерттеңіз',
      searchPlaceholder: 'Атауы немесе бренді бойынша іздеу...',
      filtersTitle: 'Сүзгілер',
      brandFilter: 'Бренд',
      allBrands: 'Барлық брендтер',
      categoryFilter: 'Санат',
      allCategories: 'Барлық санаттар',
      scentFamilyFilter: 'Хош иіс бағыты',
      allFamilies: 'Барлық бағыттар',
      availabilityFilter: 'Қолжетімділігі',
      inStockOnly: 'Тек қоймада бар',
      sortLabel: 'Сұрыптау',
      sortFeatured: 'Ұсынылғандар',
      sortPriceAsc: 'Бағасы: арзанынан қымбатына',
      sortPriceDesc: 'Бағасы: қымбатынан арзанына',
      sortNameAsc: 'Атауы бойынша (А–Я)',
      resetFilters: 'Сүзгілерді тазалау',
      showingCount: 'Табылған позициялар',
      emptyTitle: 'Таңдалған параметрлер бойынша хош иістер табылмады',
      emptyDescription:
        'Сүзгілерді тазалап көріңіз немесе интерактивті хош иіс таңдау бөлімін пайдаланыңыз.',
      inStock: 'Қоймада бар',
      outOfStock: 'Қоймада жоқ',
      fromPrice: 'бастап',
      volumesAvailable: 'Көлемдері',
      viewDetails: 'Толығырақ ашу',
      addToFavorites: 'Таңдаулыға қосу',
      removeFromFavorites: 'Таңдаулыдан өшіру',
      demoCatalogBanner:
        'Демонстрациялық каталог: бұл позициялар INHYPE дерекқорымен синхрондалғанға дейін деректер құрылымының үлгісі ретінде берілген.',
    },
    product: {
      backToCatalog: 'Каталогқа оралу',
      selectVolume: 'Қолжетімді көлемді таңдаңыз',
      quantity: 'Саны',
      addToCart: 'Себетке қосу',
      addedToCart: 'Себетке қосылды',
      inStock: 'Ательеде бар',
      outOfStock: 'Уақытша жоқ',
      olfactoryPyramid: 'Ольфакторлық пирамида',
      topNotes: 'Жоғарғы ноталар',
      heartNotes: 'Ортаңғы ноталар (жүрегі)',
      baseNotes: 'Базалық ноталар (шлейф)',
      characterLabel: 'Хош иіс сипаты',
      intensityLabel: 'Қарқындылығы',
      occasionLabel: 'Маусым мен жағдай',
      categoryLabel: 'Формат / Концентрация',
      scentFamiliesLabel: 'Бағыты',
      editorialNoteTitle: 'Куратор жазбасы',
      relatedTitle: 'Үндес композициялар',
      relatedSubtitle: 'Ольфакторлық профилі мен мінезі жақын хош иістер',
      demoBadge: 'Демонстрациялық позиция',
      consultWhatsApp: 'Кеңесшіден нақтылау',
    },
    cart: {
      title: 'Сіздің себетіңіз',
      subtitle: 'Тапсырысты кеңесшіге жібермес бұрын таңдалған композициялар мен көлемдерді тексеріңіз',
      emptyTitle: 'Себетіңіз бос',
      emptyDescription:
        'Өзіңізге жақын хош иістерді табу үшін каталогты зерттеңіз немесе жеке іріктеуден өтіңіз.',
      exploreCatalog: 'Каталогқа өту',
      volume: 'Көлемі',
      remove: 'Өшіру',
      subtotal: 'Аралық сома',
      total: 'Жалпы сома',
      proceedToCheckout: 'Рәсімдеуге өту',
      continueShopping: 'Таңдауды жалғастыру',
      conciergeNote:
        'Тапсырыс қолжетімділігін растау және жеткізу тәсілін келісу үшін WhatsApp арқылы INHYPE кеңесшісіне тікелей жіберіледі.',
    },
    checkout: {
      title: 'Тапсырысты рәсімдеу',
      subtitle:
        'WhatsApp-тағы кеңесшіге тапсырыс карточкасын қалыптастыру үшін байланыс деректерін толтырыңыз',
      backToCart: 'Себетке оралу',
      customerDetails: 'Сатып алушының деректері',
      fullNameLabel: 'Аты-жөніңіз *',
      fullNamePlaceholder: 'Мысалы, Әлия Нұрланова',
      phoneLabel: 'Байланыс телефоны *',
      phonePlaceholder: '+7 (700) 000-00-00',
      cityLabel: 'Қала *',
      cityPlaceholder: 'Астана, Ақтөбе немесе Қазақстанның басқа қаласы',
      commentLabel: 'Тапсырысқа түсініктеме',
      commentPlaceholder: 'Қаптама, байланыс уақыты немесе кеңесшіге сұрақтар',
      orderSummary: 'Тапсырыс құрамы',
      submitWhatsApp: 'WhatsApp үшін тапсырысты қалыптастыру',
      submitting: 'Хабарлама дайындалуда...',
      preparedTitle: 'Тапсырыс хабарламасы дайындалды',
      preparedNotice:
        'Назар аударыңыз: тапсырыс әлі компанияға жіберілген жоқ. WhatsApp-ты ашып, дайын тізімді INHYPE кеңесшісіне жіберу үшін төмендегі батырманы басыңыз.',
      openWhatsAppAction: 'WhatsApp-ты ашып, кеңесшіге жіберу',
      copyOrderText: 'Тапсырыс мәтінін көшіру',
      copiedText: 'Тапсырыс мәтіні көшірілді',
      whatsappNotConfiguredTitle: 'WhatsApp байланыс нөмірі бапталмаған',
      whatsappNotConfiguredText:
        'Компанияның телефон нөмірі (NEXT_PUBLIC_WHATSAPP_NUMBER) жоба баптауларында әлі көрсетілмеген. Төмендегі тапсырыс мәтінін көшіріп, @inhype_perfume Instagram парақшасына жібере аласыз.',
      validation: {
        nameRequired: 'Өтінеміз, есіміңізді енгізіңіз (кемінде 2 таңба).',
        phoneInvalid: 'Өтінеміз, дұрыс телефон нөмірін енгізіңіз.',
        cityRequired: 'Өтінеміз, қалаңызды көрсетіңіз.',
        cartEmpty: 'Себетіңіз бос.',
      },
      disclaimer:
        'Батырманы басу арқылы сіз браузерде мәтіндік өтінім қалыптастырасыз. Сайтта онлайн-төлем алынбайды — барлық деректерді кеңесші жеке растайды.',
    },
    discovery: {
      eyebrow: 'ATELIER SCENT PROFILING',
      title: 'Интерактивті хош иіс таңдау',
      subtitle:
        'Алгоритм сіздің жауаптарыңызды каталогтағы композициялардың нақты сипаттамаларымен, ноталарымен және қарқындылығымен сәйкестендіреді',
      stepOf: 'Қадам',
      nextStep: 'Келесі',
      prevStep: 'Артқа',
      seeResults: 'Ұсыныстарды көрсету',
      restartQuiz: 'Сауалнаманы қайта бастау',
      questions: {
        characterTitle: 'Қазір сізге қандай хош иіс мінезі жақын?',
        characterSubtitle: 'Хош иіс беретін көңіл-күй мен әсерді таңдаңыз',
        familiesTitle: 'Қандай хош иіс бағыттарын ұнатасыз?',
        familiesSubtitle: 'Бірден үш бағытқа дейін таңдауға болады',
        intensityTitle: 'Қалаулы қарқындылық пен шлейф',
        intensitySubtitle: 'Хош иіс кеңістікте қаншалықты айқын сезілуі керек',
        occasionTitle: 'Жыл мезгілі немесе қолдану жағдайы',
        occasionSubtitle: 'Бұл хош иісті көбінесе қайда және қашан қолданасыз',
        budgetTitle: 'Флаконға арналған шамамен бюджет',
        budgetSubtitle:
          'Таңдалған диапазон аясында қолжетімді көлемдерді (30 мл, 50 мл, 100 мл) ескереміз',
      },
      budgetOptions: {
        under80k: '80 000 ₸ дейін',
        between80kAnd140k: '80 000 — 140 000 ₸',
        above140k: '140 000 ₸ жоғары',
        any: 'Маңызды емес',
      },
      results: {
        eyebrow: 'СІЗДІҢ ОЛЬФАКТОРЛЫҚ ТОПТАМАҢЫЗ',
        title: 'Ұсынылған композициялар',
        subtitle:
          'Хош иістер мінезі, ноталары, қарқындылығы және бюджет сәйкестігі негізінде іріктелді',
        matchScore: 'Профиль сәйкестігі',
        whyItMatches: 'Неліктен сәйкес келеді:',
        noExactMatchTitle: 'Барлық критерийлер бойынша дәл сәйкестік табылмады',
        noExactMatchText:
          'Бюджет шектеуін өзгертіп көріңіз немесе жеке іріктеу үшін біздің кеңесшіге хабарласыңыз.',
        consultSpecialist: 'Instagram арқылы кеңесшімен байланысу',
      },
    },
    favorites: {
      eyebrow: 'ЖЕКЕ КОЛЛЕКЦИЯ',
      title: 'Таңдаулы хош иістер',
      subtitle: 'Қайта оралғыңыз келетін немесе бутикте сынап көргіңіз келетін сақталған композициялар',
      emptyTitle: 'Таңдаулы тізімі әзірге бос',
      emptyDescription:
        'Ноталары мен көлемдерін салыстыру үшін каталогтағы ұнаған хош иістерді белгілеңіз.',
      exploreCatalog: 'Каталогты зерттеу',
      moveToCart: 'Себетке қосу',
      remove: 'Өшіру',
      syncNote:
        'Тізім браузеріңізде сақталады және жеке кабинет қосылған кезде синхрондауға дайын.',
    },
    footer: {
      description:
        'Қазақстандағы парфюмерлік кеңістік. Сирек композицияларды таңдау, әр адамның даралығы мен эстетикасына құрмет.',
      navigationTitle: 'Навигация',
      contactsTitle: 'Байланыс және қалалар',
      legalTitle: 'Ақпарат',
      instagramLabel: 'Ресми Instagram',
      citiesLabel: 'Қалалар',
      citiesValue: 'Қазақстан · Астана және Ақтөбе',
      privacyPolicy: 'Құпиялылық саясаты',
      orderTerms: 'Тапсырыс беру шарттары',
      copyright: '© INHYPE Perfume Atelier. Барлық құқықтар қорғалған.',
    },
    legal: {
      privacyTitle: 'Құпиялылық саясаты',
      privacyIntro:
        'INHYPE Perfume Atelier сайт келушілерінің жеке деректеріне ұқыптылықпен қарайды.',
      privacyPoints: [
        'Тапсырысты рәсімдеу кезінде енгізілген байланыс деректері (аты, телефоны, қаласы) тек кеңесшінің сатып алушымен байланысуы үшін қолданылады.',
        'Себет пен таңдаулы хош иістер тізімі ыңғайлылық үшін құрылғыңызда (localStorage) сақталады.',
        'Біз байланыс деректерін жарнамалық мақсатта үшінші тұлғаларға бермейміз.',
      ],
      termsTitle: 'Тапсырыс беру шарттары',
      termsIntro: 'INHYPE Perfume Atelier-де өтінімді қалыптастыру және кеңес алу тәртібі:',
      termsPoints: [
        'Сайтта өтінімді толтыру WhatsApp мессенджеріне арналған құрылымдалған хабарламаны жасайды және автоматты сатып алу-сату шарты болып табылмайды.',
        'Таңдалған көлемнің нақты қолжетімділігі, қорытынды құны және Астана, Ақтөбе мен басқа қалаларға жеткізу шарттары кеңесшімен жеке расталады.',
        'Тапсырысты ателье маманы растағанға дейін сайтта онлайн-төлем алынбайды.',
      ],
    },
    categories: {
      extrait: 'Extrait de Parfum',
      'eau-de-parfum': 'Eau de Parfum',
      'atelier-edition': 'Atelier Edition',
      'discovery-set': 'Discovery Set',
    },
    scentFamilies: {
      woody: 'Ағаш ноталы',
      oriental: 'Шығыс-амбралы',
      floral: 'Гүлді',
      fresh: 'Балғын және цитрусты',
      leather: 'Былғары және түтінді',
      gourmand: 'Гурмандық',
      musky: 'Мускусты және опалы',
    },
    characters: {
      intimate: 'Камералық және нәзік (теріге жақын)',
      enveloping: 'Жылы және баурап алатын',
      architectural: 'Құрылымды және минералды',
      luminous: 'Жарық, әуелі және жарқын',
      mysterious: 'Терең, кешкі және жұмбақ',
    },
    intensities: {
      delicate: 'Вуаль (нәзік интимді дыбысталу)',
      moderate: 'Теңгерімді (орташа шлейф)',
      expressive: 'Айқын (байқалатын шлейф)',
      intense: 'Экстракт (максималды тереңдік пен тұрақтылық)',
    },
    occasions: {
      'daily-signature': 'Күнделікті қолтаңба және іскерлік ырғақ',
      'evening-soiree': 'Кешкі шығу және ерекше жағдай',
      'warm-season': 'Жылы маусым және таза ауа',
      'cold-season': 'Салқын маусым және камералық атмосфера',
    },
  },
  en: {
    meta: {
      siteTitle: 'INHYPE Perfume Atelier — Niche Fragrance Space in Kazakhstan',
      siteDescription:
        'INHYPE Perfume Atelier in Astana and Aktobe. Curated selection of niche fragrances, bespoke scent profiling, and personal consultations.',
      catalogTitle: 'Fragrance Catalog — INHYPE Perfume Atelier',
      catalogDescription:
        'Explore the curated collection of niche and artisanal perfumery at INHYPE Perfume Atelier. Filter by olfactory families, notes, and character.',
      discoveryTitle: 'Interactive Scent Discovery — INHYPE Perfume Atelier',
      discoveryDescription:
        'Answer 5 questions about character, notes, and occasion to discover fragrances aligned with your individuality.',
      favoritesTitle: 'Saved Fragrances — INHYPE Perfume Atelier',
      cartTitle: 'Shopping Bag — INHYPE Perfume Atelier',
      checkoutTitle: 'Order Concierge — INHYPE Perfume Atelier',
    },
    nav: {
      brandSubtitle: 'Perfume Atelier',
      catalog: 'Catalog',
      discovery: 'Scent Finder',
      about: 'Philosophy',
      boutiques: 'Boutiques',
      favorites: 'Saved',
      cart: 'Bag',
      admin: 'Atelier / Admin',
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
    },
    hero: {
      eyebrow: 'INHYPE PERFUME ATELIER · KAZAKHSTAN',
      title: 'Every fragrance has its own character. Every person has theirs',
      subtitle: 'Discover the scent that becomes an extension of your individuality',
      primaryCta: 'Explore Fragrances',
      secondaryCta: 'Find Your Scent',
      editorialCaption: 'Olfactory aesthetics of stillness, texture, and personal memory',
    },
    featured: {
      eyebrow: 'CURATED SELECTION',
      title: 'Fragrances You Return To',
      subtitle:
        'Compositions with architectural structure and a refined evolution on the skin',
      viewAll: 'Explore Full Catalog',
      viewProduct: 'View Details',
      demoNotice:
        'Demonstration showcase previewing the catalog architecture prior to live inventory synchronization',
    },
    discoveryBanner: {
      eyebrow: 'OLFACTORY PROFILING',
      title: 'Not sure where to begin?',
      description:
        'Answer a few questions to discover fragrances aligned with your character and olfactory preferences',
      cta: 'Match Your Scent',
      stepLabel: '5 questions · Structured note & character matching algorithm',
    },
    philosophy: {
      eyebrow: 'ATELIER PHILOSOPHY',
      title: 'Perfumery as an extension of the inner voice',
      lead: 'INHYPE Perfume Atelier was conceived for unhurried olfactory exploration — free from noise, generic templates, and fleeting trends.',
      paragraph1:
        'We approach fragrance not as a mere accessory, but as invisible architecture. The same accord evolves differently depending on skin chemistry, the rhythm of the day, and personal presence.',
      paragraph2:
        'Within the INHYPE space, every encounter is a dialogue — from the first impression on a blotter to the quiet resonance of base notes hours later.',
      pillars: {
        curationTitle: 'Intentional Curation',
        curationText:
          'Focus on compositional clarity, depth of base notes, and multi-layered evolution over time.',
        consultationTitle: 'Personal Dialogue',
        consultationText:
          'Building a fragrance wardrobe tailored to your olfactory habits, climate, and occasion.',
        atmosphereTitle: 'Intimate Aesthetics',
        atmosphereText:
          'Dedicated spaces in Astana and Aktobe designed for unhurried listening and comparison.',
      },
    },
    boutiquesSection: {
      eyebrow: 'OUR PRESENCE',
      title: 'INHYPE Spaces in Kazakhstan',
      subtitle:
        'Visit our atelier for a private olfactory consultation or connect with our specialists online',
      unconfirmedBadge: 'Demo Entry · Pending verification before publication',
      confirmedBadge: 'Verified Boutique',
      addressLabel: 'Location',
      hoursLabel: 'Opening Hours',
      contactLabel: 'Contact',
      verificationDisclaimer:
        'Note: Exact street addresses, phone numbers, and opening hours for Astana and Aktobe are shown as clearly labeled preview entries and must be confirmed prior to public launch.',
    },
    catalog: {
      eyebrow: 'ATELIER COLLECTION',
      title: 'Fragrance Catalog',
      subtitle:
        'Explore compositions by olfactory families, concentration, and character on the skin',
      searchPlaceholder: 'Search by fragrance name or house...',
      filtersTitle: 'Filters',
      brandFilter: 'House / Brand',
      allBrands: 'All Houses',
      categoryFilter: 'Category',
      allCategories: 'All Categories',
      scentFamilyFilter: 'Olfactory Family',
      allFamilies: 'All Families',
      availabilityFilter: 'Availability',
      inStockOnly: 'In Stock Only',
      sortLabel: 'Sort by',
      sortFeatured: 'Curator’s Pick',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortNameAsc: 'Name (A–Z)',
      resetFilters: 'Reset Filters',
      showingCount: 'Compositions found',
      emptyTitle: 'No fragrances match your selected criteria',
      emptyDescription:
        'Try clearing some filters or use our interactive Scent Finder to explore suitable compositions.',
      inStock: 'In Stock',
      outOfStock: 'Out of Stock',
      fromPrice: 'from',
      volumesAvailable: 'Volumes',
      viewDetails: 'View Composition',
      addToFavorites: 'Save to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      demoCatalogBanner:
        'Demonstration Catalog: These items illustrate the data architecture prior to live INHYPE inventory synchronization.',
    },
    product: {
      backToCatalog: 'Back to Catalog',
      selectVolume: 'Select Available Volume',
      quantity: 'Quantity',
      addToCart: 'Add to Bag',
      addedToCart: 'Added to Bag',
      inStock: 'Available at the Atelier',
      outOfStock: 'Currently Unavailable',
      olfactoryPyramid: 'Olfactory Pyramid',
      topNotes: 'Top Notes',
      heartNotes: 'Heart Notes',
      baseNotes: 'Base Notes',
      characterLabel: 'Fragrance Character',
      intensityLabel: 'Intensity & Sillage',
      occasionLabel: 'Season & Occasion',
      categoryLabel: 'Format / Concentration',
      scentFamiliesLabel: 'Olfactory Family',
      editorialNoteTitle: 'Curator’s Note',
      relatedTitle: 'Compositions of Kindred Spirit',
      relatedSubtitle: 'Fragrances sharing a similar olfactory structure and mood',
      demoBadge: 'Demonstration Item',
      consultWhatsApp: 'Ask a Specialist',
    },
    cart: {
      title: 'Your Atelier Bag',
      subtitle: 'Review your selected compositions and volumes before forwarding to a consultant',
      emptyTitle: 'Your bag is currently empty',
      emptyDescription:
        'Explore the catalog or take the interactive scent profiling quiz to discover compositions suited to you.',
      exploreCatalog: 'Explore Catalog',
      volume: 'Volume',
      remove: 'Remove',
      subtotal: 'Subtotal',
      total: 'Estimated Total',
      proceedToCheckout: 'Proceed to Concierge Checkout',
      continueShopping: 'Continue Exploring',
      conciergeNote:
        'Your selection is forwarded directly to an INHYPE consultant via WhatsApp to verify availability and arrange delivery.',
    },
    checkout: {
      title: 'Concierge Order Request',
      subtitle:
        'Provide your contact details to prepare a structured order summary for our consultant on WhatsApp',
      backToCart: 'Return to Bag',
      customerDetails: 'Client Information',
      fullNameLabel: 'Full Name *',
      fullNamePlaceholder: 'e.g., Aliya Nurlanova',
      phoneLabel: 'Phone Number *',
      phonePlaceholder: '+7 (700) 000-00-00',
      cityLabel: 'City *',
      cityPlaceholder: 'Astana, Aktobe, or another city in Kazakhstan',
      commentLabel: 'Order Notes',
      commentPlaceholder: 'Gift wrapping requests, preferred time to reach you, or questions',
      orderSummary: 'Order Summary',
      submitWhatsApp: 'Prepare Order for WhatsApp',
      submitting: 'Preparing message...',
      preparedTitle: 'Order Message Prepared',
      preparedNotice:
        'Important: Your order has been formatted in your browser and has not yet been received by the company. Click the button below to open WhatsApp and send it to an INHYPE consultant.',
      openWhatsAppAction: 'Open WhatsApp & Send to Consultant',
      copyOrderText: 'Copy Order Summary Text',
      copiedText: 'Order summary copied',
      whatsappNotConfiguredTitle: 'WhatsApp Contact Number Not Configured',
      whatsappNotConfiguredText:
        'The official WhatsApp number (NEXT_PUBLIC_WHATSAPP_NUMBER) is not yet set in the environment configuration. You may copy the formatted order summary below and send it via Instagram @inhype_perfume.',
      validation: {
        nameRequired: 'Please enter your name (at least 2 characters).',
        phoneInvalid: 'Please enter a valid phone number.',
        cityRequired: 'Please specify your city.',
        cartEmpty: 'Your bag is empty.',
      },
      disclaimer:
        'Submitting this form prepares a client-side message for WhatsApp. No online payment is processed on the website — all details are confirmed personally by a consultant.',
    },
    discovery: {
      eyebrow: 'ATELIER SCENT PROFILING',
      title: 'Interactive Scent Discovery',
      subtitle:
        'Our matching system evaluates your answers against real olfactory notes, intensity, and character traits in the catalog',
      stepOf: 'Step',
      nextStep: 'Continue',
      prevStep: 'Back',
      seeResults: 'Reveal Recommendations',
      restartQuiz: 'Start Over',
      questions: {
        characterTitle: 'Which fragrance character resonates with you most right now?',
        characterSubtitle: 'Choose the mood and presence the scent should convey on your skin',
        familiesTitle: 'Which olfactory families are you drawn to?',
        familiesSubtitle: 'Select between one and three fragrance directions',
        intensityTitle: 'Preferred intensity and sillage',
        intensitySubtitle: 'How noticeably should the fragrance project in space?',
        occasionTitle: 'Preferred season or setting',
        occasionSubtitle: 'Where and when do you envision wearing this fragrance most?',
        budgetTitle: 'Approximate budget per bottle',
        budgetSubtitle: 'We evaluate available volumes (30 ml, 50 ml, 100 ml) within your range',
      },
      budgetOptions: {
        under80k: 'Under 80,000 ₸',
        between80kAnd140k: '80,000 — 140,000 ₸',
        above140k: 'Above 140,000 ₸',
        any: 'No preference',
      },
      results: {
        eyebrow: 'YOUR OLFACTORY CURATION',
        title: 'Recommended Compositions',
        subtitle:
          'Selected based on alignment with your preferred character, notes, intensity, and budget',
        matchScore: 'Profile Match',
        whyItMatches: 'Why it matches:',
        noExactMatchTitle: 'No exact matches found for all selected criteria',
        noExactMatchText:
          'Try broadening your budget preference or adjusting your answers, or reach out to our consultant for a bespoke recommendation.',
        consultSpecialist: 'Consult via Instagram',
      },
    },
    favorites: {
      eyebrow: 'PERSONAL CURATION',
      title: 'Saved Fragrances',
      subtitle: 'Compositions you have bookmarked to revisit or experience in our boutiques',
      emptyTitle: 'Your saved list is currently empty',
      emptyDescription:
        'Bookmark fragrances in the catalog to compare their olfactory pyramids and available volumes.',
      exploreCatalog: 'Explore Catalog',
      moveToCart: 'Add to Bag',
      remove: 'Remove',
      syncNote:
        'Your list is stored locally in your browser and architected for future synchronization with client accounts.',
    },
    footer: {
      description:
        'Niche perfumery space in Kazakhstan. Curated rare compositions, bespoke scent profiling, and editorial aesthetics.',
      navigationTitle: 'Navigation',
      contactsTitle: 'Contacts & Cities',
      legalTitle: 'Information',
      instagramLabel: 'Official Instagram',
      citiesLabel: 'Locations',
      citiesValue: 'Kazakhstan · Astana & Aktobe',
      privacyPolicy: 'Privacy Policy',
      orderTerms: 'Order & Consultation Terms',
      copyright: '© INHYPE Perfume Atelier. All rights reserved.',
    },
    legal: {
      privacyTitle: 'Privacy Policy',
      privacyIntro: 'INHYPE Perfume Atelier respects the privacy of our visitors and clients.',
      privacyPoints: [
        'Contact information (name, phone number, city) entered during order preparation is used solely by our consultant to contact you regarding your request.',
        'Your bag and saved fragrances are stored locally in your browser (localStorage) for seamless navigation.',
        'We do not sell or share personal contact data with third-party advertisers.',
      ],
      termsTitle: 'Order & Consultation Terms',
      termsIntro: 'How order preparation and consultations work at INHYPE Perfume Atelier:',
      termsPoints: [
        'Completing the checkout form generates a structured summary for WhatsApp and does not constitute an automated online payment or binding sales contract.',
        'Exact stock availability for your selected volume, final pricing, and delivery options in Astana, Aktobe, and across Kazakhstan are confirmed personally by an INHYPE consultant.',
        'No online payment is collected on this website prior to personal verification by our specialist.',
      ],
    },
    categories: {
      extrait: 'Extrait de Parfum',
      'eau-de-parfum': 'Eau de Parfum',
      'atelier-edition': 'Atelier Edition',
      'discovery-set': 'Discovery Set',
    },
    scentFamilies: {
      woody: 'Woody',
      oriental: 'Amber & Oriental',
      floral: 'Floral',
      fresh: 'Fresh & Citrus',
      leather: 'Leather & Smoky',
      gourmand: 'Gourmand',
      musky: 'Musky & Powdery',
    },
    characters: {
      intimate: 'Intimate & Skin-Close',
      enveloping: 'Warm & Enveloping',
      architectural: 'Architectural & Mineral',
      luminous: 'Luminous & Airy',
      mysterious: 'Deep, Nocturnal & Mysterious',
    },
    intensities: {
      delicate: 'Delicate Veil (Intimate Sillage)',
      moderate: 'Balanced (Moderate Sillage)',
      expressive: 'Expressive (Pronounced Trail)',
      intense: 'Extrait (Maximum Depth & Longevity)',
    },
    occasions: {
      'daily-signature': 'Daily Signature & Tailored Rhythm',
      'evening-soiree': 'Evening Soirée & Special Occasion',
      'warm-season': 'Warm Season & Open Air',
      'cold-season': 'Cool Season & Intimate Settings',
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.ru;
}
