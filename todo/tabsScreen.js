import React, {useState} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'
import { Todo } from './screen/todoscreen';
import { TodoContext } from './todoContext';
import { Profile2 } from './screen/profilescreen'
import CameraView from './camera';

const Tabs = createBottomTabNavigator();
export const TabsScreen = () => {
//   const taskArray = [];
  const [ taskArray, setTaskArray] = useState([]);
  const [ priorityArray, setPriorityArray ] = useState([]);
  const [ expArray, setExpArray ] = useState([]);
//   const [ render, setRender] = useState(true);
//   const [taskName, setTaskName] = useState('Lunch');
//   const [priority, setPriority] = useState('Middle');
//   const [exp, setExp] = useState('Tom');
  const todoContext = {
    userName: '',
    taskName: 'init task',
    priority: 'init prio',
    expiration: 'init exp',
    taskArray : taskArray,
    priorityArray : priorityArray,
    expArray : expArray,
    addTaskName: arg => {
    //   setTaskName(arg);
    //   setTaskArray(taskArray => taskArray.concat(arg));
        taskArray.push(arg);
    },
    addPriority: arg => {
    //   setPriority(arg);
    //   setPriorityArray(priorityArray => priorityArray.concat(arg));
        if(arg!="High" && arg!="Middle" && arg!="Low") {
            priorityArray.push("Middle")
        }else{
            priorityArray.push(arg);
        }
    },
    addExp: arg => {
    //   setExp(arg);
    //   setExpArray(expArray => expArray.concat(arg));
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
      <Tabs.Navigator initialRouteName="To do" >
        <Tabs.Screen name="Profile" component={Profile2} headerShown={false} 
        options={{ tabBarBadge : 3 , 
          tabBarIcon: ( { } ) => { 
            return (
              <Image source={require('./assets/winter.jpg')} style={{width:30, height:20}}/>
            );
          } 
        }}
        />
        <Tabs.Screen name="To do" component={Todo} headerShown={false} 
        options={{ tabBarBadge : 3 , 
          tabBarIcon: ( {  } ) => { 
            return (
              <Image source={require('./assets/128x128.png')} style={{width:30, height:30}}/>
            );
          } 
        }}
        />
        <Tabs.Screen name="camera" component={CameraView} headerShown={false}/>
      </Tabs.Navigator>
    </TodoContext.Provider>
  );
};
