import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { signIn } from "./authScreen";

const AuthStack = createStackNavigator();
export const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={signIn} 
      options={{ headerTitle: "Sign In", headerTitleStyle : { fontFamily:"BMJUA" } ,
      headerStyle : { backgroundColor : '#E0FFFF' } }} />
    </AuthStack.Navigator>
  )
};