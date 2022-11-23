import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput, Button} from 'react-native-paper';
import SelectPicker from 'react-native-form-select-picker';
import firestore from '@react-native-firebase/firestore';
import Auth from '@react-native-firebase/auth';

const Attendance = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [Data, setData] = useState({});
  const [Status, setStatus] = useState('');
  const [selected, setSelected] = useState('');

  const present = new Date().toLocaleString();
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const status = ['Present', 'Halfday', 'Absent', 'Holiday'];
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date();
  const month = monthNames[d.getMonth()];
  // console.log(month);

  const attendance = `You Check-In at ${date} - ${month} on time ${time} and you are ${Status}.`;
  const IamPresent = async () => {
    const document = await Auth().currentUser.email;
    await firestore()
      .collection('users')
      .doc(`${document}`)
      .collection('Attendance')
      .doc(present)
      .set({
        present: present,
        month: month,
        date: date,
        time: time,
        status: Status,
        attendance: attendance,
      })

      .then(() => {
        console.log('Attendance Updated !');
        navigation.navigate('Home');
        Alert.alert('Thank You', attendance);
      });
  };

  useEffect(() => {
    const getDatabase = async () => {
      try {
        const user = await Auth().currentUser.email;
        const data = await firestore()
          .collection('users')
          .doc(`${user}`)
          .collection('Attendance')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(data => {
              setData(data._data);
              // console.log(`${data.id} => ${data.data()}`);
              // console.log('Data', data._data);
            });
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
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text
        style={{
          color: '#01b7a9',
          fontSize: 20,
          textAlign: 'center',
          margin: 5,
        }}>
        Online Attendance
      </Text>

      <View style={{margin: 10}}>
        {Data.date === date ? (
          <View>
            <Text style={{textAlign: 'center', color: 'black'}}>
              Today's your attendance summary is submited.
            </Text>
          </View>
        ) : (
          <>
            <Text style={{margin: 0, color: 'black', fontSize: 16}}>
              Select attendance option
            </Text>

            <SelectPicker
              placeholder="Choose your attendance"
              placeholderStyle={{fontSize: 18, color: 'gray'}}
              onSelectedStyle={{fontSize: 18, color: 'black'}}
              style={{
                borderRadius: 3,
                borderWidth: 1,
                borderColor: 'black',
                padding: 5,
                paddingHorizontal: 10,
                marginVertical: 15,
              }}
              containerStyle={{}}
              doneButtonText="Done"
              doneButtonTextStyle={{
                textAlign: 'center',
                color: '#1976D2',
                fontWeight: '500',
                fontSize: 16,
              }}
              titleText="Select Option"
              titleTextStyle={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
              }}
              onValueChange={value => {
                setSelected(value);
                setStatus(value);
              }}
              selected={selected}>
              {Object.values(status).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={val} />
              ))}
            </SelectPicker>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginBottom: 20,
                paddingVertical: 10,
                borderColor: 'lightgray',
                borderWidth: 2,
                backgroundColor: 'lightgray',
              }}>
              <View>
                <Text
                  style={{
                    color: 'blue',
                    fontWeight: '500',
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  TIME
                </Text>
                <Text style={{color: 'red', fontSize: 25, textAlign: 'center'}}>
                  {time}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'blue',
                    fontWeight: '500',
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  DATE
                </Text>
                <Text style={{color: 'red', fontSize: 25, textAlign: 'center'}}>
                  {date}
                </Text>
              </View>
            </View>
            <Button
              disabled={Status === '' ? true : false}
              color="white"
              contentStyle={{
                backgroundColor: Status === '' ? 'lightgray' : '#01b7a9',
              }}
              onPress={IamPresent}>
              Check-in
            </Button>
          </>
        )}
      </View>
    </View>
  );
};

export default Attendance;
