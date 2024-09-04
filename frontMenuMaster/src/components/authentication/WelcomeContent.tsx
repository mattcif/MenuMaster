import React from 'react';

// Definindo as props e state se necessário, neste caso são vazios
interface WelcomeContentProps {}
interface WelcomeContentState {}

export default class WelcomeContent extends React.Component<WelcomeContentProps, WelcomeContentState> {
  render() {
    return (
      <div className="row justify-content-md-center">
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4">Welcome</h1>
            <p className="lead">Login to see protected content.</p>
          </div>
        </div>
      </div>
    );
  }
}
