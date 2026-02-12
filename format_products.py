import json
import re
import os

def update_descriptions(file_path):
    if not os.path.exists(file_path):
        print(f"Error: Could not find file at {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    base_url = "https://hijabibridal.github.io/shop/category/"

    for product in data.get("products", []):
        slugs = product.get("mainCategorySlugs", [])
        if not slugs:
            continue

        # 1. Clean existing auto-generated links to avoid doubling up if you run this twice
        # This regex removes everything from the first occurrence of "Shop this color" or "View all"
        clean_desc = re.split(r'Shop this color|View all', product["description"])[0].strip()
        
        # Ensure the original description still ends with a period
        if not clean_desc.endswith('.'):
            clean_desc += "."

        # 2. Logic for Slug 1 (Category - "View all")
        cat_slug = slugs[0]
        # Custom check for the groom outfit to match your request
        if cat_slug == "muslim-groom-outfit":
            cat_name = "Muslim Groom Outfit"
        else:
            cat_name = cat_slug.replace('-', ' ').title()
            
        cat_link = f'<br /><a href="{base_url}{cat_slug}">View all {cat_name}</a>'

        # 3. Logic for Slug 2 (Color - "Shop this color")
        color_link = ""
        if len(slugs) > 1:
            color_slug = slugs[1]
            color_link = f'<br /><a href="{base_url}{color_slug}">Shop this color collection</a>'

        # 4. Update the description field
        product["description"] = f"{clean_desc}{color_link}{cat_link}"

    # Save the updated JSON back to src/data
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully updated {len(data['products'])} products in {file_path}")

# Pointing to your specific path
file_path = os.path.join('src', 'data', 'bridal-products.json')
update_descriptions(file_path)