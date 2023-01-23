import './Auth.scss'
import { Component } from 'react';
import { AuthSource } from './AuthSource';
import Logo from '@assets/Images/logo.svg'

export default class Login extends Component <{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      // email: "test@mail.com",
      // password: "123"
      email: "",
      password: ""
    }
  }

  Login = async () => {
    var authorize = await AuthSource.auth(this.state.email, this.state.password);
    if(authorize.success) {
      localStorage.setItem("USERID", authorize.result.id )
      localStorage.setItem("TOKEN", authorize.result.token)
      globalThis.user_id = authorize.result.id
      globalThis.token = authorize.result.token
      window.location.href = '/dashboard'
    }
  }

  Stars = (x) => {
    let content = [];
    for (let i = 0; i < x; i++) {
      content.push(<div className="star" key={`star-${i}`}></div>);
    }
    return content;
  }

  render() {
    return (
      <div className="login">
        <div className="stars">
          <div className="stars">
          { this.Stars(32) }
          </div>
        </div>

        <div className="login-wrapper">
          
          <div className="logo">
            <img src={Logo} alt="Vako Motors" />
          </div>

          <form className="login-form">
            <label className="input-label">
            <input type="email" placeholder='Enter E-mail' onChange={e => this.setState({email: e.target.value})} />
            </label>

            <label className="input-label">
            <input type="password" placeholder='Enter Password' onChange={e => this.setState({password: e.target.value})} />
            </label>

            <button className='submit-btn' type='button' onClick={this.Login}>Sign In</button>
          </form>
          </div>
      </div>
    );
  }

};