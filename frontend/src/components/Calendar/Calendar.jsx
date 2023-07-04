import { useState } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import 'react-calendar/dist/Calendar.css';

function Calendar1() {
    const [date, setDate] = useState(new Date());
  
    return (
      <div className='app calendar-cell'>
        <h1 className='text-center calendar-title'>Календарь полива</h1>
        <div className='calendar-container calendar-sell'>
          <Calendar onChange={setDate} value={date} />
        </div>
        <p className='text-center'>
          <span className='bold'>Дата:</span>{' '}
          {date.toDateString()}
        </p>
      </div>
    );
  }
  
  export default Calendar1;