import React from 'react';
import { useCountdown } from '../helpers/useCountDown';

const ExpiredNotice = () => {
  return (
    <div className="expired-notice">
      <span>Expired!!!</span>
      <p>Please select a future date and time.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex items-center flex-row text-[#8c5d1d]">
        <DateTimeDisplay value={days} type={'Hari'} isDanger={days <= 3} />
        <p>:</p>
        <DateTimeDisplay value={hours} type={'Jam'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={minutes} type={'Menit'} isDanger={false} />
        <p>:</p>
        <DateTimeDisplay value={seconds} type={'Detik'} isDanger={false} />
    </div>
  );
};

const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};


const DateTimeDisplay = ({ value, type, isDanger }) => {
  return (
    <div className="flex flex-col items-center justify-center  p-2">
      <p>{value}</p>
      <span className= "text-sm">{type}</span>
    </div>
  );
};

export default CountdownTimer;
