import csv
import json
import re
import os

def generate_slug(name):
    """Converts a string into a clean, lowercase hyphenated slug."""
    if not name or not isinstance(name, str): return ""
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug

def parse_additional_alt(text):
    """
    Extracts alt text, filename (.webp), and optional Amazon link.
    Matches the format: 'Alt text here. image.webp, http://amzn.to/...'
    """
    if not text or not isinstance(text, str):
        return None
    
    link = ""
    # Extract link if present (usually after a comma)
    if ',' in text:
        parts = text.rsplit(',', 1)
        potential_link = parts[1].strip()
        if potential_link.startswith('http'):
            link = potential_link
            text = parts[0]
            
    # Extract filename and determine alt text
    filename = ""
    webp_match = re.search(r'([\w\s-]+\.webp)', text)
    if webp_match:
        filename = webp_match.group(1).strip()
        # Remove filename and trailing dots to get clean alt text
        alt = text.replace(filename, '').strip().rstrip('.').strip()
    else:
        alt = text.strip()
        
    return {"url": filename, "alt": alt, "amazonLink": link}

# Paths
input_json = 'products-categories.json' # The file you edited
csv_file = 'tweak.csv'
output_json = 'products-categories-final.json'

# 1. Load your existing edited JSON
if os.path.exists(input_json):
    with open(input_json, 'r', encoding='utf-8') as f:
        data = json.load(f)
else:
    # Initialize structure if file is missing
    data = {"mainCategories": []}

products_list = []

# Define columns to exclude from the product attributes
skip_from_attrs = {
    'main category', 'color category', 'former name', 'entities', 'confirmed entity', 'PAA',
    'description', 'New Rewritten Description', 'new_name', 'url_slug',
    'matched_image_name', 'alt_text', 'principle amazon_affiliate_url'
}
# Also exclude the raw additional_alt columns as they are processed into 'images'
for i in range(1, 7):
    skip_from_attrs.add(f'additional_alt_{i}')

# 2. Process CSV for products
with open(csv_file, mode='r', encoding='utf-8-sig') as f:
    reader = csv.DictReader(f)
    for row in reader:
        # Core Identity
        p_name = row.get('new_name', '').strip() or row.get('former name', '').strip()
        p_slug = row.get('url_slug', '').strip() or generate_slug(row.get('former name', ''))
        
        # Description logic (Priority to 'New Rewritten Description')
        p_desc = row.get('New Rewritten Description', '').strip()
        if not p_desc:
            p_desc = row.get('description', '').strip()
            
        # Category Slugs (Main + first color found)
        cat_slugs = []
        if row.get('main category'): 
            cat_slugs.append(generate_slug(row['main category']))
        if row.get('color category'):
            # Using the first color for the secondary slug as requested
            first_color = row['color category'].split(',')[0].strip()
            cat_slugs.append(generate_slug(first_color))
        
        # Image Processing
        p_images = []
        # Primary Image
        if row.get('matched_image_name'):
            p_images.append({
                "url": row.get('matched_image_name', '').strip(),
                "alt": row.get('alt_text', '').strip(),
                "amazonLink": row.get('principle amazon_affiliate_url', '').strip()
            })
        
        # Additional Images (Parsing filename and unique Amazon links)
        for i in range(1, 7):
            raw_field = row.get(f'additional_alt_{i}', '').strip()
            if raw_field:
                img_info = parse_additional_alt(raw_field)
                if img_info:
                    p_images.append(img_info)
                    
        # Construct the Product Object
        product_obj = {
            "name": p_name,
            "slug": p_slug,
            "description": p_desc,
            "mainCategorySlugs": cat_slugs,
            "images": p_images
        }
        
        # Add all other columns (SEO tags, schemas, etc.)
        for col, val in row.items():
            if col not in skip_from_attrs and col not in product_obj:
                product_obj[col] = val.strip() if val else ""
        
        products_list.append(product_obj)

# 3. Append to existing data structure
data['products'] = products_list

# Save the final merged file
with open(output_json, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2)

print(f"Success! Merged {len(products_list)} products into {output_json}.")