import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Modal,
  Alert,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import {Button, TextInput, FAB} from 'react-native-paper';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const Profile = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState('');
  const [user, setUser] = useState([]);
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

    getDatabase();
  }, []);

  async function verifyPhoneNumber() {
    setLoading(true);
    try {
      setModalVisible(true);
      const phoneNumber = '+91' + Data.mobile;
      const confirmation = await Auth().verifyPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      console.log(confirmation);
      setLoading(false);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }

  async function confirmCode() {
    setLoading(true);
    try {
      const credential = Auth.PhoneAuthProvider.credential(
        confirm.verificationId,
        code,
      );
      let userData = await Auth().currentUser.linkWithCredential(credential);
      setUser(userData.user);
      console.log(userData);
      setModalVisible(!modalVisible);
      setLoading(false);
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        alert('Invalid OTP');
      } else {
        alert('Mobile number not verified!');
      }
    } finally {
      setLoading(false);
    }
  }

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
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Button
            style={styles.fab}
            color={'white'}
            onPress={() => navigation.navigate('Edit Profile')}>
            Edit Profile
          </Button>
          <Text
            style={{
              color: 'black',
              fontSize: 14,
              alignSelf: 'center',
              margin: 20,
            }}>
            Provide your personal information, even if the account is used for
            yours Jobs.
          </Text>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Name :</Text>
            <Text style={styles.valueInput}>{Data.name}</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Email :</Text>
            <Text style={[styles.valueInput, {flex: 5}]}>{Data.email}</Text>
            {Auth().currentUser.emailVerified ? (
              <Text style={{color: 'green', fontSize: 12}}> Verified</Text>
            ) : (
              <Text style={{color: 'red', fontSize: 12}}>Not verified</Text>
            )}
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Mobile :</Text>
            <Text style={[styles.valueInput, {flex: 5}]}>
              +91 {Data.mobile}
            </Text>
            {Auth().currentUser.phoneNumber ? (
              <Text style={{color: 'green', fontSize: 12}}> Verified</Text>
            ) : (
              <Text style={{color: 'red', fontSize: 12}}>Not verified</Text>
            )}
          </View>
          {!Auth().currentUser.phoneNumber ? (
            <Button
              style={{alignSelf: 'flex-end', width: '27%', bottom: 10, left: 5}}
              color="green"
              onPress={() => verifyPhoneNumber()}>
              <Text style={{fontSize: 11}}>Send OTP</Text>
            </Button>
          ) : null}
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Gender :</Text>
            <Text style={styles.valueInput}>{Data.gender}</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Age :</Text>
            <Text style={styles.valueInput}>{Data.age} years old</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>DOB :</Text>
            <Text style={styles.valueInput}>{Data.dob}</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>UID :</Text>
            <Text style={styles.valueInput}>{Data.teacherUid}</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Aadhaar :</Text>
            <Text style={styles.valueInput}>{Data.aadhaar.match(/.{1,4}/g).join(' ')}</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Address :</Text>
            <Text style={styles.valueInput}>{Data.address} {Data.district}, {Data.state} - {Data.pincode}</Text>
          </View>
          
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Account :</Text>
            <Text style={styles.valueInput}>Your Profile has been {Data.status}</Text>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert('Cancel verification');
                setModalVisible(!modalVisible);
              }}>
              <View style={[styles.centeredView, {backgroundColor: '#aaaa'}]}>
                <View style={styles.modalView}>
                  {/* <Text style={styles.modalText}>Verification Code</Text> */}
                  <Text style={styles.modalText}>One Time Password</Text>
                  <Text style={{textAlign: 'center'}}>
                    Please copy the verification code send to your mobile then
                    submit
                    <Text style={{fontWeight: '500'}}>
                      {'\n\n +91 ' + Data.mobile}
                    </Text>
                  </Text>
                  <View style={{flexDirection: 'row', marginVertical: 40}}>
                    <OTPInputView
                      keyboardType="number-pad"
                      style={{height: 50}}
                      pinCount={6}
                      code={code}
                      onCodeChanged={code => setCode(code)}
                      autoFocusOnLoad
                      codeInputFieldStyle={styles.underlineStyleBase}
                      codeInputHighlightStyle={styles.underlineStyleHighLighted}
                      onCodeFilled={code => {
                        console.log(`Code is ${code}, you are good to go!`);
                      }}
                    />
                  </View>
                  {code.length === 6 ? (
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => confirmCode()}>
                      <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      disabled
                      style={[styles.button, {backgroundColor: 'gray'}]}
                      onPress={() => confirmCode()}>
                      <Text style={styles.textStyle}>Submit</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  hedName: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    paddingVertical: 13,
  },
  valueInput: {
    fontWeight: '100',
    color: 'black',
    fontSize: 15,
    alignSelf: 'center',
    flex: 6,
  },
  fieldInput: {
    fontWeight: '500',
    color: 'black',
    fontSize: 15,
    flex: 2,
  },
  fab: {
    position: 'absolute',
    marginHorizontal: 5,
    padding: 3,
    right: 10,
    bottom: 20,
    zIndex: 5,
    backgroundColor: '#01b7a9',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalView: {
    margin: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    elevation: 2,
  },

  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  buttonClose: {
    backgroundColor: '#2196F3',
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },

  otpInput: {
    height: 50,
    width: '20%',
    margin: 4,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 40,
    height: 50,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: 'green',
    fontSize: 25,
    fontWeight: '500',
    margin: 4,
  },

  underlineStyleHighLighted: {
    borderColor: 'darkgreen',
  },
});
export default Profile;
