import React, { Component } from 'react';
import { request, setAuthHeader } from '../../helpers/axios_helper';

import Buttons from './Buttons';
import AuthContent from './AuthContent';
import LoginForm from './LoginForm';
import WelcomeContent from './WelcomeContent';

// Definindo os tipos para o estado e props
interface AppContentState {
  componentToShow: 'welcome' | 'login' | 'messages'; // Tipagem restrita para o estado do componente
}

class AppContent extends Component<{}, AppContentState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      componentToShow: 'welcome',
    };
  }

  login = () => {
    this.setState({ componentToShow: 'login' });
  };

  logout = () => {
    this.setState({ componentToShow: 'welcome' });
    setAuthHeader(null);
  };

  onLogin = (e: React.FormEvent, username: string, password: string) => {
    e.preventDefault();
    request('POST', '/login', {
      login: username,
      password: password,
    })
      .then((response: { data: { token: any; }; }) => {
        setAuthHeader(response.data.token);
        this.setState({ componentToShow: 'messages' });
      })
      .catch((error: any) => {
        setAuthHeader(null);
        this.setState({ componentToShow: 'welcome' });
      });
  };

  onRegister = (
    event: React.FormEvent,
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => {
    event.preventDefault();
    request('POST', '/register', {
      firstName: firstName,
      lastName: lastName,
      login: username,
      password: password,
    })
      .then((response: { data: { token: any; }; }) => {
        setAuthHeader(response.data.token);
        this.setState({ componentToShow: 'messages' });
      })
      .catch((error: any) => {
        setAuthHeader(null);
        this.setState({ componentToShow: 'welcome' });
      });
  };

  render() {
    return (
      <>
        <Buttons login={this.login} logout={this.logout} />

        {this.state.componentToShow === 'welcome' && <WelcomeContent />}
        {this.state.componentToShow === 'login' && (
          <LoginForm onLogin={this.onLogin} onRegister={this.onRegister} />
        )}
        {this.state.componentToShow === 'messages' && <AuthContent />}
      </>
    );
  }
}

export default AppContent;