import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import SQLite from 'react-native-sqlite-storage';


export default assignscreen_photo = ({route, navigation}) => {
  const db = SQLite.openDatabase({
    name: 'testDB3',
    location: 'default',
    // createFromLocation: '~www/Todo2.db',
  })
  const { user_name, user_pwd, user_job, user_email } = route.params;
  console.log("아이고난     "+user_name+user_pwd+user_job+user_email)
  const [pictureSelected, setPicture] = useState(false);
  const [profileImage, setProfileImage] = useState('exist');
  const [ modalShow, setModal ] = useState(false);
  function registerPhoto(){
      console.log(modalShow);
      setModal(!modalShow);
  }
  function pickOnePhoto() {
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
      // compressImageQuality:1,
      // cropping: true,
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
      includeBase64: true
    }).then(image => {
      setPicture(true);
      console.log(pictureSelected);
      setProfileImage(image.path);
      setModal(!modalShow);
    });
  }
  function callCamera() {
    ImagePicker.openCamera({
      // width: 300,
      // height: 400,
      // cropping: true,
      // compressImageQuality:1,
      // compressImageMaxHeight:400,
      // compressImageMaxWidth:300
      cropping: true,
      width: 500,
      height: 500,
      cropperCircleOverlay: true,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      freeStyleCropEnabled: true,
      includeBase64: true
    }).then(image => {
        setPicture(true);
        setProfileImage(image.path);
        setModal(!modalShow);

    });
  }
  const insert = () => {
    db.transaction(tx => {
      console.log(profileImage);
      tx.executeSql(
          'INSERT INTO user (image) VALUES ("VarcharValue")',
          [],
          (tx , res) => {
              console.log("Insert successfully Done");
              select();
          }, error => {
            console.log("Insert Failed"+error);
          }
      );
  });
  }
  const select = () => { 
    db.transaction(tx => {
      tx.executeSql(
        'SELECT regi_date, image FROM user',
        [],
        (tx,res) => {
          var len=res.rows.length;
          for(let i=0; i < len ; i++){
          console.log(res.rows.item(i).regi_date)
          console.log(res.rows.item(i).image)

          }
        }, error => {
          console.log("Select Failed")
        }
      )
    })
  }
  function finalize (){
    // console.log(name);
    // console.log(profileImage);
    insert();
    // navigation.navigate("Auth");

  }
  return (
    <KeyboardAvoidingView  contentContainerStyle={styles.scrollContainer} keyboardVerticalOffset={-200}
    behavior="position" >
        <View style={{ height:'5%', backgroundColor: '#191970' }} />
        <View style={styles.headContainer}>
          <Text style={styles.headerText}> 사진과 이름을 등록해주세요. {pictureSelected} </Text>
          <TouchableOpacity onPress={registerPhoto}>
            <Image
              source={
                pictureSelected
                  ? { uri: profileImage }
                  : require('../assets/profile3.jpg')
              }
              style={{ width: 250, height: 220,  marginTop: 20, borderRadius: 50,  }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btmContainer}>
          <TextInput  maxLength={10} backgroundColor="white"  placeholderTextColor="#dcdcdc"  style={styles.nameInput}
           placeholder=" &nbsp;이름을 작성해주세요."
          />
          <Text style={styles.nameInfo}> 이름은 반드시 적어주셔야해요! </Text>
          <Text style={styles.Info}>
            프로필 정보(사진, 이름)는 회원 식별, 커뮤니케이션 등의 목적으로 활용됩니다.{' '}
          </Text>
          <TouchableOpacity onPress={finalize} style={styles.footer} >
                  <Text style={styles.btn}>등 록 하 기 </Text>
          </TouchableOpacity>
          <Modal isVisible={modalShow} avoidKeyboard={true} transparent={true}
             style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View >
                <TouchableOpacity onPress={pickOnePhoto} style={styles.choicebox}>
                    <Text textAlign="center" style={styles.photochoose} >갤러리에서 사진 선택! </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={callCamera} style={styles.choicebox}>
                    <Text  style={styles.photochoose} >사진 촬영</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={registerPhoto} style={styles.choicebox}>
                    <Text textAlign="center" style={styles.photochoose} >나 가 기 </Text>
                </TouchableOpacity>       
            </View>
            </Modal>
        </View>
       
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#191970',
  },
  scrollContainer:{
    backgroundColor: "white",
    flexGrow:1 //added flexGrow
  },
  headContainer: {
    height:'40%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'BMJUA',
    fontSize: 25,
    color: '#191970',
    marginTop: 30,
    marginLeft: 20,
  },
  btmContainer: {
    height:'50%',
    backgroundColor: '#191970',
    marginTop: 50,
    alignItems: 'center',
  },
  nameInput: {
    width: 280,
    height: 50,
    borderRadius: 10,
    fontFamily: 'BMJUA',
    fontSize: 23,
    color: '#191970',
    marginLeft: 4,
    marginTop:50,
  },
  nameInfo: {
    fontFamily: 'BMJUA',
    color: 'white',
    fontSize: 22,
    marginRight: 38,
    marginLeft:10,
    marginTop: 12,
  },
  Info: {
    fontFamily: 'BMJUA',
    color: 'white',
    fontSize: 12,
    marginRight: 60,
    marginTop: 10,
    width: 200,
  },
  footer:{
    width:250,
    height:60,
    backgroundColor:'white',
    borderRadius:30,
    alignItems:'center',
    marginTop:30,

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
