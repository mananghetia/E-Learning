import { createReducer } from '@reduxjs/toolkit';
export const recommendedCourseReducer = createReducer(
    { courses: [], lectures: [] },
    {
        RecommendedCoursesRequest: state => {
            state.loading = true;
        },
        RecommendedCoursesSuccess: (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        },
        RecommendedCoursesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearError: state => {
            state.error = null;
        },
        clearMessage: state => {
            state.message = null;
        },
    }
);
