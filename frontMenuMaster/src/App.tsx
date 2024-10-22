// App.tsx
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecipeList } from './components/recipe-list/recipeList';
import { RecipeDetail } from './components/recipe-detail/recipeDetail';
import RecipeCalendar from './components/calendar/Calendar';
import { ShoppingLists } from './components/shoppingLists/ShoppingLists';
import { ShoppingListDetail } from './components/shopping-list-detail/ShoppingListDetail';
import WelcomeContent from './components/authentication/WelcomeContent';
import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/recipe"
          element={
            <ProtectedRoute>
              <RecipeList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe/:id"
          element={
            <ProtectedRoute>
              <RecipeDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe-calendar"
          element={
            <ProtectedRoute>
              <RecipeCalendar />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shopping-lists"
          element={
            <ProtectedRoute>
              <ShoppingLists />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shopping-list/:id"
          element={
            <ProtectedRoute>
              <ShoppingListDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
