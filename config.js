import dotenv from 'dotenv';
dotenv.config();

const config = {
    MONGODB_URI: process.env.MONGODB_URI,
    Client_URL: process.env.Client_URL,
    NODE_ENV: process.env.NODE_ENV,
    REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_SCCESS: process.env.JWT_SCCESS,
    JWT_REFRESH: process.env.JWT_REFRESH,


    MAILING_SERVICE_CLIENT_ID: process.env.MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET: process.env.MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN: process.env.MAILING_SERVICE_REFRESH_TOKEN,
    MAILING_SERVICE_ACCESS_TOKEN: process.env.MAILING_SERVICE_ACCESS_TOKEN,
    SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,


    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,

}
export default config