import { server } from '../store';
import axios from 'axios';

export const createRecommendationCourses = () => async dispatch => {
    try {
        dispatch({ type: 'RecommendedCoursesRequest' });
        const { data } = await axios.post(
            `${server}/recommend`, {},
            {
                headers: {
                    'Content-type': 'application/json',
                },

                withCredentials: true,
            }
        );

        dispatch({ type: 'RecommendedCoursesSuccess', payload: data.courses });
    } catch (error) {
        dispatch({
            type: 'RecommendedCoursesFail',
            payload: error.response.data.message,
        });
    }
};