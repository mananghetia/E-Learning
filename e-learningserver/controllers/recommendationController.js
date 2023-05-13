import { Course } from "../models/Course.js"
import { User } from "../models/User.js";

import jwt from "jsonwebtoken";
import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import ContentBasedRecommender from "content-based-recommender"

export const createRecommendation = catchAsyncError(async (req, res, next) => {
    const limit = 3
    const { token } = req.cookies;
    //if not logged in then recommend topmost viewed lecture
    if (!token) {
        const courses = await Course.find({}).sort({ "views": -1 }).limit(limit)
        res.status(201).json({
            success: true,
            message: "Not Logged In",
            courses
        })
        return
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id)
    if (user === undefined || user.playlist.length === 0) {
        const courses = await Course.find({}).sort({ "views": -1 }).limit(limit)
        res.status(201).json({
            success: true,
            message: "Empty Playlist",
            courses
        })
        return
    }
    const allCourses = await Course.find()

    const documents = []
    allCourses.forEach((ele) => {
        documents.push({ id: ele._id.valueOf(), content: ele.title + " " + ele.category + " " + ele.description + " " + ele.createdBy })
    })
    const recommender = new ContentBasedRecommender({
        maxSimilarDocuments: 100,
    })
    await recommender.train(documents)

    //content based recommendation based on courses placed in user playlist
    var score = new Map()
    user.playlist.forEach((ele) => {
        const id = ele.course.valueOf()
        const similarDocuments = recommender.getSimilarDocuments(id, 0, 10)
        similarDocuments.forEach((row) => {
            const rid = row.id.valueOf()
            score.set(rid, (score.get(rid) || 0) + row.score)
            // score[row.id] = (score[row.id] || 0) + row.score
        })
    })
    //not recommending which are already in playlist
    user.playlist.forEach(ele => {
        const id = ele.course.valueOf()
        score.delete(id)
    })
    //sorting based on value of Score
    var sortedScore = new Map([...score].sort((a, b) => b[1] - a[1]));
    //extracting topmost based on Score
    var topSortedScore = new Map([...sortedScore.entries()].slice(0, Math.min(...[sortedScore.size, limit])))
    const ids = [...topSortedScore.keys()]
    const courses = await Course.find({ _id: { $in: ids } }).sort({ "views": -1 })
    res.status(201).json({
        success: true,
        message: "Based on playlist",
        courses
    })

})

//route are implemented in courseRoutes.js