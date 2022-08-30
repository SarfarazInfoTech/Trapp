import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Avatar} from 'react-native-paper';
import {teacherImage, teacherLogo, pic, logout} from '../data/data.json';

const Account = ({navigation}) => {
  const accountdetails = [
    {
      id: '1',
      icon: 'account',
      name: 'Profile',
      routes: 'Profile',
    },
    {
      id: '2',
      icon: 'account-edit',
      name: 'Edit profile',
      routes: '',
    },
    {
      id: '3',
      icon: 'heart-multiple',
      name: 'Likes',
      routes: '',
    },
    {
      id: '4',
      icon: 'notebook',
      name: 'Notebook',
      routes: '',
    },
    {
      id: '5',
      icon: 'download',
      name: 'Download',
      routes: '',
    },
    {
      id: '6',
      icon: 'cog',
      name: 'Settings',
      routes: 'Setting',
    },
    {
      id: '7',
      icon: 'weather-night',
      name: 'Night mode',
      routes: '',
    },
    {
      id: '8',
      icon: 'power',
      name: 'Logout',
      routes: 'Login',
    },
  ];

  return (
    <View style={{backgroundColor: '#01b7a9'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: 'white',
            paddingBottom: 25,
            marginBottom: 1,
          }}>
          <Text style={{fontWeight: '700', margin: 15}}>Profile Image</Text>
          <TouchableOpacity>
            <Avatar.Image
              style={{alignSelf: 'center'}}
              source={{
                uri: teacherLogo,
              }}
              size={130}
            />
          </TouchableOpacity>
        </View>

        {accountdetails.map(({id, icon, name, routes}) => (
          <TouchableOpacity
            key={id}
            onPress={() => navigation.navigate(routes)}>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                marginBottom: 1,
                paddingHorizontal: 5,
                paddingVertical: 5,
                backgroundColor: 'white',
              }}>
              <Avatar.Image
                style={{backgroundColor: 'skyblue', margin: 5}}
                // icon={icon}
                size={40}
                source={{
                  uri: teacherLogo,
                }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  marginHorizontal: 15,
                  alignSelf: 'center',
                }}>
                {name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Account;
