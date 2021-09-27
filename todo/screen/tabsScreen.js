import React, {useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Alert, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { Todo } from './todoscreen';
import { TodoContext } from '../todoContext';
import { ProfileStackScreen } from './profileRoot';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../authcontext';
import SQLite  from 'react-native-sqlite-storage';

export const TabsScreen =  props  => {
  const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})
  const authContext=React.useContext(AuthContext);
  const todoContext =React.useContext(TodoContext)
  const Tabs = createBottomTabNavigator();
  const [ getLengthForBadge, setLength ] = useState(0)
  console.log("tabsScreen mounted")
  db.transaction(tx => { //검색되는 튜플 자체가 없다면 테이블 생성
    tx.executeSql(
      'SELECT task_no FROM task_info',[],
      (tx,res)=>{
        var len=res.rows.length;
        if(len>0){}
        else if(len===0){
          db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS task_info ('
                +'task_no INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
                +'user_no INTEGER NOT NULL,'
                +'task_name VARCHAR(50) NOT NULL,'
                +'priority VARCHAR(30) default "Middle",'
                +'exp VARCHAR(100),'
                +'FOREIGN KEY(user_no) REFERENCES user_info(user_no) ON DELETE CASCADE)',
                [],
                (tx , res) => {
                    console.log("Tasktable created");
                }, error => {
                  console.log("Task table created fail "+error)
                }
            );
        });
        }
      }
    )
  })
  useEffect(() => {
    // setTimeout(() => { //비동기 처리는 이렇게 하는거밖에 방법이 없는거야?
    //   db.transaction(tx => { //badge 형성을 위해 해당 user_no의 남아있는 todoList length 출력
    //     tx.executeSql(
    //       'SELECT task_no FROM task_info WHERE user_no=?',
    //       [authContext.user_no],
    //       (tx,res)=>{
    //         var len=res.rows.length;
    //         setLength(len) //이걸 렌더링 해버리면 뒤쪽이 애매해지네
    //       });  
    //   })
    // }, 1000);
    db.transaction(async tx => { //badge 형성을 위해 해당 user_no의 남아있는 todoList length 출력
      //비동기처리 async로 최신화를 용이하게.
      await tx.executeSql(
        'SELECT task_no FROM task_info WHERE user_no=?',
        [authContext.user_no],
        (tx,res)=>{
          var len=res.rows.length;
          setLength(len) //이걸 렌더링 해버리면 뒤쪽이 애매해지네
        });  
    })
    return () => {
      
    }
  }, [getLengthForBadge])
  
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
  
  return (
    <TodoContext.Provider value={todoContext}>
      <Tabs.Navigator initialRouteName="To do"  >
        <Tabs.Screen name="Profile" component={ProfileStackScreen}  
        options={{  tabBarActiveTintColor: "#00af9d" , 
        tabBarLabelStyle : { fontFamily:"BMJUA", fontSize: 14, } ,headerStyle: { backgroundColor:'#E0ffff' } ,
        headerTitleStyle:{ fontFamily:'BMJUA' }, 
        headerRight: () => (
          <TouchableOpacity style={styles.btnView} onPress={outFromTab}>
           <Text style={styles.logoutBtn}>Logout</Text>
          </TouchableOpacity>         ),
          tabBarIcon: ({}) => {
            return (
              <Image source={require('../assets/profileIcon.png')} style={{width:40, height:30}}/>
            );
          } 
        }}
        />
        <Tabs.Screen name="To do" component={Todo}
        options={{  tabBarBadge :  getLengthForBadge ,tabBarActiveTintColor: "#00af9d" , 
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
