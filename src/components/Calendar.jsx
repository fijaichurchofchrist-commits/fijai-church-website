import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaSpinner, FaCheckCircle } from 'react-icons/fa';
import { fetchGoogleCalendarEvents, isGoogleCalendarConfigured } from '../services/googleCalendarService';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleCalendarActive, setIsGoogleCalendarActive] = useState(false);

  // Helper function to generate recurring events
  const generateRecurringEvents = () => {
    const events = [];
    const today = new Date();
    let eventId = 1;

    // Generate events for the next 8 weeks
    for (let week = 0; week < 8; week++) {
      // Calculate the date for this week
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() + (week * 7));

      // Find next Sunday
      const daysUntilSunday = (7 - weekStart.getDay()) % 7;
      const sunday = new Date(weekStart);
      sunday.setDate(weekStart.getDate() + daysUntilSunday);

      // Sunday Bible Studies (9:00 AM)
      events.push({
        id: eventId++,
        title: 'Sunday Bible Studies',
        date: new Date(sunday),
        time: '9:00 AM - 10:00 AM',
        location: 'Main Hall',
        type: 'recurring',
        description: 'Join us for interactive Bible study sessions every Sunday morning.'
      });

      // Sunday Worship Service (10:00 AM)
      events.push({
        id: eventId++,
        title: 'Sunday Worship Service',
        date: new Date(sunday),
        time: '10:00 AM - 12:00 PM',
        location: 'Main Sanctuary',
        type: 'recurring',
        description: 'Weekly worship service with singing, prayer, and biblical teaching.'
      });

      // Tuesday Bible Studies
      const tuesday = new Date(sunday);
      tuesday.setDate(sunday.getDate() + 2);
      events.push({
        id: eventId++,
        title: 'Tuesday Bible Studies',
        date: tuesday,
        time: '7:00 PM - 8:00 PM',
        location: 'Fellowship Room',
        type: 'recurring',
        description: 'Mid-week Bible study and fellowship.'
      });

      // Thursday Songs & Prayers
      const thursday = new Date(sunday);
      thursday.setDate(sunday.getDate() + 4);
      events.push({
        id: eventId++,
        title: 'Thursday Songs & Prayers',
        date: thursday,
        time: '7:00 PM - 8:00 PM',
        location: 'Main Hall',
        type: 'recurring',
        description: 'Evening of worship songs and prayer.'
      });
    }

    // Add special events
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);

    events.push({
      id: eventId++,
      title: 'Youth Fellowship',
      date: nextMonth,
      time: '4:00 PM - 6:00 PM',
      location: 'Youth Center',
      type: 'special',
      description: 'Monthly gathering for youth activities and spiritual growth.'
    });

    const communityOutreach = new Date(today);
    communityOutreach.setDate(today.getDate() + 21);
    events.push({
      id: eventId++,
      title: 'Community Outreach',
      date: communityOutreach,
      time: '2:00 PM - 5:00 PM',
      location: 'Various Locations',
      type: 'special',
      description: 'Serving the community with love and compassion.'
    });

    return events;
  };

  // Sample events - used as fallback if Google Calendar is not configured
  const sampleEvents = generateRecurringEvents();

  // Fetch events from Google Calendar on component mount
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);

      // Check if Google Calendar is configured
      const isConfigured = isGoogleCalendarConfigured();
      setIsGoogleCalendarActive(isConfigured);

      if (isConfigured) {
        // Try to fetch from Google Calendar
        const googleEvents = await fetchGoogleCalendarEvents();

        if (googleEvents && googleEvents.length > 0) {
          setEvents(googleEvents);
        } else {
          // Fallback to sample events if fetch failed
          setEvents(sampleEvents);
        }
      } else {
        // Use sample events if not configured
        setEvents(sampleEvents);
      }

      setIsLoading(false);
    };

    loadEvents();
  }, []); // Empty dependency array means this runs once on mount

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const hasEvent = (day) => {
    if (!day) return false;
    return events.some(event =>
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    return events.filter(event =>
      event.date.getDate() === day.getDate() &&
      event.date.getMonth() === day.getMonth() &&
      event.date.getFullYear() === day.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day.getDate() === today.getDate() &&
           day.getMonth() === today.getMonth() &&
           day.getFullYear() === today.getFullYear();
  };

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date - b.date)
    .slice(0, 4);

  return (
    <section id="calendar" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-accent mb-4">Events Calendar</h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with all our church events and activities
          </p>
          {/* Status indicator */}
          {isGoogleCalendarActive && (
            <div className="flex items-center justify-center mt-4 text-green-600">
              <FaCheckCircle className="mr-2" />
              <span className="text-sm">Live events from Google Calendar</span>
            </div>
          )}
          {!isGoogleCalendarActive && !isLoading && (
            <div className="flex items-center justify-center mt-4 text-gray-500">
              <span className="text-sm">Showing sample events (Google Calendar not configured)</span>
            </div>
          )}
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-primary text-4xl mr-3" />
            <span className="text-xl text-gray-600">Loading events...</span>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Calendar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="bg-soft-gray rounded-2xl p-6 shadow-lg">
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-6">
                    <button
                      onClick={previousMonth}
                      className="p-2 hover:bg-light-blue rounded-full transition-colors"
                    >
                      <FaChevronLeft className="text-primary" />
                    </button>
                    <h3 className="text-2xl font-bold text-accent">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={nextMonth}
                      className="p-2 hover:bg-light-blue rounded-full transition-colors"
                    >
                      <FaChevronRight className="text-primary" />
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Day headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}

                    {/* Calendar days */}
                    {getDaysInMonth(currentMonth).map((day, index) => (
                      <motion.div
                        key={index}
                        whileHover={day ? { scale: 1.05 } : {}}
                        className={`
                          aspect-square flex flex-col items-center justify-center rounded-lg
                          ${day ? 'cursor-pointer' : ''}
                          ${isToday(day) ? 'bg-primary text-white font-bold' : ''}
                          ${hasEvent(day) && !isToday(day) ? 'bg-light-blue border-2 border-primary' : ''}
                          ${!day ? 'invisible' : ''}
                          ${day && !isToday(day) && !hasEvent(day) ? 'hover:bg-gray-100' : ''}
                        `}
                      >
                        {day && (
                          <>
                            <span className="text-lg">{day.getDate()}</span>
                            {hasEvent(day) && (
                              <div className="flex gap-1 mt-1">
                                {getEventsForDay(day).map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      isToday(day) ? 'bg-white' : 'bg-primary'
                                    }`}
                                  ></div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 shadow-lg text-white sticky top-24">
                  <h3 className="text-2xl font-bold mb-6 flex items-center">
                    <FaCalendarAlt className="mr-3" />
                    Upcoming Events
                  </h3>

                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-lg">{event.title}</h4>
                          {event.type === 'recurring' && (
                            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                              Recurring
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-light-blue mb-2">{event.description}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-2 text-xs" />
                            {event.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-2 text-xs" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <FaMapMarkerAlt className="mr-2 text-xs" />
                            {event.location}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Weekly Schedule Overview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <h3 className="text-3xl font-bold text-accent text-center mb-8">Weekly Schedule</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { day: 'Sunday', time: '9:00 AM', event: 'Bible Studies' },
                  { day: 'Sunday', time: '10:00 AM', event: 'Worship Service' },
                  { day: 'Tuesday', time: '7:00 PM', event: 'Bible Studies' },
                  { day: 'Thursday', time: '7:00 PM', event: 'Songs & Prayers' },
                ].map((schedule, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="bg-light-blue rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="text-primary font-bold text-xl mb-2">{schedule.day}</div>
                    <div className="text-accent text-lg mb-1">{schedule.time}</div>
                    <div className="text-gray-600">{schedule.event}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Calendar;
