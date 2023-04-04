import React from 'react';

import { API_URLS } from '../api/api_constants';
import axiosInstance from '../api/axiosInstance';

import { Grid } from '@mui/material';
import { getAllPosts, setPosts } from '../store/slices/postSlice';
import { Post } from '../components/Post/Post';
import { useAppDispatch, useAppSelector } from '../hoc/hook';



const Home = () => {
    const [isPostsLoading, SetIsPostsLoading] = React.useState(true);
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts);

    React.useEffect(() => {

        const getPosts = async () => {
            const res = await axiosInstance.get(API_URLS.GET_POSTS)
                .then(res => {
                    console.log(res);
                    dispatch(setPosts(res.data))
                    SetIsPostsLoading(false);
                });
        }

        getPosts()
            .catch(error => console.log(error));

    }, []);

    const testPrivateMethod = async (): Promise<void> => {
        try {
            const res = await axiosInstance.get(API_URLS.PRIVATE_METHOD);
            console.log('PRIVATE METHOD', res.headers);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Grid>
                {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostsLoading ? (
                    <Post
                        key={index}
                        isLoading={true}
                        id={1}
                        title={'asd'}
                        image={''}
                        viewsCount={1}
                        isEditable={true}
                        isFullPost={false}
                        text={'test'}
                        children={null}
                        userModel={null}
                    />
                ) : (

                    <Post
                        id={obj.id}
                        title={obj.title}
                        image={obj.image}
                        viewsCount={obj.viewCount}
                        isEditable={true}
                        isFullPost={false}
                        isLoading={false}
                        text={obj.text}
                        key={obj.id}
                        userModel={obj.userModel}
                        children={null}
                    />
                ))

                }
            </Grid>
            <div style={{ height: 500 }} className='d-flex flex-column justify-content-center align-items-center'>
                <span onClick={testPrivateMethod} className='pt-5 fs-5 exit-link'>Test method</span>
            </div>
        </>

    );
};


export default Home; 