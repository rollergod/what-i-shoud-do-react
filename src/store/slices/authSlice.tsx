import { createSlice, Slice } from '@reduxjs/toolkit';

type AuthState = {
    user: {
        name: '',
        email: '',
        imageRef: '',
    },
    token: '',
}

const initialState: AuthState = {
    user: {
        name: '',
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
            const { email, token, imageRef, name } = action.payload;

            state.user = {
                name: name,
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

export const selectCurrentUser = (state): { email: string, imageRef: string, name: string } => state.auth.user;
export const selectCurrentImageRef = (state): string => state.auth.user.imageRef;
export const selectCurrentToken = (state): string => state.auth.token;