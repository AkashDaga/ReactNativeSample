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
import { TextBolder } from '../components/common';
import theme from '../styles/themeStyle';
import ListItemLayout from './ListItemLayout';
import storageUtils from '../utils/StorageUtils';

const { height } = Dimensions.get('window');

class UploadedImage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      refreshing: false,
    };
  }

  async componentDidMount() {
    await this.doLoadSavedImages();
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.initialCount !== nextProps.initialCount
    ) {
      this.doLoadSavedImages();
    }
  }

  doLoadSavedImages = async () => {
        const dataList = await storageUtils.getSavedPhotoUriList();
        console.log("dataList",dataList)
        this.setState({
          data: dataList
        });
  };

  handleRefresh = () => {
      this.doLoadSavedImages();
  };

  renderEmptyContainer = () => {
    return (
      <View style={styles.emptyContainerStyle}>
        <Image
          style={styles.image}
          source={require('../../assets/images/empty_white_box.png')}
        />

        <TextBolder style={{ alignSelf: 'center' }}>
          No photos are there
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
          const key = `${index}_${item}`;
          return key;
        }}
        style={{ height }}
        ListEmptyComponent={this.renderEmptyContainer()}
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
      />
    );
  };

  render() {
    let view = <View />;
      view = this.renderList();
    return <View style={styles.container}>{view}</View>;
  }
}

const mapStateToProps = appState => {
  const initialCount = appState.app_reducer.initialCount;
  return { initialCount };
};

export default connect(
  mapStateToProps,
  {}
)(UploadedImage);

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
