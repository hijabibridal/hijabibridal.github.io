import pandas as pd
import requests
import json

# --- CONFIG ---
OPENROUTER_API_KEY = "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"
INPUT_FILE = 'tweak_seo_final.csv'
OUTPUT_FILE = 'tweak_seo_final_dynamic_alts.csv'

def get_entity_alt(new_name, entities, filename):
    """AI creates an alt tag using new_name, an entity, and the context of the filename."""
    
    prompt = f"""
    Act as a Luxury Bridal SEO Expert.
    Product: {new_name}
    Available Entities: {entities}
    Image Filename: {filename}

    TASK: Write one unique, luxury Alt Text for this specific webp image.
    RULES:
    1. SUBJECT: You MUST use "{new_name}".
    2. ENTITY: You MUST select one specific material or detail from: {entities}.
    3. CONTEXT: If the filename suggests a detail (e.g., 'close-up'), focus on that.
    4. LENGTH: Under 100 characters. No URLs.
    
    FORMAT: Plain text only.
    """
    
    try:
        response = requests.post(
            url="https://openrouter.ai/api/v1/chat/completions",
            headers={"Authorization": f"Bearer {OPENROUTER_API_KEY}", "Content-Type": "application/json"},
            data=json.dumps({
                "model": "openai/gpt-4o-mini",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            })
        )
        return response.json()['choices'][0]['message']['content'].strip()
    except:
        return f"Luxury detail of {new_name}"

def process_dynamic_alts():
    try:
        df = pd.read_csv(INPUT_FILE)
        
        print(f"🚀 Analyzing image sets for {len(df)} rows...")

        # We will store the results in a list of dicts and then join them
        alt_data = []

        for index, row in df.iterrows():
            other_images = str(row.get('other images in set', ''))
            row_alts = {}

            if other_images.lower() not in ['', 'nan', 'none']:
                # Split the webp filenames (comma separated)
                img_list = [img.strip() for img in other_images.split(',') if img.strip()]
                
                name = str(row.get('new_name', row.get('name', 'Product')))
                entities = str(row.get('entities', 'luxury bridal'))

                # Generate a unique alt for each image found (1, 2, or 3+)
                for i, filename in enumerate(img_list):
                    col_name = f'additional_alt_{i+1}'
                    alt_text = get_entity_alt(name, entities, filename)
                    row_alts[col_name] = alt_text
            
            alt_data.append(row_alts)

        # Convert the list of alt dictionaries to a DataFrame and join it
        df_alts = pd.DataFrame(alt_data)
        final_df = pd.concat([df, df_alts], axis=1)

        final_df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
        print(f"🏁 Success! Dynamic alt columns created in {OUTPUT_FILE}")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    process_dynamic_alts()