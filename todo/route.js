import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context";
import { TabsScreen } from "./screen/tabsScreen"
import SQLite from 'react-native-sqlite-storage';
import { AuthStackScreen } from "./screen/authroot";
import { AssignStackScreen } from "./screen/assignroot";
import moment from "moment";
import { Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { authScreen } from "./screen/authScreen";

export default () => {
  const db = SQLite.openDatabase({ name: 'testDB5', location: 'default', createFromLocation: 2, } );
  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM user_info',
        [],
        (tx, res)=> {
          var len=res.rows.length;
          if(len === 0){
            db.transaction(tx => {
              tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS user_info ('
                    +'user_no INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
                    +'id VARCHAR(30) NOT NULL,'
                    +'pwd VARCHAR(30) NOT NULL,'
                    +'name VARCHAR(30) NOT NULL,'
                    +'job VARCHAR(30),'
                    +'email VARCHAR(100),'   
                    +'regi_date VARCHAR(100) default "'+moment().format('YYYY-MM-DD')
                    +'", image VARCHAR(255));'
                  ,
                  [],
                  (tx , res) => {
                      console.log("table created successfully");
                  }, error => {
                    console.log("Table unsuccessfully created")
                  }
              );
          });
          }
        }
      )
    })
  };
  useEffect(() => {
    createTable();
    loginValid();
  }, []
  );
  const [user_no, setUserNo] = useState(null);
  const loginValid = () => {
    AsyncStorage.getItem("user_no", (err, res) => {
      console.log("Asyn get res : " +res);
      if(res!=null){
        console.log("res is not null")
        setUserNo(res);
        console.log(user_no); //null?
      }
    })
  }
  const MainStack=createStackNavigator();
  return (
    <AuthContext.Provider value={{}}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Auth" headerShown={false}>
          <MainStack.Screen name="MainScreen" component={TabsScreen} 
          options={{ animationEnabled: false, headerTitleStyle: { fontFamily:"BMJUA"}, headerShown:false,
          headerStyle: { backgroundColor: '#E0ffff'}}}/>
          
          <MainStack.Screen
          name="Auth" component={authScreen} 
          options={{ animationEnabled: false,  headerShown: false, headerTitleStyle: { fontFamily:"BMJUA"}, 
          headerStyle: { backgroundColor: '#E0ffff'} }} />
          
          <MainStack.Screen name="Assign" component={AssignStackScreen} 
         options={{ animationEnabled: false,  headerShown: false, headerTitleStyle: { fontFamily:"BMJUA"}, 
         headerStyle: { backgroundColor: '#E0ffff'} }} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};
const styles = StyleSheet.create({
  
})