import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home/Home.screen';
import RegistrationScreen from '../screens/Login/Registration.screen';
import LoginScreen from '../screens/Login/Login.screen';
import ForgotPassword from '../screens/Password/ForgotPassword.sceen';
import Profile from '../screens/Profile/Profile.screen';
import OTPScreen from '../screens/Password/OTP.screen';
import ChangePassword from '../screens/Password/ChangePassword.screen';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Login"
        component={RegistrationScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <Icon name={'ios-home'} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <Icon name={'ios-home'} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }: any) => {
            return <Icon name={'ios-settings'} size={25} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen
          name="HomeBase"
          options={{ headerShown: false }}
          component={MyTabs}
        /> */}
        <Stack.Screen
          name="RegistrationScreen"
          options={{ headerShown: false }}
          component={RegistrationScreen}
        />
        <Stack.Screen
          name="LoginScreen"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          options={{ headerShown: false }}
          component={ForgotPassword}
        />
        <Stack.Screen
          name="OTPScreen"
          options={{ headerShown: false }}
          component={OTPScreen}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{ headerShown: false }}
          component={ChangePassword}
        />
        {/* add your another screen here using -> Stack.Screen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
