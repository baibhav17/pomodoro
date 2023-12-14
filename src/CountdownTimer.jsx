import React, { useState, useEffect } from 'react';

const PomodoroCounter = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [dirty, setDirty] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);

useEffect(() => {
    let intervalId;

    if (timerRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && !alertTriggered && dirty) {
      clearInterval(intervalId);
      setTimerRunning(false);
      setAlertTriggered(true);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      alert('Timer has reached 00:00:00');
      openYouTubeSound();
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, timeLeft, alertTriggered]);

    const openYouTubeSound = () => {

    const soundArray = ['https://youtu.be/vEmBUhnBtFI?si=W9Rza6mjBUuNyWfo', 'https://youtu.be/Qwm6BSGrOq0?si=NncWGYO_gGBdGVOj'];
    const randomIndex = Math.floor(Math.random() * soundArray.length);
        
    const youtubeLink = soundArray[randomIndex];

    const newWindow = window.open(youtubeLink, '_blank');
    if (newWindow) {
      newWindow.focus();
    } else {
      alert('Please allow pop-ups for this website to play the sound.');
    }
  };

  const startTimer = () => {
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    setDirty(true)

    if (totalSeconds > 0 && !timerRunning) {
      setTimeLeft(totalSeconds);
      setTimerRunning(true);
      setAlertTriggered(false);
    } else {
      alert('Please enter a valid time and ensure the timer is not already running.');
    }
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTimeLeft(0);
    setTimerRunning(false);
    setAlertTriggered(false);
    setDirty(false)
  };

  return (
    <div>
      <h1>Countdown Timer</h1>
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        min="0"
      />
      <input
        type="number"
        placeholder="Minutes"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        min="0"
      />
      <input
        type="number"
        placeholder="Seconds"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
        min="0"
      />
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
      <p>{`${String(Math.floor(timeLeft / 3600)).padStart(2, '0')}:${String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`}</p>
    </div>
  );
};

export default PomodoroCounter;

