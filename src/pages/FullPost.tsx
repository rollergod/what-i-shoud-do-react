import React from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { Post } from '../components/Post/Post';


import ReactMarkdown from 'react-markdown';

type Post = {
    id: number,
    userModelId: string,
    title: string,
    text: string,
    image: string,
    viewCount: number
};

export const FullPost = () => {

    const [postInfo, setPostInfo] = React.useState<Post>();
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const { id } = useParams();

    React.useEffect(() => {
        axiosInstance.get(`/posts/${id}`)
            .then(res => {
                setPostInfo(res.data.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                alert('Произошла ошибка во время получения статьи');
            })
    }, []);

    if (isLoading) {
        return <Post
            isLoading={true}
            id={1}
            title={'asd'}
            image={''}
            viewsCount={1}
            isEditable={true}
            isFullPost={false}
            text={'test'}
            children={null}
        />
    }

    return (
        <>
            <Post
                id={postInfo.id}
                title={postInfo.title}
                text={postInfo.text}
                image={postInfo.image}
                viewsCount={postInfo.viewCount}
                isFullPost={true}
                isLoading={false}
                isEditable={false}
            >
                <ReactMarkdown children={postInfo.text} />
            </Post>
        </>
    )
}