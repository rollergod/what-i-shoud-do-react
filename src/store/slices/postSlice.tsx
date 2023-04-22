import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URLS } from "../../api/api_constants";
import axiosInstance from "../../api/axiosInstance";

type Data = {
    data: Post[],
    message: string,
    statusCode: number
}

type Post = {
    id: number,
    userModelId: string,
    title: string,
    text: string,
    image: string,
    viewCount: number
};

type PostsState = {
    posts: {
        items: Post[],
        status: string
    }
}

const initialState: PostsState = {
    posts: {
        items: [],
        status: 'loading'
    }
}

export const fetchPostsAsync = createAsyncThunk<Data, { searchQuery: string }>(`${API_URLS.GET_POSTS}`, async ({ searchQuery }) => {
    const { data } = await axiosInstance.get(`${API_URLS.GET_POSTS}?searchQuery=${searchQuery}`);
    console.log('GET DATA POSTS');
    return data;
});

const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<{ data: Post[] }>) => {
            state.posts.items = action.payload.data
        },
        removePost: (state, action: PayloadAction<{ id: number }>) => {
            console.log(action.payload.id);
            state.posts.items = state.posts.items.filter(obj => obj.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsAsync.pending, (state) => {
                state.posts.items = [];
                state.posts.status = 'loading';
            })
            .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                console.log('FETCH POSTS DATA', action.payload);
                state.posts.items = action.payload.data;
                state.posts.status = 'loaded';
            })
            .addCase(fetchPostsAsync.rejected, (state) => {
                state.posts.items = [];
                state.posts.status = 'error';
            })
    }
})

export const { setPosts, removePost } = postsSlice.actions;

export default postsSlice.reducer;

export const getAllPosts = (state) => state.post;

