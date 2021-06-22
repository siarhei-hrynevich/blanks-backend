const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const ejs = require("ejs");
const pdf = require("html-pdf");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ACCOUNT_NAME,
        pass: process.env.EMAIL_ACCOUNT_PASSWORD,
    },
});

const sendMail = (email, subject, content, attachments) => {
    transporter.sendMail({
        to: email,
        subject: subject,
        text: content,
        attachments: attachments
    })
}

const router = express.Router();
const parser = bodyParser.json();

const options = {
    height: "11.25in",
    width: "8.5in",
    header: {
        height: "20mm"
    },
    footer: {
        height: "20mm",
    },
};

const createPdfFromTemplate = async (template, params) => {
    return new Promise((resolve, reject) => ejs.renderFile(`./templates/${template}.ejs`, params, (err, data) => {
        if (err) reject(err);
        const result = pdf.create(data, options);
        result.toBuffer((err, data) => {
            if (err) reject(err);
            resolve(data)
        })
    }));
}

router.post('/send/:template', parser, async (req, res) => {
    const attachments = [
        {
            filename: 'blank.pdf',
            content: await createPdfFromTemplate(req.params.template, req.body.content)
        }
    ];
    sendMail(req.body.email, 'Important subject', '', attachments);
    res.end();
});


module.exports = router;
