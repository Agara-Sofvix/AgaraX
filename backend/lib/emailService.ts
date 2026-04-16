import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import * as path from 'path';

let transporterInstance: nodemailer.Transporter | null = null;
let isEthereal = false;

// Configure transporter with environment variables or use a dynamic test account
const getTransporter = async () => {
  // Always dynamically reload .env in case user changed it without restarting server!
  dotenv.config({ path: path.join(process.cwd(), '.env'), override: true });

  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST || 'smtp.gmail.com';
  const portString = process.env.SMTP_PORT || process.env.EMAIL_PORT;
  const port = portString ? parseInt(portString, 10) : 587;
  const secure = process.env.SMTP_SECURE === 'true' || process.env.EMAIL_SECURE === 'true';

  // If we have real credentials, always prioritize them
  if (user && pass) {
    // Only recreate if configuration changed
    if (!transporterInstance || isEthereal) {
      console.log(`[EmailService] Creating transporter for ${user}@${host}:${port}`);
      transporterInstance = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
      });
      isEthereal = false;
    }
    return { transporter: transporterInstance, isEthereal: false };
  }

  // If no credentials and we don't have a cached Ethereal account, create one
  if (!transporterInstance || !isEthereal) {
    console.log('\n[EmailService] No SMTP credentials found in .env. Generating a free test Ethereal account...');
    try {
      const testAccount = await nodemailer.createTestAccount();
      console.log(`[EmailService] Ethereal account created: ${testAccount.user}`);
      transporterInstance = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      isEthereal = true;
    } catch (testError) {
      console.error('[EmailService] Failed to create Ethereal account:', testError);
      throw testError;
    }
  }

  return { transporter: transporterInstance, isEthereal: true };
};

export const sendInterviewScheduledEmail = async (to: string, candidateName: string, roleTitle: string, interviewDate?: Date | string) => {
  // Ensure env is loaded before formatting the date
  dotenv.config({ path: path.join(process.cwd(), '.env'), override: true });
  const timeZone = process.env.APP_TIMEZONE || 'Asia/Kolkata'; // Fallback to IST if missing
  
  console.log(`[EmailService] Formatting date ${interviewDate} using timeZone: ${timeZone}`);

  const formattedDate = interviewDate 
    ? new Date(interviewDate).toLocaleString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: timeZone
      })
    : 'to be determined';

  console.log(`[EmailService] Resulting formattedDate: ${formattedDate}`);

  const mailOptions = {
    from: `"AgaraX Recruitment" <${process.env.SMTP_USER || process.env.EMAIL_USER || 'recruiting@agarax.test'}>`,
    to,
    subject: `Interview Invitation: ${roleTitle} | AgaraX Recruitment`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; color: #1e293b; line-height: 1.6;">
        <h2 style="color: #0f172a; font-size: 22px; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.025em;">Interview Invitation - AgaraX</h2>
        
        <p style="margin-bottom: 16px;">Dear ${candidateName},</p>
        
        <p style="margin-bottom: 16px;">Following our review of your application, we are pleased to invite you for a technical interview for the position of <strong>${roleTitle}</strong>.</p>
        
        <p style="margin-bottom: 24px;">This session is designed to evaluate your technical competency and professional alignment with the core values of AgaraX.</p>
        
        <div style="margin: 32px 0; padding: 24px; border-left: 4px solid #F97316; background-color: #f8fafc; border-radius: 0 12px 12px 0;">
          <p style="margin: 0 0 8px 0; color: #64748b; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">Scheduled Interview Time</p>
          <p style="margin: 0; font-size: 18px; font-weight: 700; color: #0f172a;">${formattedDate}</p>
        </div>
        
        <h3 style="color: #0f172a; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">Next Steps & Instructions</h3>
        <ul style="color: #475569; padding-left: 20px; margin-bottom: 24px;">
          <li style="margin-bottom: 8px;">A separate calendar invitation containing the secure meeting link will be shared with you shortly.</li>
          <li style="margin-bottom: 8px;">Please ensure a stable internet connection and a quiet environment for the duration of the call.</li>
          <li style="margin-bottom: 8px;">We recommend joining the session 5 minutes prior to the scheduled start time for a technical check.</li>
        </ul>
        
        <p style="margin-bottom: 32px;">Should you have any queries regarding this schedule or require a rescheduling, please feel free to reach out to our Talent Acquisition team by replying directly to this email.</p>
        
        <div style="border-top: 1px solid #e2e8f0; pt-24px; padding-top: 24px; font-size: 14px;">
          <p style="margin: 0; font-weight: 700; color: #0f172a;">Best Regards,</p>
          <p style="margin: 4px 0 0 0; color: #64748b;"><strong>Talent Acquisition Team</strong><br/>AgaraX</p>
        </div>
        
        <p style="font-size: 10px; color: #94a3b8; margin-top: 40px; text-align: center;">
          This is an automated communication from the AgaraX Recruitment Platform.
        </p>
      </div>
    `,
  };

  try {
    const { transporter, isEthereal } = await getTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('[EmailService] Email sent successfully: %s', info.messageId);
    
    // If using a test account, output the URL to preview the email exactly as the candidate would see it
    if (isEthereal) {
      console.log('\n' + '='.repeat(60));
      console.log('🚀 TEST EMAIL INTERCEPTED (ETHEREAL)');
      console.log('='.repeat(60));
      console.log(`SUBJECT: ${mailOptions.subject}`);
      console.log(`TO:      ${to}`);
      console.log('-'.repeat(60));
      console.log('👇 CLICK THE LINK BELOW TO VIEW THE ACTUAL EMAIL:');
      console.log(nodemailer.getTestMessageUrl(info));
      console.log('='.repeat(60) + '\n');
    }


    return info;
  } catch (error) {
    console.error('[EmailService] Error sending email:', error);
    throw error;
  }
};

export const sendInquiryNotification = async (data: { name: string, email: string, phone: string, service: string, message: string }) => {
  const mailOptions = {
    from: `"Agara Notifications" <${process.env.SMTP_USER || process.env.EMAIL_USER || 'system@agara.test'}>`,
    to: process.env.ADMIN_EMAIL || process.env.SMTP_USER || process.env.EMAIL_USER,
    subject: `New Business Inquiry from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h2 style="color: #2563EB;">New Service Inquiry</h2>
        <p>You have received a new inquiry from the website contact form.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #2563EB;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Interested In:</strong> ${data.service}</p>
        </div>

        <div style="margin: 20px 0;">
          <p><strong>Message:</strong></p>
          <div style="padding: 15px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 5px; font-style: italic;">
            ${data.message}
          </div>
        </div>
        
        <p style="font-size: 12px; color: #64748b; margin-top: 30px;">
          This is an automated notification from the AgaraX Platform.
        </p>
      </div>
    `,
  };

  try {
    const { transporter } = await getTransporter();
    const info = await transporter.sendMail(mailOptions);
    console.log('[EmailService] Inquiry notification sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('[EmailService] Error sending inquiry notification:', error);
    // Don't throw here to avoid failing the inquiry save if email fails
    return null;
  }
};
