const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (toEmail, userName) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Your App Team" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to Our Platform 🎉",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Hello ${userName},</h2>
        <p>Welcome to <strong>Our Platform</strong>! We’re excited to have you on board.</p>
        <p>Your account has been successfully created. You can now explore all our features and services.</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <br/>
        <p>Best regards,</p>
        <p><strong>The Our Platform Team</strong></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendWelcomeEmail;
