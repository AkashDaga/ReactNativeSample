import React from 'react';
import { View, Text } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import theme from '../../styles/themeStyle';

const Spinner = ({ style, color, size, bgColor }) => {
  const spinnerColor = color || theme.SECONDARY_COLOR;
  const spinnerSize = size || 30;
  const backgroundColor = bgColor || theme.TRANSPARENT;
  return (
    <View style={[styles.containerStyle, style, { backgroundColor }]}>
      <BallIndicator color={spinnerColor} size={spinnerSize} />
    </View>
  );
};

const SpinnerWithLabel = ({ label, style }) => {
  return (
    <View style={[styles.containerStyle, style]}>
      <BallIndicator
        color={theme.SECONDARY_COLOR}
        size={30}
        style={{ flex: 0 }}
      />
      <Text style={{ alignSelf: 'center', marginTop: 10, color: '#666' }}>
        {label}
      </Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: theme.TRANSPARENT,
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export { Spinner, SpinnerWithLabel };
