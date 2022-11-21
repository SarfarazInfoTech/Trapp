import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

const PostingDetails = () => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState({});

  useEffect(() => {
    const getDatabase = async () => {
      try {
        const user = await Auth().currentUser.email;
        const data = await firestore()
          .collection('users')
          .doc(`${user}`)
          .collection('career')
          .doc('posting_details')
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
              Collage :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.collageName : ''}
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
              {Data ? Data.collageAddress : ''}
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
              Collage Code :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.collageCode : ''}
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
              Designation :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.designation : ''}
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
              Jobs Profile :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.jobsProfile : ''}
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
              Joining Date :
            </Text>
            <Text
              style={{
                alignSelf: 'center',
                color: 'black',
                textAlign: 'justify',
              }}>
              {Data ? Data.joiningDate : ''}
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

export default PostingDetails;
