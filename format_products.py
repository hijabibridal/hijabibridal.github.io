import re
import os

def final_double_cleanse_fixer():
    input_file = 'src/data/bridal-products.json'
    output_file = 'src/data/bridal-products-CLEANED.json'

    if not os.path.exists(input_file):
        print(f"File {input_file} not found.")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    def clean_faq_block(match):
        prefix = match.group(1) # "FAQ_schema": "
        body = match.group(2)   # The content
        suffix = match.group(3) # "
        
        # Pass 1: Remove ALL existing backslashes to get clean raw text
        # This handles cases like \"Question or Question"
        raw_text = body.replace('\\"', '"')
        
        # Pass 2: Apply a uniform backslash to EVERY double quote
        fixed_body = raw_text.replace('"', '\\"')
        
        return f'{prefix}{fixed_body}{suffix}'

    # Regex targets only the value of the FAQ_schema field
    new_content = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                         clean_faq_block, 
                         content, 
                         flags=re.DOTALL)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ Double-Cleanse Surgery Complete.")
    print(f"Sharara FAQs and all other blocks normalized in {output_file}")

if __name__ == "__main__":
    final_double_cleanse_fixer()