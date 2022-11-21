import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {
  documentIcon,
  uploadIcon,
  academicIcon,
  careerIcon,
  logOutIcon,
  profileIcon,
  profilePic,
  logout,
} from '../data/data.json';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

const Account = ({navigation}) => {
  const accountdetails = [
    {
      id: '1',
      icon: profileIcon,
      name: 'My Profile',
      routes: 'My Profile',
    },
    {
      id: '2',
      icon: documentIcon,
      name: 'My Documents',
      routes: 'My Documents',
    },
    {
      id: '3',
      icon: uploadIcon,
      name: 'Document Upload',
      routes: 'Documents Upload',
    },
    {
      id: '4',
      icon: academicIcon,
      name: 'Academic',
      routes: 'Academic',
    },
    {
      id: '5',
      icon: careerIcon,
      name: 'Career',
      routes: 'Career',
    },
    {
      id: '6',
      icon: "https://th.bing.com/th/id/OIP.JlQh9WJESNlh9qT20cKnxwHaHa?pid=ImgDet&w=512&h=512&rs=1",
      name: 'Qualification Details',
      routes: 'Qualification Details',
    },
    {
      id: '7',
      icon: 'https://th.bing.com/th/id/OIP.E38gpnb0CTxyaHE6eDEKOQHaGV?pid=ImgDet&rs=1',
      name: 'Posting Details',
      routes: 'Posting Details',
    },
    // {
      // id: '8',
      // icon: logOutIcon,
      // name: 'Logout',
      // routes: 'MainScreen',
      // signOut: Auth().signOut()
    // },
  ];

  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState('');
  useEffect(() => {
    const getDatabase = async () => {
      try {
        const user = await Auth().currentUser.email;
        const data = await firestore().collection('users').doc(`${user}`).get();
        setData(data._data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getDatabase();
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
        <View style={{backgroundColor: 'white', flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: 'white',
                paddingBottom: 25,
                marginBottom: 2,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 2,
              }}>
              <Avatar.Image
                style={{
                  alignSelf: 'center',
                  margin: 10,
                  backgroundColor: 'white',
                }}
                source={{
                  uri: Data.image ? Data.image : profilePic,
                }}
                size={130}
              />
              <Text
                style={{
                  fontWeight: '700',
                  alignSelf: 'center',
                  fontSize: 18,
                  color: '#01b7a9',
                }}>
                {Data.name}
              </Text>
            </View>

            {accountdetails.map(({id, icon, name, routes}) => (
              <TouchableOpacity
                key={id}
                onPress={() => navigation.navigate(routes)}
                style={{borderBottomColor: 'lightgray', borderBottomWidth: 2}}>
                <View
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    marginBottom: 2,
                    paddingHorizontal: 5,
                    paddingVertical: 5,
                  }}>
                  <Avatar.Image
                    style={{backgroundColor: 'white'}}
                    size={50}
                    source={{
                      uri: icon,
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    flex: 1,
  },
});
export default Account;
