import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import DashboardTabs from './DashboardTabs';
import DrawerContent from './DrawerComponent';

const DashboardDrawerNavigationStack = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardTabs
    }
  },
  {
    unmountInactiveRoutes: true,
    drawerPosition: 'right',
    contentComponent: props => <DrawerContent {...props} />
  }
);

export default DashboardDrawerNavigationStack;
