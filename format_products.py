import pandas as pd
import json
import re
import os

def generate_preview_json(csv_path, json_path, output_path):
    if not os.path.exists(csv_path):
        print(f"Error: {csv_path} not found.")
        return
    if not os.path.exists(json_path):
        print(f"Error: {json_path} not found.")
        return

    # Load data
    df = pd.read_csv(csv_path)
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    base_url = "https://hijabibridal.github.io/shop/category/"

    for product in data.get("products", []):
        product_name = product.get("name", "")
        slug = product.get("slug")
        row = df[df['url_slug'] == slug]
        
        amazon_color_sentence = ""
        
        # 1. CONDITION: Only process color if NOT a Lehenga
        if "lehenga" not in product_name.lower():
            if not row.empty:
                # Look specifically in Column P
                col_p_text = str(row.iloc[0].get('New Rewritten Description', ''))
                
                # Regex to find the specific color name mentioned after "on Amazon in"
                # This catches: "on Amazon in Magenta", "on Amazon in Jade", etc.
                match = re.search(r"on Amazon in (.*?)(?::|\s|$)", col_p_text, re.IGNORECASE)
                
                if match:
                    color_name = match.group(1).strip()
                    # 2. Only insert if a color was actually found in P
                    if color_name:
                        amazon_color_sentence = f"Amazon Color: {color_name}.<br />"

        # 3. CLEAN AND FORMAT DESCRIPTION
        desc = product.get("description", "")
        
        # Strip old footers/headers/intro sentences to avoid duplicates
        desc = re.split(r'Shop this color|View all|<br|<h2', desc)[0].strip()
        desc = re.sub(r"^Order (?:this|these).*?https://amzn\.to/\S+[ \t]*\n*", "", desc, flags=re.IGNORECASE | re.DOTALL).strip()
        
        # Format H2 Headers for "How to wear"
        # We look at the original description lines to ensure we don't miss "How to wear"
        original_lines = product.get("description", "").split('\n')
        formatted_body_parts = []
        
        for line in original_lines:
            clean_line = line.strip()
            if not clean_line: continue
            
            # Skip if it's already a link or old color line
            if any(x in clean_line for x in ["Shop this color", "View all", "Amazon Color:"]):
                continue
            if "amzn.to" in clean_line:
                continue
                
            if clean_line.lower().startswith("how to wear"):
                formatted_body_parts.append(f'<h2 class="text-[#db2777] text-2xl font-bold mt-8 mb-4">{clean_line}</h2>')
            else:
                formatted_body_parts.append(clean_line)

        # Rebuild the main body text
        final_body = ""
        for part in formatted_body_parts:
            if part.startswith('<h2'):
                final_body += f"\n{part}\n"
            else:
                if final_body and not final_body.endswith('\n') and not final_body.endswith('>'):
                    final_body += " " + part
                else:
                    final_body += part

        final_body = final_body.strip()
        if final_body and not final_body.endswith('.') and not final_body.endswith('</h2>'):
            final_body += "."

        # 4. RE-APPEND FOOTER LINKS
        slugs = product.get("mainCategorySlugs", [])
        footer_links = ""
        if slugs:
            if len(slugs) > 1:
                footer_links += f'<br /><br /><a href="{base_url}{slugs[1]}" class="text-[#db2777] font-bold hover:underline">Shop this color collection</a>'
            
            cat_slug = slugs[0]
            cat_name = "Muslim Groom Outfit" if cat_slug == "muslim-groom-outfit" else cat_slug.replace('-', ' ').title()
            footer_links += f'<br /><a href="{base_url}{cat_slug}" class="text-[#db2777] font-bold hover:underline">View all {cat_name}</a>'

        # FINAL ASSEMBLY
        product["description"] = f"{amazon_color_sentence}{final_body}{footer_links}"

    # Save as preview
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Success! Preview created at: {output_path}")

# Paths (Update these for your local environment)
csv_file = 'tweak.csv'
json_file = 'src/data/bridal-products.json'
preview_file = 'src/data/bridal-products-preview.json'

generate_preview_json(csv_file, json_file, preview_file)