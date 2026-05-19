import requests

# Configuration
API_KEY = "d90ca88b502544448689620e1c38f37d"
HOST = "hijabibridal.github.io"

payload = {
    "host": HOST,
    "key": API_KEY,
    "keyLocation": f"https://{HOST}/{API_KEY}.txt",
    "urlList": [
        f"https://{HOST}/",
        f"https://{HOST}/shop",
        # Add any newly updated product URLs or static paths here
    ]
}

url = "https://api.indexnow.org/indexnow"
headers = {"Content-Type": "application/json; charset=utf-8"}

response = requests.post(url, json=payload, headers=headers)

if response.status_code == 200:
    print("Success: URLs submitted successfully to IndexNow!")
else:
    print(f"Failed with Status Code {response.status_code}: {response.text}")