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

// Array of Chef's Tricks & Tips
const chefsTips = [
    {
        title: "Perfectly Cooked Steak",
        text: "Let your steak rest after cooking to keep it juicy and flavorful.",
        img: "https://freedesignfile.com/upload/2018/07/Cartoon-cooking-chef-vector.jpg"
    },
    {
        title: "Fresh Herbs Trick",
        text: "Store herbs in a glass of water to keep them fresh longer.",
        img: "https://i.pinimg.com/736x/65/f2/f4/65f2f46b091b61362d8bc472bc82cccb.jpg"
    },
    {
        title: "Boost Flavor with Spices",
        text: "Toast your spices before using them for a richer taste.",
        img: "https://i.pinimg.com/736x/75/b5/6b/75b56b4612d3591ed1d865f4221cc7de.jpg"
    },
    {
        title: "Crispy French Fries",
        text: "Soak cut potatoes in cold water before frying to get crispy fries.",
        img: "https://i.pinimg.com/736x/d0/b2/51/d0b25196d4fdd14b4c36b764daf25c2c.jpg"
    },
    {
        title: "Keep Avocados Fresh",
        text: "Store cut avocados with onions to prevent browning.",
        img: "https://i.pinimg.com/736x/79/25/d0/7925d07f79d11e0ec080e7f3e4f932b8.jpg"
    },
    {
        title: "Perfectly Boiled Eggs",
        text: "Add a pinch of salt to the water to make peeling boiled eggs easier.",
        img: "https://i.pinimg.com/736x/5d/87/59/5d8759010fbf2519eca9d311fe0edc47.jpg"
    },
    {
        title: "Fluffy Pancakes",
        text: "Let the batter rest for 10 minutes before cooking for fluffier pancakes.",
        img: "https://i.pinimg.com/736x/d0/ea/f5/d0eaf57a13ce78c057baa91a96210ffa.jpg"
    }
];

// Function to Display 3 Random Tips
function displayRandomTips() {
    const container = document.getElementById("chefsTipsContainer");
    container.innerHTML = ""; // Clear existing tips

    // Shuffle and pick 3 random tips
    const shuffledTips = chefsTips.sort(() => 0.5 - Math.random()).slice(0, 3);
console.log(shuffledTips)
    shuffledTips.forEach(tip => {
        const tipCard = document.createElement("div");
        tipCard.classList.add("chefs-tip-card");
        tipCard.innerHTML = `
            <img src="${tip.img}" alt="Chef Tip">
            <div class="chefs-tip-content">
                <h3>${tip.title}</h3>
                <p>${tip.text}</p>
            </div>
        `;
        container.appendChild(tipCard);
    });
}

// Run the function on page load
window.onload = displayRandomTips;
