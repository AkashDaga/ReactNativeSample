import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  FlatList
} from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import NavigationUtils from '../utils/NavigationUtils';
import theme from '../styles/themeStyle';
import { updateFilter } from '../redux/actions';

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      handlingClick: false
    };
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  componentDidMount() {
    this.fetchOptions();
  }

  fetchOptions = async () => {
    const options = await NavigationUtils.getNavigationConstantsList();
    this.setState({ options });
  };

  closeDrawer = () => {
    this.props.navigation.closeDrawer();
  };

  handleClick = index => {
    const filter = { orderBy: this.state.options[index].type, isAscending: this.state.options[index].isAscending}
    this.props.updateFilter(filter);
    this.closeDrawer();
  };

  renderMenuItems = (mainItem, mainIndex) => {
    return (
      <View style={{ flex: 1 }}>
        <TouchableHighlight
          onPress={() => this.handleClick(mainIndex)}
          underlayColor={'#f7f7f7'}
        >
          <View style={styles.navItemStyle}>
            <Text style={styles.navItemText}>{mainItem.label}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    return (
      <View style={{ elevation: 10 }}>
        <FlatList
          data={this.state.options}
          ref={ref => (this.filterList = ref)}
          renderItem={({ item, index }) => this.renderMenuItems(item, index)}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  { updateFilter }
)(DrawerContent);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1
  },
  headerStyle: {
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: theme.WHITE_COLOR
  },
  userName: {
    fontSize: 16,
    marginTop: 10
  },
  navItemStyle: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  navItemIcon: {
    marginRight: 20,
    color: '#999'
  },
  navItemText: {
    color: '#666',
    fontSize: 15,
    flex: 1,
    lineHeight: 45
  },
  userImg: {
    borderRadius: 4,
    borderColor: theme.MEDIUM_TXT_COLOR,
    position: 'absolute',
    zIndex: 1,
    bottom: 1,
    left: 1,
    marginBottom: 8,
    marginLeft: 15
  },
  lowerPanel: {
    height: '30%',
    width: '100%',
    backgroundColor: theme.LOWER_PANEL_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 0,
    bottom: 0
  },
  ratingStyle: {
    backgroundColor: theme.GREEN_TEXT,
    position: 'absolute',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 4,
    paddingBottom: 4,
    zIndex: 0,
    top: 0,
    right: 1,
    marginTop: 20,
    marginRight: 10,
    borderRadius: 5
  }
});
