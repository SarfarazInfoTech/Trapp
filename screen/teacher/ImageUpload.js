import React, {useState, useRoute} from 'react';
import {View, Text, Button, Image} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import Auth from '@react-native-firebase/auth';

const ImageUpload = () => {
  const [ImageData, setImageData] = useState(null);
  const [fullImagePath, setfullImagePath] = useState('');
  const [imgDownloadUrl, setimgDownloadUrl] = useState('');

  const picImage = async () => {
    try {
      const responce = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
        copyTo: 'cachesDirectory',
      });
      //   console.log('PicImage', responce);
      setImageData(responce);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async () => {
    try {
      const document = await Auth().currentUser.email;
      const responce = storage().ref(
        `/Documents/${document}/${ImageData.name}`,
      );
      const put = await responce.putFile(ImageData.fileCopyUri);
      setfullImagePath(put.metadata.fullPath);
      const url = await responce.getDownloadURL();
      setimgDownloadUrl(url);
      alert('Image Uploded');
    } catch (err) {
      console.log('upload', err);
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ImageUpload</Text>

      {ImageData ? (
        <Image
          source={{uri: ImageData.uri}}
          style={{width: '95%', height: '40%', margin: 10}}
        />
      ) : (
        <Text>No Image Found</Text>
      )}

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          alignContent: 'space-between',
        }}>
        <Button title="Select Image" onPress={() => picImage()} />

        <Button title="Upload" onPress={() => uploadImage()} />
      </View>
      <Text style={{margin: 10}}>{fullImagePath}</Text>
      <Image
        source={{uri: imgDownloadUrl}}
        style={{width: '95%', height: '40%', margin: 10}}
      />
      <Text style={{margin: 10}}>{imgDownloadUrl}</Text>
    </View>
  );
};

export default ImageUpload;
