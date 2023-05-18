import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onChangeUserInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 100,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data.jwt_token)
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="loginContainer">
        <div className="formBgContainer">
          <div className="imageContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logoImage"
            />
          </div>

          <form onSubmit={this.submitForm}>
            <label className="labelText" htmlFor="username">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              className="inputEl"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUserInput}
            />
            <br />
            <label className="labelText" htmlFor="password">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              id="password"
              className="inputEl"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
            <button type="submit" className="loginButton">
              Login
            </button>
            {showErrorMsg && <p className="errorTexts">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
