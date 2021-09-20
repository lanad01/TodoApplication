import React from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "../context";

export const signIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext); // 로그인정보 설정을 위한 context
  const auth = React.useContext(AuthContext);
  const { nameUpdate } = React.useContext(AuthContext);

  const [userName, setUserName] = React.useState("");
  const [ pwd, setPwd ] = React.useState("");
  const login = () => {
    nameUpdate(userName);
    signIn();
  }
  const register = () => {
    navigation.navigate("Assign")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> TO DO LIST</Text>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.idInput}
          onChangeText={text => setUserName(text)}
          placeholder="아이디 입력해주세요." placeholderTextColor='#191970' 
          maxLength={22} 
        />
        <TextInput
          style={styles.pwdInput}
          onChangeText={pwd => setPwd(pwd)} secureTextEntry={true}
          placeholder="비밀번호를 입력해주세요" placeholderTextColor='#191970' 
          maxLength={22} 
        />
          <TouchableOpacity onPress={login} 
          style={{backgroundColor:'#AFEEEE', height:40, alignItems:'center', borderRadius:20, borderWidth:3, borderColor:'white', marginTop:30}}>
            <Text style={{alignItems:'center', fontFamily:"BMJUA", fontSize:20, color:'#191970', marginTop:6}}> 로 그 인  </Text>  
          </TouchableOpacity>
          <TouchableOpacity onPress={register} 
          style={{backgroundColor:'#AFEEEE', height:40, alignItems:'center', borderRadius:20, borderWidth:3, borderColor:'white', marginTop:20}}>
            <Text style={{alignItems:'center', fontFamily:"BMJUA", fontSize:20, color:'#191970', marginTop:6}}> 회 원 가 입  </Text>  
          </TouchableOpacity>
        <Text style={styles.showText}></Text>
        <Text style={styles.showText}></Text>
      </View>
    </View>

  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center'
  },
  headerText: {
    paddingTop: 30,
    alignItems: 'center',
    fontSize: 38,
    color: 'white',
    top:50,
    fontFamily: 'BMJUA',
  },
  bodyContainer: {
    backgroundColor: '#191970',
    paddingHorizontal: 20,
    marginVertical: 30,
    flex: 1,
    width: 300,
    top:50,
  },
  idInput: {
    fontFamily:"BMJUA",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
    backgroundColor:'white',
    borderWidth: 3,
    color: '#191970',
    fontSize: 19,
  },
  pwdInput:{
    // fontFamily:"BMJUA",
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
    backgroundColor:'#E6E6FA',
    borderWidth: 3,
    color: '#191970',
    fontSize: 19,
  },
  showText: {
    marginTop: 30,
    fontSize: 25,
    color: 'white',
  },
  btn:{

  },
})