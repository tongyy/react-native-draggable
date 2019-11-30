# react-native-draggable
[![Build Status](https://travis-ci.org/tongyy/react-native-draggable.svg?branch=master)](https://travis-ci.org/tongyy/react-native-draggable)
[![npm version](https://badge.fury.io/js/react-native-draggable.svg)](https://badge.fury.io/js/react-native-draggable)

[![NPM](https://nodei.co/npm/react-native-draggable.png?compact=true)](https://npmjs.org/package/react-native-draggable)


Draggable item for react-native!

```
npm install react-native-draggable --save
import Draggable from 'react-native-draggable';
```
How to use

```
return (
    <View >
        <Draggable x={75} y={100} renderSize={56} renderColor='black' renderText='A' isCircle shouldReverse onShortPressRelease={()=>alert('touched!!')}/> 
        <Draggable x={200} y={300} renderColor='red' renderText='B'/>
        <Draggable/>
	<Draggable x={50} y={50}>
		<YourComponent/>
	</Draggable>
    </View>
);
```
[Demo](https://github.com/tongyy/react-native-draggable/blob/master/demo/demo.gif)

[![N|Solid](https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo.gif)](https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo.gif)
in my project => <img src="https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo2.png" width="289">

```
return (
    <View style={{backgroundColor: 'blue', flex: 1}} >
        <Draggable 
            imageSource={require('./trump1.png')} 
            renderSize={80} 
            x={200}
            y={300}
            onDragRelease={this._changeFace}
            onLongPress={()=>console.log('long press')}
            onShortPressRelease={()=>console.log('press drag')}
            onPressIn={()=>console.log('in press')}
            onPressOut={()=>console.log('out press')}
        />  
    </View>
);  

```
[Event Demo](https://github.com/tongyy/react-native-draggable/blob/master/demo/demo3.gif) 

![DEMO2](https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo3.gif)

[Version 3 Demo](https://github.com/tongyy/react-native-draggable/blob/master/demo/demo.gif)

![DEMOV3](https://github.com/tongyy/react-native-draggable/blob/master/demo/demo.gif)


# Props spec & Example
## Properties
| Prop | Type | Example | Default | Description |
| :------------ |:---------------:|:---------------:|:---------------:|:-----|
| renderText | string | 'ANY' | '+' | text of draggable |
| isCircle | bool | {true} | --- | render as circle
| renderSize | number | {36} | {36} | draggable size |
| imageSource | source | require('./img/xxx.png') | --- | image source|
| renderColor | string | 'black' | 'yellowgreen' | [Colors](https://facebook.github.io/react-native/docs/colors.html)|
| children | [Component](https://reactjs.org/docs/typechecking-with-proptypes.html#requiring-single-child) | <Text>Sup</Text> | children to render as draggable |
| shouldReverse | bool | {false} | {false} | reverse flag |
| disabled | bool | {false} | {false} | disabled flag |
| x | number |{0}| 0 | initial position x |
| y | number |{0}| 0 | initial position y |
| z | number |{1}| 1 | z-index / elevation |
| minX | number |{0}| --- | min X value for left edge of component |
| minY | number |{0}| --- | min Y value for top edge of component |
| maxX | number |{0}| --- | max X value for right edge of component |
| maxY | number |{0}| --- | max Y value for bottom edge of component |
| z | number |{1}| 1 | z-index / elevation |

## Events
| Event | Type | Arguments| Description |
| :------------ |:---------------:|:---------------:|:-----|
| onShortPressRelease | func | event | onPress event |
| onDragRelease | func | event, position | release drag event |
| onLongPress | func | event | long press event |
| onPressIn | func | event | in press event |
| onPressOut | func | event | out press event |

## Methods (not supported above V2.0.0)
| Method | params | Description |
| :------------ |:---------------:|:-----|
| reversePosition | --- | manually reset Draggable to start position |
| getPosition| --- |**use pressDragRelease callback instead.**  get the value of x, y, offsetX, offsetY|

# What's next?

This Draggable is used to be a Draggable Button in my project. 
Let me know if you have any idea or demand, let's discuss and develop it.
    
    
   
