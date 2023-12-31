/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegistrationScreen from '../screens/Login/Registration.screen';
import LoginScreen from '../screens/Login/Login.screen';
import ChatAIScreen from '../screens/ChatAI/ChatAI.screen';
import Statistics from '../screens/Statistics/Statistics.screen';
import Profile from '../screens/Profile/Profile.screen';
import AddTree from '../screens/Setupfarm/Addtree.screen';
import Farmname from '../screens/Setupfarm/Farmname.screen';
import YourFarm from '../screens/YourFarm/YourFarm.screen';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import IncomeHistory from '../screens/Statistics/IncomeHistory.screen';
import ExpenseHistory from '../screens/Statistics/ExpenseHistory.screen';
import InforPayment from '../screens/Payment/InforPayment.screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 60, paddingBottom: 16, paddingTop: 10 },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#163859',
        tabBarInactiveTintColor: '#636366',
        tabBarIcon: () => null,
        tabBarLabel: ({ focused }) => {
          const isSelected = focused;
          const borderBottomWidth = isSelected ? 2 : 0;
          const borderColor = isSelected ? '#163859' : 'transparent';
          const colorText = isSelected ? '#163859' : '#636366';

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
                  style={{
                    color: colorText,
                    textAlign: 'center',
                    fontFamily: 'Nunito-Bold',
                  }}>
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
        component={Statistics}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Chat AI"
        component={ChatAIScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const user = auth().currentUser;
  console.log('user', user);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen
              name="Tabs"
              options={{ headerShown: false }}
              component={MyTabs}
            />
            <Stack.Screen
              name="LoginScreen"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginScreen"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="Tabs"
              options={{ headerShown: false }}
              component={MyTabs}
            />
          </>
        )}

        <Stack.Screen
          name="RegistrationScreen"
          options={{ headerShown: false }}
          component={RegistrationScreen}
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
          name="Profile"
          options={{ headerShown: false }}
          component={Profile}
        />
        <Stack.Screen
          name="IncomeHistory"
          options={{ headerShown: false }}
          component={IncomeHistory}
        />
        <Stack.Screen
          name="ExpenseHistory"
          options={{ headerShown: false }}
          component={ExpenseHistory}
        />
        <Stack.Screen
          name="InforPayment"
          options={{ headerShown: false }}
          component={InforPayment}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
