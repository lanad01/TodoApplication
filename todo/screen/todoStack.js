import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { authScreen} from "./authScreen";
import { TodoList_v3 } from './test';
const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})
import { TodoContext } from '../todoContext';
import { AuthContext } from '../authcontext';
const TodoStack = createStackNavigator();
export const TodoStackScreen = (  ) => {
    
  const todoContext=useContext(TodoContext);
  const authContext=useContext(AuthContext)
    useEffect(() => {
        console.log("tes js GetTask")
        db.transaction( tx => {
          tx.executeSql(
            'SELECT * FROM task_info2 WHERE user_no=?',
            [authContext.user_no],
            (tx , res) => {
            var len=res.rows.length;
            if(len===0){
              // console.log("Array length 0")
            }else if(len>0){
              console.log("select in Test success")
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
      }, [])
         
  return (
    <TodoStack.Navigator>
      <TodoStack.Screen name="Todo" component={TodoList_v3} 
      options={{ headerTitle: "Sign In", headerTitleStyle : { fontFamily:"BMJUA" } ,
      headerStyle : { backgroundColor : '#E0FFFF' } }} />
    </TodoStack.Navigator>
  )
};