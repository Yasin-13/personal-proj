const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'trivinsaitechnodemailer@gmail.com',
    pass: 'nzlo jvwl fhnv wcdg' 
  }
});

const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: 'trivinsaitechnodemailer@gmail.com',
    to,
    subject,
    html 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendMail;