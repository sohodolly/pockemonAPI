# PokéSearch — Pokémon Search & Filter Tool

An interactive web interface for searching, sorting, and filtering Pokémon data.  
Built with pure HTML, CSS, and JavaScript (no external libraries), it uses data loaded via `main.js` (e.g., from an API or a local array).

## 📸 Screenshot

![Screenshot of the interface](screenshot.jpg)  

## 🚀 Features

- **Sort** by ID, name, HP, attack, or defence.
- **Order** – ascending or descending.
- **Filter** by name (text search) and three numeric ranges:
  - HP (from 10 to 250)
  - Attack (from 5 to 130)
  - Defence (from 5 to 180)
- **Pokémon cards** displaying:
  - name and ID
  - types (with coloured badges)
  - three main stats (HP, Attack, Defence) with progress bars
- **Responsive design** – works on any screen size.
- **Dark theme** with glass‑morphism effects and card‑appear animations.

## 🛠 Technologies

- HTML5
- CSS3 (Flexbox, Grid, custom properties, media queries)
- JavaScript (ES6) – rendering and state management logic is in `main.js`
- Font: [Inter](https://fonts.google.com/specimen/Inter)
- Icons: [Font Awesome 4.7](https://fontawesome.com/v4.7/)

## 📁 Project Structure
project/
├── index.html # Main page (all interface)
├── style-2.css # External styles (linked in index.html)
├── main.js # Core logic: data loading, sorting, filtering, rendering
├── logo.png # Logo (replace with your own)
└── README.md # This file


## ⚙️ Installation & Usage

1. **Clone the repository** or download all files into a single folder.
2. Make sure `logo.png`, `texture.jpg` (if used) are present in the root.
3. Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
4. **Important**: `main.js` must contain the data logic. A minimal example:

```javascript
// main.js – example
const pokemonData = []; // array of Pokémon objects

function renderPokemon(list) {
  // render cards inside #result
}

// Form handlers (sort, filter) call renderPokemon with the filtered/sorted list
```
If you are using an external API (e.g., PokeAPI), adapt main.js to load data asynchronously.

## 🧪 Testing
No additional dependencies are required. Simply open index.html and interact with the controls.

## 📝 Notes
- The improved design is already embedded inside <style> in index.html (for easy demonstration). You can extract it into a separate CSS file if you prefer.
- Range sliders show their current values in real time.
- The Apply button triggers a re‑render with all active filters and sorting applied.
