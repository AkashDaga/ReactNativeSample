import React, { Component } from 'react';
import { View, NativeModules } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import AppNavigator from '../src/routes/AppNavigator';
import NavigationService from './routes/NavigationService';
import theme from './styles/themeStyle';
import ErrorBoundary from './ErrorBoundary';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  async componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    console.disableYellowBox = true;
    NativeModules.ExceptionsManager = null;
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.SECONDARY_COLOR }}
        forceInset={{ bottom: 'never' }}
      >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <ErrorBoundary>
            <AppNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          </ErrorBoundary>
        </View>
      </SafeAreaView>
    );
  }
}
