const ejs = require('ejs');
const pdf = require('html-pdf');

const createPdfFromTemplate = async (template, params) => {
    return new Promise((resolve, reject) => ejs.renderFile(`./templates/${template}.ejs`, params, (err, html) => {
        if (err) reject(err);
        const options = {
            orientation: 'portrait'
        };
        pdf.create(html, options).toFile('out.pdf', () => { resolve('') });
        //     .toStream((err, stream) => {
        //     if (err) reject(err);
        //     resolve(stream);
        // })
    }));
}

module.exports = {
    createPdfFromTemplate
}
