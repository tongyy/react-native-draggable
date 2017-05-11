/**
 *  * https://github.com/tongyy/react-native-draggable
 * 
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	PanResponder,
	Animated,
	Dimensions,
	Button,
	TouchableOpacity
} from 'react-native';


export default class Draggable extends Component {
	static propTypes = {
		pressDrag: React.PropTypes.func.isRequired,
	};
	constructor(props) {
		super(props);
		const { pressDrag } = props;
		this.pressDrag = pressDrag;
		console.log(props);
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

	render() {
		return (
			<View style={styles.draggableContainer}>
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[this.state.pan.getLayout(), styles.circle]}>
					<TouchableOpacity 
						style={styles.circle}
						onPress={this.pressDrag}>
						<Text style={styles.text}>+</Text>
					</TouchableOpacity>
				</Animated.View>
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
		top         : Window.height/2 - CIRCLE_RADIUS+100,
		left        : Window.width/2 - CIRCLE_RADIUS+100,
	},
	circle      : {
		backgroundColor     : '#1abc9c',
		width               : CIRCLE_RADIUS*2,
		height              : CIRCLE_RADIUS*2,
		borderRadius        : CIRCLE_RADIUS
	}
});


