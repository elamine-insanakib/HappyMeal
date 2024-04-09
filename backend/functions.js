const inputIngredient = document.getElementById('ingredient');
let favoris = [];
chargerFavoris();

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

        //Ajout de l'image etoile vide
        imageEtoile = document.createElement("img")
        imageEtoile.src = favoris.includes(index.toString()) ? "../assets/image/star.fill.png" : "../assets/image/star.empty.png";        imageEtoile.width = 20;
        imageEtoile.height = 20;
        recetteDiv.appendChild(imageEtoile)
        recetteDiv.setAttribute("id", index);

        // console.log(favoris)
        // // Vérifier si la recette est dans les favoris
        // if (favoris.includes(index.toString()))  {
        //     console.log('trouvé');
        //     imageEtoile.src = "../assets/image/star.fill.png"
        // }

        imageEtoile.addEventListener("click", function() {
            ajouterFavoris(this); // Passer l'élément img en tant que paramètre
        });
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


//Fonctions de favoris
function sauvegarderFavoris() {
    localStorage.setItem('favoris', JSON.stringify(favoris));
}

function chargerFavoris() {
    const favorisString = localStorage.getItem('favoris');
    if (favorisString) {
        favoris = JSON.parse(favorisString);
    }
}

function ajouterFavoris(imageEtoile) {

    // Récupérer l'élément div parent de l'image étoile, qui contient les informations de la recette
    const recetteDiv = imageEtoile.parentNode;
    const recetteIndex = recetteDiv.id;
    console.log(recetteDiv)
    console.log(recetteIndex)

    // Vérifier si la recette est déjà dans les favoris
    const indexDansFavoris = favoris.indexOf(recetteIndex);

    // Si la recette n'est pas dans les favoris, l'ajouter
    if (indexDansFavoris === -1) {
        favoris.push(recetteIndex);
        imageEtoile.src = "../assets/image/star.fill.png"; // changer l'image pour étoile remplie
        imageEtoile.classList.add("favoris"); // ajouter la classe "favoris" à l'image
        console.log("push")
        console.log(favoris)
        sauvegarderFavoris()
    } else { // Si la recette est déjà dans les favoris, la retirer
        favoris.splice(indexDansFavoris, 1);
        imageEtoile.src = "../assets/image/star.empty.png"; // changer l'image pour étoile vide
        imageEtoile.classList.remove("favoris"); // retirer la classe "favoris" de l'image
        console.log("remove")
        sauvegarderFavoris()
    }

    // Appel de la fonction pour sauvegarder les favoris dans le localStorage
    sauvegarderFavoris();
}






afficherRecette()