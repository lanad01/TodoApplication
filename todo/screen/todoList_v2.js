import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text,Button, View, Image, ScrollView, Alert, RefreshControl } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { TodoContext } from '../todoContext';
import { AuthContext } from '../context';
import SQLite from 'react-native-sqlite-storage';


const TodoList_v2 = (props) => {
  const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})
  const todoContext = React.useContext(TodoContext);
  const authContext=React.useContext(AuthContext);
  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    getTask();
    setInterval(() => {
        setRefreshing(!refreshing);
    }, 5000);
    return () => {
       console.log("나가기")
    }
  }, [])
  const [showBox, setShowBox] = useState(true);
  const [noTask, setNoTask] = useState(false);
  const getTask = () => {
    db.transaction(tx => {
    tx.executeSql(
        'SELECT * FROM task_info WHERE user_no=?',
        [authContext.user_no],
        (tx , res) => {
        var len=res.rows.length;
        console.log("Length : "+len)
        if(len===0){
            console.log("lengh = 0")
            setNoTask(true);
        }else if(len>0){
            console.log("Select")
            setNoTask(false);
            todoContext.task_name=[]
            todoContext.task_prior=[]
            todoContext.task_exp=[]
            todoContext.task_no=[]
            for(var i=0; i<len; i++){
                var taskName=res.rows.item(i).task_name
                var priority=res.rows.item(i).priority
                if(priority===null) {priority="Middle"}
                var exp=res.rows.item(i).exp
                var task_no=res.rows.item(i).task_no
                todoContext.task_no[i]=task_no
                todoContext.task_name[i]=taskName
                todoContext.task_prior[i]=priority
                todoContext.task_exp[i]=exp
                // console.log("taskName[i] :" +todoContext.task_name[i])
                // console.log("taskName[i] :" +todoContext.task_prior[i])
                // console.log("taskName[i] :" +todoContext.task_exp[i])
                // console.log("taskName[i] :" +todoContext.task_no[i])
                // console.log("---------------------------------------")
            }
        }
        }, error => {
        console.log("Insert Failed"+error);
        }
    );
    }
  );
  }
  const deleteTaskImple = (task_no, index) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM task_info WHERE task_no=?',
            [task_no],
            (tx , res) => {
              console.log("Deleter Task")
              todoContext.task_name.splice(index,1)
              todoContext.task_prior.splice(index,1)
              todoContext.task_exp.splice(index,1)
              todoContext.task_no.splice(index,1)
            }, error => {
              console.log("Delete Failed"+error);
            }
        );
      });
    getTask();
  }
  const clear = () => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM task_info WHERE user_no=?',
            [authContext.user_no],
            (tx , res) => {
              console.log("Deleter Task")
              getTask();
            }, error => {
              console.log("Insert Failed"+error);
            }
        );
      });
  }
  const deleteTask = (task_no, index) => {
    return(
    Alert.alert(
      "정말로 삭제하시겠습니까?",
      "복구하실 수 없습니다!",
      [
          {
              text:"Yes",
              onPress : () => {
                deleteTaskImple(task_no, index);
                setShowBox(!showBox);
              },
          },
          {
              text: "No",
          },
      ]
    )
    );
  }
  return (
    <View style={styles.container}>
        { noTask ? 
        <View style={{width:300, alignSelf:'center', alignItems:'center'}} >
        <Text style={styles.noTasktext}> No Task Yet ... </Text>
        <Image source={ require('../assets/task.png')}  style={{width:300, height:300, marginTop:-30}} />
        </View>
        : 
        
        <FlatList data={todoContext.task_name, todoContext.task_prior, todoContext.task_exp, todoContext.task_no}
        refreshControl={ <RefreshControl refreshing={refreshing}  />
        }
        renderItem={({ index }) => (
        <View style={styles.container}>
           
        <View style={todoContext.task_prior[index]==="High" ? styles.HighPriority : styles.itemContainer}>  
            <View>
                <View style={{flexDirection:'row' }}>
                    <Text style={styles.listtext} ellipsizeMode={'tail'} numberOfLines={1} >{todoContext.task_name[index]} { todoContext.task_no[index]}  </Text>
                    <Text style={styles.priorityText}>[ {todoContext.task_prior[index]} ]</Text>
                    <View>
                    <TouchableOpacity onPress={() => deleteTask(todoContext.task_no, index)}>
                    <Image source={require("../assets/bin.png")} style={{width:35, height:30, marginTop:5}}/>
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.exp}> Until -  {todoContext.task_exp[index]}</Text>
            </View>
        </View>
        </View>
        )}
      />
    }
    <Button onPress={getTask} title="Butto"/>
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
        width:280,
        height:70

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
    exp : {
        fontFamily:"BMJUA",
        color:"#191970",
        fontSize:15,
        marginLeft:12,
        marginTop:10,
    },
    itemTaskContainer:{
        flexDirection:'row',

    },
    HighPriority:{
        flex:1,
        marginTop:10,
        backgroundColor:'#FFC0CB',
        borderRadius:7,
        width:280,
        height:70
    },
})
