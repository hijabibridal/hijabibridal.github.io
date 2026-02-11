import json
import re
import os

def clean_and_format():
    # Use the current file as the source
    file_path = 'src/data/bridal-products.json'
    output_path = 'src/data/bridal-products-fixed.json'

    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for product in data.get('products', []):
        # 1. RECOVERY: Strip all HTML to find the original text
        raw_text = re.sub(r'<[^>]*>', '', product.get('description', ''))
        
        # 2. DELETE placeholders
        raw_text = re.sub(r'\[insert alt text.*?linking images\]', '', raw_text, flags=re.IGNORECASE | re.DOTALL)

        # 3. REBUILD Logic
        lines = [line.strip() for line in raw_text.split('\n') if line.strip()]
        new_lines = []
        
        for i, line in enumerate(lines):
            # Format Headers
            if line.lower().startswith("how to wear"):
                new_lines.append(f'<h2 class="brand-h2">{line}</h2>')
            # Format Footer
            elif "shop this color" in line.lower() or "view all" in line.lower():
                new_lines.append(f'<p class="brand-footer">{line}</p>')
            # Regular Text
            else:
                new_lines.append(f'<p>{line}</p>')
        
        final_html = "".join(new_lines)

        # 4. Linkify Amazon URLs (Pink & Bold)
        amazon_pattern = r'(?<!href=")(https?://(?:www\.)?amzn\.to/\S+)'
        final_html = re.sub(amazon_pattern, 
                           r'<a href="\1" target="_blank" rel="noopener" class="amazon-link">\1</a>', 
                           final_html)
        
        product['description'] = final_html

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"SUCCESS: Created {output_path}. Review it, then rename to bridal-products.json")

if __name__ == "__main__":
    clean_and_format()