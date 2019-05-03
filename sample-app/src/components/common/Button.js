import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { TextBolder } from './Text';
import { Spinner } from './Spinner';
import theme from '../../styles/themeStyle';

const Button = ({
  onPress,
  children,
  containerStyle,
  textHolderStyle,
  textStyleProp,
  isSubmitting,
  disabled
}) => {
  const buttonColor =
    isSubmitting === true || disabled === true ? '#ddd' : '#0072ff';
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyle,
        containerStyle,
        { backgroundColor: buttonColor, borderColor: buttonColor }
      ]}
      disabled={isSubmitting || disabled}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextBolder style={[textStyle, textHolderStyle, textStyleProp]}>
          {children}
        </TextBolder>
        {isSubmitting === true && (
          <Spinner
            color={'#fff'}
            size={20}
            style={{ flex: 0 }}
            bgColor="transparent"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const ButtonWithImage = props => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[buttonStyle, props.containerStyle]}
    >
      <View style={styles.textAndImageSideBySideStyle}>
        {props.image}
        <TextBolder
          style={[textStyle, props.textHolderStyle, props.textStyleProp]}
        >
          {props.label}
        </TextBolder>
      </View>
    </TouchableOpacity>
  );
};

const MultiLineButton = ({
  onPress,
  children,
  containerStyle,
  textHolderStyle,
  disabled
}) => {
  const { buttonStyle, holderStyle } = styles;
  const buttonColor = disabled === true ? theme.DISABLE : theme.BUTTON_COLOR;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyle, { backgroundColor: buttonColor }, containerStyle]}
    >
      <View style={[holderStyle, textHolderStyle]}>{children}</View>
    </TouchableOpacity>
  );
};

const ButtonFullWidth = ({
  onPress,
  children,
  containerStyle,
  buttonTextStyle,
  isSubmitting,
  disabled
}) => {
  const { buttonStyle, textStyle } = styles;
  const buttonColor =
    isSubmitting === true || disabled === true ? '#ddd' : '#0072ff';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyle,
        containerStyle,
        { backgroundColor: buttonColor, borderColor: buttonColor }
      ]}
      disabled={isSubmitting}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextBolder style={[textStyle, buttonTextStyle]}>{children}</TextBolder>
        {isSubmitting === true && (
          <Spinner
            color={'#fff'}
            size={20}
            style={{ flex: 0 }}
            bgColor="transparent"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: theme.WHITE_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM,
    paddingVertical: 7,
    paddingHorizontal: 10,
    textAlign: 'center',
    marginBottom: 0
  },
  buttonStyle: {
    activeOpacity: 0.5,
    backgroundColor: theme.BUTTON_COLOR,
    borderRadius: 5,
    elevation: 1,
    shadowOpacity: 0.0015 * 1.5 + 0.18,
    shadowRadius: 0.54 * 1.5,
    shadowOffset: {
      height: 0.6 * 1.5
    }
  },
  holderStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  textAndImageSideBySideStyle: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  }
};

export { Button, ButtonFullWidth, MultiLineButton, ButtonWithImage };
