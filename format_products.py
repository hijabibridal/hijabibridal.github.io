import pandas as pd
import json
import re
import os

# Configuration
csv_path = 'tweak.csv'
json_input_path = 'src/data/bridal-products.json'
json_output_path = 'src/data/updated-bridal-products-colors.json'

# Ensure the output directory exists
os.makedirs(os.path.dirname(json_output_path), exist_ok=True)

# Load the CSV
df = pd.read_csv(csv_path)

# Load the JSON
with open(json_input_path, 'r') as f:
    bridal_data = json.load(f)

# Regex to find "on Amazon in [Color]:" in Column P (Index 15)
# This handles variations like "on amazon in" or "on Amazon in"
color_pattern = r"on [Aa]mazon in (.*?):"

# Create a mapping of slug to extracted color
slug_to_amazon_color = {}

for _, row in df.iterrows():
    # Use column index 15 for Column P
    description_text = str(row.iloc[15])
    slug = str(row['url_slug'])
    
    match = re.search(color_pattern, description_text)
    if match:
        # Extract color and convert to UPPER CASE (e.g., JADE)
        extracted_color = match.group(1).strip().upper()
        slug_to_amazon_color[slug] = extracted_color

# Function to update descriptions with "Amazon Color: COLOR"
def process_items(items):
    updated_count = 0
    for item in items:
        slug = item.get('slug')
        if slug in slug_to_amazon_color:
            color_text = f"Amazon Color: {slug_to_amazon_color[slug]}\n"
            # Prepend to existing description
            item['description'] = color_text + item.get('description', '')
            updated_count += 1
    return updated_count

# Update both products and mainCategories
total_updated = 0
if 'products' in bridal_data:
    total_updated += process_items(bridal_data['products'])

if 'mainCategories' in bridal_data:
    total_updated += process_items(bridal_data['mainCategories'])

# Save the updated JSON to a different name
with open(json_output_path, 'w') as f:
    json.dump(bridal_data, f, indent=2)

print(f"Update complete. Total items updated: {total_updated}")
print(f"File saved to: {json_output_path}")