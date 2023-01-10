import { createSlice, Slice } from '@reduxjs/toolkit';

type User = {
    user: {
        email: '',
        imageRef: ''
    },
    token: '',
}

const authSlice: Slice<User> = createSlice({
    name: 'auth',
    initialState: {
        user: {
            email: '',
            imageRef: ''
        },
        token: '',
    },
    reducers: {
        setCredentials: (state, action) => {
            const { email, token, imageRef } = action.payload;

            state.user = {
                email: email,
                imageRef: imageRef,
            };

            state.token = token;
        },
        deleteCredentials: (state) => {
            state.user = null;
            state.token = null;
        }
    }
});

export const { setCredentials, deleteCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;