# Customization Guide

## Quick Content Updates

### 1. Church Information

**Update Church Details** in multiple files:

#### `src/components/Hero.jsx`
```javascript
// Line ~30-35: Service times
<p className="text-gray-700">9:00 AM & 11:00 AM</p>
<p className="text-gray-700">7:00 PM</p>
```

#### `src/components/Services.jsx`
```javascript
// Address section (~line 120)
123 Faith Avenue, Fijai
Takoradi, Western Region
Ghana
```

#### `src/components/Connect.jsx`
```javascript
// Contact info (~line 40)
{
  title: 'Address',
  content: '123 Faith Avenue, Fijai\nTakoradi, Western Region, Ghana',
}
```

### 2. Update Sermons

Edit `src/data/sermons.json`:

```json
{
  "id": 9,
  "title": "Your New Sermon Title",
  "speaker": "Pastor Name",
  "date": "2025-11-12",
  "duration": "45:30",
  "series": "Series Name",
  "description": "Brief description of the sermon content",
  "audioUrl": "https://your-audio-url.mp3"
}
```

**To add audio files:**
1. Upload MP3 files to a hosting service (Soundcloud, AWS S3, or your server)
2. Copy the public URL
3. Paste into the `audioUrl` field

### 3. Update Leadership Team

Edit `src/data/leadership.json`:

```json
{
  "id": 7,
  "name": "Elder John Doe",
  "role": "Youth Minister",
  "image": "https://images.unsplash.com/your-photo-id?w=400&h=400&fit=crop",
  "bio": "Brief biography of the leader..."
}
```

**For custom photos:**
1. Save photos in `public/images/leadership/`
2. Use path: `"/images/leadership/elder-john.jpg"`
3. Recommended size: 400x400px, under 200KB

### 4. Update Service Schedule

Edit `src/data/events.json`:

```json
{
  "id": 5,
  "title": "Friday Night Youth Service",
  "time": "7:00 PM",
  "day": "Friday",
  "description": "Youth fellowship and worship",
  "recurring": true
}
```

## Design Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#YOUR_PRIMARY_COLOR',    // Main blue
  'light-blue': '#YOUR_LIGHT_COLOR', // Backgrounds
  accent: '#YOUR_ACCENT_COLOR',      // Footer/highlights
  'soft-gray': '#F8F9FA',           // Section backgrounds
},
```

**Color Scheme Examples:**

**Traditional Church (Purple & Gold):**
```javascript
primary: '#663399',      // Purple
'light-blue': '#F5EBFF', // Light purple
accent: '#8B4513',       // Brown
```

**Modern Church (Teal & Orange):**
```javascript
primary: '#008080',      // Teal
'light-blue': '#E0F2F1', // Light teal
accent: '#FF6347',       // Coral
```

### Change Fonts

Edit `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
```

Then update `tailwind.config.js`:

```javascript
fontFamily: {
  sans: ['Montserrat', 'system-ui', 'sans-serif'],
},
```

**Font Recommendations:**
- **Modern**: Inter, Poppins, Montserrat
- **Classic**: Georgia, Merriweather, Playfair Display
- **Friendly**: Nunito, Quicksand, Raleway

### Update Logo

Replace church icon with your logo:

**Option 1: Keep Icon, Change Color**
In `src/components/Navbar.jsx`:
```javascript
<FaChurch className="text-primary text-3xl" />
```

**Option 2: Use Image Logo**
```javascript
<img
  src="/images/logo.png"
  alt="Church Logo"
  className="h-12 w-auto"
/>
```

Place logo file in `public/images/logo.png`

### Change Hero Background Image

In `src/components/Hero.jsx` (~line 18):

```javascript
style={{
  backgroundImage: 'url(/images/hero-church.jpg)',
  // or use Unsplash:
  backgroundImage: 'url(https://images.unsplash.com/photo-ID?w=1920)',
}}
```

**Tips for Hero Images:**
- Recommended size: 1920x1080px
- Subject should be centered
- Use high-contrast images
- Optimize file size (< 500KB)

## Google Maps Integration

### Update Map Location

In `src/components/Services.jsx` (~line 85):

1. **Get Your Coordinates:**
   - Go to Google Maps
   - Right-click your church location
   - Copy the coordinates (e.g., 4.9166667, -1.7500000)

2. **Update the iframe:**
```javascript
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7551234567890!2d-1.7500000!3d4.9166667!..."
  // OR use simpler format:
  src={`https://www.google.com/maps?q=${latitude},${longitude}&output=embed`}
/>
```

3. **Get Full Embed Code** (Recommended):
   - Go to Google Maps
   - Search for your location
   - Click "Share" → "Embed a map"
   - Copy the iframe code
   - Replace entire iframe in the code

## Social Media Links

Update in `src/components/Footer.jsx` and `src/components/Connect.jsx`:

```javascript
const socialMedia = [
  { icon: <FaFacebook />, name: 'Facebook', url: 'https://facebook.com/yourchurch' },
  { icon: <FaTwitter />, name: 'Twitter', url: 'https://twitter.com/yourchurch' },
  { icon: <FaInstagram />, name: 'Instagram', url: 'https://instagram.com/yourchurch' },
  { icon: <FaYoutube />, name: 'YouTube', url: 'https://youtube.com/@yourchurch' },
];
```

**To add more icons:**
```javascript
import { FaTiktok, FaLinkedin } from 'react-icons/fa';
```

## Add New Sections

### Example: Add a Photo Gallery Section

1. **Create the component** `src/components/Gallery.jsx`:

```javascript
import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const photos = [
    { id: 1, src: '/images/gallery/photo1.jpg', caption: 'Sunday Service' },
    { id: 2, src: '/images/gallery/photo2.jpg', caption: 'Youth Camp' },
    // Add more photos
  ];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-accent text-center mb-12">
          Photo Gallery
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img src={photo.src} alt={photo.caption} className="w-full h-64 object-cover" />
              <p className="p-4 text-center">{photo.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
```

2. **Import and use in** `src/pages/Home.jsx`:

```javascript
import Gallery from '../components/Gallery';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Sermons />
      <Gallery />  {/* Add here */}
      <Connect />
    </div>
  );
};
```

3. **Add to navigation** in `src/components/Navbar.jsx`:

```javascript
const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Sermons', href: '#sermons' },
  { name: 'Gallery', href: '#gallery' },  // Add this
  { name: 'Connect', href: '#connect' },
];
```

## Advanced Customization

### Add Blog/News Section

1. Create `src/data/blog.json`
2. Create `src/components/Blog.jsx`
3. Follow the structure of the Sermons component

### Add Event Registration

1. Integrate with a form service (Typeform, Google Forms)
2. Add registration links to events in `events.json`

### Add Online Giving

**Option 1: PayPal**
```javascript
<a
  href="https://www.paypal.com/donate/?hosted_button_id=YOUR_ID"
  className="bg-primary text-white px-8 py-4 rounded-full"
>
  Give Online
</a>
```

**Option 2: Stripe**
- Integrate Stripe Checkout
- Follow: https://stripe.com/docs/payments/checkout

**Option 3: Church Management Software**
- Planning Center Giving
- Pushpay
- Tithe.ly

## Testing Your Changes

After making changes:

1. **Save all files**
2. **Check the browser** - it should auto-reload
3. **Test on mobile view** - use browser DevTools (F12 → Toggle device toolbar)
4. **Test all links** - make sure navigation works
5. **Clear browser cache** if changes don't appear

## Common Issues

**Issue**: Changes not appearing
- **Solution**: Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

**Issue**: Colors not updating
- **Solution**: Restart the dev server (`npm start`)

**Issue**: Images not showing
- **Solution**: Check file path is correct, images are in `public/` folder

**Issue**: Build fails
- **Solution**: Check for syntax errors, missing commas, or unclosed brackets

## Getting Help

- Check component files for examples
- React Documentation: https://react.dev
- Tailwind Documentation: https://tailwindcss.com
- Framer Motion: https://www.framer.com/motion

## Backup Before Major Changes

```bash
# Create a backup branch
git checkout -b backup-before-changes
git add .
git commit -m "Backup before major customization"
git checkout main
```

---

**Happy Customizing!** Remember to test thoroughly after each change.
