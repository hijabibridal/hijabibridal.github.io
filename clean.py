import pandas as pd
import re

# --- CONFIG ---
INPUT_FILE = 'tweak_with_faq_schema.csv'
OUTPUT_FILE = 'tweak_with_faq_schema_cleaned.csv'
COL_NAME = 'FAQ schema with PAA'

# Load your data
df = pd.read_csv(INPUT_FILE)

def remove_spo_labels(text):
    if pd.isna(text):
        return text
    # This regex looks for [AnyWord] and replaces it with nothing
    # It handles [Subject], [Predicate], [Object], and lowercase versions
    cleaned_text = re.sub(r'\[\s*(Subject|Predicate|Object|subject|predicate|object)\s*\]', '', str(text))
    # Clean up any resulting double spaces
    cleaned_text = cleaned_text.replace('  ', ' ').strip()
    return cleaned_text

print(f"🧹 Cleaning SPO labels from {COL_NAME}...")

# Apply cleaning
df[COL_NAME] = df[COL_NAME].apply(remove_spo_labels)

# Save the result
df.to_csv(OUTPUT_FILE, index=False, encoding='utf-8-sig')

print(f"🏁 Done! Cleaned file saved as: {OUTPUT_FILE}")