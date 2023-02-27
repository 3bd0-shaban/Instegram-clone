import mongoose from 'mongoose';
const NotifySchema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ['like', 'comment', 'follow', 'post'],
        },
        isRead: {
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
const Notifies = mongoose.model('Notifies', NotifySchema);
export default Notifies;