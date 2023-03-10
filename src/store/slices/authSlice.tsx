import { createSlice, Slice } from '@reduxjs/toolkit';

type AuthState = {
    user: {
        email: '',
        imageRef: '',
    },
    token: '',
}

const initialState: AuthState = {
    user: {
        email: '',
        imageRef: '',
    },
    token: '',
};

const authSlice: Slice<AuthState> = createSlice({
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
            localStorage.clear();
        }
    }
});

export const { setCredentials, deleteCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state): { email: string, imageRef: string } => state.auth.user;
export const selectCurrentImageRef = (state): string => state.auth.user.imageRef;
export const selectCurrentToken = (state): string => state.auth.token;