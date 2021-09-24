import React, { useRef, useState, useContext } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView, Button
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import SQLite from 'react-native-sqlite-storage';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../context';

export default assignscreen_photo = ({route, navigation}) => {
  const db = SQLite.openDatabase({
    name: 'testDB5',
    location: 'default',
    createFromLocation: 2,
  })
  const authContext=useContext(AuthContext);
  const nameRef = useRef();
  const [pictureSelected, setPicture] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [modalShow, setModal] = useState(false);
  const [name, setName] = useState(null);
  const [nameIsNull, setNameIsNN] = useState(false);

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
      includeBase64: true
    }).then(image => {
      setPicture(true);
      console.log("pictureSelectd : "+pictureSelected);
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
      includeBase64: true
    }).then(image => {
        setPicture(true);
        setProfileImage(image.path);
        setModal(!modalShow);
    });
  }
  const { id, pwd, job, email } = route.params;
  const finalize = () => {
    if(name === null){
      nameRef.current.focus();
      setNameIsNN(true);
    }else{
    db.transaction(tx => {
      const current_time=moment().format('llll');
      console.log(current_time);
      tx.executeSql(
          'INSERT INTO user_info (id, pwd, job, name, email, image, regi_date) VALUES (?,?,?,?,?,?,?)',
          [id,pwd,job,name,email,profileImage,current_time],
          (tx , res) => {
              console.log("id : "+id);
              console.log("pwd : "+pwd);
              console.log("name : "+name);
              console.log("job : "+job);
              console.log("image : "+profileImage);
              console.log("regi_date : "+current_time);
              select();
          }, error => {
            console.log("Insert Failed"+error);
          }
      );
    });
    }
  }
  const select = () => { 
    db.transaction( (tx) => {
      tx.executeSql(
        'SELECT * FROM user_info WHERE id=?',
        [id],
        (tx,res) => {
          console.log("select success")
          var user=res.rows.item(0).user_no;
          console.log("user_no : " + user);
          AsyncStorage.setItem('user_no', JSON.stringify(user), () => { // user_no 변수로 user_no값이 들어가 있는 user 저장
            console.log('유저 id 저장');
          });
          var selected=res.rows;
          var id=selected.item(0).id;
          var pwd=selected.item(0).pwd;
          var name=selected.item(0).name;
          var email=selected.item(0).email;
          var job=selected.item(0).job;
          var regi_date=selected.item(0).regi_date;
          var image=selected.item(0).image;
          authContext.id=id;
          authContext.pwd=pwd;
          authContext.name=name;
          authContext.email=email;
          authContext.job=job;
          authContext.regi_date=regi_date;
          authContext.image=image;
          console.log("image")
          navigation.replace("MainScreen")
        }, error => {
          console.log("Select Failed"+error)
        }
      )
    })
  }
  const deleteData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM user_info',
        [],
        (tx,res) => {
          console.log("DELETE 성공")
          
        }, error => {
          console.log("Select Failed")
        }
      )
    })
  }
  return (
    <KeyboardAvoidingView  contentContainerStyle={styles.scrollContainer} keyboardVerticalOffset={-200}
    behavior="position" >
      
      {/* <Button title="DDDDDDelete" onPress={deleteData}  style={{}} /> */}
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
          <TextInput  maxLength={10} backgroundColor="white"  placeholderTextColor={ nameIsNull ? "red" : "#dcdcdc"}  style={styles.nameInput}
           placeholder=" &nbsp;이름을 작성해주세요." onChangeText={name => setName(name)} ref={nameRef} 
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
    paddingLeft:10,
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
