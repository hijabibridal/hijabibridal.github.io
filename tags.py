import pandas as pd
import re
import requests
import json
import time

# --- CONFIG ---
OPENROUTER_API_KEY = "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"
INPUT_FILE = 'tweak.csv'
OUTPUT_FILE = 'tweak_seo_final.csv'

def extract_url(text):
    """Scrapes the Amazon URL from the additionalInfoDescription1 column."""
    if pd.isna(text): return ""
    match = re.search(r'https://amzn.to/\S+', str(text))
    return match.group(0).rstrip('"\')]>') if match else ""

def get_ai_seo(display_name, paa, description, entities, is_lehenga):
    """Refines Meta & Alt Text using OpenRouter, incorporating specific entities."""
    
    prompt = f"""
    Act as a Luxury Bridal SEO Expert for the USA market.
    Product Name: {display_name}
    Key Entities to include: {entities}
    PAA Context: {paa}
    Product Details: {description[:400]}
    
    TASK: Write a Meta Description and Alt Text.
    
    STRICT RULES:
    1. USE THE PRODUCT NAME: You MUST use "{display_name}" in both the meta and alt text.
    2. USE ENTITIES: You MUST include at least one relevant term from the 'Key Entities' list provided.
    3. META DESCRIPTION: 150-160 characters. Sophisticated, conversion-focused. No URLs.
    4. ALT TEXT: Visual and descriptive. Mention color, texture, and style.
    5. LEHENGA CONTEXT: If it's a Lehenga, frame as 'Bridal Style Inspiration'.
    
    FORMAT (JSON ONLY):
    {{
      "meta": "text here",
      "alt": "text here"
    }}
    """
    
    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"},
            data=json.dumps({
                "model": "openai/gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "response_format": { "type": "json_object" },
                "temperature": 0.7
            })
        )
        result = response.json()
        return json.loads(result['choices'][0]['message']['content'])
    except Exception as e:
        print(f"AI SEO Error for {display_name}: {e}")
        return {
            "meta": f"Exquisite {display_name}. Discover luxury bridal styling for the modern bride.", 
            "alt": f"Visual of {display_name} featuring traditional bridal details."
        }

def process_all_rows():
    try:
        df = pd.read_csv(INPUT_FILE)
        print(f"🚀 Starting consolidated SEO processing for {len(df)} rows...")

        for index, row in df.iterrows():
            # 1. NAME FALLBACK
            display_name = str(row.get('new_name', ''))
            if display_name.strip().lower() in ['', 'nan', 'none']:
                display_name = str(row.get('name', 'Product'))
            
            # 2. DESCRIPTION FALLBACK
            raw_desc = str(row.get('New Rewritten Description', ''))
            if raw_desc.strip().lower() in ['', 'nan', 'none']:
                raw_desc = str(row.get('description', ''))

            is_lehenga = 'lehenga' in display_name.lower()
            affiliate_url = extract_url(row.get('additionalInfoDescription1', ''))
            entities_list = str(row.get('entities', 'bridal, luxury, wedding'))
            
            # 3. GET AI SEO (Meta & Alt)
            ai_seo = get_ai_seo(display_name, row.get('PAA',''), raw_desc, entities_list, is_lehenga)
            
            # 4. LEHENGA DISCLAIMER LOGIC
            if is_lehenga and "Inspiration:" not in raw_desc:
                disclaimer = (f"Inspiration: This AI-visualized look demonstrates how you can style Amazon finds into a custom Hijabi Lehenga. "
                              f"To achieve this specific aesthetic, order two {display_name} on Amazon here: {affiliate_url} and consult your local tailor.\n\n")
                df.at[index, 'New Rewritten Description'] = disclaimer + raw_desc

            # 5. ASSIGN COLUMNS
            df.at[index, 'amazon_affiliate_url'] = affiliate_url
            df.at[index, 'meta_description'] = ai_seo['meta']
            df.at[index, 'alt_text'] = ai_seo['alt']
            df.at[index, 'og_image'] = str(row.get('matched_image', '')) # Using matched_image for OG
            
            # Title Tag Styling
            if is_lehenga:
                title = f"{display_name} Style Inspiration | 2026 Bridal Trends"
            else:
                title = f"Best {display_name} for 2026 Brides | Amazon Product Styling"
                
            df.at[index, 'title_tag'] = title
            df.at[index, 'og_title'] = title
            df.at[index, 'og_type'] = 'website'

            # Optional: Small sleep to avoid rate limits if running a massive file
            # time.sleep(0.1)

        # Save result
        df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
        print(f"🏁 Final Master File Saved: {OUTPUT_FILE}")

    except Exception as e:
        print(f"❌ Critical Error: {e}")

if __name__ == "__main__":
    process_all_rows()