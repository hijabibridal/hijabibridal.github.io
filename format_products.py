import re
import os

def surgical_faq_fixer_v3():
    input_file = 'src/data/bridal-products.json'
    output_file = 'src/data/bridal-products-CLEANED.json'

    if not os.path.exists(input_file):
        print(f"File {input_file} not found.")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    def clean_faq_block(match):
        prefix = match.group(1) # "FAQ_schema": "
        body = match.group(2)   # The messy content
        suffix = match.group(3) # "
        
        # 1. Start fresh: Remove all existing backslashes from this block
        # This prevents \\\" (triple backslashes)
        clean_body = body.replace('\\"', '"')
        
        # 2. Force escape every quote
        # This fixes: "Question" -> \"Question\"
        fixed_body = clean_body.replace('"', '\\"')
        
        # 3. Targeted fix for the specific error you found:
        # If any word is missing a backslash before its quote (like Question"), 
        # the replace logic above actually catches it!
        
        return f'{prefix}{fixed_body}{suffix}'

    # This Regex isolates the FAQ_schema and performs the surgery
    new_content = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                         clean_faq_block, 
                         content, 
                         flags=re.DOTALL)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Precision Fix Applied.")
    print(f"Fixed the missing backslash in 'Question' and saved to {output_file}")

if __name__ == "__main__":
    surgical_faq_fixer_v3()