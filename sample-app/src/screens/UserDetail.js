import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ApiUtil from '../utils/ApiUtils';
import { USER_DETAIL } from '../utils/ApiUrls';
import theme from '../styles/themeStyle';
import { TextBolder,TextBold,ListItemAvtarText, Spinner, Card } from '../components/common';
import { UserIconBgColor } from './constants';

class UserDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.headerTitle
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      customerId: this.props.navigation.state.params.customerId,
      isLoading: true,
      color :UserIconBgColor[this.props.navigation.state.params.customerId % 9],
      data: {}
    };
  }

  componentDidMount() {
    this.doLoadUserDetails(this.state.customerId);
  }

  doLoadUserDetails = id => {
    ApiUtil.createRequest(USER_DETAIL, 'GET', { id })
      .then(response => response.json())
      .then(responseJson => {
        console.log('responseJson ------> ',responseJson);
        this.setState({
          isLoading: false,
          data: responseJson.creditCardDetails
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  renderAvatar = () => {
    return(
      <View style={styles.circleStyle} backgroundColor={this.state.color}>
      <ListItemAvtarText>
        {this.state.data.cardHolderName.charAt(0)}
      </ListItemAvtarText>
    </View>
    );
  }

  renderUserDetailsLabel = () => {
    return(<TextBolder>User Details: </TextBolder>)
  }

  renderUserName = () => {
    return(<TextBold>{`user name is ${this.state.data.cardHolderName}`}</TextBold>)
  }

  renderUserGender = () => {
    return(<TextBold>{`Gender: ${this.state.data.sex}`}</TextBold>)
  }

  renderUserAge = () => {
    return(<TextBold>{`Gender: ${this.state.data.age}`}</TextBold>)
  }

  renderUserEductaion = () => {
    return(<TextBold>{`Qualification: ${this.state.data.eductaion}`}</TextBold>)
  }

  renderUserMaritalStatus = () => {
    return(<TextBold>{`Marital Status: ${this.state.data.marraige}`}</TextBold>)
  }

  renderCreditLabel = () => {
    return(
      <TextBolder>Credit Information</TextBolder>
    )
  }

  renderTotalBill = () => {
    const totalBill = this.getTotalBill();
    return<TextBold>{`Total Bill ${totalBill}`}</TextBold>
  }

  renderBillPaid = () => {
    const totalPaidBill = this.getBillPaid();
    return<TextBold>{`Till now bill paid ${totalPaidBill}`}</TextBold>
  }

  renderBillInformation = (monthName, bill) => {
    return(<TextBold>{`credit from the month of ${monthName} is ${bill}`}</TextBold>)
  }

  renderRemainingToPay = () => {
    const totalBill = this.getTotalBill();
    const paidBill = this.getBillPaid();
    const remainingBill = totalBill - paidBill; 

    return(
      <TextBold>{`Due amount is ${remainingBill}`}</TextBold>
    )
  }

  getBillPaid = () => {
    const billPaid = this.state.data.pay_amont_1 + this.state.data.pay_amont_2 + this.state.data.pay_amont_3 + this.state.data.pay_amont_4 + this.state.data.pay_amont_5 + this.state.data.pay_amont_6 

    return billPaid;
  }

  getTotalBill = () =>{
    const totalBill = this.state.data.bill_amont_1 + this.state.data.bill_amont_2 + this.state.data.bill_amont_3 + this.state.data.bill_amont_4 + this.state.data.bill_amont_5 + this.state.data.bill_amont_6

    return totalBill;
  }


  

  render() {
    if(!this.state.isLoading){
      return(
        <View style = {{flex:1}}>
      <Card>
        {this.renderAvatar()}
        {this.renderUserDetailsLabel()}
        {this.renderUserName()}
        {this.renderUserGender()}
        {this.renderUserEductaion()}
        {this.renderUserMaritalStatus()}
        {this.renderUserAge()}
      </Card>
      <Card>
      {this.renderCreditLabel()}
      {this.renderTotalBill()}
      {this.renderBillPaid()}
      {this.renderRemainingToPay()}
      </Card>
      </View>
      );
    }else{
      return(<View style = {styles.container}><Spinner/></View>);
    }
  }
}
export default UserDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR
  },
  circleStyle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
