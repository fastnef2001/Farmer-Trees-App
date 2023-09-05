import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Statistics = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Statistics</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#163859',
  },
});

export default Statistics;
