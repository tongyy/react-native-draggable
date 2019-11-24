/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View} from 'react-native';
import Draggable from '../Draggable'; // first, run "npm run source" to get Draggable.js
import ChildComponent from './ChildComponent';

export default function App() {
  const [source, setSource] = React.useState(require('../img/trump1.png'));

  const changeFace = () => {
    console.log('drag release');
    setSource(require('../img/trump2.png'));
  };

  return (
    <View>
      <Draggable x={0} y={0} />
      <Draggable x={50} y={0} reverse={false}>
        <ChildComponent />
      </Draggable>
      <Draggable
        reverse={false}
        renderShape="square"
        renderColor="red"
        x={111}
        y={222}
        renderText="B"
      />
      <Draggable
        renderSize={56}
        renderColor="black"
        offsetX={-100}
        offsetY={-200}
        renderText="A"
        pressDrag={() => alert('touched!!')}
      />
      <Draggable
        renderShape="image"
        imageSource={source}
        renderSize={80}
        offsetY={0}
        pressDragRelease={changeFace}
        longPressDrag={() => console.log('long press')}
        pressDrag={() => console.log('press drag')}
        pressInDrag={() => console.log('in press')}
        pressOutDrag={() => console.log('out press')}
      />
    </View>
  );
}
