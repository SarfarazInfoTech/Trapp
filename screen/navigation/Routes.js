import React, {useState} from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {logOutIcon, profileEditIcon} from '../data/data.json';
import MainScreen from '../MainScreen';
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
import EditProfile from '../teacher/EditProfile';
import Academic from '../teacher/Academic';
import Career from '../teacher/Career';
import OtpLogin from '../teacher/OtpLogin';

const Stack = createNativeStackNavigator();
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="OtpLogin"
          component={OtpLogin}
          options={{headerShown: false}}
        /> */}

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
          name="Account"
          component={Account}
          options={{
            headerShown: true,
            headerRight: () => (
              <TouchableOpacity onPress={() => Auth().signOut()}>
                <Image
                  style={{backgroundColor: 'white', height: 35, width: 35}}
                  source={{
                    uri: logOutIcon,
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Academic"
          component={Academic}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="Career"
          component={Career}
          options={{headerShown: true}}
        />

        <Stack.Screen
          name="My Profile"
          component={Profile}
          options={{
            headerShown: true,

            headerRight: () => (
              <TouchableOpacity
                onPress={() => alert('Please click EDIT PROFILE button.')}>
                <Image
                  style={{
                    backgroundColor: 'white',
                    height: 40,
                    width: 40,
                    left: 10,
                  }}
                  source={{
                    uri: profileEditIcon,
                  }}
                />
              </TouchableOpacity>
            ),
          }}
        />

        <Stack.Screen
          name="Edit Profile"
          component={EditProfile}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
