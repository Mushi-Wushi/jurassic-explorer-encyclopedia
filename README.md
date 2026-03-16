<p align="center">
  <img src="https://img.shields.io/badge/Status-Field%20Ready-16a34a?style=for-the-badge" alt="Status: Field Ready" />
  <img src="https://img.shields.io/badge/Build-Vanilla%20JS-0ea5e9?style=for-the-badge" alt="Build: Vanilla JS" />
  <img src="https://img.shields.io/badge/Theme-Jurassic%20Field%20Guide-f59e0b?style=for-the-badge" alt="Theme: Jurassic Field Guide" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-5-e34f26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS-3-1572b6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-ES6-f7df1e?style=flat-square&logo=javascript&logoColor=111827" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Storage-localStorage-111827?style=flat-square" alt="localStorage" />
  <img src="https://img.shields.io/badge/Data-JSON-111827?style=flat-square" alt="JSON" />

  [📂 GitHub Repo](https://github.com/Mushi-Wushi?tab=repositories)
</p>

<h1 align="center">🦖 Jurassic Explorer Encyclopedia 🌿</h1>
<p align="center"><i>A Jurassic field-guide style mini app for scouting, sorting, and comparing Mesozoic giants.</i></p>

---

## 🧭 Project Title
**Jurassic Explorer Encyclopedia** — a digital **field guide** where users browse dinosaur “specimen cards,” filter by classification, and compare two dinosaurs at a **research station**.

---

## 🧩 Problem
Most dinosaur info pages are either **too text-heavy** or **hard to browse quickly**, especially when you want to compare dinosaurs side-by-side.

### ❓ What user problem am I solving?
I’m solving the “I want to quickly find + compare dinosaurs” problem by building a **fast, visual, field-guide interface** that lets users:
- 🔎 Search instantly  
- 🗺️ Filter by period / diet / size  
- 📏 Sort by name or length  
- ⭐ Save favorites like a “field log”  
- 🧪 Compare two dinosaurs in a “field station” panel  

---

## 🎯 Goals
- Make discovery **fast and intuitive** (field guide browsing style)
- Keep UI **consistent and Jurassic-themed**
- Make filtering/sorting feel smooth and immediate
- Persist favorites so users can return to saved “specimens”

### 📌 Measurable outcomes (ex: “search result in under 1 sec”)
- ⚡ Search updates within **~150ms debounce** (feels instant)
- 🧠 Filter + sort runs client-side with **no page refresh**
- ⭐ Favorites persist across refresh using **localStorage**
- 🧱 Card layout stays consistent using **locked sizing + silhouette watermark**
- 🧪 Compare panel updates instantly once two dinosaurs are selected

---

## 🛠️ Tech Stack
- **HTML** — semantic structure (controls, panels, cards)
- **CSS** — responsive grid, themed UI, consistent specimen layouts
- **JavaScript (Vanilla)** — rendering, filtering, sorting, compare logic
- **Data** — `dinosaurs.json` (structured dataset)
- **Storage** — `localStorage` (favorites / field log)

🖼️ **Image credit:** Dinosaur images were sourced from the Natural History Museum (UK): https://www.nhm.ac.uk/

---

## 🧪 Process
**Wireframe → build → test → iterate**

- 📝 **Wireframe**
  - Sketched a “field guide” flow: **Search + filters → Compare station → Specimen cards**
- 🧱 **Build**
  - Rendered dinosaurs from JSON
  - Added search/filter/sort + compare and favorites
- ✅ **Test**
  - Verified filter combinations (period + diet + size + favorites)
  - Checked sorting stability (name + length)
  - Tested responsiveness for mobile and desktop
- 🔁 **Iterate**
  - Refactored into reusable functions
  - Polished UI (fixed card sizing + silhouette watermark)
  - Added UX improvements (debounced search, compare auto-fill, filter chips)

---

## ✨ Key Features
- 🔎 **Specimen Search** — fast search by name (and optional description in compare view)
- 🗺️ **Field Filters**
  - Period: Triassic / Jurassic / Cretaceous  
  - Diet: Carnivore / Herbivore / Omnivore  
  - Size: Small / Medium / Large / Huge
- 📏 **Sorting**
  - Name A–Z / Z–A
  - Length ascending / descending
- ⭐ **Favorites (Field Log)**
  - Star dinosaurs and persist them with `localStorage`
  - “Favorites only” mode for quick revisit
- 🧪 **Compare Station**
  - Compare two dinosaurs side-by-side
  - Click **Compare** on cards to auto-fill A → B
- 🦴 **Jurassic Field-Guide UI**
  - “Mesozoic Profile” specimen cards  
  - Silhouette watermark styling  
  - “Field Notes” comparison panel  

---

## 🐛 Challenges and Fixes
### 🧯 What broke? How did you debug it?

- ❌ **Bug: “dino is not defined”**
  - Cause: incorrect variable names inside `.filter()` callbacks  
  - Fix: rewrote filter logic with correct callback references + safe string handling.

- 🧱 **Inconsistent card sizes / images**
  - Cause: content length affected layout flow  
  - Fix: locked card sizing and moved imagery into a **watermark silhouette layer**.

- 🦖 **Long dinosaur names breaking layout (ex: Tyrannosaurus Rex)**
  - Fix: prioritized `displayName` (ex: **T. rex**) and added **one-line ellipsis clamp** as a safety net.

- 📝 **Descriptions inconsistent across dataset**
  - Fix: removed descriptions from main card showcase and displayed them inside the **Compare panel** where longer “Field Notes” belong.

---

## 🧠 What I learned
- How to structure a frontend app with:
  - **data (JSON)** → **logic (JS)** → **presentation (HTML/CSS)**
- Real usage of array methods:
  - `.filter()`, `.sort()`, `.map()`, `.find()`
- Building reusable UI functions (rendering + state updates)
- Persisting user state with `localStorage`
- UI polish techniques:
  - silhouette watermark layering  
  - consistent card sizing  
  - responsive grid layouts  
  - debounced search for smoother UX  

---

## 🧬 Future Improvements
- 🪟 Add a specimen **detail modal** (more stats, habitat, fun facts)
- 🏁 Add stat highlighting in Compare (stronger “wins” visuals)
- 🧮 Add tag counts (ex: “Jurassic dinos shown: 4”)
- 🌍 Expand dataset fields: region, weight, discovery year
- 🌙 Add “Night Expedition” dark mode
- ⚛️ Rebuild as a React version for an advanced portfolio upgrade

---

## 🧰 What libraries/tools you should add next
- ✨ **Prettier** — formatting for clean commits  
- 🧹 **ESLint** — catch JS mistakes early  
- ⚡ **Vite** — modern dev server + faster builds  
- 🧾 **TypeScript** (or **Zod**) — safer data handling and schema validation  
- 🎬 Optional polish:
  - **GSAP** (vanilla micro-interactions)
  - **Framer Motion** (if migrating to React)

---

<p align="center">

   ## 🦕 Author

   ** John Fred B. Delos Santos**

  🦖🌿 Built like a field guide. Tested like a lab tool. Ready for exploration.
</p>