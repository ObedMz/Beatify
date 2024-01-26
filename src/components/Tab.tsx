import React, { useRef, useEffect } from 'react';
import { TouchableWithoutFeedback, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

interface TabProps {
  [key: string]: any; // Permitir cualquier tipo de prop
}

const defaultColor = {
  background: '#2C2C41',
  text: 'white',
};

const Tab: React.FC<TabProps> = ({
  label,
  accessibilityState = { selected: false },
  onPress,
  focusedIcon,
  unfocusedIcon
}: TabProps) => {
  const focused = accessibilityState.selected;
  const widthAnimation = useRef(new Animated.Value(focused ? 120 : 50)).current;

  const handlePress = () => {
    if (onPress !== undefined) {
      onPress();
    }
  };

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: focused ? 100 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View
        style={[
          {
            position: 'relative',
            zIndex: 10,
            overflow: 'hidden',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'flex-start',
            borderRadius: 100,
            margin: 10,
            padding: 8,
            backgroundColor: focused ? defaultColor.background : 'transparent',
            height: 40,
            width: widthAnimation,
          }
        ]}
      >
        <Ionicons name={focused ? focusedIcon : unfocusedIcon} size={24} color={focused ? "white" : "#697689"} />
        <Text style={[{ left: 32, position: 'absolute', color: defaultColor.text, marginLeft: 5, opacity: focused ? 1: 0 }]}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Tab;
