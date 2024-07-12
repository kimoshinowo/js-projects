// Search
function search() {
    var inputValue = document.getElementById("searchInput").value;
    if (inputValue.length != 0) {
        document.getElementById("popularRecipes").style.display ='none';
        var heading = document.getElementById("recipesLabel");
        recipesLabel.innerText = ("Showing recipes for '").concat(inputValue).concat("'");

        getSearchRecipes(inputValue);
    } else {
        alert("You can't search for nothing!"); 
    }
}

// Make sure search happens on 'Enter'
var input = document.getElementById("searchInput");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});


// Get recipes from API
async function getSearchRecipes(recipe) {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const searchUrl = url.concat(recipe);

    try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const recipesJson = await response.json();
        document.getElementById('searchRecipeGrid').innerHTML = '';

        for (let i = 0; i < recipesJson.meals.length; i++){
            var thumbnail = recipesJson.meals[i].strMealThumb;
            var meal = recipesJson.meals[i].strMeal;
            var mealId = recipesJson.meals[i].idMeal;
            var recipeHTML = document.createElement('li');
            recipeHTML.setAttribute("onclick", "toggleRecipeOverlay(" + mealId + ")");

            recipeHTML.innerHTML = `
                <h4 class="recipe-name">${meal}</h4>
                <img src="${thumbnail}" class="recipe-thumbnail">
            `;
            document.getElementById('searchRecipeGrid').append(recipeHTML);
        }
    } catch (error) {
        console.error(error.message);
        document.getElementById('searchRecipeGrid').innerHTML = "<p>Sorry, we couldn't find any recipes which match your search.</p>";
    }
}

getRandomRecipes();
// Get random recipes from A PI
async function getRandomRecipes() {
    const url = "https://www.themealdb.com/api/json/v1/1/random.php";
    document.getElementById('randomRecipeGrid').innerHTML = '';

    for (let i = 0; i < 3; i++) {
        try {
            const response = await fetch(url);
        
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
        
            const recipesJson = await response.json();
            var thumbnail = recipesJson.meals[0].strMealThumb;
            var meal = recipesJson.meals[0].strMeal;
            var mealId = recipesJson.meals[0].idMeal;
            var recipeHTML = document.createElement('li');
            recipeHTML.setAttribute("onclick", "toggleRecipeOverlay(" + mealId + ")");

            recipeHTML.innerHTML = `
                <h4 class="recipe-name">${meal}</h4>
                <div class="recipe-thumbnail">
                    <img src="${thumbnail}" class="recipe-thumbnail-asset">
                <div>
            `;
            document.getElementById('randomRecipeGrid').append(recipeHTML);
        } catch (error) {
            console.error(error.message);
            document.getElementById('randomRecipeGrid').innerHTML = "<p>Sorry, we can't find any recipes right now.</p>";
        }
    }
}

function toggleRecipeOverlay(mealId) {
    let overlayDiv = document.querySelector(".recipe-overlay");

    if (overlayDiv.style.display !=  'block') {
        overlayDiv.style.display = 'block';
        getRecipeInstructions(mealId);
    } else {
        overlayDiv.style.display = 'none';
    }
}

async function getRecipeInstructions(mealId){
    const url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    const searchUrl = url.concat(mealId);

    try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const recipesJson = await response.json();

        document.getElementById('recipeOverlay').innerHTML = '';

        var thumbnail = recipesJson.meals[0].strMealThumb;
        var meal = recipesJson.meals[0].strMeal;
        var mealId = recipesJson.meals[0].idMeal;
        var mealInstructions = recipesJson.meals[0].strInstructions;
        var recipeHTML = document.createElement('div');

        var ingredients = '';

        for (item in recipesJson.meals[0]) {
            if (item.substring(0,13) == 'strIngredient' && recipesJson.meals[0][item] && recipesJson.meals[0][item] !== "") {
                measure = item.replace('strIngredient', 'strMeasure');
                ingredients = ingredients.concat('<li class="recipe-ingredient">', recipesJson.meals[0][measure], ' ', recipesJson.meals[0][item], '</li>');
            }
        }

        // console.log(recipesJson.meals[0]);
        recipeHTML.innerHTML = `
            <span class="recipe-overlay-cross" onclick="toggleRecipeOverlay()">X</span>
            <h3 class="recipe-name-overlay">${meal}</h4>
            <img src="${thumbnail}" class="recipe-image">
            
            <div class="recipe-text">
                <h4>Ingredients:</h4>
                    <ul class="recipe-ingredients">
                        ${ingredients}
                    </ul>
            </div>
            <div class="recipe-text">
                <h4>Instructions:</h4>
                <p class="recipe-instructions">${mealInstructions}</p>
            </div>
        `;
        document.getElementById('recipeOverlay').append(recipeHTML);
    } catch (error) {
        console.error(error.message);
        document.getElementById('recipeOverlay').innerHTML = "<p>Sorry, we can't find the details of this recipe right now.</p>";
    }
}