const INITIAL_STATE = {
  loading: false,
  errorMessage: '',
  customerList: [],
  transactionList: [],
  vendorList: [],
};

const getAllCustomersAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  }
}

const getAllCustomersSuccess = (state = INITIAL_STATE, action) => {
  const { customerList, shouldResetReduxData } = action;

  let stateCustomerList = state.customerList;

  if (stateCustomerList.length && !shouldResetReduxData) {
    stateCustomerList = stateCustomerList.concat(customerList);
  } else {
    stateCustomerList = customerList;
  }

  return {
    ...state,
    loading: false,
    errorMessage: '',
    customerList: stateCustomerList,
  };
}

const getAllCustomersFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    errorMessage: action.error,
    loading: false,
  }
}

const getCustomerInfoAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  };
};

const getCustomerInfoSuccess = (state = INITIAL_STATE, action) => {
  let newCustomerList = [];

  newCustomerList.push(action.customerInfo);

  return {
    ...state,
    loading: false,
    customerList: newCustomerList,
  };
};

const getCustomerInfoFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error
  }
}

const getAllVendorAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  };
};

const getAllVendorSuccess = (state = INITIAL_STATE, action) => {
  const { vendorList } = action;

  let formattedVendorList = [];

  for (let i = 0; i < vendorList.length; i++) {
    const vendor = vendorList[i];

    formattedVendorList = formattedVendorList.concat({
      ...vendor.vendorInfo,
      vendorUid: vendor.vendorUid,
    });
  }

  return {
    ...state,
    loading: false,
    vendorList: formattedVendorList,
  };
};

const getAllVendorFailure = (state = INITIAL_STATE, action) => {
  const { errorMessage } = action;

  return {
    ...state,
    loading: false,
    errorMessage,
  };
};

const getUnapprovedVendorsAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  };
};

const getUnapprovedVendorsSuccess = (state = INITIAL_STATE, action) => {
  const { vendorList } = action;

  let formattedVendorList = [];

  for (let i = 0; i < vendorList.length; i++) {
    const vendor = vendorList[i];

    formattedVendorList = formattedVendorList.concat({
      ...vendor.vendorInfo,
      vendorUid: vendor.vendorUid,
    });
  }

  return {
    ...state,
    loading: false,
    vendorList: formattedVendorList,
  };
};

const getUnapprovedVendorsFailure = (state = INITIAL_STATE, action) => {
  const { errorMessage } = action;

  return {
    ...state,
    loading: false,
    errorMessage,
  };
};

const getVendorInfoAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  };
};

const getVendorInfoSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    loading: false,
    vendorList: [].concat(action.vendorInfo),
  };
};

const getVendorInfoFailure = (state = INITIAL_STATE, action) => {
  const { errorMessage } = action;

  return {
    ...state,
    loading: false,
    errorMessage
  };
};

const getAllTransactionsAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loading: true,
    errorMessage: '',
  }
}

const getAllTransactionsSuccess = (state = INITIAL_STATE, action) => {
  const { transactionList, shouldResetReduxData } = action;

  let stateTransactionList = state.transactionList;

  if (stateTransactionList.length && !shouldResetReduxData) {
    stateTransactionList = stateTransactionList.concat(transactionList);
  } else {
    stateTransactionList = transactionList;
  }

  return {
    ...state,
    loading: false,
    errorMessage: '',
    transactionList: stateTransactionList,
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

  getAllCustomersAttempt,
  getAllCustomersSuccess,
  getAllCustomersFailure,

  getCustomerInfoAttempt,
  getCustomerInfoSuccess,
  getCustomerInfoFailure,

  getAllVendorAttempt,
  getAllVendorSuccess,
  getAllVendorFailure,

  getUnapprovedVendorsAttempt,
  getUnapprovedVendorsSuccess,
  getUnapprovedVendorsFailure,

  getVendorInfoAttempt,
  getVendorInfoSuccess,
  getVendorInfoFailure,

  getAllTransactionsAttempt,
  getAllTransactionsSuccess,
  getAllTransactionsFailure,
};
