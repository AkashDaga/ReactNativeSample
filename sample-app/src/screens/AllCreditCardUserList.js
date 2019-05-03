import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import ApiUtil from '../utils/ApiUtils';
import { LIMITED_CREDIT_CARD_SUMMARY_LIST } from '../utils/ApiUrls';
import { Spinner, TextBolder } from '../components/common';
import theme from '../styles/themeStyle';
import ListItemLayout from './ListItemLayout';
import NavigationService from '../routes/NavigationService';
import isUndefined from '../utility/validation';

const { height } = Dimensions.get('window');

class AllCreaditCardUserList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      offSet: 0,
      max: 20,
      refreshing: false,
      isLoadingMore: false,
      isNeedToLoadMore: true,
      filter: this.props.filter
    };
  }

  async componentDidMount() {
    this.doLoadTopRatedChannels();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.filter !== nextProps.filter) {
      this.doLoadTopRatedChannels(0, nextProps.filter);
    }
  }

  onPressItem = index => {
    const cresitCardUserList = this.state.data;
    const cresitCardUserItem = cresitCardUserList[index];
    NavigationService.navigate('UserDetailPage', {
      customerId: cresitCardUserItem.id,
      headerTitle: cresitCardUserItem.cardHolderName
    });
  };

  doLoadTopRatedChannels = (currentOffset, filter) => {
    const offset = currentOffset === 0 ? currentOffset : this.state.offSet;
    const limit = this.state.max;
    const orderBy = isUndefined(filter) ? '' : filter.orderBy;
    const isAscending = isUndefined(filter) ? false : filter.isAscending;
    const loading = offset === 0;
    this.setState({ loading });

    ApiUtil.createRequest(LIMITED_CREDIT_CARD_SUMMARY_LIST, 'GET', {
      offset,
      limit,
      orderBy,
      isAscending
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          loading: false,
          isLoadingMore: false
        });
        let isNeedToLoadMore = true;
        const dataList =
          offset === 0 ? responseJson.dataList : [...this.state.data, ...responseJson.dataList];

        if (responseJson.dataList.length < this.state.max) {
          isNeedToLoadMore = false;
        }
        this.setState({
          isNeedToLoadMore,
          loading: false,
          refreshing: false,
          data: dataList
        });
      })
      .catch(error => {
        console.error(error);
        this.setState({
          loading: false,
          refreshing: false
        });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        offset: 0,
        data: []
      },
      () => {
        this.doLoadTopRatedChannels(0);
      }
    );
  };

  handleLoadMore = () => {
    const startingOffset = this.state.offSet + this.state.max;
    this.setState(
      {
        offSet: startingOffset,
        isLoadingMore: true
      },
      () => {
        this.doLoadTopRatedChannels();
      }
    );
  };

  renderFooter = () => {
    if (this.state.isLoadingMore) {
      return <Spinner />;
    }
    return <View />;
  };

  renderSpinner = () => {
    return <Spinner />;
  };

  renderEmptyContainer = () => {
    return (
      <View style={styles.emptyContainerStyle}>
        <Image
          style={styles.image}
          source={require('../../assets/images/empty_white_box.png')}
        />

        <TextBolder style={{ alignSelf: 'center' }}>
          Channels are not there.
        </TextBolder>
      </View>
    );
  };

  renderList = () => {
    return (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        disableVirtualization={false}
        data={this.state.data}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => {
          const key = `${item.channelId}_${index}`;
          return key;
        }}
        style={{ height }}
        ListEmptyComponent={this.renderEmptyContainer()}
        ListFooterComponent={this.renderFooter}
        onEndReached={this.state.isNeedToLoadMore ? this.handleLoadMore : null}
        onEndReachedThreshold={1}
        initialNumToRender={10}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => {
              this.handleRefresh();
            }}
            style={{ backgroundColor: theme.WHITE_COLOR }}
            tintColor={theme.LIGHT_TXT_COLOR}
            title="Loading..."
            titleColor={theme.LIGHT_TXT_COLOR}
            colors={[
              theme.SECONDARY_COLOR,
              theme.PRIMARY_COLOR,
              theme.SECONDARY_COLOR
            ]}
            progressBackgroundColor={theme.WHITE_COLOR}
          />
        }
      />
    );
  };

  renderItem = ({ item, index }) => {
    return (
      <ListItemLayout
        item={item}
        index={index}
        filterType={this.state.filterType}
        onPressItem={this.onPressItem}
      />
    );
  };

  render() {
    let view = <View />;
    if (this.state.loading) {
      view = this.renderSpinner();
    } else {
      view = this.renderList();
    }

    return <View style={styles.container}>{view}</View>;
  }
}

const mapStateToProps = appState => {
  const filter = appState.app_reducer.filter;
  return { filter };
};

export default connect(
  mapStateToProps,
  {}
)(AllCreaditCardUserList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.PAGE_BACKGROUND
  },
  separatorStyle: {
    height: 1,
    width: '100%',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: theme.LIST_BACKGROUND_COLOR
  },
  emptyContainerStyle: {
    flex: 1,
    backgroundColor: theme.PAGE_BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    alignSelf: 'center',
    resizeMode: 'contain'
  }
});
