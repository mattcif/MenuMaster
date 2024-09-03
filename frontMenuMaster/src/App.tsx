import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { RecipeList } from './components/recipe-list/recipeList';
import { RecipeDetail } from './components/recipe-detail/recipeDetail';
import RecipeCalendar  from './components/calendar/Calendar';
import { ShoppingLists } from './components/shoppingLists/ShoppingLists';
import { ShoppingListDetail } from './components/shopping-list-detail/ShoppingListDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/recipe-calendar" element={<RecipeCalendar/>}/>
        <Route path="/shopping-lists" element={<ShoppingLists/>}/>
        <Route path="/shopping-list/:id" element={<ShoppingListDetail/>}/>
      </Routes>
    </Router>
  );
}

export default App
