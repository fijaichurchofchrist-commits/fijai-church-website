import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Sermons from '../components/Sermons';
import Calendar from '../components/Calendar';
import Connect from '../components/Connect';

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Services />
      <Sermons />
      <Calendar />
      <Connect />
    </div>
  );
};

export default Home;
