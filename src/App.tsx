import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { PrivateRoute } from './hoc/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login></Login>} />
          <Route path='/register' element={<Register></Register>} />
          <Route path='/' element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
