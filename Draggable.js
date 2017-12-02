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
		renderColor:React.PropTypes.string,
		reverse:React.PropTypes.bool,
		pressDrag:React.PropTypes.func,
		pressDragRelease:React.PropTypes.func,
		longPressDrag:React.PropTypes.func,
		pressInDrag:React.PropTypes.func,
		pressOutDrag:React.PropTypes.func,
		z:React.PropTypes.number,
		x:React.PropTypes.number,
		y:React.PropTypes.number
		
	};
	static defaultProps = {
		offsetX : 100,
		renderShape : 'circle',
		renderColor : 'yellowgreen',
		renderText : '＋',
		renderSize : 36,
		offsetY : 100,
		reverse : true
	}

	componentWillMount() {
		if(this.props.reverse == false)
			this.state.pan.addListener((c) => this.state._value = c);
	}
	componentWillUnmount() {
		this.state.pan.removeAllListeners();
	}
	constructor(props, defaultProps) {
		super(props, defaultProps);
		const { pressDragRelease, reverse } = props;
		this.state = {
			pan:new Animated.ValueXY(), 
			_value:{x: 0, y: 0}
		};

		this.panResponder = PanResponder.create({    
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: (e, gestureState) => {
				if(reverse == false) {
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
				if(reverse == false)
					this.state.pan.flattenOffset();
				else 
					this.reversePosition();
			} 
		});
	}
	
	_positionCss = () => {
		let Window = Dimensions.get('window');
		const { renderSize, offsetX, offsetY, x, y, z } = this.props;
		return {
			zIndex: z != null ? z : 999,
			position: 'absolute',
			top: y != null ? y : (Window.height / 2 - renderSize + offsetY),
			left: x !=null ? x : (Window.width / 2 - renderSize + offsetX)

		};
	}

	_dragItemCss = () => {
		const { renderShape, renderSize, renderColor } = this.props;
		if(renderShape == 'circle') {
			return{
				backgroundColor: renderColor,
				width: renderSize * 2,
				height: renderSize * 2,
				borderRadius: renderSize 
			};
		}else if(renderShape == 'square') {
			return{
				backgroundColor: renderColor,
				width: renderSize * 2,
				height: renderSize * 2,
				borderRadius: 0 
			};
		}else if(renderShape == 'image') {
			return{
				width: renderSize,
				height: renderSize 
			};
		}
	}
	_dragItemTextCss = () => {
		const { renderSize } = this.props;
		return {
			marginTop: renderSize-10,
			marginLeft: 5,
			marginRight: 5,
			textAlign: 'center',
			color: '#fff'
		};
	}
	_getTextOrImage = () => {
		const { renderSize, renderShape, renderText, imageSource } = this.props;
		if(renderShape == 'image') {
			return(<Image style={this._dragItemCss(renderSize, null, 'image')} source={imageSource}/>);
		}else{
			return (<Text style={this._dragItemTextCss(renderSize)}>{renderText}</Text>);
		}

	}

	reversePosition = () => {
		Animated.spring(            
			this.state.pan,         
			{toValue:{x:0,y:0}}     
		).start();
	}

	render() {
		const touchableContent = this._getTextOrImage();
		const { pressDrag, longPressDrag, pressInDrag, pressOutDrag } = this.props;

		return (
			<View style={this._positionCss()}>
				<Animated.View 
					{...this.panResponder.panHandlers}
					style={[this.state.pan.getLayout()]}>
					<TouchableOpacity 
						style={this._dragItemCss()}
						onPress={pressDrag}
						onLongPress={longPressDrag}
						onPressIn={pressInDrag}
						onPressOut={pressOutDrag}
					>
						{touchableContent}	
					</TouchableOpacity>
				</Animated.View>
			</View>
		);
	}
}


