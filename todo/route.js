import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./authcontext";
import { TabsScreen } from "./screen/tabsScreen"
import SQLite from 'react-native-sqlite-storage';
import { AssignStackScreen } from "./screen/assignroot";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import { authScreen } from "./screen/authScreen";

export default () => {
  const db = SQLite.openDatabase({ name: 'testDB5', location: 'default', createFromLocation: 2, } );
  const createTable = () => {
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
  
  useEffect(() => {
    createTable();
  }, []
  );
  const [user_no, setUserNo] = useState(null);
  
  autoLogin = () => { 
    try{
      const loginedNo= AsyncStorage.getItem("user_no");
      setUserNo(loginedNo);
    }catch(err){
      console.log(err)
    }
  }
  console.log("Async에 저장된 userNo : " +user_no)
 
  const MainStack=createStackNavigator();
  const authContext=React.useContext(AuthContext);
  return (
    <AuthContext.Provider value={authContext}>
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