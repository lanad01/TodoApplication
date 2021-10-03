import React, {useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Alert, StyleSheet, Text, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import { styles } from './styles/tabsScreenStyle';
import { Todo } from './todoscreen';
import { TodoContext } from '../todoContext';
import { ProfileStackScreen } from './profileRoot';
import { AuthContext } from '../authcontext';
import { TaskScreen } from './todoList_v3';
import { DB } from '../globalVar';
import { CREATE_TASK_TABLE } from '../globalVar';

export const TabsScreen =  props  => {
  console.log("tabsScreen")
  const authContext=React.useContext(AuthContext);
  const todoContext =React.useContext(TodoContext)
  const [getLengthForBadge, setLength]=useState() //Task 갯수
  const [render, reRender]=useState()
  useEffect(() => {
    CREATE_TASK_TABLE()
    return () => {
    }
  }, [])
  useEffect(() => { // context 재렌더링
    console.log("TabsScreen Badge Rerender")
    DB.transaction(tx => { //badge 형성을 위해 해당 user_no의 남아있는 todoList length 출력
      tx.executeSql(
        'SELECT task_no FROM task_info2 WHERE user_no=?',
        [authContext.user_no],
        (tx,res)=>{
          var len=res.rows.length;
          setLength(len)
          // setLength(len) //이걸 렌더링 해버리면 뒤쪽이 애매해지네
        });  
    })
    return () => {
      console.log("unmounted from tabsScreen")
    }
  }, [])
  
  function outFromTab () {
    Alert.alert(
      '로그아웃하시겠습니까?', '',
      [ {
          text: '아니오',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: '예', onPress: () => 
          outFromTab2()
        },
      ],
      {cancelable: false},
    );
  }
  function outFromTab2(){ 
    AsyncStorage.removeItem("user_no");
    console.log("로그아웃 실행")
    todoContext.task_exp=[];
    todoContext.task_name=[];
    todoContext.task_prior=[];
    todoContext.task_no=[];
    props.navigation.navigate("Auth")
  }
  const profileScreen_Opt= () => {
    return{
      tabBarActiveTintColor: "#00af9d" , 
      tabBarLabelStyle : { fontFamily:"BMJUA", fontSize: 15, },
      headerStyle: { backgroundColor:'#E0ffff' } ,
      headerTitleStyle:{ fontFamily:'BMJUA', fontSize:28 }, 
      headerRight: () => (
        <TouchableOpacity style={styles.btnView} onPress={outFromTab}>
         <Text style={styles.logoutBtn}>Logout</Text>
        </TouchableOpacity>   ),
        tabBarIcon: ({}) => {
          return (
            <Image source={require('../assets/profileIcon.png')} style={{width:40, height:30}}/>
          );
        } 
    }
  }
  const todoScreen_Opt = () => {
    return{
      tabBarBadge :  getLengthForBadge , tabBarActiveTintColor: "#00af9d" , 
      tabBarLabelStyle : { fontFamily:"BMJUA", fontSize: 15, },
      headerTitleStyle:{ fontFamily:'BMJUA', fontSize:28 },
      headerStyle: { backgroundColor:'#E0ffff', } ,
      headerRight: () => (
            <TouchableOpacity style={styles.btnView} onPress={outFromTab}>
             <Text style={styles.logoutBtn}>Logout</Text>
           </TouchableOpacity>         
           ),
        tabBarIcon:({}) => { 
          return (
            <Image source={require('../assets/128x128.png')} style={{width:30, height:30}}/>
          );
        } 
    }
  }
  
  const Tabs = createBottomTabNavigator();
  return (
    //컴포넌트화 
    <TodoContext.Provider value={todoContext}>
      <Tabs.Navigator initialRouteName="Task"  >
        <Tabs.Screen name="Profile" component={ProfileStackScreen} options={profileScreen_Opt}/>
        <Tabs.Screen name="Task" component={TaskScreen} options={todoScreen_Opt}/>
      </Tabs.Navigator>
    </TodoContext.Provider>
  );
}

