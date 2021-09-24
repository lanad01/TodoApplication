import React, { useState, useEffect, Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';

export class PwdChangeModal extends Component {
    constructor(props){
      super(props)
      this.state={
        pwdInput: '' ,
      }
    }
    render() {
      // console.log(this.state.pwdInput)
      // console.log(this.props.pwdVerify)
      const verify = () => {
        if(this.state.pwdInput===this.props.pwdVerify){
          console.log("일치");
          this.props.resetPwd()
        }else{
          console.log("PWD Verify 불일치")
        }
      }
      
        return (
      <Modal
        isVisible={this.props.modalOn}
        avoidKeyboard={true}
        transparent={true}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={this.props.modalOff }>
          <View style={styles.outside}>
            <View style={styles.validModal}>
              <Text style={styles.validText}>
                암호 변경을 위해 현재 사용하고 계시는 암호를 입력해주세요
                
              </Text>
              <TextInput placeholder="현재 암호 입력" secureTextEntry={true} style={styles.pwdInput}
              onChangeText={pwd => this.setState({ pwdInput : pwd }) }/>
              <View style={{flexDirection : 'row'}}>
              <TouchableOpacity style={styles.choicebox} onPress={verify}>
                <Text textAlign="center" style={styles.photochoose}>
                  확 인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choicebox} onPress={this.props.modalOff}>
                <Text textAlign="center" style={styles.photochoose}>
                  나 가 기
                </Text>
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}
const styles=StyleSheet.create({
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
        width:100,
        borderWidth:5,
        paddingTop:10,
        margin:5
        
      },
      validModal:{
        width:300,
        height:250,
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
        width:240,
        fontFamily:'BMJUA',
        fontSize:18,
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
      },  
      pwdInput:{
        borderWidth:4,
        width:200,
        height:40,
        borderRadius:10,
        textAlign:'center',
        marginTop:10
      },
})