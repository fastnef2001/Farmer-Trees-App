/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import Geolocation from '@react-native-community/geolocation';

import Icon01d from '../../assets/weather/01d.json';
import Icon01n from '../../assets/weather/01n.json';
import Icon02d from '../../assets/weather/02d.json';
import Icon02n from '../../assets/weather/02n.json';
import Icon03d from '../../assets/weather/03d.json';
import Icon03n from '../../assets/weather/03n.json';
import Icon04d from '../../assets/weather/04d.json';
import Icon04n from '../../assets/weather/04n.json';
import Icon09d from '../../assets/weather/09d.json';
import Icon09n from '../../assets/weather/09n.json';
import Icon10d from '../../assets/weather/10d.json';
import Icon10n from '../../assets/weather/10n.json';
import Icon11n from '../../assets/weather/11n.json';
import Icon13d from '../../assets/weather/13d.json';
import Icon13n from '../../assets/weather/13n.json';
import Icon50d from '../../assets/weather/50d.json';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchLocationData = () => {
    Geolocation.getCurrentPosition(info => {
      const { latitude, longitude } = info.coords;
      console.log('latitude', latitude);
      fetchWeatherData(latitude, longitude);
    });
  };

  const fetchWeatherData = (lat: number | null, long: number | null) => {
    console.log('lat', lat);
    console.log('long', long);
    if (lat !== null && long !== null) {
      const apiKey = '37d19e0d00708a94ead8ddd20fba44ff';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => setWeatherData(data))
        .catch(error => console.error('Error fetching weather data:', error));
    }
  };

  useEffect(() => {
    fetchLocationData();
    const intervalId = setInterval(() => {
      fetchLocationData();
    }, 20000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (!weatherData) {
    return (
      <LottieView
        style={{ width: 50, height: 50, alignSelf: 'center' }}
        source={require('../../assets/animations/Loading11.json')}
        autoPlay
        loop
      />
    );
  }

  const temperature = weatherData.main.temp;
  const temperatureC = Math.floor(temperature - 273.15);
  const weatherDescription = weatherData.weather[0].description
    .split(' ')
    .map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  const windSpeed = weatherData.wind.speed;
  const humidity = weatherData.main.humidity;
  const pressure = weatherData.main.pressure;
  const cityName = weatherData.name;
  const country = weatherData.sys.country;

  interface WeatherIcon {
    nm: string;
    ddd: number;
    h: number;
    w: number;
    meta: {
      g: string;
    };
  }

  const iconMappings: { [key: string]: WeatherIcon } = {
    '01d': Icon01d,
    '01n': Icon01n,
    '02d': Icon02d,
    '02n': Icon02n,
    '03d': Icon03d,
    '03n': Icon03n,
    '04d': Icon04d,
    '04n': Icon04n,
    '09d': Icon09d,
    '09n': Icon09n,
    '10d': Icon10d,
    '10n': Icon10n,
    '11d': Icon11n,
    '11n': Icon11n,
    '13d': Icon13d,
    '13n': Icon13n,
    '50d': Icon50d,
    '50n': Icon50d,
  };

  const iconWeather = weatherData.weather[0].icon;
  const WeatherIcon = iconMappings[iconWeather];
  console.log('WeatherIcon', iconWeather);

  //lấy ngày tháng năm

  //   console.log('weatherData', weatherData);
  //   const intervalId = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 60000);

  //   // lấy 5:23 pm Jan 1 không lấy năm

  //   const currentDate = currentDateTime.toLocaleTimeString('en-US', {
  //     hour: 'numeric',
  //     minute: 'numeric',
  //     hour12: true,
  //     month: 'short',
  //     day: 'numeric',
  //   });

  return (
    <View style={styles.root}>
      <View style={styles.weatherLeft}>
        {/* <Text style={styles.textTime}>{currentDate}</Text> */}
        {cityName === 'Turan' ? (
          <Text style={styles.textLocation}>Da Nang, {country}</Text>
        ) : (
          <Text style={styles.textLocation}>
            {cityName}, {country}
          </Text>
        )}
        <Text style={styles.textWeather}>{weatherDescription} </Text>
      </View>

      <View style={styles.weatherRight}>
        <View style={styles.iconWeather}>
          <LottieView
            source={WeatherIcon as any}
            autoPlay
            loop
            style={{ width: 45, height: 45 }}
          />
          <Text style={styles.textTemperature}>{temperatureC}°C</Text>
        </View>

        <View>
          <View style={styles.a}>
            <Text style={styles.b}>Wind</Text>
            <Text style={styles.c}>{windSpeed} m/s</Text>
          </View>
          <View style={styles.a}>
            <Text style={styles.b}>Humidity</Text>
            <Text style={styles.c}>{humidity} %</Text>
          </View>
          <View style={styles.a}>
            <Text style={styles.b}>Pressure</Text>
            <Text style={styles.c}>{pressure} hPa</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WeatherComponent;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 8,
    justifyContent: 'space-between',
    borderRadius: 12,
    marginTop: 8,
    alignSelf: 'center',
    width: '95%',
  },

  weatherLeft: {
    width: 134,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 4,
  },
  textTime: {
    fontFamily: 'Nunito',
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#636366',
  },
  textLocation: {
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#163859',
    fontFamily: 'Nunito-Bold',
  },
  textWeather: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#636366',
    fontFamily: 'Nunito-Medium',
  },

  a: {
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  b: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#636366',
    width: 68,
    marginRight: 8,
    fontFamily: 'Nunito-Medium',
  },
  c: {
    fontSize: 14,
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#252525',
    fontFamily: 'Nunito-SemiBold',
  },

  textTemperature: {
    fontSize: 18,
    lineHeight: 20,
    letterSpacing: 0,
    color: '#252525',
    fontFamily: 'Nunito-Bold',
  },
  iconWeather: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 16,
  },
  weatherRight: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
