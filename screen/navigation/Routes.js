import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../teacher/SignUp';
import MainScreen from '../MainScreen';
import LogIn from '../recruiter/LogIn';
import RSignUp from '../recruiter/SignUp';
import RLogIn from '../recruiter/LogIn';
import TLogIn from '../teacher/LogIn';
import TSignUp from '../teacher/SignUp';
import Home from '../teacher/Home';
import Account from '../teacher/Account';
import Dashboard from '../teacher/Dashboard';
import Auth from '@react-native-firebase/auth';
import SplashScreen from '../SplashScreen';
import ImageUpload from '../teacher/ImageUpload';
import Profile from '../teacher/Profile';
import Documents from '../teacher/Documents';

const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#833471',
            },
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="TLogIn"
          component={TLogIn}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="TSignUp"
          component={TSignUp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            title: 'Welcome Teacher',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'skyblue',
            },
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Welcome',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: '#01b7a9',
            },
            headerBackVisible: false,
          }}
        />

        <Stack.Screen
          name="My Profile"
          component={Profile}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="My Documents"
          component={Documents}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Documents Upload"
          component={ImageUpload}
          options={{headerShown: true}}
        />

        {/* Recruiter */}
        <Stack.Screen
          name="RLogIn"
          component={RLogIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RSignUp"
          component={RSignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Account"
          component={Account}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
