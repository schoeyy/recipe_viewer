function generateTagFilters(recipes) {
    const tagContainer = document.getElementById('tag-filters');
    tagContainer.innerHTML = '';

    // Extract unique and sorted tags, then capitalize them properly
    const tags = [...new Set(recipes.flatMap(recipe => recipe.tags))]
        .map(capitalizeTag)
        .sort();

    const maxVisibleTags = 10;
    let isExpanded = false;

    const tagButtons = tags.map(tag => {
        const btn = document.createElement('button');
        btn.textContent = tag;
        btn.classList.add("tag-button");
        btn.addEventListener('click', () => toggleTag(tag, btn));
        return btn;
    });

    // Display only the first set of tags
    tagButtons.slice(0, maxVisibleTags).forEach(btn => tagContainer.appendChild(btn));

    // Show More / Show Less Button
    if (tags.length > maxVisibleTags) {
        const toggleButton = document.createElement('button');
        toggleButton.textContent = "Show More";
        toggleButton.classList.add("toggle-tags-button");

        toggleButton.addEventListener('click', () => {
            isExpanded = !isExpanded;
            tagContainer.innerHTML = ''; 

            // Show all or limited tags based on toggle state
            if (isExpanded) {
                tagButtons.forEach(btn => tagContainer.appendChild(btn));
                toggleButton.textContent = "Show Less";
            } else {
                tagButtons.slice(0, maxVisibleTags).forEach(btn => tagContainer.appendChild(btn));
                toggleButton.textContent = "Show More";
            }

            tagContainer.appendChild(toggleButton);
        });

        tagContainer.appendChild(toggleButton);
    }
}

function capitalizeTag(tag) {
    return tag
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());
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
        const filteredRecipes = recipes.filter(recipe => 
            recipe.tags.map(capitalizeTag).includes(activeTag)
        );
        displayRecipes(filteredRecipes);
    }
}
