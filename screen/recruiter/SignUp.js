import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

const RSignUp = ({navigation}) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [password, setPassword] = useState();
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Recruiter Registration</Text>
        <View style={{marginBottom: 10}}>
          <Text style={styles.lable}>Name</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Name"
            value={name}
            onPressIn={() => {
              console.log(name);
            }}
            onChangeText={value => setName(value)}
          />
        </View>
        <View style={{marginBottom: 10}}>
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
        <View style={{marginBottom: 10}}>
          <Text style={styles.lable}>Mobile</Text>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter Your Mobile"
            value={mobile}
            onPressIn={() => {
              console.log(mobile);
            }}
            onChangeText={value => setMobile(value)}
          />
        </View>
        <View style={{marginBottom: 10}}>
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
            onPress={() => navigation.navigate('')}
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
            <TouchableOpacity onPress={() => navigation.navigate('RLogIn')}>
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

export default RSignUp;
