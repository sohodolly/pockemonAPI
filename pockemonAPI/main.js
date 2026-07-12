let pokemons;
let sortedPokemons;
let promises = [];
let order = 1;
const resultElement = document.getElementById('result');
let sortForm = document.getElementById('sort-form');
const kantoPokemonRequest = new XMLHttpRequest();
kantoPokemonRequest.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=127');
kantoPokemonRequest.responseType = 'json';
kantoPokemonRequest.send();
kantoPokemonRequest.onload = function () {
  kantoPokemonRequest.response.results.forEach(pokemon => {
    let promise = new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', pokemon.url);
      xhr.responseType = 'json';
      xhr.send();
      xhr.onload = function () {
        if (xhr.status == 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      }
      xhr.onerror = function () {
        reject(xhr.statusText);
      }
    });
    promises.push(promise);
  });
  Promise.all(promises).then(function (results) {
    console.log(results);
    pokemons = results;
    sortedPokemons = pokemons.sort();
    sortedPokemons.forEach(function (pokemon) {
      drawPokemon(pokemon);
    });
  });
}
function drawPokemon(pokemon) {
  let pokemonElement = document.createElement('div');
  pokemonElement.classList.add('pokemon');
  pokemonElement.innerHTML = ` 
  <p>id: #${pokemon.id}</p> 
  <hr> 
  <h1>${pokemon.name}</h1> 
  <img src="${pokemon.sprites.front_default}"> 
  <div class="stats"> 
   <p class="hp">&#10084; ${pokemon.stats[0].base_stat}</p> 
   <p class="attack">&#128074; ${pokemon.stats[1].base_stat}</p> 
   <p class="defence">&#9960; ${pokemon.stats[2].base_stat}</p> 
  </div> 
 `
  resultElement.appendChild(pokemonElement);
}

sortForm.addEventListener('change', function (event) {
  if (event.target.name == "order") {
    switch (event.target.value) {
      case 'upsc':
        order = 1;
        break;
      case 'desc':
        order = -1;
        break;
    }
  }
  switch (sortForm['sort'].value) {
    case 'id':
      sortedPokemons = sortedPokemons.sort(function (first, second) {
        if (first.id > second.id) return order;
        if (first.id < second.id) return -order;
        return 0;
      });
      break;
    case 'name':
      sortedPokemons = sortedPokemons.sort(function (first, second) {
        if (first.name > second.name) return order;
        if (first.name < second.name) return -order;
        return 0;
      });
      break;
    case 'hp':
      sortedPokemons = sortedPokemons.sort(function (first, second) {
        if (first.stats[0].base_stat > second.stats[0].base_stat) return order;
        if (first.stats[0].base_stat < second.stats[0].base_stat) return -order;
        return 0;
      });
      break;
    case 'attack':
      sortedPokemons = sortedPokemons.sort(function (first, second) {
        if (first.stats[1].base_stat > second.stats[1].base_stat) return order;
        if (first.stats[1].base_stat < second.stats[1].base_stat) return -order;
        return 0;
      });
      break;
    case 'defence':
      sortedPokemons = sortedPokemons.sort(function (first, second) {
        if (first.stats[2].base_stat > second.stats[2].base_stat) return order;
        if (first.stats[2].base_stat < second.stats[2].base_stat) return -order;
        return 0;
      });
      break;
  }

  reDrawSortedPokemons();
});

function reDrawSortedPokemons() {
  resultElement.innerHTML = null;
  sortedPokemons.forEach(pokemon => drawPokemon(pokemon));
}

document.getElementById('filter-form').addEventListener('submit', function (event) {
  sortedPokemons = pokemons;
  event.preventDefault();
  if (event.target['name-filter'].value) {
    sortedPokemons = sortedPokemons.filter(function (pokemon) {
      return pokemon.name.indexOf(event.target['name-filter'].value.toLowerCase()) != -1;
    });
  }


  if (event.target['hp-filter-from'].value > 10) {
    sortedPokemons = sortedPokemons.filter(function (pokemon) {
      return pokemon.stats[0].base_stat >= event.target['hp-filter-from'].value;
    });
  }
  if (event.target['hp-filter-to'].value < 250) {
    sortedPokemons = sortedPokemons.filter(function (pokemon) {
      return pokemon.stats[0].base_stat <= event.target['hp-filter-to'].value;
    });
  }


  if (event.target['attack-filter-from'].value > 5) {
    sortedPokemons = sortedPokemons.filter(function (pokemon) {
      return pokemon.stats[1].base_stat >= event.target['attack-filter-from'].value;
    });
  }
  if (event.target['attack-filter-to'].value < 130) {
    sortedPokemons = sortedPokemons.filter(function (pokemon) {
      return pokemon.stats[1].base_stat <= event.target['attack-filter-to'].value;
    });
  }


  if (event.target['defence-filter-from'].value > 5) {
    sortedPokemons = sortedPokemons.filter(function (pokemon) {
      return pokemon.stats[2].base_stat >= event.target['defence-filter-from'].value;
    });
  }
  if (event.target['defence-filter-to'].value < 180) {
    sortedPokemons = sortedPokemons.filter(function (pokemon) {
      return pokemon.stats[2].base_stat <= event.target['defence-filter-to'].value;
    });
  }

  reDrawSortedPokemons();
});





/*const startUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'; 
const resultElement = document.getElementById('result'); 
const prevBtnElement = document.getElementById('prev'); 
const nextBtnElement = document.getElementById('next'); 
const nav = document.getElementById('nav'); 
let state; 
 
let xhr = new XMLHttpRequest(); 
 
pokemonListRequest(startUrl); 
 
function pokemonListRequest(startUrl){ 
 xhr.open('GET', startUrl); 
 xhr.responseType = 'json'; 
 xhr.send(); 
 xhr.onload = function(){ 
  state = xhr.response; 
  drawList(); 
  setButtonsState(); 
 } 
} 
function drawList(){ 
 let pokemonsElement = document.createElement('ul'); 
 pokemonsElement.classList.add('pokemon-list'); 
 state.results.forEach(pokemon => { 
  pokemonsElement.innerHTML += ` 
   <li onclick="pokemonRequest('${pokemon.url}')">${pokemon.name}</li> 
  ` 
 }); 
 resultElement.innerHTML = null; 
 resultElement.appendChild(pokemonsElement); 
 showButtons(); 
} 
function pokemonRequest(url){ 
 let xhr = new XMLHttpRequest(); 
 xhr.open('GET', url); 
 xhr.responseType = 'json'; 
 xhr.send(); 
 xhr.onload = function(){ 
  if(xhr.status > 300){ 
   resultElement.innerHTML = ` 
    <button class="btn" onclick="drawList()">Go Back</button> 
    <div class="pokemon">There is no such pokemon!</div> 
   ` 
  }else{ 
   drawPokemon(xhr.response); 
  } 
 } 
} 
function drawPokemon(pokemon){ 
 hideButtons(); 
 resultElement.innerHTML = ''; 
 let pokemonElement = document.createElement('div'); 
 pokemonElement.classList.add('pokemon'); 
 pokemonElement.innerHTML = ` 
  <button class="btn" onclick="drawList()">Go Back</button> 
  <p>id: #${pokemon.id}</p> 
  <hr> 
  <h1>${pokemon.name}</h1> 
  <img src="${pokemon.sprites.front_default}"> 
 ` 
 resultElement.appendChild(pokemonElement); 
} 
function prev(){ 
 pokemonListRequest(state.previous); 
} 
function next(){ 
 pokemonListRequest(state.next); 
} 
function setButtonsState(){ 
 if(state.previous){ 
  prevBtnElement.disabled = false; 
 }else{ 
  prevBtnElement.disabled = true; 
 } 
 if(state.next){ 
  nextBtnElement.disabled = false; 
 }else{ 
  nextBtnElement.disabled = true; 
 } 
} 
function hideButtons(){ 
 nav.style = 'display: none;'; 
} 
function showButtons(){ 
 nav.style = 'display: flex;'; 
}*/