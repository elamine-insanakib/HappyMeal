let listeIngredient = [];

// Retrieve from local storage
const storedIngredients = localStorage.getItem('listeIngredients');

// Check if there are stored ingredients
if (storedIngredients) {
    // Parse the stored string into an array
    listeIngredient = JSON.parse(storedIngredients);
}

listeIngredient.forEach(ingredient => {
    console.log(ingredient);
    liIngredient = document.createElement('li');
    liIngredient.textContent = ingredient;

    ulContainer = document.getElementById('ulPanierContainer')
    ulContainer.appendChild(liIngredient);

    liIngredient.addEventListener("click", () => removeItem(ingredient));
  
});

function removeItem(ingredientToRemove) {
    const index = listeIngredient.indexOf(ingredientToRemove);
    if (index !== -1) {
        listeIngredient.splice(index, 1);
        // Update the local storage
        localStorage.setItem('listeIngredients', JSON.stringify(listeIngredient));
        // Remove the list item from the DOM
    }
}