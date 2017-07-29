/**
 *  * https://github.com/tongyy/react-native-draggable
 * 
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
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
		imageSource:React.PropTypes.number,
		offsetX:React.PropTypes.number,
		offsetY:React.PropTypes.number,
		renderCorlor:React.PropTypes.string,
		reverse:React.PropTypes.bool,
		pressDrag:React.PropTypes.func,
		pressDragRelease:React.PropTypes.func,
		longPressDrag:React.PropTypes.func,
		pressInDrag:React.PropTypes.func,
		pressOutDrag:React.PropTypes.func
	};
	componentWillMount() {
		if(this.reverse == false)
			this.state.pan.addListener((c) => this.state._value = c);
	}
	componentWillUnmount() {
		this.state.pan.removeAllListeners();
	}
	constructor(props) {
		super(props);
		const { pressDrag, pressDragRelease, longPressDrag, pressInDrag, pressOutDrag, imageSource,
			renderText, renderShape, renderSize, renderColor, offsetX, offsetY, reverse} = props;
		this.pressDrag = pressDrag;
		this.pressInDrag = pressInDrag;
		this.pressOutDrag = pressOutDrag;
		this.longPressDrag = longPressDrag;
		this.renderShape = renderShape ? renderShape : 'circle';
		this.renderColor = renderColor ? renderColor : 'yellowgreen';
		this.renderText = renderText ? renderText : '＋';
		this.renderSize = renderSize ? renderSize : 36;
		this.imageSource = imageSource;
		this.offsetX = offsetX!=null ? offsetX : 100;
		this.offsetY = offsetY!=null ? offsetY : 100;
		this.reverse = reverse!=null ? reverse : true;
		this.state = {
			pan:new Animated.ValueXY(), 
			_value:{x: 0, y: 0}
		};

		this.panResponder = PanResponder.create({    
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (e, gestureState) => {
				if(this.reverse == false) {
					this.state.pan.setOffset({x: this.state._value.x, y: this.state._value.y});
					this.state.pan.setValue({x: 0, y: 0});
				}
			},
			onPanResponderMove: Animated.event([null,{ 
				dx:this.state.pan.x,
				dy:this.state.pan.y
			}]),
			onPanResponderRelease: (e, gestureState) => {
				if(pressDragRelease)
					pressDragRelease();
				if(this.reverse == false)
					this.state.pan.flattenOffset();
				else {
					Animated.spring(            
						this.state.pan,         
						{toValue:{x:0,y:0}}     
					).start();
				}
			} 
		});
	}
	_positionCss = (size,x,y)=>{
		let Window = Dimensions.get('window');
		return {
			zIndex:999,
			position: 'absolute',
			top: Window.height/2 - size+y,
			left: Window.width/2 - size+x,

		};
	}
	_dragItemCss = (size,color,shape)=>{
		if(shape == 'circle') {
			return{
				backgroundColor: color,
				width: size*2,
				height: size*2,
				borderRadius: size 
			};
		}else if(shape == 'square') {
			return{
				backgroundColor: color,
				width: size*2,
				height: size*2,
				borderRadius: 0 
			};
		}else if(shape == 'image') {
			return{
				width: size,
				height: size
			};
		}
	}
	_dragItemTextCss = (size)=>{
		return {
			marginTop: size-10,
			marginLeft: 5,
			marginRight: 5,
			textAlign: 'center',
			color: '#fff'
		};
	}
	_getTextOrImage = () =>{
		if(this.renderShape == 'image') {
			this.imageSource = this.props.imageSource;
			return(<Image style={this._dragItemCss(this.renderSize,null,'image')} source={this.imageSource}/>);
		}else{
			return (<Text style={this._dragItemTextCss(this.renderSize)}>{this.renderText}</Text>);
		}

	}

	render() {
		const touchableContent = this._getTextOrImage();
		return (
			<View style={this._positionCss(this.renderSize,this.offsetX,this.offsetY)}>
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[this.state.pan.getLayout(), this._dragItemCss(this.renderSize)]}>
					<TouchableOpacity 
						style={this._dragItemCss(this.renderSize,this.renderColor,this.renderShape)}
						onPress={this.pressDrag}
						onLongPress={this.longPressDrag}
						onPressIn={this.pressInDrag}
						onPressOut={this.pressOutDrag}
					>
						{touchableContent}	
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}


