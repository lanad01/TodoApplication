import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

class App extends Component {
  pan = new Animated.ValueXY();
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) =>{
    return !(gestureState.dx === 0 && gestureState.dy === 0)
    } ,
    onPanResponderGrant: () => {
      this.pan.setOffset({
        x: this.pan.x._value,
        y: this.pan.y._value
      });
    },
    onPanResponderMove: Animated.event([
      null,
      { dx: this.pan.x, dy: this.pan.y }
    ]),
    onPanResponderRelease: () => {
      this.pan.flattenOffset();
    }

  });
  
  render() {
    const test1 = () => {
      console.log("Test Succes?")
    }
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Drag this box!</Text>
        
        <Animated.View
          style={{
            transform: [{ translateX: this.pan.x }, { translateY: this.pan.y }]
          }}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.box}>
        <TouchableOpacity onPress={()=>{alert('d')}}>
            <View style={{width:100,height:100,backgroundColor:'yellow'}}/>
          </TouchableOpacity>
            </View>
          {/* <TouchableOpacity onPress={test1} style={{width:150, backgroundColor:'yellow', height:100}}>
          
          </TouchableOpacity> */}

        </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});

export default App;