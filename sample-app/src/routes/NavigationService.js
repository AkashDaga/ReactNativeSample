import {
  NavigationActions,
  StackActions,
  DrawerActions
} from 'react-navigation';

import isUndefined from '../utility/validation';

class NavigationService {
  static navigationServiceInstance = null;
  static navigator;

  static getInstance() {
    if (NavigationService.navigationServiceInstance == null) {
      NavigationService.navigationServiceInstance = new NavigationService();
    }
    return this.navigationServiceInstance;
  }

  setTopLevelNavigator(navigatorRef) {
    if (!isUndefined(navigatorRef)) this.navigator = navigatorRef;
  }

  navigate(routeName, params) {
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params
      })
    );
  }

  goBack(routeName, params) {
    this.navigator.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName,
            params
          })
        ]
      })
    );
  }

  replace(routeName, params) {
    this.navigator.dispatch(
      StackActions.replace({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName,
            params
          })
        ]
      })
    );
  }

  pop() {
    this.navigator.dispatch(StackActions.pop());
  }

  popToTop() {
    this.navigator.dispatch(StackActions.popToTop());
  }

  closeDrawer() {
    this.navigator.dispatch(DrawerActions.closeDrawer());
  }
}

// add other navigation functions that you need and export them

const navigationService = NavigationService.getInstance();

export default navigationService;
