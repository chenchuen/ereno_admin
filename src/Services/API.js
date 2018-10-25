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

  const getUserInfo = (email, token) => {
    return api.post(`/Reports`, {
      Method: "USER",
      Data: {
        Email: email,
        Token: token,
      },
    }, {});
  }

  return {
    login,

    getUserInfo,
  };
};

export default { create };
