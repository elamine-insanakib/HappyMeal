const inputIngredient = document.getElementById('ingredient');

inputIngredient.addEventListener('input', () => {
    // Récupération de la valeur saisie dans le champ de texte
    const nomIngredientRecherche = inputIngredient.value;
    // Appel de la fonction filtreRecette avec le nouvel ingrédient recherché
    filtreRecette(nomIngredientRecherche);
});

async function recupererDonneesJSON() {
    try {
        const response = await fetch("../data.json");
        const data = await response.json();
        return data.recettes; // Renvoie uniquement les recettes du fichier JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des données JSON :', error);
    }
}


async function afficherRecette() {
    const recettes = await recupererDonneesJSON();

    recettes.forEach((recette, index) => {
        // Création d'une nouvelle div pour chaque recette
        const recetteDiv = document.createElement("div");

        // Ajout du nom de la recette à la div
        const nomRecette = document.createElement("h2");
        nomRecette.textContent = recette.nom;
        recetteDiv.appendChild(nomRecette);

        // Ajout de la catégorie de la recette à la div
        const categorieRecette = document.createElement("p");
        categorieRecette.textContent = "Catégorie : " + recette.categorie;
        recetteDiv.appendChild(categorieRecette);

        // Ajout du temps de préparation de la recette à la div
        const tempsPreparation = document.createElement("p");
        tempsPreparation.textContent = "Temps de préparation : " + recette.temps_preparation;
        recetteDiv.appendChild(tempsPreparation);

        recetteDiv.setAttribute("id", index);

        // Ajout de la div de recette au conteneur principal (par exemple, une div avec l'ID "recettesContainer")
        document.getElementById("recettesContainer").appendChild(recetteDiv);
    });
}


async function filtreRecette(nomIngredientRecherche) {
    const recettes = await recupererDonneesJSON();

    recettes.forEach((recette, index) => {
        let displayStyle = "none"; // Par défaut, on cache la recette
        recette.ingredients.forEach(ingredient => {
            if (ingredient.nom && ingredient.nom.toLowerCase().includes(nomIngredientRecherche.toLowerCase())) {
                displayStyle = "block"; // Si l'ingrédient est trouvé et a un nom, on affiche la recette
            }
        });
        // Modifier le style de l'élément avec l'ID correspondant
        document.getElementById(index).style.display = displayStyle;
    });
}




afficherRecette()