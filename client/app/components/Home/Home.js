import React, { Component } from 'react';

import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage
} from "../../utils/storage";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '',
      masterError: '',
      signInUser: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpUser: '',
      signUpEmail: '',
      signUpRol: '',
      signUpPassword: '',
    };

    this.onTextboxChangeSignInUser = this.onTextboxChangeSignInUser.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpUser = this.onTextboxChangeSignUpUser.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpRol = this.onTextboxChangeSignUpRol.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);

  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');

      if (obj && obj.token){
        const {token} = obj;
        //verify token
        fetch('/api/account/verify?token=' + token)
          .then(res => res.json())
          .then(json => {
            if (json.success){
              this.setState({
                token,
                isLoading: false
              });
            } else {
              this.setState({
                isLoading: false,
              })
            }
          });
      } else {
        this.setState({
          isLoading: false,
        });
    }
  }
  onTextboxChangeSignInUser(event) {
    this.setState({
      signInUser: event.target.value,
    });
  }
  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }
  onTextboxChangeSignUpUser(event) {
    this.setState({
      signUpUser: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpRol(event) {
    this.setState({
      signUpRol: event.target.value,
    });
  }
  onSignUp(){
    //sacar state

    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
      signUpRol,
      signUpUser,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    //post request al backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
        user: signUpUser,
        role: signUpRol,
      }),
    }).then(res => res.json())
      .then(json => {

          if (json.success){
            this.setState({
              signUpError: json.message,
              isLoading: false,
              signUpFirstName: '',
              signUpLastName: '',
              signUpEmail: '',
              signUpPassword: '',
              signUpRol: '',
              signUpUser: '',
            });
          } else {
            this.setState({
              signUpError: json.message,
              isLoading: false,
            });
          }
        });
  }
  onSignIn(){
    const {
      signInPassword,
      signInUser,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    //post request al backend
    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        password: signInPassword,
        user: signInUser,

      }),
    }).then(res => res.json())
      .then(json => {

        if (json.success){
          setInStorage('the_main_app', {token: json.token});
          this.setState({
            signInError: json.message,
            isLoading: false,
            signUpPassword: '',
            signUpUser: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
    //sacar state
    //post request al backend

  }
  logout(){
    this.setState({
      isLoading: true,
      });
    const obj = getFromStorage('the_main_app');

    if (obj && obj.token){
      const {token} = obj;
      //verify token
      fetch('/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success){
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            })
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
    window.location.reload();

  }
  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUser,
      signInPassword,
      signUpFirstName,
      signUpLastName,
      signUpUser,
      signUpEmail,
      signUpRol,
      signUpPassword,
      signUpError,
    } = this.state;

    if (isLoading){
      return (<div><p>Cargando...</p></div>);
    }
    if (!token){
      return (
        <div>
          <div>
            {
              (signInError) ? (
                <p>{signInError}</p>
              ) : (null)
            }
            <p>Sign In</p>
            <input
              type="text"
              placeholder="User"
              value={signInUser}
              onChange={this.onTextboxChangeSignInUser}

            /> <br/>
            <input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={this.onTextboxChangeSignInPassword}
            /> <br/>
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
          <br/>
          <br/>
          <div>
            {
              (signUpError) ? (
                <p>{signUpError}</p>
              ) : (null)
            }
            <p>Sign Up</p>
            <input type="text" placeholder="Primer Nombre"
                   value={signUpFirstName}
                   onChange={this.onTextboxChangeSignUpFirstName}
            /> <br/>
            <input type="text" placeholder="Apellido"
                   value={signUpLastName}
                   onChange={this.onTextboxChangeSignUpLastName}
            /> <br/>
            <input type="text" placeholder="User"
                   value={signUpUser}
                   onChange={this.onTextboxChangeSignUpUser}
            /> <br/>
            <input type="email" placeholder="Email"
                   value={signUpEmail}
                   onChange={this.onTextboxChangeSignUpEmail}
            /> <br/>
            <input type="text" placeholder="Rol"
                   value={signUpRol}
                   onChange={this.onTextboxChangeSignUpRol}
            /> <br/>
            <input type="password" placeholder="Password"
                   value={signUpPassword}
                   onChange={this.onTextboxChangeSignUpPassword}
            /> <br/>
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>

        </div>)
    }
    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Cerrar Sesión</button>
      </div>

    );
  }
}

export default Home;
