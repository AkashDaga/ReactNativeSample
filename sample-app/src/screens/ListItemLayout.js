import React, { Component } from 'react';
import { View } from 'react-native';
import {Card} from '../components/common';
import { styles } from './listItemStyle';

export default class ListItemLayout extends Component {
  render() {
    const children = (
      <View style={styles.container}>
      <Image
            source={{ uri: this.props.item}}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
      </View>
    );

    return (
      <Card
        children={children}
      />
    );
  }
}
