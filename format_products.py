import json
import re
import os

def format_bridal_data():
    input_path = 'src/data/bridal-products.json'
    output_path = 'src/data/bridal-products-review.json'

    if not os.path.exists(input_path):
        print(f"Error: Could not find {input_path}")
        return

    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for product in data.get('products', []):
        desc = product.get('description', '')
        
        # 1. DELETE PLACEHOLDERS ONLY (The [insert alt text...] bits)
        desc = re.sub(r'\[insert alt text.*?linking images\]', '', desc, flags=re.IGNORECASE | re.DOTALL)

        # 2. WIX PURGE (Removes the link but KEEPS the text words)
        desc = re.sub(r'<a[^>]*href="[^"]*wix\.com[^"]*"[^>]*>(.*?)</a>', r'\1', desc, flags=re.IGNORECASE)

        # 3. AMAZON LINK ACTIVATION (Just makes the existing links Pink/Bold)
        amazon_pattern = r'(?<!href=")(https?://(?:www\.)?amzn\.to/\S+)'
        desc = re.sub(amazon_pattern, 
                      r'<a href="\1" target="_blank" rel="noopener" style="color: #db2777; font-weight: bold; text-decoration: underline;">\1</a>', 
                      desc)

        # 4. STRUCTURAL WRAPPING (Keeping every word exactly where it is)
        # We split by newlines to apply paragraph spacing without changing the order
        lines = [line.strip() for line in desc.split('\n') if line.strip()]
        new_lines = []
        
        for line in lines:
            # Apply Pink Header style if it starts with "How to wear"
            if line.lower().startswith("how to wear"):
                new_lines.append(f'<h2 style="color: #db2777 !important; font-weight: 900; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; text-transform: none !important;">{line}</h2>')
            # Apply Pink color to footer lines
            elif "shop this color collection" in line.lower() or "view all" in line.lower():
                new_lines.append(f'<p style="color: #db2777; margin-top: 2rem; font-weight: 400; text-transform: none;">{line}</p>')
            # Wrap everything else in a standard paragraph
            else:
                new_lines.append(f'<p style="margin-bottom: 1.5rem; color: inherit;">{line}</p>')
        
        product['description'] = "".join(new_lines)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Success! Review generated at: {output_path}")

if __name__ == "__main__":
    format_bridal_data()