import { createStackNavigator } from 'react-navigation';
import {
  navigationForDrawer
} from '../configs/routes.config';
import DashboardNavigationDrawer from '../screens/DashboardDrawerNavigationStack';

export const AppNavigator = createStackNavigator(
  {
    DashboardNavigationDrawer: {
      screen: DashboardNavigationDrawer,
      ...navigationForDrawer
    }
  },
  {
    initialRouteName: 'DashboardNavigationDrawer'
  }
);

export default AppNavigator;
