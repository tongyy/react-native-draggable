/**
 *  * https://github.com/tongyy/react-native-draggable
 *
 */
import React from 'react';
import { GestureResponderEvent, PanResponderGestureState } from 'react-native';
export interface IDraggableProps {
    /**** props that should probably be removed in favor of "children" */
    renderText?: string;
    isCircle?: boolean;
    renderSize?: number;
    imageSource?: number;
    renderColor?: string;
    /**** */
    children?: React.ReactNode;
    shouldReverse?: boolean;
    disabled?: boolean;
    debug?: boolean;
    animatedViewProps?: object;
    touchableOpacityProps?: object;
    onDrag?: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onShortPressRelease?: (event: GestureResponderEvent) => void;
    onDragRelease?: (event: GestureResponderEvent, gestureState: PanResponderGestureState, bounds:
        {left: number, top: number, right: number, bottom: number}) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    onPressOut?: (event: GestureResponderEvent) => void;
    onRelease?: (event: GestureResponderEvent, wasDragging: boolean) => void;
    onReverse?: () => {x: number, y: number};
    x?: number;
    y?: number;
    z?: number;
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
}
declare function Draggable(props: IDraggableProps): JSX.Element;
Draggable.defaultProps = {
    renderText: '＋',
    renderSize: 36,
    shouldReverse: false,
    disabled: false,
    debug: false,
    onDrag: () => {},
    onShortPressRelease: () => {},
    onDragRelease: () => {},
    onLongPress: () => {},
    onPressIn: () => {},
    onPressOut: () => {},
    onRelease: () => {},
    x: 0,
    y: 0,
    z: 1,
}
export default Draggable;
