import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Button, Text } from 'react-native';
import ProfileEdit from './profileEdit';
import { Profile } from './profilescreen';
import { ResetPwd } from './resetPwd';

export const ProfileStackScreen = () => {
  const ProfileStack = createStackNavigator();
  function saveBtn() {
    alert('ddd');
  }
  return (
    <ProfileStack.Navigator initialRouteName="Profile1st">
      <ProfileStack.Screen
        name="Profile1st"
        component={Profile}
        options={{
          headerTitle: '프로필',
          headerShown: false,
          headerTitleStyle: { fontFamily: 'BMJUA' },
          headerRight: () => (
            <TouchableOpacity style={styles.btnView}>
              <Text style={styles.logoutBtn}>Logout</Text>
            </TouchableOpacity>
          ),
          headerStyle: { backgroundColor: '#E0FFFF' },
        }}
      />
      <ProfileStack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.btnView}>
              <Text style={styles.logoutBtn}>Logout</Text>
            </TouchableOpacity>
          ),
          headerTitle: '프로필 수정',
          headerTitleStyle: { fontFamily: 'BMJUA' },
          headerShown: false,
          headerStyle: { backgroundColor: '#E0FFFF' },
        }}
      />
      <ProfileStack.Screen
        name="resetPwd"
        component={ResetPwd}
        options={{
          headerRight: () => (
            <TouchableOpacity style={styles.btnView}>
              <Text style={styles.logoutBtn}>Logout</Text>
            </TouchableOpacity>
          ),
          headerTitle: '비밀번호 수정',
          headerTitleStyle: { fontFamily: 'BMJUA' },
          headerShown: false,
          headerStyle: { backgroundColor: '#E0FFFF' },
        }}
      />
    </ProfileStack.Navigator>
  );
};
const styles = StyleSheet.create({
  logoutBtn: {
    fontFamily: 'BMJUA',
    fontSize: 18,
    color: 'white',
  },
  btnView: {
    backgroundColor: '#191970',
    width: 80,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    right: 10,
  },
});
