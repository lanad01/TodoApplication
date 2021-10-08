import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { BackHandler, Alert } from "react-native";
import { AuthContext } from "./authcontext";
import { TabsScreen } from "./screen/tabsScreen"
import { AssignStackScreen } from "./screen/assignroot";
import { authScreen } from "./screen/authScreen";
import { CREATE_USER_TABLE } from "./sqliteConnection";


export default () => {
  useEffect(() => { //Create Table 선언
    CREATE_USER_TABLE();
  }, []
  );
  const authContext=React.useContext(AuthContext);
  const opt = () => { return {
    animationEnabled: false, headerTitleStyle: { fontFamily:"BMJUA"}, 
    headerShown:false, headerStyle: { backgroundColor: '#E0ffff' }}}
  
  const MainStack=createStackNavigator();
  const linking = {
    prefixes: ['https://localhost:8001/'],
  };
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer linking={linking}>
        <MainStack.Navigator initialRouteName="Auth" headerShown={false}>
          <MainStack.Screen name="MainScreen" component={TabsScreen} options={opt} /> 
          <MainStack.Screen name="Auth" component={authScreen} options={opt} />
          <MainStack.Screen name="Assign" component={AssignStackScreen} options={opt} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};