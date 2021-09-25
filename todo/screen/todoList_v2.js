import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View, Image ,RefreshControl , Alert, ActivityIndicator  } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { TodoContext } from '../todoContext';
import { AuthContext } from '../context';
import SQLite from 'react-native-sqlite-storage';
import { Loading } from '../modal/Loading';


const TodoList_v2 = (props) => {
  const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})
  const todoContext = React.useContext(TodoContext);
  const authContext = React.useContext(AuthContext);
  const [render, reRender]=useState(1);
  useEffect(() => {
    getTask();
    reRender(props.render);
    reRender(render+1);
    setInterval(() => {
        getTask();
        reRender(render+1);
    }, 5000);
    return () => {
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
        if(len===0){
            setNoTask(true);
        }else if(len>0){
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
              setLoading(true)
              setTimeout(function() {
                setLoading(false)
              }, 2000);
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
        extraData={(render, props.render)} 
        renderItem={({ index }) => (
        <View style={styles.container}>
           
        <View style={todoContext.task_prior[index]==="High" ? styles.HighPriority : styles.itemContainer}>  
            <View > 
                <View style={{flexDirection:'row' }}>
                    <Text style={styles.listtext} ellipsizeMode={'tail'} numberOfLines={1} >{todoContext.task_name[index]} { todoContext.task_no[index]}  </Text>
                    <Text style={styles.priorityText}>[ {todoContext.task_prior[index]} ]</Text>
                    <View>
                    <TouchableOpacity onPress={() => deleteTask(todoContext.task_no[index], index)}>
                    <Image source={require("../assets/bin3.png")} style={{width:35, height:30, marginTop:5, right:7}}/>
                    </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.exp}> Until -  {todoContext.task_exp[index]}</Text>
            </View>
        </View>
        <Loading modalOn={false}/>
        </View>
        )}
      />
    }
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
        shadowColor: "pink",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
})