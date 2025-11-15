// Google Calendar API Service
// This service fetches events from your public Google Calendar

const CALENDAR_API_KEY = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY || '';
const CALENDAR_ID = process.env.REACT_APP_GOOGLE_CALENDAR_ID || '';

/**
 * Fetches events from Google Calendar
 * @param {number} maxResults - Maximum number of events to fetch
 * @returns {Promise<Array>} Array of calendar events
 */
export const fetchGoogleCalendarEvents = async (maxResults = 50) => {
  // If not configured, return empty array (will use sample data)
  if (!CALENDAR_API_KEY || !CALENDAR_ID) {
    console.log('Google Calendar not configured - using sample events');
    return null;
  }

  try {
    const timeMin = new Date().toISOString(); // Get events from now onwards
    const timeMax = new Date();
    timeMax.setMonth(timeMax.getMonth() + 3); // Get events for next 3 months

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${CALENDAR_API_KEY}&timeMin=${timeMin}&timeMax=${timeMax.toISOString()}&maxResults=${maxResults}&singleEvents=true&orderBy=startTime`;

    console.log('Fetching calendar from:', CALENDAR_ID);
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Google Calendar API error:', response.status, errorData);
      return null;
    }

    const data = await response.json();
    console.log('Google Calendar API response:', data);

    // Check if we have events
    if (!data.items || data.items.length === 0) {
      console.log('No events found in calendar');
      return [];
    }

    // Transform Google Calendar events to our format
    const events = data.items.map((event, index) => {
      console.log(`Processing event ${index + 1}:`, event);
      const startDate = event.start.dateTime
        ? new Date(event.start.dateTime)
        : new Date(event.start.date);

      const endDate = event.end.dateTime
        ? new Date(event.end.dateTime)
        : new Date(event.end.date);

      // Extract time if it's a timed event
      const isAllDay = !event.start.dateTime;
      const timeString = isAllDay
        ? 'All Day'
        : `${formatTime(startDate)} - ${formatTime(endDate)}`;

      const transformedEvent = {
        id: event.id || index,
        title: event.summary || 'Untitled Event',
        date: startDate,
        time: timeString,
        location: event.location || 'To be announced',
        type: event.recurrence ? 'recurring' : 'special',
        description: event.description || 'No description available',
        htmlLink: event.htmlLink, // Link to view event in Google Calendar
      };

      console.log(`Transformed event:`, transformedEvent);
      return transformedEvent;
    });

    console.log(`Successfully fetched ${events.length} events from Google Calendar`);
    return events;
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    return null;
  }
};

/**
 * Formats a date object to a time string (e.g., "9:00 AM")
 * @param {Date} date
 * @returns {string}
 */
const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Checks if Google Calendar is properly configured
 * @returns {boolean}
 */
export const isGoogleCalendarConfigured = () => {
  return CALENDAR_API_KEY !== '' && CALENDAR_ID !== '';
};

/**
 * Gets the calendar configuration status for display
 * @returns {object}
 */
export const getCalendarStatus = () => {
  return {
    configured: isGoogleCalendarConfigured(),
    hasApiKey: CALENDAR_API_KEY !== '',
    hasCalendarId: CALENDAR_ID !== '',
  };
};
