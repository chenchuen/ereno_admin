const INITIAL_STATE = {
  attempting: false,
  error: '',
  loggedIn: false,
}

const loginAttempt = (state = INITIAL_STATE) => {
  return {
    ...state,
    attempting: true,
  }
}

const loginSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    attempting: false,
    loggedIn: true,
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
  }
}

export default {
  INITIAL_STATE,

  loginAttempt,
  loginSuccess,
  loginFailure,

  logoutAttempt,
}
