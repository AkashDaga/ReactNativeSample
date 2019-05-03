import React from 'react';
import { View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextBolder } from '../components/common';
import theme from '../styles/themeStyle';

const APPBAR_HEIGHT = 50;

export const noHeaderStyle = {
  header: null
};

const commonHeaderStyle = {
  headerForceInset: { top: 'never' },
  headerTintColor: theme.MEDIUM_TXT_COLOR,
  headerBackTitle: ' ',
  headerTitleStyle: {
    color: theme.MEDIUM_TXT_COLOR,
    fontSize: theme.FONT_SIZE_LARGE
  },
  headerTransitionPreset: 'fade-in-place',
  headerPressColorAndroid: theme.OFF_WHITE_COLOR,
  elevation: 1
};

export const navigationForDrawer = {
  navigationOptions: ({ navigation }) => ({
    title: null,
    headerStyle: { height: APPBAR_HEIGHT },
    headerLeft: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon
          name="credit-card-multiple"
          size={20}
          style={{ color: theme.MEDIUM_TXT_COLOR, marginLeft: 10 }}
        />
        <TextBolder
          style={{
            color: theme.MEDIUM_TXT_COLOR,
            marginBottom: 0,
            marginLeft: 5,
            fontSize: theme.FONT_SIZE_MEDIUM
          }}
        >
          Credit Card Users
        </TextBolder>
      </View>
    ),
    headerRight: (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableHighlight
          style={{ padding: 10, marginRight: 5, marginLeft: 5 }}
          onPress={() => {
            if (!navigation.state.isDrawerOpen) {
              navigation.openDrawer();
            } else {
              navigation.closeDrawer();
            }
          }}
          underlayColor="#f5f5f5"
        >
          <Icon
            name="filter-outline"
            size={25}
            style={{ color: theme.MEDIUM_TXT_COLOR }}
          />
        </TouchableHighlight>
      </View>
    ),
    ...commonHeaderStyle
  })
};

export const navigationOptionWithBack = {
  headerStyle: { height: APPBAR_HEIGHT },
  ...commonHeaderStyle
};
