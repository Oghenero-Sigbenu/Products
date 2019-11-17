const nodeMailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
const path = require("path");

const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
    if (err) {
      throw err;
      callback(err);
    }
    else {
      callback(null, html);
    }
  });
};

const smtpMailer = nodeMailer.createTransport(smtpTransport({
  host: process.env.SMTP_HOST,
  secure: process.env.SMTP_SECURE,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
}));

exports.welcomeMail = (req, res, next) => {
  readHTMLFile(path.join(__dirname, '../templates/', 'welcome.html'), function (err, html) {
    var template = handlebars.compile(html);
    var replacements = {
      username: req.body.username
    };
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: {
        name: 'noreply',
        address: 'noreply@netfreaks.com'
      },

      to: req.body.email,
      subject: 'Welcome to Netfreaks',
      html: htmlToSend
    };
    smtpMailer.sendMail(mailOptions, function (error, response) {
      if (error) {
        console.log(error);
        // callback(error);
      } else {
        console.log(response);
      }
    });
  });
}
