import pandas as pd
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# --- CONFIGURATION ---
INPUT_FILE = 'catalog_products.csv'
OUTPUT_FILE = 'catalog_products_verified.csv'
COLUMN_INDEX = 20  # Double check this with find_index.py!

def extract_url(html_content):
    if pd.isna(html_content) or "<a" not in str(html_content):
        return None
    try:
        soup = BeautifulSoup(str(html_content), 'html.parser')
        link_tag = soup.find('a')
        return link_tag.get('href') if link_tag else None
    except:
        return None

def check_amazon_availability():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)

    try:
        df = pd.read_csv(INPUT_FILE)
        print(f"✅ Loaded {len(df)} rows.")
    except Exception as e:
        print(f"❌ Error: {e}")
        return

    statuses = []

    for index, row in df.iterrows():
        raw_html = row.iloc[COLUMN_INDEX] 
        url = extract_url(raw_html)
        
        if not url:
            statuses.append("No Link")
            continue

        try:
            driver.get(url)
            
            # 1. Wait up to 10 seconds for EITHER the Buy Box OR the OutOfStock div
            # This is more accurate than a static sleep
            try:
                WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.ID, "availability")) or 
                    EC.presence_of_element_located((By.ID, "outOfStock"))
                )
            except:
                pass # Continue anyway if it times out

            # 2. Specifically target the div you found
            page_source = driver.page_source
            soup = BeautifulSoup(page_source, 'html.parser')
            
            out_of_stock_div = soup.find(id="outOfStock")
            availability_div = soup.find(id="availability")
            
            is_unavailable = False
            
            if out_of_stock_div and "currently unavailable" in out_of_stock_div.text.lower():
                is_unavailable = True
            elif availability_div and "currently unavailable" in availability_div.text.lower():
                is_unavailable = True
            
            if is_unavailable:
                print(f"🔴 Row {index}: OUT OF STOCK")
                statuses.append("🔴")
            else:
                print(f"✅ Row {index}: Available")
                statuses.append("Available")
                
        except Exception as e:
            print(f"⚠️ Error row {index}: {e}")
            statuses.append("Error")
        
        time.sleep(2) # Prevent throttling

    df['Availability_Status'] = statuses
    df.to_csv(OUTPUT_FILE, index=False)
    driver.quit()
    print(f"\nFinished! Saved to {OUTPUT_FILE}")

if __name__ == "__main__":
    check_amazon_availability()