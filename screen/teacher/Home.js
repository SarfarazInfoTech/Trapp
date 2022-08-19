import React from 'react';
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

const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView vertical={true} showsVerticalScrollIndicator={true}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate('MainScreen')}
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

          <View style={{width: '100%', height: 150}}>
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
            <Text style={{fontSize: 18, color: 'darkgreen'}}>Hey, Muskan</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}>
            {pic.map(({profile, index}) => (
              <>
                <View style={styles.shadowCard} key={index}>
                  <View style={styles.card}>
                    <Image
                      source={{
                        uri: profile,
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
                      Profile
                    </Text>
                  </View>
                </View>
              </>
            ))}
          </View>
        </View>
      </ScrollView>
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
