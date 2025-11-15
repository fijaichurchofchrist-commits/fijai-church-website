# EmailJS Setup Guide - Send Newsletters from Your Website

This guide will help you set up EmailJS so you can send newsletters directly from your admin panel.

**Time required:** ~15 minutes
**Cost:** FREE (up to 200 emails/month)

---

## Overview

Once set up, you'll be able to:
- ✅ Send newsletters to all subscribers
- ✅ Manage subscribers from admin panel
- ✅ Track email delivery
- ✅ No backend server needed
- ✅ Send from your church email address

---

## Part 1: Create EmailJS Account (5 minutes)

### Step 1: Sign Up

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click **"Sign Up Free"** button
3. Sign up with:
   - **Email:** Your church email (fijaichurchofchrist@gmail.com)
   - **Password:** Create a strong password
4. Check your email and **verify your account**

### Step 2: Connect Your Email Service

1. After logging in, you'll see the dashboard
2. Click **"Email Services"** in the left sidebar
3. Click **"Add New Service"** button
4. Choose your email provider:
   - **Gmail** (recommended if using Gmail)
   - **Outlook**
   - **Yahoo**
   - Or any other provider

#### For Gmail:

1. Select **"Gmail"**
2. Click **"Connect Account"**
3. Sign in with your church Gmail account
4. Allow EmailJS to send emails on your behalf
5. Your service is now connected!

#### For Other Email Providers:

1. Select your provider
2. Enter your SMTP credentials:
   - SMTP Server
   - Port
   - Username (your email)
   - Password (email password or app password)
3. Click **"Create Service"**

### Step 3: Save Your Service ID

After connecting your email:

1. You'll see your service listed
2. Copy the **Service ID** (looks like: `service_abc123xyz`) service_z1zjk0d
3. **SAVE THIS!** Write it down:
   ```
   Service ID: ______________service_z1zjk0d___________________
   ```

---

## Part 2: Create Email Template (5 minutes)

### Step 4: Create Template

1. Click **"Email Templates"** in the left sidebar
2. Click **"Create New Template"** button
3. You'll see the template editor

### Step 5: Configure Template

**Template Settings:**

1. **Template Name:** `church_newsletter`
2. **Subject:** Use this exact text:
   ```
   {{subject}}
   ```
3. **Content (Body):** Use this exact text:
   ```
   Hello,

   {{message}}

   ---

   Best regards,
   {{from_name}}
   Church of Christ Fijai

   I19 Nana Owuo St, Fijai
   Takoradi, Ghana
   Phone: +233 20 192 6565
   Email: fijaichurchofchrist@gmail.com

   ---

   You are receiving this email because you subscribed to our newsletter.
   ```

4. **To Email:** Use this exact text:
   ```
   {{to_email}}
   ```

5. **From Name:**
   ```
   Church of Christ Fijai
   ```

6. **Reply To:**
   ```
   fijaichurchofchrist@gmail.com
   ```

### Step 6: Save Template

1. Click **"Save"** button at the top
2. You'll see your template in the list
3. Copy the **Template ID** (looks like: `template_xyz789abc`) template_kauceed
4. **SAVE THIS!** Write it down:
   ```
   Template ID: ______________template_kauceed___________________
   ```

---

## Part 3: Get Your Public Key (2 minutes)

### Step 7: Find Public Key

1. Click **"Account"** in the left sidebar
2. Scroll down to **"API Keys"** section
3. You'll see your **Public Key** (looks like: `user_abc123xyz`)
4. Click **"Copy"** button
5. **SAVE THIS!** Write it down:
   ```
   Public Key: ___________BUTwi-_6ltjFqkiEp______________________
   ```

---

## Part 4: Add Credentials to Your Website (3 minutes)

### Step 8: Update Environment Variables

1. Open your project folder: `/Users/felixofori/Desktop/Fijaicoc/fijai-church`
2. Open the `.env.local` file
3. Add these three lines at the end:

```bash
# EmailJS Configuration (for Newsletter Admin)
REACT_APP_EMAILJS_SERVICE_ID = service_z1zjk0d
REACT_APP_EMAILJS_TEMPLATE_ID = template_kauceed
REACT_APP_EMAILJS_PUBLIC_KEY = BUTwi-_6ltjFqkiEp
```

**Replace with YOUR actual values:**

```bash
# EmailJS Configuration (for Newsletter Admin)
REACT_APP_EMAILJS_SERVICE_ID=service_abc123xyz
REACT_APP_EMAILJS_TEMPLATE_ID=template_xyz789abc
REACT_APP_EMAILJS_PUBLIC_KEY=user_abc123xyz
```

4. **Save** the file

### Step 9: Restart Your Server

Since environment variables only load on startup:

1. Stop your current server (press `Ctrl+C` in terminal)
2. Restart with: `PORT=3005 npm start`
3. Wait for the server to start

---

## Part 5: Test Your Setup (5 minutes)

### Step 10: Access Admin Panel

1. Go to: http://localhost:3005/newsletter-admin
2. You'll see a login screen
3. **Default password:** `fijai2024`
4. Click **"Login"**

### Step 11: Send Test Newsletter

1. You should see your subscribers list
2. In the "Send Newsletter" section:
   - **Subject:** `Test Newsletter`
   - **Message:** `This is a test email to verify our newsletter system is working correctly. If you receive this, everything is set up properly!`
3. Click **"Send Newsletter"**
4. You should see: "Newsletter sent! X successful, 0 failed."

### Step 12: Check Your Email

1. Check your inbox (or the test email you used)
2. You should receive the newsletter within 1-2 minutes
3. Verify the email looks correct

---

## ✅ Success Checklist

After completing all steps:

- [ ] EmailJS account created and verified
- [ ] Email service connected (Gmail/Outlook/etc.)
- [ ] Service ID copied
- [ ] Email template created with correct format
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] All three IDs added to `.env.local`
- [ ] Server restarted
- [ ] Accessed admin panel at `/newsletter-admin`
- [ ] Sent test newsletter successfully
- [ ] Received test email

---

## 🎉 You're Done!

You can now send newsletters to your congregation!

### How to Send Newsletters:

1. **Access Admin Panel:**
   - Go to: http://localhost:3005/newsletter-admin
   - Enter password: `fijai2024`

2. **View Subscribers:**
   - See all newsletter subscribers
   - Export emails to CSV
   - Copy all emails to clipboard

3. **Send Newsletter:**
   - Write your subject line
   - Compose your message
   - Click "Send Newsletter"
   - All subscribers receive the email instantly!

---

## 📝 Tips for Great Newsletters

### Subject Lines:
- Keep it under 50 characters
- Be specific and clear
- Create urgency or curiosity
- Examples:
  - "This Sunday: Special Guest Speaker"
  - "Don't Miss Our Youth Fellowship Event"
  - "Weekly Update: What's Happening at Church"

### Message Content:
- Start with a warm greeting
- Keep paragraphs short (2-3 sentences)
- Use bullet points for lists
- Include specific dates and times
- Add a clear call-to-action
- End with blessings

### Best Practices:
- Send at consistent times (e.g., every Friday at 10 AM)
- Don't send too frequently (once a week is good)
- Make it personal and conversational
- Include relevant scripture or inspiration
- Proofread before sending!

---

## ⚙️ Admin Panel Features

### View Subscribers:
- See all newsletter subscribers
- View subscription dates
- See active status
- Search and filter

### Export Data:
- **Copy Emails:** Click copy icon to copy all emails
- **Download CSV:** Click download icon for Excel-compatible file

### Send Newsletters:
- Write subject and message
- See subscriber count before sending
- Send to all subscribers at once
- Get instant delivery confirmation

### Email Limits:
- **Free Plan:** 200 emails/month
- **Paid Plans:** Up to 100,000+ emails/month
- Emails sent in batches of 10 for reliability

---

## 🔒 Security

### Admin Password:

**IMPORTANT:** Change the default password!

1. Open `src/pages/Admin.jsx`
2. Find line 23:
   ```javascript
   const ADMIN_PASSWORD = 'fijai2024';
   ```
3. Change to your own secure password:
   ```javascript
   const ADMIN_PASSWORD = 'YourSecurePassword123!';
   ```
4. Save the file

### Access Control:
- Only people with the password can access the admin panel
- Password is stored locally in the browser after login
- Logout clears the authentication

### Email Security:
- EmailJS handles all email sending securely
- Your credentials are encrypted
- Emails sent through verified services only

---

## 📊 Monitoring & Analytics

### EmailJS Dashboard:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. View **"Email History"**
3. See:
   - Emails sent today/this month
   - Success rate
   - Failed emails
   - Remaining monthly quota

### Track Delivery:
- See which emails were delivered
- View bounce rates
- Check spam complaints
- Monitor usage limits

---

## 🆘 Troubleshooting

### Problem: "EmailJS not configured" error

**Solutions:**
1. Check that all three variables are in `.env.local`
2. Make sure there are no typos in the variable names
3. Restart your development server
4. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)

### Problem: Emails not sending

**Solutions:**
1. Check EmailJS dashboard for error messages
2. Verify your email service is still connected
3. Check you haven't exceeded monthly limit (200 emails/month free)
4. Make sure template variables match exactly ({{subject}}, {{message}}, {{to_email}})

### Problem: Emails going to spam

**Solutions:**
1. Ask subscribers to add your email to contacts
2. Use professional, clear subject lines
3. Avoid spam trigger words ("FREE", "URGENT", etc.)
4. Include unsubscribe option (coming in future update)
5. Don't send too many emails at once

### Problem: Can't access admin panel

**Solutions:**
1. Make sure you're going to the correct URL: http://localhost:3005/newsletter-admin
2. Check that the password is correct (default: `fijai2024`)
3. Clear your browser cache
4. Try in incognito/private browsing mode

### Problem: "Rate limit exceeded"

**Solutions:**
1. EmailJS free plan limits: 200 emails/month
2. Wait until next month for limit to reset
3. Upgrade to paid plan for more emails
4. Reduce email frequency

---

## 💰 Upgrading EmailJS

### Free Plan:
- 200 emails/month
- 2 email services
- 2 email templates
- Perfect for small churches

### Starter Plan ($12/month):
- 1,000 emails/month
- 5 email services
- 10 email templates
- Better for growing churches

### Pro Plan ($29/month):
- 5,000 emails/month
- Unlimited services
- Unlimited templates
- For larger congregations

**To upgrade:**
1. Go to [EmailJS Pricing](https://www.emailjs.com/pricing)
2. Choose your plan
3. Enter payment details
4. Upgrade instantly!

---

## 🔄 When You Deploy Your Website

After deploying your website to a hosting service:

### Update EmailJS Settings:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Click **"Account"** > **"Security"**
3. Under **"Allowed Origins"**, add your website URL:
   ```
   https://your-church-website.com
   ```
4. Save changes

This prevents unauthorized use of your EmailJS account.

---

## 📚 Additional Resources

- **EmailJS Documentation:** https://www.emailjs.com/docs
- **Support:** support@emailjs.com
- **Video Tutorials:** https://www.emailjs.com/docs/examples

---

## 🎊 Next Steps

Now that your newsletter system is set up:

1. **Change the admin password** to something secure
2. **Test the system** with your own email
3. **Prepare your first newsletter** for your congregation
4. **Set a schedule** for regular newsletters (e.g., weekly updates)
5. **Grow your subscriber list** by promoting the newsletter

May this tool help you stay connected with your church family and spread the Word effectively! 🙏

---

**Questions?** Check the troubleshooting section or reach out to your web developer for assistance.
