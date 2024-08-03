import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import { MetaData } from '../../components/Meta/MetaData';
import './Event.css';

const Events = () => {
  const meta = {
    title: 'Events - APM',
    desc: 'Checkout our events.',
    url: 'https://uhapm.org/events',
  };

  return (
    <>
      <MetaData {...meta} />
      <div className='events'>
        <FullCalendar
          plugins={[dayGridPlugin, googleCalendarPlugin]}
          initialView='dayGridMonth'
          googleCalendarApiKey='AIzaSyBimdwJt8vyax0gJaZtSPd3vNqlBdcsuIA'
          events={{
            googleCalendarId: 'c_923ed97725bac22da19d71e5b1f9f7bcf2996d1f4b6b2f7fa939ccf7664c5fe3@group.calendar.google.com'
          }}
		  height = "100%"
		  width = "1000%"
		  //contentHeight = {1000}
        />
      </div>
    </>
  );
};

export default Events;
