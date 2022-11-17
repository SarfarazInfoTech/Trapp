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

const qualification = [
  'SSC (10th)',
  'HSC (12th)',
  'Diploma',
  'Under Graduate',
  'Post Graduate',
];

const stream = [
  'Arts',
  'Science',
  'Commerce',
  'Education',
  'Engineering',
  'Nursing',
  'Hotel Management',
  'LAW',
  'Other',
];

const institute = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Tripura',
  'Uttarakhand',
  'Uttar Pradesh',
  'West Bengal',
  'Andaman & Nicobar',
  'Chandigarh',
  'Dadra and Nagar Haveli',
  'Daman & Diu',
  'Delhi',
  'Lakshadweep',
  'Puducherry',
];

const district = [
  'Nagpur',
  'Mumbai',
  'Pune',
  'Thane',
  'Nashik',
  'Bhandara',
  'Chandrapur',
];

const Academic = ({navigation}) => {
  const [qualificationLevel, setqualificationLevel] = useState('');
  const [Stream, setStream] = useState('');
  const [InstituteState, setInstituteState] = useState('');
  const [InstituteDistrict, setInstituteDistrict] = useState('');
  const [selected, setSelected] = useState('');

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState('');

  const handleUpdate = async () => {
    if (
      !qualificationLevel ||
      !Stream ||
      !InstituteState ||
      !InstituteDistrict ||
      !userData.CollegeName ||
      !userData.Course ||
      !userData.University ||
      !userData.Passing ||
      !userData.Percentage
    ) {
      alert('Please fill the (* required) fields.');
    } else {
      try {
        setLoading(true);
        const document = await Auth().currentUser.email;
        await firestore()
          .collection('users')
          .doc(`${document}`)
          .collection('academic')
          .doc('qualification_details')
          .set({
            qualificationLevel: qualificationLevel,
            Stream: Stream,
            InstituteState: InstituteState,
            InstituteDistrict: InstituteDistrict,
            CollegeName: userData.CollegeName,
            Course: userData.Course,
            University: userData.University,
            Passing: userData.Passing,
            Percentage: userData.Percentage,
            updateAt: firestore.Timestamp.fromDate(new Date()),
          })
          .then(() => {
            console.log('Profile Updated !');
            Alert.alert(
              '',
              'Your Qualification Details has been updated successfully.',
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
        <View style={{flex: 1, backgroundColor: '#ffff'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                height: 25,
                width: 25,
                margin: 10,
              }}
              source={{
                uri: 'https://th.bing.com/th/id/OIP.JlQh9WJESNlh9qT20cKnxwHaHa?pid=ImgDet&w=512&h=512&rs=1',
              }}
            />
            <Text style={{fontSize: 16, fontWeight: '500'}}>
              Qualification Details
            </Text>
          </View>
          <ScrollView>
            <View style={{backgroundColor: 'white'}}>
              <Text style={{color: 'black', margin: 10}}>
                Qualification Level *
              </Text>
              <SelectPicker
                placeholder="Select Qualification"
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
                titleText="Qualification"
                titleTextStyle={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                }}
                onValueChange={value => {
                  setSelected(value);
                  setqualificationLevel(value);
                }}
                selected={selected}>
                {Object.values(qualification).map((val, index) => (
                  <SelectPicker.Item label={val} value={val} key={val} />
                ))}
              </SelectPicker>

              <Text style={{color: 'black', margin: 10}}>Stream *</Text>
              <SelectPicker
                placeholder="Select Stream"
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
                titleText="Stream"
                titleTextStyle={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                }}
                onValueChange={value => {
                  setSelected(value);
                  setStream(value);
                }}
                selected={selected}>
                {Object.values(stream).map((val, index) => (
                  <SelectPicker.Item label={val} value={val} key={val} />
                ))}
              </SelectPicker>

              <Text style={{color: 'black', margin: 10}}>
                Institute State *
              </Text>
              <SelectPicker
                placeholder="Select State"
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
                titleText="State"
                titleTextStyle={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                }}
                onValueChange={value => {
                  setSelected(value);
                  setInstituteState(value);
                }}
                selected={selected}>
                {Object.values(institute).map((val, index) => (
                  <SelectPicker.Item label={val} value={val} key={val} />
                ))}
              </SelectPicker>

              <Text style={{color: 'black', margin: 10}}>
                Institute District *
              </Text>
              <SelectPicker
                placeholder="Select District"
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
                titleText="District"
                titleTextStyle={{
                  textAlign: 'center',
                  color: 'black',
                  fontSize: 16,
                }}
                onValueChange={value => {
                  setSelected(value);
                  setInstituteDistrict(value);
                }}
                selected={selected}>
                {Object.values(district).map((val, index) => (
                  <SelectPicker.Item label={val} value={val} key={val} />
                ))}
              </SelectPicker>

              <Text style={{color: 'black', margin: 10}}>
                College / School *
              </Text>
              <TextInput
                mode="outlined"
                label={'College / School'}
                placeholder={'College / School Name'}
                value={userData ? userData.CollegeName : ''}
                onChangeText={value =>
                  setUserData({...userData, CollegeName: value})
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

              <Text style={{color: 'black', margin: 10}}>Course *</Text>
              <TextInput
                mode="outlined"
                label={'Course'}
                placeholder={'Course Name'}
                value={userData ? userData.Course : ''}
                onChangeText={value =>
                  setUserData({...userData, Course: value})
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
                Board / University *
              </Text>
              <TextInput
                mode="outlined"
                label={'Board / University'}
                placeholder={'Board / University Name'}
                value={userData ? userData.University : ''}
                onChangeText={value =>
                  setUserData({...userData, University: value})
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

              <Text style={{color: 'black', margin: 10}}>Passing Year *</Text>
              <TextInput
                mode="outlined"
                label={'Passing year'}
                placeholder={'Passing year'}
                value={userData ? userData.Passing : ''}
                onChangeText={value =>
                  setUserData({...userData, Passing: value})
                }
                style={{
                  width: '95%',
                  height: 45,
                  alignSelf: 'center',
                  padding: 0,
                }}
                keyboardType="number-pad"
                maxLength={4}
                theme={{
                  colors: {
                    text: 'black',
                    primary: '#01b7a9',
                    placeholder: 'gray',
                  },
                }}
              />

              <Text style={{color: 'black', margin: 10}}>Percentage % *</Text>
              <TextInput
                mode="outlined"
                label={'Percentage'}
                placeholder={'Percentage'}
                value={userData ? userData.Percentage : ''}
                onChangeText={value =>
                  setUserData({...userData, Percentage: value})
                }
                style={{
                  width: '95%',
                  height: 45,
                  alignSelf: 'center',
                  padding: 0,
                }}
                keyboardType="number-pad"
                maxLength={2}
                theme={{
                  colors: {
                    text: 'black',
                    primary: '#01b7a9',
                    placeholder: 'gray',
                  },
                }}
              />
              <View style={{margin: 10, marginVertical: 30}}>
                <Button
                  title="Submit"
                  onPress={handleUpdate}
                  color={'#01b7a9'}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Academic;
