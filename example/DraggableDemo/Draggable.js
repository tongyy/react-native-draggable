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
		renderText:React.PropTypes.string,
		renderShape:React.PropTypes.string,
		renderSize:React.PropTypes.number,
		pressDrag: React.PropTypes.func,
	};
	constructor(props) {
		super(props);
		const { pressDrag, renderText, renderSize } = props;
		this.pressDrag = pressDrag;
		this.renderText = renderText ? renderText : '+';
		this.renderSize = renderSize ? renderSize : 36;
		this.state = {
			pan:new Animated.ValueXY()   
		};

		this.panResponder = PanResponder.create({    
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderMove: Animated.event([null,{ 
				dx:this.state.pan.x,
				dy:this.state.pan.y
			}]),
			onPanResponderRelease: (e, gesture) => {
				Animated.spring(            
					this.state.pan,         
					{toValue:{x:0,y:0}}     
				).start();
			} 
		});
	}
	_positionCss = (size)=>{
		let Window = Dimensions.get('window');
		return {
			zIndex:999,
			position: 'absolute',
			top: Window.height/2 - size+100,
			left: Window.width/2 - size+100,
		};
	}
	_dragItemCss = (size)=>{
		return{
			backgroundColor: '#1abc9c',
			width: size*2,
			height: size*2,
			borderRadius: size 
		};
	}
	_dragItemTextCss = (size)=>{
		return {
			marginTop   : size-10,
			marginLeft  : 5,
			marginRight : 5,
			textAlign   : 'center',
			color       : '#fff'
		};
	}
	render() {
		return (
			<View style={this._positionCss(this.renderSize)}>
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[this.state.pan.getLayout(), this._dragItemCss(this.renderSize)]}>
					<TouchableOpacity 
						style={this._dragItemCss(this.renderSize)}
						onPress={this.pressDrag}>
					<Text style={this._dragItemTextCss(this.renderSize)}>{this.renderText}</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}


