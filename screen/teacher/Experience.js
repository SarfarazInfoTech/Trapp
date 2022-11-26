import React, {useState, useEffect} from 'react';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import SelectPicker from 'react-native-form-select-picker';

const Experience = ({navigation}) => {
  const [experience, setExperience] = useState('');
  const [Joining, setJoining] = useState('');
  const [Current, setCurrent] = useState(new Date().toISOString().slice(0, 10));
  const Experiences = [
    'Principal',
    'Teaching',
    'Professor',
    'Assistant Professor',
    'General Manager',
    'Management',
    'Head of Department',
  ];
  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);

    const getDatabase = async () => {
      try {
        const UID = await Auth().currentUser.uid;
        await database()
          .ref(`Experience/${UID}`)
          .on('value', snapshot => {
            if (snapshot.val() === null) {
              console.log(snapshot.val());
              // alert('No data found!');
              // navigation.navigate('Home');
            } else {
              let responselist = snapshot.val();
              setData(responselist);
              // console.log(responselist);
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

  const currentDate = new Date().toISOString().slice(0, 10);
  let from = new Date(`${Data.fromDate}`);
  let to = new Date(`${currentDate}`);
  const difference = new Date(to - from).getTime();
  const monthInmiliseconds = 2590000000;
  let months = Math.floor(difference / monthInmiliseconds);
  const TotalExp =
    'You have ' +
    ((months / 12) | 0) +
    ' years & ' +
    (months % 12) +
    ' months experience.';

  const AddExperience = async () => {
    try {
      const UID = await Auth().currentUser.uid;
      await database().ref(`Experience/${UID}`).update({
        fromDate: Joining,
        toDate: Current,
        experienceIn: experience,
        updateAt: new Date().toISOString(),
      });
      console.log('Add Experience');
    } catch (error) {
      console.log(error);
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
            textStyle={{}}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'white',
            padding: 10,
          }}>
          <View style={{margin: 10}}>
            {Data.length != 0 ? (
              (navigation.navigate('Home'),
              Alert.alert(Data.experienceIn, TotalExp))
            ) : (
              <>
                {/* <Text>{TotalExp}</Text> */}
                <Text style={{color: 'black', margin: 10}}>
                  Your Experience In
                </Text>
                <SelectPicker
                  placeholder="Experience In"
                  placeholderStyle={{fontSize: 16, color: 'gray'}}
                  onSelectedStyle={{fontSize: 16, color: 'black'}}
                  style={{
                    marginHorizontal: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 14,
                    borderRadius: 10,
                  }}
                  containerStyle={{}}
                  doneButtonText="Done"
                  doneButtonTextStyle={{
                    textAlign: 'center',
                    color: '#1976D2',
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                  titleText="Experiences"
                  titleTextStyle={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                  }}
                  onValueChange={value => {
                    setSelected(value);
                    setExperience(value);
                  }}
                  selected={selected}>
                  {Object.values(Experiences).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={val} />
                  ))}
                </SelectPicker>

                <Text style={{color: 'black', margin: 10}}>Joining Date</Text>
                <TextInput
                  mode="outlined"
                  label={'Experience'}
                  placeholder={'YYYY-MM-DD'}
                  value={Joining}
                  maxLength={10}
                  keyboardType="decimal-pad"
                  onChangeText={value => setJoining(value)}
                  style={{
                    marginHorizontal: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                  theme={{
                    colors: {
                      text: 'black',
                      primary: '#01b7a9',
                      placeholder: 'gray',
                    },
                  }}
                />
                <Text style={{color: 'black', margin: 10}}>Current Date</Text>
                <TextInput
                  disabled
                  mode="outlined"
                  label={'Experience'}
                  placeholder={'YYYY-MM-DD'}
                  value={Current}
                  maxLength={10}
                  keyboardType="decimal-pad"
                  onChangeText={value => setCurrent(value)}
                  style={{
                    marginHorizontal: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                  }}
                  theme={{
                    colors: {
                      text: 'black',
                      primary: '#01b7a9',
                      placeholder: 'gray',
                    },
                  }}
                />
                <View style={{alignItems: 'center', margin: 30}}>
                  <Button
                    disabled={
                      Current.length == 10 && Joining.length == 10 && experience
                        ? false
                        : true
                    }
                    color="green"
                    title="Add experience"
                    onPress={() => AddExperience()}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
};

export default Experience;
