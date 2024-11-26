import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from "./components/Login Page/LoginPage"; 
import SignupPage from "./components/Signup Page/SignupPage";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from './components/Dashboard/Profile';
import MealPlan from './components/Dashboard/MealPlan';
import Exercise from './components/Dashboard/Exercise';
import Goal from './components/Dashboard/Goal';
import './App.css';

function App() {
  return (
    <Router future={{ 
      v7_startTransition: true, 
      v7_relativeSplatPath: true 
    }}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="mealplan" element={<MealPlan />} />
          <Route path="exercise" element={<Exercise />} />
          <Route path="goals" element={<Goal />} />
      </Routes>
    </Router>
  );
}

export default App;