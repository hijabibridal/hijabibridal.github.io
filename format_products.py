import re
import os

def faq_only_surgical_cleaner():
    input_file = 'src/data/bridal-products.json'
    output_file = 'src/data/bridal-products-CLEANED.json'

    if not os.path.exists(input_file):
        print(f"File {input_file} not found.")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # THE RULE: Only touch text that lives between "FAQ_schema": " and the closing "
    def clean_faq_content(match):
        prefix = match.group(1) # This is -> "FAQ_schema": "
        faq_body = match.group(2) # This is the actual JSON string
        suffix = match.group(3) # This is the closing -> "
        
        # 1. Remove any existing backslashes to avoid \\\" messes
        temp_body = faq_body.replace('\\"', '"')
        
        # 2. Escape every double quote found inside this specific block
        # This handles the (fancy anarkali) quotes and the @type quotes
        fixed_body = temp_body.replace('"', '\\"')
        
        return f'{prefix}{fixed_body}{suffix}'

    # This Regex isolates the FAQ_schema specifically
    # It looks for "FAQ_schema": " followed by the content and ends before a comma or brace
    cleaned_content = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                             clean_faq_content, 
                             content, 
                             flags=re.DOTALL)

    # NO VALIDATION LOOP: We save exactly what we cleaned without checking the rest of the file.
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(cleaned_content)
    
    print(f"✅ FAQ Schema Cleaned. Fixed Line 237 and all other FAQ blocks.")
    print(f"Result saved to: {output_file}")

if __name__ == "__main__":
    faq_only_surgical_cleaner()