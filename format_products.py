import json
import re
import os

def format_bridal_data():
    input_path = 'src/data/bridal-products.json'
    output_path = 'src/data/bridal-products-review.json'

    if not os.path.exists(input_path): return

    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for product in data.get('products', []):
        # Start fresh from raw text
        desc = product.get('description', '')
        
        # 1. Clean out existing HTML tags to prevent "double wrapping"
        desc = re.sub(r'</?(p|h2|div|span)[^>]*>', '', desc)
        
        # 2. Delete placeholders
        desc = re.sub(r'\[insert alt text.*?linking images\]', '', desc, flags=re.IGNORECASE | re.DOTALL)

        # 3. Amazon Links (Pink & Bold)
        amazon_pattern = r'(?<!href=")(https?://(?:www\.)?amzn\.to/\S+)'
        desc = re.sub(amazon_pattern, 
                      r'<a href="\1" target="_blank" rel="noopener" style="color: #db2777; font-weight: bold; text-decoration: underline;">\1</a>', 
                      desc)

        lines = [line.strip() for line in desc.split('\n') if line.strip()]
        new_lines = []
        
        for i, line in enumerate(lines):
            # Header logic
            if line.lower().startswith("how to wear"):
                new_lines.append(f'<h2 style="color: #db2777; font-weight: 900; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; text-transform: none;">{line}</h2>')
            # Footer logic
            elif "shop this color collection" in line.lower() or "view all" in line.lower():
                new_lines.append(f'<p style="color: #db2777; margin-top: 2rem; font-weight: 400;">{line}</p>')
            # First line only is Bold (Order on Amazon)
            elif i == 0 and "amazon" in line.lower():
                new_lines.append(f'<p style="margin-bottom: 1.5rem; font-weight: bold;">{line}</p>')
            # EVERYTHING ELSE is Regular Text (Fixes the "Whole thing is bold" issue)
            else:
                new_lines.append(f'<p style="margin-bottom: 1.5rem; font-weight: normal; color: #374151;">{line}</p>')
        
        product['description'] = "".join(new_lines)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    format_bridal_data()