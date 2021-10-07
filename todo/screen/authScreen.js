import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { AuthContext } from '../authcontext';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { GOOGLE_LOGIN, GET_USER_INFO_BY_GOOGLE_ID } from '../sqliteConnection';
import { LoginErrorModal } from '../modal/loginErrorModal';
import { IdPwdNotNullModal } from '../modal/IdPwdNotNullModal';
import { ErrorModal } from '../modal/ErrorModal';
import { DB } from '../sqliteConnection';
import { styles } from './styles/authScreenStyle';

GoogleSignin.configure({});

export const authScreen = ({ navigation }) => {
  const chartHeight = Dimensions.get('window').height;
  const chartWidth = Dimensions.get('window').width;
  useEffect(() => {
    autoLogin();
    return () => {};
  }, []);
  //자동 로그인
  const user_no = AsyncStorage.getItem('user_no');
  console.log("Asyne remains?"+user_no)
  autoLogin = async () => {
    try {
      const user_no = await AsyncStorage.getItem('user_no');
      if (value != null) {
        console.log('Async Value :' + user_no);
        authContext.user_no = value;
        getInfoWhenAutoLogin(user_no);
        navigation.navigate('MainScreen');
      } else {
        console.log('ASync Null Login Required');
      }
    } catch (error) {}
  };

  const authContext = React.useContext(AuthContext);
  const [loginErrorModal, setLoginErrorModal] = useState(false);
  const [loginNotNullModal, setLoginNotNullModal] = useState(false);
  const [pwdErrorModal, setPwdErrorModal] = useState(false);

  const [id, setId] = useState('Aldne');
  const [pwd, setPwd] = useState('121212');

  const getInfoWhenAutoLogin = user_no => {
    DB.transaction(tx => {
      tx.executeSql(
        'SELECT id, pwd, name, email, job, regi_date, image, user_no FROM user_info WHERE user_no=?',
        // select all 조심 , 컬럼명 명시 권장
        [user_no],
        (tx, res) => {
          //
          let selected = res.rows;
          let user_no = selected.item(0).user_no;
          AsyncStorage.setItem('user_no', JSON.stringify(user_no))
          let id = selected.item(0).id;
          let pwd = selected.item(0).pwd;
          let name = selected.item(0).name;
          let email = selected.item(0).email;
          let job = selected.item(0).job;
          let regi_date = selected.item(0).regi_date;
          let image = selected.item(0).image;
          // context 값 선언 방법 변경 권장 export
          authContext.id = id;
          authContext.pwd = pwd;
          authContext.name = name;
          authContext.email = email;
          authContext.job = job;
          authContext.regi_date = regi_date;
          authContext.image = image;
          authContext.user_no = user_no;
        },
      );
    });
  };
  const login = () => {
    console.log('pwd : ' + pwd + ' id : ' + id);
    if (id === null || pwd === null) {
      // id pwd 널값
      setLoginNotNullModal(true);
    } else {
      DB.transaction(tx => {
        //
        tx.executeSql(
          'SELECT count(*) as count FROM user_info WHERE id=? AND pwd=? ', //select  반드시 count
          [id, pwd],
          (tx, res) => {
            let count = res.rows.item(0).count;
            console.log('Count ' + count);
            if (count > 0) {
              console.log('최종일치 ');
              getUser_no();
            } else if (count == 0) {
              console.log('pwd and inputpwd not matched');
              setPwdErrorModal(true);
            }
          },
          error => {},
        );
      });
    }
  };
  const getUser_no = () => {
    DB.transaction(tx => {
      tx.executeSql(
        'SELECT id, pwd, name, email, job, regi_date, image, user_no FROM user_info WHERE id=?', 
        [id],
        (tx, res) => {
          //
          let selected = res.rows;
          let user_no = selected.item(0).user_no;
          AsyncStorage.setItem('user_no', JSON.stringify(user_no), () => {
            // user_no 변수로 user_no값이 들어가 있는 user 저장
            authContext.userLogined = user_no;
          });
          let id = selected.item(0).id;
          let pwd = selected.item(0).pwd;
          let name = selected.item(0).name;
          let email = selected.item(0).email;
          let job = selected.item(0).job;
          let regi_date = selected.item(0).regi_date;
          let image = selected.item(0).image;
          // context 값 선언 방법 변경 권장 export
          authContext.id = id;
          authContext.pwd = pwd;
          authContext.name = name;
          authContext.email = email;
          authContext.job = job;
          authContext.regi_date = regi_date;
          authContext.image = image;
          authContext.user_no = user_no;
          //로그인 완료 후 메인스크린으로 이동
          navigation.replace('MainScreen');
          // replace 새로운 스택route로 바꾸기 때문에 authScreen이 stack Index에 존재하지 않게 된다
        },
      );
    });
  };
  const logout = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        console.log('gets here'); // LOGS THIS
        await GoogleSignin.revokeAccess(); // GETS STUCK HERE
        console.log('passed revoke access'); // doesn't log this
        await GoogleSignin.signOut();
        console.log('passed signOut');
      }
    } catch (err) {
      console.log(err);
    }
  }
  signIn = async () => {
    try{
      await GoogleSignin.hasPlayServices();
      const googleUserInfo = await GoogleSignin.signIn();
      let userIdFromGoogle=googleUserInfo.user.id
      // 처음엔 구글아이디로 로그인하고 해당 id와 일치하는 것이 존재한다면 
      // 그 아이디의 정보를 출력 
      GOOGLE_LOGIN(googleUserInfo)
      // console.log(GET_USER_INFO_BY_GOOGLE_ID(googleUserInfo.user.email))
      DB.transaction(tx => {
        tx.executeSql(
            'SELECT id, pwd, name, email, job, regi_date, image, user_no FROM user_info WHERE id=?',
            [userIdFromGoogle],
            (tx,res)=>{
                console.log("GET USER INFO BY GG ID SUCCESS")
                console.log(res.rows.item(0).id)
                console.log(res.rows.item(0).email)
                console.log(res.rows.item(0).user_no)
                authContext.id=res.rows.item(0).id
                authContext.pwd=res.rows.item(0).pwd
                authContext.user_no=res.rows.item(0).user_no
                AsyncStorage.setItem('user_no', JSON.stringify(res.rows.item(0).user_no))
                authContext.name=res.rows.item(0).name
                authContext.email=res.rows.item(0).email
                authContext.job=res.rows.item(0).job
                authContext.regi_date=res.rows.item(0).regi_date
                navigation.replace("MainScreen") //replace로 login화면으로 돌아올 수 없도록 수정
            },error => {
                console.log("GET USER INFO BY GG ID FAILED")
            }
        )
    })
      
    }catch(err){
      console.log(err);
    }
  };
 
  return (
    <SafeAreaView
      style={{
        backgroundColor: '#191970',
        alignItems: 'center',
        width: chartWidth,
        height: chartHeight,
      }}>
      <Text style={styles.headerText}> TO DO LIST</Text>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.idInput}
          onChangeText={id => setId(id)}
          placeholder="아이디 입력해주세요."
          placeholderTextColor="#191970"
          maxLength={22}
        />
        <TextInput
          style={styles.pwdInput}
          onChangeText={pwd => setPwd(pwd)}
          secureTextEntry={true}
          placeholder="비밀번호를 입력해주세요"
          placeholderTextColor="#191970"
          maxLength={22}
        />
        <TouchableOpacity onPress={login} style={styles.loginBtnContainer}>
          <Text style={styles.loginBtn}> 로 그 인 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.push('Assign')}
          style={styles.loginBtnContainer}>
          <Text style={styles.loginBtn}> 회 원 가 입</Text>
        </TouchableOpacity>
        <Text style={styles.showText}></Text>
        <Text style={styles.showText}></Text>
        <GoogleSigninButton
          onPress={signIn}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          style={{ width: 260, height: 60, marginRight:5, }}
        />
        <GoogleSigninButton
          onPress={logout}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          style={{ width: 260, height: 120, marginRight:5, }}
        />
      </View>
      <IdPwdNotNullModal
        modalOn={loginNotNullModal}
        modalOff={() => setLoginErrorModal(false)}
      />
      <LoginErrorModal
        modalOn={loginErrorModal}
        modalOff={() => setLoginErrorModal(false)}
      />
      <ErrorModal
        modalOn={pwdErrorModal}
        modalOff={() => setPwdErrorModal(false)}
        message="아이디 혹은 비밀번호가 일치하지 않습니다."
      />
    </SafeAreaView>
  );
};
