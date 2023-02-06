import mongoose from 'mongoose';
const chatSchema = new mongoose.Schema(
    {
        members: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        }],
        lastMSG:{
            type:String
        }
    },
    { timestamps: true, minimize: false }
);
const Chat = mongoose.model('Chat', chatSchema);
export default Chat;