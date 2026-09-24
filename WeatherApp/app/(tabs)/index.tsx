import React, { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
 } from "react-native";

interface AirQuality {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  ["us-epa-index"]: number;
  ["gb-defra-index"]: number;
}

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_f: number;
    humidity: number;
    wind_mph: number;
    condition: { text: string };
    air_quality: AirQuality;
  };
}

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [cityId, setCityId] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [neighbors, setNeighbors] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const fetchWeatherAndNeighbors = async () => {
    try {
      setError("");

      setNeighbors([]);
      setWeather(null);
      setCityId("");

      if (!city.trim()) {
        setError("Please enter a city name");
        return;
      }

      //
      // --- WEATHER API CALL ---
      //
      const apiKey = "aaea407d299346a291e204826250612";
      const weatherURL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(
        city
      )}&aqi=yes`;

      const weatherResponse = await fetch(weatherURL);
      const weatherData = await weatherResponse.json();

      if (weatherData.error) {
        setError(weatherData.error.message);
        return;
      }

      setWeather(weatherData);

      //
      // --- GEODB: Get City ID From Name ---
      //
      const geoSearchURL = `https://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=${encodeURIComponent(
        city
      )}&limit=1`;

      const geoSearchResp = await fetch(geoSearchURL);
      const geoSearchData = await geoSearchResp.json();

      if (!geoSearchData.data || geoSearchData.data.length === 0) {
        setError("City found for weather, \n\ but not for neighboring cities ");
        return;
      }

      const cityId = geoSearchData.data[0].id;
      setCityId(cityId);

      //
      // --- GEODB: Get Nearby Cities ---
      //
      const neighborsURL = `https://geodb-free-service.wirefreethought.com/v1/geo/cities/${cityId}/nearbyCities?radius=100&limit=10`;

      const neighborsResp = await fetch(neighborsURL);
      const neighborsData = await neighborsResp.json();

      setNeighbors(neighborsData.data || []);
    } catch (err) {
      setError("An error occurred");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Text style={styles.title}>Weather & Neighboring Cities</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name (e.g. New Delhi)"
        value={city}
        onChangeText={setCity}
      />

      <Button
        title="Get Weather & Neighboring Cities"
        onPress={fetchWeatherAndNeighbors}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* TWO COLUMN LAYOUT */}
      {(weather || neighbors.length > 0) && (
        <View style={styles.row}>
          
          {/* LEFT: WEATHER */}
          
          <View style={styles.leftColumn}>
            {weather && (
              
          <View>
              <View>
                  <Text style={styles.neighborTitle}>Weather </Text>
              </View>

              <View style={styles.weatherBox}>
                
                <Text style={styles.city}>{weather.location.name}</Text>
                <Text style={styles.temp}>{weather.current.temp_f}°F</Text>
                <Text style={styles.desc}>
                  {weather.current.condition.text}
                </Text>

                <Text>Humidity: {weather.current.humidity}%</Text>
                <Text>Wind: {weather.current.wind_mph} mph</Text>

                {/* Air Quality */}
                <View style={{ marginTop: 15 }}>
                  <Text style={styles.aqiTitle}>Air Quality (AQI)</Text>
                  <Text>
                    US EPA Index:{" "}
                    {weather.current.air_quality["us-epa-index"]}
                  </Text>
                  <Text>PM2.5: {weather.current.air_quality.pm2_5}</Text>
                  <Text>PM10: {weather.current.air_quality.pm10}</Text>
                  <Text>CO: {weather.current.air_quality.co}</Text>
                  <Text>NO₂: {weather.current.air_quality.no2}</Text>
                  <Text>O₃: {weather.current.air_quality.o3}</Text>
                  <Text>SO₂: {weather.current.air_quality.so2}</Text>
                </View>
              </View>
              </View>
            )}
          </View>

          {/* RIGHT: NEIGHBORING CITIES */}
          <View style={styles.rightColumn}>
            <Text style={styles.neighborTitle}>Nearby Cities </Text>
            <ScrollView style={{ maxHeight: 350 }}>
              {neighbors.map((c, index) => (
                <View key={index} style={styles.neighborItem}>
                  <Text style={styles.neighborName}>{c.city}</Text>
                  <Text style={styles.neighborSub}>
                    {c.region}, {c.country}
                  </Text>
                  <Text style={styles.neighborDist}>
                    {c.distance} km away
                  </Text>
                </View>
              ))}
            </ScrollView>
            <Text style={styles.neighborSub}>City Id: {cityId} </Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default WeatherApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    marginTop: 20,
  },
  leftColumn: {
    flex: 1,
    marginRight: 10,
  },
  rightColumn: {
    flex: 1,
    marginLeft: 10,
  },
  weatherBox: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  city: { fontSize: 22, fontWeight: "bold" },
  temp: { fontSize: 40, marginVertical: 10 },
  desc: { fontSize: 18, fontStyle: "normal" },
  aqiTitle: { fontSize: 20, marginBottom: 5, fontWeight: "600" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
  neighborTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  neighborItem: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  neighborName: { fontSize: 18, fontWeight: "600" },
  neighborSub: { fontSize: 14, color: "#555" },
  neighborDist: { fontSize: 14, color: "#888" },
});
