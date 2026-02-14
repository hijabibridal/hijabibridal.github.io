import json
import re

def master_cleanup():
    input_path = 'bridal-products.json'
    
    with open(input_path, 'r', encoding='utf-8') as f:
        raw_text = f.read()

    # REGEX CLEANER: Finds the content inside "FAQ_schema": "..." 
    # and escapes internal quotes that aren't already escaped.
    def clean_internal_quotes(match):
        start, content, end = match.groups()
        # Escape quotes only if they aren't already escaped
        fixed = re.sub(r'(?<!\\)"', r'\"', content)
        return f'{start}{fixed}{end}'

    # This targets the FAQ_schema field specifically to avoid breaking the rest of the file
    cleaned_text = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                          clean_internal_quotes, 
                          raw_text, 
                          flags=re.DOTALL)

    try:
        data = json.loads(cleaned_text)
        
        # Standardize formatting for the USA market
        for product in data.get('products', []):
            if "FAQ_schema" in product:
                # Remove any hidden non-breaking spaces that cause issues in Chrome
                product["FAQ_schema"] = product["FAQ_schema"].replace('\xa0', ' ')

        with open(input_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print("Success: JSON cleaned and quotes escaped.")
        
    except json.JSONDecodeError as e:
        print(f"Still hitting an error: {e}")

if __name__ == "__main__":
    master_cleanup()