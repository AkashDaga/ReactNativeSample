import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import RNRestart from 'react-native-restart';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { TextBold, Button } from './components/common';
import theme from './styles/themeStyle';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.log('componentDidCatch in ErrorBoundary.js', error, info);
    this.setState({ hasError: true });
    const errorMessage = `ERROR MESSAGE:  ${error.toString()} \n ERROR_STACKTARCE:  ${info.toString()}`;
    console.log(errorMessage);
  }

  doRestartApp = () => {
    RNRestart.Restart();
  }
  
  render() {
    let view = this.props.children;
    if (this.state.hasError) {
      view = (<View style={styles.container}>
        <SimpleLineIcons name="exclamation" color={theme.LIGHT_TXT_COLOR} size={50} />
        <TextBold style={{ marginTop: 10 }}>
          oops! something went wrong
        </TextBold>
        <Button
          containerStyle={{ marginTop: 20 }}
          onPress={() => {
            this.doRestartApp();
          }}
        >
          OK
        </Button>
      </View>);
    }
    return view;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR
  }
});
