# Fijai Church of Christ Website

A modern, welcoming church website built with React and Tailwind CSS, featuring a beautiful blue and white color scheme that balances contemporary design with peaceful spirituality.

![Fijai Church of Christ](https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1200&q=80)

## Features

### Design Highlights
- **Glass-morphism Effects**: Modern, translucent UI elements with backdrop blur
- **Smooth Animations**: Powered by Framer Motion for elegant transitions
- **Responsive Design**: Mobile-first approach that looks great on all devices
- **Performance Optimized**: Fast loading with code splitting and lazy loading
- **SEO Ready**: Complete meta tags and Open Graph support

### Main Sections

1. **Hero Section**
   - Full-screen welcome with church imagery
   - Service times prominently displayed
   - Animated call-to-action buttons
   - Smooth scroll indicator

2. **About Section**
   - Mission, beliefs, and community values
   - Leadership team showcase with photos
   - Interactive hover effects on cards

3. **Services & Schedule**
   - Weekly service times in beautiful cards
   - Embedded Google Maps integration
   - Contact information and directions

4. **Sermons**
   - Featured latest sermon
   - Grid of recent sermons
   - Filter by series/speaker
   - Simulated audio player interface

5. **Connect**
   - Contact form with validation
   - Prayer request option
   - Social media links
   - Office hours and location info

6. **Footer**
   - Newsletter subscription
   - Quick navigation links
   - Social media integration
   - Resources section

## Technology Stack

- **React 18**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **React Router**: Client-side routing
- **React Icons**: Icon library

## Color Palette

```css
Primary Blue: #0066CC     /* Headers, CTAs */
Light Blue: #E6F2FF       /* Backgrounds, hover states */
Accent Blue: #003D7A      /* Footer, important text */
Pure White: #FFFFFF       /* Main background */
Soft Gray: #F8F9FA        /* Section backgrounds */
Text: #333333 (main)      /* Body text */
      #666666 (secondary) /* Secondary text */
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd fijai-church
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
fijai-church/
├── public/
│   ├── index.html          # HTML template with meta tags
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Sermons.jsx
│   │   ├── Connect.jsx
│   │   └── Footer.jsx
│   ├── pages/             # Page components
│   │   └── Home.jsx
│   ├── data/              # JSON data files
│   │   ├── sermons.json
│   │   ├── leadership.json
│   │   └── events.json
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
└── package.json
```

## Customization

### Updating Content

#### Sermons
Edit `src/data/sermons.json` to add or modify sermons:
```json
{
  "id": 1,
  "title": "Your Sermon Title",
  "speaker": "Speaker Name",
  "date": "2025-11-05",
  "duration": "42:15",
  "series": "Series Name",
  "description": "Sermon description",
  "audioUrl": "#"
}
```

#### Leadership
Edit `src/data/leadership.json` to update the leadership team:
```json
{
  "id": 1,
  "name": "Elder Name",
  "role": "Position",
  "image": "https://image-url.com",
  "bio": "Biography text"
}
```

#### Events
Edit `src/data/events.json` to modify service schedule:
```json
{
  "id": 1,
  "title": "Event Name",
  "time": "Time",
  "day": "Day",
  "description": "Description",
  "recurring": true
}
```

### Changing Colors

Edit `tailwind.config.js` to modify the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#0066CC',
      'light-blue': '#E6F2FF',
      accent: '#003D7A',
      // Add your custom colors
    },
  },
}
```

### Google Maps

Update the Google Maps embed URL in `src/components/Services.jsx`:
1. Get your coordinates from Google Maps
2. Replace the iframe src with your location

## Performance Optimizations

- **Code Splitting**: Automatic with React.lazy()
- **Image Optimization**: Using WebP where supported
- **Lazy Loading**: Images load as they enter viewport
- **Minification**: Production builds are minified
- **Caching**: Service worker for offline support (optional)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Screen reader friendly
- Sufficient color contrast (WCAG AA compliant)

## Future Enhancements

- [ ] Online giving integration
- [ ] Event registration system
- [ ] Sermon audio/video player
- [ ] Member portal
- [ ] Mobile app version
- [ ] Multi-language support
- [ ] Blog/news section
- [ ] Photo gallery

## Contact

Fijai Church of Christ
- **Address**: 123 Faith Avenue, Fijai, Takoradi, Ghana
- **Phone**: +233 (0) 123 456 7890
- **Email**: info@fijaichurch.org
- **Website**: https://fijaichurch.org

## Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Fonts from [Google Fonts](https://fonts.google.com)

---

Made with love for the glory of God
