import React, { Component } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
export default class SwipeableRow extends Component {
  renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });
    return (
      <RectButton style={styles.leftAction} onPress={console.log('Pressed')}>
        <Animated.Text 
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}>
          Swiped!!
        </Animated.Text>
      </RectButton>
    );
  };
  render() {
    return (
      <Swipeable renderLeftActions={this.renderLeftActions}>
        <RectButton style={styles.rectButton}></RectButton>
      </Swipeable>
    );
  }
}
const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: 'cyan',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 55,
  },
  rectButton: {
    width: '100%',
    height: 80,
    backgroundColor: 'blue',
  },
});
