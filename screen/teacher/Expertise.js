import React, {useState, useRoute} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import SelectPicker from 'react-native-form-select-picker';

const options = ['Audio', 'Video', 'Image', 'Document'];
const Expertise = ({navigation}) => {
  const [FileData, setFileData] = useState(null);
  const [FilePath, setFilePath] = useState('');
  const [FileDownloadUrl, setFileDownloadUrl] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [FileName, setFileName] = useState('');
  const [selected, setSelected] = useState();

  const pickFile = async () => {
    try {
      if (!FileName) {
        Alert.alert('', 'Please select filename');
      } else {
        const responce = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.allFiles],
          copyTo: 'cachesDirectory',
        });
        // console.log('pickFile', responce);
        setFileData(responce);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = async () => {
    setLoading(true);
    try {
      const UID = await Auth().currentUser.uid;
      const document = await Auth().currentUser.email;
      const responce = storage().ref(`/Expertise/${document}/${FileData.name}`);
      const put = await responce.putFile(FileData.fileCopyUri);
      setFilePath(put.metadata.fullPath);
      const url = await responce.getDownloadURL();
      setFileDownloadUrl(url);

      await database().ref(`Expertise/${UID}`).push({
        topic: topic,
        fileName: FileName,
        fileUrl: url,
        description: description,
        uploadAt: new Date().toISOString(),
      });

      navigation.navigate('Home');
      Alert.alert('Uploded Successfully', `You can add more expertise.`, [
        {
          text: 'upload',
          onPress: () => navigation.navigate('Expertise'),
        },
        {
          text: 'close',
          onPress: () => console.log('close'),
        },
      ]);
    } catch (err) {
      console.log('upload', err);
    } finally {
      setLoading(false);
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
            textStyle={styles.spinnerTextStyle}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              // justifyContent: 'flex-start',
              // alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
            }}>
            <View>
              <Text style={{color: 'black', margin: 10}}>Topic</Text>
              <TextInput
                mode="outlined"
                label={'Topic'}
                placeholder={'Enter Topic'}
                value={topic}
                onChangeText={value => setTopic(value)}
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
              <Text style={{color: 'black', margin: 10}}>Description</Text>
              <TextInput
                mode="outlined"
                label={'Description'}
                placeholder={'Enter Description'}
                value={description}
                onChangeText={value => setDescription(value)}
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
            </View>
            <View style={{backgroundColor: 'white', marginBottom: 20}}>
              <Text style={{color: 'black', margin: 10}}>Choose file</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <SelectPicker
                  placeholder="Select filename"
                  placeholderStyle={{fontSize: 16, color: 'gray'}}
                  onSelectedStyle={{fontSize: 16, color: 'black'}}
                  style={{
                    marginHorizontal: 10,
                    borderColor: 'lightgray',
                    borderWidth: 1,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    width: '80%',
                  }}
                  containerStyle={{}}
                  doneButtonText="Done"
                  doneButtonTextStyle={{
                    textAlign: 'center',
                    color: '#1976D2',
                    fontWeight: '500',
                    fontSize: 16,
                  }}
                  titleText="Filename"
                  titleTextStyle={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: 16,
                  }}
                  onValueChange={value => {
                    setSelected(value);
                    setFileName(value);
                  }}
                  selected={selected}>
                  {Object.values(options).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={val} />
                  ))}
                </SelectPicker>
                <TouchableOpacity
                  style={{width: '20%'}}
                  onPress={() => pickFile()}>
                  <Image
                    source={{
                      uri: 'https://www.iconbunny.com/icons/media/catalog/product/4/5/452.8-file-manager-icon-iconbunny.jpg',
                    }}
                    style={{width: 50, height: 40}}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {FileData ? (
              <View
                style={{
                  width: '100%',
                  marginHorizontal: 10,
                  paddingBottom: 10,
                }}>
                <Text>Filename : {FileData.name}</Text>
              </View>
            ) : null}
            <View
              style={{
                // width: '90%',
                margin: 10,
                // flexDirection: 'row',
                // justifyContent: 'space-around',
                // alignItems: 'center',
                // alignContent: 'space-between',
              }}>
              {FileData ? (
                <Button
                  color="green"
                  title="Add Expertise"
                  onPress={() => uploadFile()}
                />
              ) : null}
            </View>

            {/* <Text style={{margin: 10}}>{FilePath}</Text> */}
            {/* <Image source={{uri: FileDownloadUrl}} style={{width: '95%', height: '40%', margin: 10}} /> */}
            {/* <Text style={{margin: 10}}>{FileDownloadUrl}</Text> */}
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    flex: 1,
  },
});
export default Expertise;
