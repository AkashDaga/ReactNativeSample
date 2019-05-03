import { Alert } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';

class ApiUtil {
  static apiUtilInstance = null;

  static getInstance() {
    if (ApiUtil.apiUtilInstance == null) {
      ApiUtil.apiUtilInstance = new ApiUtil();
    }
    return this.apiUtilInstance;
  }

  checkStatus(response) {
    if (response.status === 200) {
      return response;
    } else if (response.status === 403) {
      this.signOutAsync();
    } else if (
      response.status === 502 ||
      response.status === 503 ||
      response.status === 504
    ) {
      const errorTxt =
        'We are performing an Upgrade... Please wait while we come back..';
      Alert.alert(errorTxt);
      const error = new Error(response.statusText);
      console.log(response.statusText);
      error.response = response;
      return Promise.reject(error);
    } else {
      const errorTxt = 'Oops Something went wrong... Please try again';
      Alert.alert(errorTxt);
      const error = new Error(response.statusText);
      error.response = response;
      return Promise.reject(error);
    }
  }

  signOutAsync = async () => {
    await StorageUtil.clearStorage();
    showSnackbar('negetive', 'redirect to auth screen');
  };

  async createRequest(requestUrl, requestMethod, params) {
    let endPoint = requestUrl;
    const request = {
      method: requestMethod,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'cache-control': 'no-cache',
        appType: Config.APP_TYPE,
        redirect: 'error',
        appVersion: parseInt(DeviceInfo.getBuildNumber(), 10)
      }
    };

    if (params !== undefined) {
      if (requestMethod === 'GET') {
        /*
         * use "const encodeParams = encodeURIComponent;" if params needs to be encoded
         * and use encodeParams as a method encodeParams(k)  encodeParams(params[k])
         */
        const query = Object.keys(params)
          .map(k => `${k}=${params[k]}`)
          .join('&');

        endPoint = `${endPoint}?${query}`;
      } else {
        request.body = JSON.stringify(params);
      }
    }

    console.log('requestUrl---->', endPoint);
    let response = await fetch(endPoint, request);
    console.log('request---->', request);
    console.log(response._bodyText);
    response = await apiUtils.checkStatus(response, endPoint);
    return response;
  }
}

const apiUtils = ApiUtil.getInstance();

export default apiUtils;
