import {View, Text, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';
import {Avatar} from 'react-native-paper';
import storage, {firebase} from '@react-native-firebase/storage';

const Documents = () => {
  const [Data, setData] = useState('');
  useEffect(() => {
    const getDatabase = async () => {
      try {
        const user = await Auth().currentUser.email;
        const data = await firestore()
          .collection('Documents')
          .doc(`${user}`)
          .get();
        setData(data._data);
      } catch (err) {
        console.log(err);
      }
    };

    getDatabase();
  }, []);

  // const stroageDb = storage();
  // const dataDb = firebase.app().storage(`gs://trapp-8f869.appspot.com/Documents/${}/`);
  // const dataDb = firebase
  //   .app()
  //   .storage(
  //     `gs://trapp-8f869.appspot.com/Documents/sarfarazkhan2020@hotmail.com/`,
  //   );
  // console.log(dataDb);

  return (
    <View>
      <Text>Documents {Data.name}</Text>
      <Image
        style={{
          backgroundColor: 'white',
          width: 50,
          height: 50,
          borderRadius: 10,
        }}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHVz7_IhR0cw10ecbj5NpOnzC4qynH2ynHTVLiFkTVNzudN8t9YdiFCv1KQJ_AJUK4ToU&usqp=CAU",
        }}
      />
      <View style={{
          width: "100%",
          height: 400,
        }}>
      <Image
        style={{
          width: '100%',
          height: '100%',

        }}
        source={{
          uri: Data.documentURL,
        }}
      />
      </View>
      
    </View>
  );
};

export default Documents;
