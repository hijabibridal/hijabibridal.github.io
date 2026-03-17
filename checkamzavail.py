import json
import time
from datetime import datetime
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# --- CONFIGURATION ---
INPUT_FILE = 'src/data/bridal-products.json'
OUTPUT_FILE = 'src/data/bridal-products-verified.json'

def check_amazon_availability():
    try:
        with open(INPUT_FILE, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: {INPUT_FILE} not found.")
        return

    # Handle both a direct list or a category object containing a list
    if isinstance(data, dict):
        # Your category JSONs usually have products in an 'items' or 'products' key
        # If the structure is a single product, we wrap it in a list
        products_list = data.get('items', data.get('products', [data] if 'slug' in data else []))
    else:
        products_list = data

    if not products_list:
        print("No products found in the JSON file.")
        return

    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    
    for index, product in enumerate(products_list):
        # This will now correctly target the product dictionary
        slug = product.get('slug', 'no-slug')
        is_groom = "groom" in slug.lower() or "groom" in str(product.get('mainCategorySlugs', [])).lower()
        
        # Collect unique Amazon links
        all_links = []
        if product.get('amazonLink'):
            all_links.append(product['amazonLink'])
        
        for img in product.get('images', []):
            link = img.get('amazonLink')
            if link and link not in all_links:
                all_links.append(link)

        # Logic: Check all for groom, only the first for others
        links_to_check = all_links if is_groom else all_links[:1]

        if not links_to_check:
            print(f"⏩ Index {index} ({slug}): No link found.")
            product['Availability_Status'] = "No Link"
            continue

        print(f"🔍 Checking Index {index}: {slug}...")
        
        current_results = []
        for url in links_to_check:
            try:
                driver.get(url)
                try:
                    WebDriverWait(driver, 5).until(
                        lambda d: d.find_element(By.ID, "availability") or d.find_element(By.ID, "outOfStock")
                    )
                except:
                    pass 

                soup = BeautifulSoup(driver.page_source, 'html.parser')
                out_of_stock = soup.find(id="outOfStock")
                availability = soup.find(id="availability")
                
                text_to_check = (out_of_stock.text if out_of_stock else "") + (availability.text if availability else "")
                
                if "currently unavailable" in text_to_check.lower():
                    current_results.append("🔴 Out of Stock")
                else:
                    current_results.append("✅ Available")
            except:
                current_results.append("Error")
            
            time.sleep(2)

        product['Availability_Status'] = ", ".join(current_results)
        product['Last_Checked'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Save the full data structure back to JSON
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(data, f, indent=2)
    
    driver.quit()
    print(f"\nDone! Updated file saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    check_amazon_availability()