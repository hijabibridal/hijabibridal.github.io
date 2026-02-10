import pandas as pd

# --- CONFIG ---
INPUT_FILE = 'tweak_seo_final.csv' 
OUTPUT_FILE = 'tweak_seo_final.csv'

def fix_og_image_mapping():
    try:
        # Load the file
        df = pd.read_csv(INPUT_FILE)
        
        # Check for the specific column name you provided
        source_col = 'matched_image_name'
        
        if source_col not in df.columns:
            print(f"❌ Error: Could not find '{source_col}'.")
            print(f"Available columns are: {list(df.columns)}")
            return

        print(f"🚀 Mapping '{source_col}' to 'og_image'...")

        # Copy the data
        # .fillna('') ensures empty cells don't become the string "nan"
        df['og_image'] = df[source_col].fillna('')

        # Save the file
        df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
        print(f"🏁 Success! 'og_image' updated in {OUTPUT_FILE}")

    except Exception as e:
        print(f"❌ An error occurred: {e}")

if __name__ == "__main__":
    fix_og_image_mapping()