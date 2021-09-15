import AsyncStorage from '@react-native-community/async-storage';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export const HomeStackScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerText}> What do you mean</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191970',
    paddingHorizontal: 30,
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    paddingTop: 30,
    alignItems: 'center',
    fontSize: 30,
    color: 'white',
    fontFamily: 'BMJUA',
  },
  welcomingTxt: {
    marginTop: 20,
    fontFamily: 'BMJUA',
    fontSize: 21,
    color: 'white',
  },
  bodyContainer: {
    backgroundColor: '#191970',
    paddingHorizontal: 20,
    marginVertical: 30,
    flex: 1,
    width: 300,
  },
  textInput: {
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 60,
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 3,
    color: 'white',
    fontSize: 19,
  },
});
