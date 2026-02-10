import os
import csv
import json
import re
from contextlib import contextmanager

# CONFIGURATION
DEFAULT_COLOR = "#FFAC1C"
OUTPUT_FILE = "internal-links.json"
REQUIRED_COLUMNS = ['id', 'text', 'url']  # Only require essential columns

def clean_value(value):
    """Remove extra quotes/whitespace but preserve content"""
    return str(value).strip().strip('"') if value else ""

def process_text_with_links(text, url):
    """
    Replaces {{placeholder}} in text with the actual URL
    Example: 
    "Learn about {{cats}}" → "Learn about /cats" (using the row's URL)
    """
    if not text or not url:
        return text
    return re.sub(r'\{\{.*?\}\}', url, text)

@contextmanager
def safe_file_handle(filepath, mode='r'):
    """Handle files safely with automatic cleanup"""
    file = None
    try:
        file = open(filepath, mode, encoding='utf-8')
        yield file
    finally:
        if file:
            file.close()

def process_file(filename, position):
    """Process CSV file with automatic {{placeholder}} resolution"""
    filepath = os.path.join(os.path.dirname(__file__), filename)
    links = []
    
    if not os.path.exists(filepath):
        print(f"❌ File not found: {filename}")
        return links
    
    try:
        with safe_file_handle(filepath) as f:
            reader = csv.DictReader(f)
            reader.fieldnames = [clean_value(name) for name in reader.fieldnames]
            
            missing_cols = [col for col in REQUIRED_COLUMNS if col not in reader.fieldnames]
            if missing_cols:
                print(f"❌ {filename} missing required columns: {', '.join(missing_cols)}")
                print(f"Found columns: {', '.join(reader.fieldnames)}")
                return links
                
            for row in reader:
                if not all(row.get(col) for col in REQUIRED_COLUMNS):
                    print(f"⚠️ Skipping row - missing required data: {row}")
                    continue
                
                # Clean basic values
                row_id = clean_value(row['id'])
                row_url = clean_value(row['url'])
                row_text = clean_value(row['text'])
                row_style = clean_value(row.get('style', DEFAULT_COLOR))
                
                # Process text with placeholders
                processed_text = process_text_with_links(row_text, row_url)
                
                links.append({
                    'id': row_id,
                    'text': processed_text,
                    'url': row_url,
                    'style': row_style,
                    'position': position
                })
                
    except Exception as e:
        print(f"❌ Error processing {filename}: {str(e)}")
    
    return links

def main():
    all_links = []
    all_links += process_file("top-links.csv", "top")
    all_links += process_file("bottom-links.csv", "bottom")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(all_links, f, indent=2, ensure_ascii=False)
    
    print(f"\n✅ Successfully processed {len(all_links)} links")
    print(f"Output saved to: {os.path.abspath(OUTPUT_FILE)}")

if __name__ == "__main__":
    main()