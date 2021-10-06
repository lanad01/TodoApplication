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
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "앱을 종료하시겠습니까?", [
        {
          text: "취소",
          onPress: () => null,
        },
        { text: "확인", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => 
    backHandler.remove();
  }, []);
  useEffect(() => { //Create Table 선언
    CREATE_USER_TABLE();
    autoLogin()
  }, []
  );
  autoLogin = async () => {
    try{
      console.log("autoLogin From route")
      const user_no = await AsyncStorage.getItem("user_no")
      if(value!=null){
        console.log("Async Value :"+user_no)
        authContext.user_no=value;
        getInfoWhenAutoLogin(user_no)
        navigation.navigate("MainScreen")
      }else{
        console.log("ASync Null Login Required")
      }
    }catch(error){
      console.log("AutoLogin Error"+error)
    }
  }

  const authContext=React.useContext(AuthContext);
  const opt = () => { return {
    animationEnabled: false, headerTitleStyle: { fontFamily:"BMJUA"}, 
    headerShown:false, headerStyle: { backgroundColor: '#E0ffff' }}}
  
  const MainStack=createStackNavigator();
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Auth" headerShown={false}>
          <MainStack.Screen name="MainScreen" component={TabsScreen} options={opt} /> 
          <MainStack.Screen name="Auth" component={authScreen} options={opt} />
          <MainStack.Screen name="Assign" component={AssignStackScreen} options={opt} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};