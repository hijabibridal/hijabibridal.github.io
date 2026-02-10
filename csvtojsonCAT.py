import csv
import json
import re

def generate_slug(name):
    """Converts a name into a lowercase hyphenated slug."""
    slug = name.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    return slug

def create_categories_json(csv_file_path, output_json_path):
    unique_categories = set()
    
    # Read the CSV file
    with open(csv_file_path, mode='r', encoding='utf-8-sig') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # 1. Process "main category"
            main_cat = row.get('main category', '').strip()
            if main_cat:
                unique_categories.add(main_cat)
            
            # 2. Process "color category" (splitting by comma)
            color_cats = row.get('color category', '').strip()
            if color_cats:
                # Split by comma and clean up whitespace
                colors = [c.strip() for c in color_cats.split(',')]
                for color in colors:
                    if color:
                        unique_categories.add(color)

    # Build the JSON structure
    json_data = {"mainCategories": []}
    
    # Sort categories alphabetically for a clean output
    for cat_name in sorted(list(unique_categories)):
        slug = generate_slug(cat_name)
        
        category_obj = {
            "slug": slug,
            "name": cat_name.title(),
            "titleTag": f"{cat_name.title()} Collection | Hijabi Bridal",
            "metaDescription": f"Explore our curated selection of {cat_name.lower()} items. Find the perfect style and quality for your special occasion.",
            "description": f"Welcome to our {cat_name.lower()} category. We offer a wide range of high-quality products designed to meet your needs and enhance your bridal style."
        }
        json_data["mainCategories"].append(category_obj)

    # Save to JSON file
    with open(output_json_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, indent=2)

    print(f"Successfully created {output_json_path} with {len(json_data['mainCategories'])} categories.")

# Run the script
create_categories_json('tweak.csv', 'products-categories.json')