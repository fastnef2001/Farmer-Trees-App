import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationScreen from '../screens/Login/Registration.screen';
import LoginScreen from '../screens/Login/Login.screen';
import ForgotPassword from '../screens/Password/ForgotPassword.sceen';
import Profile from '../screens/Home/Profile.screen';
import OTPScreen from '../screens/Password/OTP.screen';
import ChangePassword from '../screens/Password/ChangePassword.screen';
import Icon from 'react-native-vector-icons/Ionicons';
import AddTree from '../screens/Setupfarm/Addtree.screen';
import Farmname from '../screens/Setupfarm/Farmname.screen';
import YourFarm from '../screens/Home/YourFarm.screen';
import { Text, View } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 60, paddingBottom: 16, paddingTop: 10 },
        tabBarLabelStyle: { fontSize: 12 }, // Kích thước chữ
        tabBarActiveTintColor: '#163859', // Màu khi tab được chọn
        tabBarInactiveTintColor: '#636366', // Màu khi tab không được chọn
        tabBarIcon: () => null, // Loại bỏ biểu tượng
        tabBarLabel: ({ focused }) => {
          const isSelected = focused;
          const borderBottomWidth = isSelected ? 2 : 0; // Độ dày thanh ngang khi tab được chọn
          const borderColor = isSelected ? '#163859' : 'transparent'; // Màu thanh ngang khi tab được chọn
          const colorText = isSelected ? '#163859' : '#636366';
          const fontWeight = isSelected ? 'bold' : 'normal'; // Kiểu chữ in đậm khi tab được chọn

          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderBottomWidth,
                  borderColor,
                  width: 90,
                  paddingBottom: 5,
                }}>
                <Text
                  style={{ color: colorText, fontWeight, textAlign: 'center' }}>
                  {route.name}
                </Text>
              </View>
            </View>
          );
        },
      })}>
      <Tab.Screen
        name="YourFarm"
        component={YourFarm}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={YourFarm}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat AI"
        component={YourFarm}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LoginScreen"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="RegistrationScreen"
        options={{ headerShown: false }}
        component={RegistrationScreen}
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
      <Stack.Screen
        name="AddTree"
        options={{ headerShown: false }}
        component={AddTree}
      />
      <Stack.Screen
        name="Farmname"
        options={{ headerShown: false }}
        component={Farmname}
      />
      <Stack.Screen
        name="YourFarm"
        options={{ headerShown: false }}
        component={YourFarm}
      />
      <Stack.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={Profile}
      />
      {/* add your another screen here using -> Stack.Screen */}
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="RegistrationScreen"
          options={{ headerShown: false }}
          component={RegistrationScreen}
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
        <Stack.Screen
          name="AddTree"
          options={{ headerShown: false }}
          component={AddTree}
        />
        <Stack.Screen
          name="Farmname"
          options={{ headerShown: false }}
          component={Farmname}
        />
        <Stack.Screen
          name="YourFarm"
          options={{ headerShown: false }}
          component={YourFarm}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name="Tabs"
          options={{ headerShown: false }}
          component={MyTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
