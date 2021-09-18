import React from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import { AuthContext } from "../context";

export const signIn = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext); // 로그인정보 설정을 위한 context
  const auth = React.useContext(AuthContext);
  const { nameUpdate } = React.useContext(AuthContext);

  const [userName, setUserName] = React.useState("");
  const login = () => {
    nameUpdate(userName);
    signIn();
  }
  const register = () => {
    navigation.navigate("Assign")
  }
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}> 첫 방문이시네요!</Text>
      <Text style={styles.headerText}> 이름을 등록해주세요!</Text>
      <View style={styles.bodyContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={text => setUserName(text)}
          placeholder="아무거나 입력해주세요." placeholderTextColor='white' placeholderStyle={{ fontFamily: 'BMJUA' }}
          maxLength={22} />
          <TouchableOpacity onPress={login} 
          style={{backgroundColor:'#AFEEEE', height:40, alignItems:'center', borderRadius:20, borderWidth:3, borderColor:'white'}}>
            <Text style={{alignItems:'center', fontFamily:"BMJUA", fontSize:17, color:'#191970', marginTop:6}}> 로 그 인  </Text>  
          </TouchableOpacity>
          <TouchableOpacity onPress={register} 
          style={{backgroundColor:'#AFEEEE', height:40, alignItems:'center', borderRadius:20, borderWidth:3, borderColor:'white', marginTop:20}}>
            <Text style={{alignItems:'center', fontFamily:"BMJUA", fontSize:17, color:'#191970', marginTop:6}}> 회 원 가 입  </Text>  
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
    fontSize: 30,
    color: 'white',
    fontFamily: 'BMJUA',
  },
  bodyContainer: {
    backgroundColor: '#191970',
    paddingHorizontal: 20,
    marginVertical: 30,
    flex: 1,
    width: 300
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    color: 'white',
    fontSize: 19,

  },
  showText: {
    marginTop: 10,
    fontSize: 25,
    color: 'white',
  }
})