import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';
import { View, Dimensions, Animated } from 'react-native';
import UploadImage from './UploadImage';
import UploadedImages from './UploadedImage';
import theme from '../styles/themeStyle';

const { height } = Dimensions.get('window');

const getScreenList = () => {
  let screenList = {};
  screenList = {
    UPLOAD_IMAGE: {
      screen: UploadImage,
      navigationOptions: {
        tabBarLabel: 'Upload Image'
      }
    },
    UPLOADED_IMAGE: {
      screen: UploadedImages,
      navigationOptions: {
        tabBarLabel: 'Uploaded Image'
      }
    }
  };
  return screenList;
};
class DashboardTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      scroll2Y: new Animated.Value(0)
    };
  }

  getMainTabNavigator() {
    const DashBoardTabNavigator = createMaterialTopTabNavigator(
      getScreenList(),
      {
        animationEnabled: true,
        initialRouteName: 'UPLOAD_IMAGE',
        swipeEnabled: true,
        tabBarOptions: {
          activeTintColor: theme.WHITE_COLOR,
          inactiveTintColor: theme.MEDIUM_TXT_COLOR,
          upperCaseLabel: false,
          style: {
            backgroundColor: theme.WHITE_COLOR
          },
          pressColor: theme.OFF_WHITE_COLOR,
          labelStyle: {
            fontSize: theme.FONT_SIZE_MEDIUM,
            padding: 4,
            margin: 0,
            fontWeight: 'bold'
          },
          indicatorStyle: {
            height: null,
            top: 0,
            backgroundColor: theme.PRIMARY_COLOR
          }
        }
      }
    );
    return (
      <DashBoardTabNavigator screenProps={{ scrollY: this.state.scrollY }} />
    );
  }

  render() {
    const MAP_MAX_HEIGHT = 45;
    const MAP_MIN_HEIGHT = 0;
    const MAP_SCROLL_DISTANCE = MAP_MAX_HEIGHT - MAP_MIN_HEIGHT;

    const mapY = this.state.scrollY.interpolate({
      inputRange: [0, MAP_SCROLL_DISTANCE],
      outputRange: [-MAP_MIN_HEIGHT, -MAP_MAX_HEIGHT],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <Animated.View
          style={{
            height,
            minHeight: height,
            transform: [{ translateY: mapY }],
            paddingBottom: 20
          }}
        >
          {this.getMainTabNavigator()}
        </Animated.View>
      </View>
    );
  }
}

export default DashboardTabs;
