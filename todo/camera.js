import React from 'react';
import { View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useState } from 'react/cjs/react.development';

export default camera = () => {
  const [ pictured, setPictured ] = useState();
  function pickOnePhoto() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  }
  function callCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setPictured(image.path);
      alert(pictured)
    });
  }
  function selectVideo() {
    ImagePicker.openPicker({
      mediaType: 'video',
    }).then(video => {
      console.log(video);
    });
  }
  return (
    <View>
      <Button title="Pick One Photo" onPress={pickOnePhoto} />
      <Button title="Pick one Video" onPress={selectVideo} />
      <Button title="Let me take picture myself" onPress={callCamera} />
      <Image style={{width:200 ,height:200}} source={{uri:pictured}} />
    </View>
  );
};
