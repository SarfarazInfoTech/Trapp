import React, {useState} from 'react';
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
import {StackActions} from '@react-navigation/native';

const TLogIn = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!email && !password) {
        alert('Requred Email & Password!');
      } else if (!email) {
        alert('Requred Email !');
      } else if (!password) {
        alert('Requred Password !');
      } else {
        const user = await auth().signInWithEmailAndPassword(email, password);
        if (user.user.emailVerified) {
          navigation.dispatch(StackActions.replace('Home'));
        } else {
          const reSend = () => {
            auth().currentUser.sendEmailVerification();
            auth().signOut();
          };

          Alert.alert(
            'Please verify your email',
            `Check out your Inbox and click email verification link.`,
            [
              {
                text: 'Resend link',
                onPress: await reSend(),
              },
              {
                text: 'Ok',
                onPress: () => console.log('email verification link'),
              },
            ],
          );
        }

        // navigation.navigate('TLogIn');
        // setMessage('');
        // console.log(isUserLogin);
        // navigation.navigate('Dashboard', {
        //   email: isUserLogin.user.email,
        //   uid: isUserLogin.user.uid,
        // });
      }
    } catch (err) {
      setMessage(err.message);
      Alert.alert('', `${err.message}`, [
        {text: 'OK', onPress: () => console.log('Login Error', err)},
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
            <Text style={styles.heading}>Teacher Login</Text>
            <View style={{marginVertical: 15}}>
              <Text style={styles.lable}>Email</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Enter Your Email"
                value={email}
                onChangeText={value => setEmail(value)}
                maxLength={40}
              />
            </View>
            <View style={{marginVertical: 15}}>
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
                onPress={() => handleLogin()}
                title="Login"
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
                  New User ?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('TSignUp')}>
                  <Text
                    style={{
                      color: 'orange',
                      fontSize: 14,
                      fontWeight: '500',
                      margin: 5,
                    }}>
                    SignUp
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
    fontFamily: 'AbrilFatface-Regular',
    marginBottom: 50,
    color: '#01b7a9',
    fontWeight: '500',
    borderBottomColor: '#01b7a9',
    borderBottomWidth: 4,
    paddingVertical: 20,
  },
  lable: {fontSize: 15, marginHorizontal: 25, marginBottom: 10},
  inputBox: {
    marginHorizontal: 25,
    backgroundColor: 'lightgray',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addButton: {
    marginHorizontal: 25,
    marginTop: 30,
    backgroundColor: 'skyblue',
  },
});

export default TLogIn;
