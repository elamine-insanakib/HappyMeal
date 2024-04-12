let listeIngredient = [];


// Retrieve from local storage
const storedIngredients = localStorage.getItem('listeIngredients');



// Check if there are stored ingredients
if (storedIngredients) {
    // Parse the stored string into an array
    listeIngredient = JSON.parse(storedIngredients);
}

function afficherIngredient () {

    if (listeIngredient.length>0){

        listeIngredient.forEach(ingredient => {

            // const puce = document.createElement("h2");
            // puce.textContent = "•";
            // puce.classList.add("font-h1", "font-black", "text-4xl", "md:max-2xl:text-6xl");
            // liIngredient.appendChild(puce);
    
            divIngredient = document.createElement('div');
            divIngredient.classList.add("flex", "justify-between")
    
    
            console.log(ingredient);
            liIngredient = document.createElement('li');
            liIngredient.textContent = ingredient;
            liIngredient.classList.add("font-h1", "font-extrabold", "font-md", "md:max-2xl:text-6xl");
    
    
        
            ulContainer = document.getElementById('ulPanierContainer')
            ulContainer.classList.add("flex","flex-col", "font-lg");
    
    
            removeButton = document.createElement('button');
            removeButton.textContent = "X";
            removeButton.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-0", "px-6", "rounded", "m-2", "focus:m-3");
            //class="      rounded">
    
    
        
            removeButton.addEventListener("click", () => removeItem(ingredient));
    
            divIngredient.appendChild(liIngredient);
            divIngredient.appendChild(removeButton);
            ulContainer.appendChild(divIngredient);
    
    
          
        });
        } else {
           noItems = document.createElement("h1");
           noItems.textContent = "Le panier est vide";

           panierContainer = document.getElementById('panierContainer');
           panierContainer.appendChild(noItems);
           noItems.classList.add("font-h1", "font-extrabold", "font-md", "md:max-2xl:text-4xl");

        }


}

afficherIngredient()



function removeItem(ingredientToRemove) {
    const index = listeIngredient.indexOf(ingredientToRemove);

    if (index !== -1) {
        listeIngredient.splice(index, 1);
        // Update the local storage
        localStorage.setItem('listeIngredients', JSON.stringify(listeIngredient));
    }
    window.location.reload();
}


