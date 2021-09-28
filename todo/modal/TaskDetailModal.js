import React, { useState, useEffect, useContext, useCallback } from 'react';
import {  View,  Text, StyleSheet, TouchableOpacity, TextInput,} from 'react-native';
import Modal from 'react-native-modal';
import SQLite from 'react-native-sqlite-storage';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { TodoContext } from '../todoContext';

export const TaskDetailModal = (props) => {
   
  console.log('TaskDetail render')
  const todoContext=useContext(TodoContext);
  const [taskName, setTaskName]=useState();
  const [taskPrior,setPrior]=useState();
  const [exp, setExp]=useState(new Date())
  const [formattedDate, setFormattedDate]=useState();
  const [open, setOpen] = useState(); // 달력 모달 오픈
  
  useEffect(() => {
    const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})
    console.log("useEffect on?")
    db.transaction( tx => {
      tx.executeSql(
        'SELECT task_name,priority,exp FROM task_info2 WHERE task_no=?',
        [props.task_no],
        (tx , res) => {
            console.log(res.rows.item(0).task_name);
            console.log(res.rows.item(0).exp);
            console.log(res.rows.item(0).priority);
            setTaskName(res.rows.item(0).task_name)
            setFormattedDate(res.rows.item(0).exp)
            todoContext.taskExp=formattedDate
            setPrior(res.rows.item(0).priority)
        }, error => {
          console.log("Delete Failed"+error);
        }
    );
      });
    return () => { }
  }, [props.modalOn]) 
  
  const confirm = (exp) => {
    console.log("confrim")
    setExp(exp)
    var week = new Array('일', '월', '화', '수', '목', '금', '토');
    var year= exp.getFullYear();
    var month = exp.getMonth()+1;
    var day = exp.getDate();
    var dayName = week[exp.getDay()];
    var dateToKorean=year+'년 '+month+'월 '+day+'일 '+dayName+'요일 ';
    setFormattedDate(dateToKorean);
    
  }
    return (
    <Modal
      isVisible={props.modalOn} 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
        <View style={styles.outside}>
          <View style={styles.validModal}>
            <View style={styles.container} >
              <Text style={styles.validText}> Task 명 : </Text>
              <TextInput style={styles.content}  defaultValue={taskName}
              onChangeText={ taskName => setTaskName(taskName)}/>
            </View>
            <View style={styles.container} >
              <Text style={styles.priorText}> 우선순위 : </Text>
              <View style={{borderColor:'#191970', borderRadius:5, borderWidth:4, }}>
              <Picker
                defaultValue={todoContext.taskPrior}
                selectedValue={taskPrior}
                style={styles.picker}
                mode="dropdown"
                onValueChange={(taskPriority)=> setPrior(taskPriority)}
              >
                <Picker.Item label="Option" value="미설정" />
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Middle" value="Middle" />
                <Picker.Item label="Low" value="Low" />
              </Picker>
              </View>
            </View>
            <View style={styles.container} >
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={{backgroundColor:"#191970", width:90, height:30, }}
                 onPress={() => setOpen(true)}>
                <Text style={styles.changeExp}>기한변경 </Text>
                </TouchableOpacity>
                <TextInput editable={false} defaultValue={formattedDate} style={styles.pickedData} />
              </View>
              <DatePicker modal open={open} date={exp} minimumDate={new Date()} mode={'date'} textColor={'#191970'}
                onConfirm={ (exp) =>{
                  confirm(exp)
                  setOpen(false)
                }
                }
                onCancel={() => {
                  setOpen(false)
                }}/>
            </View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={styles.choicebox} onPress={props.modalOff }>
                <Text textAlign="center" style={styles.button}>
                    목록으로
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.choicebox} >
                <Text textAlign="center" style={styles.button}>
                  수정하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    </Modal>
  );
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
      validModal:{
        width:360,
        height:450,
        backgroundColor:'white',
        borderRadius:10,
        borderColor:'#191970',
        borderWidth:9,
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
      
      button:{
        textAlign:"center",
        fontFamily:"BMJUA",
        fontSize:20,
        color:'white',
        backgroundColor:'#191970',
        borderRadius:7,
        width:100,
        paddingTop:10,
        paddingBottom:5,
        zIndex:4,
        marginHorizontal:10,
      },
      container:{
        flexDirection:'row',
        marginTop:15,
      },
      validText:{
        fontFamily:'BMJUA',
        color:'#191970',
        fontSize:18,
      }, 
      priorText:{
        fontFamily:'BMJUA',
        color:'#191970',
        fontSize:18,
        paddingTop:20,
        marginRight:4,
      } ,
      content:{
        fontFamily:'BMJUA',
        fontSize:18,
        paddingLeft:9,
        bottom:13,
        width:150,
        height:40,
        marginLeft:5,
        borderRadius:6,
        borderWidth:3,
        borderColor:'#191970'
      },
      picker:{
        width: 160,
        height: 60,
        backgroundColor: 'white',
        marginLeft: 5,
      },
      changeExp:{
        fontFamily:'BMJUA',
        color:'white',
        fontSize:18,
        alignSelf:'center',
        marginTop:4,
      },
      pickedData:{
        fontFamily:'BMJUA',
        color:'#191970',
        fontSize:15,
        bottom:10,
        marginLeft:12,
      },
})