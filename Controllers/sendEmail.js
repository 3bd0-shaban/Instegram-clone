import nodemailer from 'nodemailer';
import { google } from 'googleapis';
// const { OAuth2 } = google.auth;
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';

const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2client = new google.auth.OAuth2(
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS,
    REDIRECT_URL
);

const send_Email = async (to, url, txt) => {
    oauth2client.setCredentials({
        refresh_token: MAILING_SERVICE_REFRESH_TOKEN,
        expiry_date: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 7)
        // refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
    });
    const access_token = await oauth2client.getAccessToken();
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 465,
        secure: true,
        auth: {
            type: 'oAuth2',
            user: SENDER_EMAIL_ADDRESS,
            clientId: MAILING_SERVICE_CLIENT_ID,
            clientSecret: MAILING_SERVICE_CLIENT_SECRET,
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
            access_token
        },
    });
    const EmailOption = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: 'Instegram-Clone',
        html: ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DevAT channel.</h2>
                <p>Congratulations! You're almost set to start using DEVAT✮SHOP.
                    Just click the button below to validate your email address.
                </p>
                
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
            
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>${url}</div>
                </div>
        `,
    };
    transporter.sendMail(EmailOption, (err, info) => {
        if (err) return err;
        else return info;
    });
};

export default send_Email;
