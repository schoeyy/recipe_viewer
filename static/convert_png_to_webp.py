import os
import json
from PIL import Image

# Paths
BASE_DIR = "/home/abu/docker/recipe_viewer/static"
IMAGES_DIR = os.path.join(BASE_DIR, "images")
METADATA_PATH = os.path.join(BASE_DIR, "metadata.json")

# Load metadata
with open(METADATA_PATH, "r") as f:
    recipes = json.load(f)

# Convert PNGs to WEBP
for recipe_id, data in recipes.items():
    for key in ["front", "back"]:
        image_path = data.get(key, "")

        # Skip if no image or already a .webp
        if not image_path or image_path.endswith(".webp"):
            continue

        # Ensure it's a .png file
        if not image_path.endswith(".png"):
            print(f"Skipping {recipe_id}: {key} is not a PNG file.")
            continue

        old_image_path = os.path.join(IMAGES_DIR, os.path.basename(image_path))

        if not os.path.exists(old_image_path):
            print(f"Skipping {recipe_id}: {key} image not found")
            continue

        # Generate new .webp filename
        new_image_path = old_image_path.replace(".png", ".webp")
        new_image_url = image_path.replace(".png", ".webp")

        try:
            # Open and convert to WEBP
            with Image.open(old_image_path) as img:
                img.save(new_image_path, "WEBP", quality=80)  # Adjust quality if needed

            # Update metadata to point to the .webp version
            data[key] = new_image_url

            print(f"Converted {recipe_id} {key} to WEBP")

            # Optionally, delete the original PNG
            # os.remove(old_image_path)

        except Exception as e:
            print(f"Error converting {recipe_id} {key}: {e}")

# Save updated metadata
with open(METADATA_PATH, "w") as f:
    json.dump(recipes, f, indent=4)

print("Metadata updated with WEBP file paths.")
