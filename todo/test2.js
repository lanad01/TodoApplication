import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SwipeableRow from './test';
// create a component
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SwipeableRow></SwipeableRow>
      </View>
    );
  }
}
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
//make this component available to the app
export default App;
