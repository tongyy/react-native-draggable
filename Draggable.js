/**
 *	* https://github.com/tongyy/react-native-draggable
 *
 */

import React from 'react';
import {
  Platform,
  View,
  Text,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default function Draggable(props) {
  const {
    renderText,
    renderShape,
    children,
    renderSize,
    imageSource,
    offsetX,
    offsetY,
    renderColor,
    reverse,
    pressDrag,
    onMove,
    pressDragRelease,
    longPressDrag,
    pressInDrag,
    pressOutDrag,
    z,
    x,
    y,
  } = props;

  const pan = React.useRef(new Animated.ValueXY()).current;
  const value = React.useRef({x: 0, y: 0});

  const onPanResponderMove = Animated.event([null, {dx: pan.x, dy: pan.y}], {
    listener: onMove,
  });

  const reversePosition = React.useCallback(() => {
    Animated.spring(pan, {toValue: {x: 0, y: 0}}).start();
  }, [pan]);

  const onPanResponderRelease = React.useCallback(
    (e, gestureState) => {
      if (pressDragRelease) {
        pressDragRelease(e, gestureState);
      }
      if (!reverse) {
        pan.flattenOffset();
      } else {
        reversePosition();
      }
    },
    [pan, pressDragRelease, reverse, reversePosition],
  );

  const onPanResponderGrant = React.useCallback(
    (e, gestureState) => {
      if (!reverse) {
        pan.setOffset(value.current);
        pan.setValue({x: 0, y: 0});
      }
    },
    [pan, reverse],
  );

  const panResponder = React.useMemo(() => {
    let isDragging = gestureState =>
      Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        isDragging(gestureState),
      onMoveShouldSetPanResponderCapture: (_, gestureState) =>
        isDragging(gestureState),
      onPanResponderGrant,
      onPanResponderMove,
      onPanResponderRelease,
    });
  }, [onPanResponderGrant, onPanResponderMove, onPanResponderRelease]);

  React.useEffect(() => {
    if (!reverse) {
      pan.addListener(c => (value.current = c));
    }
    return () => {
      pan.removeAllListeners();
    };
  }, [pan, reverse]);

  const positionCss = React.useCallback(() => {
    const Window = Dimensions.get('window');
    return Platform.select({
      ios: {
        zIndex: z || 999,
        position: 'absolute',
        top: y || Window.height / 2 - renderSize + offsetY,
        left: x || Window.width / 2 - renderSize + offsetX,
      },
      android: {
        position: 'absolute',
        width: Window.width,
        height: Window.height,
        top: y || Window.height / 2 - renderSize + offsetY,
        left: x || Window.width / 2 - renderSize + offsetX,
      },
    });
  }, [offsetX, offsetY, renderSize, x, y, z]);

  const dragItemCss = React.useCallback(() => {
    if (renderShape === 'circle') {
      return {
        backgroundColor: renderColor,
        width: renderSize * 2,
        height: renderSize * 2,
        borderRadius: renderSize,
      };
    } else if (renderShape === 'square') {
      return {
        backgroundColor: renderColor,
        width: renderSize * 2,
        height: renderSize * 2,
        borderRadius: 0,
      };
    } else if (renderShape === 'image') {
      return {
        width: renderSize,
        height: renderSize,
      };
    }
  }, [renderColor, renderShape, renderSize]);

  const dragItemTextCss = React.useMemo(() => {
    return {
      marginTop: renderSize - 10,
      marginLeft: 5,
      marginRight: 5,
      textAlign: 'center',
      color: '#fff',
    };
  }, [renderSize]);

  const touchableContent = React.useMemo(() => {
    if (children) {
      return children;
    } else if (renderShape === 'image') {
      return <Image style={dragItemCss()} source={imageSource} />;
    } else {
      return <Text style={dragItemTextCss}>{renderText}</Text>;
    }
  }, [
    children,
    dragItemCss,
    dragItemTextCss,
    imageSource,
    renderShape,
    renderText,
  ]);

  return (
    <View style={positionCss()}>
      <Animated.View {...panResponder.panHandlers} style={[pan.getLayout()]}>
        <TouchableOpacity
          style={dragItemCss()}
          onPress={pressDrag}
          onLongPress={longPressDrag}
          onPressIn={pressInDrag}
          onPressOut={pressOutDrag}>
          {touchableContent}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

/***** Default props and types */

Draggable.defaultProps = {
  offsetX: 100,
  renderShape: 'circle',
  renderColor: 'yellowgreen',
  renderText: '＋',
  renderSize: 36,
  offsetY: 100,
  reverse: true,
};

Draggable.propTypes = {
  renderText: PropTypes.string,
  renderShape: PropTypes.string,
  children: PropTypes.any,
  renderSize: PropTypes.number,
  imageSource: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
    }),
    PropTypes.number,
  ]),
  offsetX: PropTypes.number,
  offsetY: PropTypes.number,
  renderColor: PropTypes.string,
  reverse: PropTypes.bool,
  pressDrag: PropTypes.func,
  onMove: PropTypes.func,
  pressDragRelease: PropTypes.func,
  longPressDrag: PropTypes.func,
  pressInDrag: PropTypes.func,
  pressOutDrag: PropTypes.func,
  z: PropTypes.number,
  x: PropTypes.number,
  y: PropTypes.number,
};
