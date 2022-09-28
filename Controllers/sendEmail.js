import nodemailer from 'nodemailer';
import { google } from 'googleapis';
const { OAuth2 } = google.auth;
const OUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const sendEmail = () => {
    const {
        MAILING_SERVICE_CLIENT_ID,
        MAILING_SERVICE_CLIENT_SECRET,
        MAILING_SERVICE_REFRESH_TOKEN,
        SENDER_EMAIL_ADDRESS
    } = process.env

    const oauth2client = new OAuth2(
        MAILING_SERVICE_CLIENT_ID,
        MAILING_SERVICE_CLIENT_SECRET,
        MAILING_SERVICE_REFRESH_TOKEN,
        SENDER_EMAIL_ADDRESS,
        OUTH_PLAYGROUND
    )

    const send_Email = (to, url) => {
        oauth2client.setCredentials({
            refreshToken: MAILING_SERVICE_REFRESH_TOKEN
        })
        const accessToken = oauth2client.getAccessToken();
        const smtpTransport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'oAuth2',
                user: SENDER_EMAIL_ADDRESS,
                clientId: MAILING_SERVICE_CLIENT_ID,
                clientSecret: MAILING_SERVICE_CLIENT_SECRET,
                refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
                accessToken
            }
        })
        const EmailOption = {
            from: SENDER_EMAIL_ADDRESS,
            to: to,
            subject: "Instegram-Clone",
            html:
                ` <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
                <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the DevAT channel.</h2>
                <p>Congratulations! You're almost set to start using DEVAT✮SHOP.
                    Just click the button below to validate your email address.
                </p>
                
                <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
            
                <p>If the button doesn't work for any reason, you can also click on the link below:</p>
            
                <div>${url}</div>
                </div>
        `
        }
        smtpTransport.sendMail(EmailOption, (err, infor) => {
            if (err) return err;
            return infor
        })
    }
}

export default sendEmail;