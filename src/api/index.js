import { getRequest, postRequest } from "./httpClient";
import { GET_CURRENCIES, GET_AMOUNT } from "./endpoints";

// ******** LOCATION **********

// get region
function getCurrencies() {
  let path = GET_CURRENCIES;
  return getRequest(path);
}

// get amount
function getAmount(data) {
  let path = GET_AMOUNT;
  let payload = {
    sum: parseInt(data.cashAmount),
    divider_coin_id: data.dividend,
    dividend_coin_id: data.divisor,
  };

  return postRequest(path, payload);
}

const api = {
  getCurrencies,
  getAmount,
};

export default api;
