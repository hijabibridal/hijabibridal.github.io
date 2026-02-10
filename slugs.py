import pandas as pd
import re

# --- CONFIG ---
INPUT_FILE = 'tweak.csv'
OUTPUT_FILE = 'tweak_with_slugs.csv'

def create_slug(text):
    if pd.isna(text):
        return ""
    # Convert to lowercase
    slug = str(text).lower()
    # Remove special characters (like apostrophes or commas)
    slug = re.sub(r"[^\w\s-]", '', slug)
    # Replace spaces and underscores with a single hyphen
    slug = re.sub(r"[\s_]+", '-', slug)
    # Remove leading/trailing hyphens
    return slug.strip('-')

def generate_slugs():
    try:
        # Read your CSV
        df = pd.read_csv(INPUT_FILE)
        
        if 'new_name' not in df.columns:
            print(f"Error: 'new_name' column not found in {INPUT_FILE}")
            return

        print(f"🚀 Generating slugs for {len(df)} rows...")

        # Apply the slug function
        df['url_slug'] = df['new_name'].apply(create_slug)

        # Save the new file
        df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
        print(f"🏁 Done! Slugs saved to {OUTPUT_FILE}")

    except FileNotFoundError:
        print(f"Error: {INPUT_FILE} not found. Please ensure the file is in the same folder.")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    generate_slugs()