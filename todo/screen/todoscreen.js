import React, { useState, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import GestureRecognizer, {  swipeDirections,} from 'react-native-swipe-gestures';
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import SQLite from 'react-native-sqlite-storage';
import { AuthContext } from '../context';
import TodoList_v2 from './todoList_v2'
import { Loading } from '../modal/Loading';

export const Todo = ( {navigation}) => {
  const authContext = React.useContext(AuthContext)
  const [loading, setLoading] = useState(false);
  const [render2, reRender2]=useState(1)
  const renderControl = () => { //FlatList 리렌더용
    reRender2(render2+1)
  }
  const db = SQLite.openDatabase({name: 'testDB5', location: 'default', createFromLocation: 2,})
  useEffect( () => { // 이 화면이 처음 띄워질 때만 실행됨 - 다른 Stack.Screen 들렀다 왔다해도 실행되는 것이 아님.
                     // 그렇기 때문에 interval을 통한 주기적인 flatList reRender를 수행해야함. 
                     // 근데 interval을 냅두면 memory Leak이라면서 오류가 뜸. 
                     // 따라서 unmount 시 clearInterVal을 수행해줘야함 반드시.
    createTaskTable()
    const interval = setInterval(() => {
      console.log("useEffect on?")
      reRender2(render2+1)
    }, 3000);
    return () => {  // This is important, you must clear your interval when component unmounts
      console.log("Unmounted from todoScreen")
      clearInterval(interval)
      setLoading(false);
    }
  }, [])
  const createTaskTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT task_no FROM task_info',[],
        (tx,res)=>{
          var len=res.rows.length;
          if(len>0){

          }else if(len===0){
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
  }  
  const [modal, setModal] = useState(false); // 태스크 추가 모달
  const [open, setOpen] = useState(false); // 달력 모달 오픈

  const [ taskName, setTaskName ] = React.useState(null);
  const [ priority, setPriority ] = React.useState();
  const [ exp, setExp ] = React.useState(new Date());
  var week = new Array('일', '월', '화', '수', '목', '금', '토');
  var year=exp.getFullYear();
  var month = exp.getMonth()+1;
  var day = exp.getDate();
  var dayName = week[exp.getDay()];
  var dateToKorean=year+'년 '+month+'월 '+day+'일 '+dayName+'요일 ';
  const register = () => { // Task 추가 등록
    if(taskName != null){ // name은 낫널
      db.transaction(tx => {
        setLoading(true);

        tx.executeSql(
            'INSERT INTO task_info (user_no, task_name, priority, exp) VALUES (?,?,?,?)',
            [authContext.user_no,taskName, priority, dateToKorean ],
            (tx , res) => {
              console.log("Insert Success")
              setModal(!modal);
              reRender2(render2+1) // FlatList 리렌더링용
              setLoading(false);
            }, error => {
              console.log("Insert Failed"+error);
            }
        );
      });
    }else if(taskName===null){
      console.log("TaskName Null!!")
    }
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
        console.log("left")
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
           [ {authContext.name} ] 님 환영합니다!{' '}
          </Text>
          
        </View>
      </View>
      <TouchableOpacity  onPress={() => setModal(!modal)} style={{ marginLeft: 250, marginTop: 30,}}>
            <Image source={require('../assets/add.png')} />
      </TouchableOpacity>
      <TodoList_v2 render2={renderControl}  />
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
            <TextInput style={styles.expInput} value={dateToKorean} editable={false}  />
            <TouchableOpacity style={styles.opacity}  onPress={() => setOpen(true)}>
              <Text style={{ fontFamily: 'BMJUA',  fontSize: 17, color: '#191970', marginRight: 0}}> 날짜지정 </Text>
            </TouchableOpacity>
            <DatePicker modal open={open} date={exp} minimumDate={new Date()} mode={'date'} textColor={'#191970'}
                onConfirm={(exp) => { setOpen(false)
                setExp(exp)
                }}
                onCancel={() => {
                setOpen(false)
                }}/>
          </View>
          <View style={styles.addTaskContent}>
            <TouchableOpacity style={styles.opacity2} onPress={() => setModal(!modal)}>
                <Text style={styles.regBtn}> 나가기 </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.opacity2} onPress={register}>
                <Text style={styles.regBtn}> 등록 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Loading modalOn={loading}/>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191970',
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 30,
    width: 300,
    height:400,
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
    marginLeft:10,
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
    fontFamily:'BMJUA',
    paddingLeft:10,
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
    paddingLeft:12,
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