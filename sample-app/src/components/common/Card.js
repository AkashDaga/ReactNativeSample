import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import theme from '../../styles/themeStyle';

const Card = props => {
  let cardView = (
    <TouchableOpacity
      style={[styles.containerStyle, props.style]}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );

  if (props.isTouchable === false) {
    cardView = (
      <TouchableWithoutFeedback
        style={styles.containerStyle}
        onPress={props.onPress}
      >
        {props.children}
      </TouchableWithoutFeedback>
    );
  }

  return cardView;
};

const CardWithView = props => {
  return (
    <View
      style={[styles.containerStyle, props.containerStyle]}
      onPress={props.onPress}
    >
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: theme.WHITE_COLOR,
    padding: 5,
    marginBottom: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: theme.WHITE_COLOR,
    borderBottomWidth: 0,
    flex: 1,
    elevation: 2,
    shadowOpacity: 0.0015 * 1.5 + 0.18,
    shadowRadius: 0.54 * 1.5,
    shadowOffset: {
      height: 0.6 * 1.5
    }
  }
};

export { Card, CardWithView };
