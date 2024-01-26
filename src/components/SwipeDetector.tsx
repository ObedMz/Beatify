import React, { useRef } from 'react';
import { View, PanResponder, PanResponderGestureState } from 'react-native';

interface SwipeDetectorProps {
  onLeft?: () => void;
  onRight?: () => void;
  onUp?: () => void;
  onDown?: () => void;
  children: React.ReactNode;
}

const SwipeDetector: React.FC<SwipeDetectorProps> = ({
  onLeft,
  onRight,
  onUp,
  onDown,
  children,
}: SwipeDetectorProps) => {
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        const { dx, dy } = gestureState;

        if (Math.abs(dx) > Math.abs(dy)) {
          if (dx > 0) {
            onRight && onRight();
          } else {
            onLeft && onLeft();
          }
        } else {
          if (dy > 0) {
            onDown && onDown();
          } else {
            onUp && onUp();
          }
        }
      },
    })
  ).current;

  return (
    <View {...panResponder.panHandlers}>
      <View pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
};


export default SwipeDetector;
