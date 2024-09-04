import React, { Component, ChangeEvent, FormEvent } from 'react';
import classNames from 'classnames';

// Definindo as interfaces para props e state do componente
interface LoginFormProps {
  onLogin: (e: FormEvent, login: string, password: string) => void;
  onRegister: (e: FormEvent, firstName: string, lastName: string, login: string, password: string) => void;
}

interface LoginFormState {
  active: string;
  firstName: string;
  lastName: string;
  login: string;
  password: string;
}

export default class LoginForm extends Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      active: 'login',
      firstName: '',
      lastName: '',
      login: '',
      password: '',
    };
  }

  onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ [name]: value } as Pick<LoginFormState, keyof LoginFormState>);
  };

  onSubmitLogin = (e: FormEvent) => {
    e.preventDefault();
    const { login, password } = this.state;
    this.props.onLogin(e, login, password);
  };

  onSubmitRegister = (e: FormEvent) => {
    e.preventDefault();
    const { firstName, lastName, login, password } = this.state;
    this.props.onRegister(e, firstName, lastName, login, password);
  };

  render() {
    const { active } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={classNames('nav-link', active === 'login' ? 'active' : '')}
                id="tab-login"
                onClick={() => this.setState({ active: 'login' })}
              >
                Login
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={classNames('nav-link', active === 'register' ? 'active' : '')}
                id="tab-register"
                onClick={() => this.setState({ active: 'register' })}
              >
                Register
              </button>
            </li>
          </ul>

          <div className="tab-content">
            <div className={classNames('tab-pane', 'fade', active === 'login' ? 'show active' : '')} id="pills-login">
              <form onSubmit={this.onSubmitLogin}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="loginName"
                    name="login"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="loginName">
                    Username
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    name="password"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="loginPassword">
                    Password
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-4">
                  Sign in
                </button>
              </form>
            </div>
            <div
              className={classNames('tab-pane', 'fade', active === 'register' ? 'show active' : '')}
              id="pills-register"
            >
              <form onSubmit={this.onSubmitRegister}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="firstName">
                    First name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="lastName">
                    Last name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="login"
                    name="login"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="login">
                    Username
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="registerPassword"
                    name="password"
                    className="form-control"
                    onChange={this.onChangeHandler}
                  />
                  <label className="form-label" htmlFor="registerPassword">
                    Password
                  </label>
                </div>

                <button type="submit" className="btn btn-primary btn-block mb-3">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
