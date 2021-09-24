import React, {useState, useEffect} from 'react';
import {  SafetyAreaView,  StyleSheet,  Text,  View,  Image,  TextInput,  KeyboardAvoidingView,  Platform,
    TouchableOpacity, Keyboard } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";
import { AuthContext } from '../context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { PwdChangeModal } from '../modal/PwdChangeModal';
import SQLite from 'react-native-sqlite-storage';

const ProfileEdit = ({navigation}) => {
  const db = SQLite.openDatabase({
    name: 'testDB5',
    location: 'default',
    createFromLocation: 2,
  })
  const authContext = React.useContext(AuthContext);
  const [pictureSelected, setPicture] = useState(false);
  const [profileImage, setProfileImage] = useState('exist');
  const [newName, setNewName]=useState(null); // not null
  const [newEmail,setNewEmail]=useState(null);
  const [newJob,setNewJob]=useState(null);

  const [modalShow, setModal] = useState(false);
  const [pwdChangeModal, setPwdChangeModal]=useState(false);
  useEffect(()=> {
    Keyboard.addListener("keyboardDidHide", e => {// 키보드가 사라지면 화면을 직접 내려버린다.
      setRise(0)
    })
    return() => { // useEffect에서 요기 return뒤의 값은 해당 컴포넌트가 종료될 때 실행된다
      // console.log("사라짐");
    }
  })
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
  function saveBtn() {
    console.log("save")
    db.transaction(tx => {
      tx.executeSql(
          'UPDATE user_info SET name=?,email=?,job=? WHERE user_no=?',
          [newName,newEmail,newJob, authContext.user_no],
          (tx , res) => {
              console.log("update success")
              authContext.name=newName;
              authContext.email=newEmail;
              authContext.job=newJob;
              navigation.navigate("Profile1st")
          }, error => {
            console.log("Update Failed"+error);
          }
      );
    });
  }

  function changePwd() {
    setPwdChangeModal(true);
  }
  function resetPwd(){
    console.log("Reset Pwd 도착")
    navigation.navigate("resetPwd")
  }
  const goBack = () => {
    navigation.replace("Profile1st")
  }
  const [rise, setRise] = useState();
  
  return (
    <KeyboardAvoidingView  behavior="position"style={{backgroundColor: '#191970', flex: 1, bottom : rise }}>
      <View style={{ backgroundColor: '#191970', height: 10, width: '100%' }} />
        <View style={styles.topContainer}>
          <View style={{flexDirection:'row', justifyContent:'flex-start', alignSelf:'flex-start'}}>
          <TouchableOpacity onPress={goBack}>
          <Image source={ require('../assets/back.png')}
          style={{width:60, height:60, marginTop:10, marginLeft:15}}/>
          </TouchableOpacity>
          </View>
          <Image source={ pictureSelected ? { uri: profileImage } : {uri: authContext.image } }
            style={styles.profile}/>
          <TouchableOpacity
            onPress={registerPhoto}
            style={{ marginTop: -35, marginLeft: 140, }}>
            <Image source={require('../assets/cameraEidt.png')} style={{}} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.categories}>
            <Text style={styles.text}> 이름(필수)</Text>
            <TextInput style={styles.input} placeholder={ authContext.name } 
            onChangeText={name => setNewName(name)}/>
            <View style={styles.inputUnderLine} />
          </View>
          <View style={styles.categories}>
            <Text style={styles.text}> 이메일 주소</Text>
            <TextInput style={styles.input} keyboardType="email-address"
              placeholder={authContext.email} onFocus={ () => setRise(100)}
              onChangeText={email => setNewEmail(email)}
            />
            <View style={styles.inputUnderLine} />
          </View>
          <View style={styles.categories}>
            <Text style={styles.text}> 지 역</Text>
            <TextInput style={styles.input} placeholder="Kalgoorlie Boulder"
            onFocus={ () => setRise(150)}
            />
            <View style={styles.inputUnderLine} />
          </View>
          <View style={styles.categories}>
            <Text style={styles.text}> 직 장 </Text>
            <TextInput style={styles.input} placeholder={authContext.job} 
            onFocus={ () => setRise(200)} onChangeText={job => setNewJob(job)}
            />
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
        <PwdChangeModal 
        modalOn={pwdChangeModal} modalOff={()=> setPwdChangeModal(false)} pwdVerify={authContext.pwd}
        resetPwd={resetPwd} />
      </View>
      <Modal isVisible={modalShow}  avoidKeyboard={true} transparent={true}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <TouchableOpacity onPress={pickOnePhoto} style={styles.choicebox}>
              <Text textAlign="center" style={styles.photochoose}>
                갤러리에서 사진 선택!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={callCamera} style={styles.choicebox}>
              <Text style={styles.photochoose}>사진 촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={registerPhoto} style={styles.choicebox}>
              <Text textAlign="center" style={styles.photochoose}>
                나 가 기
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>  
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
  profile:{
    width: 190,  height: 180,marginTop: -60,  borderRadius: 60,borderWidth: 5,borderColor: 'powderblue',
    
  },
});
