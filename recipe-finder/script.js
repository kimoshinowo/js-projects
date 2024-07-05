// Search
function search() {
    var inputValue = document.getElementById("searchInput").value;
    if (inputValue.length != 0) {
        document.getElementById("popularRecipes").style.display ='none';
        var heading = document.getElementById("recipesLabel");
        recipesLabel.innerText = ("Showing recipes for '").concat(inputValue).concat("'");

        getRecipes(inputValue);
    } else {
        alert("You can't search for nothing!"); 
    }
}

// Get recipes from API
async function getRecipes(recipe) {
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    const searchUrl = url.concat(recipe);

    try {
        const response = await fetch(searchUrl);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
    } catch (error) {
        console.error(error.message);
    }
}