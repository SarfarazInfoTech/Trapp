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
import {teacherImage, teacherLogo, profilePic, logout} from '../data/data.json';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

const Account = ({navigation}) => {
  const accountdetails = [
    {
      id: '1',
      icon: 'https://www.snehagroup.in/wp-content/uploads/2021/07/balnk-profile.png',
      name: 'My Profile',
      routes: 'My Profile',
    },
    {
      id: '2',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTS-lwGYXs9JCrBG263UVZW3rL22sd3G6IZm65f3fYUn_U0hDa_XqTAYpiqzMCd6a12Tc0&usqp=CAU',
      name: 'My Documents',
      routes: 'My Documents',
    },
    {
      id: '3',
      icon: 'https://www.prudential.com.my/export/sites/prudential-pamb/en/.galleries/images/form-upload-red-98x98.png',
      name: 'Document Upload',
      routes: 'Documents Upload',
    },
    {
      id: '4',
      icon: 'https://cdn2.vectorstock.com/i/thumb-large/68/26/graduate-student-icon-rounded-squares-button-vector-4526826.jpg',
      name: 'Academy',
      routes: 'Academy',
    },
    {
      id: '5',
      icon: 'https://i.pinimg.com/originals/43/34/65/4334653e51a39b53df44966fb06f4cf2.png',
      name: 'Career',
      routes: '',
    },
    {
      id: '6',
      icon: 'https://cdn.iconscout.com/icon/free/png-256/logout-2477642-2061904.png',
      name: 'Logout',
      routes: '',
    },
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
