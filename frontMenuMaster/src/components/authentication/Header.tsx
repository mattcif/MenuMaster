import React from 'react';

// Definindo as interfaces para as props do componente
interface HeaderProps {
  logoSrc: string;
  pageTitle: string;
}

const Header: React.FC<HeaderProps> = ({ logoSrc, pageTitle }) => {
  return (
    <header className="App-header">
      <img src={logoSrc} className="App-logo" alt="logo" />
      <h1 className="App-title">{pageTitle}</h1>
    </header>
  );
};

export default Header;