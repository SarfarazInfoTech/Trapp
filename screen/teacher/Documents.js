import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {altDoc} from '../data/data.json';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import Auth from '@react-native-firebase/auth';

const Documents = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    const getDatabase = async () => {
      try {
        const UID = await Auth().currentUser.uid;
        await database()
          .ref(`Documents/${UID}`)
          .on('value', snapshot => {
            if (snapshot.val() === null) {
              // console.log(snapshot.val());
              alert('Please upload your documents.');
              navigation.navigate('Home');
            } else {
              let responselist = Object.values(snapshot.val());
              setData(responselist);
            }
          });
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
          {Data ? (
            <FlatList
              data={Data}
              renderItem={item => {
                if (item.item !== null) {
                  return (
                    <View style={styles.container}>
                      <View style={styles.cardBox}>
                        <Text style={styles.DocText}>
                          {item.item.documentName}
                        </Text>
                        <Image
                          resizeMode="stretch"
                          resizeMethod="resize"
                          style={{
                            width: '100%',
                            height: 500,
                          }}
                          source={{
                            uri: item.item.documentURL,
                          }}
                        />
                      </View>
                      <Text style={styles.statusBtn}>
                        Documents {item.item.status}
                      </Text>
                    </View>
                  );
                }
              }}
            />
          ) : (
            <Image
              style={{
                backgroundColor: 'white',
                width: 50,
                height: 50,
                borderRadius: 10,
                alignSelf: 'center',
              }}
              source={{
                uri: altDoc,
              }}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: 20,
    borderBottomColor: 'darkgray',
    borderBottomWidth: 2,
  },
  cardBox: {
    backgroundColor: '#01b7a9',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  statusBtn: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    padding: 5,
    backgroundColor: 'orange',
    width: '95%',
    borderRadius: 3,
    textAlign: 'center',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 25,
    alignSelf: 'center',
  },
  DocText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 20,
    padding: 5,
  },
});

export default Documents;
