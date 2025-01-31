const nodemailer = require("nodemailer");

function sendEmail({ recipient_email, subject, text, html }) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: process.env.SERVICE || "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mail_configs = {
      from: process.env.USER,
      to: recipient_email,
      subject: subject,
      text: text,  
      html: html,  
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if (error) {
        console.error("Erreur d'envoi email:", error);
        return reject({ message: "Erreur d'envoi email" });
      }
      console.log("Email envoyé avec succés");
      return resolve({ message: "Email envoyé avec succés" });
    });
  });
}

module.exports = sendEmail;
