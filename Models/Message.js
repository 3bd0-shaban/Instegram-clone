import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        reciever: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        msg: {
            type:String
        },
    },
    { timestamps: true, minimize: false }
);
const Message = mongoose.model('Message', messageSchema);
export default Message;