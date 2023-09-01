import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './navigation/navigation';
import { Provider } from 'react-redux';
import { store } from './stores/index';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  const user = auth().currentUser;

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
