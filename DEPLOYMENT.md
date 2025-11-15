# Deployment Guide - Fijai Church of Christ Website

## Quick Start

The website is now running locally at:
- **Local URL**: http://localhost:3005
- **Network URL**: http://10.21.22.149:3005

## Development

### Running the Application

```bash
cd fijai-church
npm start
```

The application will open in your default browser at http://localhost:3000 (or another port if 3000 is busy).

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment Options

### Option 1: Netlify (Recommended for beginners)

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy site"

**Custom Domain**: In Netlify, go to Domain settings to add your custom domain (e.g., fijaichurch.org)

### Option 2: Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your project
3. Vercel auto-detects Create React App
4. Click "Deploy"

### Option 3: Traditional Web Hosting (cPanel/FTP)

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload contents of the `build/` folder to your web host's public_html or www directory

3. Configure .htaccess for client-side routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

### Option 4: GitHub Pages

1. Install gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/fijai-church",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

## Environment Configuration

### Production Environment Variables

Create a `.env.production` file for production-specific settings:

```env
REACT_APP_SITE_URL=https://fijaichurch.org
REACT_APP_GOOGLE_MAPS_API_KEY=your_api_key_here
```

### Contact Form Backend

The current contact form is client-side only. For a production site, you'll need:

**Option A: FormSpree**
1. Sign up at [formspree.io](https://formspree.io)
2. Update the form action in `Connect.jsx`

**Option B: EmailJS**
1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Follow their React integration guide

**Option C: Custom Backend**
Create an API endpoint to handle form submissions

## Post-Deployment Checklist

- [ ] Update Google Maps embed with actual church location
- [ ] Replace placeholder images with real church photos
- [ ] Add actual sermon audio files
- [ ] Configure contact form backend
- [ ] Test all navigation links
- [ ] Test form submissions
- [ ] Verify mobile responsiveness
- [ ] Check page load speed (Google PageSpeed Insights)
- [ ] Set up SSL certificate (most hosts provide free Let's Encrypt)
- [ ] Configure custom domain
- [ ] Set up Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Test across different browsers

## Performance Optimization

### Before Deploying

1. **Optimize Images**:
   - Use WebP format where possible
   - Compress images (use tools like TinyPNG)
   - Recommended max width: 1920px for hero images

2. **Code Optimization**:
   The production build automatically:
   - Minifies JavaScript and CSS
   - Removes console logs
   - Optimizes bundle size

3. **Caching Strategy**:
   Configure your hosting provider to set proper cache headers:
   ```
   # Cache static assets for 1 year
   <FilesMatch "\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|css|js)$">
     Header set Cache-Control "max-age=31536000, public"
   </FilesMatch>
   ```

## Monitoring & Maintenance

### Analytics
Add Google Analytics to track visitors:
1. Create a Google Analytics property
2. Add tracking code to `public/index.html`

### Regular Updates
- Update sermon content weekly
- Check for broken links monthly
- Update npm packages quarterly: `npm update`
- Review and respond to contact form submissions

### Backup Strategy
- Regular database backups (if you add a backend)
- Git repository serves as code backup
- Consider backing up uploaded media files

## Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### White Screen After Deployment
- Check browser console for errors
- Verify homepage in package.json matches your deployment URL
- Ensure .htaccess is configured for client-side routing

### Images Not Loading
- Use relative paths
- Verify images are in `public/` folder or imported in components
- Check image URLs in production build

## Security Considerations

1. **Never commit sensitive data**:
   - Add `.env.local` to `.gitignore`
   - Use environment variables for API keys

2. **Contact Form**:
   - Add CAPTCHA to prevent spam
   - Validate all inputs on backend
   - Rate limit form submissions

3. **Updates**:
   - Regularly update dependencies
   - Monitor for security vulnerabilities: `npm audit`

## Support

For technical issues:
- Check the main README.md
- Review React documentation: https://react.dev
- Tailwind CSS docs: https://tailwindcss.com

## Cost Estimates

### Free Tier Options
- **Netlify**: 100GB bandwidth/month (enough for small churches)
- **Vercel**: Unlimited personal projects
- **GitHub Pages**: Free for public repositories

### Paid Hosting (for more control)
- **Shared Hosting**: $5-15/month (e.g., Bluehost, SiteGround)
- **VPS**: $10-30/month (DigitalOcean, Linode)
- **Managed WordPress** (if converting): $15-50/month

### Domain Name
- $10-15/year (.org domain)

### Email (optional)
- Google Workspace: $6/user/month
- Zoho Mail: Free for up to 5 users

---

**Need Help?** Contact the development team or consult the documentation at https://docs.fijaichurch.org
