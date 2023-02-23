import { asyncHandler } from '../Middlewares/asyncErrorHandler.js';
import Chat from '../Models/Chat.js';
import Message from '../Models/Message.js';
import ErrorHandler from '../Utils/ErrorHandler.js';
import Features from '../Utils/Features.js';
import cloudinary from './../Utils/cloudinary.js';

export const new_MSG = asyncHandler(async (req, res, next) => {
    const { msg, image } = req.body;
    let result = {}
    if (image) {
        const newIMG = await cloudinary.uploader.upload(image, {
            folder: "Instegram/MesssgesMedia",
        });
        result = newIMG;
    }
    const chat = await new Message({
        chatId: req.params.id, sender: req.user.id, msg,
        image: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    }).save()

    if (chat) {
        await Chat.findByIdAndUpdate({ _id: req.params.id },
            { lastMSG: msg },
            { new: true })
        return res.json(chat);
    }
    return next(new ErrorHandler(err.message, 404));
});

export const get_MSGs = asyncHandler(async (req, res, next) => {
    const resultperpage = 20;
    const features = new Features(Message.find({ chatId: req.params.id }), req.query)
        .Pagination(resultperpage)
    const MSGs = await features.query.sort('-createdAt')
    // const MSGs = arr.reverse();
    return res.json(MSGs)
});