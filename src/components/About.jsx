import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaBible, FaUsers, FaHandsHelping } from 'react-icons/fa';
import leadershipData from '../data/leadership.json';

const About = () => {
  const missions = [
    {
      icon: <FaHeart className="text-5xl text-primary" />,
      title: 'Our Mission',
      description: 'To glorify God by making disciples of Jesus Christ, growing in faith, and serving our community with love and compassion.',
    },
    {
      icon: <FaBible className="text-5xl text-primary" />,
      title: 'Our Beliefs',
      description: 'We believe in the Bible as God\'s inspired Word, salvation through Jesus Christ, and the power of the Holy Spirit in our lives.',
    },
    {
      icon: <FaUsers className="text-5xl text-primary" />,
      title: 'Our Community',
      description: 'We are a diverse family united in Christ, committed to worshiping together, supporting one another, and growing spiritually.',
    },
    {
      icon: <FaHandsHelping className="text-5xl text-primary" />,
      title: 'What to Expect',
      description: 'Experience warm hospitality, inspiring worship, biblical teaching, and genuine fellowship. Come as you are - you are welcome here!',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 bg-soft-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">About Us</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A Christ-centered community dedicated to faith, fellowship, and service
          </p>
        </motion.div>

        {/* Mission Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {missions.map((mission, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-t-4 border-primary"
            >
              <div className="flex justify-center mb-4">{mission.icon}</div>
              <h3 className="text-xl font-bold text-accent mb-3 text-center">
                {mission.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {mission.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Leadership Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-accent text-center mb-4">
            Meet Our Leaders
          </h3>
          <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipData.map((leader, index) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img
                    src={leader.image.startsWith('/') ? `${process.env.PUBLIC_URL}${leader.image}` : leader.image}
                    alt={leader.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-accent mb-1">{leader.name}</h4>
                  <p className="text-primary font-semibold mb-3">{leader.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
