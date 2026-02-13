import json
import os

# Define the file paths
input_path = 'src/data/bridal-products.json'
output_path = 'src/data/bridal_products_CLEANED.json'

def clean_structured_data():
    if not os.path.exists(input_path):
        print(f"Error: Could not find {input_path}")
        return

    try:
        # Step 1: Read the file as raw text to catch invisible characters
        with open(input_path, 'r', encoding='utf-8') as f:
            raw_content = f.read()

        # Step 2: Replace non-breaking spaces and other "red" culprits
        # \xa0 is the most common invisible character that breaks JSON
        cleaned_content = raw_content.replace('\xa0', ' ')
        cleaned_content = cleaned_content.replace('\\u00a0', ' ')
        
        # Step 3: Validate that it is now proper JSON
        json_data = json.loads(cleaned_content)

        # Step 4: Save to the new output name with pretty formatting
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2, ensure_ascii=False)

        print(f"Success! Cleaned file saved to: {output_path}")
        print("You can now copy the data from this new file into your site.")

    except json.JSONDecodeError as e:
        print(f"JSON Error: {e}")
        print("This usually means there is a missing comma or quote near the line above.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    clean_structured_data()