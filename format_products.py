import re
import os

def final_surgical_fixer():
    input_file = 'src/data/bridal-products.json'
    output_file = 'src/data/bridal-products-CLEANED.json'

    if not os.path.exists(input_file):
        print(f"File {input_file} not found.")
        return

    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()

    def clean_faq_block(match):
        prefix = match.group(1) # "FAQ_schema": "
        body = match.group(2)   # The content (partially broken)
        suffix = match.group(3) # "
        
        # STEP 1: Flatten. Remove all existing backslashes.
        # This fixes "Question\" or \"Question" by making them both "Question"
        flattened = body.replace('\\"', '"')
        
        # STEP 2: Rebuild. Escape EVERY quote inside the block.
        # This ensures @type, Question, name, and the text values are all escaped.
        fixed_body = flattened.replace('"', '\\"')
        
        return f'{prefix}{fixed_body}{suffix}'

    # This Regex isolates only the FAQ_schema values.
    # It strictly avoids your slugs, names, and longContent paragraphs.
    new_content = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                         clean_faq_block, 
                         content, 
                         flags=re.DOTALL)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("✅ FAQ Surgery Complete.")
    print(f"Fixed partial escapes on Line 237 and saved to {output_file}")

if __name__ == "__main__":
    final_surgical_fixer()