import requests

my_token = "patAzsxrRzVION6oy.664718e81f8bf96bab36f75b601901afb63fecc7134755ca42024c789ba0a83a"
my_base_id = "app2uL0OOBrrelAnk"
table_id = "tblkmHoCD9rAQw1Hi"

url = f"https://api.airtable.com/v0/{my_base_id}/{table_id}"

headers = {
    "Authorization": f"Bearer {my_token}"}

response = requests.get(url, headers=headers)
data = response.json()

for record in data["records"]:
    print(record["fields"])
print("Total records:", len(data["records"]))
