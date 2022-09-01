import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar, Button, TextInput, RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {profilePic} from '../data/data.json';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Auth from '@react-native-firebase/auth';

const EditProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [ImageData, setImageData] = useState(null);
  const [Data, setData] = useState('');
  const [fullImagePath, setfullImagePath] = useState('');
  const [imgDownloadUrl, setimgDownloadUrl] = useState('');
  
  const getUser = async () => {
    const currentUser = await Auth().currentUser.email;
    await firestore()
      .collection('users')
      .doc(currentUser)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          // console.log('Current User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };

  const picImage = async () => {
    try {
      const responce = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      // console.log('PicImage', responce);
      setImageData(responce);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const document = await Auth().currentUser.email;
      const responce = storage().ref(
        `/Documents/${document}/User Profile Pic.jpg`,
      );
      const put = await responce.putFile(ImageData.fileCopyUri);
      setfullImagePath(put.metadata.fullPath);
      const url = await responce.getDownloadURL();
      setimgDownloadUrl(url);

      await firestore()
        .collection('users')
        .doc(`${document}`)
        .update({
          name: userData.name,
          email: userData.email,
          mobile: userData.mobile,
          image: url,
          gender: userData.gender,
          updateAt: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('Profile Updated !');
          Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.',
          );
        });
      // navigation.navigate('Home');
    } catch (err) {
      console.log('Error upload', err);
    } finally {
      setLoading(false);
    }
  };

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

    getUser();
    getDatabase();
    handleUpdate();
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
        <View>
          <View style={styles.card}>
            {/* <Text >{imgDownloadUrl}</Text> */}
            {/* <Text >{fullImagePath}</Text> */}
            {/* <Text >{Data.image}</Text> */}
            <Text style={styles.picText}>Profile Photo</Text>
            <TouchableOpacity onPress={() => picImage()}>
              {ImageData ? (
                <Avatar.Image
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    backgroundColor: 'white',
                  }}
                  source={{
                    uri: ImageData ? ImageData.uri : profilePic,
                  }}
                  size={100}
                />
              ) : (
                <Avatar.Image
                  style={{
                    alignSelf: 'center',
                    margin: 10,
                    backgroundColor: 'white',
                  }}
                  source={{
                    uri: Data.image ? Data.image : profilePic,
                  }}
                  size={100}
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity style={styles.iconImage}>
              <Image
                style={styles.iconImage}
                source={{
                  uri: 'https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png',
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  height: 25,
                  width: 25,
                  margin: 10,
                }}
                source={{
                  uri: 'https://www.pngitem.com/pimgs/m/524-5244625_font-awesome-user-svg-hd-png-download.png',
                }}
              />
              <Text style={{fontSize: 16, fontWeight: '500'}}>
                Personal information
              </Text>
            </View>

            <View>
              <TextInput
                mode="outlined"
                label={'Your Name'}
                placeholder={'Enter Your Name'}
                value={userData ? userData.name : ''}
                onChangeText={value => setUserData({...userData, name: value})}
                style={styles.TextInput}
                theme={{
                  colors: {
                    text: 'black',
                    primary: '#01b7a9',
                    placeholder: 'gray',
                  },
                }}
              />
              <TextInput
                mode="outlined"
                label={'Your Email'}
                placeholder={'Enter Your Email'}
                value={userData ? userData.email : ''}
                onChangeText={value => setUserData({...userData, email: value})}
                style={styles.TextInput}
                theme={{
                  colors: {
                    text: 'black',
                    primary: '#01b7a9',
                    placeholder: 'gray',
                  },
                }}
                disabled
              />
              <TextInput
                mode="outlined"
                label={'Your Mobile'}
                placeholder={'Enter Your Mobile no.'}
                value={userData ? userData.mobile : ''}
                onChangeText={value =>
                  setUserData({...userData, mobile: value})
                }
                style={styles.TextInput}
                keyboardType="numeric"
                maxLength={10}
                theme={{
                  colors: {
                    text: 'black',
                    primary: '#01b7a9',
                    placeholder: 'gray',
                  },
                }}
              />

              <RadioButton.Group
                onValueChange={value => setUserData({...userData, gender: value})}
                value={userData ? userData.gender : '' }>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}
                  onPress={{}}>
                  <RadioButton value="Male" />
                  <Text>Male</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 10,
                  }}
                  onPress={{}}>
                  <RadioButton value="Female" />
                  <Text>Female</Text>
                </View>
              </RadioButton.Group>
            </View>
          </View>
          <Button onPress={handleUpdate} color="white" style={styles.updateBtn}>
            Update
          </Button>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginBottom: 2,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 2,
  },
  picText: {
    alignSelf: 'flex-start',
    position: 'absolute',
    margin: 10,
    fontSize: 14,
    fontWeight: '500',
    color: 'grey',
  },
  iconImage: {
    height: 25,
    width: 25,
    position: 'absolute',
    alignSelf: 'flex-end',
    margin: 5,
    right: 60,
    top: 40,
  },
  TextInput: {
    width: '95%',
    height: 45,
    alignSelf: 'center',
    marginBottom: 10,
  },
  updateBtn: {
    backgroundColor: '#01b7a9',
    alignSelf: 'center',
    width: '50%',
  },
});
export default EditProfile;
