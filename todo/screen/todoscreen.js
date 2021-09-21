import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import GestureRecognizer, {  swipeDirections,} from 'react-native-swipe-gestures';
import {format} from 'date-fns';
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../context';
import TodoList_v2 from './todoList_v2'
import { TodoContext } from '../todoContext';

export const Todo = ( {navigation}) => {
  // const { signOut } = React.useContext(AuthContext);
  // const [userName, setUserName] = useState();


  const authContext = React.useContext(AuthContext);
  const todoContext = React.useContext(TodoContext);
  
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState(false); // 달력 모달 오픈

  const [ taskName, setTaskName ] = React.useState();
  const [ priority, setPriority ] = React.useState();
  const [ exp, setExp ] = React.useState(new Date());
  var formatteddate=format(exp, "MMMM do EEE yyyy");

  const register = () => { // Task 추가 등록
    todoContext.addTaskName(taskName);
    todoContext.addPriority(priority);
    todoContext.addExp(formatteddate);
    setModal(!modal);
  }
  const addModal = () => { // Task추가 모달창 On
    setModal(!modal);
  }
  const exitModal = () => { // Task추가 모달창 Off
    setModal(!modal);
  }

  // Gesture Recognizer 
  const config = { velocityThreshold: 0.5, directionalOffsetThreshold: 80 };

  function onSwipe(gestureName, gestureState) {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_RIGHT:
        navigation.navigate("Profile");
        break;
      case SWIPE_UP:
        console.log(gestureName)
        break;
      case SWIPE_DOWN:
        console.log(gestureName)
        break;
      case SWIPE_LEFT:
        console.log(gestureState)
        break;
    }
  }
  return (
    <GestureRecognizer
      style={{ height:"100%"}}
      onSwipe={(direction, state) => onSwipe(direction, state)}
      onSwipeUp={state => state}
      onSwipeDown={state => state}
      onSwipeLeft={state => state}
      onSwipeRight={state => state}
      config={config}>
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}> To Do List Application</Text>
        <View style={styles.addModalBtn}>
          <Text style={styles.welcomingTxt}>
            {authContext.userName} 님 환영합니다!{' '}
          </Text>
          
        </View>
      </View>
      <TouchableOpacity
            onPress={addModal}
            style={{ marginLeft: 200, marginTop: 50 }}>
            <Image source={require('../assets/add.png')} />
          </TouchableOpacity>
      <TodoList_v2 />
      <Modal isVisible={modal} avoidKeyboard={true} transparent={true} >
        <View style={styles.addModal}>
          <Text style={styles.modalheader}> New Task </Text>
          <View style={styles.addTaskContent}>
            <Text style={styles.taskContentText}> Task명 : </Text>
            <TextInput style={styles.taskInput} onChangeText={(taskName)=>setTaskName(taskName)} maxLength={20}></TextInput>
          </View>
          <View style={styles.addTaskContent}>
            <Text style={styles.taskContentText}> Priority : </Text>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Picker
                selectedValue={priority}
                style={styles.picker}
                mode="dropdown"
                onValueChange={(priority)=> setPriority(priority)}
              >
                <Picker.Item label="Option" value="미설정" />
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Middle" value="Middle" />
                <Picker.Item label="Low" value="Low" />
              </Picker>
            </View>
          </View>
          <View style={styles.addTaskContent}>
            <TextInput style={styles.expInput} value={formatteddate} editable={false}  />
            <TouchableOpacity style={styles.opacity}  onPress={() => setOpen(true)}>
              <Text style={{ fontFamily: 'BMJUA',  fontSize: 17, color: '#191970', marginRight: 0}}> 날짜지정 </Text>
            </TouchableOpacity>
            <DatePicker modal open={open} date={exp} 
                onConfirm={(exp) => { setOpen(false)
                setExp(exp)
                }}
                onCancel={() => {
                setOpen(false)
                }}/>
          </View>
          <View style={styles.addTaskContent}>
            <TouchableOpacity style={styles.opacity2} onPress={exitModal}>
                <Text style={styles.regBtn}> 나가기 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opacity2} onPress={register}>
                <Text style={styles.regBtn}> 등록 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    paddingTop: 30,
    alignItems: 'center',
    fontSize: 30,
    color: 'white',
    fontFamily: 'BMJUA',
  },
  welcomingTxt: {
    marginTop: 80,
    fontFamily: 'BMJUA',
    fontSize: 21,
    color: 'white',
    position:'absolute'
  },
  addModalBtn: {
    flexDirection: 'row',
    position:'absolute',
  },
  addModal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191970',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 30,
    width: 300,
    height:100,
    marginLeft: 25,
  },
  modalheader: {
    fontFamily: 'BMJUA',
    fontSize: 22,
    color: 'white',
    marginTop: 10,
  },
  addTaskContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#191970',
    marginTop: 12,
    flexDirection: 'row',
  },
  taskContentText: {
    color: 'white',
    fontFamily: 'BMJUA',
    fontSize: 20,
  },
  taskInput: {
    width: '55%',
    height: 35,
    backgroundColor: 'white',
    borderRadius: 7,
    marginLeft: 10,
  },
  picker: {
    width: 160,
    height: 50,
    backgroundColor: 'white',
    marginLeft: 5,
  },
  expButton: {
    fontFamily: 'BMJUA',
    fontSize: 17,
    color: 'white',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 5,
    width: 65,
    height: 35,
    marginRight: 15,
  },
  expInput: {
    backgroundColor: 'white',
    marginLeft: 3,
    width: 170,
    height: 40,
    borderRadius: 5,
    fontFamily: 'BMJUA',
    fontSize: 14,
    color: '#191970',
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    color: 'white',
    fontSize: 19,
  },
  opacity: {
    backgroundColor: 'white',
    marginTop: 0,
    borderStyle: 'dotted',
    borderWidth: 4,
    borderColor: 'white',
    width: 70,
    alignItems: 'center',
    marginLeft: 10,
  },
  showText: {
    marginTop: 10,
    fontSize: 25,
    color: 'white',
  },
  logoutBtn: {
    margin: 10,
  },
  opacity2 : {
    backgroundColor: 'white',
    marginBottom:10,
    borderStyle: 'dotted',
    borderWidth: 4,
    borderColor: 'white',
    width: 70,
    alignItems: 'center',
    marginLeft: 10,
    
  },
  regBtn:{
    fontFamily: 'BMJUA',
    fontSize: 17,
    color: '#191970',
    marginRight: 0
  },  
  btn: {
    alignItems: 'center',
    backgroundColor: 'white',
    width: 100,
    height: 40,
    borderRadius: 5,
    borderWidth: 5,
    marginBottom: 10,
  },
  btnTxt: {
    fontFamily: 'BMJUA',
    fontSize: 20,
    marginTop: 2,
  },
});
