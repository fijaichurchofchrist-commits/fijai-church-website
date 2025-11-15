# Google Calendar Integration Setup Guide 📅

This guide will help you connect your church's Google Calendar to your website so that any events you add to Google Calendar will automatically appear on your website.

**Time required:** ~10-15 minutes

---

## Overview

Once set up, you can:

- ✅ Add/edit/delete events directly in Google Calendar
- ✅ Events automatically appear on your website
- ✅ No code editing required
- ✅ Manage events from your phone or computer
- ✅ Share calendar management with other staff

---

## Part 1: Prepare Your Google Calendar (5 minutes)

### Step 1: Create or Choose Your Church Calendar

1. [ ] Go to [Google Calendar](https://calendar.google.com)
2. [ ] Sign in with your church's Google account (or personal account)
3. [ ] **Option A:** Create a new calendar:
   - Click the **+** button next to "Other calendars" (left sidebar)
   - Select **"Create new calendar"**
   - Name: `Fijai Church Events`
   - Description: `Church of Christ Fijai - Events and Activities`
   - Click **Create calendar**
4. [ ] **Option B:** Use an existing calendar you already have

### Step 2: Make Your Calendar Public

This allows your website to read the events.

1. [ ] In Google Calendar, find your church calendar in the left sidebar
2. [ ] Click the **three dots** (⋮) next to the calendar name
3. [ ] Select **"Settings and sharing"**
4. [ ] Scroll down to **"Access permissions for events"**
5. [ ] Check the box: ☑ **"Make available to public"**
6. [ ] A warning appears - Click **OK**
7. [ ] Leave the page open - you'll need it for the next step

✅ **Your calendar is now public and readable by your website!**

### Step 3: Get Your Calendar ID

1. [ ] Still in the calendar settings page (from Step 2)
2. [ ] Scroll down to **"Integrate calendar"** section
3. [ ] Find **"Calendar ID"** - it looks like:
   ```
   abc123xyz@group.calendar.google.com
   ```
   OR
   ```
   your-email@gmail.com
   ```
4. [ ] **Click the Copy icon** to copy the Calendar ID
5. [ ] **SAVE THIS!** Paste it somewhere temporarily:
   ```
   Calendar ID: ___________fijaichurchofchrist@gmail.com_____________________
   ```

---

## Part 2: Set Up Google Calendar API (8 minutes)

### Step 4: Create a Google Cloud Project

1. [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
2. [ ] Sign in with the same Google account
3. [ ] Click **"Select a project"** at the top
4. [ ] Click **"NEW PROJECT"**
5. [ ] Project name: `Fijai Church Website`
6. [ ] Location: Leave as "No organization"
7. [ ] Click **"CREATE"**
8. [ ] Wait for the project to be created (10-20 seconds)
9. [ ] Make sure your new project is selected at the top

✅ **Google Cloud project created!**

### Step 5: Enable Google Calendar API

1. [ ] In Google Cloud Console, make sure your project is selected
2. [ ] Click the **☰ menu** (top-left)
3. [ ] Go to **"APIs & Services"** > **"Library"**
4. [ ] In the search box, type: `Google Calendar API`
5. [ ] Click on **"Google Calendar API"** in the results
6. [ ] Click the **"ENABLE"** button
7. [ ] Wait for it to enable (5-10 seconds)

✅ **Google Calendar API enabled!**

### Step 6: Create an API Key

1. [ ] Still in Google Cloud Console
2. [ ] Click the **☰ menu** (top-left)
3. [ ] Go to **"APIs & Services"** > **"Credentials"**
4. [ ] Click **"+ CREATE CREDENTIALS"** at the top
5. [ ] Select **"API key"**
6. [ ] A popup shows your API key - **DON'T CLOSE IT YET!**
7. [ ] Click **"COPY"** to copy the API key
8. [ ] **SAVE THIS!** Paste it somewhere temporarily:
   ```
   API Key: _________________API key 1_______________
   AIzaSyCmSjBtZ6NjNnVVWAyrLms5mEgm0-YOFeI
   ```

### Step 7: Restrict Your API Key (Important for Security)

1. [ ] In the popup, click **"EDIT API KEY"** (or **"CLOSE"** and then click the ✏️ icon next to your key)
2. [ ] Under **"API restrictions"**, select **"Restrict key"**
3. [ ] Click the dropdown **"Select APIs"**
4. [ ] Find and check ☑ **"Google Calendar API"**
5. [ ] Under **"Website restrictions"**, select **"HTTP referrers (web sites)"**
6. [ ] Click **"ADD AN ITEM"**
7. [ ] Add these referrers (one at a time):
   ```
   http://localhost:3005/*
   http://localhost:*
   ```
8. [ ] When you deploy your website, come back and add:
   ```
   https://your-website-domain.com/*
   ```
9. [ ] Click **"SAVE"**

✅ **API key created and secured!**

---

## Part 3: Add Credentials to Your Website (2 minutes)

### Step 8: Update Environment Variables

1. [ ] Open your project folder: `/Users/felixofori/Desktop/Fijaicoc/fijai-church`
2. [ ] Find or create a file named `.env.local` in the project root
3. [ ] Open `.env.local` in a text editor
4. [ ] Add these two lines (use YOUR values from above):

```bash
# Google Calendar Integration
REACT_APP_GOOGLE_CALENDAR_API_KEY=your_api_key_here
REACT_APP_GOOGLE_CALENDAR_ID=your_calendar_id@group.calendar.google.com
```

**Example:**

```bash
# Google Calendar Integration
REACT_APP_GOOGLE_CALENDAR_API_KEY=AIzaSyBq1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o
REACT_APP_GOOGLE_CALENDAR_ID=fijaichurch@group.calendar.google.com
```

5. [ ] Save the file

### Step 9: Restart Your Website

Since environment variables only load on startup:

1. [ ] Stop your current server (press `Ctrl+C` in terminal)
2. [ ] Restart with: `PORT=3005 npm start`
3. [ ] Wait for the server to start

---

## Part 4: Test Your Setup (2 minutes)

### Step 10: Add a Test Event

1. [ ] Go to [Google Calendar](https://calendar.google.com)
2. [ ] Select your church calendar
3. [ ] Click any date/time to create an event
4. [ ] Add event details:
   - **Title:** Test Event - Bible Study
   - **Date:** Tomorrow
   - **Time:** 7:00 PM - 8:00 PM
   - **Location:** Main Hall
   - **Description:** This is a test event
5. [ ] Click **"Save"**

### Step 11: Check Your Website

1. [ ] Go to http://localhost:3005
2. [ ] Scroll down to the **"Events Calendar"** section
3. [ ] Look for the status message:

   - ✅ **Green checkmark** with "Live events from Google Calendar" = SUCCESS!
   - ❌ Gray text with "Showing sample events" = Not working yet

4. [ ] If successful, you should see your test event:
   - On the calendar grid (with a blue highlight)
   - In the "Upcoming Events" sidebar
   - With the correct date, time, and location

---

## ✅ Success Checklist

After completing all steps:

- [ ] Google Calendar is public
- [ ] Calendar ID copied
- [ ] Google Cloud project created
- [ ] Google Calendar API enabled
- [ ] API key created and restricted
- [ ] Credentials added to `.env.local`
- [ ] Server restarted
- [ ] Test event visible on website
- [ ] Green checkmark showing "Live events from Google Calendar"

---

## 🎉 You're Done!

Now you can manage your church events the easy way:

### To Add an Event:

1. Open Google Calendar
2. Click on a date
3. Fill in the details
4. Save
5. **Event automatically appears on your website!**

### To Edit an Event:

1. Click the event in Google Calendar
2. Make your changes
3. Save
4. **Changes automatically appear on your website!**

### To Delete an Event:

1. Click the event in Google Calendar
2. Click "Delete"
3. **Event automatically removed from your website!**

---

## 📱 Bonus: Mobile Management

Since you're using Google Calendar, you can also:

- ✅ Add events from your phone (Google Calendar app)
- ✅ Edit events on the go
- ✅ Share calendar management with other staff members
- ✅ Get notifications for upcoming events

---

## 🔄 How Often Does the Website Update?

- Events are fetched when someone visits your website
- If you add a new event, visitors will see it immediately when they refresh
- The calendar checks for updates every time the page loads

---

## 👥 Sharing Calendar Management

To let other staff members manage the calendar:

1. [ ] Go to Google Calendar
2. [ ] Find your church calendar in the left sidebar
3. [ ] Click the **three dots** (⋮)
4. [ ] Select **"Settings and sharing"**
5. [ ] Scroll to **"Share with specific people"**
6. [ ] Click **"Add people"**
7. [ ] Enter their email address
8. [ ] Choose permission level:
   - **"Make changes to events"** (recommended for staff)
   - **"Make changes AND manage sharing"** (for admins)
9. [ ] Click **"Send"**

They can now add/edit events without touching the website code!

---

## ⚠️ Important Security Notes

### What's Public:

- Event titles, dates, times, locations, descriptions
- This is intentional - you want people to see your events!

### What's NOT Public:

- Your API key (restricted to your website only)
- Your Google account password
- Your calendar management access

### Best Practices:

- Don't share your API key publicly
- Keep your `.env.local` file private (it's already in `.gitignore`)
- Only give calendar editing access to trusted staff
- Review your Google Calendar settings periodically

---

## 🆘 Troubleshooting

### Problem: Website still shows "sample events"

**Solutions:**

1. Check that both environment variables are set in `.env.local`
2. Make sure there are no extra spaces in the variable values
3. Restart your server (`Ctrl+C` then `PORT=3005 npm start`)
4. Check browser console (F12) for error messages

### Problem: "API key not valid" error

**Solutions:**

1. Make sure you copied the entire API key
2. Check that Google Calendar API is enabled in Google Cloud Console
3. Verify API key restrictions allow `localhost:3005`
4. Try creating a new API key

### Problem: Events don't appear

**Solutions:**

1. Make sure your calendar is public
2. Verify you're using the correct Calendar ID
3. Check that events are in the future (past events don't show by default)
4. Try adding a new test event

### Problem: Permission denied error

**Solutions:**

1. Confirm calendar is set to "Make available to public"
2. Check API key restrictions are correct
3. Verify the Calendar ID matches your public calendar

---

## 📍 Useful Links

- **Google Calendar:** https://calendar.google.com
- **Google Cloud Console:** https://console.cloud.google.com
- **Your Project:** https://console.cloud.google.com/apis/dashboard
- **API Credentials:** https://console.cloud.google.com/apis/credentials
- **Your Website:** http://localhost:3005

---

## 🎊 Next Steps

Now that your calendar is connected:

1. **Remove the test event** if you created one
2. **Add your real church events** for the next few months
3. **Set up recurring events** (Sunday services, weekly Bible studies, etc.)
4. **Share calendar access** with other staff members
5. **Deploy your website** so the public can see your events!

---

## 💡 Pro Tips

### Recurring Events

Google Calendar supports recurring events (daily, weekly, monthly):

- These will automatically appear on your website
- Perfect for Sunday services, weekly Bible studies, etc.
- Set them once and they repeat automatically!

### Event Colors

While colors don't transfer to the website, they help you organize in Google Calendar:

- Blue: Regular services
- Green: Special events
- Orange: Youth activities
- Red: Important dates

### Event Descriptions

Add rich descriptions to your events:

- What to bring
- Who to contact
- Registration links
- Special instructions

These all show up on your website!

---

## 🌐 When You Deploy Your Website

Remember to update your API key restrictions:

1. [ ] Go to Google Cloud Console > Credentials
2. [ ] Click your API key
3. [ ] Under "Website restrictions", add:
   ```
   https://your-deployed-website.com/*
   ```
4. [ ] Save

---

**Congratulations!** Your church calendar is now fully integrated with your website. No more manual updates needed! 🎉
