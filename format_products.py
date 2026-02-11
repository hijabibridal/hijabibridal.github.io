import json
import re
import html
import os

# Define paths
input_path = 'src/data/bridal-products.json'
output_path = 'src/data/bridal-productsNEW.json'

def clean_description(text):
    if not text: return ""
    text = html.unescape(text)
    # 1. Strip all HTML tags (Removes orange links/inline styles)
    text = re.sub(r'<[^>]*>', ' ', text)
    # 2. Strip placeholder text
    text = re.sub(r'\[insert alt text.*?linking images\]', '', text, flags=re.IGNORECASE | re.DOTALL)
    # 3. Handle artifacts and broken tags
    text = re.sub(r'target="_blank".*?>', '', text) 
    text = re.sub(r'style=".*?"', '', text)
    # 4. Standardize Line Breaks for Headers (to be detected by TSX)
    headers = ["How to wear", "About this", "Order on Amazon", "Shop this color", "View all"]
    for header in headers:
        text = re.sub(f'(?i)({header})', r'\n\1', text)
    # 5. Final whitespace cleanup
    lines = [l.strip() for l in text.split('\n') if l.strip()]
    processed = []
    for line in lines:
        line = re.sub(r'\s+', ' ', line).replace('Add "', '').replace('">', '').strip()
        if line: processed.append(line)
    return '\n'.join(processed)

if os.path.exists(input_path):
    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    for product in data['products']:
        product['description'] = clean_description(product['description'])
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    print(f"Success! Cleaned {len(data['products'])} products in {output_path}")