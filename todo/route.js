import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "./authcontext";
import { TabsScreen } from "./screen/tabsScreen"
import { AssignStackScreen } from "./screen/assignroot";
import moment from "moment";
import AsyncStorage from "@react-native-community/async-storage";
import { authScreen } from "./screen/authScreen";
import { CREATE_USER_TABLE } from "./globalVar";

export default () => {
  useEffect(() => { //Create Table 선언
    CREATE_USER_TABLE();
  }, []
  );
  const [user_no, setUserNo] = useState(null);
  autoLogin = () => { 
    try{
      console.log("AutoLogin")
      const loginedNo=AsyncStorage.getItem("user_no");
      console.log(loginedNo)
      setUserNo(loginedNo);
    }catch(err){
      console.log("AutoLogin"+err)
    }
  }
  console.log("Async에 저장된 userNo : " +user_no)
 
  const authContext=React.useContext(AuthContext);
  const opt = () => { return {
    animationEnabled: false, headerTitleStyle: { fontFamily:"BMJUA"}, 
    headerShown:false, headerStyle: { backgroundColor: '#E0ffff' }}}
  
  const MainStack=createStackNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Auth" headerShown={false}>
          <MainStack.Screen name="MainScreen" component={TabsScreen} options={opt}/> 
          <MainStack.Screen name="Auth" component={authScreen} options={opt} />
          <MainStack.Screen name="Assign" component={AssignStackScreen} options={opt} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};