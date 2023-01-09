import { createSlice, Slice } from '@reduxjs/toolkit';

type User = {
    user: {
        email: '',
        imageName: ''
    },
    token: '',
}

const authSlice: Slice<User> = createSlice({
    name: 'auth',
    initialState: {
        user: {
            email: '',
            imageName: ''
        },
        token: '',
    },
    reducers: {
        setCredentials: (state, action) => {
            const { email, imageName, token } = action.payload;

            state.user = {
                email: email,
                imageName: imageName
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