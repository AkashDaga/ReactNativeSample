import React, { Component } from 'react';
import { View,StyleSheet } from 'react-native';
import {TextBolder, Button, InputWithErrorBlock} from '../components/common'
import theme from '../styles/themeStyle'
import ApiUtil from '../utils/ApiUtils'
import { USER_DETAIL } from '../utils/ApiUrls'

class SearchUser extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userMemberId: '',
      isSubmitting: false
    };
    this.inputRefs = {};
  }

  searchMember = () => {
    const isValid = this.validateInput();
    if (isValid) {
      this.setState({ isSubmitting: true });
      const id = this.state.userMemberId;
      ApiUtil.createRequest(USER_DETAIL, 'GET', { id })
        .then(response => response.json())
        .then(responseJson => {
          console.log('switch User ---> ', responseJson);
          this.setState({ isSubmitting: false });
          if (!responseJson.success) {
            showSnackbar('negetive', 'unable to find a member with that ID');
          } else {
            const cresitCardUserItem = responseJson.creditCardDetails;
            NavigationService.navigate('UserDetailPage', {
              customerId: cresitCardUserItem.id,
              headerTitle: cresitCardUserItem.cardHolderName
            });
          }
        })
        .catch(error => {
          this.setState({ isSubmitting: false });
          console.error(error);
        });
    }
  };

  dismissSnackbarListener = () => {
    console.log('dismissSnackbarListener fired');
    this.setState({ userMemberId: '' });
  };

  validateInput = () => {
    const refs = this.inputRefs;
    let isValid = true;
    Object.keys(refs).map(key => {
      if (refs[key] !== null && refs[key].props.validation !== undefined) {
        const props = refs[key].props;
        const value = refs[key].props.value;
        props.setError('', true);
        if (
          !isUndefined(value) &&
          inputValidations[props.validation].test(value)
        ) {
          props.setError('', true);
        } else {
          props.setError(props.errorMessage, false);
          isValid = false;
        }
      }
      return null;
    });
    return isValid;
  };

  updateInputState = value => {
    this.setState({ userMemberId: value });
  };

  renderLabel = () => {
    return <TextBolder>Search user</TextBolder>;
  };

  renderInputBlock = () => {
    return (
      <InputWithErrorBlock
        label="Search by Member Id"
        placeholder="Enter member id"
        errorMessage="Please enter member id"
        returnKeyType="done"
        autoCapitalize="none"
        clearButtonMode="while-editing"
        keyboardType="number-pad"
        isValid={true}
        style={styles.inputStyle}
        validation="notEmpty"
        refName={ref => {
          this.inputRefs.userMemberId = ref;
        }}
        value={this.state.userMemberId}
        errorStyle={styles.errorStyle}
        onChangeText={val => this.updateInputState(val)}
      />
    );
  };

  renderSubmitButton = () => {
    return (
      <Button
        containerStyle={{ marginTop: 20 }}
        buttonTextStyle={{ fontSize: 15, width: '100%' }}
        onPress={() => this.searchMember()}
        isSubmitting={this.state.isSubmitting}
      >
        SUBMIT
      </Button>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderLabel()}
        {this.renderInputBlock()}
        {this.renderSubmitButton()}
      </View>
    );
  }
}
export default SearchUser;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.WHITE_COLOR
  },
  inputStyle: {
    marginTop: 20,
    width: '100%'
  }
});
