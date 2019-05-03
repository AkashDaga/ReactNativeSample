import { createStackNavigator } from 'react-navigation';
import {
  navigationOptionWithBack,
  navigationForDrawer
} from '../configs/routes.config';
import DashboardNavigationDrawer from '../screens/DashboardDrawerNavigationStack';
import UserDetailPage from '../screens/UserDetail';

export const AppNavigator = createStackNavigator(
  {
    DashboardNavigationDrawer: {
      screen: DashboardNavigationDrawer,
      ...navigationForDrawer
    },
    UserDetailPage: {
      screen: UserDetailPage,
      navigationOptions: navigationOptionWithBack
    }
  },
  {
    initialRouteName: 'DashboardNavigationDrawer'
  }
);

export default AppNavigator;
