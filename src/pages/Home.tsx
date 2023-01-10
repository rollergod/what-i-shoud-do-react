import React from 'react';

import { useSelector } from 'react-redux';
import { selectCurrentImageRef } from '../store/slices/authSlice';

import { getImage } from '../firebase/firebaseApi';


const Home = () => {


    const imageRef = useSelector(selectCurrentImageRef);
    console.log(imageRef);
    return (
        <div>
            Home
            <img src={imageRef} />
        </div>
    );
};


export default Home; 