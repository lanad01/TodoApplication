import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, BackHandler } from 'react-native';
import ProfileEdit from './profileEdit';
import { Profile } from './profilescreen';
import { ResetPwd } from './resetPwd';
import { useNavigation } from '@react-navigation/native';

export const ProfileRoot = () => {
  const ProfileStack = createStackNavigator();
  const navigation=useNavigation()
  return (
    <ProfileStack.Navigator initialRouteName="ProfileMain">
      <ProfileStack.Screen
        name="ProfileMain"
        component={Profile}
        options={{headerShown: false,}}
      />
      <ProfileStack.Screen
        name="ProfileEdit"
        component={ProfileEdit}
        options={{headerShown: false,}}
      />
      <ProfileStack.Screen
        name="resetPwd"
        component={ResetPwd}
        options={{headerShown: false,}}
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
