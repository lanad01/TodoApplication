import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "./context";
import { ActivityIndicator } from "react-native-paper";
import { TabsScreen } from "./screen/tabsScreen"
import SQLite from 'react-native-sqlite-storage';
import { AuthStackScreen } from "./screen/authroot";
import { AssignStackScreen } from "./screen/assignroot";

const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => { // 시작 스크린
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
    // SQLite.openDatabase({ 이름, 로케이션, 성공, 에러
        // name : "testDB", createFromLocation : "~data/mydbfile.sqlite"}, okCallback,errorCallback);
    { name: 'testDB3',
      location: 'default',
      // createFromLocation: '~www/Todo2.db',
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
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS user ('
              +'user_no INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,'
              +'id VARCHAR(30) NOT NULL,'
              +'pwd VARCHAR(30) NOT NULL,'
              +'name VARCHAR(30) NOT NULL,'
              +'job VARCHAR(30),'
              +'email VARCHAR(100),'
              +'image VARCHAR(255),'
              +'regi_date DATE default sysdate)'
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
  const [name, setName] =React.useState('i1nit');
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