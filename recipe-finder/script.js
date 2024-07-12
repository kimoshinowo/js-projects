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
            var recipeHTML = document.createElement('li');
            recipeHTML.setAttribute("onclick", "toggleRecipeOverlay()");

            console.log(recipeHTML);
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
            console.log(recipesJson);
            var thumbnail = recipesJson.meals[0].strMealThumb;
            var meal = recipesJson.meals[0].strMeal;
            var recipeHTML = document.createElement('li');
            recipeHTML.setAttribute("onclick", "toggleRecipeOverlay()");

            console.log(recipeHTML);
            recipeHTML.innerHTML = `
                <h4 class="recipe-name">${meal}</h4>
                <img src="${thumbnail}" class="recipe-thumbnail">
            `;
            document.getElementById('randomRecipeGrid').append(recipeHTML);
        } catch (error) {
            console.error(error.message);
            document.getElementById('randomRecipeGrid').innerHTML = "<p>Sorry, we can't find any recipes right now.</p>";
        }
    }
}

function toggleRecipeOverlay() {
    let overlayDiv = document.querySelector(".recipe-overlay");
    console.log(overlayDiv.style.display);
    if (overlayDiv.style.display !=  'block') {
        overlayDiv.style.display = 'block';
    } else {
        overlayDiv.style.display = 'none';
    }
}
