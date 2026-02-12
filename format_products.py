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

        # 1. CLEANING: Remove any previous link attempts or auto-text
        # Splits description at the first sign of our auto-generated links
        clean_desc = re.split(r'Shop this color|View all|<br', product["description"])[0].strip()
        
        if not clean_desc.endswith('.'):
            clean_desc += "."

        # 2. CATEGORY LINK (Slug 1)
        cat_slug = slugs[0]
        # Custom logic for your Groom request
        cat_name = "Muslim Groom Outfit" if cat_slug == "muslim-groom-outfit" else cat_slug.replace('-', ' ').title()
        cat_link = f'<br /><a href="{base_url}{cat_slug}">View all {cat_name}</a>'

        # 3. COLOR LINK (Slug 2)
        color_link = ""
        if len(slugs) > 1:
            color_slug = slugs[1]
            # Added an extra <br /> to ensure it is on its own line
            color_link = f'<br /><br /><a href="{base_url}{color_slug}">Shop this color collection</a>'

        # 4. REBUILD DESCRIPTION
        # Order: [Description] [Line Break] [Color Link] [Line Break] [Category Link]
        product["description"] = f"{clean_desc}{color_link}{cat_link}"

    # Save the updated JSON
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully updated {len(data['products'])} products.")

# Point to your file path
file_path = os.path.join('src', 'data', 'bridal-products.json')
update_descriptions(file_path)