import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native'
import { HomeStackScreen } from './screen/profilescreen';
import { Todo } from './screen/todoscreen';
import { useState } from 'react/cjs/react.development';
import { TodoContext } from './todoContext';
import Icon from 'react-native-vector-icons'

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
      <Tabs.Navigator initialRouteName="To do">
        <Tabs.Screen name="Profile" component={HomeStackScreen} headerShown={false}/>
        <Tabs.Screen name="To do" component={Todo} headerShown={false} />
      </Tabs.Navigator>
    </TodoContext.Provider>
  );
};
