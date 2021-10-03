import React, {useState, useEffect} from 'react';
import { Text,  View,  Image,  TextInput,  KeyboardAvoidingView,  Platform, Alert,
    TouchableOpacity, Keyboard } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from "react-native-modal";

import { AuthContext } from '../authcontext';
import { PwdChangeModal } from '../modal/PwdChangeModal';
import { ErrorModal } from '../modal/ErrorModal';
import { DB } from '../globalVar';
import { styles } from './styles/profileEditStyle';

const ProfileEdit = ({navigation}) => {
  const authContext = React.useContext(AuthContext);
  const [pictureSelected, setPicture] = useState(false);
  const [profileImage, setProfileImage] = useState(authContext.image);
  const [newName, setNewName]=useState(null); // not null
  const [newEmail,setNewEmail]=useState(null); // 바꿀 email
  const [newJob,setNewJob]=useState(null);
  // const [ data, setData]=useState( [

  // ])
  const [errorModal, setErrorModal]=useState(false) //이름 불일치
  const [modalShow, setModal] = useState(false);
  const [pwdChangeModal, setPwdChangeModal]=useState(false);
  useEffect(()=> {
    Keyboard.addListener("keyboardDidHide", e => {  // 키보드가 사라지면 화면을 직접 내려버린다.
      setRise(0)
    })
    return() => { // useEffect에서 요기 return뒤의 값은 해당 컴포넌트가 종료될 때 실행된다
      console.log("Unmounted from Profile Edit")
      Keyboard.removeAllListeners('keyboardDidHide'); //resource Leak 에러메시지 해결
    },
    []
  })
  const cropPicker_Opt = () => {
    return {
      cropping: true,
      includeBase64: true,
    }
  }
  function pickOnePhoto(){ //갤러리에서 선택
    ImagePicker.openPicker({cropPicker_Opt})
    .then(image => {
      setPicture(true);
      setProfileImage(image.path);
      setModal(!modalShow);
    }).catch(e => {
      if(e.code !== 'E_PICKER_CANCELLED') {
        console.log(e);
        Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
      }});
  }
  function callCamera() {
    ImagePicker.openCamera({cropPicker_Opt})
    .then(image => {
      setPicture(true);
      setProfileImage(image.path);
      setModal(!modalShow);
    }).catch(e => {
      if(e.code !== 'E_PICKER_CANCELLED') {
        console.log(e);
        Alert.alert('Sorry, there was an issue attempting to get the image/video you selected. Please try again');
      }});
  }
  const saveConfirm = () => {
    if(newName===null){
      console.log("Errormodal")
      setErrorModal(true)
    }else if(newName != null){
      saveBtn();
    }
  }
  function saveBtn() {
    console.log("********************************************")
    console.log("ProfileImage :"+profileImage)
    console.log("AuthImage :"+authContext.image)
    console.log("********************************************")
    if(profileImage===undefined){ // 건드리지 않았을 때
      console.log("건드리지 않았을 때")
      setProfileImage(authContext.image)
    }
    if(profileImage!=authContext.image){ //프로필 이미지를 수정했을 때 
      console.log("프로필을 수정했을 때")
      authContext.image=profileImage;
    }
    DB.transaction(tx => {
        tx.executeSql(
          'UPDATE user_info SET name=?,email=?,job=?, image=? WHERE user_no=?',
          [newName,newEmail,newJob,authContext.image, authContext.user_no],
          (tx , res) => {
              console.log("update success")
              authContext.name=newName;
              authContext.email=newEmail;
              authContext.job=newJob;
              navigation.navigate("ProfileMain")
          }, error => {
            console.log("Update Failed"+error);
          }
      );
      });
    }
  const [rise, setRise] = useState(); //Keyboard Avoiding
  
  return (
    <KeyboardAvoidingView  behavior="position"style={{backgroundColor: '#191970', flex: 1, bottom : rise }}>
      <View style={{ backgroundColor: '#191970', height: 10, width: '100%' }} />
        <View style={styles.topContainer}>

          <View style={styles.backBtnView}>
            <TouchableOpacity onPress={ () => navigation.replace("ProfileMain")}>
              <Image source={ require('../assets/back.png')}
                style={styles.backImg}/>
            </TouchableOpacity>
          </View>

          <Image source={ pictureSelected ? { uri: profileImage } : {uri: authContext.image } }
            style={styles.profile}/>
          <TouchableOpacity
            onPress={ () => setModal(!modalShow)}
            style={{ marginTop: -35, marginLeft: 140, }}>
            <Image source={require('../assets/cameraEidt.png')} style={{}} />
            {/* <Image source={ {uri : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}}/> */}
          </TouchableOpacity>

        </View>

       {/* 하단부 디테일 */}
        <View style={styles.bottomContainer}> 
          <View style={styles.categories}>
            <Text style={styles.text}> 이름(필수)</Text>
            <TextInput style={styles.input}  placeholder={authContext.name}
            onChangeText={name => setNewName(name)}/>
            <View style={styles.inputUnderLine} />
          </View>
          <View style={styles.categories}>
            <Text style={styles.text}> 이메일 주소</Text>
            <TextInput style={styles.input} keyboardType="email-address"
              placeholder={authContext.email != null ? authContext.email : "이메일은 공란입니다"} 
              onFocus={ () => setRise(100)}
              onChangeText={email => setNewEmail(email)}
            />
            <View style={styles.inputUnderLine} />
          </View>
          <View style={styles.categories}>
            <Text style={styles.text}> 지 역</Text>
            <TextInput style={styles.input} placeholder="Kalgoorlie Boulder" onFocus={() => setRise(150)}
            />
            <View style={styles.inputUnderLine} />
          </View>
          <View style={styles.categories}>
            <Text style={styles.text}> 직 장 </Text>
            <TextInput style={styles.input} placeholder={authContext.job !=null ? authContext.job : "직장란은 공란입니다." } 
            onFocus={ () => setRise(200)} onChangeText={job => setNewJob(job)}
            />
            <View style={styles.inputUnderLine} />
          </View>
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TouchableOpacity onPress={ () => setPwdChangeModal(true)} style={styles.pwdChange}>
              <Text style={styles.pwdChangeText}> [ 비밀번호 변경 ]</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={saveConfirm} style={styles.editBox}>
              <Text style={styles.editText}> 저장 </Text>
            </TouchableOpacity>
        </View>
        <PwdChangeModal 
          modalOn={pwdChangeModal} modalOff={()=> setPwdChangeModal(false)} pwdVerify={authContext.pwd}
          resetPwd={ () => navigation.navigate("resetPwd") } />
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
            <TouchableOpacity onPress={() => setModal(!modalShow)} style={styles.choicebox}>
              <Text textAlign="center" style={styles.photochoose}>
                나 가 기
              </Text>
            </TouchableOpacity>
          </View>
          <ErrorModal modalOn={errorModal} message="이름은 반드시 적어주셔야   합니다."
            modalOff={ () => setErrorModal(false)}/>
        </Modal>  
    </KeyboardAvoidingView>
  );
};
export default ProfileEdit;

