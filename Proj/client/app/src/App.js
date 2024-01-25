import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import UserDetailPage from './routes/UserDetailPage';
import { UserContextProvider } from './context/UserContext';

function App() {
  return (
    <UserContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path='/' Component={Home} />
            <Route exact path='/user/:id/update' Component={UpdatePage} />
            <Route exact path='/user/:id' Component={UserDetailPage} />
          </Routes>
        </Router>
      </div>
    </UserContextProvider>
  );
}

export default App;
