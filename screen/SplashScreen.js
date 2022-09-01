import React, {useEffect, useState} from 'react';
import {View, Text, Image} from 'react-native';
import Auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import {splashimage} from './data/data.json';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(async () => {
      const unSubscribe = await Auth().onAuthStateChanged(user => {
        const routeName = user !== null ? 'Home' : 'MainScreen';
        // unSubscribe();
        navigation.dispatch(StackActions.replace(routeName));
      });
    }, 2000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Image
        source={{
          uri: splashimage,
        }}
        style={{
          width: 120,
          height: 120,
        }}
      />
    </View>
  );
}
