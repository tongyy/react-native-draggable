/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
	StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  Button,
  TouchableOpacity
} from 'react-native';


export default class DragAndDrop extends Component {
	constructor(props){
    super(props);

    this.state = {
      pan     : new Animated.ValueXY()   
    };

    this.panResponder = PanResponder.create({    
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
    	onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove           : Animated.event([null,{ 
          dx : this.state.pan.x,
          dy : this.state.pan.y
      }]),
      onPanResponderRelease        : (e, gesture) => {
      	Animated.spring(            
          this.state.pan,         
          {toValue:{x:0,y:0}}     
      	).start();
      } 
    });
	}
	renderDraggable(){
    return (
      <View style={styles.draggableContainer}>
        <Animated.View 
          {...this.panResponder.panHandlers}
          style={[this.state.pan.getLayout(), styles.circle]}>
          <TouchableOpacity 
          	style={styles.circle}
          	onPress={()=> alert('123')}>
          </TouchableOpacity>
          
        </Animated.View>
      </View>
    );
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.dropZone}>
            <Text style={styles.text}>Drop me here!</Text>
        </View>

        {this.renderDraggable()}
      </View>
    );
  }
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex    : 1
    },
    dropZone    : {
        height         : 100,
        backgroundColor:'#2c3e50'
    },
    text        : {
        marginTop   : 25,
        marginLeft  : 5,
        marginRight : 5,
        textAlign   : 'center',
        color       : '#fff'
    },
    draggableContainer: {
        position    : 'absolute',
        top         : Window.height/2 - CIRCLE_RADIUS,
        left        : Window.width/2 - CIRCLE_RADIUS,
    },
    circle      : {
        backgroundColor     : '#1abc9c',
        width               : CIRCLE_RADIUS*2,
        height              : CIRCLE_RADIUS*2,
        borderRadius        : CIRCLE_RADIUS
    }
});

AppRegistry.registerComponent('DragAndDrop', () => DragAndDrop);
