const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ACCOUNT_NAME,
        pass: process.env.EMAIL_ACCOUNT_PASSWORD,
    },
});

const sendMail = (email, subject, content, attachments) => {
    return transporter.sendMail({
        to: email,
        subject: subject,
        text: content,
        attachments: attachments
    })
}

module.exports = {
    sendMail
}