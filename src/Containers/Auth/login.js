import React from 'react';

import { connect } from 'react-redux';

import './login.css';
import Actions from '../../Redux/Actions';

class Login extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
        username: '',
        password: '',
        error: '',
      }

      this.handleChange = this.handleChange.bind(this);
  }

  componentDidReceiveProps(nextProps) {
    if (this.props.error !== nextProps.error) {
      this.setState({
        error: nextProps.error,
      });
    }
  }

  _handleLogin = () => {
    const { username, password } = this.state;
    const { history } = this.props;

    console.log(username, password);

    if (!username || !password) {
      this.setState({
        error: "Please fill in both the username and password fields."
      });
    } else {
      this.setState({
        error: '',
      });

      this.props.login(username, password, history);
      //login
    }
  }

  handleChange(key, event) {
    const { value } = event.target;

    this.setState({
      [key]: value,
    })
  }

  render() {
    const { username, password, error } = this.state;

    return (
      <div className="MainContainer">
        <h1 className="headerTextStyle">Login</h1>

        <div className="FormContainer">
          <label>
            Username:
          </label>

          <input
            className="FormInput"
            type="text"
            value={username}
            onChange={(event) => this.handleChange("username", event)}
          />
        </div>

        <div className="FormContainer">
          <label>
            Password:
          </label>

          <input
            className="FormInput"
            type="password"
            value={password}
            onChange={(event) => this.handleChange("password", event)}
          />
        </div>

        <p style={{ color: 'red' }}>
          {error}
        </p>

        <div className="FormContainer">
          <button
            className="FormSubmitBtn"
            onClick={this._handleLogin}
          >
            Login
          </button>

          <button
            className="FormSubmitBtn"
            onClick={this._handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.attempting,
    error: state.auth.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (username, password, history) =>
      dispatch(Actions.authLoginAttempt(username, password, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
