/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Draggable from 'react-native-draggable';

export default class DraggableDemo extends Component {
	render() {
		return (
			<View >
				<Draggable/>
				<Draggable reverse={false} renderColor='red' offsetX={0} offsetY={0} renderText='B'/>
				<Draggable renderSize={56} renderColor='black' offsetX={-100} offsetY={-200} renderText='A' pressDrag={()=>alert('touched!!')}/> 
			</View>
		);
	}
}

AppRegistry.registerComponent('DraggableDemo', () => DraggableDemo);
