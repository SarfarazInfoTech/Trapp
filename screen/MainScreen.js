import React from 'react';
import {View, Text, Button, Image} from 'react-native';
import {teacherLogo, recruiterLogo} from './data/data.json';

function MainScreen({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      <Text style={{color: 'green', fontSize: 19, fontWeight: '500'}}>
        Trapp Hai Na...
      </Text>
      <View
        style={{
          width: 160,
          borderBottomColor: 'green',
          borderBottomWidth: 2,
          marginVertical: 5,
        }}></View>
      <Text style={{color: 'gray', fontSize: 12, fontWeight: '500'}}>
        Tho Sab Aasan Hai
      </Text>
      <View style={{flexDirection: 'row', margin: 10, padding: 20}}>
        <View style={{flexDirection: 'column', marginHorizontal: 10}}>
          <Image
            source={{
              uri: teacherLogo,
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 10,
              marginVertical: 10,
              backgroundColor: 'skyblue',
            }}
          />
          <Text
            style={{
              color: 'green',
              fontSize: 15,
              fontWeight: '500',
              textAlign: 'center',
              marginVertical: 20,
            }}>
            Teacher Login
          </Text>

          <Button
            title="Login"
            color="green"
            onPress={() => navigation.navigate('TLogIn')}
          />
        </View>
        <View style={{flexDirection: 'column', marginHorizontal: 10}}>
          <Image
            source={{
              uri: recruiterLogo,
            }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 10,
              marginVertical: 10,
              backgroundColor: 'skyblue',
            }}
          />
          <Text
            style={{
              color: 'green',
              fontSize: 15,
              fontWeight: '500',
              textAlign: 'center',
              marginVertical: 20,
            }}>
            Recruiter Login
          </Text>

          <Button
            title="Login"
            color="green"
            onPress={() => navigation.navigate('RLogIn')}
          />
        </View>
      </View>
    </View>
  );
}

export default MainScreen;
