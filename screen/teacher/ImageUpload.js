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

const ImageUpload = ({navigation}) => {
  const [ImageData, setImageData] = useState(null);
  const [fullImagePath, setfullImagePath] = useState('');
  const [imgDownloadUrl, setimgDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [docuName, setdocuName] = useState('');

  const picImage = async () => {
    try {
      if (!docuName) {
        alert('Please write document name then select document');
      } else {
        const responce = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.images],
          copyTo: 'cachesDirectory',
        });
        //   console.log('PicImage', responce);
        setImageData(responce);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    setLoading(true);
    try {
      const document = await Auth().currentUser.email;
      const responce = storage().ref(`/Documents/${document}/${docuName}`);
      const put = await responce.putFile(ImageData.fileCopyUri);
      setfullImagePath(put.metadata.fullPath);
      const url = await responce.getDownloadURL();
      setimgDownloadUrl(url);

      const docuData = {
        name: docuName,
        documentURL: url,
      };
      await firestore().collection('Documents').doc(document).set(docuData);
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {ImageData ? (
            <Image
              source={{uri: ImageData.uri}}
              style={{width: '95%', height: '80%', margin: 10}}
            />
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
            ) : (
              <>
                <TextInput
                  style={{
                    color: 'darkgreen',
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: 'gray',
                    padding: 3,
                    paddingHorizontal: 15,
                    margin: 5,
                  }}
                  placeholder="Document name"
                  value={docuName}
                  onChangeText={value => setdocuName(value)}
                  maxLength={15}
                />
                <Button title="Select Document" onPress={() => picImage()} />
              </>
            )}
          </View>

          {/* <Text style={{margin: 10}}>{fullImagePath}</Text> */}
          {/* <Image
            source={{uri: imgDownloadUrl}}
            style={{width: '95%', height: '40%', margin: 10}}
          /> */}
          <Text style={{margin: 10}}>{imgDownloadUrl}</Text>
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
