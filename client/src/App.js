import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './Pages/Login/LoginPage';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path='/Login' element={<LoginPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
