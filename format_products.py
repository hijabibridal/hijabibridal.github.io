import json
import re
import os

input_file = 'src/data/bridal_product.json'
output_file = 'src/data/bridal_product_CLEANED.json'

def fix_malformed_json_content():
    if not os.path.exists(input_file):
        print(f"File not found: {input_file}")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        raw_content = f.read()

    # Step 1: Fix unescaped quotes inside the FAQ_schema string
    # This finds the content between "FAQ_schema": " and the closing "
    def escape_internal_quotes(match):
        prefix = match.group(1) # "FAQ_schema": "
        content = match.group(2) # The messy string with unescaped quotes
        suffix = match.group(3) # "
        
        # Replace unescaped quotes with escaped ones, but ignore already escaped ones
        # and ignore the very first/last quotes that define the string
        fixed_content = content.replace('"', '\\"')
        # If the script accidentally double-escapes (\\\"), fix it back to (\")
        fixed_content = fixed_content.replace('\\\\"', '\\"')
        
        return f'{prefix}{fixed_content}{suffix}'

    # Regex to target the FAQ_schema field specifically
    cleaned_content = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                            escape_internal_quotes, 
                            raw_content, 
                            flags=re.DOTALL)

    try:
        # Step 2: Now that the quotes are escaped, we can safely load it
        data = json.loads(cleaned_content)
        
        # Step 3: Standardize the data
        for product in data:
            if "FAQ_schema" in product and isinstance(product["FAQ_schema"], str):
                # Clean hidden non-breaking spaces (\xa0) that cause the 'Red' text in Chrome
                product["FAQ_schema"] = product["FAQ_schema"].replace('\xa0', ' ')
                
                # Optional: Convert the string back into a real JSON object for Google
                try:
                    product["FAQ_schema"] = json.loads(product["FAQ_schema"])
                except:
                    pass

        # Step 4: Save the perfectly formatted file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"Success! Fixed the quotes and saved to {output_file}")

    except json.JSONDecodeError as e:
        print(f"Still hitting an error: {e}")
        print("Tip: Check for a missing comma on the line right before the error.")

if __name__ == "__main__":
    fix_malformed_json_content()