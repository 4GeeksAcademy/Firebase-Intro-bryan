import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { PaginationIcon } from './weatherUtils';

function convertTo12HourFormat(hour) {
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  return `${hour} ${period}`;
}

function WeatherPagination({ hour, hourlyData }) {
  if (isNaN(hour) || hour < 0 || hour > 23) {
    console.log(hour);
    return <div>Invalid hour: {hour}</div>;
  }

  const items = [];

  for (let offset = -1; offset <= 1; offset++) {
    const displayHour = (hour + offset + 24) % 24; // handle wrapping from 0 to 23 and 23 to 0
    const condition = hourlyData[displayHour].condition.text; // Get the condition of this hour

    items.push(
      <Pagination.Item key={offset} className='hourly-weather'>
        <div className='weather-hour'>
          {convertTo12HourFormat(displayHour)}
        </div>
        <div className='weather-icon'>
          <PaginationIcon condition={condition} />
        </div>
      </Pagination.Item>
    );
  }

  return <Pagination size="xl">{items}</Pagination>;
}

export default WeatherPagination;
