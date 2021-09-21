import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./context";
import { ActivityIndicator } from "react-native-paper";
import { TabsScreen } from "./screen/tabsScreen"
import SQLite from 'react-native-sqlite-storage';
import { AuthStackScreen } from "./screen/authroot";
import { AssignStackScreen } from "./screen/assignroot";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => { // 시작 스크린
  const [login, setLogin]=useState(false); 
  AsyncStorage.getItem('user_no', (err, res)=> {
    console.log("user정보 : " +res);
    if(res!=null){ setLogin(true); } //Login 정보 확인 성공
    
  })
  if(login===true) userToken=true;
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? ( // userToken true 
        <RootStack.Screen name="App" component={TabsScreen}  
        options={{ animationEnabled: false,  headerTitleStyle: { fontFamily:"BMJUA"}, 
          headerStyle: { backgroundColor: '#E0ffff'} }} />
      ) : ( // userToken false
        <RootStack.Screen
          name="Auth" component={AuthStackScreen} 
          options={{ animationEnabled: false,  headerTitleStyle: { fontFamily:"BMJUA"}, 
          headerStyle: { backgroundColor: '#E0ffff'} }} />
      )}
        <RootStack.Screen name="Assign" component={AssignStackScreen} 
         options={{ animationEnabled: false,  headerTitleStyle: { fontFamily:"BMJUA"}, 
         headerStyle: { backgroundColor: '#E0ffff'} }} />
    </RootStack.Navigator>
  )
};

export default () => {
  const db = SQLite.openDatabase(
    { name: 'testDB5',
      location: 'default',
      createFromLocation: 2,
    }, () => {
      console.log('Open은 success');
    },error => { 
      console.log('error');
    },
  );
  useEffect(() => {
    createTable();
  }, []
  );
  const createTable = () => {
    var date=
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
  };
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);
  const [name, setName] = React.useState('i1nit');
  const authContext = {
    userName: name,
    nameUpdate: (arg) => {
      setName(arg); // authContext가 가진 userName이라는 속성이 authScreen에서 넘겨준 argument로 바뀐다
    },
    signIn: () => {
      setIsLoading(false);
      setUserToken("asdf");
    },
    signUp: () => {
      setIsLoading(false);
      setUserToken("asdf");
    },
    signOut: () => {
      setIsLoading(false);
      setUserToken(null);
    }
  };
  // const [contextstate, setContext] = React.useState(authContext);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
  }, []);

  if (isLoading) {
    return <ActivityIndicator color="white" size="large" />;
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <RootStackScreen userToken={userToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};