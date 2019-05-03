import Config from 'react-native-config';

const BASE_URL = Config.SERVER_BASE_URL;

console.log('BASE_URL', BASE_URL);

export const ALL_CREDIT_CARD_LIST = `${BASE_URL}/CreditCardApi/getAllCreditCardSummary`;
export const USER_DETAIL = `${BASE_URL}/CreditCardApi/getCreditCardSummaryDetail`;
export const LIMITED_CREDIT_CARD_SUMMARY_LIST = `${BASE_URL}/CreditCardApi/getLimitedCreditCardSummary`;
