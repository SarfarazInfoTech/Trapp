import {View, Text, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button} from 'react-native-paper';
import Auth from '@react-native-firebase/auth';

const OtpLogin = () => {
  const [MobileNo, setMobileNo] = useState('');
  const [OptInput, setOptInput] = useState('');
  const [ConfromData, setConfromData] = useState('');

  const sendOtp = async () => {
    try {
      const mobile = '+91' + MobileNo;
      const responce = await Auth().signInWithPhoneNumber(mobile);
      setConfromData(responce);
      console.log(responce);
      alert('OTP Send please check in mobile.');
    } catch (error) {
      console.log(error);
    }
  };

  const submitOtp = async () => {
    try {
      const responce = await ConfromData.confirm(OptInput);
      console.log(responce);
      alert('Your mobile number is verified.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text>Otp Login</Text>

      <TextInput
        style={{borderWidth: 1, width: '80%'}}
        placeholder="Enter your number"
        onChangeText={value => setMobileNo(value)}
      />
      <Button onPress={() => sendOtp()}>Send Otp</Button>

      <TextInput
        style={{borderWidth: 1, width: '80%'}}
        placeholder="Enter your otp"
        onChangeText={value => setOptInput(value)}
      />
      <Button onPress={() => submitOtp()}>Submit</Button>
      
    </View>
  );
};

export default OtpLogin;
