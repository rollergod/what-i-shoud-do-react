import { createSlice, Slice } from '@reduxjs/toolkit';

type User = { //TODO: переименовать..
    user: {
        email: '',
        imageRef: '',
    },
    token: '',
}

const initialState: User = {
    user: {
        email: '',
        imageRef: '',
    },
    token: '',
};

const authSlice: Slice<User> = createSlice({
    name: 'auth',
    initialState: initialState,
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

export const selectCurrentUser = (state): { email: string, imageRef: string } => state.auth.user; //TODO: сделать типы
export const selectCurrentImageRef = (state): string => state.auth.user.imageRef;
export const selectCurrentToken = (state): string => state.auth.token;