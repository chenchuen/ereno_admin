const INITIAL_STATE = {
  attempting: false,
  error: '',
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
  }
}

const loginFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    error: action.error,
  }
}

export default {
  INITIAL_STATE,

  loginAttempt,
  loginSuccess,
  loginFailure,
}
