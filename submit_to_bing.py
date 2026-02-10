import requests
import json

# Bing API Endpoint (replace with your API key)
BING_API_URL = "https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=7abf5af94ecf4746b7feea1bfe205e5f"

# JSON Payload (same as your request)
payload = {
    "siteUrl": "https://petgadgetinsider.org",
    "urlList": [
        "https://petgadgetinsider.org/blog/precision-feeding-automatic-dog-food-feeders-with-timers",
    	"https://petgadgetinsider.org/blog/staying-connected-two-way-audio-automatic-dog-feeders",
    	"https://petgadgetinsider.org/blog/smart-feeding-personal-touch-automatic-dog-feeders-voice-recording",
    	"https://petgadgetinsider.org/blog/whisker-friendly-automatic-dog-food-feeders",
    	"https://petgadgetinsider.org/blog/bluetooth-enabled-automatic-dog-food-feeders",
    	"https://petgadgetinsider.org/blog/usb-powered-automatic-dog-food-feeders",
    	"https://petgadgetinsider.org/blog/wifi-enabled-automatic-dog-food-feeders",
    	"https://petgadgetinsider.org/blog/battery-powered-automatic-dog-food-feeders",
    	"https://petgadgetinsider.org/blog/corded-electric-automatic-dog-food-feeders",
    	"https://petgadgetinsider.org/blog/best-pet-trackers-for-dogs-and-cats",
    	"https://petgadgetinsider.org/blog/best-pet-cameras-on-amazon",
    	"https://petgadgetinsider.org/blog/heres-why-you-need-a-cat-camera-collar",
    	"https://petgadgetinsider.org/blog/the-top-dog-doors-on-amazon",
    	"https://petgadgetinsider.org/blog/top-rated-cat-doors-on-amazon",
    	"https://petgadgetinsider.org/blog/top-10-interactive-smart-toys-for-cats",
    	"https://petgadgetinsider.org/blog/top-10-interactive-smart-toys-for-dogs",
    	"https://petgadgetinsider.org/blog/top-10-best-pet-treat-dispensers-on-amazon",
    	"https://petgadgetinsider.org/blog/best-automatic-dog-fountains-on-amazon",
    	"https://petgadgetinsider.org/blog/automatic-dog-food-feeders-for-large-dogs",
    	"https://petgadgetinsider.org/blog/heavy-duty-automatic-dog-feeder",
    	"https://petgadgetinsider.org/blog/heavy-duty-automatic-dog-feeder-with-timer",
    	"https://petgadgetinsider.org/blog/best-automatic-cat-feeder-july-2025",
    	"https://petgadgetinsider.org/blog/automatic-dog-feeder-and-water",
    	"https://petgadgetinsider.org/blog/automatic-dog-feeder-and-water-with-timer",
    	"https://petgadgetinsider.org/blog/automatic-cat-feeder-with-water"
    ]
}

# Headers
headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Host": "ssl.bing.com"
}

# Submit to Bing API
try:
    response = requests.post(BING_API_URL, headers=headers, data=json.dumps(payload))
    response.raise_for_status()  # Raise error if HTTP request fails
    print("Success! Bing API Response:", response.json())
except requests.exceptions.RequestException as e:
    print("Error submitting to Bing:", e)