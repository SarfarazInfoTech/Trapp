import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Avatar, Button, TextInput, RadioButton} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import {profilePic} from '../data/data.json';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Auth from '@react-native-firebase/auth';
import DatePicker from 'react-native-date-picker';
import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import moment from 'moment';

const EditProfile = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [ImageData, setImageData] = useState(null);
  const [Data, setData] = useState('');
  const [fullImagePath, setfullImagePath] = useState('');
  const [imgDownloadUrl, setimgDownloadUrl] = useState('');

  // const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

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
          aadhaar: userData.aadhaar,
          teacherUid: userData.teacherUid,
          age: userData.age,
          dob: userData.dob,
          // dob: date,
          updateAt: firestore.Timestamp.fromDate(new Date()),
        })
        .then(() => {
          console.log('Profile Updated !');
          Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.',
          );
        });
      navigation.navigate('Home');
    } catch (err) {
      console.log('Error upload', err);
      alert(
        'Please upload a profile picture with your clear face then update !',
      );
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

  const [date, setDate] = useState(new Date());
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    
  };
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: false,
    });
  };
  const showDatepicker = () => {
    showMode('date');
  };

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
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={{color: 'black', margin: 10}}>Name</Text>
              <TextInput
                mode="outlined"
                label={'Full Name'}
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
              <Text style={{color: 'black', margin: 10}}>Email</Text>

              <TextInput
                mode="outlined"
                label={'Email Address'}
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
              <Text style={{color: 'black', margin: 10}}>Mobile</Text>
              <TextInput
                mode="outlined"
                label={'Mobile Number'}
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
                disabled={Auth().currentUser.phoneNumber ? true : false}
              />

              <Text style={{color: 'black', margin: 10}}>Gender</Text>
              <RadioButton.Group
                onValueChange={value =>
                  setUserData({...userData, gender: value})
                }
                value={userData ? userData.gender : ''}>
                <View style={{flexDirection: 'row'}}>
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
                </View>
              </RadioButton.Group>

              <Text style={{color: 'black', margin: 10}}>Date Of Birth</Text>
              <Text></Text>
              <TouchableOpacity onPress={showDatepicker}>
                <TextInput
                  mode="outlined"
                  label={'Date Of Birth'}
                  placeholder={'Enter Your Date Of Birth'}
                  // value={date ? moment(date).format('DD/MM/YYYY') : ''}
                  // value={moment(date).format('DD/MM/YYYY') }
                  
                  value={userData ? moment(userData.dob).format('DD/MM/YYYY').toString()  : moment(date).format('DD/MM/YYYY')}
                  // value={userData ? userData.dob : moment(date).format('DD/MM/YYYY')}
                onChangeText={value  => setUserData({...userData, dob: value})}

                  disabled
                  style={styles.TextInput}
                  keyboardType="default"
                  // maxLength={10}
                  theme={{
                    colors: {
                      text: 'black',
                      primary: '#01b7a9',
                      placeholder: 'gray',
                    },
                  }}
                />
              </TouchableOpacity>

              {/* <TextInput
              onPressIn={() => setOpen(true)}
                mode="outlined"
                label={'Date Of Birth'}
                placeholder={'Enter Your Date Of Birth'}
                // value={userData ? userData.dob : ''}
                value={userData ? userData.dob : date ? date.toString() : ''}
                // onChangeText={value =>
                //   // setDate(value)
                //   setUserData({...userData, dob: value})
                // }
                style={styles.TextInput}
                // keyboardType="numeric"
                // maxLength={10}
                theme={{
                  colors: {
                    text: 'black',
                    primary: '#01b7a9',
                    placeholder: 'gray',
                  },
                }}
              />
              {console.log(date)}
      <DatePicker
      title={null}
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          // setDate(date)
          setUserData({...userData, dob: date})
        }}
        onCancel={() => {
          setOpen(false)
        }}
      /> */}
              <Text style={{color: 'black', margin: 10}}>Age</Text>
              <TextInput
                mode="outlined"
                label={'Age'}
                placeholder={'Enter Your Age'}
                value={userData ? userData.age : ''}
                onChangeText={value => setUserData({...userData, age: value})}
                style={styles.TextInput}
                keyboardType="numeric"
                maxLength={2}
                theme={{
                  colors: {
                    text: 'black',
                    primary: '#01b7a9',
                    placeholder: 'gray',
                  },
                }}
              />
              <Text style={{color: 'black', margin: 10}}>Aadhaar</Text>
              <TextInput
                mode="outlined"
                label={'Aadhaar Number'}
                placeholder={'Enter Your Aadhaar number'}
                value={userData ? userData.aadhaar : ''}
                onChangeText={value =>
                  setUserData({...userData, aadhaar: value})
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
              <Text style={{color: 'black', margin: 10}}>Teacher UID</Text>
              <TextInput
                mode="outlined"
                label={'Teacher UID'}
                placeholder={'Enter UID number'}
                value={userData ? userData.teacherUid : ''}
                onChangeText={value =>
                  setUserData({...userData, teacherUid: value})
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
            </View>
            <Button
              onPress={handleUpdate}
              color="white"
              style={styles.updateBtn}>
              Update
            </Button>
          </View>
        </ScrollView>
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
    marginVertical: 30,
  },
});
export default EditProfile;
