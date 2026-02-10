import pandas as pd
import json
import requests
import time
import re

# --- CONFIG ---
OPENROUTER_API_KEY = "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" 
INPUT_FILE = 'tweak.csv'
OUTPUT_FILE = 'tweak_with_faq_schema.csv'

def clean_html(text):
    if pd.isna(text): return ""
    clean = re.sub('<[^<]+?>', '', str(text))
    return clean.replace('&nbsp;', ' ').strip()

def get_ai_faq(row, retry_count=0):
    """Generates FAQ with strict evidentiary logic and SPO formatting."""
    name = row['name']
    description = clean_html(row['description'])
    paa = str(row['PAA'])
    core_entity = str(row['confirmed entity'])
    related_entities = str(row['entities'])

    prompt = f"""
    Act as a Luxury Muslim Bridal Expert.
    
    PRIMARY DATA (Priority):
    - Core Entity (M): {core_entity}
    - PAA Question (N): {paa}
    - Related Entities (L): {related_entities}
    
    SECONDARY DATA (Context):
    - Description (G): {description}

    TASK: Generate a 3-question JSON-LD FAQ Schema.
    
    STRICT WRITING CONSTRAINTS:
    - SOURCE LIMIT: Use Description (G) ONLY for styling and usage info. Do NOT use your own library or suggest styling (like wrapping a waist) unless G explicitly says so.
    - NO CULTURAL TERMS: Do NOT use the words "culture", "cultural", or "tradition" in any answer.
    - LENGTH: Exactly 3 sentences per answer.
    - STRUCTURE: At least one sentence in every answer must follow 'Subject-Predicate-Object' (SPO). 
      Example: "This {core_entity} [Subject] has [Predicate] patterns and designs [Object (from Related Entities)]."
    - TONE: Professional and informative.

    TIERED RULES:
    1. FAQ 1: Question is exactly "{paa}". Use "{core_entity}" and terms from "{related_entities}" to answer. Consult G for specific fabric/color/usage details.
    2. FAQ 2: Both Q&A must mention "{core_entity}" and use terms from "{related_entities}". Consult G for details.
    3. FAQ 3: Both Q&A must mention "{core_entity}" and use terms from "{related_entities}". Consult G for details.

    FORMAT: Output ONLY the valid JSON-LD array. No conversational text.
    """

    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"},
            data=json.dumps({
                "model": "openai/gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.1, # Critical: Low temp prevents 'creative' waist-wrapping suggestions
                "max_tokens": 1000
            })
        )
        
        result = response.json()

        if 'choices' not in result:
            error_msg = result.get('error', {}).get('message', 'Unknown Error')
            
            # Retry logic for overloads
            if "rate" in error_msg.lower() or "overload" in error_msg.lower() or "limit" in error_msg.lower():
                if retry_count < 3:
                    print(f"⏳ API Overloaded. Retrying in 10s... (Attempt {retry_count + 1})")
                    time.sleep(10)
                    return get_ai_faq(row, retry_count + 1)
            
            print(f"❌ API Error on {name}: {error_msg}")
            return None
            
        res = result['choices'][0]['message']['content']
        match = re.search(r'\[.*\]', res, re.DOTALL)
        return match.group() if match else ""

    except Exception as e:
        print(f"❌ System Error on {name}: {e}")
        return None

# --- EXECUTION ---
df = pd.read_csv(INPUT_FILE)

# REMOVED RESUME LOGIC: Ensuring a fresh overwrite with the new logic
df['FAQ schema with PAA'] = ""

print(f"🚀 Starting FRESH evidentiary generation...")

for index, row in df.iterrows():
    l_val = str(row.get('entities', '')).strip()
    m_val = str(row.get('confirmed entity', '')).strip()
    n_val = str(row.get('PAA', '')).strip()

    # Filter: Only process rows that have the required metadata
    if all(v and v.lower() != 'nan' for v in [l_val, m_val, n_val]):
        print(f"[{index + 1}/{len(df)}] Processing: {row['name']}")
        faq_json = get_ai_faq(row)
        
        if faq_json:
            df.at[index, 'FAQ schema with PAA'] = faq_json
            # Saving after every row ensures you don't lose paid-for data if the script stops
            df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
            time.sleep(0.5) 
        else:
            # Hard stop on terminal errors (like Insufficient Credits)
            print("🛑 Stopping to prevent credit waste. Check the error message above.")
            break

print(f"🏁 Finished. All eligible rows processed with new logic in {OUTPUT_FILE}")