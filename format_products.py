import json
import re
import os

def clean_intro_sentences(file_path):
    if not os.path.exists(file_path):
        print(f"Error: Could not find {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Base URL for the footer links
    base_url = "https://hijabibridal.github.io/shop/category/"

    for product in data.get("products", []):
        desc = product.get("description", "")

        # 1. REMOVE "Order this..." sentence from the start
        # Matches "Order this" at the start (^) until it finds the amzn link and newline
        # The [ \t]* handles potential trailing spaces.
        desc = re.sub(r"^Order this.*?https://amzn\.to/\S+[ \t]*\n*", "", desc, flags=re.IGNORECASE | re.DOTALL).strip()

        # 2. ADD CATEGORY & COLOR LINKS (Separate Lines)
        slugs = product.get("mainCategorySlugs", [])
        if slugs:
            # Clean up existing auto-links to prevent duplicates
            desc = re.split(r'Shop this color|View all|<br', desc)[0].strip()
            if not desc.endswith('.'):
                desc += "."

            # Color Link (Slug 2)
            color_link = ""
            if len(slugs) > 1:
                color_link = f'<br /><br /><a href="{base_url}{slugs[1]}" class="text-[#db2777] font-bold hover:underline">Shop this color collection</a>'
            
            # Category Link (Slug 1)
            cat_name = "Muslim Groom Outfit" if slugs[0] == "muslim-groom-outfit" else slugs[0].replace('-', ' ').title()
            cat_link = f'<br /><a href="{base_url}{slugs[0]}" class="text-[#db2777] font-bold hover:underline">View all {cat_name}</a>'
            
            desc = f"{desc}{color_link}{cat_link}"

        product["description"] = desc

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print("Cleanup complete. 'Order this' intros removed and footer links added.")

# Execution
file_path = os.path.join('src', 'data', 'bridal-products.json')
clean_intro_sentences(file_path)