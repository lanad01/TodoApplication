import React, { useRef, useState, useContext, useEffect } from 'react';
import {  View,  Image,  Text,  TouchableOpacity,  TextInput,  KeyboardAvoidingView,  Keyboard,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';

import { DPW } from '../dp';
import { styles } from './styles/assignScreenPhotoStyle';
import { AuthContext } from '../authcontext';
import { DB } from '../sqliteConnection';

export default assignscreen_photo = ({ route, navigation }) => {
  console.log('Assign 2nd');
  const authContext = useContext(AuthContext);
  const nameRef = useRef(); // 유저네임 Null일 경우 focus용
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', e => {
      // 키보드가 사라지면 화면을 직접 내려버린다.
      setRise(0)
    });
    // console.log('KeyboardHide unSubscribe');
    // Keyboard.removeAllListeners('keyboardDidHide');
    return () => {};
  }, []);

  const { id, pwd, job, email } = route.params; // assignScreen에서 작성된 유저 정보
  const [pictureSelected, setPicture] = useState(false); // 프로필 사진이 지정되었는지 안되었는지 여부
  const [profileImage, setProfileImage] = useState(null); // 프로필 사진 image.path
  const [modalShow, setModal] = useState(false); // 프로필 사진 지정 방법 모달
  const [name, setName] = useState(null); // 유저네임
  const [nameIsNull, setNameIsNN] = useState(false); // 유저네임 Null 메시지
  const [rise, setRise] = useState(0)
  const cropPicker_Opt = () => {
    return { cropping: true, includeBase64: true };
  };
  function pickOnePhoto() {
    ImagePicker.openPicker({ cropPicker_Opt }).then(image => {
      setPicture(true);
      console.log('pictureSelectd : ' + pictureSelected);
      setProfileImage(image.path);
      setModal(!modalShow);
    });
  }
  function callCamera() {
    ImagePicker.openCamera({ cropPicker_Opt }).then(image => {
      setPicture(true);
      setProfileImage(image.path);
      setModal(!modalShow);
    });
  }
  const finalize = () => {
    if (name === null) {
      nameRef.current.focus();
      setNameIsNN(true);
    } else {
      DB.transaction(tx => {
        const current_time = moment().format('llll');
        console.log(current_time);
        tx.executeSql(
          'INSERT INTO user_info (id, pwd, job, name, email, image, regi_date) VALUES (?,?,?,?,?,?,?)',
          [id, pwd, job, name, email, profileImage, current_time],
          (tx, res) => {
            console.log('id : ' + id);
            console.log('pwd : ' + pwd);
            console.log('name : ' + name);
            console.log('job : ' + job);
            console.log('image : ' + profileImage);
            console.log('regi_date : ' + current_time);

            select();
          },
          error => {
            console.log('Insert Failed' + error);
          },
        );
      });
    }
  };
  const select = () => {
    DB.transaction(tx => {
      tx.executeSql(
        'SELECT id, pwd, job, name, email, image, regi_date, job, user_no FROM user_info WHERE id=?',
        [id],
        (tx, res) => {
          console.log('select success');
          let user = res.rows.item(0).user_no;
          console.log('user_no : ' + user);
          AsyncStorage.setItem('user_no', JSON.stringify(user), () => {
            // user_no 변수로 user_no값이 들어가 있는 user 저장
            console.log('유저 id 저장');
          });
          let selected = res.rows;
          authContext.user_no = user;
          authContext.id = selected.item(0).id;
          authContext.pwd = selected.item(0).pwd;
          authContext.name = selected.item(0).name;
          authContext.email = selected.item(0).email;
          authContext.job = selected.item(0).job;
          authContext.regi_date = selected.item(0).regi_date;
          authContext.image = selected.item(0).image;
          console.log('image');
          navigation.replace('MainScreen');
        },
        error => {
          console.log('Select Failed' + error);
        },
      );
    });
  };
  return (
    <View style={styles.scrollContainer}>
      <View style={styles.headContainer}>
        <Text style={styles.headerText}>
          사진과 이름을 등록해주세요. {pictureSelected}
        </Text>
        <TouchableOpacity onPress={() => setModal(!modalShow)}>
          <Image
            source={
              pictureSelected
                ? { uri: profileImage }
                : require('../assets/profile3.jpg')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 700 * DPW,
          backgroundColor: '#191970',
          marginTop: 90 * DPW,
          alignItems: 'center',
          bottom: rise,
        }}>
        <TextInput
          maxLength={10}
          backgroundColor="white"
          placeholderTextColor={nameIsNull ? 'red' : '#dcdcdc'}
          style={styles.nameInput}
          placeholder=" &nbsp;이름을 작성해주세요."
          onChangeText={name => setName(name)}
          ref={nameRef}
          onFocus={ () => setRise(90)}
        />
        <Text style={styles.nameInfo}> 이름은 반드시 적어주셔야해요! </Text>
        <Text style={styles.Info}>
          프로필 정보(사진, 이름)는 회원 식별, 커뮤니케이션 등의 목적으로
          활용됩니다.{' '}
        </Text>
        <TouchableOpacity onPress={finalize} style={styles.footer}>
          <Text style={styles.btn}>등 록 하 기 </Text>
        </TouchableOpacity>
        <Modal isVisible={modalShow} avoidKeyboard={true} transparent={true}>
          <View>
            <TouchableOpacity onPress={pickOnePhoto} style={styles.choicebox}>
              <Text textAlign="center" style={styles.photochoose}>
                갤러리에서 사진 선택!{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={callCamera} style={styles.choicebox}>
              <Text style={styles.photochoose}>사진 촬영</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModal(!modalShow)}
              style={styles.choicebox}>
              <Text textAlign="center" style={styles.photochoose}>
                나 가 기{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};
