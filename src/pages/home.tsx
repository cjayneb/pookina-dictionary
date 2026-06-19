import React, { useState, useEffect } from 'react';

const INCEPTION_DATE = new Date('2023-06-19T18:00:00');

interface TimeBreakdown {
  years: number; months: number; days: number;
  hours: number; minutes: number; seconds: number;
}

function getTimeDifference(startDate: Date): TimeBreakdown {
  const now = new Date();
  let years = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth() - startDate.getMonth();
  let days = now.getDate() - startDate.getDate();
  let hours = now.getHours() - startDate.getHours();
  let minutes = now.getMinutes() - startDate.getMinutes();
  let seconds = now.getSeconds() - startDate.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += previousMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return { years, months, days, hours, minutes, seconds };
}

export default function Home() {
  const [time, setTime] = useState<TimeBreakdown | null>(null);

  useEffect(() => {
    setTime(getTimeDifference(INCEPTION_DATE));
    const timer = setInterval(() => {
      setTime(getTimeDifference(INCEPTION_DATE));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) {
    return <h2 id="page-title">Home</h2>;
  }

  return (
    <>
      <h2 id="page-title">Home</h2>
      <h3>Welcome to the dictionary of the pookenese people</h3>
      <p>
        Looong time ago ({time.years} years, {time.months} months, {time.days} days,{' '}
        {time.hours} hours, {time.minutes} minutes, and {time.seconds} seconds), 
        two little pookenese buddies started frolicking around. blablablablablabla
      </p>
    </>
  );
}
