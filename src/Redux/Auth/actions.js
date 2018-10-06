import Types from './types';

const authLoginAttempt = (username, password, history) => ({
  type: Types.AUTH_LOGIN_ATTEMPT,
  username, password, history
});

const authLoginSuccess = () => ({
  type: Types.AUTH_LOGIN_SUCCESS
});

const authLoginFailure = (error) => ({
  type: Types.AUTH_LOGIN_FAILURE,
  error
});

const authLogoutAttempt = () => ({
  type: Types.AUTH_LOGOUT_ATTEMPT,
});

export default {
  authLoginAttempt,
  authLoginSuccess,
  authLoginFailure,

  authLogoutAttempt,
}
