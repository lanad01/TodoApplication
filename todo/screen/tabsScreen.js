import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Alert, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Todo } from './todoscreen';
import { TodoContext } from '../todoContext';
import { AuthContext } from '../context';
import { ProfileStackScreen } from './profileRoot';
import AsyncStorage from '@react-native-community/async-storage';

const Tabs = createBottomTabNavigator();
export const TabsScreen = ( props ) => {
  function outFromTab () {
    Alert.alert(
      '로그아웃하시겠습니까?',
      '',
      [
        {
          text: '아니오',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: '예', onPress: () => 
        outFromTab2()
      },
      ],
      {cancelable: false},
    );
  }
  function outFromTab2(){ // 이 부분 큰 문제가 있다 지금
    console.log('success');
    AsyncStorage.removeItem("user_no");
    console.log("로그아웃 실행")
    props.navigation.navigate("Auth")
  }
  const [ taskArray, setTaskArray] = useState([]);
  const [ priorityArray, setPriorityArray ] = useState([]);
  const [ expArray, setExpArray ] = useState([]);
  const todoContext = {
    userName: '',
    taskName: 'init task',
    priority: 'init prio',
    expiration: 'init exp',
    taskArray : taskArray,
    priorityArray : priorityArray,
    expArray : expArray,
    addTaskName: arg => {
        taskArray.push(arg);
    },
    addPriority: arg => {
        if(arg!="High" && arg!="Middle" && arg!="Low") {
            priorityArray.push("Middle")
        }else{
            priorityArray.push(arg);
        }
    },
    addExp: arg => {
        expArray.push(arg);
    },
    deleteTask : index => {
        var taskCopy= [...taskArray]; //make a separate copy of the array
        var priorityCopy = [...priorityArray];
        var expCopy=[...expArray];
        if(index !== -1) {
            taskCopy.splice(index,1); // remove value of the index
            priorityCopy.splice(index,1);
            expCopy.splice(index,1);
            setTaskArray(taskCopy); // and cover it to the origin
            setPriorityArray(priorityCopy);
            setExpArray(expCopy);
        }
    }
  };

  return (
    <TodoContext.Provider value={todoContext}>
      <Tabs.Navigator initialRouteName="To do"  >
        
        <Tabs.Screen name="To do" component={Todo}
        options={{ tabBarBadge : 3 ,  tabBarActiveTintColor: "#00af9d" , headerStyle: { backgroundColor:'#E0ffff' } ,
        headerTitleStyle:{ fontFamily:'BMJUA' }, headerRight: () => (
              <TouchableOpacity style={styles.btnView} onPress={outFromTab}>
               <Text style={styles.logoutBtn}>Logout</Text>
             </TouchableOpacity>         ),
          tabBarIcon: ( {  } ) => { 
            return (
              <Image source={require('../assets/128x128.png')} style={{width:30, height:30}}/>
            );
          } 
        }}
        />
        <Tabs.Screen name="Profile" component={ProfileStackScreen} 
        options={{ tabBarBadge : 3 , headerShown: false, tabBarActiveTintColor: "#00af9d" , 
        tabBarLabelStyle : { fontFamily:"BMJUA", fontSize: 14,   } ,
          tabBarIcon: ( { } ) => {
            return (
              <Image source={require('../assets/winter.jpg')} style={{width:30, height:20}}/>
            );
          } 
        }}
        />
        
      </Tabs.Navigator>
    </TodoContext.Provider>
  );
};
const styles=StyleSheet.create({
  headerBtn:{
    width:100,
    height:60,
    backgroundColor:'powderblue',
  },
  logoutBtn:{
    fontFamily:'BMJUA',
    fontSize:18,
    color:'white',
  },
  btnView:{
    backgroundColor:'#191970', width:80, height:30,
    justifyContent:'center',
    alignItems:'center',
    right:10
  },
})
