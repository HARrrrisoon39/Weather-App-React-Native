import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
const api = {
  key: "baa68b05f7e7b70aa43dba57b4814259",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (text) => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchbox}
        onChangeText={(text) => setQuery(text)}
        value={query}
      />
      <Button
        onPress={search}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text style={styles.loca}>{dateBuilder(new Date())}</Text>
      <View style={styles.location}>
        {typeof weather.main != "undefined" && (
          <Text style={styles.loca}>
            {weather.name},{weather.sys.country}
          </Text>
        )}
        {typeof weather.main != "undefined" && (
          <Text style={styles.loca}>{weather.weather[0].main}</Text>
        )}
        {typeof weather.main != "undefined" && (
          <Text style={styles.loca}>{Math.round(weather.main.temp)}°c</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchbox: {
    display: "block",
    width: "100%",
    padding: "15px",
    appearance: "none",
    border: "none",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: "0px 0px 16px 16px",
    marginTop: "-25px",
    margin: "10px",
    boxShadow: "0px 5px rgba(0, 0, 0, 0.2)",
    color: "#313131",
    fontSize: "30px",
    transition: "0.4s ease",
    textAlign: "center",
  },
  location: {
    color: "black",
    fontSize: "20px",
    fontWeight: "300",
    fontStyle: "italic",
    textAlign: "center",
    textShadow: "2px 2px rgba(50, 50, 70, 0.5)",
  },
  loca: {
    position: "relative",
    display: "inline-block",
    margin: "30px auto",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "16px",
    padding: "15px 25px",
    color: "black",
    fontSize: "50px",
    fontWeight: "900",
    textShadow: "3px 6px rgba(50, 50, 70, 0.5)",
    textAlign: "center",
    boxShadow: "3px 6px rgba(0, 0, 0, 0.2)",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    
  },
});
