import * as React from 'react';
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

const Stack = createNativeStackNavigator();

function Dashboard() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Dashboard Screen</Text>
      <View
        style={{
          shadowColor: 'gray',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.8,
          shadowRadius: 2,
          width: '90%',
        }}>
        <View
          style={{
            borderRadius: 10,
            overflow: 'hidden',
            borderColor: 'white',
            borderWidth: 0.3,
            backgroundColor: 'white',
            elevation: 5,
            marginVertical: 10,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '500',
              paddingVertical: 10,
            }}>
            Welcome to Trapp..{' '}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
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
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Welcome',
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'darkorange',
            },
            headerBackVisible: false,
          }}
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
