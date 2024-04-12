
let listeIngredients = [];

function chargerListeIngredients () {
    const listeIngredientsString = localStorage.getItem('listeIngredients');

    if (listeIngredientsString) {
        listeIngredients = JSON.parse(listeIngredientsString);
    }

    return listeIngredients;

}

chargerListeIngredients()


 listeIngredients.forEach(ingredient => {

const divIngredient = document.getElementById("panierContainer")

    liIngredient = document.createElement("li");
    liIngredient.classList.add("flex", "font-lg", "text-4xl");
    liIngredient.textContent = ingredient;
    divIngredient.appendChild(liIngredient);
    
 });