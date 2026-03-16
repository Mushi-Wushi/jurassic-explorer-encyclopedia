const dinoGrid = document.getElementById("dinoGrid");
const resultsInfo = document.getElementById("resultsInfo");
const activeFiltersEl = document.getElementById("activeFilters");

const searchInput = document.getElementById("searchInput");
const periodFilter = document.getElementById("periodFilter");
const dietFilter = document.getElementById("dietFilter");
const sizeFilter = document.getElementById("sizeFilter");
const sortSelect = document.getElementById("sortSelect");
const favoritesOnly = document.getElementById("favoritesOnly");
const resetBtn = document.getElementById("resetBtn");

const compareSelectA = document.getElementById("compareSelectA");
const compareSelectB = document.getElementById("compareSelectB");
const compareResult = document.getElementById("compareResult");

const state = {
  dinosaurs: [],
  favorites: getFavorites(),
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  bindEvents();
  renderLoadingSkeletons(8);

  try {
    const response = await fetch("dinosaurs.json");
    if (!response.ok) throw new Error("Could not load dinosaur data.");

    const data = await response.json();
    state.dinosaurs = data;

    populateCompareOptions();
    updateDisplay();
    updateComparePanel();
  } catch (error) {
    showErrorState(error.message);
  }
}

function bindEvents() {
  // Debounced search feels smoother
  const debouncedUpdate = debounce(updateDisplay, 120);
  searchInput.addEventListener("input", debouncedUpdate);

  periodFilter.addEventListener("change", updateDisplay);
  dietFilter.addEventListener("change", updateDisplay);
  sizeFilter.addEventListener("change", updateDisplay);
  sortSelect.addEventListener("change", updateDisplay);
  favoritesOnly.addEventListener("change", updateDisplay);

  compareSelectA.addEventListener("change", updateComparePanel);
  compareSelectB.addEventListener("change", updateComparePanel);

  resetBtn.addEventListener("click", resetFilters);

  activeFiltersEl.addEventListener("click", (event) => {
    const chip = event.target.closest(".chip");
    if (!chip) return;

    const key = chip.dataset.chip;
    if (key === "search") searchInput.value = "";
    if (key === "period") periodFilter.value = "All";
    if (key === "diet") dietFilter.value = "All";
    if (key === "size") sizeFilter.value = "All";
    if (key === "favorites") favoritesOnly.checked = false;

    updateDisplay();
  });

  dinoGrid.addEventListener("click", (event) => {
    const favoriteBtn = event.target.closest(".favorite-btn");
    const inlineResetBtn = event.target.closest(".inline-reset-btn");
    const compareBtn = event.target.closest(".compare-btn");

    if (favoriteBtn) {
      toggleFavorite(favoriteBtn.dataset.id);
    }

    if (inlineResetBtn) {
      resetFilters();
    }

    if (compareBtn) {
      const dinoId = compareBtn.dataset.compare;

      // Auto-fill A then B, then replace A
      if (!compareSelectA.value) {
        compareSelectA.value = dinoId;
      } else if (!compareSelectB.value && compareSelectA.value !== dinoId) {
        compareSelectB.value = dinoId;
      } else {
        compareSelectA.value = dinoId;
        compareSelectB.value = "";
      }

      updateComparePanel();
      // nice UX: scroll compare panel into view
      document.querySelector(".compare-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function debounce(fn, wait = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem("dinoFavorites")) || [];
  } catch {
    return [];
  }
}

function saveFavorites() {
  localStorage.setItem("dinoFavorites", JSON.stringify(state.favorites));
}

function toggleFavorite(dinoId) {
  const isFavorite = state.favorites.includes(dinoId);

  state.favorites = isFavorite
    ? state.favorites.filter((id) => id !== dinoId)
    : [...state.favorites, dinoId];

  saveFavorites();
  updateDisplay();
}

function populateCompareOptions() {
  const options = state.dinosaurs
    .map((d) => `<option value="${d.id}">${d.name}</option>`)
    .join("");

  compareSelectA.innerHTML = `<option value="">Choose Dinosaur A</option>${options}`;
  compareSelectB.innerHTML = `<option value="">Choose Dinosaur B</option>${options}`;
}

function tagSpan(kind, value) {
  return `<span class="tag" data-kind="${kind}" data-value="${value}">${value}</span>`;
}

function getCardTitle(dino) {
  if (dino.displayName && dino.displayName.trim()) return dino.displayName.trim();

  // Auto fallback: "Tyrannosaurus Rex" -> "T. rex"
  const parts = (dino.name || "").trim().split(/\s+/);
  if (parts.length >= 2) {
    const genus = parts[0];
    const species = parts[1].toLowerCase();
    // only abbreviate if genus is pretty long
    if (genus.length >= 12) return `${genus[0]}. ${species}`;
  }

  return dino.name;
}

function createDinoCard(dino) {
  const isFavorite = state.favorites.includes(dino.id);

  return `
    <article class="dino-card">
      <img class="card-watermark" src="${dino.image}" alt="" aria-hidden="true" />

      <div class="dino-card-content">
        <div class="card-top">
          <div>
            <p class="card-eyebrow">Mesozoic Profile</p>
            <h2 title="${dino.name}">${getCardTitle(dino)}</h2>
          </div>

          <button
            class="favorite-btn ${isFavorite ? "active" : ""}"
            data-id="${dino.id}"
            aria-label="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
            aria-pressed="${isFavorite ? "true" : "false"}"
            title="${isFavorite ? "Remove from favorites" : "Add to favorites"}"
            type="button"
          >
            ${isFavorite ? "★" : "☆"}
          </button>
        </div>

        <div class="tag-row">
          ${tagSpan("period", dino.period)}
          ${tagSpan("diet", dino.diet)}
          ${tagSpan("size", dino.size)}
        </div>

        <div class="stat-stack">
          <p><span>Length</span><strong>${dino.length} m</strong></p>
          <p><span>Era Group</span><strong>${dino.period}</strong></p>
        </div>

        <div class="card-actions">
          <button class="compare-btn" data-compare="${dino.id}" type="button">Compare</button>
        </div>
      </div>
    </article>
  `;
}

function renderDinosaurs(data) {
  if (data.length === 0) {
    const emptyTitle = favoritesOnly.checked ? "No favorites yet" : "No dinosaurs found";
    const emptyMsg = favoritesOnly.checked
      ? "Star some dinosaurs, then come back to your favorites list."
      : "Try changing your search or filters.";

    dinoGrid.innerHTML = `
      <div class="empty-state">
        <h3>${emptyTitle}</h3>
        <p>${emptyMsg}</p>
        <button class="inline-reset-btn" type="button">Clear Filters</button>
      </div>
    `;

    resultsInfo.textContent = "0 dinosaurs shown";
    return;
  }

  dinoGrid.innerHTML = data.map(createDinoCard).join("");
  resultsInfo.textContent = `Showing ${data.length} of ${state.dinosaurs.length} dinosaurs • Favorites: ${state.favorites.length}`;
}

function filterDinosaurs(data) {
   const searchValue = searchInput.value.toLowerCase().trim();
   const period = periodFilter.value;
   const diet = dietFilter.value;
   const size = sizeFilter.value;
   const favOnly = favoritesOnly.checked;

   return data.filter((dino) => {
      const desc = (dino.description || "").toLowerCase();

      const matchesSearch =
      !searchValue ||
      dino.name.toLowerCase().includes(searchValue) ||
      desc.includes(searchValue);

      const matchesPeriod = period === "All" || dino.period === period;
      const matchesDiet = diet === "All" || dino.diet === diet;
      const matchesSize = size === "All" || dino.size === size;
      const matchesFavorites = !favOnly || state.favorites.includes(dino.id);

      return (
      matchesSearch &&
      matchesPeriod &&
      matchesDiet &&
      matchesSize &&
      matchesFavorites
      );
   });
}

function sortDinosaurs(data) {
  const sorted = [...data];
  const sortValue = sortSelect.value;

  if (sortValue === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
  if (sortValue === "name-desc") sorted.sort((a, b) => b.name.localeCompare(a.name));
  if (sortValue === "length-asc") sorted.sort((a, b) => a.length - b.length);
  if (sortValue === "length-desc") sorted.sort((a, b) => b.length - a.length);

  return sorted;
}

function renderActiveFilters() {
  const chips = [];

  const q = searchInput.value.trim();
  if (q) chips.push({ key: "search", label: `Search: “${q.length > 18 ? q.slice(0, 18) + "…" : q}”` });

  if (periodFilter.value !== "All") chips.push({ key: "period", label: `Period: ${periodFilter.value}` });
  if (dietFilter.value !== "All") chips.push({ key: "diet", label: `Diet: ${dietFilter.value}` });
  if (sizeFilter.value !== "All") chips.push({ key: "size", label: `Size: ${sizeFilter.value}` });
  if (favoritesOnly.checked) chips.push({ key: "favorites", label: `Favorites only` });

  activeFiltersEl.innerHTML = chips
    .map(
      (c) =>
        `<button type="button" class="chip" data-chip="${c.key}" aria-label="Remove filter: ${c.label}">
           <span>${c.label}</span>
           <span class="x" aria-hidden="true">×</span>
         </button>`
    )
    .join("");
}

function updateDisplay() {
  const filtered = filterDinosaurs(state.dinosaurs);
  const sorted = sortDinosaurs(filtered);
  renderActiveFilters();
  renderDinosaurs(sorted);
}

function createCompareCard(dino, isLonger = false) {
   const desc = (dino.description ?? "").trim();
   const safeDesc = desc || "Field notes pending—no specimen summary recorded yet.";

   return `
      <article class="compare-showcase-card ${isLonger ? "winner" : ""}">
      <img class="compare-watermark" src="${dino.image}" alt="" aria-hidden="true" />

      <div class="compare-card-content">
         <div class="compare-card-header">
            <p class="compare-kicker">Comparison Profile</p>
            ${isLonger ? `<span class="winner-pill">Longer</span>` : ""}
         </div>

         <h3>${dino.name}</h3>

         <div class="compare-tag-row">
            ${tagSpan("period", dino.period)}
            ${tagSpan("diet", dino.diet)}
            ${tagSpan("size", dino.size)}
         </div>

         <div class="compare-stat-list">
            <p><span>Period</span><strong>${dino.period}</strong></p>
            <p><span>Diet</span><strong>${dino.diet}</strong></p>
            <p><span>Size</span><strong>${dino.size}</strong></p>
            <p><span>Length</span><strong>${dino.length} m</strong></p>
         </div>

         <p class="compare-description">${safeDesc}</p>
      </div>
      </article>
   `;
}

function updateComparePanel() {
  const idA = compareSelectA.value;
  const idB = compareSelectB.value;

  if (!idA || !idB) {
    compareResult.innerHTML = `<p class="compare-placeholder">Choose two dinosaurs to compare.</p>`;
    return;
  }

  if (idA === idB) {
    compareResult.innerHTML = `<p class="compare-placeholder">Pick two different dinosaurs for comparison.</p>`;
    return;
  }

  const dinoA = state.dinosaurs.find((d) => d.id === idA);
  const dinoB = state.dinosaurs.find((d) => d.id === idB);

  if (!dinoA || !dinoB) {
    compareResult.innerHTML = `<p class="compare-placeholder">Comparison data could not be loaded.</p>`;
    return;
  }

  let summaryText = "";
  let longerId = null;

  if (dinoA.length > dinoB.length) {
    longerId = dinoA.id;
    summaryText = `${dinoA.name} is longer by ${(dinoA.length - dinoB.length).toFixed(1)} meters.`;
  } else if (dinoB.length > dinoA.length) {
    longerId = dinoB.id;
    summaryText = `${dinoB.name} is longer by ${(dinoB.length - dinoA.length).toFixed(1)} meters.`;
  } else {
    summaryText = `${dinoA.name} and ${dinoB.name} have the same recorded length.`;
  }

  const periodText =
    dinoA.period === dinoB.period
      ? `Both belong to the ${dinoA.period} period.`
      : `${dinoA.name} lived in the ${dinoA.period}, while ${dinoB.name} lived in the ${dinoB.period}.`;

  const dietText =
    dinoA.diet === dinoB.diet
      ? `Both share the same diet: ${dinoA.diet}.`
      : `${dinoA.name} was a ${dinoA.diet}, while ${dinoB.name} was a ${dinoB.diet}.`;

  compareResult.innerHTML = `
    <div class="compare-showcase">
      ${createCompareCard(dinoA, longerId === dinoA.id)}

      <article class="compare-summary-card">
        <p class="compare-summary-kicker">Field Notes</p>
        <h3>${dinoA.name} vs ${dinoB.name}</h3>

        <div class="summary-points">
          <p>${summaryText}</p>
          <p>${periodText}</p>
          <p>${dietText}</p>
        </div>
      </article>

      ${createCompareCard(dinoB, longerId === dinoB.id)}
    </div>
  `;
}

function resetFilters() {
  searchInput.value = "";
  periodFilter.value = "All";
  dietFilter.value = "All";
  sizeFilter.value = "All";
  sortSelect.value = "name-asc";
  favoritesOnly.checked = false;

  // also clear compare for intuitiveness
  compareSelectA.value = "";
  compareSelectB.value = "";
  updateComparePanel();

  updateDisplay();
}

function renderLoadingSkeletons(count = 6) {
  const skeletons = Array.from({ length: count }, () => {
    return `
      <article class="skeleton-card">
        <div class="skeleton-img"></div>
      </article>
    `;
  }).join("");

  dinoGrid.innerHTML = skeletons;
  resultsInfo.textContent = "Loading dinosaurs…";
}

function showErrorState(message) {
  dinoGrid.innerHTML = `
    <div class="error-state">
      <h3>Could not load dinosaurs</h3>
      <p>${message}</p>
      <p>Tip: open the project using a local server instead of file://</p>
    </div>
  `;
  resultsInfo.textContent = "0 dinosaurs shown";
}