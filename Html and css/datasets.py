import matplotlib.pyplot as plt

weather = [
    {"day": "Mon", "temp": 85},
    {"day": "Tue", "temp": 90},
    {"day": "Wed", "temp": 88},
    {"day": "Thu", "temp": 93},
    {"day": "Fri", "temp": 87},
]

days = [entry["day"] for entry in weather]
temps = [entry["temp"] for entry in weather]

plt.boxplot(weather)


plt.title("Weekly Temperatures")
plt.xlabel("Day")
plt.ylabel("Temperature (°F)")

plt.show()