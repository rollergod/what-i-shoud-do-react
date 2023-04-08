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
            state.posts.items = action.payload.data
        },
        removePost: (state, action: PayloadAction<{ id: number }>) => {
            console.log(action.payload.id);
            state.posts.items = state.posts.items.filter(obj => obj.id !== action.payload.id);
        }
    }
})

export const { setPosts, removePost } = postsSlice.actions;

export default postsSlice.reducer;

export const getAllPosts = (state) => state.post;

