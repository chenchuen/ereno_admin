import apisauce from 'apisauce';

const create = (baseURL = 'https://us-central1-aladdinapp-942fe.cloudfunctions.net') => {
  const api = apisauce.create({
    baseURL,

    timeout: 10000
  });

  const login = (username, password) => {
    return api.post(`/Auth`, {
      Method: "LOGIN",
      Data: {
        Email: username,
        Password: password
      },
    }, {});
  };

  const getAllCustomers = (from, to, token) => {
    return api.post(`/Reports`, {
      Method: "USER",
      Data: {
        Token: token,
        From: from,
        To: to,
        Email: '',
        UserType: 'customer'
      },
    })
  }

  const getAllVendors = (from, to, token) => {
    return api.post('/Reports', {
      Method: 'VENDOR',
      Data: {
        Token: token,
        From: from,
        To: to,
        ApprovalStatus: 'Both'
      }
    })
  }

  const getApprovedVendors = (from, to, token) => {
    return api.post('/Reports', {
      Method: 'VENDOR',
      Data: {
        Token: token,
        From: from,
        To: to,
        ApprovalStatus: 'Approved'
      }
    })
  }

  const getUnapprovedVendors = (from, to, token) => {
    return api.post('/Reports', {
        Method: 'VENDOR',
        Data: {
          Token: token,
          ApprovalStatus: 'Unapproved',
          From: from,
          To: to,
        }
    });
  };

  const approveVendor = (vendorUID, token) => {
    return api.post('/Actions', {
      Method: 'APPROVE_VENDOR',
      Data: {
        Token: token,
        Uid: vendorUID,
        Status: 'Approved'
      },
    });
  }

  const getUserInfo = (email, userType, token) => {
    return api.post(`/Reports`, {
      Method: "USER",
      Data: {
        Email: email,
        Token: token,
        UserType: userType
      },
    }, {});
  }

  const getAllTransactions = (from, to, token) => {
    return api.post(`/Reports`, {
      Method: "TRANSACTION",
      Data: {
        Token: token,
        From: from,
        To: to,
        Email: '',
        TransactionId: '',
      }
    })
  }

  return {
    login,

    getAllCustomers,
    getAllVendors,
    getApprovedVendors,
    getUnapprovedVendors,
    approveVendor,

    getUserInfo,

    getAllTransactions,
  };
};

export default { create };
