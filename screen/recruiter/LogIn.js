import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const RLogIn = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Recruiter Login</Text>
        <View style={{marginVertical: 15}}>
          <Text style={styles.lable}>Email</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Email"
            value={email}
            onPressIn={() => {
              console.log(email);
            }}
            onChangeText={value => setEmail(value)}
          />
        </View>
        <View style={{marginVertical: 15}}>
          <Text style={styles.lable}>Password</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Password"
            value={password}
            onChangeText={value => setPassword(value)}
          />
        </View>
        <View style={{marginHorizontal: 30, marginTop: 20}}>
          <Button
            style={styles.addButton}
            color="skyblue"
            onPress={() => navigation.navigate('Dashboard')}
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
            <TouchableOpacity onPress={() => navigation.navigate('RSignUp')}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingHorizontal: 5,
  },
  card: {
    borderRadius: 15,
    borderColor: 'skyblue',
    borderWidth: 2,
    paddingBottom: 40,
    backgroundColor: 'white',
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 50,
    color: 'gray',
    fontWeight: '500',
    borderBottomColor: 'skyblue',
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

export default RLogIn;
