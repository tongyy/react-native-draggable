/**
 *  * https://github.com/tongyy/react-native-draggable
 *
 */
import React from 'react';
import { GestureResponderEvent, PanResponderGestureState } from 'react-native';
interface IProps {
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
    onDrag?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onShortPressRelease?: (event: GestureResponderEvent) => void;
    onDragRelease?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    onPressOut?: (event: GestureResponderEvent) => void;
    onRelease?: (event: GestureResponderEvent, wasDragging: boolean) => void;
    x?: number;
    y?: number;
    z?: number;
    minX?: number;
    minY?: number;
    maxX?: number;
    maxY?: number;
}
declare function Draggable(props: IProps): JSX.Element;
declare namespace Draggable {
    var defaultProps: {
        renderText: string;
        renderSize: number;
        shouldReverse: boolean;
        disabled: boolean;
        debug: boolean;
        onDrag: () => void;
        onShortPressRelease: () => void;
        onDragRelease: () => void;
        onLongPress: () => void;
        onPressIn: () => void;
        onPressOut: () => void;
        onRelease: () => void;
        x: number;
        y: number;
        z: number;
    };
}
export default Draggable;
