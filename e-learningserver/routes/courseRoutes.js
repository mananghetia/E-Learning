import express from "express"
import { addLecture, deleteLecture, getAllCourses, createCourse, getCourseLectures, deleteCourse } from "../controllers/courseController.js"

import {
    authorizeAdmin,
    isAuthenticated,
    authorizeSubscribers,
} from "../middlewares/auth.js"

import singleUpload from "../middlewares/multer.js"
import { createRecommendation } from "../controllers/recommendationController.js"

const router = express.Router()

// Get All courses without lectures
router.route("/courses").get(getAllCourses)

// create new course - only admin
router
    .route("/createcourse")
    .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add lecture, Delete Course, Get Course Details
router
    .route("/course/:id")
    .get(isAuthenticated, authorizeSubscribers, getCourseLectures)
    .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
    .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// Create Recommendation based on User's Playlist
router.route("/recommend")
    .post(createRecommendation)

// Delete Lecture
router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture)

export default router
