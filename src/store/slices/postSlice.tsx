import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        items: Post[]
    }
}

const initialState: PostsState = {
    posts: {
        items: []
    }
}

const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<{ data: Post[] }>) => {
            console.log('payload', action.payload);
            state.posts.items = action.payload.data
        }
    }
})

export const { setPosts } = postsSlice.actions;

export default postsSlice.reducer;

export const getAllPosts = (state) => state.post;

