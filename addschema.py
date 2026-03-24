import json
import os
import re

# CONFIGURATION
INPUT_FILE = 'src/data/bridal-products.json'
OUTPUT_FILE = 'src/data/bridal-products-preview.json'
IMAGE_BASE_DIR = 'public/images/' 
SITE_URL = "https://hijabibridal.github.io"

def find_images_flexible(product_name, slug, base_dir):
    """
    Finds .webp images using slug OR keywords from the product name.
    """
    matches = set()
    if not os.path.exists(base_dir):
        return []

    # Create a regex pattern from the product name keywords (min 3 chars)
    keywords = [re.escape(w.lower()) for w in product_name.split() if len(w) > 2]
    keyword_pattern = "|".join(keywords)

    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.lower().endswith('.webp'):
                file_lower = file.lower()
                
                # Priority 1: Match by Slug
                if slug and slug.lower() in file_lower:
                    rel_path = os.path.relpath(os.path.join(root, file), base_dir)
                    matches.add(rel_path.replace("\\", "/"))
                    continue
                
                # Priority 2: Match by significant keywords from the name
                if keyword_pattern and re.search(keyword_pattern, file_lower):
                    rel_path = os.path.relpath(os.path.join(root, file), base_dir)
                    matches.add(rel_path.replace("\\", "/"))

    return sorted(list(matches))

def enhance_json():
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        full_data = json.loads(f.read())

    for product in full_data.get("products", []):
        name = product.get("name", "")
        slug = product.get("slug", "")
        
        # Capture ALL found .webp images
        found_paths = find_images_flexible(name, slug, IMAGE_BASE_DIR)
        
        if found_paths:
            # Maintain existing metadata template
            template = product.get("images", [{}])[0]
            base_link = template.get("amazonLink", "")
            base_fig = template.get("figcaption", "")

            product["images"] = [
                {
                    "url": path,
                    "alt": f"{name} - Perspective {i+1}",
                    "figcaption": base_fig,
                    "amazonLink": base_link
                } for i, path in enumerate(found_paths)
            ]
            
            # Update the main og_image to the first match found
            product["og_image"] = found_paths[0]

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(full_data, f, indent=2, ensure_ascii=False)

    print(f"Sync complete. Processed {len(full_data['products'])} products into {OUTPUT_FILE}")

if __name__ == "__main__":
    enhance_json()