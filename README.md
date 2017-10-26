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
        <Draggable renderSize={56} renderColor='black' offsetX={-100} offsetY={-200} renderText='A' pressDrag={()=>alert('touched!!')}/> 
        <Draggable reverse={false} renderColor='red' renderShape='square' offsetX={0} offsetY={0} renderText='B'/>
        <Draggable/>
    </View>
);
```
[Demo](https://github.com/tongyy/react-native-draggable/blob/master/demo/demo.gif)

[![N|Solid](https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo.gif)](https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo.gif)
in my project => <img src="https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo2.png" width="289">

```
return (
    <View style={{backgroundColor: 'blue', flex: 0.5}} >
        <Draggable renderShape='image' imageSource={this.state.source} renderSize={80} 
            offsetX={0} offsetY={0}
            pressDragRelease={this._changeFace}
            longPressDrag={()=>console.log('long press')}
            pressDrag={()=>console.log('press drag')}
            pressInDrag={()=>console.log('in press')}
            pressOutDrag={()=>console.log('out press')}
        />  
    </View>
);  

```
[Event Demo](https://github.com/tongyy/react-native-draggable/blob/master/demo/demo3.gif) 

![DEMO2](https://raw.githubusercontent.com/tongyy/react-native-draggable/master/demo/demo3.gif)


# Props spec & Example
## Shape & Location
* renderText:React.PropTypes.string => text of draggable item {'ABC'}
* renderShape:React.PropTypes.string => shape type, 'circle' 'square' 'image'
* imageSource:React.PropTypes.source => require('./img/xxx.png')
* renderSize:React.PropTypes.number =>draggable size {36} 
* offsetX:React.PropTypes.number => offsetX with center {0}
* offsetY:React.PropTypes.number => offsetY with center {100}
* renderCorlor:React.PropTypes.string => [Colors](https://facebook.github.io/react-native/docs/colors.html)
* reverse:React.PropTypes.bool => reverse to initial position {true}
## Event
* pressDrag:React.PropTypes.func => onPress event
* pressDragRelease:React.PropTypes.func,=> release drag event
* longPressDrag:React.PropTypes.func,=> long press event
* pressInDrag:React.PropTypes.func,=> in press event
* pressOutDrag:React.PropTypes.func=> out press event

# What's next?

This Draggable is used to be a Draggable Button in my project. 
Let me know if you have any idea or demand, let's discuss and develop it.
    
    
   
