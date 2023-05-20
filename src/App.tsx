import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { PrivateRoute } from './hoc/PrivateRoute';

import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

import { useDispatch } from 'react-redux';
import axiosInstance from './api/axiosInstance';
import { API_URLS } from './api/api_constants';
import { setCredentials } from './store/slices/authSlice';
import { getImage } from './firebase/firebaseApi';
import Header from './components/Header/Header';
import { Container } from '@mui/material';
import { FullPost } from './pages/FullPost';
import { AddPost } from './pages/AddPost/AddPost';
import ChangeProfile from './pages/Profile/ChangeProfile/ChangeProfile';

function App() {

  const dispatch = useDispatch();

  React.useEffect(() => {
    axiosInstance.get(API_URLS.GET_ME)
      .then(async (res) => {

        const imageUrl = await getImage(res.data.user.imageName);
        dispatch(setCredentials({
          name: res.data.user.displayName,
          email: res.data.user.email,
          imageRef: imageUrl
        }))

      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='App'>
      <BrowserRouter>
        <Header />
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/login' element={<Login></Login>} />
            <Route path='/register' element={<Register></Register>} />
            <Route path='/posts/:id' element={<FullPost></FullPost>} />
            <Route path='/posts/:id/edit' element={<AddPost></AddPost>} />
            <Route path='/add-posts' element={<AddPost></AddPost>} />
            <Route path='/' element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } />
            <Route path='/profile' element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path='/profile/change' element={
              <PrivateRoute>
                <ChangeProfile />
              </PrivateRoute>
            } />
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
