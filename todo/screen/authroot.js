import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { authScreen } from "./authScreen";

const authScreen_Opt = () =>  {
  return{
   headerTitle: "Sign In", headerTitleStyle : { fontFamily:"BMJUA" } ,
  headerStyle : { backgroundColor : '#E0FFFF'  }
  }
} 

const AuthStack = createStackNavigator();
export const AuthStackScreen = (  ) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={authScreen} options={authScreen_Opt} />
    </AuthStack.Navigator>
  )
};