// App.tsx
import './App.css';
import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RecipeList } from './components/recipe-list/recipeList';
import { RecipeDetail } from './components/recipe-detail/recipeDetail';
import RecipeCalendar from './components/calendar/Calendar';
import { ShoppingLists } from './components/shoppingLists/ShoppingLists';
import { ShoppingListDetail } from './components/shopping-list-detail/ShoppingListDetail';
import WelcomeContent from './components/authentication/WelcomeContent';
import LoginForm from './components/authentication/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { request, setAuthHeader } from './helpers/axios_helper';

function App() {
  const navigate = useNavigate();

  // Função de login
  const handleLogin = async (e: React.FormEvent, login: string, password: string) => {
    e.preventDefault();

    try {
      const response = await request('POST', '/login', { login, password });
      const token = response.data.token;
      setAuthHeader(token);
      navigate('/recipe');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  // Função de registro
  const handleRegister = async (
    e: React.FormEvent,
    firstName: string,
    lastName: string,
    login: string,
    password: string
  ) => {
    e.preventDefault();

    try {
      const response = await request('POST', '/register', { firstName, lastName, login, password });
      const token = response.data.token;
      setAuthHeader(token);
      navigate('/recipe');
    } catch (error) {
      console.error('Erro ao fazer registro:', error);
      alert('Erro ao fazer registro. Tente novamente.');
    }
  };

  return (
    <Routes>
      <Route path="/" element={<WelcomeContent />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} onRegister={handleRegister} />} />
      <Route path="/recipe" element={<RecipeList />} />
      <Route path="/recipe/:id" element={<RecipeDetail />} />
      <Route path="/recipe-calendar" element={<RecipeCalendar />} />
      <Route path="/shopping-lists" element={<ShoppingLists />} />
      <Route path="/shopping-list/:id" element={<ShoppingListDetail />} />
    </Routes>
  );
}

export default App;
