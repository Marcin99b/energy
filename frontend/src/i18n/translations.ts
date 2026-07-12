export type Language = 'pl' | 'en';

export interface Dictionary {
  tabBar: {
    add: string;
    history: string;
    stats: string;
  };
  addEntryForm: {
    screenTitle: string;
    contexts: {
      starting: string;
      inProgress: string;
      finishing: string;
      thinkingAboutIt: string;
      planning: string;
    };
    addCustomContext: string;
    customContextPlaceholder: string;
    activityPlaceholder: string;
    energyLevel: string;
    impactQuestion: string;
    impactIncrease: string;
    impactDecrease: string;
    noteLabel: string;
    notePlaceholder: string;
    errorNoActivity: string;
    errorNoImpact: string;
    submit: string;
    savedToast: string;
  };
  history: {
    screenTitle: string;
    emptyTitle: string;
    emptySubtitle: string;
    today: string;
    yesterday: string;
    impactIncrease: string;
    impactDecrease: string;
  };
  stats: {
    screenTitle: string;
    emptyTitle: string;
    emptySubtitle: string;
    avgAbbrev: string;
    moreEnergy: string;
    lessEnergy: string;
    byContext: string;
    noContext: string;
    dominantIncrease: string;
    dominantDecrease: string;
    dominantMixed: string;
  };
  sentence: {
    energyLevelLabel: string;
    more: string;
    less: string;
    thanBefore: string;
  };
  connection: {
    online: string;
    offline: string;
  };
  common: {
    fetchError: string;
    retry: string;
  };
}

const pl: Dictionary = {
  tabBar: {
    add: 'Dodaj',
    history: 'Historia',
    stats: 'Statystyki'
  },
  addEntryForm: {
    screenTitle: 'Co się dzieje?',
    contexts: {
      starting: 'Zaczynam',
      inProgress: 'W trakcie',
      finishing: 'Kończę',
      thinkingAboutIt: 'Myślę o tym',
      planning: 'Planuję'
    },
    addCustomContext: '+ inny powód',
    customContextPlaceholder: 'własny…',
    activityPlaceholder: 'czego to dotyczy? np. granie w siatkówkę',
    energyLevel: 'POZIOM ENERGII',
    impactQuestion: 'WZGLĘDEM WCZEŚNIEJ, TO…',
    impactIncrease: 'Więcej energii',
    impactDecrease: 'Mniej energii',
    noteLabel: 'DODATKOWO (OPCJONALNIE)',
    notePlaceholder: 'Coś jeszcze warto dopisać…',
    errorNoActivity: 'Wpisz aktywność',
    errorNoImpact: 'Wybierz wpływ na energię',
    submit: 'Zapisz wpis ✓',
    savedToast: 'Zapisano ✓'
  },
  history: {
    screenTitle: 'Historia',
    emptyTitle: 'Brak wpisów.',
    emptySubtitle: 'Dodaj pierwszy w zakładce „Dodaj”.',
    today: 'Dzisiaj',
    yesterday: 'Wczoraj',
    impactIncrease: 'Więcej energii',
    impactDecrease: 'Mniej energii'
  },
  stats: {
    screenTitle: 'Statystyki',
    emptyTitle: 'Brak danych.',
    emptySubtitle: 'Zapisz kilka wpisów, aby zobaczyć statystyki.',
    avgAbbrev: 'śr.',
    moreEnergy: 'więcej energii',
    lessEnergy: 'mniej energii',
    byContext: 'WEDŁUG KONTEKSTU',
    noContext: 'Bez kontekstu',
    dominantIncrease: 'zwykle więcej energii',
    dominantDecrease: 'zwykle mniej energii',
    dominantMixed: 'różnie'
  },
  sentence: {
    energyLevelLabel: 'Poziom energii',
    more: 'więcej',
    less: 'mniej',
    thanBefore: 'niż wcześniej'
  },
  connection: {
    online: 'Online',
    offline: 'Offline'
  },
  common: {
    fetchError: 'Nie udało się pobrać danych z serwera.',
    retry: 'Spróbuj ponownie'
  }
};

const en: Dictionary = {
  tabBar: {
    add: 'Add',
    history: 'History',
    stats: 'Stats'
  },
  addEntryForm: {
    screenTitle: "What's going on?",
    contexts: {
      starting: 'Starting',
      inProgress: 'In progress',
      finishing: 'Finishing',
      thinkingAboutIt: 'Thinking about it',
      planning: 'Planning'
    },
    addCustomContext: '+ other reason',
    customContextPlaceholder: 'custom…',
    activityPlaceholder: 'what is it about? e.g. playing volleyball',
    energyLevel: 'ENERGY LEVEL',
    impactQuestion: 'COMPARED TO BEFORE, THIS IS…',
    impactIncrease: 'More energy',
    impactDecrease: 'Less energy',
    noteLabel: 'ADDITIONAL NOTES (OPTIONAL)',
    notePlaceholder: 'Anything else worth adding…',
    errorNoActivity: 'Enter an activity',
    errorNoImpact: 'Choose an energy impact',
    submit: 'Save entry ✓',
    savedToast: 'Saved ✓'
  },
  history: {
    screenTitle: 'History',
    emptyTitle: 'No entries yet.',
    emptySubtitle: 'Add your first one in the "Add" tab.',
    today: 'Today',
    yesterday: 'Yesterday',
    impactIncrease: 'More energy',
    impactDecrease: 'Less energy'
  },
  stats: {
    screenTitle: 'Stats',
    emptyTitle: 'No data yet.',
    emptySubtitle: 'Save a few entries to see stats.',
    avgAbbrev: 'avg.',
    moreEnergy: 'more energy',
    lessEnergy: 'less energy',
    byContext: 'BY CONTEXT',
    noContext: 'No context',
    dominantIncrease: 'usually more energy',
    dominantDecrease: 'usually less energy',
    dominantMixed: 'varies'
  },
  sentence: {
    energyLevelLabel: 'Energy level',
    more: 'more',
    less: 'less',
    thanBefore: 'than before'
  },
  connection: {
    online: 'Online',
    offline: 'Offline'
  },
  common: {
    fetchError: 'Failed to load data from the server.',
    retry: 'Retry'
  }
};

export const translations: Record<Language, Dictionary> = { pl, en };
