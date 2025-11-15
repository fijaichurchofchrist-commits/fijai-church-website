# Google Drive Method - Upload PDFs Without Firebase

This is a **completely free** alternative that doesn't require Firebase at all. You'll use Google Drive to host your PDFs and update a simple JSON file.

## ✅ Advantages
- 100% Free (unlimited storage)
- No Firebase setup needed
- Easy for anyone who knows Google Drive
- Works immediately

## ❌ Disadvantages
- No admin panel (must edit JSON file)
- Manual process each time
- Requires basic file editing

---

## Step 1: Upload PDF to Google Drive

1. Go to [Google Drive](https://drive.google.com)
2. Create a folder called "Church Documents" (optional, for organization)
3. Upload your PDF file
4. Right-click the file → **Get link**
5. Change permission to **"Anyone with the link"**
6. Click **Copy link**

You'll get a link like:
```
https://drive.google.com/file/d/1ABC...XYZ/view?usp=sharing
```

---

## Step 2: Convert to Direct Download Link

Google Drive links need to be converted for direct downloads.

**Original Link:**
```
https://drive.google.com/file/d/1ABC123XYZ/view?usp=sharing
```

**Convert to Direct Download:**
```
https://drive.google.com/uc?export=download&id=1ABC123XYZ
```

Copy the ID (the part between `/d/` and `/view`) and use this format:
```
https://drive.google.com/uc?export=download&id=YOUR_FILE_ID
```

---

## Step 3: Update sermons.json

Open: `src/data/sermons.json`

Add your document:

```json
{
  "id": 9,
  "title": "Your Document Title",
  "author": "Elder James Mensah",
  "date": "2025-11-11",
  "pages": "15 pages",
  "category": "Faith Journey",
  "description": "Description of your document",
  "fileType": "PDF",
  "fileSize": "1.2 MB",
  "downloadUrl": "https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
}
```

**Important**:
- Replace `YOUR_FILE_ID` with the actual ID from your Google Drive link
- Keep the comma after the previous item
- Update the ID number (increment from last document)

---

## Step 4: Save and Refresh

1. Save the `sermons.json` file
2. Refresh your website
3. Your document appears instantly!

---

## Complete Example

### Before (Sample Document):
```json
{
  "id": 8,
  "title": "Living in Unity",
  "author": "Minister Sarah Owusu",
  "date": "2025-09-17",
  "pages": "9 pages",
  "category": "Church Family",
  "description": "The importance of unity in the body of Christ and how to maintain it.",
  "fileType": "DOCX",
  "fileSize": "750 KB",
  "downloadUrl": "#"
}
```

### After (Adding Your Document):
```json
{
  "id": 8,
  "title": "Living in Unity",
  "author": "Minister Sarah Owusu",
  "date": "2025-09-17",
  "pages": "9 pages",
  "category": "Church Family",
  "description": "The importance of unity in the body of Christ and how to maintain it.",
  "fileType": "DOCX",
  "fileSize": "750 KB",
  "downloadUrl": "#"
},
{
  "id": 9,
  "title": "Walking with God",
  "author": "Elder John Doe",
  "date": "2025-11-11",
  "pages": "12 pages",
  "category": "Faith Journey",
  "description": "A guide to developing a daily walk with God through prayer and scripture.",
  "fileType": "PDF",
  "fileSize": "1.5 MB",
  "downloadUrl": "https://drive.google.com/uc?export=download&id=1a2b3c4d5e6f7g8h9i0j"
}
```

**Note the comma** after the previous document!

---

## Categories Available

Use one of these for the `category` field:
- Faith Journey
- Spiritual Foundations
- Living Like Christ
- Gospel Truths
- Church Family

---

## File Types Supported

For the `fileType` field, use:
- `PDF` for PDF files
- `DOCX` for Word documents
- `DOC` for older Word files

The website will show the correct icon automatically.

---

## How to Get File Size

### On Mac:
1. Right-click file → Get Info
2. Look at "Size"
3. Example: "1.2 MB"

### On Windows:
1. Right-click file → Properties
2. Look at "Size"
3. Example: "1.2 MB"

### Online:
Upload to Google Drive, it shows the size there

---

## Tips & Tricks

### Tip 1: Keep a List
Keep a text file with all your Google Drive file IDs for easy reference.

### Tip 2: Organize Drive Folder
Create subfolders in Google Drive by category:
- Faith Journey
- Spiritual Foundations
- Living Like Christ
- etc.

### Tip 3: Test Downloads
After adding, click the download button on your website to ensure the link works.

### Tip 4: Batch Upload
Upload multiple PDFs to Drive, get all the links, then update the JSON file once.

---

## Troubleshooting

### Problem: Download doesn't work
**Solution**: Check that you converted the link correctly:
- ❌ Wrong: `https://drive.google.com/file/d/ABC/view`
- ✅ Correct: `https://drive.google.com/uc?export=download&id=ABC`

### Problem: JSON file won't save
**Solution**: Check for syntax errors:
- Missing commas between documents
- Extra comma after last document
- Unclosed quotes or brackets

### Problem: Document not showing
**Solution**:
- Refresh the page
- Check browser console (F12) for errors
- Verify JSON syntax is correct

---

## When to Use This Method

✅ **Use Google Drive if:**
- You want completely free hosting
- You're comfortable editing JSON files
- You don't upload documents often
- You don't need an admin panel

❌ **Use Firebase if:**
- You want an admin panel
- Multiple people need to upload
- You want a web interface
- You upload frequently

---

## Comparison: Google Drive vs Firebase

| Feature | Google Drive | Firebase |
|---------|-------------|----------|
| Cost | Free (unlimited) | Free (5GB) |
| Setup Time | 5 minutes | 15 minutes |
| Upload Method | JSON editing | Web interface |
| Admin Panel | ❌ No | ✅ Yes |
| Storage Limit | Unlimited | 5 GB |
| Ease of Use | Medium | Very Easy |
| Technical Skills | Basic file editing | None (after setup) |

---

## Example Workflow

### Week 1: New Sermon
1. Export sermon to PDF (sermon_nov_11.pdf)
2. Upload to Google Drive
3. Get shareable link
4. Convert to download link
5. Open `sermons.json`
6. Copy last document entry
7. Paste and modify:
   - Change ID to 9
   - Update title, date, author
   - Add download link
8. Save file
9. Refresh website
10. Test download

**Time: ~5 minutes**

### Week 2: Multiple Sermons
1. Upload all 4 PDFs to Drive
2. Get all links
3. Convert all links
4. Open `sermons.json`
5. Add all 4 entries at once
6. Save file
7. Done!

**Time: ~10 minutes for 4 documents**

---

## Need Help?

If you're stuck:
1. Open the JSON file
2. Copy an existing document entry
3. Paste it below
4. Change the values
5. Don't forget the comma!

**Pro Tip**: Use a JSON validator if you're unsure:
https://jsonlint.com

Paste your JSON, click "Validate". It will tell you if there are errors.

---

## Summary

Google Drive method is perfect if you:
- Want it free and simple
- Don't mind editing a JSON file
- Don't upload documents very often

It's **100% free** and works great for most church websites!

**Next Steps:**
1. Upload a test PDF to Google Drive
2. Get the shareable link
3. Convert to download format
4. Add to `sermons.json`
5. Test on your website!
