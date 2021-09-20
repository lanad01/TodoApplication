import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Alert } from 'react-native'
import { Todo } from './todoscreen';
import { TodoContext } from '../todoContext';
import { AuthContext } from '../context';
import { Profile } from './profilescreen'
import dummy from './dummyScreen' //Navigate 
import { ProfileStackScreen } from './profileRoot';

const Tabs = createBottomTabNavigator();
export const TabsScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);
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
    console.log('success');
    signOut();
    navigation.navigate("Auth");
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
        <Tabs.Screen name="To do" component={Todo}
        options={{ tabBarBadge : 3 ,  tabBarActiveTintColor: "#00af9d" , headerStyle: { backgroundColor:'#E0ffff' } ,
        headerTitleStyle:{ fontFamily:'BMJUA' },
          tabBarIcon: ( {  } ) => { 
            return (
              <Image source={require('../assets/128x128.png')} style={{width:30, height:30}}/>
            );
          } 
        }}
        />
        <Tabs.Screen name="LogOut" component={Todo} headerShown={false} 
        listeners={{ tabPress: (e) => { outFromTab() }}} 
        options={{ tabBarBadge : 3  , tabBarActiveTintColor: "#00af9d" ,
        headerTitleStyle:{ fontFamily:'BMJUA' }, 
          tabBarIcon: ( {  } ) => { 
            return (
              <Image source={require('../assets/lout.png')} style={{width:30, height:30}}/>
            );
          } 
        }}
        />
      </Tabs.Navigator>
    </TodoContext.Provider>
  );
};
