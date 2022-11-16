import {View, Text, Image, Button, ScrollView} from 'react-native';
import React, {useState} from 'react';
import SelectPicker from 'react-native-form-select-picker';
import {TextInput} from 'react-native-paper';

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

const Academic = () => {
  const [qualificationLevel, setqualificationLevel] = useState('');
  const [Stream, setStream] = useState('');
  const [InstituteState, setInstituteState] = useState('');
  const [InstituteDistrict, setInstituteDistrict] = useState('');
  const [selected, setSelected] = useState('');

  return (
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

          <Text style={{color: 'black', margin: 10}}>Institute State *</Text>
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

          <Text style={{color: 'black', margin: 10}}>Institute District *</Text>
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

          <Text style={{color: 'black', margin: 10}}>College / School</Text>
          <TextInput
            mode="outlined"
            label={'College / School'}
            placeholder={'College / School Name'}
            // value={userData ? userData.state : ''}
            // onChangeText={value => setUserData({...userData, state: value})}
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

          <Text style={{color: 'black', margin: 10}}>Course</Text>
          <TextInput
            mode="outlined"
            label={'Course'}
            placeholder={'Course Name'}
            // value={userData ? userData.state : ''}
            // onChangeText={value => setUserData({...userData, state: value})}
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

          <Text style={{color: 'black', margin: 10}}>Board / University</Text>
          <TextInput
            mode="outlined"
            label={'Board / University'}
            placeholder={'Board / University Name'}
            // value={userData ? userData.state : ''}
            // onChangeText={value => setUserData({...userData, state: value})}
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

          <Text style={{color: 'black', margin: 10}}>Passing Year</Text>
          <TextInput
            mode="outlined"
            label={'Passing year'}
            placeholder={'Passing year Name'}
            // value={userData ? userData.state : ''}
            // onChangeText={value => setUserData({...userData, state: value})}
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

          <Text style={{color: 'black', margin: 10}}>Percentage %</Text>
          <TextInput
            mode="outlined"
            label={'Percentage'}
            placeholder={'Percentage'}
            // value={userData ? userData.state : ''}
            // onChangeText={value => setUserData({...userData, state: value})}
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
              onPress={() => console.log('')}
              color={'#01b7a9'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Academic;
