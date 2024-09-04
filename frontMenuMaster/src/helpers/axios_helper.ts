import axios, { Method, AxiosRequestConfig } from 'axios';

// Função para obter o token de autenticação armazenado no localStorage
export const getAuthToken = (): string | null => {
  return window.localStorage.getItem('auth_token');
};

// Função para definir o cabeçalho de autenticação com base no token
export const setAuthHeader = (token: string | null): void => {
  if (token !== null) {
    window.localStorage.setItem('auth_token', token);
  } else {
    window.localStorage.removeItem('auth_token');
  }
};

// Configurações globais do Axios
axios.defaults.baseURL = 'http://localhost:8080';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Função genérica para realizar requisições HTTP com o Axios
export const request = (method: Method, url: string, data?: any) => {
  // Definindo os headers da requisição
  let headers: AxiosRequestConfig['headers'] = {};
  const authToken = getAuthToken();

  if (authToken !== null && authToken !== 'null') {
    headers = { Authorization: `Bearer ${authToken}` };
  }

  // Realizando a requisição com as configurações definidas
  return axios({
    method: method,
    url: url,
    headers: headers,
    data: data,
  });
};
