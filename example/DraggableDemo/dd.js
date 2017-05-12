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
	TouchableOpacity
} from 'react-native';


export default class Draggable extends Component {
	static propTypes = {
		renderText:React.PropTypes.string,
		renderShape:React.PropTypes.string,
		renderSize:React.PropTypes.number,
		offsetX:React.PropTypes.number,
		offsetY:React.PropTypes.number,
		renderCorlor:React.PropTypes.string,
		reverse:React.PropTypes.boolean,
		pressDrag:React.PropTypes.func
	};
	constructor(props) {
		super(props);
		const { pressDrag, renderText, renderShape renderSize, renderColor, offsetX, offsetY, reverse} = props;
		console.log(props);
		this.pressDrag = pressDrag;
		this.renderShape = renderShape ? renderShape : 'circle';
		this.renderColor = renderColor ? renderColor : 'yellowgreen';
		this.renderText = renderText ? renderText : '＋';
		this.renderSize = renderSize ? renderSize : 36;
		this.offsetX = offsetX!=null ? offsetX : 100;
		this.offsetY = offsetY!=null ? offsetY : 100;
		this.reverse = reverse==true ? reverse : false;
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
	_positionCss = (size,x,y)=>{
		console.log(x,y);
		let Window = Dimensions.get('window');
		return {
			zIndex:999,
			position: 'absolute',
			top: Window.height/2 - size+y,
			left: Window.width/2 - size+x,

		};
	}
	_dragItemCss = (size,color,shape)=>{
		if(shape == 'circle'){
			return{
				backgroundColor: color,
				width: size*2,
				height: size*2,
				borderRadius: size 
			};
		}else if(shape == 'square'){
			return{
				backgroundColor: color,
				width: size*2,
				height: size*2,
				borderRadius: 0 
			}
		}
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
			<View style={this._positionCss(this.renderSize,this.offsetX,this.offsetY)}>
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[this.state.pan.getLayout(), this._dragItemCss(this.renderSize)]}>
					<TouchableOpacity 
						style={this._dragItemCss(this.renderSize, this.renderColor)}
						onPress={this.pressDrag}>
					<Text style={this._dragItemTextCss(this.renderSize)}>{this.renderText}</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}


