import React, { useState,useEffect } from 'react';
import { SafeAreaView, View,  Text,  StyleSheet, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView} from 'react-native';
import { AuthContext } from '../authcontext';
import { Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { LoginErrorModal } from '../modal/loginErrorModal';
import { IdPwdNotNullModal } from '../modal/IdPwdNotNullModal';
import { ErrorModal } from '../modal/ErrorModal';
import { DB } from '../globalVar';


export const authScreen = ({ navigation }) => {  
  const chartHeight = Dimensions.get('window').height;
  const chartWidth = Dimensions.get('window').width;
  // console.log(chartHeight, chartWidth)
  const [keyboardH, setKeyboadrH]=useState();
  // console.log(keyboardH)

  function _keyboardDidShow (e) {                //키보드 show 했을때 실행
    Height= e.endCoordinates.height-160;
    setKeyboadrH(Height);
  }
  function _keyboardDidHide () {              //키보드 hide 했을때 실행
    setKeyboadrH(0)
  }
  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',_keyboardDidShow);
    //키보드가 show 했을 때 
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', _keyboardDidHide);
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow'); // 이거였구나.....
      Keyboard.removeAllListeners('keyboardDidHide');
    }
  }, [keyboardH])
  const authContext = React.useContext(AuthContext);
  const [loginErrorModal, setLoginErrorModal]=useState(false);
  const [loginNotNullModal, setLoginNotNullModal] = useState(false);
  const [pwdErrorModal, setPwdErrorModal]=useState(false);

  const [id, setId] = useState();
  const [pwd, setPwd] = useState();
 
  const login = () => {
    console.log("pwd : "+pwd+ " id : "+id)
    if(id === null || pwd=== null){ // id pwd 널값
      setLoginNotNullModal(true);
    }else{
    DB.transaction( (tx) => { //우선 id pwd 모든 박스를 가져온다
      tx.executeSql(
        'SELECT id FROM user_info WHERE id=? ', //select  반드시 count
        [id],
        (tx,res) => {
          let len=res.rows.length;
          if(len===0){
            console.log("검색된 아이디가 없음");
            setLoginErrorModal(true);
          }else if(len>0){
            DB.transaction( (tx) => {
              tx.executeSql(
                'SELECT pwd FROM user_info WHERE id=?', // 
                [id],
                (tx,res)=>{
                  let pwdValid=res.rows.item(0).pwd;
                  console.log("------ Selected Pwd : "+pwdValid);
                  if(pwdValid===pwd){ //최종 일치 분기
                    getUser_no();
                  }else{
                    console.log("pwd and inputpwd not matched")
                    setPwdErrorModal(true);
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
    DB.transaction ( tx => {
      tx.executeSql(
        'SELECT * FROM user_info WHERE id=?', // select all 조심 , 컬럼명 명시 권장
        [id],
        (tx, res) => {// 
          let selected=res.rows
          let user_no=selected.item(0).user_no;
          AsyncStorage.setItem('user_no', JSON.stringify(user_no), () => { 
            // user_no 변수로 user_no값이 들어가 있는 user 저장
            authContext.userLogined=user_no;
          });
          let id=selected.item(0).id;
          let pwd=selected.item(0).pwd;
          let name=selected.item(0).name;
          let email=selected.item(0).email;
          let job=selected.item(0).job;
          let regi_date=selected.item(0).regi_date;
          let image=selected.item(0).image;
          // context 값 선언 방법 변경 권장 export 
          authContext.id=id;
          authContext.pwd=pwd;
          authContext.name=name;
          authContext.email=email;
          authContext.job=job;
          authContext.regi_date=regi_date;
          authContext.image=image;
          authContext.user_no=user_no;
          navigation.replace("MainScreen")
        }
      )
    })
  }
  const register = () => {
    navigation.navigate('Assign');
  };
  return (
    <SafeAreaView style={{
      backgroundColor: '#191970', alignItems: 'center', width:chartWidth, height:chartHeight,
      bottom:keyboardH,
    }}
    >
      <Text style={styles.headerText}> TO DO LIST</Text>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.idInput}
          onChangeText={id => setId(id)}
          placeholder="아이디 입력해주세요."
          placeholderTextColor="#191970"
          // defaultValue="Aldne"
          maxLength={22}
        />
        <TextInput
          style={styles.pwdInput}
          onChangeText={pwd => setPwd(pwd)}
          secureTextEntry={true}
          placeholder="비밀번호를 입력해주세요"
          placeholderTextColor="#191970"
          // defaultValue="121212"
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
      <IdPwdNotNullModal modalOn={loginNotNullModal} modalOff={ () => setLoginErrorModal(false)} />
      <LoginErrorModal modalOn={loginErrorModal} modalOff={() =>setLoginErrorModal(false)} />
      <ErrorModal modalOn={pwdErrorModal} modalOff={() => setPwdErrorModal(false)} message="아이디 혹은 비밀번호가 일치하지 않습니다." />
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
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
    marginTop: 6
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
