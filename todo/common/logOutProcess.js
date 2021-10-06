import React, { useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../authcontext';

export const LOGOUT = () => {
  //로그아웃 Alert
  Alert.alert(
    '로그아웃하시겠습니까?',
    '',
    [
      {
        text: '아니오',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: '예',
        onPress: () => logOutImple()
      },
    ],
    { cancelable: false },
  );

 

};
function logOutImple() {
    //로그아웃 실행
    AsyncStorage.removeItem('user_no'); // AsyncStorage 삭제
    console.log('로그아웃 실행');
  }
