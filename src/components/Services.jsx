import React from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaDirections } from 'react-icons/fa';
import eventsData from '../data/events.json';

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">
            Services & Schedule
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in worship and fellowship. All are welcome!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Schedule */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-accent mb-6 flex items-center">
              <FaClock className="mr-3 text-primary" />
              Weekly Schedule
            </h3>
            <div className="space-y-4">
              {eventsData.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="bg-gradient-to-r from-light-blue to-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-primary"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-accent">{event.title}</h4>
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.day}
                    </span>
                  </div>
                  <p className="text-primary font-semibold text-lg mb-2">{event.time}</p>
                  <p className="text-gray-600">{event.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-accent mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-3 text-primary" />
              Our Location
            </h3>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-xl mb-6">
              <iframe
                src="https://www.google.com/maps?q=Church+of+Christ+Fijai,+I19+Nana+Owuo+St,+Takoradi,+Ghana&output=embed"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location"
              ></iframe>
            </div>

            {/* Address Card */}
            <div className="bg-gradient-to-br from-primary to-accent text-white rounded-xl p-8 shadow-xl">
              <h4 className="text-2xl font-bold mb-4">Church of Christ Fijai</h4>
              <p className="text-lg mb-2 flex items-start">
                <FaMapMarkerAlt className="mr-3 mt-1 flex-shrink-0" />
                I19 Nana Owuo St, Fijai
                <br />
                Takoradi
                <br />
                Ghana
              </p>
              <button
                onClick={() =>
                  window.open(
                    'https://www.google.com/maps/search/?api=1&query=Church+of+Christ+Fijai+I19+Nana+Owuo+St+Takoradi+Ghana',
                    '_blank'
                  )
                }
                className="mt-6 bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-light-blue transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center justify-center w-full"
              >
                <FaDirections className="mr-2" />
                Get Directions
              </button>
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 bg-soft-gray rounded-xl p-6"
            >
              <h4 className="font-bold text-accent mb-4">Contact Information</h4>
              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Phone:</span> +233 20 192 6565
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> +233 24 323 2616
                </p>
                <p>
                  <span className="font-semibold">Email:</span> fijaichurchofchrist@gmail.com
                </p>
                <p>
                  <span className="font-semibold">Office Hours:</span> Mon-Fri, 9:00 AM - 5:00 PM
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
