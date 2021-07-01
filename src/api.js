const express = require('express');
const bodyParser = require('body-parser');

const pdfService = require('./services/pdf-generation-service');
const mailService = require('./services/mail-sending-service');

const router = express.Router();
const parser = bodyParser.json();


router.post('/send/:template', parser, async (req, res) => {
    try {
        const attachments = [
            {
                filename: 'blank.pdf',
                content: await pdfService.createPdfFromTemplate(req.params.template, req.body.content, res)
            }
        ];
        await mailService.sendMail(req.body.email, 'Important subject', '', attachments);
    } catch (err) {
        res.status(500)
            .send(err.message)
            .end();
        return;
    }
    res.status(200)
        .send('success')
        .end();
});


module.exports = router;