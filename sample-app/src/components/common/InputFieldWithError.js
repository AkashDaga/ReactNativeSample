import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { TextBolder } from './Text';
import theme from '../../styles/themeStyle';

class InputWithErrorBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: this.props.isValid,
      errorMessage: this.props.errorMessage
    };
  }
  setError(errorMessage, isValid) {
    this.setState({
      isValid,
      errorMessage
    });
  }
  render() {
    const {
      label,
      value,
      onChangeText,
      onFocus,
      onBlur,
      placeholder,
      secureTextEntry,
      editable,
      keyboardType,
      maxLength,
      multiline,
      autoCapitalize,
      numberOfLines,
      refName,
      validation
    } = this.props;
    const isValid = this.state.isValid;
    const errorMessage = this.state.errorMessage;
    const {
      inputStyle,
      labelStyle,
      containerStyle,
      errorInputStyle,
      errorLabelStyle
    } = styles;
    let errorLabel = <View />;
    if (!isValid) {
      errorLabel = (
        <TextBolder style={[errorLabelStyle, this.props.errorStyle]}>
          {errorMessage}
        </TextBolder>
      );
    }

    const textInputStyle = !isValid ? errorInputStyle : {};
    const textAreaStyle = multiline
      ? { minHeight: 100, textAlignVertical: 'top' }
      : {};
    return (
      <React.Fragment>
        <View style={[containerStyle, this.props.style]}>
          {label && <TextBolder style={labelStyle}>{label}</TextBolder>}
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            style={[
              inputStyle,
              textInputStyle,
              textAreaStyle,
              this.props.textInputStyle
            ]}
            errorMessage={this.props.errorMessage}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={editable}
            keyboardType={keyboardType}
            maxLength={maxLength}
            underlineColorAndroid="transparent"
            multiline={multiline}
            autoCapitalize={autoCapitalize}
            numberOfLines={numberOfLines}
            ref={refName}
            isValid={isValid}
            validation={validation}
            setError={this.setError.bind(this)}
            placeholderTextColor="#999"
            editable={this.props.editable}
          />
          {this.props.errorPosition === 'absolute' &&
            !isValid && (
              <TextBolder style={[errorLabelStyle, { marginBottom: 10 }]} />
            )}
        </View>
        {errorLabel}
      </React.Fragment>
    );
  }
}

const styles = {
  inputStyle: {
    color: theme.DARK_TXT_COLOR,
    fontSize: 14,
    padding: theme.INPUT_PADDING,
    borderColor: theme.BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.BORDER_RADIUS,
    backgroundColor: theme.WHITE_COLOR,
    letterSpacing: 0.5
  },
  labelStyle: {
    fontSize: 14,
    marginTop: 10,
    letterSpacing: 0.5
  },
  errorInputStyle: {
    color: theme.DARK_TXT_COLOR,
    fontSize: 14,
    padding: theme.INPUT_PADDING,
    borderColor: theme.ERROR_BORDER_COLOR,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: theme.BORDER_RADIUS,
    backgroundColor: theme.WHITE_COLOR
  },
  errorLabelStyle: {
    marginTop: 5,
    color: theme.ERROR_TEXT_COLOR,
    fontSize: theme.FONT_SIZE_MEDIUM
  }
};

export { InputWithErrorBlock };
