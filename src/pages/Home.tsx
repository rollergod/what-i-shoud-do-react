import React from 'react';

import { API_URLS } from '../api/api_constants';
import axiosInstance from '../api/axiosInstance';

import { Grid, Typography } from '@mui/material';
import { getAllPosts, setPosts } from '../store/slices/postSlice';
import { Post } from '../components/Post/Post';
import { useAppDispatch, useAppSelector } from '../hoc/hook';
import { selectCurrentUser } from '../store/slices/authSlice';
import { LastPostsBlock } from '../components/ComponentsBlock/LastPostsBlock';


const Home = () => {
    const [isPostsLoading, SetIsPostsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [query, setQuery] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts);
    const userModel = useAppSelector(selectCurrentUser);

    const getPosts = async () => {
        await axiosInstance.get(API_URLS.GET_POSTS)
            .then(res => {
                dispatch(setPosts(res.data))
            });

        SetIsPostsLoading(false);
    }

    // TODO: спросить у жени как можно сделать лучше
    React.useEffect(() => {

        if (posts.items.length === 0)
            setErrorMessage('В нашем блоге отсутствуют посты:( Попробуй создать первый пост!')
        else
            setErrorMessage('')

    }, [posts.items.length]);

    React.useEffect(() => {

        getPosts()
            .catch(error => {
                SetIsPostsLoading(false);
                console.log(error.response.data.status);
                if (error.response.data.status === 404)
                    setErrorMessage('В нашем блоге отсутствуют посты:( Попробуй создать первый пост!')
            });

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
            <Grid container justifyContent={'space-between'} spacing={4}>
                {
                    errorMessage ?
                        <Typography
                            width={500}
                            textAlign={'center'}
                            margin={'0 auto'}
                            fontWeight={600}
                            fontSize={25}
                        >
                            {errorMessage}
                        </Typography>
                        :
                        <>
                            <input placeholder='Search' onChange={(e) => setQuery(e.target.value)} />
                            <Grid xs={8} item>
                                {(isPostsLoading ? [...Array(10)] : posts.items).map((obj, index) => isPostsLoading ? (
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
                                        isEditable={userModel.name == obj.userModel.displayName}
                                        isFullPost={false}
                                        isLoading={isPostsLoading}
                                        text={obj.text}
                                        key={obj.id}
                                        userModel={obj.userModel}
                                        children={null}
                                    />
                                ))}
                            </Grid>
                            <Grid xs={3} item>
                                <LastPostsBlock
                                    items={posts.items.slice(-5)}
                                />
                            </Grid>
                            <div style={{ display: 'block', height: 500 }} className='d-flex flex-column justify-content-center align-items-center'>
                                <span onClick={testPrivateMethod} className='pt-5 fs-5 exit-link'>Test method</span>
                            </div>
                        </>
                }
            </Grid>
        </>

    );
};


export default Home; 