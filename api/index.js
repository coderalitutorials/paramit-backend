



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://paramit-frontend.vercel.app",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server is running");
});














app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, postcode, service, message } = req.body;

    if (!name || !phone || !postcode || !message || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, email, phone number, postcode and message are required",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      replyTo: email,
      subject: `🚨 New Lead: ${service || "Contact Form Submission"}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Job Submission</title>
          <style>
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            @media screen and (max-width: 600px) {
              .email-container { width: 100% !important; max-width: 100% !important; padding: 10px !important; }
              .content-wrapper { padding: 25px 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 40px 10px; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div class="email-container" style="max-width: 500px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4); border: 1px solid #334155;">
            
            <div style="background: linear-gradient(135deg, #801E59 0%, #5c123f 100%); padding: 35px 20px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 10px; color: #ffffff;">📩</div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.025em;">New Enquiry<br>Received</h1>
            </div>

            <div class="content-wrapper" style="padding: 30px 25px; color: #cbd5e1;">
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #ffffff;">Hello Paramit Services Team,</p>
              <p style="margin: 0 0 25px 0; font-size: 14px; color: #94a3b8;">A new enquiry has been submitted through your website. Here are the details:</p>
              
              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Name</td>
                    <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">${name}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Email</td>
                    <td style="color: #38bdf8; font-size: 14px; font-weight: 600; text-align: right; word-break: break-all;">
                      <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Postcode</td>
                    <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right; text-transform: uppercase;">${postcode}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Phone Number</td>
                    <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">
                      <a href="tel:${phone}" style="color: #ffffff; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 24px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Service</td>
                    <td style="color: #34d399; font-size: 14px; font-weight: 700; text-align: right;">${service || "Not selected"}</td>
                  </tr>
                </table>
              </div>

              <div style="margin-top: 20px;">
                <h4 style="margin: 0 0 10px 0; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Message Details</h4>
                <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #cbd5e1; font-style: italic;">
                  "${message}"
                </div>
              </div>

              <p style="margin: 30px 0 0 0; font-size: 13px; color: #64748b; font-style: italic; text-align: center;">Please review and respond to this lead as soon as possible.</p>
            </div>

            <div style="padding: 20px; background-color: #0f172a; text-align: center; border-top: 1px solid #334155;">
              <p style="margin: 0; font-size: 11px; color: #475569;">Automated notification system for Paramit Services.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({
      success: false,
      message: "Email sending failed",
    });
  }
});

app.post("/api/callback", async (req, res) => {
  try {
    const { name, postcode, phone } = req.body;

    if (!name || !postcode || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, postcode, and phone number are required for call back",
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `📞 Quick Call Back Request from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Call Back Requested</title>
          <style>
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            @media screen and (max-width: 600px) {
              .email-container { width: 100% !important; max-width: 100% !important; padding: 10px !important; }
              .content-wrapper { padding: 25px 15px !important; }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 40px 10px; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div class="email-container" style="max-width: 500px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4); border: 1px solid #334155;">
            
            <div style="background: linear-gradient(135deg, #801E59 0%, #5c123f 100%); padding: 35px 20px; text-align: center;">
              <div style="font-size: 36px; margin-bottom: 10px; color: #ffffff;">📞</div>
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.025em;">Call Back<br>Requested</h1>
            </div>

            <div class="content-wrapper" style="padding: 30px 25px; color: #cbd5e1;">
              <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #ffffff;">Hello Paramit Services Team,</p>
              <p style="margin: 0 0 25px 0; font-size: 14px; color: #94a3b8;">A user requested an immediate call back through the Home Page. Here are the details:</p>
              
              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Name</td>
                    <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right;">${name}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Postcode</td>
                    <td style="color: #ffffff; font-size: 14px; font-weight: 600; text-align: right; text-transform: uppercase;">${postcode}</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #0f172a; padding: 14px 18px; margin-bottom: 10px; border-radius: 6px; border: 1px solid #334155;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="color: #94a3b8; font-size: 14px; font-weight: 500; width: 35%;">Phone Number</td>
                    <td style="color: #38bdf8; font-size: 14px; font-weight: 600; text-align: right;">
                      <a href="tel:${phone}" style="color: #38bdf8; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <p style="margin: 30px 0 0 0; font-size: 13px; color: #64748b; font-style: italic; text-align: center;">Please respond to this call back request within 1 hour.</p>
            </div>

            <div style="padding: 15px; background-color: #0f172a; text-align: center; border-top: 1px solid #334155;">
              <p style="margin: 0; font-size: 11px; color: #475569;">Automated call-back system for Paramit Services.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    res.status(200).json({ success: true, message: "Call back request sent successfully!" });
  } catch (error) {
    console.error("Callback Email Error:", error);
    res.status(500).json({ success: false, message: "Email sending failed" });
  }
});









const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



export default app;