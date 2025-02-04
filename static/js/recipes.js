let recipes = [];
let activeTag = null;

async function fetchRecipes() {
    try {
        const response = await fetch('/api/recipes');
        recipes = Object.values(await response.json());
        generateTagFilters(recipes);
        displayRecipes(recipes);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}

function displayRecipes(recipes) {
    const container = document.getElementById('recipes');
    container.innerHTML = '';

    recipes.forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add("recipe-card"); 

        card.innerHTML = `
            <img src="" data-src="${recipe.thumbnail}" class="recipe-img lazy-load" loading="lazy">
            <h2 class="recipe-title">${recipe.name}</h2>
        `;

        card.addEventListener('click', () => openModal(recipe));
        container.appendChild(card);
    });

    lazyLoadImages();
}

function lazyLoadImages() {
    const images = document.querySelectorAll(".recipe-img");

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                observer.unobserve(img);
            }
        });
    }, { rootMargin: "100px 0px", threshold: 0.1 });

    images.forEach(img => observer.observe(img));
}
