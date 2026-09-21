import requests
import os
import time

api_key = "aaea407d299346a291e204826250612"
city = input("Enter a city: ")

url = f"https://api.weatherapi.com/v1/current.json?key={api_key}&q={city}"

response = requests.get(url)
data = response.json()

print("City:", data["location"]["name"])
print("Temperature:", data["current"]["temp_f"], "°F")
print("Condition:", data["current"]["condition"]["text"])
print("Humidity:", data["current"]["humidity"], "%")
print("Wind:", data["current"]["wind_mph"], "mph")
time.sleep(10)
os.system("clear")