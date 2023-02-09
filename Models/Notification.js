import mongoose from 'mongoose';
const NotificationShema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['like', 'comment', 'follow', 'post'],
        },
        read: {
            type: Boolean,
            default: false,
        },
        sender: {
            type: mongoose.Types.ObjectId,
            ref: 'Users'
        },
        receiver: {
            type: mongoose.Types.ObjectId,
            ref: 'Users'
        },
        post: {
            type: mongoose.Types.ObjectId,
            ref: 'Posts'
        },
        comment: {
            type: mongoose.Types.ObjectId,
            ref: 'Comments'
        },
    },
    { timestamps: true, minimize: false }
);
const Notification = mongoose.model('Notification', NotificationShema);
export default Notification;