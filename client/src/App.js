import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from './Pages/Login/LoginPage';
import TaskProvider from './Context/Store';
import Home from './Pages/Home/Home';
function App() {
  return (
    <div className="App">
      <Router>
      <TaskProvider>
        <Routes>
          <Route path='/' element={<Home/>} exact />  
        <Route path='/Login' element={<LoginPage/>}/>
        </Routes>
        </TaskProvider>
      </Router>
    </div>
  );
}

export default App;
