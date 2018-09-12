const INITIAL_STATE = {
  loading: false,
  errorMessage: '',
  customerInfo: {},
};

const getCustomerInfoAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  };
};

const getCustomerInfoSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    customerInfo: action.customerInfo
  };
};

const getCustomerInfoFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  }
}

export default {
  INITIAL_STATE,
  
  getCustomerInfoAttempt,
  getCustomerInfoSuccess,
  getCustomerInfoFailure,
};
