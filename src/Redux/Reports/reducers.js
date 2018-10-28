const INITIAL_STATE = {
  loading: false,
  errorMessage: '',
  customerInfo: {},
  transactionList: [],
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

const getAllTransactionsAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  }
}

const getAllTransactionsSuccess = (state = INITIAL_STATE, action) => {
  const { transactionList } = action;

  return {
    ...state,
    loading: false,
    errorMessage: '',
    transactionList,
  };
};

const getAllTransactionsFailure = (state = INITIAL_STATE, action) => {
  const { error } = action;

  return {
    ...state,
    loading: false,
    errorMessage: error
  };
};

export default {
  INITIAL_STATE,

  getCustomerInfoAttempt,
  getCustomerInfoSuccess,
  getCustomerInfoFailure,

  getAllTransactionsAttempt,
  getAllTransactionsSuccess,
  getAllTransactionsFailure,
};
