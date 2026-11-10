/* ============================================================
   Untold Archive — catalog app (English edition)
   ============================================================ */

/* ---------- Catalog data ---------- */
/* Each entry: id, num, title, section key, era (year for sorting,
   negative for BCE), yearLabel (what to display), place, blurb, url,
   added (ISO date for "latest addition"). */
const SECTIONS = [
  { key: "mysteries",       label: "Mysteries" },
  { key: "investigations",  label: "Investigations" },
  { key: "space",           label: "Space" },
  { key: "cinema",          label: "Cinema" },
];

const ITEMS = [
  {
    id: "dyatlov-pass",
    num: 1,
    title: "Dyatlov Pass Incident",
    section: "mysteries",
    era: 1959,
    yearLabel: "February 1959",
    place: "Northern Urals, USSR",
    blurb: "Nine hikers, a tent slashed from the inside, unexplained injuries on a remote mountainside. The case that refuses to close.",
    url: "dyatlov-pass/",
    added: "2026-02-09",
  },
  {
    id: "amelia-earhart",
    num: 2,
    title: "Amelia Earhart",
    section: "mysteries",
    era: 1937,
    yearLabel: "July 1937",
    place: "Pacific Ocean, near Howland Island",
    blurb: "The most famous woman in aviation vanishes two-thirds of the way around the world. Eighty-nine years of searches, sonar, and theories.",
    url: "amelia-earhart/",
    added: "2026-02-04",
  },
  {
    id: "mary-celeste",
    num: 3,
    title: "Mary Celeste",
    section: "mysteries",
    era: 1872,
    yearLabel: "December 1872",
    place: "Atlantic Ocean, near the Azores",
    blurb: "A brigantine found adrift, sails up, cargo intact — and not a soul on board. The original ghost ship.",
    url: "mary-celeste/",
    added: "2026-01-28",
  },
  {
    id: "atlantis",
    num: 4,
    title: "Atlantis",
    section: "mysteries",
    era: -360,
    yearLabel: "c. 360 BC (Plato)",
    place: "Beyond the Pillars of Heracles",
    blurb: "Two dialogues by Plato, one drowned island, and twenty-five centuries of arguments over whether it ever existed.",
    url: "atlantis/",
    added: "2026-01-22",
  },
  {
    id: "tunguska",
    num: 5,
    title: "Tunguska Event",
    section: "mysteries",
    era: 1908,
    yearLabel: "June 1908",
    place: "Siberia, Russia",
    blurb: "A flash that flattened eighty million trees across two thousand square kilometres — and left no crater at all.",
    url: "tunguska/",
    added: "2026-01-15",
  },
  {
    id: "jfk",
    num: 6,
    title: "The JFK Assassination",
    section: "investigations",
    era: 1963,
    yearLabel: "November 1963",
    place: "Dallas, Texas",
    blurb: "Dealey Plaza, twelve seconds, three shots, one President. The Warren Report and every report that came after it.",
    url: "jfk-assassination/",
    added: "2026-01-10",
  },
  {
    id: "roswell",
    num: 7,
    title: "Roswell Incident",
    section: "investigations",
    era: 1947,
    yearLabel: "July 1947",
    place: "Roswell, New Mexico",
    blurb: "A rancher finds strange debris, the Army Air Field announces a flying disc, then retracts it within a day.",
    url: "roswell/",
    added: "2025-12-28",
  },
  {
    id: "db-cooper",
    num: 8,
    title: "D. B. Cooper",
    section: "investigations",
    era: 1971,
    yearLabel: "November 1971",
    place: "Somewhere over Washington State",
    blurb: "A man with a briefcase and a bomb ransom parachutes out of a 727 with $200,000 and is never seen again.",
    url: "db-cooper/",
    added: "2025-12-20",
  },
  {
    id: "wow-signal",
    num: 9,
    title: "The Wow! Signal",
    section: "space",
    era: 1977,
    yearLabel: "August 1977",
    place: "Ohio, Earth — pointing at Sagittarius",
    blurb: "Seventy-two seconds of a signal that looked exactly like the one SETI was built to find. Then silence, forever.",
    url: "wow-signal/",
    added: "2025-12-12",
  },
  {
    id: "apollo",
    num: 10,
    title: "The Apollo Moon Landings",
    section: "space",
    era: 1969,
    yearLabel: "1969 – 1972",
    place: "The Moon",
    blurb: "Six crews, twelve astronauts, three rovers, 382 kilograms of another world brought home. The atlas of every footprint.",
    url: "apollo-moon-landings/",
    added: "2025-12-05",
  },
  {
    id: "universe-atlas",
    num: 11,
    title: "Atlas of the Universe",
    section: "space",
    era: 2026,
    yearLabel: "Ongoing",
    place: "From low Earth orbit to the cosmic horizon",
    blurb: "A travel guide to everything we have mapped: planets, moons, the Kuiper Belt, galaxies, and the 93-billion-light-year edge.",
    url: "atlas-of-the-universe/",
    added: "2026-02-11",
  },
  {
    id: "interstellar",
    num: 12,
    title: "Interstellar",
    section: "cinema",
    era: 2014,
    yearLabel: "2014",
    place: "Directed by Christopher Nolan",
    blurb: "A wormhole, a black hole named Gargantua, and a father who promises to come back. The film that made physicists cry.",
    url: "interstellar/",
    added: "2026-01-30",
  },
  {
    id: "avatar",
    num: 13,
    title: "Avatar",
    section: "cinema",
    era: 2009,
    yearLabel: "2009",
    place: "Directed by James Cameron",
    blurb: "A paraplegic marine wakes up in a nine-foot-tall blue body on Pandora and forgets which side he was on.",
    url: "avatar/",
    added: "2026-01-25",
  },
  {
    id: "2001-space-odyssey",
    num: 14,
    title: "2001: A Space Odyssey",
    section: "cinema",
    era: 1968,
    yearLabel: "1968",
    place: "Directed by Stanley Kubrick",
    blurb: "A black monolith, an ape with a bone, a computer that won't open the pod bay doors. The film that taught cinema to think in sci-fi.",
    url: "2001-a-space-odyssey/",
    added: "2025-12-18",
  },
];

/* ---------- State ---------- */
const state = {
  query: "",
  section: "all",
  sort: "no",
  view: "grid",
};

/* ---------- DOM refs ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const grid = $("#grid");
const chips = $("#chips");
const count = $("#count");
const empty = $("#empty");
const emptyText = $("#emptyText");
const searchInput = $("#search");
const searchClear = $("#searchClear");
const sortSelect = $("#sort");
const resetFilters = $("#resetFilters");
const themeToggle = $("#themeToggle");
const randomBtn = $("[data-random]");
const yearEl = $("#year");

/* ---------- Helpers ---------- */
const fmtNum = (n) => String(n).padStart(2, "0");

function sectionLabel(key) {
  const s = SECTIONS.find((s) => s.key === key);
  return s ? s.label : key;
}

function formatAdded(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ---------- Filtering + sorting ---------- */
function getVisibleItems() {
  const q = state.query.trim().toLowerCase();
  const list = ITEMS.filter((it) => {
    if (state.section !== "all" && it.section !== state.section) return false;
    if (!q) return true;
    const haystack = [
      it.title,
      it.place,
      it.blurb,
      it.yearLabel,
      String(it.era),
      sectionLabel(it.section),
      it.id,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  switch (state.sort) {
    case "new":
      list.sort((a, b) => (a.added < b.added ? 1 : -1));
      break;
    case "old":
      list.sort((a, b) => a.era - b.era);
      break;
    case "recent":
      list.sort((a, b) => b.era - a.era);
      break;
    case "az":
      list.sort((a, b) => a.title.localeCompare(b.title, "en"));
      break;
    default: // "no"
      list.sort((a, b) => a.num - b.num);
  }

  return list;
}

/* ---------- Rendering ---------- */
function renderCard(it) {
  const li = document.createElement("li");
  li.className = "card";
  li.dataset.section = it.section;
  li.dataset.num = it.num;
  li.innerHTML = `
    <a class="card__link" href="${it.url}">
      <div class="card__head">
        <span class="card__num">№ ${fmtNum(it.num)}</span>
        <span class="card__section">${sectionLabel(it.section)}</span>
      </div>
      <div class="card__main">
        <h3 class="card__title">${it.title}</h3>
        <p class="card__meta">${it.yearLabel} · ${it.place}</p>
      </div>
      <p class="card__desc">${it.blurb}</p>
      <span class="card__cta">Read the case</span>
    </a>
  `;
  return li;
}

function renderGrid() {
  const items = getVisibleItems();
  grid.innerHTML = "";
  const frag = document.createDocumentFragment();
  for (const it of items) frag.appendChild(renderCard(it));
  grid.appendChild(frag);

  count.textContent = `${items.length} of ${ITEMS.length} entries`;

  if (items.length === 0) {
    empty.hidden = false;
    emptyText.textContent =
      state.query || state.section !== "all"
        ? `No entries match “${state.query || state.section}”.`
        : "Try a different search term or section.";
  } else {
    empty.hidden = true;
  }
}

function renderChips() {
  chips.innerHTML = "";
  const all = document.createElement("button");
  all.type = "button";
  all.className = "chip";
  all.textContent = "All";
  all.insertAdjacentHTML(
    "beforeend",
    `<span class="chip__count">${ITEMS.length}</span>`
  );
  all.dataset.section = "all";
  all.setAttribute("aria-pressed", state.section === "all");
  chips.appendChild(all);

  for (const s of SECTIONS) {
    const n = ITEMS.filter((it) => it.section === s.key).length;
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.dataset.section = s.key;
    chip.setAttribute("aria-pressed", state.section === s.key);
    chip.innerHTML = `${s.label}<span class="chip__count">${n}</span>`;
    chips.appendChild(chip);
  }
}

function renderStats() {
  $("#statItems").textContent = String(ITEMS.length);
  $("#statSections").textContent = String(SECTIONS.length);

  const latest = ITEMS.reduce((acc, it) =>
    it.added > acc.added ? it : acc
  );
  $("#statLatest").textContent = `${latest.title} — ${formatAdded(latest.added)}`;
}

/* ---------- Wire up controls ---------- */
function setSection(key) {
  state.section = key;
  for (const chip of chips.querySelectorAll(".chip")) {
    chip.setAttribute("aria-pressed", chip.dataset.section === key);
  }
  renderGrid();
}

chips.addEventListener("click", (e) => {
  const btn = e.target.closest(".chip");
  if (!btn) return;
  setSection(btn.dataset.section);
});

searchInput.addEventListener("input", () => {
  state.query = searchInput.value;
  searchClear.hidden = !state.query;
  renderGrid();
});

searchClear.addEventListener("click", () => {
  searchInput.value = "";
  state.query = "";
  searchClear.hidden = true;
  searchInput.focus();
  renderGrid();
});

sortSelect.addEventListener("change", () => {
  state.sort = sortSelect.value;
  renderGrid();
});

document.querySelector(".segmented").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-view]");
  if (!btn) return;
  state.view = btn.dataset.view;
  grid.dataset.view = state.view;
  for (const b of document.querySelectorAll(".segmented button")) {
    b.setAttribute("aria-pressed", b.dataset.view === state.view);
  }
  try {
    localStorage.setItem("ua-view", state.view);
  } catch (e) {}
});

resetFilters.addEventListener("click", () => {
  state.query = "";
  state.section = "all";
  state.sort = "no";
  searchInput.value = "";
  searchClear.hidden = true;
  sortSelect.value = "no";
  setSection("all");
  renderGrid();
});

/* ---------- Random case ---------- */
randomBtn.addEventListener("click", () => {
  const pool = getVisibleItems();
  const items = pool.length ? pool : ITEMS;
  const it = items[Math.floor(Math.random() * items.length)];
  // Smooth-scroll to the matching card, then navigate after a beat.
  const card = grid.querySelector(`.card[data-num="${it.num}"]`);
  if (card) {
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    card.animate(
      [
        { boxShadow: "0 0 0 0 var(--accent)" },
        { boxShadow: "0 0 0 4px var(--accent)" },
        { boxShadow: "0 0 0 0 var(--accent)" },
      ],
      { duration: 700, easing: "ease-out" }
    );
  }
  setTimeout(() => {
    window.location.href = it.url;
  }, 750);
});

/* ---------- Keyboard: `/` focuses search, Esc clears ---------- */
document.addEventListener("keydown", (e) => {
  if (e.key === "/" && document.activeElement !== searchInput) {
    const tag = (document.activeElement?.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select") return;
    e.preventDefault();
    searchInput.focus();
    searchInput.select();
  }
  if (e.key === "Escape" && document.activeElement === searchInput) {
    if (state.query) {
      searchInput.value = "";
      state.query = "";
      searchClear.hidden = true;
      renderGrid();
    } else {
      searchInput.blur();
    }
  }
});

/* ---------- Theme toggle ---------- */
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.setAttribute(
    "aria-label",
    theme === "light" ? "Switch to dark theme" : "Switch to light theme"
  );
  try {
    localStorage.setItem("ua-theme", theme);
  } catch (e) {}
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "light" ? "dark" : "light");
});

/* Init aria-label for the current theme */
(function initThemeLabel() {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  themeToggle.setAttribute(
    "aria-label",
    current === "light" ? "Switch to dark theme" : "Switch to light theme"
  );
})();

/* ---------- View persistence ---------- */
try {
  const savedView = localStorage.getItem("ua-view");
  if (savedView === "grid" || savedView === "list") {
    state.view = savedView;
    grid.dataset.view = savedView;
    for (const b of document.querySelectorAll(".segmented button")) {
      b.setAttribute("aria-pressed", b.dataset.view === savedView);
    }
  }
} catch (e) {}

/* ---------- Year in footer ---------- */
yearEl.textContent = new Date().getFullYear();

/* ---------- First paint ---------- */
renderStats();
renderChips();
renderGrid();
