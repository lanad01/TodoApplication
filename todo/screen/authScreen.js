import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from "react-native-modal";
import { AuthContext } from '../context';
import SQLite from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginErrorModal } from '../modal/loginErrorModal';
import { IdPwdNotNullModal } from '../modal/IdPwdNotNullModal';

export const authScreen = ({ navigation }) => {  
  const db = SQLite.openDatabase({
    name: 'testDB5',
    location: 'default',
    createFromLocation: 2,
  })
  useEffect(() => {
    autoLogin();
    return () => {
    }
  }, [])
  const authContext = React.useContext(AuthContext);
  const autoLogin = () => {
    console.log("Auth Context : "+authContext.user_no);
  }
  const [loginErrorModal, setLoginErrorModal]=useState(false);
  const modalOff = () => {
    setLoginErrorModal(false);
  }
  const [loginNotNullModal, setLoginNotNullModal] = useState(false);
  const loginNotNullModallOff = () => {
    setLoginNotNullModal(false);
  }

  const [id, setId] = React.useState(null);
  const [pwd, setPwd] = React.useState(null);
 
  const login = () => {
    console.log("pwd : "+pwd+ " id : "+id)
    if(id === null || pwd=== null){ // id pwd 널값
      setLoginNotNullModal(true);
    }else{
    db.transaction( (tx) => { //우선 id pwd 모든 박스를 가져온다
      tx.executeSql(
        'SELECT id FROM user_info WHERE id=?  ',
        [id],
        (tx,res) => {
          console.log("Select 분기 arrive")
          console.log("ID : "+id);
          var len=res.rows.length;
          console.log(len)
          if(len===0){
            console.log("검색된 아이디가 없음");
            setLoginErrorModal(true);
          }else if(len>0){
            console.log("--검색된 아이디가 있음")
            db.transaction( (tx) => {
              tx.executeSql(
                'SELECT pwd FROM user_info WHERE id=?',
                [id],
                (tx,res)=>{
                  var pwdValid=res.rows.item(0).pwd;
                  console.log("------ Selected Pwd : "+pwdValid);
                  if(pwdValid===pwd){ //최종 일치 분기
                    console.log("Matched Pwd")
                    getUser_no();
                  }else{
                    console.log("pwd and inputpwd not matched")
                  }
                }
              )
            })
          } // 아이디 일치 분기 종료
        }, error => {
        }
      )
    })
  }
  };
  const getUser_no = () => {
    db.transaction ( tx => {
      tx.executeSql(
        'SELECT user_no FROM user_info WHERE id=?',
        [id],
        (tx, res) => {
          var user_no=res.rows.item(0).user_no;
          console.log("user_no : "+user_no);
          AsyncStorage.setItem('user_no', JSON.stringify(user_no), () => { // user_no 변수로 user_no값이 들어가 있는 user 저장
            console.log('유저 id 저장 [ authScreen ] : '+ user_no);
            authContext.userLogined=user_no;
            console.log("auth Default :"+authContext.userLogined)
            
          });
          navigation.replace("MainScreen")
        }
      )
    })
  }
  const register = () => {
    navigation.navigate('Assign');
  };
  return (
    <View style={styles.container}>
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
        <TouchableOpacity  onPress={login} style={styles.loginBtnContainer}>
          <Text style={styles.loginBtn}> 로 그 인 </Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={register} style={styles.loginBtnContainer}>
          <Text  style={styles.loginBtn}>  회 원 가 입</Text>
        </TouchableOpacity>
        <Text style={styles.showText}></Text>
        <Text style={styles.showText}></Text>
      </View>
      <IdPwdNotNullModal modalOn={loginNotNullModal} modalOff={loginNotNullModallOff} />
      <LoginErrorModal modalOn={loginErrorModal} modalOff={modalOff} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    paddingTop: 30,
    alignItems: 'center',
    fontSize: 38,
    color: 'white',
    top: 50,
    fontFamily: 'BMJUA',
  },
  bodyContainer: {
    backgroundColor: '#191970',
    paddingHorizontal: 20,
    marginVertical: 30,
    flex: 1,
    width: 300,
    top: 50,
  },
  idInput: {
    fontFamily: 'BMJUA',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 60,
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 3,
    color: '#191970',
    fontSize: 19,
  },
  pwdInput: {
    // fontFamily:"BMJUA",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#E6E6FA',
    borderWidth: 3,
    color: '#191970',
    fontSize: 19,
  },
  showText: {
    marginTop: 30,
    fontSize: 25,
    color: 'white',
  },
  loginBtnContainer:{
    backgroundColor: '#AFEEEE',
    height: 40,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
    marginTop: 30,
  },
  loginBtn: {
    alignItems: 'center',
    fontFamily: 'BMJUA',
    fontSize: 20,
    color: '#191970',
    marginTop: 6,
  },
  choicebox:{
    alignItems:'center',
    marginTop:15,
  },
  outside:{
    width:400,
    height:700,
    justifyContent:'center',
    alignItems:'center',
    zIndex:1
  },
  photochoose:{
    textAlign:"center",
    fontFamily:"BMJUA",
    fontSize:23,
    backgroundColor:'white',
    borderRadius:7,
    borderWidth:5,
    width:150,
    borderWidth:5,
    paddingTop:10,
    zIndex:4,
  },
  validModal:{
    width:300,
    height:150,
    backgroundColor:'white',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    shadowOffset:{
      width:0,
      height:9
    },
    shadowColor:"#191970",
    shadowRadius: 12.35,
    elevation: 19,
    zIndex:3,
  },
  validText:{
    fontFamily:'BMJUA',
    fontSize:18,
  },  
});
