import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform, TouchableWithoutFeedback, Button, Keyboard  } from 'react-native';
import moment from 'moment';
import SQLite from 'react-native-sqlite-storage';
import { create } from 'react-test-renderer';
import { getTime } from 'date-fns';

const KeyboardAvoidingComponent = () => {
  const [name, setName]=useState("KEIL")
  const db = SQLite.openDatabase({
    name: 'testDB3',
    location: 'default',
    // createFromLocation: '~www/Todo2.db',
  },
    () => {    
    },  error => { console.log('AssignScreen - Open Database error'); },
  );

  const date=new Date();
  console.log(moment().format('YYYY-MM-DD'))
  useEffect(()=> {
  })
  const create = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS test2 ('
              +'today1 DATETIME DEFAULT CURRENT_TIMESTAMP,'
              +'today2 DATE default sysdate,'
              +'today3 TIMESTAMP DEFAULT CURRENT_TIMESTAMP, '
              +'name TEXT)'
            ,
            [],
            (tx , res) => {
                console.log("table created successfully");
            }, error => {
              console.log("Table unsuccessfully created")
            }
        );
    });
  };  
  const insert = () => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO test2 (name) VALUES (?)',
        [name],
        (tx,res) => {
          
        }, error => {
          console.log(" DeleteFailed")
        }
      )
    })
  }
  
  const deleteData = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM test2 ',
        [],
        (tx,res) => {
          console.log("Delete 성공")
          
        }, error => {
          console.log(" DeleteFailed")
        }
      )
    })
  }
  
  const select = () => { 
    db.transaction(tx => {
      tx.executeSql(
        'SELECT name FROM test2',
        [],
        (tx,res) => {
          console.log("select succeess")
          console.log(res)
          var len=res.rows.length;
          let temp=[];
          console.log(res.rows.item[0])
          for(let i=0; i < len ; i++){
            temp.push(res.rows.item[i]);
          }console.log(temp);
        }, error => {
          console.log("Select Failed")
        }
      )
    })
  }
  // console.log(NewDate);
  // console.log("ddddd : "+yourDate);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Header</Text>
          <TextInput placeholder="Username" style={styles.textInput} />
          <View style={styles.btnContainer}>
            <Button title="Submit" onPress={select} />
            <Button title="Delete" onPress={deleteData} style={{top:100}} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around"
  },
  header: {
    fontSize: 36,
    marginBottom: 48
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  }
});

export default KeyboardAvoidingComponent;