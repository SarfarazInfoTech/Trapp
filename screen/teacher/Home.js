import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {teacherImage, teacherLogo, pic, logout} from '../data/data.json';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [Data, setData] = useState('');
  useEffect(() => {
    const getDatabase = async () => {
      try {
        const user = await Auth().currentUser.email;
        const data = await firestore().collection('users').doc(`${user}`).get();
        // console.log(data._data.name, data._data.age, 'ki hai');
        setData(data._data);
      } catch (err) {
        console.log(err);
      }
    };

    getDatabase();
  }, []);

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            backgroundColor: '#01b7a9',
          }}>
          <View
            style={{
              shadowColor: 'gray',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              width: '80%',
            }}>
            <View
              style={{
                borderRadius: 10,
                overflow: 'hidden',
                borderColor: 'white',
                borderWidth: 0.3,
                backgroundColor: 'white',
                elevation: 5,
                marginVertical: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#01b7a9',
                  fontWeight: '500',
                  paddingVertical: 5,
                }}>
                Welcome {Data.name}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={async () => {
              await Auth().signOut();
              navigation.dispatch(StackActions.replace('MainScreen'));
            }}
            style={{alignSelf: 'center'}}>
            <Image
              source={{
                uri: logout,
              }}
              style={{width: 40, height: 40, alignSelf: 'center'}}
            />
          </TouchableOpacity>
        </View>

        {/*  */}

        {/* <View style={{width: '100%', height: 150}}>
          <Image
            source={{
              uri: teacherImage,
            }}
            style={{
              width: '100%',
              height: 215,
              backgroundColor: 'white',
            }}
          />
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
            {Data ? `Hey, ${Data.name} your Age is ${Data.age}` : 'Loading...'}
            {Data ? Data.subject.map(list => ` ${list} `) : ""}
          </Text>
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}>
          {pic.map(({icon, name, index, route}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(`${route}`)}
              activeOpacity={false}
              style={styles.shadowCard}
              key={index}>
              <View style={styles.card}>
                <Image
                  source={{
                    uri: icon,
                  }}
                  style={{
                    width: 150,
                    height: 135,
                    borderRadius: 10,
                    // backgroundColor: 'skyblue',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                    fontWeight: '500',
                    marginVertical: 5,
                  }}>
                  {name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {Data.status ? (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            bottom: -140,
            zIndex: 5,
          }}>
          <View
            style={{
              borderRadius: 5,
              elevation: 5,
              height: 40,
              width: '100%',
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor:
                Data.status === 'approved'
                  ? 'green'
                  : Data.status === 'rejected'
                  ? 'gray'
                  : 'orange',
            }}>
            <Text
              style={{
                paddingRight: 20,
                fontWeight: '500',
                color: 'white',
                fontSize: 17,
              }}>
              Profile status {Data.status}...
            </Text>
            <Image
              style={{width: 35, height: 35}}
              source={{
                uri:
                  Data.status === 'approved'
                    ? 'https://cdn-icons-png.flaticon.com/512/4157/4157035.png'
                    : Data.status === 'rejected'
                    ? 'https://cdn-icons-png.flaticon.com/512/4381/4381694.png'
                    : 'https://cdn4.iconfinder.com/data/icons/design-thinking-1-flat-style/468/Layer55-512.png',
              }}
            />
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 0.3,
    backgroundColor: 'white',
    elevation: 5,
    marginVertical: 10,
  },
  shadowCard: {
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 150,
    height: 150,
    // marginBottom: 20,
    marginVertical: 20,
  },

  shadow: {},
});

export default Home;
