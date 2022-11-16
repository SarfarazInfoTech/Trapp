import React, {useState, useRoute} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
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

const options = [
  'Aadhaar Card *',
  'Bank Passbook',
  'Income Certificate *',
  'Domicile Certificate *',
  'SSC (10th) Marksheet *',
  'HSC (12th) Marksheet *',
  'Diploma Marksheet *',
  'Degree Marksheet *',
  'Cast Certificate (if required)',
  'Cast Validity (if required)',
  'Non Creamy Layer Certificate',
];
const ImageUpload = ({navigation}) => {
  const [ImageData, setImageData] = useState(null);
  const [fullImagePath, setfullImagePath] = useState('');
  const [imgDownloadUrl, setimgDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [docuName, setdocuName] = useState('');
  const [selected, setSelected] = useState();

  const picImage = async () => {
    try {
      if (!docuName) {
        alert('Please select document name.');
      } else {
        const responce = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.images],
          copyTo: 'cachesDirectory',
        });
        // console.log('PicImage', responce);
        setImageData(responce);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    setLoading(true);
    try {
      const UID = await Auth().currentUser.uid;
      const document = await Auth().currentUser.email;
      const responce = storage().ref(`/Documents/${document}/${docuName}`);
      const put = await responce.putFile(ImageData.fileCopyUri);
      setfullImagePath(put.metadata.fullPath);
      const url = await responce.getDownloadURL();
      setimgDownloadUrl(url);

      await database().ref(`Documents/${UID}`).push({
        documentName: docuName,
        documentURL: url,
        status: 'pending',
      });

      navigation.navigate('Home');
      Alert.alert(
        'Uploded Successfully',
        `You can upload more documents click upload.`,
        [
          {
            text: 'upload',
            onPress: () => navigation.navigate('Documents Upload'),
          },
          {
            text: 'close',
            onPress: () => console.log('close'),
          },
        ],
      );
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
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'white',
          }}>
          <View style={{backgroundColor: 'white'}}>
            <SelectPicker
              placeholder="-- Select Document Name --"
              placeholderStyle={{fontSize: 18, color: 'gray'}}
              onSelectedStyle={{fontSize: 18, color: '#01b7a9'}}
              style={{
                borderRadius: 3,
                borderWidth: 2,
                borderColor: '#01b7a9',
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
              titleText="Upload Document"
              titleTextStyle={{
                textAlign: 'center',
                color: 'black',
                fontSize: 16,
              }}
              onValueChange={value => {
                setSelected(value);
                setdocuName(value);
              }}
              selected={selected}>
              {Object.values(options).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={val} />
              ))}
            </SelectPicker>
            <Button title="Choose" onPress={() => picImage()} />
          </View>
          {ImageData ? (
            <View style={{width: '95%', height: '70%', margin: 15}}>
              <Image
                source={{uri: ImageData.uri}}
                style={{width: '100%', height: '100%'}}
              />
            </View>
          ) : null}

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              alignContent: 'space-between',
            }}>
            {ImageData ? (
              <Button
                color="green"
                title="Upload Document"
                onPress={() => uploadImage()}
              />
            ) : null}
          </View>

          {/* <Text style={{margin: 10}}>{fullImagePath}</Text> */}
          {/* <Image
            source={{uri: imgDownloadUrl}}
            style={{width: '95%', height: '40%', margin: 10}}
          /> */}
          {/* <Text style={{margin: 10}}>{imgDownloadUrl}</Text> */}
        </View>
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
export default ImageUpload;
