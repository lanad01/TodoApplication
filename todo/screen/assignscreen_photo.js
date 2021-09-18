import React, { useState } from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default assignscreen_photo = () => {
  const [ pictureSelected, setPicture ] = useState(false);
  const [ profileImage, setProfileImage ] = useState("exist");
  function pickOnePhoto() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setPicture(true);
      console.log(pictureSelected);
      setProfileImage(image.path);
    });
  }
  function callCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image.path);
      setProfileImage(image.path);
      alert(pictured);
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
    <View style={styles.container}>
      <View style={{ flex: 0.03, backgroundColor: '#191970' }} />
      <View style={styles.headContainer}>
        <Text style={styles.headerText}> 사진과 이름을 등록해주세요.  {pictureSelected} </Text>
        <TouchableOpacity onPress={pickOnePhoto}>
          <Image source={pictureSelected ? {uri : profileImage} : require('../assets/profile3.jpg')}  
          style={{ width: 250, height: 220, marginTop: 20, borderRadius:50 }} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 0.01, backgroundColor: '#191970' }} />
      <View style={{ flex: 0.02, backgroundColor: 'white' }} />
      <View style={styles.btmContainer}>
          <TextInput maxLength={10} backgroundColor='white' style={styles.nameInput} placeholder=" &nbsp;이름을 작성해주세요." />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191970',
  },
  headContainer: {
    backgroundColor: 'white',
    flex: 0.5,
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'BMJUA',
    fontSize: 25,
    color: '#191970',
    marginTop: 30,
    marginLeft:20
  },
  btmContainer:{
    backgroundColor: '#191970',
    marginTop:30,
    alignItems:'center',

  },
  nameInput:{
    width:280,
    height:50,
    borderRadius:15,
    fontFamily:"BMJUA",
    fontSize:23,
    color:'#191970',
    marginLeft:20,

  },    
});
