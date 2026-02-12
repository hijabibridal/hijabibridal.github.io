import json
import re

# File Paths
OLD_FILE = 'src/data/bridal-productsOLD.json'
NEW_FILE = 'src/data/bridal-products.json'
OUTPUT_FILE = 'src/data/bridal-products-REBUILT.json'

def rebuild_descriptions():
    with open(OLD_FILE, 'r', encoding='utf-8') as f:
        old_data = json.load(f)
    with open(NEW_FILE, 'r', encoding='utf-8') as f:
        new_data = json.load(f)

    old_map = {p['slug']: p['description'] for p in old_data['products']}
    updated_count = 0

    for product in new_data['products']:
        slug = product['slug']
        
        if slug in old_map:
            old_desc = old_map[slug]
            
            # 1. CLEAN THE OLD DESCRIPTION
            # We remove any old link blocks (usually starting with <br /><br /><a)
            # to ensure we don't bring old unstyled links into the new file.
            clean_old_text = re.split(r'<br\s*/?><br\s*/?><a', old_desc)[0].strip()

            # 2. IDENTIFY THE LINKS IN THE NEW FILE
            # We grab the fresh links (and only the first set) from the new file.
            new_links = ""
            link_match = re.search(r'(<br\s*/?><br\s*/?><a href=.*)', product['description'], re.DOTALL)
            if link_match:
                # Deduplicate immediately: take only the first block if it's doubled
                link_content = link_match.group(1)
                if link_content.count('Shop this color collection') > 1:
                    parts = link_content.split('<br /><br /><a href=')
                    new_links = '<br /><br /><a href=' + parts[1]
                else:
                    new_links = link_content

            # 3. APPLY PINK STYLING TO THE "HOW TO WEAR" HEADER
            # We look for "How to wear" in the old text and wrap it in your specific CSS
            pink_h2 = '<h2 class="text-[#db2777] text-2xl font-bold mt-8 mb-4">'
            
            if "How to wear" in clean_old_text:
                # Replace "How to wear [Product Name]" with the styled H2 version
                # This ensures the product name is INSIDE the H2 tag as you requested
                pattern = r'How to wear\s*(.*?)(?:\n|\r|<br|$)'
                replacement = f'{pink_h2}How to wear \\1</h2>'
                clean_old_text = re.sub(pattern, replacement, clean_old_text)
            
            # 4. FINAL ASSEMBLY
            # We combine: [Restored Intro + Styled H2 + Restored How-to] + [New Links]
            product['description'] = f"{clean_old_text}{new_links}"
            
            # Final cleanup of any stray tags that might have snuck in
            product['description'] = product['description'].replace('</a></a>', '</a>')
            
            updated_count += 1

    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, indent=2, ensure_ascii=False)

    print(f"Success! {updated_count} products have been completely rebuilt.")
    print(f"New file created: {OUTPUT_FILE}")

if __name__ == "__main__":
    rebuild_descriptions()