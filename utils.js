// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;

for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}
// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}
let items = [];
let total = Number("0");

async function getPokemon(pokemonValue) {
  try {
    let pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonValue}`);
    return pokemonData;
  } catch (error) {
    console.error(error);
  }
  
}

async function callSnorlax() {
  /*
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/snorlax');
    console.log(response.data.weight);
  } catch (error) {
    console.error(error);
  }
  */
  try {
    const response = await axios.get('http://localhost:8000/snorlax');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
// Create a new list item when clicking on the "Add" button
async function newElement() {

  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var pokemonValue = inputValue;

  let pokemonData;
  var totalVar = document.getElementById("totalSpan");
  /*
  1. id DONE
  2. weight DONE
  3. all types
  4. height DONE
  5. base_experience DONE
  6. image (data.sprites.front_default) DONE
  */
  
  try {
    const response = await axios.get(`http://localhost:8000/${pokemonValue}`);
    //console.log(response.data.weight);
    pokemonData = response;
  } catch (error) {
    console.error(error);
  }

  var typeContent = "";
  let typeNames = []
  pokemonData.data.types.forEach((typeData) => {
    typeContent += typeData.type.name;
    typeContent += ", ";
    console.log(typeData.type.name)
    typeNames.push(typeData.type.name)
  })

  document.getElementById("idSpan").innerHTML = pokemonData.data.id;
  document.getElementById("weightSpan").innerHTML = pokemonData.data.weight;
  document.getElementById("typeSpan").innerHTML = typeContent;
  document.getElementById("heightSpan").innerHTML = pokemonData.data.height;
  document.getElementById("baseSpan").innerHTML = pokemonData.data.base_experience;
  document.getElementById("imgSpan").src = pokemonData.data.sprites.front_default;
  

}