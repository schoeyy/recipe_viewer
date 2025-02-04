import os
import json
from PIL import Image

BASE_DIR = "/home/abu/docker/recipe_viewer/static"
IMAGES_DIR = os.path.join(BASE_DIR, "images")
METADATA_PATH = os.path.join(BASE_DIR, "metadata.json")
THUMBNAIL_SIZE = (300, 300)

with open(METADATA_PATH, "r") as f:
    recipes = json.load(f)

for recipe_id, data in recipes.items():
    front_image_path = os.path.join(IMAGES_DIR, os.path.basename(data["front"]))
    
    if not os.path.exists(front_image_path):
        print(f"Skipping {recipe_id}: Front image not found")
        continue

    # Generate thumbnail path
    thumbnail_filename = f"recipe_{recipe_id}_thumb.webp"
    thumbnail_path = os.path.join(IMAGES_DIR, thumbnail_filename)

    # Open image and create a thumbnail
    try:
        with Image.open(front_image_path) as img:
            img.thumbnail(THUMBNAIL_SIZE)
            img.save(thumbnail_path, "WEBP", quality=80)  # Adjust quality if needed

        # Update metadata
        data["thumbnail"] = f"/images/{thumbnail_filename}"
        print(f"Created thumbnail for {recipe_id}")

    except Exception as e:
        print(f"Error processing {recipe_id}: {e}")

# Save updated metadata
with open(METADATA_PATH, "w") as f:
    json.dump(recipes, f, indent=4)

print("Metadata updated with thumbnails.")
