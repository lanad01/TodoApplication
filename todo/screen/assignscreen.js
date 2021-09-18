import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default assignScreen = ( { navigation }) => {
  const [ pwd, setpwd ] = useState("");
  
  function nextPage(){
    console.log('next')
    navigation.navigate("Assign2nd");
  }
  return (
    <View style={styles.container}>
        <View style={styles.box}>
            <Text style={styles.headerText}> Register </Text>
            <Text style={styles.headerDetailText} > Please enter details to register</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}> ID </Text>
              <TextInput style={styles.input} maxLength={30} placeholder="Please type ID :)" />
              <View style={styles.underline}></View>
              <Text style={styles.category}> Password </Text>
              <TextInput style={styles.input}  keyboardType='default' secureTextEntry={true} maxLength={30} placeholder="*******"
                onChangeText={pwd => setpwd(pwd)} 
              />
              <View style={styles.underline}></View>
              <Text style={styles.category}> Email  </Text>
              <TextInput style={styles.input}  keyboardType={'email-address'} maxLength={30} placeholder="email@example.com" />
              <View style={styles.underline}></View>
              <Text style={styles.category}> Job </Text>
              <TextInput style={styles.input} maxLength={30} placeholder="Fell free to type here :)" />
              <View style={styles.underline}></View>
              <TouchableOpacity onPress={nextPage} >
                <View style={{alignContent:'flex-end', alignSelf:'flex-end', marginRight:23}}>
                  <Image source={require('../assets/Next.jpg')} style={{width:40, height:40}}/>
                </View>
              </TouchableOpacity>
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#191970',
    },
    box : {
      backgroundColor:'white',
      top:50,
      borderRadius:20,
      width:'90%',
      height:'80%',
    },
    headerText: {
      fontFamily: 'BMJUA',
      fontSize: 25,
      color: '#191970',
      marginTop: 30,
      marginLeft:10,
    },
    headerDetailText:{
      fontFamily: 'BMJUA',
      fontSize: 18,
      color: 'gray',
      marginTop: 10,
      marginLeft:10,
      
    },
    categoryContainer:{
      marginLeft:20,
      marginTop:15
    },
    category:{
      fontFamily:"BMJUA",
      color:"#191970",
      fontSize:20,
    },
    input:{
      fontFamily:"BMJUA",
      color:'#191970',
      
    },
    underline:{
      height:2,
      width:"70%",
      backgroundColor:'#DCDCDC',
      marginBottom:15, 
      marginLeft:3
    }
})
