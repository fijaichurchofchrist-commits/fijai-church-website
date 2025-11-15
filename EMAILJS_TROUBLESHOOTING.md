# EmailJS Troubleshooting Guide

## Common Issues When Sending Fails

### Issue 1: Template Variables Don't Match (MOST COMMON)

**Problem:** Email fails to send with error about template variables.

**Solution:** Your EmailJS template MUST use these EXACT variable names:

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Click **"Email Templates"**
3. Click on your template (`template_kauceed`)
4. Edit the template to use these EXACT variables:

**To Email Field:**
```
{{to_email}}
```
NOT `{{email}}` or `{{to}}` - must be exactly `{{to_email}}`

**Subject Field:**
```
{{subject}}
```

**Content/Body Field:**
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
```

**From Name:**
```
Church of Christ Fijai
```

**Reply To:**
```
fijaichurchofchrist@gmail.com
```

5. Click **"Save"**
6. Try sending again

---

### Issue 2: Service Not Verified

**Problem:** "Service not verified" or "Unauthorized" error.

**Solution:**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Click **"Email Services"**
3. Find your Gmail service (`service_z1zjk0d`)
4. Make sure it shows "✓ Verified" in green
5. If not, click **"Connect Account"** and re-authorize
6. Make sure you're using the CHURCH Gmail account

---

### Issue 3: Monthly Limit Reached

**Problem:** "Quota exceeded" or "Rate limit" error.

**Solution:**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Check your usage on the homepage
3. Free plan = 200 emails/month
4. If exceeded, wait until next month or upgrade

---

### Issue 4: CORS / Domain Not Allowed

**Problem:** "Origin not allowed" error.

**Solution:**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Click **"Account"** > **"Security"**
3. Under **"Allowed Origins"**, make sure these are added:
   - `http://localhost:3005`
   - `http://localhost:3000`
   - `http://localhost:*`
4. Click **"Save"**
5. Refresh your website

---

### Issue 5: Wrong Template ID or Service ID

**Problem:** "Template not found" or "Service not found" error.

**Solution:**
1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. **Check Service ID:**
   - Click "Email Services"
   - Copy the Service ID (should be: `service_z1zjk0d`)
3. **Check Template ID:**
   - Click "Email Templates"
   - Copy the Template ID (should be: `template_kauceed`)
4. **Check Public Key:**
   - Click "Account"
   - Copy the Public Key from "API Keys" section
5. **Update your `.env.local` file** if any IDs are different
6. **Restart server** (`Ctrl+C` then `PORT=3005 npm start`)

---

### Issue 6: Email Provider Issues

**Problem:** Emails sending but not arriving.

**Solution:**
1. **Check Spam/Junk folder**
2. **Gmail Users:**
   - Check "Promotions" tab
   - Check "Social" tab
3. **Add to contacts:**
   - Add `fijaichurchofchrist@gmail.com` to your contacts
4. **Check EmailJS Dashboard:**
   - Go to "Email History"
   - See if emails show as "Delivered"

---

## How to Debug

### Step 1: Check Browser Console

1. Open your website: http://localhost:3005/newsletter-admin
2. Press **F12** to open Developer Tools
3. Click **"Console"** tab
4. Try sending a newsletter
5. Look for error messages in red

**Common Errors:**

| Error Message | Solution |
|--------------|----------|
| "Failed to fetch" | Check internet connection |
| "template not found" | Verify Template ID |
| "service not found" | Verify Service ID |
| "Invalid public key" | Verify Public Key |
| "Missing parameters" | Check template variables |
| "Unauthorized" | Re-connect Gmail service |

### Step 2: Test with EmailJS Directly

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com)
2. Click **"Email Templates"**
3. Click your template
4. Click **"Test it"** button
5. Fill in test data:
   - `to_email`: your email
   - `subject`: Test Subject
   - `message`: Test message
   - `from_name`: Church of Christ Fijai
6. Click **"Send Test Email"**
7. If this works, the problem is in your website code
8. If this fails, the problem is in your EmailJS setup

### Step 3: Verify Environment Variables

1. Stop your server (`Ctrl+C`)
2. Open `.env.local` file
3. Check these lines have NO EXTRA SPACES:

```bash
REACT_APP_EMAILJS_SERVICE_ID=service_z1zjk0d
REACT_APP_EMAILJS_TEMPLATE_ID=template_kauceed
REACT_APP_EMAILJS_PUBLIC_KEY=BUTwi-_6ltjFqkiEp
```

NOT like this (with spaces):
```bash
REACT_APP_EMAILJS_SERVICE_ID = service_z1zjk0d    ❌ WRONG
```

4. Save file
5. Restart server: `PORT=3005 npm start`

---

## Quick Checklist

- [ ] Template has `{{to_email}}`, `{{subject}}`, `{{message}}`, `{{from_name}}`
- [ ] Gmail service is connected and verified
- [ ] Not over monthly limit (200 emails)
- [ ] `localhost:3005` is in allowed origins
- [ ] Template ID is `template_kauceed`
- [ ] Service ID is `service_z1zjk0d`
- [ ] Public Key is correct in `.env.local`
- [ ] No extra spaces in `.env.local`
- [ ] Server was restarted after changing `.env.local`
- [ ] Test email works from EmailJS dashboard

---

## Still Not Working?

### Option 1: Re-create Template

1. Delete current template
2. Create NEW template with these exact settings:

**Template Name:** `church_newsletter_v2`

**Subject:**
```
{{subject}}
```

**Content:**
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
```

**Settings:**
- To Email: `{{to_email}}`
- From Name: `Church of Christ Fijai`
- Reply To: `fijaichurchofchrist@gmail.com`

3. Copy the NEW Template ID
4. Update `.env.local`:
```bash
REACT_APP_EMAILJS_TEMPLATE_ID=your_new_template_id
```
5. Restart server

### Option 2: Contact EmailJS Support

If nothing works:
1. Email: support@emailjs.com
2. Include:
   - Your Service ID
   - Your Template ID
   - Error message from browser console
   - Screenshot of template settings

---

## Success! Email Sent

If email sends successfully, you should see:
- ✅ Green success message
- "Newsletter sent! X successful, 0 failed"
- Email arrives within 1-2 minutes
- Check spam/promotions if not in inbox

---

## Pro Tips

### Test with Yourself First
Before sending to all subscribers:
1. Subscribe with YOUR email
2. Send a test newsletter
3. Verify you receive it
4. Then send to everyone

### Keep Templates Simple
- Avoid complex HTML
- Use plain text for first tests
- Add formatting later

### Monitor Usage
- Check EmailJS dashboard daily
- Track how many emails sent
- Watch for approaching limit (200/month free)

---

**Need More Help?** Check the main setup guide: [EMAILJS_SETUP.md](EMAILJS_SETUP.md)
