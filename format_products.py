import json
import re
import os

def clean_bridal_json():
    # Path to your file
    file_path = 'src/data/bridal-products.json'
    
    if not os.path.exists(file_path):
        print(f"Error: Could not find {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for product in data.get('products', []):
        desc = product.get('description', '')
        
        # Regex explanation:
        # 1. Finds the word 'FAQs' (case insensitive)
        # 2. Removes everything until it hits 'Shop this color' or 'View all'
        # 3. Uses flags=re.DOTALL to handle multiple lines/newlines
        cleaned_desc = re.sub(
            r'[\n\r\s]*\w+\s*FAQs.*?(?=Shop this color|View all)', 
            '\n\n', 
            desc, 
            flags=re.DOTALL | re.IGNORECASE
        )
        
        # Normalize spacing (replaces 3+ newlines with just 2)
        product['description'] = re.sub(r'\n{3,}', '\n\n', cleaned_desc).strip()

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"Success! FAQs removed from descriptions in {file_path}")

clean_bridal_json()