import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import ProfileEdit from './profileEdit';
import { Profile } from './profilescreen';

export const ProfileStackScreen= () => {
    const ProfileStack= createStackNavigator();
    function saveBtn(){
        alert('ddd')
    }
    return(
      <ProfileStack.Navigator initialRouteName="Profile1st">
        <ProfileStack.Screen name="Profile1st" component={Profile} 
        options={{ headerTitle: "프로필", headerTitleStyle : { fontFamily:"BMJUA" } ,
        headerStyle : { backgroundColor : '#E0FFFF' } }} />
        <ProfileStack.Screen name="ProfileEdit" component={ProfileEdit} 
        options={{  headerRight: () => (
             null
            ),
            headerTitle: "프로필 수정", headerTitleStyle : { fontFamily:"BMJUA" } ,
            headerStyle : { backgroundColor : '#E0FFFF' } }} />
      </ProfileStack.Navigator>
    )
  }

  const styles=StyleSheet.create({
      
})