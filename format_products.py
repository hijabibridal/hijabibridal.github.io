import pandas as pd
import json
import re
import os

def generate_preview_json(csv_path, json_path, output_path):
    df = pd.read_csv(csv_path)
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    base_url = "https://hijabibridal.github.io/shop/category/"

    for product in data.get("products", []):
        product_name = product.get("name", "")
        slug = product.get("slug")
        row = df[df['url_slug'] == slug]
        
        amazon_color_sentence = ""
        # 1. Logic for Amazon Color (Non-Lehenga + exists in Col P)
        if "lehenga" not in product_name.lower() and not row.empty:
            col_p_text = str(row.iloc[0].get('New Rewritten Description', ''))
            match = re.search(r"on Amazon in (.*?)(?::|\s|$)", col_p_text, re.IGNORECASE)
            if match:
                color_name = match.group(1).strip().rstrip(':').rstrip('.')
                amazon_color_sentence = f"Amazon Color: {color_name}.<br />"

        # 2. Rebuild the body line-by-line
        original_desc = product.get("description", "")
        # Strip old H2s and affiliate links first to avoid "double-processing"
        temp_text = re.sub(r'<h2.*?>.*?</h2>', '', original_desc)
        lines = temp_text.split('\n')
        
        processed_parts = []
        for line in lines:
            clean_line = line.strip()
            if not clean_line: continue
            
            # Skip old duplicate elements
            if any(x in clean_line for x in ["Shop this color", "View all", "amzn.to", "Amazon Color:"]):
                continue
            
            if clean_line.lower().startswith("how to wear"):
                processed_parts.append(f'<h2 class="text-[#db2777] text-2xl font-bold mt-8 mb-4">{clean_line}</h2>')
            else:
                processed_parts.append(clean_line)

        # 3. Assemble with proper paragraph spacing
        final_body = ""
        for part in processed_parts:
            if part.startswith('<h2'):
                final_body += f"\n{part}\n"
            else:
                # Add a space between regular text blocks, but not if we just finished an H2
                if final_body and not final_body.endswith('\n') and not final_body.endswith('>'):
                    final_body += " " + part
                else:
                    final_body += part

        # 4. Re-append the footers
        slugs = product.get("mainCategorySlugs", [])
        footer_links = ""
        if slugs:
            if len(slugs) > 1:
                footer_links += f'<br /><br /><a href="{base_url}{slugs[1]}" class="text-[#db2777] font-bold hover:underline">Shop this color collection</a>'
            cat_slug = slugs[0]
            cat_name = "Muslim Groom Outfit" if cat_slug == "muslim-groom-outfit" else cat_slug.replace('-', ' ').title()
            footer_links += f'<br /><a href="{base_url}{cat_slug}" class="text-[#db2777] font-bold hover:underline">View all {cat_name}</a>'

        product["description"] = f"{amazon_color_sentence}{final_body.strip()}{footer_links}"

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Done! Check {output_path}")

generate_preview_json('tweak.csv', 'src/data/bridal-products.json', 'src/data/bridal-products-preview.json')