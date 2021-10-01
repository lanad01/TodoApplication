import React, { useState, useEffect, Component } from 'react';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity,    } 
from 'react-native';
import Modal from 'react-native-modal';
import SQLite from 'react-native-sqlite-storage';
import { AuthContext } from '../authcontext';
import { Loading } from '../modal/Loading';

import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})

export const AddModal = props => {
    const authContext = React.useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false); // 달력 모달 오픈
    const [taskName, setTaskName ] = React.useState(null);
    const [priority, setPriority ] = React.useState();
    const [exp, setExp ] = React.useState(new Date());
    var week = new Array('일', '월', '화', '수', '목', '금', '토');
    var year= exp.getFullYear();
    var month = exp.getMonth()+1;
    var day = exp.getDate();
    var dayName = week[exp.getDay()];
    var dateToKorean=year+'년 '+month+'월 '+day+'일 '+dayName+'요일 ';
    const register = () => { // Task 추가 등록
        if(taskName != null){ // name은 낫널
          db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO task_info2 (user_no, task_name, priority, exp, performed) VALUES (?,?,?,?,false)',
                [authContext.user_no,taskName, priority, dateToKorean ],
                (tx , res) => {
                  console.log("Insert Success")
                  props.render()
                  props.modalOff()
                }, error => {
                  console.log("Insert Failed"+error);
                }
            );
          });
        }else if(taskName===null){
          console.log("TaskName Null!!")
        }
    }
    return (
    <Modal
    isVisible={props.modalOn}
    avoidKeyboard={true}
    transparent={true}
    style={{  marginLeft:16, justifyContent: 'center', alignItems: 'center' }}>
    
        <View style={styles.outside}>
        <View style={styles.validModal}>
            <View style={styles.modalHeader}>
                <Text style={styles.modalHeader}>New Task</Text>
            </View>
            <View style={{flexDirection:'row', height:60}}>
                <Text style={styles.category}>Task명 : </Text>
                <TextInput style={styles.taskInput} 
                onChangeText={(taskName)=>setTaskName(taskName)}
                maxLength={20}></TextInput>
            </View>
            <View style={{flexDirection:'row', height:80}}>
                <Text style={styles.category2}>우선순위 : </Text>
                <Picker
                selectedValue={priority}
                style={styles.picker}
                mode="dropdown"
                onValueChange={(priority)=> setPriority(priority)}
                >
                <Picker.Item label="Option" value="미설정" />
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Middle" value="Middle" />
                <Picker.Item label="Low" value="Low" />
                </Picker>
            </View>
            <View style={{flexDirection:'row', height:40}}>
                <TouchableOpacity style={styles.opacity}  onPress={() => setOpen(true)}>
                <Text style={styles.expBtn}> 날짜지정 </Text>
                </TouchableOpacity>
                <TextInput style={styles.expInput} value={dateToKorean} editable={false}  />
                <DatePicker modal open={open} date={new Date()} minimumDate={new Date()} mode={'date'} textColor={'#191970'}
                onConfirm={(exp) => { setOpen(false)
                setExp(exp)
                }}
                onCancel={() => {
                setOpen(false)
                }}/>
            </View>
            <View style={{flexDirection : 'row'}}>
            <TouchableOpacity style={styles.choicebox} onPress={props.modalOff} >
            <Text textAlign="center" style={styles.photochoose}>
                나 가 기
            </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.choicebox} onPress={register}>
            <Text textAlign="center" style={styles.photochoose}>
                등 록
            </Text>
            </TouchableOpacity>
            </View>
        </View>
        
        <Loading modalOn={loading}/>
        </View>
    </Modal>
    );
}

const styles=StyleSheet.create({
      outside:{
        justifyContent:'center',
        alignItems:'center',
        zIndex:1,
        borderWidth:3,
        borderRadius:13,
        borderColor:'#AFEEEE'
      },
      validModal:{
        width:300,
        height:350,
        backgroundColor:'white',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        
      },
      modalHeader:{
        fontFamily:'BMJUA',
        fontSize:32,
        color:'black',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        marginBottom:10,
      },
      category:{
        color: 'black',
        fontFamily: 'BMJUA',
        fontSize: 20,
        width:90,
      },
      category2:{
        color: 'black',
        fontFamily: 'BMJUA',
        fontSize: 20,
        width:90,
        marginTop:15,
      },
      taskInput:{
        width: 150,
        height: 45,
        bottom:10,
        paddingLeft:10,
        backgroundColor: '#AFEEEE',
        borderRadius: 7,
        fontFamily:'BMJUA',
      },
      picker:{
        width: 160,
        height: 50,
        backgroundColor: '#AFEEEE',
        marginLeft: 5,
        marginBottom:10,
      },
      opacity:{
        backgroundColor: '#afeeee',
        borderWidth: 4,
        borderColor: 'white',
        marginLeft: 5,
        borderRadius:5,
        borderColor:'black',

      },
      expBtn:{
        fontFamily: 'BMJUA',  
        fontSize: 19,
        color: 'black',
        justifyContent: 'center',
        marginTop:5,
        
      },
      expInput:{
        backgroundColor: '#afeeee',
        marginLeft: 10,
        width: 160,
        height: 40,
        borderRadius: 5,
        fontFamily: 'BMJUA',
        fontSize: 14,
        color: '#191970',
        paddingLeft:12,
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
      choicebox:{
        alignItems:'center',
        marginTop:15,
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
})