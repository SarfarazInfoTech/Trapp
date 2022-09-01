import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const TSignUp = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (!displayName && !email && !phoneNumber && !password) {
        alert('Requred all fields!');
      } else if (!displayName) {
        alert('Requred Name !');
      } else if (!phoneNumber) {
        alert('Requred Mobile no. !');
      } else if (!email && !password) {
        alert('Requred Email & Password!');
      } else if (!email) {
        alert('Requred Email !');
      } else if (!password) {
        alert('Requred Password !');
      } else {
        const userSignUp = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        const userData = {
          id: userSignUp.user.uid,
          name: displayName,
          email: email,
          mobile: phoneNumber,
          password: password,
          createdAt: firestore.Timestamp.fromDate(new Date()),
        };

        await firestore()
          .collection('users')
          .doc(userSignUp.user.email)
          .set(userData);
        await auth().currentUser.sendEmailVerification();
        await auth().signOut();
        navigation.navigate('TLogIn');

        Alert.alert(
          'Please verify your email',
          `Check out your Inbox and click email verification link.`,
          [{text: 'OK', onPress: () => console.log('email verification link')}],
        );

        setMessage('');
        console.log(userSignUp);
      }
    } catch (err) {
      setMessage(err.message);
      Alert.alert('', `${err.message}`, [
        {text: 'OK', onPress: () => console.log('Signup Error', err)},
      ]);
    } finally {
      setLoading(false);
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
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.heading}>Teacher Registration</Text>
            <View style={{marginBottom: 10}}>
              <Text style={styles.lable}>Name</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Name"
                value={displayName}
                onChangeText={value => setDisplayName(value)}
                maxLength={25}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.lable}>Email</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Email"
                value={email}
                onChangeText={value => setEmail(value)}
                maxLength={40}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.lable}>Mobile</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Mobile"
                value={phoneNumber}
                onChangeText={value => setPhoneNumber(value)}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={styles.lable}>Password</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Password"
                value={password}
                onChangeText={value => setPassword(value)}
                secureTextEntry={true}
                maxLength={8}
              />
            </View>
            <View style={{marginHorizontal: 30, marginTop: 20}}>
              <Button
                style={styles.addButton}
                color="#01b7a9"
                onPress={() => handleSignup()}
                title="Sign Up"
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontSize: 13,
                    fontWeight: '500',
                    margin: 5,
                  }}>
                  If you already have an account ?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('TLogIn')}>
                  <Text
                    style={{
                      color: 'orange',
                      fontSize: 14,
                      fontWeight: '500',
                      margin: 5,
                    }}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9ee2de',
    paddingHorizontal: 5,
  },
  card: {
    borderRadius: 15,
    borderColor: '#9ee2de',
    borderWidth: 2,
    paddingBottom: 40,
    backgroundColor: 'white',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 50,
    fontFamily: 'AbrilFatface-Regular',
    color: '#01b7a9',
    fontWeight: '500',
    borderBottomColor: '#01b7a9',
    borderBottomWidth: 4,
    paddingVertical: 20,
  },
  lable: {
    fontSize: 15,
    marginHorizontal: 25,
    marginBottom: 10,
    fontWeight: '500',
  },
  inputBox: {
    marginHorizontal: 25,
    backgroundColor: 'white',
    borderColor: 'darkgray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    marginHorizontal: 25,
    marginTop: 30,
    backgroundColor: 'skyblue',
  },
});

export default TSignUp;
