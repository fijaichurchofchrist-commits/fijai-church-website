import React from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/Cover.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-accent/70"></div>
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass-effect rounded-2xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto shadow-2xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6"
          >
            Welcome to
            <span className="block text-accent mt-2">Church of Christ Fijai</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 font-medium mb-8"
          >
            Growing in Faith, Serving in Love
          </motion.p>

          {/* Service Times */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <FaClock className="text-primary text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg text-accent mb-2">Sunday Services</h3>
              <p className="text-gray-700">Bible Studies: 9:00 AM - 10:00 AM</p>
              <p className="text-gray-700">Worship: 10:00 AM - 12:00 PM</p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/30">
              <FaClock className="text-primary text-3xl mx-auto mb-3" />
              <h3 className="font-semibold text-lg text-accent mb-2">Weekday Services</h3>
              <p className="text-sm text-gray-600 mt-1">Tuesday Bible Studies: 7:00 PM</p>
              <p className="text-sm text-gray-600 mt-1">Thursday Songs & Prayers: 7:00 PM</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => scrollToSection('#services')}
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent transition-all duration-300 hover:shadow-xl hover:scale-105 w-full sm:w-auto"
            >
              Join Us This Sunday
            </button>
            <button
              onClick={() => scrollToSection('#about')}
              className="bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold hover:bg-light-blue transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-primary w-full sm:w-auto"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
