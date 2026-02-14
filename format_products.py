import json
import re
import os

def silent_faq_cleaner():
    file_path = 'src/data/bridal-products.json'
    if not os.path.exists(file_path):
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Target the FAQ_schema specifically
    # It looks for the content between "FAQ_schema": " and the final "
    def repair_internal_quotes(match):
        prefix = match.group(1) # "FAQ_schema": "
        inner_content = match.group(2) # The JSON string inside
        suffix = match.group(3) # "
        
        # 1. First, replace all existing backslashes to avoid triple-escaping
        clean_inner = inner_content.replace('\\"', '"')
        
        # 2. Escape every double quote found inside that string
        fixed_inner = clean_inner.replace('"', '\\"')
        
        return f'{prefix}{fixed_inner}{suffix}'

    # This regex finds the FAQ_schema value even if it spans multiple lines
    content = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                    repair_internal_quotes, 
                    content, 
                    flags=re.DOTALL)

    # Step 2: Final Validation & Standardization
    try:
        data = json.loads(content)
        
        # Clean up hidden characters (like \xa0) that cause rendering issues in Chrome
        # This ensures your 'Red is for new beginnings' text remains clean
        for product in data.get('products', []):
            if "FAQ_schema" in product and isinstance(product["FAQ_schema"], str):
                product["FAQ_schema"] = product["FAQ_schema"].replace('\xa0', ' ')

        # Save the perfectly formatted JSON
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
            
    except json.JSONDecodeError:
        # If standard JSON parsing still fails, we perform a character-by-character 
        # escape on any quote that isn't followed by a comma or brace.
        # This acts as a 'last resort' silent fix.
        lines = content.split('\n')
        fixed_lines = []
        for line in lines:
            if '"' in line and not line.strip().endswith(',') and not line.strip().endswith('}'):
                # This is a likely unescaped quote in the middle of a string
                line = line.replace('"', '\\"')
            fixed_lines.append(line)
        
        final_content = '\n'.join(fixed_lines)
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(final_content)

if __name__ == "__main__":
    silent_faq_cleaner()