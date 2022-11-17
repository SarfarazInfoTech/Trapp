import {
  View,
  Text,
  Button,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import SelectPicker from 'react-native-form-select-picker';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

const job = [
  'My current job',
  'This is my past job',
  'Now present here',
  'I am fresher',
];

const Career = ({navigation}) => {
  const [Jobs, setJobs] = useState('');
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState('');

  const handleUpdate = async () => {
    if (
      !userData.collageName ||
      !userData.collageCode ||
      !userData.designation ||
      !userData.collageAddress
    ) {
      alert('Please fill the (* required) fields.');
    } else {
      try {
        setLoading(true);
        const document = await Auth().currentUser.email;
        await firestore()
          .collection('users')
          .doc(`${document}`)
          .collection('career')
          .doc('posting_details')
          .set({
            collageName: userData.collageName,
            collageCode: userData.collageCode,
            designation: userData.designation,
            collageAddress: userData.collageAddress,
            joiningDate: userData.joiningDate ? userData.joiningDate : ' ',
            jobsProfile: Jobs ? Jobs : ' ',
            updateAt: firestore.Timestamp.fromDate(new Date()),
          })
          .then(() => {
            console.log('Profile Updated !');
            Alert.alert(
              '',
              'Your Posting Details has been updated successfully.',
            );
          });
        navigation.navigate('Home');
      } catch (err) {
        console.log('Error upload', err);
      } finally {
        setLoading(false);
      }
    }
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
          />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                height: 25,
                width: 25,
                margin: 10,
              }}
              source={{
                uri: 'https://th.bing.com/th/id/OIP.E38gpnb0CTxyaHE6eDEKOQHaGV?pid=ImgDet&rs=1',
              }}
            />
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Posting Details
            </Text>
          </View>
          <ScrollView>
            <Text style={{color: 'black', margin: 10}}>
              (College / School) Name *
            </Text>
            <TextInput
              mode="outlined"
              label={'College / School'}
              placeholder={'College / School Name'}
              value={userData ? userData.collageName : ''}
              onChangeText={value =>
                setUserData({...userData, collageName: value})
              }
              style={{
                width: '95%',
                height: 45,
                alignSelf: 'center',
                padding: 0,
              }}
              keyboardType="ascii-capable"
              // maxLength={15}
              theme={{
                colors: {
                  text: 'black',
                  primary: '#01b7a9',
                  placeholder: 'gray',
                },
              }}
            />

            <Text style={{color: 'black', margin: 10}}>
              UDISE (College / School) Code *
            </Text>
            <TextInput
              mode="outlined"
              label={'UDISE Code'}
              placeholder={'UDISE Code'}
              value={userData ? userData.collageCode : ''}
              onChangeText={value =>
                setUserData({...userData, collageCode: value})
              }
              style={{
                width: '95%',
                height: 45,
                alignSelf: 'center',
                padding: 0,
              }}
              keyboardType="ascii-capable"
              // maxLength={15}
              theme={{
                colors: {
                  text: 'black',
                  primary: '#01b7a9',
                  placeholder: 'gray',
                },
              }}
            />

            <Text style={{color: 'black', margin: 10}}>Designation *</Text>
            <TextInput
              mode="outlined"
              label={'Designation'}
              placeholder={'Designation'}
              value={userData ? userData.designation : ''}
              onChangeText={value =>
                setUserData({...userData, designation: value})
              }
              style={{
                width: '95%',
                height: 45,
                alignSelf: 'center',
                padding: 0,
              }}
              keyboardType="ascii-capable"
              // maxLength={15}
              theme={{
                colors: {
                  text: 'black',
                  primary: '#01b7a9',
                  placeholder: 'gray',
                },
              }}
            />
            <Text style={{color: 'black', margin: 10}}>
              (College / School) Address *
            </Text>
            <TextInput
              mode="outlined"
              label={'College / School'}
              placeholder={'College / School Address'}
              value={userData ? userData.collageAddress : ''}
              onChangeText={value =>
                setUserData({...userData, collageAddress: value})
              }
              style={{
                width: '95%',
                height: 45,
                alignSelf: 'center',
                padding: 0,
              }}
              keyboardType="ascii-capable"
              // maxLength={15}
              theme={{
                colors: {
                  text: 'black',
                  primary: '#01b7a9',
                  placeholder: 'gray',
                },
              }}
            />

            <Text style={{color: 'black', margin: 10}}>Joining Date</Text>
            <TextInput
              mode="outlined"
              label={'Joining Date'}
              placeholder={'DD-MM-YYY'}
              value={userData ? userData.joiningDate : ''}
              onChangeText={value =>
                setUserData({...userData, joiningDate: value})
              }
              style={{
                width: '95%',
                height: 45,
                alignSelf: 'center',
                padding: 0,
              }}
              keyboardType="decimal-pad"
              maxLength={10}
              theme={{
                colors: {
                  text: 'black',
                  primary: '#01b7a9',
                  placeholder: 'gray',
                },
              }}
            />

            <Text style={{color: 'black', margin: 10}}>Jobs Profile</Text>
            <SelectPicker
              placeholder="Select Roles"
              placeholderStyle={{fontSize: 17, color: 'gray'}}
              onSelectedStyle={{fontSize: 17, color: 'black'}}
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'grey',
                padding: 10,
                paddingHorizontal: 10,
                marginHorizontal: 10,
                backgroundColor: '#f6f6f6',
              }}
              containerStyle={{}}
              doneButtonText="Done"
              doneButtonTextStyle={{
                textAlign: 'center',
                color: '#1976D2',
                fontWeight: '500',
                fontSize: 16,
              }}
              titleText="Posting"
              titleTextStyle={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
              }}
              onValueChange={value => {
                setSelected(value);
                setJobs(value);
              }}
              selected={selected}>
              {Object.values(job).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={val} />
              ))}
            </SelectPicker>

            <View style={{padding: 10, paddingVertical: 40}}>
              <Button title="Submit" onPress={handleUpdate} color={'#01b7a9'} />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Career;
