# EmailJS Setup Guide - Contact Form Integration

## 📧 Setting Up Email Functionality

Your contact form is now configured to send emails to **fijaichurchofchrist@gmail.com** using EmailJS. Follow these steps to complete the setup.

---

## 🚀 Step-by-Step Setup

### Step 1: Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's free!)
3. Create an account using your email or Google/GitHub login

---

### Step 2: Add an Email Service

1. Once logged in, go to **"Email Services"** in the left sidebar
2. Click **"Add New Service"**
3. Select **"Gmail"** (recommended) or another email provider
4. Click **"Connect Account"**
5. Sign in with your Gmail account: **fijaichurchofchrist@gmail.com**
6. Give it a name like "Church Contact Form"
7. Copy the **Service ID** (you'll need this later) service_z1zjk0d
8. Click **"Create Service"**

---

### Step 3: Create an Email Template

1. Go to **"Email Templates"** in the left sidebar
2. Click **"Create New Template"**
3. Use this template structure:

**Subject Line:**
```
New {{request_type}} from {{from_name}}
```

**Email Body:**
```
You have received a new message from your church website contact form.

From: {{from_name}}
Email: {{from_email}}
Message Type: {{request_type}}

Message:
{{message}}

---
This message was sent from the Church of Christ Fijai website contact form.
Reply to: {{from_email}}
```

4. Click **"Save"**
5. Copy the **Template ID** (you'll need this)

---

### Step 4: Get Your Public Key

1. Go to **"Account"** in the left sidebar
2. Under **"General"** tab, find your **Public Key**
3. Copy it (you'll need this)

---

### Step 5: Update Your Website Code

Now you need to add your EmailJS credentials to the website:

1. Open the file: `src/components/Connect.jsx`
2. Find these lines (around line 43-45):

```javascript
const serviceID = 'YOUR_SERVICE_ID';
const templateID = 'YOUR_TEMPLATE_ID';
const publicKey = 'YOUR_PUBLIC_KEY';
```

3. Replace them with your actual values:

```javascript
const serviceID = 'service_xxxxxxx';  // Your Service ID from Step 2
const templateID = 'template_xxxxxxx'; // Your Template ID from Step 3
const publicKey = 'xxxxxxxxxxxxxxx';   // Your Public Key from Step 4
```

---

## 🔧 Configuration File Method (Recommended)

For better security, create a configuration file:

### Option 1: Environment Variables (Best Practice)

1. Create a file called `.env` in your project root:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ID=template_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

2. Update `Connect.jsx` to use environment variables:

```javascript
const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
```

3. Add `.env` to your `.gitignore` file (it's already there by default)

### Option 2: Config File

1. Create `src/config/emailConfig.js`:

```javascript
export const emailConfig = {
  serviceID: 'service_xxxxxxx',
  templateID: 'template_xxxxxxx',
  publicKey: 'xxxxxxxxxxxxxxx',
};
```

2. Update `Connect.jsx`:

```javascript
import { emailConfig } from '../config/emailConfig';

// Then in handleSubmit:
const { serviceID, templateID, publicKey } = emailConfig;
```

---

## ✅ Testing Your Contact Form

1. Save all changes
2. Restart your development server (if needed)
3. Go to http://localhost:3005
4. Navigate to the **Connect** section
5. Fill out the form with test data
6. Click **"Send Message"**
7. Check your email at **fijaichurchofchrist@gmail.com**

---

## 📊 EmailJS Free Tier Limits

EmailJS free plan includes:
- ✅ **200 emails per month**
- ✅ **Unlimited templates**
- ✅ **2 email services**
- ✅ **No credit card required**

For more emails, you can upgrade to a paid plan.

---

## 🔒 Security Notes

### Important Security Tips:

1. **Never commit credentials to GitHub:**
   - Use `.env` files
   - Add `.env` to `.gitignore`
   - Use environment variables in production

2. **EmailJS Public Key is safe to expose:**
   - The public key is meant to be used in frontend code
   - EmailJS validates requests through browser origin
   - No sensitive data is exposed

3. **Add Domain Restrictions (Recommended):**
   - In EmailJS dashboard, go to your service
   - Add your domain to **"Allowed Origins"**
   - This prevents unauthorized use

---

## 🎨 What Happens When Someone Submits the Form

1. User fills out the contact form
2. Form data is sent to EmailJS
3. EmailJS sends an email to **fijaichurchofchrist@gmail.com**
4. You receive the message with:
   - Sender's name
   - Sender's email
   - Message content
   - Whether it's a prayer request or general message
5. You can reply directly to the sender's email

---

## 🐛 Troubleshooting

### Form Not Sending?

**Check Console Errors:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages

**Common Issues:**

1. **Invalid Credentials:**
   - Double-check Service ID, Template ID, and Public Key
   - Make sure there are no extra spaces

2. **CORS Error:**
   - Add your domain to EmailJS allowed origins
   - Clear browser cache

3. **Template Error:**
   - Check that template variable names match
   - Variables: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{request_type}}`

4. **Gmail Blocking:**
   - Check Gmail spam folder
   - Ensure Gmail account is connected properly in EmailJS

### Still Not Working?

1. Check EmailJS dashboard for error logs
2. Verify your email service is active
3. Test with EmailJS dashboard's built-in testing tool
4. Contact EmailJS support if needed

---

## 📱 Auto-Reply (Optional Enhancement)

You can set up an auto-reply to let visitors know you received their message:

1. Create a second template in EmailJS
2. Subject: "Thank you for contacting Church of Christ Fijai"
3. Body:
```
Dear {{from_name}},

Thank you for reaching out to Church of Christ Fijai. We have received your message and will get back to you as soon as possible.

In the meantime, feel free to contact us directly at:
Phone: +233 20 192 6565 or +233 24 323 2616
Email: fijaichurchofchrist@gmail.com

God bless you!

Church of Christ Fijai Team
```

4. Send two emails in your code (one to church, one to sender)

---

## 🔄 Testing Checklist

Before going live, test:

- [ ] Form validation works (required fields)
- [ ] Email sends successfully
- [ ] You receive the email at fijaichurchofchrist@gmail.com
- [ ] Success message displays
- [ ] Form resets after submission
- [ ] Prayer request checkbox works
- [ ] Error handling works (test by entering wrong credentials)
- [ ] Mobile view works correctly

---

## 💰 Cost Considerations

**Free Forever Option:**
- EmailJS: 200 emails/month (free)
- Perfect for most small churches

**If You Exceed 200 Emails:**
- EmailJS Personal: $7/month (1,000 emails)
- EmailJS Business: $15/month (10,000 emails)

**Alternative Services:**
- FormSpree: Free tier available
- SendGrid: Free tier (100 emails/day)
- Mailgun: Pay as you go

---

## 📞 Support

If you need help with setup:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Review this guide
3. Check browser console for errors
4. Contact your web developer

---

## ✨ Your Form is Ready!

Once you complete the setup steps above, your contact form will be fully functional and will send emails directly to **fijaichurchofchrist@gmail.com**.

**Next Steps:**
1. Complete EmailJS setup (Steps 1-5)
2. Test the form thoroughly
3. Deploy your website
4. Start receiving messages from your congregation!

---

**Need Help?** The form is configured and ready to go. Just add your EmailJS credentials and you're all set!
