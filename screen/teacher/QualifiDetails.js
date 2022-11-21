import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

const QualifiDetails = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState({});

  useEffect(() => {
    const getDatabase = async () => {
      try {
        const user = await Auth().currentUser.email;
        const data = await firestore()
          .collection('users')
          .doc(`${user}`)
          .collection('academic')
          .doc('qualification_details')
          .get();
        setData(data._data);
        console.log(Data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getDatabase();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View activeOpacity={false} style={styles.shadowCard}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Qualification :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.qualificationLevel : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Collage :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.CollegeName : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Address :
            </Text>
            <Text style={{alignSelf: 'center', color: 'black'}}>
              {Data ? Data.InstituteDistrict : ''}{' '}
              {Data ? Data.InstituteState : ''}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Course :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.Course : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Stream :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.Stream : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              University :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.University : ''}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Percentage :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.Percentage : ''}.00%
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
                fontWeight: '500',
                marginVertical: 5,
              }}>
              Passing Year :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.Passing : ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 0.3,
    backgroundColor: 'white',
    elevation: 5,
  },
  shadowCard: {
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    width: '95%',
    margin: 10,
  },

  shadow: {},
});

export default QualifiDetails;
