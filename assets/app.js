/* ==========================================================================
   UNTOLD ARCHIVE — логика каталога (статическая версия, без сборщика)
   Словарь и данные текущего языка встроены в страницу как window.UA.
   Логика поиска, сортировки, вида, темы и «случайного дела» — как в оригинале.
   ========================================================================== */

(function () {
  'use strict';

  var UA = window.UA || {};
  var T = UA.dict;
  var CATEGORIES = UA.categories || [];
  var RAW_ITEMS = UA.items || [];
  var LOCALE = UA.locale || 'ru';

  /* ------------------------------ Помощники -------------------------------- */

  var $ = function (selector, root) {
    return (root || document).querySelector(selector);
  };
  var $$ = function (selector, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(selector));
  };

  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  var esc = function (value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return ESCAPES[ch];
    });
  };

  /** Нижний регистр, «ё» = «е», для латиницы — без диакритики. */
  var norm = function (value) {
    return String(value == null ? '' : value).toLowerCase().replace(/ё/g, 'е').trim();
  };
  var fold = function (value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  var normSearch = function (value) {
    return fold(norm(value));
  };

/** Подставляет {name} в шаблон словаря. */
  var fmt = function (template, values) {
    return String(template).replace(/\{(\w+)\}/g, function (match, key) {
      return values[key] === undefined ? match : String(values[key]);
    });
  };

  /** Счёт с учётом правил языка. */
  var pluralRules = new Intl.PluralRules(LOCALE);
  var plural = function (n, forms) {
    return forms[pluralRules.select(n)] || forms.other;
  };

  var store = {
    get: function (key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        /* хранилище недоступно — просто не запоминаем */
      }
    },
  };

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------- Данные ---------------------------------- */

  var FALLBACK_CATEGORY = {
    id: 'other',
    label: T.fallbackLabel,
    short: T.fallbackShort,
    color: '#b9b9b9',
  };
  var categoryById = new Map();
  CATEGORIES.forEach(function (category) {
    categoryById.set(category.id, category);
  });

  var items = RAW_ITEMS.map(function (item, index) {
    var category = categoryById.get(item.category) || FALLBACK_CATEGORY;
    return Object.assign({}, item, {
      no: index + 1,
      category: category,
      haystack: normSearch(
        [item.title, item.subtitle, item.desc, item.mark, category.label, category.short]
          .concat(item.tags || [])
          .join(' ')
      ),
    });
  });

  var countByCategory = items.reduce(function (acc, item) {
    acc[item.category.id] = (acc[item.category.id] || 0) + 1;
    return acc;
  }, {});

  var SORTS = {
    no: function (a, b) {
      return a.no - b.no;
    },
    new: function (a, b) {
      return b.no - a.no;
    },
    old: function (a, b) {
      return (a.year == null ? Infinity : a.year) - (b.year == null ? Infinity : b.year);
    },
    recent: function (a, b) {
      return (b.year == null ? -Infinity : b.year) - (a.year == null ? -Infinity : a.year);
    },
    az: function (a, b) {
      return a.title.localeCompare(b.title, LOCALE);
    },
  };

  /* ------------------------------ Состояние -------------------------------- */

  var params = new URLSearchParams(window.location.search);

  var state = {
    query: params.get('q') || '',
    category: countByCategory[params.get('cat')] ? params.get('cat') : 'all',
    sort: SORTS[params.get('sort')] ? params.get('sort') : 'no',
    view: store.get('ua-view') === 'list' ? 'list' : 'grid',
  };

  var visible = [];
  var lastPicked = null;

  /* ------------------------------- Элементы -------------------------------- */

  var el = {
    grid: $('#grid'),
    chips: $('#chips'),
    count: $('#count'),
    empty: $('#empty'),
    emptyText: $('#emptyText'),
    search: $('#search'),
    searchClear: $('#searchClear'),
    sort: $('#sort'),
    themeToggle: $('#themeToggle'),
  };

  /* ------------------------------- Разметка -------------------------------- */

  var ARROW =
    '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function cardHtml(item, index) {
    var no = '№ ' + String(item.no).padStart(3, '0');
    var mark = item.mark || '';
    var markClass = mark.length > 6 ? 'cover__mark cover__mark--sm' : 'cover__mark';

    return (
      '<li class="card" data-id="' +
      esc(item.id) +
      '" style="--hue:' +
      esc(item.hue || item.category.color) +
      ';--i:' +
      index +
      '">' +
      '<a class="card__link" href="' +
      esc(item.url || '#') +
      '">' +
      '<div class="cover" aria-hidden="true">' +
      '<span class="cover__no">' +
      no +
      '</span>' +
      '<span class="cover__cat">' +
      esc(item.category.short) +
      '</span>' +
      (item.badge ? '<span class="cover__badge">' + esc(item.badge) + '</span>' : '') +
      (item.glyphSvg || '') +
      '<span class="' +
      markClass +
      '">' +
      esc(mark) +
      '</span>' +
      '</div>' +
      '<div class="card__body">' +
      '<h3 class="card__title">' +
      esc(item.title) +
      '</h3>' +
      (item.subtitle ? '<p class="card__sub">' + esc(item.subtitle) + '</p>' : '') +
      '<p class="card__meta">' +
      '<span>' +
      no +
      '</span>' +
      '<span>' +
      esc(item.category.label) +
      '</span>' +
      (mark ? '<span>' + esc(mark) + '</span>' : '') +
      '</p>' +
      (item.desc ? '<p class="card__desc">' + esc(item.desc) + '</p>' : '') +
      '</div>' +
      '<span class="card__go" aria-hidden="true"><span>' +
      T.cardOpen +
      '</span>' +
      ARROW +
      '</span>' +
      '</a>' +
      '</li>'
    );
  }

  function renderChips() {
    var all =
      '<button class="chip" type="button" data-cat="all" aria-pressed="false">' +
      T.chipAll +
      ' <span class="chip__n">' +
      items.length +
      '</span>' +
      '</button>';

    var rest = CATEGORIES.map(function (category) {
      var n = countByCategory[category.id] || 0;
      var dot =
        '<i class="chip__dot" style="--dot:' +
        esc(category.color) +
        '" aria-hidden="true"></i>';
      if (!n) {
        return (
          '<button class="chip" type="button" disabled title="' +
          esc(T.chipSoon) +
          '">' +
          dot +
          esc(category.label) +
          ' <span class="chip__n">' +
          T.chipSoonShort +
          '</span>' +
          '</button>'
        );
      }
      return (
        '<button class="chip" type="button" data-cat="' +
        esc(category.id) +
        '" aria-pressed="false">' +
        dot +
        esc(category.label) +
        ' <span class="chip__n">' +
        n +
        '</span>' +
        '</button>'
      );
    }).join('');

    el.chips.innerHTML = all + rest;
  }

  /* ------------------------------- Отрисовка ------------------------------- */

  function getVisible() {
    var words = normSearch(state.query).split(/\s+/).filter(Boolean);
    return items
      .filter(function (item) {
        return state.category === 'all' || item.category.id === state.category;
      })
      .filter(function (item) {
        return words.every(function (word) {
          return item.haystack.indexOf(word) !== -1;
        });
      })
      .sort(SORTS[state.sort]);
  }

  function syncUrl() {
    var next = new URLSearchParams();
    if (state.query.trim()) next.set('q', state.query.trim());
    if (state.category !== 'all') next.set('cat', state.category);
    if (state.sort !== 'no') next.set('sort', state.sort);
    var qs = next.toString();
    var url = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    try {
      window.history.replaceState(null, '', url);
    } catch (e) {
      /* например, при открытии файла с диска */
    }
  }

  function render(options) {
    var animate = !options || options.animate !== false;
    visible = getVisible();
    var total = items.length;
    var n = visible.length;
    var filtered = Boolean(state.query.trim()) || state.category !== 'all';

    el.grid.innerHTML = visible.map(cardHtml).join('');
    el.grid.dataset.view = state.view;
    el.grid.classList.toggle('is-instant', !animate);
    el.grid.hidden = n === 0;
    el.empty.hidden = n !== 0;

    if (n === 0) {
      var category = categoryById.get(state.category);
      var where = category ? fmt(T.inSection, { label: category.label }) : '';
      el.emptyText.textContent = state.query.trim()
        ? fmt(T.emptyQuery, { q: state.query.trim(), where: where })
        : T.emptyCategory;
    }

    el.count.textContent = filtered
      ? fmt(T.countFound, { n: n, total: total })
      : total + ' ' + plural(total, T.itemWords);

    $$('.chip[data-cat]', el.chips).forEach(function (chip) {
      chip.setAttribute('aria-pressed', String(chip.dataset.cat === state.category));
    });
    $$('.segmented [data-view]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
    });

    el.searchClear.hidden = !state.query;
    syncUrl();
  }

  /* ------------------------------- Действия -------------------------------- */

  function resetFilters() {
    state.query = '';
    state.category = 'all';
    el.search.value = '';
    render();
  }

  /** Подсвечивает случайную карточку из тех, что сейчас на экране. */
  function pickRandom() {
    if (!visible.length) resetFilters();
    if (!visible.length) return;

    var pool = visible;
    if (pool.length > 1 && lastPicked) pool = pool.filter(function (item) {
      return item.id !== lastPicked;
    });
    var item = pool[Math.floor(Math.random() * pool.length)];
    lastPicked = item.id;

    var card = el.grid.querySelector('.card[data-id="' + CSS.escape(item.id) + '"]');
    if (!card) return;

    $$('.card.is-picked', el.grid).forEach(function (node) {
      node.classList.remove('is-picked');
    });
    card.classList.add('is-picked');
    card.scrollIntoView({
      block: 'center',
      behavior: reducedMotion.matches ? 'auto' : 'smooth',
    });
    var link = card.querySelector('a');
    if (link) link.focus({ preventScroll: true });
    window.setTimeout(function () {
      card.classList.remove('is-picked');
    }, 2600);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    el.themeToggle.setAttribute(
      'aria-label',
      theme === 'dark' ? T.themeToLight : T.themeToDark
    );
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#101113' : '#e8e9e4');
  }

  /* ------------------------------- События --------------------------------- */

  el.search.addEventListener('input', function () {
    state.query = el.search.value;
    render({ animate: false });
  });

  el.search.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && el.search.value) {
      event.preventDefault();
      state.query = '';
      el.search.value = '';
      render();
    }
  });

  $('#searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    el.search.blur();
  });

  el.searchClear.addEventListener('click', function () {
    state.query = '';
    el.search.value = '';
    render();
    el.search.focus();
  });

  el.sort.addEventListener('change', function () {
    state.sort = SORTS[el.sort.value] ? el.sort.value : 'no';
    render();
  });

  el.chips.addEventListener('click', function (event) {
    var chip = event.target.closest('.chip[data-cat]');
    if (!chip) return;
    state.category = chip.dataset.cat;
    render();
  });

  $$('.segmented [data-view]').forEach(function (button) {
    button.addEventListener('click', function () {
      state.view = button.dataset.view === 'list' ? 'list' : 'grid';
      store.set('ua-view', state.view);
      render();
    });
  });

  $$('[data-random]').forEach(function (button) {
    button.addEventListener('click', pickRandom);
  });

  $('#resetFilters').addEventListener('click', function () {
    resetFilters();
    el.search.focus();
  });

  el.themeToggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    store.set('ua-theme', next);
  });

  // Клавиша «/» ставит курсор в поиск
  document.addEventListener('keydown', function (event) {
    if (event.key !== '/' || event.ctrlKey || event.metaKey || event.altKey) return;
    var target = event.target;
    if (
      target instanceof HTMLElement &&
      (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
    ) {
      return;
    }
    event.preventDefault();
    el.search.focus();
    el.search.select();
  });

  /* -------------------------------- Запуск --------------------------------- */

  function fillStats() {
    var sections = Object.keys(countByCategory).length;
    var latest = items[items.length - 1];

    $('#statItems').textContent = String(items.length);
    $('#statItemsLabel').textContent = T.statItemsLabel;
    $('#statSections').textContent = String(sections);
    $('#statSectionsLabel').textContent = T.statSectionsLabel;
    $('#statLatest').textContent = latest ? latest.title : '—';
    $('#year').textContent = String(new Date().getFullYear());
  }

  el.search.value = state.query;
  el.sort.value = state.sort;
  applyTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  fillStats();
  renderChips();
  render();
})();
