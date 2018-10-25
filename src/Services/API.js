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

  return {
    login,
  };
};

export default { create };
