import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import IconWeather from '../../assets/images/IconWeather.svg';
import SvgUri from 'react-native-svg-uri';

import Icon01d from '../../assets/weather/01d.svg';
import Icon01n from '../../assets/weather/01n.svg';
import Icon02d from '../../assets/weather/02d.svg';
import Icon02n from '../../assets/weather/02n.svg';
import Icon03d from '../../assets/weather/03d.svg';
import Icon03n from '../../assets/weather/03n.svg';
import Icon04d from '../../assets/weather/04d.svg';
import Icon04n from '../../assets/weather/04n.svg';
import Icon09d from '../../assets/weather/09d.svg';
import Icon09n from '../../assets/weather/09n.svg';
import Icon10d from '../../assets/weather/10d.svg';
import Icon10n from '../../assets/weather/10n.svg';
import Icon11d from '../../assets/weather/11d.svg';
import Icon11n from '../../assets/weather/11n.svg';
import Icon13d from '../../assets/weather/13d.svg';
import Icon13n from '../../assets/weather/13n.svg';
import Icon50d from '../../assets/weather/50d.svg';
import Icon50n from '../../assets/weather/50n.svg';
import { SvgProps } from 'react-native-svg';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  //   const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const fetchWeatherData = () => {
    const apiUrl =
      'https://api.openweathermap.org/data/2.5/weather?lat=12.694572451604682&lon=108.06366419104278&appid=37d19e0d00708a94ead8ddd20fba44ff';
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error('Error fetching weather data:', error));
  };

  useEffect(() => {
    // Cập nhật thời tiết ban đầu khi component được render
    fetchWeatherData();

    // Cập nhật thời tiết mỗi phút
    const intervalId = setInterval(() => {
      fetchWeatherData();
    }, 60000);
    return () => {
      clearInterval(intervalId); // Hủy interval khi component bị unmount
    };
  }, []);

  if (!weatherData) {
    return <Text>Loading...</Text>;
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

  interface IconMappings {
    [key: string]: React.FC<SvgProps>;
  }

  const iconMappings: IconMappings = {
    '01d': Icon01d,
    '02d': Icon02d,
    '03d': Icon03d,
    '04d': Icon04d,
    '09d': Icon09d,
    '10d': Icon10d,
    '11d': Icon11d,
    '13d': Icon13d,
    '50d': Icon50d,
    '01n': Icon01n,
    '02n': Icon02n,
    '03n': Icon03n,
    '04n': Icon04n,
    '09n': Icon09n,
    '10n': Icon10n,
    '11n': Icon11n,
    '13n': Icon13n,
    '50n': Icon50n,
  };
  // Weather icon code
  const iconWeather = weatherData.weather[0].icon;

  // Get the corresponding SVG component from the mapping
  const WeatherIcon = iconMappings[iconWeather];

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
        <Text style={styles.textLocation}>
          {cityName}, {country}
        </Text>
        <Text style={styles.textWeather}>{weatherDescription} </Text>
      </View>

      <View style={styles.weatherRight}>
        <View style={styles.iconWeather}>
          <WeatherIcon width={40} height={40} />
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
    fontFamily: 'Nunito',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#163859',
  },
  textWeather: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#636366',
  },

  a: {
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
  },
  b: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#636366',
    width: 66,
    marginRight: 8,
  },
  c: {
    fontFamily: 'Nunito',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#252525',
  },

  textTemperature: {
    fontFamily: 'Nunito',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: 'left',
    color: '#252525',
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