import json
import re
import os

def master_cleanup():
    file_path = 'src/data/bridal-products.json'
    if not os.path.exists(file_path):
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Step 1: Force-escape internal quotes in the FAQ_schema field
    # This prevents the "Expecting ',' delimiter" error before it happens
    def auto_fix_quotes(match):
        prefix, inner, suffix = match.groups()
        # Escape any double quotes that aren't already escaped
        fixed_inner = re.sub(r'(?<!\\)"', r'\"', inner)
        return f'{prefix}{fixed_inner}{suffix}'

    content = re.sub(r'("FAQ_schema":\s*")(.*?)("(?=\s*[,}\n]))', 
                    auto_fix_quotes, content, flags=re.DOTALL)

    # Step 2: Attempt to load and fix iterative errors
    max_retries = 10
    for _ in range(max_retries):
        try:
            data = json.loads(content)
            
            # Successful load - apply final USA market sanitization
            for product in data.get('products', []):
                if "FAQ_schema" in product:
                    # Clean non-breaking spaces that cause 'Red' highlights in Chrome
                    product["FAQ_schema"] = str(product["FAQ_schema"]).replace('\xa0', ' ')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            break 
            
        except json.JSONDecodeError as e:
            # If a delimiter error is found, treat the offending character as a literal quote
            lines = content.split('\n')
            if e.lineno <= len(lines):
                bad_line = lines[e.lineno - 1]
                # Insert a backslash before the quote at the error column
                fixed_line = bad_line[:e.colno - 1] + '\\' + bad_line[e.colno - 1:]
                lines[e.lineno - 1] = fixed_line
                content = '\n'.join(lines)
            continue

if __name__ == "__main__":
    master_cleanup()