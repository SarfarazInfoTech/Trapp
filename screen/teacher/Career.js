import {View, Text, Button, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import SelectPicker from 'react-native-form-select-picker';

const job = [
  'My current job',
  'This is my past job',
  'Now present here',
  'I am fresher',
];

const Career = () => {
  const [Jobs, setJobs] = useState('');
  const [selected, setSelected] = useState('');

  return (
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
        <Text style={{fontSize: 16, fontWeight: '500'}}>Posting Details</Text>
      </View>
      <ScrollView>
        <Text style={{color: 'black', margin: 10}}>
          (College / School) Name *
        </Text>
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

        <Text style={{color: 'black', margin: 10}}>
          UDISE (College / School) Code *
        </Text>
        <TextInput
          mode="outlined"
          label={'UDISE Code'}
          placeholder={'UDISE Code'}
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

        <Text style={{color: 'black', margin: 10}}>Designation *</Text>
        <TextInput
          mode="outlined"
          label={'Designation'}
          placeholder={'Designation'}
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
        <Text style={{color: 'black', margin: 10}}>
          (College / School) Address *
        </Text>
        <TextInput
          mode="outlined"
          label={'College / School'}
          placeholder={'College / School Address'}
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

        <Text style={{color: 'black', margin: 10}}>Joining Date</Text>
        <TextInput
          mode="outlined"
          label={'Joining Date'}
          placeholder={'DD-MM-YYY'}
          // value={userData ? userData.state : ''}
          // onChangeText={value => setUserData({...userData, state: value})}
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
          <Button
            title="Submit"
            onPress={() => console.log('')}
            color={'#01b7a9'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Career;
