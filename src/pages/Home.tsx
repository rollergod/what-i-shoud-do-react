import React from 'react';

import { API_URLS } from '../api/api_constants';
import axiosInstance from '../api/axiosInstance';

import { Grid, Typography } from '@mui/material';
import { fetchPostsAsync, setPosts } from '../store/slices/postSlice';
import { Post } from '../components/Post/Post';
import { useAppDispatch, useAppSelector } from '../hoc/hook';
import { selectCurrentUser } from '../store/slices/authSlice';
import { LastPostsBlock } from '../components/ComponentsBlock/LastPostsBlock';
import Search from '../components/Search/Search';

import useDebounceHook from '../hoc/useDebounceHook';

const Home = () => {
    const [isPostsLoading, setIsPostsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState<string>('');
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts);
    const status = useAppSelector(state => state.post.posts.status);
    const userModel = useAppSelector(selectCurrentUser);

    const debouncedSearchValue = useDebounceHook(searchQuery, 1000);

    React.useEffect(() => {
        console.log(status);
        if (status === 'error' || status === 'loaded' && posts.items.length === 0)
            setErrorMessage('В нашем блоге отсутствуют посты:( Попробуй создать первый пост!')
        else
            setErrorMessage('')

    }, [status, posts.items.length]);

    React.useEffect(() => {

        dispatch(fetchPostsAsync({ searchQuery: debouncedSearchValue }))
            .then((response) => {

                setIsPostsLoading(false)
            });

    }, [debouncedSearchValue]);

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
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <>
                <Grid container justifyContent={'space-between'} spacing={4} display={'flex'}>
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
                                            createdDate={null}
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
                                            createdDate={obj.createdDate}
                                        />
                                    ))}
                                </Grid>
                                <Grid xs={3} item>
                                    <LastPostsBlock
                                        items={posts.items.slice(-5)}
                                    />
                                </Grid>
                            </>
                    }
                </Grid>
            </>
        </>
    );
};


export default Home; 