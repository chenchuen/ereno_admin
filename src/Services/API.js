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
    getUserInfo,

    getAllTransactions,
  };
};

export default { create };
