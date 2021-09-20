import React, { useEffect, useState } from 'react';
import { View, Button, SafeAreaView ,Image, StyleSheet, Text, 
  TouchableWithoutFeedback, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';


export default assignScreen = ( { navigation }) => {
  const db = SQLite.openDatabase({
    name: 'testDB3',
    location: 'default',
    // createFromLocation: '~www/Todo2.db',
  }
    ,
    () => {    
    },  error => { console.log('AssignScreen - Open Database error'); },
  );
  const [ rise, setRise ] = useState(false);
  const [ id, setId ] = useState(null);
  const [ pwd, setpwd ] = useState(null);
  const [ job, setJob ] = useState(null);
  const [ email, setEmail ] = useState(null);
  
  const changeView = () => { //아래 두 항목에서 Keyboard 이벤트 발생 시 화면을 직접 올려버린다.
    setRise(true);
  }
  useEffect(()=> {// 키보드가 사라지면 화면을 직접 내려버린다.
      Keyboard.addListener("keyboardDidHide", e => {
        setRise(false)
        
      })
  })
  function nextPage(){
    navigation.navigate("Assign2nd", {
      user_id: id, 
      user_pwd:pwd,
      user_job:job,
      user_email:email
    });
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
         
            <Text style={styles.category}> ID </Text>

            <TextInput style={styles.input} maxLength={30} placeholder=" Please type ID :)"
              onChangeText={id => setId(id)}/>
        
            <Text style={styles.category}> Password </Text>
            <TextInput  style={styles.pwdinput} secureTextEntry={true} maxLength={30} placeholder=" Please Fill your Password!"
              onChangeText={pwd => setpwd(pwd)}/>

            <Text style={styles.category}> Job </Text>
            <TextInput style={styles.input} maxLength={30} placeholder=" Fell free to type here :)" 
            onChangeText={job => setJob(job)} onFocus={changeView}/>

            <Text style={styles.category}> Email  </Text>
            <TextInput style={styles.input}  keyboardType={'email-address'} maxLength={30} placeholder=" email@example.com"
              onChangeText={email => setEmail(email)} onFocus={changeView} />
          
            </View>
        </TouchableWithoutFeedback>
    </SafeAreaView>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: {
      height:700,
      backgroundColor: '#191970',
    },
    headerText: {
      fontFamily: 'BMJUA',
      fontSize: 33,
      color: '#191970',
      marginLeft:10,
      marginBottom:20
    },
    headerDetailText:{
      fontFamily: 'BMJUA',
      fontSize: 18,
      color: '#191970',
      marginLeft:15,
      marginBottom:20
    },
    category:{
      fontFamily:"BMJUA",
      color:"#191970",
      fontSize:25,
      left:10,
    },
    input:{
      fontFamily:"BMJUA",
      height: 50,
      width:270,
      backgroundColor:'white',
      borderColor:'#191970',
      borderWidth:5,
      borderRadius:8,
      borderBottomWidth: 1,
      marginBottom: 20,
      left:10,
      paddingLeft:10,
    },
    pwdinput:{
      height: 50,
      width:270,
      backgroundColor:'white',
      borderColor:'#191970',
      borderWidth:5,
      borderRadius:8,
      borderBottomWidth: 1,
      marginBottom: 20,
      left:10,
      paddingLeft:10,
    },
    inner: {
      padding: 24,
      marginTop:30,
      backgroundColor:'white',
      width:'92%',
      left:13,
      borderRadius:20,
    },
    header: {
      fontSize: 36,
      marginBottom: 48
    },
    textInput: {
      height: 40,
      backgroundColor:'white'
    },
    btnContainer: {
      backgroundColor: "white",
      marginTop: 12
    }
})
