import React, {useState, useContext} from 'react';
import {  StyleSheet,  Text,  View,  Image,  TextInput, TouchableOpacity } from 'react-native';

import { AuthContext } from '../authcontext';
import { ErrorModal } from '../modal/ErrorModal';
import { DB } from '../globalVar';

export const ResetPwd = ({navigation}) => {
    const authContext=useContext(AuthContext);
    const [pwdVisible, setPwdVisible]=useState(true);
    const [newPwd, setNewPwd]=useState();
    const [pwdCheck, setPwdCheck]=useState();
    const [confirmFailedModal, setModal]=useState(false);
    const [errorMsg, setErrorMsg]=useState("오류");
    const confirm = () => {
        if(newPwd===pwdCheck && newPwd!=authContext.pwd){
            console.log("new pwd matched");
            DB.transaction(tx => {
                tx.executeSql(
                    'UPDATE user_info SET pwd=? WHERE user_no=? ',
                    [newPwd,authContext.user_no],
                    (tx , res) => {
                        console.log("update success")
                        authContext.pwd=newPwd;
                        navigation.navigate("Profile1st")
                    }, error => {
                        console.log("Update Failed"+error);
                    }
                );
              });
        }else if(newPwd!=pwdCheck){
            console.log("double check unmatched")
            setErrorMsg("새로운 비밀번호와 비밀번호 확인이 불일치합니다")
            setModal(true)

        }else if(newPwd===authContext.pwd){
            console.log("double check mathed but same with the previous password")
            setErrorMsg("이전에 사용했던 비밀번호입니다.")
            setModal(true)

        }
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={()=> navigation.replace("ProfileEdit")} style={{marginBottom:20,}}>
            <Image source={ require('../assets/back.png')}
            style={{width:60, height:60, marginLeft:5}}/>
            </TouchableOpacity>
                <Text style={styles.headerText}> 비밀번호 수정</Text>
            
                <View>
                    <Text style={styles.detailText}> 새로운 비밀번호 </Text>
                    <View style={{flexDirection:'row'}}>
                        <TextInput placeholder="새로운 비밀번호" style={styles.input} 
                        secureTextEntry={pwdVisible} onChangeText={ pwd => setNewPwd(pwd)} />
                        <TouchableOpacity onPress={ () => setPwdVisible(!pwdVisible)} 
                            style={{marginLeft:64, height:34, marginTop:6}} >
                            <Image source={require('../assets/show.jpg')} 
                            style={{height:32,width:30, }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor:'#191970', height:3, width:240, marginLeft:8,}}/>
                </View>
                <View >
                    <Text style={styles.detailText}> 비밀번호 확인 </Text>
                    <View style={{flexDirection:'row'}}>
                        <TextInput placeholder="비밀번호 확인" style={styles.input} 
                        secureTextEntry={pwdVisible} onChangeText={pwd => setPwdCheck(pwd)}/>
                        <TouchableOpacity onPress={ () => setPwdVisible(!pwdVisible)} 
                        style={{marginLeft:79, height:34, marginTop:6}} >
                            <Image source={require('../assets/show.jpg')} 
                            style={{height:32,width:30, }}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor:'#191970', height:3, width:240, marginLeft:8,}}/>
                </View>
                <View style={{ alignSelf:'flex-end', marginRight:115, flexDirection:'row'}}>
                <TouchableOpacity onPress={goBack} style={styles.backBtn}>
                    <Text style={styles.editText}> 뒤로가기 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirm} style={styles.editBox}>
                    <Text style={styles.editText}> 변경 </Text>
                </TouchableOpacity>
                </View>
            </View>
            <ErrorModal modalOn={confirmFailedModal} modalOff={() => setModal(false)} message={errorMsg} />
        </View>
    )
}
const styles=StyleSheet.create({
    container : {
    },
    header:{
        alignItems:'flex-start',
        top:20,
        left:20
    },
    headerText:{
        fontFamily:"BMJUA",
        fontSize:35,
        color:'#191970',
    },
    detailText:{
        marginTop:30,
        fontFamily:"BMJUA",
        fontSize:24,
        color:'#191970',
    },
    input : {
        marginLeft:10,
        fontSize:19,
        color:'#191970',
    },  
    editBox: {
        backgroundColor: '#191970',
        margin: 30,
        height: 40,
        width: 100,
        borderColor: '#191970',
        borderWidth: 3,
    },
    editText: {
    textAlign: 'center',
    fontFamily: 'BMJUA',
    marginTop: 4,
    marginRight: 3,
    color: 'white',
    fontSize: 23,
    },
    backBtn:{
    backgroundColor: '#191970',
    margin: 30,
    left:30,
    height: 40,
    width: 100,
    borderColor: '#191970',
    borderWidth: 3,
    },
})