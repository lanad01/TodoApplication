import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import assignscreen from './assignscreen';
import assignscreen_photo from './assignscreen_photo';

const AssignStack= createStackNavigator();
export const AssignStackScreen= () => {
  return(
    <AssignStack.Navigator>
      <AssignStack.Screen name="Assign1st" component={assignscreen} 
      options={{ headerTitle: "Assign", headerTitleStyle : { fontFamily:"BMJUA" } ,
      headerStyle : { backgroundColor : '#E0FFFF' } }} />
      <AssignStack.Screen name="Assign2nd" component={assignscreen_photo} 
      options={{ headerTitleStyle : { fontFamily:"BMJUA" } , headerTitle:"Profile Image", animationTypeForReplace:"push" ,
      headerStyle : { backgroundColor : '#E0FFFF' } }} />
    </AssignStack.Navigator>
  )
}