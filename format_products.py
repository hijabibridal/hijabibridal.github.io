import json
import os

# Your specific file paths
input_file = 'src/data/bridal-products.json'
output_file = 'src/data/bridal_products_CLEANED.json'

def master_cleanup():
    if not os.path.exists(input_file):
        print(f"File not found: {input_file}")
        return

    # Load the current JSON data
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for product in data:
        if "FAQ_schema" in product:
            raw_val = product["FAQ_schema"]
            
            # Step 1: Force clean invisible characters (the "Red Text" fix)
            if isinstance(raw_val, str):
                raw_val = raw_val.replace('\xa0', ' ').replace('\\u00a0', ' ')
            
            # Step 2: Convert String-to-Object (the "Backslash" fix)
            # If the value is a string starting with '[', it's a trapped JSON array
            if isinstance(raw_val, str) and raw_val.strip().startswith('['):
                try:
                    product["FAQ_schema"] = json.loads(raw_val)
                    print(f"Fixed string-trap for: {product.get('product_name', 'Unknown Product')}")
                except json.JSONDecodeError:
                    print(f"Failed to parse FAQ for {product.get('product_name')}. Check for missing commas.")
            
            # Step 3: Clean characters even if it's already an object
            elif isinstance(raw_val, list):
                # Convert to string to clean, then back to object
                temp_str = json.dumps(raw_val).replace('\xa0', ' ')
                product["FAQ_schema"] = json.loads(temp_str)

    # Save to the new file
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\nSUCCESS: Cleaned data saved to {output_file}")
    print("Use the contents of the CLEANED file for your live site.")

if __name__ == "__main__":
    master_cleanup()