const nodemailer = require('nodemailer');
//const smtpTransport = require('nodemailer-smtp-transport'); // Only if using SMTP transport

// Create a transporter using SMTP transport (example)
// const transporter = nodemailer.createTransport(
//     smtpTransport({
//         host: 'smtp.gmail.com',
//         port: 465,
//         auth: {
//             user: 'aamustedSupervisors@gmail.com',
//             pass: 'aamusted123',
//         },
//     })
// );


const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your password
    }

});
// Function to send an email
const sendEmail = (toEmail, subject, content) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Your email
        to: toEmail,
        subject: subject,
        text: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendEmail;
