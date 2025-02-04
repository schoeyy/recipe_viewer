let currentRecipe = null;
let isFrontImage = false; // Track which side is displayed
const imageElement = document.getElementById('recipe-image');
const modal = document.getElementById('recipe-modal');
const closeModalButton = document.getElementById('close-modal');

// Open Modal - Start by showing the back image (if available)
function openModal(recipe) {
    currentRecipe = recipe;
    isFrontImage = false; // Default to back first

    updateModal();
    modal.style.display = 'flex'; 

    // Close modal when clicking outside the image
    modal.addEventListener('click', function (event) {
        if (event.target === modal) closeModal();
    });
}

// Update the modal image, ensuring no 'undefined' errors
function updateModal() {
    if (!currentRecipe) return;

    let imageSrc = isFrontImage ? currentRecipe.front : currentRecipe.back; // Change rear → back

    // If back image is undefined, default to the front image
    if (!imageSrc) {
        console.warn(`Missing image for recipe: ${currentRecipe.name}. Defaulting to front.`);
        imageSrc = currentRecipe.front; // Use front image as fallback
        isFrontImage = true; // Switch to front if back is missing
    }

    imageElement.src = imageSrc;
    imageElement.alt = currentRecipe.name;
}

// Toggle between front and back images when clicked
imageElement.addEventListener('click', () => {
    if (currentRecipe) {
        isFrontImage = !isFrontImage;
        updateModal();
    }
});

// Close Modal
function closeModal() {
    modal.style.display = 'none';
}

// Ensure event listener is added once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    closeModalButton.addEventListener('click', closeModal);
    fetchRecipes(); // Fetch recipes on page load
});
