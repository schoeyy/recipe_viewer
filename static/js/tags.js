function generateTagFilters(recipes) {
    const tagContainer = document.getElementById('tag-filters');
    tagContainer.innerHTML = '';

    const tags = new Set();
    recipes.forEach(recipe => recipe.tags.forEach(tag => tags.add(tag)));

    tags.forEach(tag => {
        const btn = document.createElement('button');
        btn.textContent = tag;
        btn.classList.add("tag-button");
        btn.addEventListener('click', () => toggleTag(tag, btn));
        tagContainer.appendChild(btn);
    });
}

function toggleTag(tag, btn) {
    document.querySelectorAll('#tag-filters button').forEach(button => {
        button.classList.remove("active");
    });

    if (activeTag === tag) {
        activeTag = null;
        displayRecipes(recipes);
    } else {
        activeTag = tag;
        btn.classList.add("active");
        filterRecipes();
    }
}

function filterRecipes() {
    if (!activeTag) {
        displayRecipes(recipes);
    } else {
        const filteredRecipes = recipes.filter(recipe => recipe.tags.includes(activeTag));
        displayRecipes(filteredRecipes);
    }
}
