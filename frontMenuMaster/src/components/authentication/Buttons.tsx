import React from 'react';

// Definindo as interfaces para as props do componente
interface ButtonsProps {
  login: () => void;
  logout: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ login, logout }) => {
  return (
    <div className="row">
      <div className="col-md-12 text-center" style={{ marginTop: '30px' }}>
        <button className="btn btn-primary" style={{ margin: '10px' }} onClick={login}>
          Login
        </button>
        <button className="btn btn-dark" style={{ margin: '10px' }} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Buttons;