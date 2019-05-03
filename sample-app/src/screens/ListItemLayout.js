import React, { Component } from 'react';
import { View } from 'react-native';
import { TextBold, ListItemAvtarText, Card, TextBolder } from '../components/common';
import { styles } from './listItemStyle';
import { UserIconBgColor } from './constants';

export default class ListItemLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: UserIconBgColor[this.props.item.id % 9],
      isStarred: props.item.isStarred
    };
  }

  renderUserName = cardDetails => {
    return <TextBolder>{cardDetails.cardHolderName}</TextBolder>;
  };

  renderBalanceLimit = cardDetails => {
    return <TextBold>{`monthly credit limit ${cardDetails.limitBalance}`}</TextBold>
  }

  renderTotalBill = cardDetails => {
    const totalBill = cardDetails.bill_amont_1 + cardDetails.bill_amont_2 + cardDetails.bill_amont_3 + cardDetails.bill_amont_4 + cardDetails.bill_amont_5 + cardDetails.bill_amont_6 
    return<TextBold>{`Total Bill ${totalBill}`}</TextBold>
  }

  renderBillPaid = cardDetails => {
    const totalPaidBill = cardDetails.pay_amont_1 + cardDetails.pay_amont_2 + cardDetails.pay_amont_3 + cardDetails.pay_amont_4 + cardDetails.pay_amont_5 + cardDetails.pay_amont_6 
    return<TextBold>{`Till now bill paid ${totalPaidBill}`}</TextBold>
  }

  render() {
    const creditCardItem = this.props.item;

    const children = (
      <View style={styles.container}>
        <View style={styles.avtarContainer}>
          <View style={styles.circleStyle} backgroundColor={this.state.color}>
            <ListItemAvtarText>
              {creditCardItem.cardHolderName.charAt(0)}
            </ListItemAvtarText>
          </View>
        </View>
        <View style={styles.infoContainer}>
          {this.renderUserName(creditCardItem)}
          {this.renderBalanceLimit(creditCardItem)}
          {this.renderTotalBill(creditCardItem)}
          {this.renderBillPaid(creditCardItem)}
        </View>
      </View>
    );
    return (
      <Card
        children={children}
        onPress={() => this.props.onPressItem(this.props.index)}
      />
    );
  }
}
