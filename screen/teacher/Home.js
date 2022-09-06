import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {
  teacherImage,
  teacherLogo,
  pic,
  logout,
  dashboardIcon,
  notesIcon,
  approvedIcon,
  rejectedIcon,
  pendingIcon,
} from '../data/data.json';
import firestore from '@react-native-firebase/firestore';
import {StackActions} from '@react-navigation/native';
import Auth from '@react-native-firebase/auth';

const Home = ({navigation}) => {
  const [Data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = useCallback(async () => {
    await setLoading(true);
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    wait(2000).then(() => setLoading(false));
    // await navigation.navigate('Home');
  }, []);

  useEffect(() => {
    const getDatabase = async () => {
      try {
        const user = await Auth().currentUser.email;
        const data = await firestore().collection('users').doc(`${user}`).get();
        setData(data._data);
        getDatabase();
      } catch (err) {
        // alert('Error in Home');
        // console.log('Error in Home', err);
        await navigation.navigate('MainScreen');

      } finally {
        setLoading(false);
      }
    };
    getDatabase();
    onRefresh();
  }, []);

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignSelf: 'center',
            marginTop: 30,
          }}>
          <ActivityIndicator
            size="large"
            color="#01b7a9"
            visible={loading}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <SafeAreaView style={{flex: 1}}>
          {Data.status ? (
            <View
              style={{
                alignSelf: 'center',
                width: '100%',
                position: 'absolute',
                bottom: 0,
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
                        ? approvedIcon
                        : Data.status === 'rejected'
                        ? rejectedIcon
                        : pendingIcon,
                  }}
                />
              </View>
            </View>
          ) : null}
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
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 26,
                  margin: 10,
                }}
                source={{
                  uri: dashboardIcon,
                }}
              />
              <Text style={{fontSize: 16, color: '#01b7a9'}}>Dashboard</Text>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
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
                          width: 140,
                          height: 100,
                          borderRadius: 10,
                          backgroundColor: 'white',
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
            </ScrollView>

            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  margin: 10,
                }}
                source={{
                  uri: notesIcon,
                }}
              />
              <Text style={{fontSize: 16, color: '#01b7a9'}}>
                Important Notes
              </Text>
            </View>
            <View
              style={[
                styles.card,
                {margin: 10, padding: 10, paddingBottom: 0, paddingTop: 0},
              ]}>
              <View style={[styles.shadowCard, {width: '100%'}]}>
                <Text style={{color: 'darkblue'}}>
                  1. Connecting to the development server...
                </Text>
                <Text style={{color: 'darkblue'}}>
                  2. Connecting to the development server...
                </Text>
                <Text style={{color: 'darkblue'}}>
                  3. Connecting to the development server...
                </Text>
                <Text style={{color: 'darkblue'}}>
                  4. Connecting to the development server...
                </Text>
                <Text style={{color: 'darkblue'}}>
                  5. Connecting to the development server...
                </Text>
                <Text style={{color: 'darkblue'}}>
                  6. Connecting to the development server...
                </Text>
                <Text style={{color: 'darkblue'}}>
                  7. Connecting to the development server...
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
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
  },
  shadowCard: {
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: 140,
    marginVertical: 10,
  },

  shadow: {},
});

export default Home;
