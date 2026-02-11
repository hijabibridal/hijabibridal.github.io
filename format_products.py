import json
import re
import os

def format_bridal_data():
    input_path = 'src/data/bridal-products.json'
    output_path = 'src/data/bridal-products-review.json'

    if not os.path.exists(input_path):
        print(f"Error: Could not find {input_path}")
        return

    with open(input_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for product in data.get('products', []):
        desc = product.get('description', '')
        has_faq_schema = 'FAQ_schema' in product and product['FAQ_schema'] and len(product['FAQ_schema']) > 10

        # 1. Protect the Footer: Extract it before we do any FAQ cutting
        footer_match = re.search(r'(Shop this color collection\..*View all.*)', desc, re.DOTALL | re.IGNORECASE)
        footer_text = footer_match.group(1) if footer_match else ""

        # 2. Wix Purge
        desc = re.sub(r'<a[^>]*href="[^"]*wix\.com[^"]*"[^>]*>(.*?)</a>', r'\1', desc, flags=re.IGNORECASE)

        # 3. FAQ Removal: Truncate at the FAQ section
        if has_faq_schema:
            markers = [r'\w+ FAQs', r'FAQs', r'Common Questions', r'\nQ:']
            for marker in markers:
                parts = re.split(marker, desc, flags=re.IGNORECASE)
                if len(parts) > 1:
                    desc = parts[0]
                    break

        # 4. Amazon Link Activation (Pink & Bold)
        amazon_pattern = r'(?<!href=")(https?://(?:www\.)?amzn\.to/\S+)'
        desc = re.sub(amazon_pattern, 
                      r'<a href="\1" target="_blank" rel="noopener" style="color: #db2777; font-weight: bold; text-decoration: underline;">\1</a>', 
                      desc)

        # 5. Build HTML Structure
        lines = [line.strip() for line in desc.split('\n') if line.strip()]
        new_lines = []
        
        for i, line in enumerate(lines):
            # First line (Order on Amazon) -> Bold
            if i == 0 and "amazon" in line.lower():
                new_lines.append(f'<p style="margin-bottom: 1.5rem;"><strong>{line}</strong></p>')
            # "How to wear" -> Pink H2 (No Caps)
            elif line.lower().startswith("how to wear"):
                new_lines.append(f'<h2 style="color: #db2777; font-weight: 900; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem; text-transform: none;">{line}</h2>')
            else:
                new_lines.append(f'<p style="margin-bottom: 1.5rem;">{line}</p>')
        
        # 6. Re-attach Footer (Pink, Not Bold, No Caps)
        if footer_text:
            # Clean up the footer text and wrap in a pink paragraph
            clean_footer = footer_text.replace('\n', '<br/>')
            new_lines.append(f'<p style="color: #db2777; margin-top: 2rem; font-weight: 400; text-transform: none;">{clean_footer}</p>')

        product['description'] = "".join(new_lines)

    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Done! Check the review file: {output_path}")

if __name__ == "__main__":
    format_bridal_data()