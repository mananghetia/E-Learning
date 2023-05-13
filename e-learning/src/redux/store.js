import { configureStore } from '@reduxjs/toolkit';
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from './reducers/userReducer';
import { courseReducer } from './reducers/courseReducer';
import { adminReducer } from './reducers/adminReducer';
import { otherReducer } from './reducers/otherReducer';
import { recommendedCourseReducer } from './reducers/recommendedCourseReducer';
const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
    admin: adminReducer,
    other: otherReducer,
    recommendedCourse: recommendedCourseReducer
  },
});

export default store;

// export const server = 'http://localhost:4000/api/v1';
export const server = 'https://e-learning-2eqp.onrender.com/api/v1'
