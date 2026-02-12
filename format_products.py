import json
import os
import re

# Define paths
OLD_FILE = 'src/data/bridal-productsOLD.json'
NEW_FILE = 'src/data/bridal-products.json'
OUTPUT_FILE = 'src/data/bridal-products-FIXED.json'

def restore_descriptions():
    # Load the data
    with open(OLD_FILE, 'r', encoding='utf-8') as f:
        old_data = json.load(f)
    with open(NEW_FILE, 'r', encoding='utf-8') as f:
        new_data = json.load(f)

    # Map slug -> description for quick lookup
    old_desc_map = {p['slug']: p['description'] for p in old_data['products']}
    
    updated_count = 0

    for product in new_data['products']:
        slug = product['slug']
        current_desc = product.get('description', '')

        # 1. Clean the current description to see if it's just links/whitespace
        # This removes all <a> tags and <br> tags to see if any real text remains
        text_only = re.sub(r'<a\b[^>]*>.*?</a>', '', current_desc)
        text_only = re.sub(r'<br\s*/?>', '', text_only).strip()

        # 2. If text_only is empty, it means the description is just links
        if not text_only and slug in old_desc_map:
            old_full_desc = old_desc_map[slug]
            
            # Extract ONLY the text portion from the old description 
            # (assuming the old file also had links at the end we want to avoid doubling)
            old_text_only = re.sub(r'<br\s*/?><br\s*/?><a\b.*', '', old_full_desc).strip()
            
            # 3. Combine old text with NEW link structure
            # We add the old text + two breaks + the existing new links
            product['description'] = f"{old_text_only}{current_desc}"
            updated_count += 1
            print(f"Restored text for: {product['name']}")

    # Save the result
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, indent=2, ensure_ascii=False)

    print(f"\nFinished! Updated {updated_count} products.")
    print(f"File saved to: {OUTPUT_FILE}")

if __name__ == "__main__":
    restore_descriptions()