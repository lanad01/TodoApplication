import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Alert, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Todo } from './todoscreen';
import { TodoContext } from '../todoContext';
import { AuthContext } from '../context';
import { ProfileStackScreen } from './profileRoot';
import AsyncStorage from '@react-native-community/async-storage';

export const TabsScreen =  props  => {
  const authContext = React.useContext(AuthContext);
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
  function outFromTab2(){ 
    AsyncStorage.removeItem("user_no");
    console.log("로그아웃 실행")
    props.navigation.navigate("Auth")
  }
  const todoContext = {
    task_no:[],
    task_name: [],
    task_prior:[],
    task_exp:[],
  };
  const Tabs = createBottomTabNavigator();
  return (
    <TodoContext.Provider value={todoContext}>
      <Tabs.Navigator initialRouteName="To do"  >
        <Tabs.Screen name="Profile" component={ProfileStackScreen}  
        options={{ tabBarBadge : 3 , tabBarActiveTintColor: "#00af9d" , 
        tabBarLabelStyle : { fontFamily:"BMJUA", fontSize: 14, } ,headerStyle: { backgroundColor:'#E0ffff' } ,
        headerTitleStyle:{ fontFamily:'BMJUA' }, 
        headerRight: () => (
          <TouchableOpacity style={styles.btnView} onPress={outFromTab}>
           <Text style={styles.logoutBtn}>Logout</Text>
          </TouchableOpacity>         ),
          tabBarIcon: ({}) => {
            return (
              <Image source={require('../assets/winter.jpg')} style={{width:30, height:20}}/>
            );
          } 
        }}
        />
        <Tabs.Screen name="To do" component={Todo}
        options={{ tabBarBadge : 3 ,  tabBarActiveTintColor: "#00af9d" , 
        headerTitleStyle:{ fontFamily:'BMJUA' }, headerStyle: { backgroundColor:'#E0ffff' } ,
        headerRight: () => (
              <TouchableOpacity style={styles.btnView} onPress={outFromTab}>
               <Text style={styles.logoutBtn}>Logout</Text>
             </TouchableOpacity>         
             ),
          tabBarIcon: ( {  } ) => { 
            return (
              <Image source={require('../assets/128x128.png')} style={{width:30, height:30}}/>
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
