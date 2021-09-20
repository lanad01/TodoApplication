import React, {useState} from 'react';
import {
  SafetyAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Modal from "react-native-modal";
import { AuthContext } from '../context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ProfileEdit = () => {
  const authContext = React.useContext(AuthContext);
  const [pictureSelected, setPicture] = useState(false);
  const [profileImage, setProfileImage] = useState('exist');
  const [modalShow, setModal] = useState(false);
  function registerPhoto(){
    console.log(modalShow);
    setModal(!modalShow);
  }
  function pickOnePhoto() {
    ImagePicker.openPicker({
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
      includeBase64: true,
    }).then(image => {
      setPicture(true);
      console.log(pictureSelected);
      setProfileImage(image.path);
      setModal(!modalShow);
    });
  }
  function callCamera() {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
      includeBase64: true,
    }).then(image => {
      setPicture(true);
      setProfileImage(image.path);
      setModal(!modalShow);
    });
  }
  function changeProfileImage() {
    console.log('change Photo');
  }
  function saveBtn() {}
  function changePwd() {}
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={-100}>
      <View style={{ backgroundColor: '#191970', height: 10, width: '100%' }} />
      <Modal
          isVisible={modalShow}
          avoidKeyboard={true}
          transparent={true}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <TouchableOpacity onPress={pickOnePhoto} style={styles.choicebox}>
              <Text textAlign="center" style={styles.photochoose}>
                갤러리에서 사진 선택!{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={callCamera} style={styles.choicebox}>
              <Text style={styles.photochoose}>사진 촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={registerPhoto} style={styles.choicebox}>
              <Text textAlign="center" style={styles.photochoose}>
                나 가 기{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>  
      <View style={styles.topContainer}>
        <Image
          source={
            pictureSelected
              ? { uri: profileImage }
              : require('../assets/profile3.jpg')
          }
          style={{
            width: 150,
            height: 130,
            marginTop: 30,
            borderRadius: 60,
            borderWidth: 5,
            borderColor: 'powderblue',
          }}
        />
        <TouchableOpacity
          onPress={registerPhoto}
          style={{ marginTop: -35, marginLeft: 140 }}>
          <Image source={require('../assets/cameraEidt.png')} style={{}} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.categories}>
          <Text style={styles.text}> 이름(필수)</Text>
          <TextInput style={styles.input} defaultValue="DB Name" />
          <View style={styles.inputUnderLine} />
        </View>
        <View style={styles.categories}>
          <Text style={styles.text}> 이메일 주소</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            defaultValue="DB Name"
          />
          <View style={styles.inputUnderLine} />
        </View>
        <View style={styles.categories}>
          <Text style={styles.text}> 지 역</Text>
          <TextInput style={styles.input} defaultValue="DB Name" />
          <View style={styles.inputUnderLine} />
        </View>
        <View style={styles.categories}>
          <Text style={styles.text}> 직 장 </Text>
          <TextInput style={styles.input} defaultValue="DB Name" />
          <View style={styles.inputUnderLine} />
        </View>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <TouchableOpacity onPress={changePwd} style={styles.pwdChange}>
            <Text style={styles.pwdChangeText}> [ 비밀번호 변경 ]</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={saveBtn} style={styles.editBox}>
            <Text style={styles.editText}> 저장 </Text>
          </TouchableOpacity>
        </View>
        
      </View>
      
    </KeyboardAvoidingView>
  );
};
export default ProfileEdit;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    flex: 1,
  },
  topContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 200,
  },
  bottomContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: '64%',
  },
  categories: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 20,
  },
  text: {
    textAlign: 'left',
    fontFamily: 'BMJUA',
    color: 'gray',
    fontSize: 13,
    opacity: 0.4,
  },
  input: {
    width: 300,
    marginTop: -9,
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 20,
  },
  inputUnderLine: {
    width: 300,
    backgroundColor: 'gray',
    height: 3,
    opacity: 0.4,
    marginTop: -7,
  },
  pwdChange: {
    marginTop: 40,
  },
  pwdChangeText: {
    fontFamily: 'BMJUA',
    color: '#191970',
    fontSize: 23,
  },
  editBox: {
    backgroundColor: '#191970',
    margin: 30,
    height: 40,
    width: 100,
    borderColor: '#191970',
    borderWidth: 3,
  },
  editText: {
    textAlign: 'center',
    fontFamily: 'BMJUA',
    marginTop: 4,
    marginRight: 3,
    color: 'white',
    fontSize: 23,
  },
  btn:{
    textAlign:'center',
    width:230,
    alignItems:'center',
    fontFamily:"BMJUA",
    fontSize:30,
    color:'#191970',
    marginTop:4,
    paddingTop:10,
    borderWidth:5,
    borderColor:'#191970',
    borderRadius:30,
  },
  choicebox:{
    alignItems:'center',
    marginTop:15,
  },
  photochoose:{
    textAlign:"center",
    fontFamily:"BMJUA",
    fontSize:23,
    backgroundColor:'white',
    borderRadius:7,
    width:250,
    height:50,
    borderColor:'white',
    borderWidth:5,
    paddingTop:10,
  },
});
