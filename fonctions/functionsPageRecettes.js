const inputIngredient = document.getElementById('ingredient');
let favoris = [];
chargerFavoris();
let listeIngredients = [];

async function init() {
    afficherRecette(); // Passer les nombres aléatoires à la fonction afficherRecette
}

init();

async function recupererDonneesJSON() {
    try {
        const response = await fetch("../data.json");
        const data = await response.json();
        return data.recettes; // Renvoie uniquement les recettes du fichier JSON
    } catch (error) {
        console.error('Erreur lors de la récupération des données JSON :', error);
    }
}

// Définir la fonction genererNombreAleatoire en dehors de la fonction afficherRecette
function genererNombreAleatoire(taille) {
    // Générer un nombre aléatoire entre 0 (inclus) et la taille (exclus)
    return Math.floor(Math.random() * taille);
}


async function afficherRecette() {

    const recettes = await recupererDonneesJSON();

    recettes.forEach((recette, index) => {

      const recetteDiv = document.createElement("li");
      recetteDiv.classList.add("flex", "flex-col", "md:max-2xl:flex-row", "md:max-2xl:items-center", "justifty-between", "space-y-4", );

      const textdiv = document.createElement("div");
      textdiv.classList.add("flex", "flex-row", "items-center", "space-x-5", "bordere");
      recetteDiv.appendChild(textdiv);


      const puce = document.createElement("h2");
      puce.textContent = "•";
      textdiv.appendChild(puce);
      puce.classList.add("font-h1", "font-black", "text-4xl", "md:max-2xl:text-6xl");

      const nomRecette = document.createElement("h2");
      nomRecette.textContent = recette.nom;
      textdiv.appendChild(nomRecette);
      nomRecette.classList.add("font-h1", "font-black", "text-4xl", "md:max-2xl:text-6xl");

      const imageEtoile = document.createElement("img");
      imageEtoile.src = favoris.includes(index.toString()) ? "../assets/image/star.fill.png" : "../assets/image/star.empty.png";        

      recetteDiv.appendChild(imageEtoile);
      imageEtoile.classList.add("cursor-pointer", "w-8", "md:max-2xl:w-12", "ml-auto", "mr-" );
      recetteDiv.setAttribute("id", index);
      imageEtoile.addEventListener("click", function()  
            {
                ajouterFavoris(this);
            });

            const etapeSection = document.createElement("section");
            etapeSection.classList.add("px-8", "md:max-2xl:px-20", "mt-9", "hidden")

            const titreEtape = document.createElement("h2");
            titreEtape.textContent = "Etapes :";
            etapeSection.appendChild(titreEtape);
            etapeSection.classList.add("font-h1", "font-extrabold", "font-lg", "md:max-2xl:text-6xl");

            const ulEtape = document.createElement("ul");
            etapeSection.appendChild(ulEtape);
            ulEtape.classList.add("space-y-4", "md:max-2xl:space-y-16", "mt-8");

            recette.etapes.forEach((etape) => {
                const liEtape = document.createElement("li");
                liEtape.textContent = etape;
                ulEtape.appendChild(liEtape);
                liEtape.classList.add("flex", "flex-row", "space-x-5", "font-lg", "md:max-2xl:text-4xl");
            });

            const ingredientSection = document.createElement("section");
            ingredientSection.classList.add("px-8", "md:max-2xl:px-20", "mt-9", "hidden");

            const titreIngredient = document.createElement("h2");
            titreIngredient.textContent = "Ingrédients :";
            ingredientSection.appendChild(titreIngredient);
            ingredientSection.classList.add("font-h1", "font-extrabold", "font-lg", "md:max-2xl:text-6xl");

            const ulIngredient = document.createElement("ul");
            ingredientSection.appendChild(ulIngredient);
            ulIngredient.classList.add("space-y-4", "md:max-2xl:space-y-16", "mt-8");

            recette.ingredients.forEach((ingredient) => {
                const liIngredient = document.createElement("li");
                liIngredient.textContent = ingredient.nom + " " +ingredient.quantite;
                ulIngredient.appendChild(liIngredient);
                liIngredient.classList.add("flex", "flex-row", "space-x-5", "font-lg", "md:max-2xl:text-4xl");

                const buttonAdd = document.createElement("button");
                buttonAdd.textContent = "add"
                ulIngredient.appendChild(buttonAdd)

                buttonAdd.addEventListener("click", function()  
                {
                    ajouterIngredient(ingredient.nom);
                });
            });


            recetteDiv.addEventListener("click", function() {
                if (etapeSection.classList.contains("hidden")) {
                    etapeSection.classList.remove("hidden");
                    ingredientSection.classList.remove("hidden");
                    containerEtapes.classList.remove("hidden");
                }
            });
            
            etapeSection.addEventListener("click", function(){
                etapeSection.classList.add("hidden");
                ingredientSection.classList.add("hidden");
            });

            ingredientSection.addEventListener("click", function(){
                etapeSection.classList.add("hidden");
                ingredientSection.classList.add("hidden");
            });
            
            //Ajouter chaques recettes sur le container lu
            document.getElementById("recettesContainerLu").appendChild(recetteDiv);
                        // Ajouter la section des ingrédients au conteneur containerEtapes après la section des étapes
            document.getElementById("containerEtapes").appendChild(ingredientSection);
            // Ajouter la section des étapes au conteneur containerEtapes
            document.getElementById("containerEtapes").appendChild(etapeSection);

            

            

        });

    const nombreAleatoire = genererNombreAleatoire(recettes.length);
    const recetteAleatoire = recettes[nombreAleatoire];

    document.getElementById("recipe").textContent = recetteAleatoire.nom
}

inputIngredient.addEventListener('input', () => {
    // Récupération de la valeur saisie dans le champ de texte
    const nomIngredientRecherche = inputIngredient.value;
    // Appel de la fonction filtreRecette avec le nouvel ingrédient recherché
    filtreRecette(nomIngredientRecherche);
});

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

function chargerListeIngredients () {
    const listeIngredientsString = localStorage.getItem('listeIngredients');

    if (listeIngredientsString) {
        listeIngredients = JSON.parse(listeIngredientsString);
    }

}

function ajouterIngredient(ingredient) {
    if (!listeIngredients.includes(ingredient)){
        listeIngredients.push(ingredient);
    };
    console.log(listeIngredients);
    localStorage.setItem('listeIngredients', JSON.stringify(listeIngredients));

}

function ajouterFavoris(imageEtoile) {

    // Récupérer l'élément div parent de l'image étoile, qui contient les informations de la recette
    const recetteDiv = imageEtoile.parentNode;
    const recetteIndex = recetteDiv.id;

    // Vérifier si la recette est déjà dans les favoris
    const indexDansFavoris = favoris.indexOf(recetteIndex);

    // Si la recette n'est pas dans les favoris, l'ajouter
    if (indexDansFavoris === -1) {
        favoris.push(recetteIndex);
        imageEtoile.src = "../assets/image/star.fill.png"; // changer l'image pour étoile remplie
        imageEtoile.classList.add("favoris"); // ajouter la classe "favoris" à l'image
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

chargerListeIngredients()

console.log(listeIngredients)