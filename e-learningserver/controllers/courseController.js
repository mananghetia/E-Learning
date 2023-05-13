import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Course } from "../models/Course.js"
import getDataUri from "../utils/dataUri.js"
import ErrorHandler from "../utils/errorHandler.js"
import cloudinary from "cloudinary"
import { Stats } from "../models/Stats.js"

export const getAllCourses = catchAsyncError(async (req, res, next) => {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
    const courses = await Course.find({
        title: {
            $regex: keyword,
            $options: "i",
        },
        category: {
            $regex: category,
            $options: "i",
        },
    }).select("-lectures");
    res.status(200).json({
        success: true,
        courses,
    });
});

export const createCourse = catchAsyncError(async (req, res, next) => {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy) {
        return next(new ErrorHandler("Please add all fields", 400))
    }

    const file = req.file

    const fileUri = getDataUri(file)

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, { folder: "elearning", });

    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    })

    res.status(201).json({
        success: true,
        message: "Course Created Successfully. You can add lectures now.",
    })
})

export const getCourseLectures = catchAsyncError(async (req, res, next) => {
    const course = await Course.findById(req.params.id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    course.views += 1;

    await course.save();

    res.status(200).json({
        success: true,
        lectures: course.lectures,
    });
});

// // Max video size 100mb
export const addLecture = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    const file = req.file;
    const fileUri = getDataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content, {
        resource_type: "video",
        folder: "elearning"
    });

    course.lectures.push({
        title,
        description,
        video: {
            public_id: mycloud.public_id,
            url: mycloud.secure_url,
        },
    });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture added in Course",
    });
});

export const deleteCourse = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return next(new ErrorHandler("Course not found", 404));

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for (let i = 0; i < course.lectures.length; i++) {
        const singleLecture = course.lectures[i];
        await cloudinary.v2.uploader.destroy(singleLecture.video.public_id, {
            resource_type: "video",
        });
    }

    await course.remove();

    res.status(200).json({
        success: true,
        message: "Course Deleted Successfully",
    });
});

export const deleteLecture = catchAsyncError(async (req, res, next) => {
    const { courseId, lectureId } = req.query;

    const course = await Course.findById(courseId);
    if (!course) return next(new ErrorHandler("Course not found", 404));

    const lecture = course.lectures.find((item) => {
        if (item._id.toString() === lectureId.toString()) return item;
    });
    await cloudinary.v2.uploader.destroy(lecture.video.public_id, {
        resource_type: "video",
    });

    course.lectures = course.lectures.filter((item) => {
        if (item._id.toString() !== lectureId.toString()) return item;
    });

    course.numOfVideos = course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture Deleted Successfully",
    });
});

Course.watch().on("change", async () => {
    let stat_size = await Stats.countDocuments();
    if (stat_size === 0)
        await Stats.create({});


    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(1);

    const courses = await Course.find({});

    let totalViews = 0;

    for (let i = 0; i < courses.length; i++) {
        totalViews += courses[i].views;
    }
    stats[0].views = totalViews;
    stats[0].createdAt = new Date(Date.now());

    await stats[0].save();
});
