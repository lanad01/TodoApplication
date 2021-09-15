import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "./context";
import { signIn } from "./screen/authScreen";
import { ActivityIndicator } from "react-native-paper";
import { TabsScreen } from "./tabsScreen"

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={signIn} options={{ title: "Sign In" }} />
    </AuthStack.Navigator>
  )
};


const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken }) => { // 시작 스크린
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? ( // userToken true 
        <RootStack.Screen
          name="App" component={TabsScreen} options={{ animationEnabled: false }} />
      ) : ( // userToken false
        <RootStack.Screen
          name="Auth" component={AuthStackScreen} options={{ animationEnabled: false }} />
      )}
    </RootStack.Navigator>
  )
};

export default () => {
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