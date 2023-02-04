import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
import config from '../config.js';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2client = new OAuth2(MAILING_SERVICE_CLIENT_ID, MAILING_SERVICE_CLIENT_SECRET, REDIRECT_URL)
oauth2client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
    expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
});

const send_Email = async (to, txt, otp) => {
    const access_token = await oauth2client.getAccessToken();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            accessToken: access_token
        },
    });
    const EmailOption = {
        from: SENDER_EMAIL_ADDRESS,
        to: to, // list of receivers
        subject: 'Market-Tech',
        html: ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Market Tech.</h2>
                <p>${txt}</p><p>${otp}</p>
                        
                <p>If the it doesn't work for any reason, return to website and ask for anthor otp code</p>
            
                </div>
        `,
    };
    transporter.sendMail(EmailOption, (err, info) => {
        if (err) return console.log(err.message);
        else
            return console.log(info.messageId)
    });
};

export default send_Email;
