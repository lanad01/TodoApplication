import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image , Alert, 
  TouchableOpacity, } from 'react-native';
import { TodoContext } from '../todoContext';
import { AuthContext } from '../authcontext';
import SQLite from 'react-native-sqlite-storage';
import { TaskDetailModal } from '../modal/TaskDetailModal';
import {TouchableWithoutFeedback } from 'react-native-gesture-handler';

const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})


const TodoList_v2 = (props) => {
  const todoContext = React.useContext(TodoContext);
  const authContext = React.useContext(AuthContext);
  
  const [showBox, setShowBox] = useState(true);
  const [noTask, setNoTask] = useState(0); 
  const [taskDetailModal,setTaskDetailModal]=useState({
    modal : false,
    task_no : 0
  });
  useEffect(() => {
    console.log("getTaskDEtail")
    setNoTask(noTask+1)
      db.transaction( tx => {
         tx.executeSql(
           'SELECT * FROM task_info2 WHERE user_no=?',
           [authContext.user_no],
           (tx , res) => {
           var len=res.rows.length;
           if(len===0){
             // console.log("Array length 0")
               setNoTask(0);
           }else if(len>0){
               for(var i=0; i<len; i++){
                   var priority=res.rows.item(i).priority
                   if(priority===null) {priority="Middle"}
                   todoContext.task_no[i]=res.rows.item(i).task_no
                   todoContext.task_name[i]=res.rows.item(i).task_name
                   todoContext.task_prior[i]=priority
                   todoContext.task_exp[i]=res.rows.item(i).exp
                   todoContext.performed[i]=res.rows.item(i).performed
               }
           }
           }, error => {
           console.log("Failed"+error);
           }
        )} 
      );
    return () => {
    }
  }, [props.render])

  const deleteTaskImple = (task_no, index) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM task_info2 WHERE task_no=?',
            [task_no],
            (tx , res) => {
              console.log("Deleter Task")
              todoContext.task_name.splice(index,1)
              todoContext.task_prior.splice(index,1)
              todoContext.task_exp.splice(index,1)
              todoContext.task_no.splice(index,1)
              todoContext.performed.splice(index,1)
            }, error => {
              console.log("Delete Failed"+error);
            }
        );
      });
  }
  const details = index => {
    console.log("Detail index : "+index);
    setTaskDetailModal( {modal: true, task_no:index
    });
  }
  const deleteTask = (task_no, index) => {
    return(
    Alert.alert(
      "정말로 삭제하시겠습니까?",
      "복구하실 수 없습니다!",
      [   {   text:"Yes",
              onPress : () => {
                deleteTaskImple(task_no, index);
                setShowBox(!showBox);
              },
          },
          { text: "No", },
      ]
    ));
  }
  const complete = (task_no, index) => {
    console.log(task_no)
   db.transaction(tx => {
      tx.executeSql(
          'UPDATE task_info2 SET performed=true WHERE task_no=?',
          [task_no],
          (tx , res) => {
            console.log("update Success")
            props.render2()
          }, error => {
            console.log("Delete Failed"+error);
          }
      );
    });
  }
  console.log('todolistv2')
  return (
    <View style={styles.container}>
        { noTask ===0 ? 
        <View style={{width:300, alignSelf:'center', alignItems:'center'}} scrollEnabled={false} >
        <Text style={styles.noTasktext}> No Task Yet ... </Text>
        <Image source={ require('../assets/task.png')}  style={{width:300, height:300, marginTop:-30}} />
        </View>
        : 
        <FlatList
        data={todoContext.task_name, todoContext.task_prior, todoContext.task_exp, todoContext.task_no, todoContext.performed }
        renderItem={({ item, index }) => (
           
        <View 
        style={todoContext.task_prior[index]==="High" ? styles.HighPriority : styles.itemContainer}>  
        <TouchableOpacity
          style={todoContext.performed[index]==1 ? {backgroundColor:'#dcdcdc', opacity:0.9, borderRadius:6} : {}   }
          key={index.toString()} 
          onPress={() => details(todoContext.task_no[index]) }
        >
          <View > 
                <View style={{flexDirection:'row' }}>
                    <Text style={styles.listtext} ellipsizeMode={'tail'} numberOfLines={1} >{todoContext.task_name[index]} { todoContext.task_no[index]}  </Text>
                    <Text style={styles.priorityText}>[ {todoContext.task_prior[index]} ]</Text>
                    <View>
                    <TouchableOpacity onPress={() => deleteTask(todoContext.task_no[index], index)}>
                    <Image source={require("../assets/bin3.png")} style={{width:35, height:30, marginTop:5, right:7, marginLeft:5}}/>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <Text style={styles.exp}> 기한 -  {todoContext.task_exp[index]}</Text>
                  <View>
                   {todoContext.performed[index] == 0 ?  
                    <TouchableOpacity style={styles.notComplete} onPress={() => complete(todoContext.task_no[index],index)}>
                      <Text style={styles.perforemd}> 완 료</Text>  
                    </TouchableOpacity>
                   : 
                   <TouchableWithoutFeedback style={styles.complete}>
                      <Text style={styles.perforemd}> 완료됨</Text>  
                    </TouchableWithoutFeedback>
                   }
                  </View>    
                </View>
          </View>
        </TouchableOpacity>
        </View>
        )}
      />
    }
    <TaskDetailModal modalOn={taskDetailModal.modal} modalOff={ () => setTaskDetailModal(false, 1)}
                    task_no={taskDetailModal.task_no} />
  </View>
  );
};

export default TodoList_v2;
const styles=StyleSheet.create({
    container : {
        flex:1,
    },
    itemContainer : {
        flex:1,
        marginTop:10,
        backgroundColor:'white',
        borderRadius:7,
        shadowColor: "pink",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,

    },
    listtext : {
        fontFamily:"BMJUA",
        color:"#191970",
        fontSize:20,
        width:'55%',
        marginLeft:8,
        marginTop:10
    },
    noTasktext : {
        alignSelf:'center',
        fontFamily:"BMJUA",
        color:"white",
        fontSize:32,
        width:200,
        marginLeft:27,
        marginTop:10
    },
    priorityText : {
        fontFamily:"BMJUA",
        color:"#191970",
        fontSize:20,
        width:85,
        marginLeft:3,
        marginTop:10
    },
    
    itemTaskContainer:{
        flexDirection:'row',

    },
    HighPriority:{
        flex:1,
        marginTop:10,
        backgroundColor:'#FFC0CB',
        borderRadius:7,
        shadowColor: "pink",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    addModal: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#191970',
      borderWidth: 5,
      borderColor: 'white',
      borderRadius: 30,
      width: 300,
      height:400,
      marginLeft: 25,
    },
    modalheader: {
      fontFamily: 'BMJUA',
      fontSize: 22,
      color: 'white',
      marginTop: 10,
    },
    
  addTaskContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191970',
    marginTop: 12,
    flexDirection: 'row',
    marginLeft:10,
  },
  taskContentText: {
    color: 'white',
    fontFamily: 'BMJUA',
    fontSize: 20,
  },
  taskInput: {
    width: '55%',
    height: 35,
    backgroundColor: 'white',
    borderRadius: 7,
    marginLeft: 10,
  },
  picker: {
    width: 160,
    height: 50,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  expButton: {
    fontFamily: 'BMJUA',
    fontSize: 17,
    color: 'white',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 5,
    width: 65,
    height: 35,
    marginRight: 15,
  },
  expInput: {
    backgroundColor: 'white',
    marginLeft: 3,
    width: 170,
    height: 40,
    borderRadius: 5,
    fontFamily: 'BMJUA',
    fontSize: 14,
    color: '#191970',
    paddingLeft:12,
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
  opacity: {
    backgroundColor: 'white',
    marginTop: 0,
    borderStyle: 'dotted',
    borderWidth: 4,
    borderColor: 'white',
    width: 70,
    alignItems: 'center',
    marginLeft: 10,
  },
  showText: {
    marginTop: 10,
    fontSize: 25,
    color: 'white',
  },
  logoutBtn: {
    margin: 10,
  },
  opacity2 : {
    backgroundColor: 'white',
    marginBottom:10,
    borderStyle: 'dotted',
    borderWidth: 4,
    borderColor: 'white',
    width: 70,
    alignItems: 'center',
    marginLeft: 10,
    
  },
  regBtn:{
    fontFamily: 'BMJUA',
    fontSize: 17,
    color: '#191970',
    marginRight: 0
  },  
  btn: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 40,
    borderRadius: 5,
    borderWidth: 5,
    marginBottom: 10,
  },
  btnTxt: {
    fontFamily: 'BMJUA',
    fontSize: 20,
    marginTop: 2,
  },
  exp : {
    fontFamily:"BMJUA",
    color:"#191970",
    fontSize:15,
    marginLeft:12,
    marginTop:10,
    marginBottom:5,
    paddingTop:10,
  },
  notComplete:{
    backgroundColor:'#191970',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:5,
    marginLeft:10,
    height:30,
    width:50,
    borderRadius:5,
  },
  perforemd:{
    fontFamily: 'BMJUA',
    color: 'white',
    fontSize: 15,
    paddingRight:5,
    justifyContent:'center',
    alignSelf:'center',
  },
  complete:{
    backgroundColor:'#FFB6C1',
    justifyContent:'center',
    alignSelf:'center',
    marginTop:5,
    marginLeft:10,
    height:30,
    width:50,
    borderRadius:5,
    opacity:0.7,
  },
})