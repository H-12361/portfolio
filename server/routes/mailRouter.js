import express from "express";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

router.post("/send", async (req, res) => {
  console.log("Received contact form submission:", req.body);

  try {
    const { name, email, message } = req.body;

    // ─── 1. Harshit ko notification email ───
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <div style="background-color: #1a1a1a; color: #ffffff; padding: 20px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px; letter-spacing: 1px;">New Portfolio Inquiry</h2>
        </div>
        <div style="padding: 25px; background-color: #ffffff; color: #333;">
          <p style="font-size: 16px; margin-bottom: 20px;">Hi Harshit, you have a new message from your portfolio site:</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
            <p style="margin: 5px 0;"><strong>👤 Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>📧 Email:</strong> <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a></p>
          </div>
          <div style="margin-top: 25px;">
            <p style="font-weight: bold; color: #1a1a1a; margin-bottom: 10px;">💬 Message Content:</p>
            <p style="line-height: 1.6; color: #555; background: #fffaf0; padding: 15px; border: 1px dashed #ffd700; border-radius: 8px;">
              ${message}
            </p>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; color: #777;">
          <p style="margin: 0;">Sent automatically from your MERN Backend</p>
          <p style="margin: 5px 0 0;">&copy; 2026 Harshit Tiwari Portfolio</p>
        </div>
      </div>
    `;

    // ─── 2. User ko confirmation email ───
    const userHtml = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #1e3a5f; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #060d1b 0%, #0a1628 100%); padding: 36px 30px; text-align: center; border-bottom: 2px solid #00d4aa;">
          <div style="display: inline-block; background: rgba(0,212,170,0.1); border: 1px solid rgba(0,212,170,0.35); border-radius: 8px; padding: 8px 16px; margin-bottom: 16px;">
            <span style="font-family: monospace; color: #00d4aa; font-weight: 700; font-size: 14px;">&lt;/&gt; Harshit Tiwari</span>
          </div>
          <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">Message Received!</h1>
          <p style="margin: 10px 0 0; color: #00d4aa; font-size: 14px; letter-spacing: 0.5px;">Thank you for reaching out ✨</p>
        </div>

        <!-- Body -->
        <div style="padding: 32px 30px; background-color: #0d1e38; color: #e2e8f0;">
          <p style="font-size: 16px; margin: 0 0 20px; color: #ccd6f6;">Hi <strong style="color: #00d4aa;">${name}</strong>,</p>
          
          <p style="font-size: 15px; line-height: 1.8; color: #8892a4; margin: 0 0 24px;">
            Your submission has been successfully recorded. Our team will contact you within <strong style="color: #e2e8f0;">24 hours</strong>.
          </p>

          <!-- Info box -->
          <div style="background: rgba(0,212,170,0.05); border: 1px solid rgba(0,212,170,0.2); border-radius: 10px; padding: 20px; margin-bottom: 28px;">
            <p style="margin: 0 0 12px; font-size: 12px; color: #00d4aa; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;">Your Message Summary</p>
            <p style="margin: 0; font-size: 14px; color: #8892a4; line-height: 1.7; font-style: italic;">"${message.length > 120 ? message.slice(0, 120) + "..." : message}"</p>
          </div>

          <!-- What's next -->
          <div style="margin-bottom: 28px;">
            <p style="margin: 0 0 14px; font-size: 13px; color: #00d4aa; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 700;">What happens next?</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${["Your message is safely stored in our system.", "Harshit will personally review your inquiry.", "You'll receive a reply within 24 hours."].map((step, i) => `
                <div style="display: flex; align-items: flex-start; gap: 12px; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; border: 1px solid rgba(255,255,255,0.06);">
                  <span style="min-width: 24px; height: 24px; background: rgba(0,212,170,0.15); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; color: #00d4aa; font-weight: 700;">${i + 1}</span>
                  <span style="color: #8892a4; font-size: 14px; line-height: 1.5;">${step}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-bottom: 8px;">
            <a href="mailto:${process.env.EMAIL_USER}" style="display: inline-block; background: #00d4aa; color: #060d1b; padding: 12px 32px; border-radius: 8px; font-weight: 700; font-size: 14px; text-decoration: none; letter-spacing: 0.5px;">
              Reply to this Email
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background: #060d1b; padding: 20px 30px; text-align: center; border-top: 1px solid rgba(255,255,255,0.06);">
          <p style="margin: 0 0 6px; color: #4a5568; font-size: 12px;">This is an automated confirmation. Please do not reply directly.</p>
          <p style="margin: 0; color: #2d3748; font-size: 11px;">&copy; ${new Date().getFullYear()} Harshit Tiwari &mdash; MERN Stack Developer</p>
        </div>
      </div>
    `;

    // ─── Send both emails in parallel ───
    await Promise.all([
      sendEmail({
        to: process.env.EMAIL_USER,
        subject: `🚀 Portfolio Lead: ${name}`,
        html: adminHtml,
      }),
      sendEmail({
        to: email,
        subject: `We received your message, ${name}! 🚀`,
        html: userHtml,
      }),
    ]);

    res.status(200).json({
      success: true,
      message: "Emails sent successfully",
    });

  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export default router;