import pandas as pd
import json
import requests
import time
import re

# --- CONFIG ---
OPENROUTER_API_KEY = "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"
INPUT_FILE = 'tweak_with_faq_schema_cleaned.csv'
OUTPUT_FILE = 'tweakdescriptions.csv'

def clean_html_to_text(html):
    if pd.isna(html): return ""
    clean = re.sub('<[^<]+?>', '', str(html))
    return clean.replace('&nbsp;', ' ').strip()

def extract_amazon_info(html):
    """Extracts the Amazon URL and the color mentioned near it for the H2."""
    if pd.isna(html): return "#", ""
    url_match = re.search(r'href="(https://amzn.to/[^"]+)"', str(html))
    url = url_match.group(1) if url_match else "#"
    
    color_match = re.search(r'(?:in|color)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)', str(html))
    amazon_color = color_match.group(1) if color_match else ""
    return url, amazon_color

def get_ai_copywriting(row, idx):
    # Removed inaccurate 'name' and defined primary identifiers
    new_name = str(row.get('new_name', 'Product'))
    core_entity = str(row.get('confirmed entity', 'Item'))
    
    description_raw = row['description']
    description_text = clean_html_to_text(description_raw)
    entities = str(row['entities'])
    
    # FAQ Schema (O) setup - Corrected to use 'FAQ_schema' as requested
    faq_json_str = str(row.get('FAQ_schema', '[]'))
    FAQ_schema = faq_json_str

    amazon_url, amazon_color = extract_amazon_info(description_raw)
    color_suffix = f" in {amazon_color}" if amazon_color else ""

    prompt = f"""
    Act as a Luxury Muslim Bridal Copywriter for the USA market.
    
    DATA SOURCE:
    - Core Entity (M): {core_entity}
    - Entities (L): {entities}
    - New Name: {new_name}
    - Original Description (G): {description_text}
    - FAQ Schema (O): {FAQ_schema}

    TASK: Rewrite Description (G) in plain text paragraphs. Do NOT use HTML tags.
    
    STRICT RULES:
    1. SPO PRIORITY: The VERY FIRST sentence of Paragraph 1 and Paragraph 2 MUST be a Subject-Predicate-Object (SPO) sentence.
       - P1 Start: "This {core_entity} features {entities}."
       - P2 Start: "This {core_entity} coordinates with styling for bridal looks."
    2. SOURCE ANCHORING: Take info STRICTLY from G. Do NOT use O to write the paragraphs. O is for the FAQ section only.
       - Do NOT hallucinate fabric if not in G. 
       - Do NOT mention undergarments, bras, or "walking down the aisle."
       - No embroidery references unless in G.
    3. GRAMMAR: Ensure perfect English. Fix errors like "hijabi nails" or "nailss" to "Halal nails" or "nails."
    4. NO PAA: Do not include PAA question text in these paragraphs.
    5. NO HTML: Output raw text only.

    STRUCTURE:
    - Paragraph 1: Product details from G starting with SPO.
    - Header Text: "How to wear this {new_name}"
    - Paragraph 2: Styling info from G starting with SPO.
    
    FORMAT: Output ONLY the text for the sections above.
    """

    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"},
            data=json.dumps({
                "model": "openai/gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.1
            })
        )
        ai_content = response.json()['choices'][0]['message']['content']
        
        # Assemble Amazon Header
        header = f"Order this {new_name} on Amazon{color_suffix}: {amazon_url}"
        
        # Process FAQs directly from Column O in Python to ensure 100% accuracy
        faq_section = f"\n\n{core_entity.title()} FAQs"
        
        # Check if the data exists before trying to parse it
        if pd.isna(faq_json_str) or str(faq_json_str).strip().lower() in ["", "[]", "nan", "none"]:
            faq_section = "" 
        else:
            try:
                faqs = json.loads(faq_json_str)
                for item in faqs:
                    faq_section += f"\nQ: {item['name']}\nA: {item['acceptedAnswer']['text']}\n"
            except Exception as e:
                # idx is now correctly passed into the function for this print statement
                print(f"!!! FAQ JSON Error on Index {idx}: {e}")
                faq_section = ""

        # Build Footer
        category_item = core_entity.split()[-1] + "s" 
        footer = f"\nShop this color collection.\nView all {category_item}."

        return f"{header}\n\n{ai_content}\n{faq_section}\n{footer}"

    except Exception as e:
        print(f"Error on {new_name}: {e}")
        return ""

# --- EXECUTION ---
df = pd.read_csv(INPUT_FILE)
df['New Rewritten Description'] = ""

# TEST MODE: Set this to True to process ONLY row 25. Set to False for the full run.
TEST_MODE = False

print(f"🚀 Starting script...")

for index, row in df.iterrows():
    # Removable Logic for testing Row 25
    if TEST_MODE and index != 25:
        continue

    if all(str(row.get(col, '')).strip().lower() != 'nan' for col in ['entities', 'confirmed entity', 'PAA']):
        print(f"Processing Index {index}: {row.get('new_name', 'Unknown')}")
        # index is now passed as the second argument 'idx'
        df.at[index, 'New Rewritten Description'] = get_ai_copywriting(row, index)
        
        # Save every 5 rows or immediately if in test mode
        if index % 5 == 0 or TEST_MODE:
            df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
        
        if not TEST_MODE:
            time.sleep(0.5)

print(f"🏁 Done! Output: {OUTPUT_FILE}")