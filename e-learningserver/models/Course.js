import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter Course Title"],
        minlength: [4, "Title must be at least 4 characters"],
        maxlength: [80, "Title can't exceeds 80 characters"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Course Description"],
        minlength: [4, "Description must be at least 4 characters"]
    },
    lectures: [
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            video: {
                public_id: {
                    type: String,
                    required: true,
                },
                url: {
                    type: String,
                    required: true,
                },
            }
        }
    ],
    poster: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    views: {
        type: Number,
        default: 0
    },
    numOfVideos: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: [true, "Enter Course Creator's Name"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Course = mongoose.model("Course", Schema)