import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView ,Image, StyleSheet, Text, 
  TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DB } from '../globalVar';
import { styles } from './styles/assignScreenStyle';
import { ErrorModal } from '../modal/ErrorModal'; 

export default assignScreen = ( { navigation }) => {
  const idRef = useRef(); // useRefsms Dom을 부른다
  const pwdRef = useRef();
  const [ rise, setRise ] = useState(false);

  const [ id, setId ] = useState(null); 
  const [ idNull, setIdNull ] = useState(false);
  const [ idNNMessage, setIdNNMessage ] = useState();
  const [ dupIdError, setDupIdError ] = useState(false);

  const [ pwd, setpwd ] = useState(null);
  const [ pwdNull, setPwdNull ] = useState(false);
  const [ pwdNNMsg, setPwdNNMsg ] = useState();

  const [ job, setJob ] = useState(null);
  const [ email, setEmail ] = useState(null);
  
  const changeView = () => { //아래 두 항목에서 Keyboard 이벤트 발생 시 화면을 직접 올려버린다.
    setRise(true);
  }
  useEffect(()=> {
    Keyboard.addListener("keyboardDidHide", e => {// 키보드가 사라지면 화면을 직접 내려버린다.
      setRise(false)
    })
    return() => { // useEffect에서 요기 return뒤의 값은 해당 컴포넌트가 종료될 때 실행된다
      Keyboard.removeAllListeners('keyboardDidHide'); //resource Leak 에러메시지 해결
     }
  })
  const modalOff = () => {
    setDupIdError(false)
    idRef.current.focus();
  }
  function nextPage(){
    if(id === null && pwd!=null){ //id Null
      setIdNull(true);
      setIdNNMessage(" !! ID는 반드시 입력해주셔야 합니다.");
      idRef.current.focus();
    }else if(pwd === null && id != null){ // Pwd Null
      setPwdNull(true);
      setPwdNNMsg(" !! 암호는 반드시 입력해주셔야 합니다. ")
      pwdRef.current.focus();
    }else if(id ===null && pwd===null){ // id Pwd null
      setPwdNull(true);
      setPwdNNMsg(" !! 암호는 반드시 입력해주셔야 합니다. ")
      setIdNull(true);
      setIdNNMessage(" !! ID는 반드시 입력해주셔야 합니다.")
      idRef.current.focus();
    } else if(pwd != null && id != null){ // Both Not null
      setIdNNMessage("")
      setPwdNNMsg("")
      DB.transaction(tx => { // Duplication Check
        tx.executeSql(
            'SELECT count(*) AS count from user_info WHERE id=?',
            [id],
            (tx , res) => {
              let count=JSON.stringify(res.rows.item(0).count)
              console.log(count)
              if(count==1){
                console.log("중복된 아이디 존재");
                setDupIdError(true)
              }else{ // 최종
                console.log("중복아이디 없음")
                navigation.navigate("Assign2nd", {
                  id: id, 
                  pwd:pwd,
                  job:job,
                  email:email
                });
              }

            }, error => {
              console.log("Valid Failed"+error);
            }
        );
      });
      
    }
  }
  return (
    <KeyboardAvoidingView
    style={rise ? {top:-185} : {top:0}}
    behavior={"padding"}
    // keyboardVerticalOffset={rise > 160 ? -160 : -300 }
    >
    <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.headerText}> Register </Text>
            <TouchableOpacity onPress={nextPage} >
                <View style={{alignContent:'flex-end', alignSelf:'flex-end', marginLeft:80,}}>
                  <Image source={require('../assets/Next.jpg')} style={{width:50, height:50}}/>
                </View>
            </TouchableOpacity>
            </View>
            <Text style={styles.headerDetailText} > Please enter details to register</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.category}> ID</Text>
              <Text style={styles.nnMsg}> {idNNMessage}</Text>
            </View>
            <TextInput style={styles.input} maxLength={30} placeholder=" Please type ID :)"
              onChangeText={id => setId(id)} ref={idRef}  />

            <View style={{flexDirection:'row'}}>
              <Text style={styles.category}> Password </Text>
              <Text style={styles.nnMsg}> {pwdNNMsg}</Text>
            </View>
            <TextInput  style={styles.pwdinput} secureTextEntry={true} maxLength={30} placeholder=" Please Fill your Password!"
              onChangeText={pwd => setpwd(pwd)} ref={pwdRef}/>

            <Text style={styles.category}> Job </Text>
            <TextInput style={styles.input} maxLength={30} placeholder=" Fell free to type here :)" 
            onChangeText={job => setJob(job)} onFocus={changeView} />

            <Text style={styles.category}> Email  </Text>
            <TextInput style={styles.input}  keyboardType={'email-address'} maxLength={30} placeholder=" email@example.com"
              onChangeText={email => setEmail(email)} onFocus={changeView} />
          
            </View>
        </TouchableWithoutFeedback>
        <ErrorModal modalOn={dupIdError} modalOff={modalOff} message={"중복된 아이디가 존재합니다."} />
    </SafeAreaView>
</KeyboardAvoidingView>
  );
};

