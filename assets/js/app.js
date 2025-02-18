// API URL
let apiUrl = 'https://dummyjson.com/recipes';


let mainContainer = document.getElementById("recipes");
let paginationContainer = document.getElementById("pagination");
let searchInput = document.getElementById("startSearch");

let recipesData = '';

// Fetch API and data
let fetchApi = async () => {
    try {
        if (recipesData.length > 0) return recipesData;
        let response = await fetch(apiUrl);
        let fetchData = await response.json();
        recipesData = fetchData.recipes.slice(0, 30);
        return recipesData;
    } catch (error) {
        console.error('Error fetching API: ', error);
    }
};


//displaying recipes

let recipePerPage = 6;

let displayRecipes = (data, page ) => {
    mainContainer.innerHTML = "";

    let start = (page - 1) * recipePerPage;
    let end = start + recipePerPage;
    let recipesToShow = data.slice(start, end);

    // if (recipesToShow.length === 0) {
    //     mainContainer.innerHTML = `<h3>No recipes found</h3>`;
    //     return;
    // }

    recipesToShow.forEach(recipe => {
        let card = document.createElement("div");
        card.className = 'card';
        card.innerHTML = `
            <img src="${recipe.image}" class="card-img" alt="${recipe.name}">
             <div class="card-body">
               <div class="title-id">
                 <h4 id="title">${recipe.name}</h4>
                 <i class="fa-regular fa-heart" id="heart" onclick="wishlist(this)"></i> 
               </div>
               <div class="title-id">
                  <div id="price">${recipe.difficulty}</div>
                  <div id="id">  ${recipe.rating}  </div>    
              </div>
              <button onclick="viewDetails(${recipe.id})" type="button" class="btn btn-success view-recipe-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">
                 View full Details
              </button>
           </div>
        `;
        mainContainer.appendChild(card);
    });
};

//creating pages buttons

let currentPage = 1;

let pageCounter = (totalRecipes) => {
    paginationContainer.innerHTML = "";
    let totalPages = Math.ceil(totalRecipes / recipePerPage);

    for (let i = 1; i <= totalPages; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.disabled = i === currentPage;
        btn.className = 'pagination-btn';
        btn.addEventListener('click', () => {
            currentPage = i;
            updatePage();
        });
        paginationContainer.appendChild(btn);
    }
};



//filtering recipes and updating page

let updatePage = async () => {
    let recipes = await fetchApi();
    let searchValue = searchInput.value.toLowerCase();

    let filteredRecipes = searchValue
        ? recipes.filter(recipe => recipe.name.toLowerCase().includes(searchValue))
        : recipes;

    displayRecipes(filteredRecipes, currentPage);
    pageCounter(filteredRecipes.length);
};



//dynamic search filter

searchInput.addEventListener("input", () => {
    currentPage = 1; //Recipes that includes any value of searched value will be shown to page one
    updatePage();
});

updatePage();

// RECIPE DETAIL MODAL

const viewDetails = async (recipeId) =>{
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    const recipe = data?.recipes?.find(
      recipe => recipe.id === parseInt(recipeId)
    );
  
    document.getElementById("image").src = recipe.image
    document.getElementById("title-name").innerText = recipe.name

            //  ingredients 
            let ingredientsList = "";
            recipe.ingredients.forEach((ing) => 
              ingredientsList += `<li>${ing} </li>`
            );
            document.getElementById("ingredients").innerHTML = ingredientsList;
            
            //  ingredients 
            let instructionsList = "";
            recipe.instructions.forEach((ins) => 
              instructionsList += `<li>${ins} </li>`
            );
            document.getElementById("instruction").innerHTML = instructionsList;
  
  }
  
// 


//heart function
function wishlist(element){
  element.classList.toggle("active")
  element.classList.toggle("fa-solid")
  element.classList.toggle("fa-regular")

}
