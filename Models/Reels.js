import mongoose from 'mongoose';
const ReelsSchema = new mongoose.Schema(
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
        hiddenlikes: {
            type: Boolean,
            default: false,
        },
        turnoffcomments: {
            type: Boolean,
            default: false
        },
        numComments: {
            type: Number,
            default: 0
        },
        numLikes: {
            type: Number,
            default: 0
        },
        expireAt: {
            type: Date,
            default: Date.now(),
            expires: 60
        },
        likes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Users',
                required: true,
                default: []
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
                }, default: []
            },
        ],
        video: [
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
        ],
        reports: {
            select: false,
            type: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "user",
                },

            ],
        }
    },
    { timestamps: true }
);
ReelsSchema.index({ 'expireAt': 1, expireAfterSecond: 5 })
const Posts = mongoose.model('Posts', ReelsSchema);
export default Posts;