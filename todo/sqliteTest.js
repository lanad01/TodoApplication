import React, { Component, useEffect, useState } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    // SQLite.openDatabase({ 이름, 로케이션, 성공, 에러
        // name : "testDB", createFromLocation : "~data/mydbfile.sqlite"}, okCallback,errorCallback);
  {
    name: 'Todo_V1.db',
    location: 'default',
    createFromLocation: '~www/Todo_V1.db',
  },
  () => {
    console.log('Open은 success');
  },
  error => {
    console.log('error');
  },
);
export default function sqliteTest() {
  const [name, setName] = useState('초기값');
  const [age, setAge] = useState('초기값');
  const [ id, setid] = useState("")

  useEffect(() => {
    createTable();
    addRow();
    getData();
  }, []);
  const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS test2 (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20))'
            ,
            [],
            (tx , res) => {
                console.log("table created successfully");
            }, error => {
            }
        );
    });
  };
  const addRow = () => {
      db.transaction(tx => {
          tx.executeSql(
              'INSERT INTO test2 (id) VALUES (123) ',
              [ ],
              (tx, res) => {
                  console.log('insert success')
              }, error => {
                  console.log('insert error')
              }
          )
      })
  }
  const getData = () => {
    // alert('ddd')
    db.transaction(tx => {
      tx.executeSql(
        'SELECT name FROM test2',
        [], 
        (tx, results) => {
        var len = results.rows.length;
        console.log(len)
        for(let i=0 ; i< len ; i++){
          console.log(results.rows.item[i].name)
        }
  
      }, error => {
          console.log('Transaction 은 Error');
      });
    });
  };
  return (
    <View style={{ top: 300, left: 100 }}>
      <Text>
        NAME : {name} AGE : {age}{' '} Id: {id}
      </Text>
      <Button title="gegeg" onPress={getData} />
    </View>
  );
}
