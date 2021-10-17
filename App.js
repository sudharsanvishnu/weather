import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import DateItem from './components/Date';
import Weather from './components/Weather';
import * as Location from 'expo-location';


export default function App() {

  const [data, setData] = useState({});

  

  const fetchDataFromApi = (latitude, longitude) => {

    if(latitude && longitude){
      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setData(data);
      }) 
    }
  }
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        fetchDataFromApi("40.7128","-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

  const image = require('./assets/blu.jpg')
  return (    
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.img}>
        <StatusBar style="auto" />
        <DateItem current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
        <Weather weatherData={data.daily}/>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    resizeMode: 'contain',
    height: '100%',
  },
});
