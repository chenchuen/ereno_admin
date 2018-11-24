const INITIAL_STATE = {
  attempting: false,
  error: '',
  loggedIn: false,
  token: '',
}

const loginAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    attempting: true,
    error: '',
  }
}

const loginSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    attempting: false,
    loggedIn: true,
    token: action.token,
  }
}

const loginFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: action.error,
    loggedIn: false,
  }
}

const logoutAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    loggedIn: false,
    error: '',
    token: '',
  }
}

export default {
  INITIAL_STATE,

  loginAttempt,
  loginSuccess,
  loginFailure,

  logoutAttempt,
}
