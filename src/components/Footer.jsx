import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChurch, FaFacebook, FaInstagram, FaYoutube, FaHeart, FaSpinner } from 'react-icons/fa';
import { db } from '../firebase/config';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setSubscribeMessage('');

    try {
      // Check if email already exists
      const subscribersRef = collection(db, 'newsletter_subscribers');
      const q = query(subscribersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setMessageType('info');
        setSubscribeMessage('You are already subscribed!');
        setEmail('');
        setIsSubscribing(false);
        setTimeout(() => setSubscribeMessage(''), 4000);
        return;
      }

      // Add new subscriber
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email: email,
        subscribedAt: new Date(),
        status: 'active'
      });

      setMessageType('success');
      setSubscribeMessage('Thank you for subscribing! You will receive updates and inspiration.');
      setEmail('');
      setTimeout(() => setSubscribeMessage(''), 5000);
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      setMessageType('error');
      setSubscribeMessage(`Error: ${error.message || 'Something went wrong. Please try again later.'}`);
      setTimeout(() => setSubscribeMessage(''), 8000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Sermons', href: '#sermons' },
    { name: 'Calendar', href: '#calendar' },
    { name: 'Connect', href: '#connect' },
  ];


  const socialMedia = [
    { icon: <FaFacebook />, name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100070091529316' },
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://www.instagram.com/fijaichurchofchrist?igsh=MWtobjZlN2dlMHpnaA%3D%3D&utm_source=qr' },
    { icon: <FaYoutube />, name: 'YouTube', url: 'https://www.youtube.com/@FijaiChurchOfChrist' },
  ];

  return (
    <footer className="bg-gradient-to-b from-accent to-primary text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-light-blue">Subscribe to our newsletter for updates and inspiration</p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isSubscribing}
                className="px-6 py-3 rounded-full text-gray-800 outline-none focus:ring-2 focus:ring-white w-full sm:w-80 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-light-blue transition-all duration-300 hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center min-w-[140px]"
              >
                {isSubscribing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </motion.div>
          {subscribeMessage && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`text-center mt-4 font-medium ${
                messageType === 'success' ? 'text-green-200' :
                messageType === 'error' ? 'text-red-200' :
                'text-light-blue'
              }`}
            >
              {subscribeMessage}
            </motion.p>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* About Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <FaChurch className="text-3xl" />
              <div>
                <h3 className="text-xl font-bold">Church of Christ</h3>
                <p className="text-sm text-light-blue">Fijai</p>
              </div>
            </div>
            <p className="text-light-blue mb-4">
              Growing in Faith, Serving in Love. Join us as we worship, learn, and serve together.
            </p>
            <div className="flex space-x-3">
              {socialMedia.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-lg hover:bg-white hover:text-primary transition-all duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-light-blue hover:text-white transition-colors duration-300 hover:pl-2 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-4">Contact Us</h4>
            <div className="space-y-3 text-light-blue">
              <p>Church of Christ Fijai</p>
              <p>I19 Nana Owuo St, Fijai</p>
              <p>Takoradi, Ghana</p>
              <p className="pt-2">Phone: +233 20 192 6565</p>
              <p>Phone: +233 24 323 2616</p>
              <p>Email: fijaichurchofchrist@gmail.com</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-light-blue text-sm"
          >
            &copy; {new Date().getFullYear()} Church of Christ Fijai. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-light-blue text-sm mt-2 flex items-center justify-center"
          >
            Made with <FaHeart className="mx-1 text-red-400" /> for the glory of God
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
