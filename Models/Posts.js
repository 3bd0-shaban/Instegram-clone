import mongoose from 'mongoose';
const postsSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'Users',
            required: true
        },
        des: {
            type: String,
            max: 2200
        },
        location: {
            type: String,
            default: '',
            max: 50
        },
        likesnumber: {
            type: Number,
            default: 0
        },
        commentsnumber: {
            type: Number,
            default: 0
        },
        hiddenlikes: {
            type: Boolean,
            default: false,
        },
        turnoffcomments: {
            type: Boolean,
            default: false
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Users',
                    required: true
                }
            },
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.ObjectId,
                    ref: 'Users',
                    required: true
                }, comment: {
                    type: String,
                }, time: {
                    type: Date,
                    default: Date.now()
                },
            },
        ],
        images: [
            {
                public_id: {
                    type: String,
                    required: [true, 'The Product image is Required'],
                },
                imageDes: {
                    type: String,
                    default: ''
                },
                url: {
                    type: String,
                    required: [true, 'The Product image is Required'],
                }
            }
        ]
    },
    { timestamps: true }
);
const Posts = mongoose.model('Posts', postsSchema);
export default Posts;