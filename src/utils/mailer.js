import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendRegistrationMail = async (email, name) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Registration Successful",
    html: `<p>Hello ${name},<br>Your account has been created successfully!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Email Error:", err);
  }
};
export const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It will expire in 10 minutes.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("OTP Email Error:", err);
  }
};

export const sendPasswordUpdatedMail = async (email, name) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Updated Successfully",
    html: `<p>Hello ${name},<br>Your password has been updated successfully.</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log("Password Updated Email Error:", err);
  }
};
