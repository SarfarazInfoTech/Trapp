import React, {useState, useEffect} from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import {StackActions, useRoute} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

function Dashboard({navigation}) {
  // const route = useRoute();
  // const {email, uid} = route.params;

  const [Data, setData] = useState([]);
  useEffect(() => {
    const getDatabase = async () => {
      try {
        const data = await database().ref('user/1').once('value');
        console.log(data);
        setData(data.val());
      } catch (err) {
        console.log(err);
      }
    };

    getDatabase();
  }, []);



  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Dashboard Screen</Text>
      <TouchableOpacity
        onPress={async () => {
          await Auth().currentUser.signOut();
          navigation.dispatch(StackActions.replace('MainScreen'));
        }}
        style={{
          backgroundColor: 'red',
          color: 'white',
          width: '20%',
          alignSelf: 'center',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>Logout</Text>
      </TouchableOpacity>

      <Text>Email : {Auth().currentUser.email}</Text>
      <Text>User : {Auth().currentUser.uid}</Text>


      <View style={{width: '100%', height: 150}}>
          {/* <Image
            source={{
              uri: teacherImage,
            }}
            style={{
              width: '100%',
              height: 215,
              backgroundColor: 'white',
            }}
          /> */}
        </View>

        <View
          style={{
            borderColor: 'gray',
            backgroundColor: 'white',
            borderRadius: 5,
            margin: 15,
            alignSelf: 'flex-end',
            paddingHorizontal: 10,
            width: '70%',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.8,
            shadowRadius: 2,
          }}>
          <Text style={{fontSize: 18, color: 'darkgreen'}}>
            {/* {Data ? `Hey, ${Data.name} your Age is ${Data.age}` : 'Loading...'} */}
            {/* {Data ? Data.subject.map(list => ` ${list} `) : ""} */}
          </Text>
        </View>
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
            {/* Welcome {Data.name} */}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Dashboard;
