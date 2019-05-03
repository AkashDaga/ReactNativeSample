import React from 'react';
import { Text as RNText } from 'react-native';
import theme from '../../styles/themeStyle';

const Text = props => {
  return (
    <RNText
      {...props}
      onPress={props.onPress}
      style={[styles.normalTextStyle, props.style]}
    >
      {props.children}
    </RNText>
  );
};

const TextBold = props => {
  return (
    <RNText
      {...props}
      onPress={props.onPress}
      style={[styles.boldTextStyle, props.style]}
    >
      {props.children}
    </RNText>
  );
};

const TextBolder = props => {
  return (
    <RNText
      {...props}
      onPress={props.onPress}
      style={[styles.bolderTextStyle, props.style]}
    >
      {props.children}
    </RNText>
  );
};

const ListItemAvtarText = props => {
  return (
    <RNText {...props} style={[styles.listItemAvtarText, props.style]}>
      {props.children}
    </RNText>
  );
};

const textStyle = {
  textStyle: {
    color: theme.DARK_TXT_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM,
    lineHeight: 24,
    marginBottom: 5,
    letterSpacing: 0.5
  }
};

const styles = {
  normalTextStyle: {
    ...textStyle.textStyle,
    fontFamily: 'Avenir-Book'
  },
  boldTextStyle: {
    ...textStyle.textStyle,
    fontFamily: 'Avenir-Book'
  },
  bolderTextStyle: {
    ...textStyle.textStyle,
    fontFamily: 'Avenir-Medium'
  },
  listItemAvtarText: {
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: 'Avenir-Book',
    lineHeight: 24
  }
};

export { Text, TextBold, TextBolder, ListItemAvtarText };
