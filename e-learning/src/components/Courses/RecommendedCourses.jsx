import {
    Container,
    Heading,
    Stack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRecommendationCourses } from '../../redux/actions/recommendedCourse';
import toast from 'react-hot-toast';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { Course } from './Courses';
import Loader from '../Layout/Loader/Loader';

const RecommendedCourses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, courses, error, message } = useSelector(
        state => state.recommendedCourse
    );

    const addToPlaylistHandler = async courseId => {
        await dispatch(addToPlaylist(courseId));
        dispatch(loadUser());
        navigate('/profile');
    };


    useEffect(() => {
        dispatch(createRecommendationCourses());

        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, error, message]);
    // if (!user) {
    //     return <Navigate to={'/courses'} />;
    // }
    return loading ? (
        <Loader />
    ) : (
        <Container minH={'95vh'} maxW="container.lg" paddingY={'8'}>
            <Heading children="Recommended Courses" m={'8'} />
            <Stack
                direction={['column', 'row']}
                flexWrap="wrap"
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}
            >
                {courses.length > 0 ? (
                    courses.map(item => (
                        <Course
                            key={item._id}
                            title={item.title}
                            description={item.description}
                            views={item.views}
                            imageSrc={item.poster.url}
                            id={item._id}
                            creator={item.createdBy}
                            lectureCount={item.numOfVideos}
                            addToPlaylistHandler={addToPlaylistHandler}
                            loading={loading}
                        />
                    ))
                ) : (
                    <Heading mt="4" children="No Courses to Recommend" />
                )}
            </Stack>
        </Container>
    );
}

export default RecommendedCourses