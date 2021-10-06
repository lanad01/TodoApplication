import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import { TodoContext } from '../todoContext';
import { DB } from '../sqliteConnection';
import { styles } from '../screen/styles/taskDetailModalStyle';
import moment from 'moment';

export const TaskDetailModal = props => {
  const todoContext = useContext(TodoContext);
  const [taskName, setTaskName] = useState('');
  const [taskPrior, setPrior] = useState('');
  // const [newExp, setNewExp] = useState('');
  const [exp, setExp] = useState(new Date());
  const [open, setOpen] = useState(false); // 달력 모달 오픈
  let week = new Array('일', '월', '화', '수', '목', '금', '토');
  let year = exp.getFullYear();
  let month = exp.getMonth() + 1;
  let day = exp.getDate();
  let dayName = week[exp.getDay()];
  let dateToKorean = year + '년 ' + month + '월 ' + day + '일 ' + dayName + '요일 ';
  let newExp = moment(exp).format('llll')
  useEffect(() => {
    console.log('useEffect on?');
    DB.transaction(tx => {
      tx.executeSql(
        'SELECT task_name,priority,exp FROM task_info2 WHERE task_no=?',
        [props.task_no],
        (tx, res) => {
          setTaskName(res.rows.item(0).task_name)
          setPrior(res.rows.item(0).priority);
        },
        error => {
          console.log('Delete Failed' + error);
        },
      );
    });
    return () => {};
  }, [props.modalOn]);
  const updateTask = () => {
    console.log("new Task NAme :"+taskName)
    console.log("new Task prior :"+taskPrior)
    console.log("new Task exp :"+exp)
    console.log("newExp to String :"+newExp)
    DB.transaction(tx => {
      tx.executeSql(
        'UPDATE task_info2 SET task_name=?, priority=?, exp=? WHERE task_no=?',
        [taskName,taskPrior,newExp,props.task_no],
        (tx,res)=>{
          console.log("Update Task Success")
          props.modalOff()
          props.render()
        },
        error => {
          console.log('Update Task Failed' + error)
        },
      );
    });
  }
  return (
    <Modal
      isVisible={props.modalOn}
      style={styles.modal}>
        <View style={styles.validModal}>
          <View style={styles.container}>
            <Text style={styles.validText}> Task 명 : </Text>
            <TextInput
              style={styles.content}
              defaultValue={taskName}
              onChangeText={taskName => setTaskName(taskName)}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.priorText}> 우선순위 : </Text>
            <View
              style={styles.pickerView}>
              <Picker
                defaultValue={todoContext.taskPrior}
                selectedValue={taskPrior}
                style={styles.picker}
                mode="dropdown"
                onValueChange={taskPriority => setPrior(taskPriority)}>
                <Picker.Item label="Option" value="미설정" />
                <Picker.Item label="High" value="High" />
                <Picker.Item label="Middle" value="Middle" />
                <Picker.Item label="Low" value="Low" />
              </Picker>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={styles.datePickerView}
                onPress={() => setOpen(true)}>
                <Text style={styles.changeExp}>기한변경 </Text>
              </TouchableOpacity>
              <TextInput
                editable={false}
                defaultValue={dateToKorean}
                style={styles.pickedData}
              />
            </View>
            <DatePicker
              modal
              open={open}
              date={exp}
              minimumDate={new Date()}
              mode={'date'}
              textColor={'#191970'}
              onConfirm={exp => {
                setOpen(false);
                setExp(exp);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.choicebox} onPress={props.modalOff}>
              <Text textAlign="center" style={styles.button}>
                목록으로
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.choicebox} onPress={updateTask}>
              <Text textAlign="center" style={styles.button}>
                수정하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </Modal>
  );
};
