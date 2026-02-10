import pandas as pd

# --- CONFIG ---
TWEAK_FILE = 'tweak.csv'
REPAIRED_FILE = 'repaired_images.csv'
OUTPUT_FILE = 'tweak_with_matched_images.csv'

def sync_images():
    print(f"📂 Loading data...")
    tweak_df = pd.read_csv(TWEAK_FILE)
    repaired_df = pd.read_csv(REPAIRED_FILE)

    # We only need the 'name' and the 'matched_image_name' from the repaired file
    # This prevents column duplication (like having two 'description' columns)
    image_map = repaired_df[['name', 'matched_image_name']].drop_duplicates(subset=['name'])

    print(f"🔄 Matching images by product name...")
    
    # We perform a 'left' merge to keep every row in tweak.csv
    # and only add the image name where a match is found.
    final_df = pd.merge(
        tweak_df, 
        image_map, 
        on='name', 
        how='left'
    )

    # Optional: Fill missing matches with the original placeholder if needed
    # final_df['matched_image_name'] = final_df['matched_image_name'].fillna('placeholder.webp')

    print(f"💾 Saving merged data to {OUTPUT_FILE}")
    final_df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')
    
    # Summary
    matches = final_df['matched_image_name'].notna().sum()
    print(f"✅ Success! Matched {matches} out of {len(final_df)} products.")

if __name__ == "__main__":
    sync_images()