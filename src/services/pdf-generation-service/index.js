const ejs = require('ejs');
const pdf = require('html-pdf');

const createPdfFromTemplate = async (template, params, res) => {
    return new Promise((resolve, reject) => ejs.renderFile(`./templates/${template}.ejs`, params, (err, html) => {
        if (err) reject(err);
        const options = {
            orientation: 'portrait',
            border: {
                top: "2cm",
                right: "1cm",
                bottom: "cm",
                left: "1.5cm"
            }
        }
        res.send(html)
        pdf.create(html, options)
            .toStream((err, stream) => {
            if (err) reject(err);
            resolve(stream);
        })
    }));
}

module.exports = {
    createPdfFromTemplate
}
