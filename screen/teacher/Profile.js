import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState('');
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
            <Text style={styles.valueInput}>{Data.email}</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Mobile :</Text>
            <Text style={styles.valueInput}>+91 {Data.mobile}</Text>
          </View>
          <View style={styles.hedName}>
            <Text style={styles.fieldInput}>Status :</Text>
            <Text style={styles.valueInput}>{Data.status}</Text>
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
    fontSize: 17,
    alignSelf: 'center',
    flex: 6,
  },
  fieldInput: {
    fontWeight: '500',
    color: 'black',
    fontSize: 18,
    flex: 2,
  },
});
export default Profile;
