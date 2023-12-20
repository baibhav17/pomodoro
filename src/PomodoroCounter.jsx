import React, { useState, useEffect } from 'react';
import './PomodoroCounter.css';

const PomodoroCounter = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [dirty, setDirty] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [youtubeLink, setYoutubeLink] = useState('');

  const youtubeTableRowMenu = ['title', 'link','edit', 'delete'];
  const [youtubePlaylist, setYoutubePlaylist] = useState([
    {
      title: 'Madhubala',
      link:'https://youtu.be/vEmBUhnBtFI?si=W9Rza6mjBUuNyWfo',
      edit: 'edit',
      delete: 'delete'
    },
    {
      title: 'Iraday',
      link: 'https://youtu.be/Qwm6BSGrOq0?si=NncWGYO_gGBdGVOj',
      edit: 'edit',
      delete: 'delete'
    }
  ])

  // let youtubePlaylist = [
  //   {
  //     title: 'Madhubala',
  //     link:'https://youtu.be/vEmBUhnBtFI?si=W9Rza6mjBUuNyWfo',
  //     // edit:<button>edit</button>,
  //     edit: 'edit',
  //     delete: 'delete'
  //     // delete:<button>delete</button>
  //   },
  //   {
  //     title: 'Iraday',
  //     link: 'https://youtu.be/Qwm6BSGrOq0?si=NncWGYO_gGBdGVOj',
  //     // edit: <button>edit</button>,
  //     // delete: <button>delete</button>,
  //     edit: 'edit',
  //     delete: 'delete'
  //   }
  // ];

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
      setMinutes(25);
      setSeconds(0);
      alert('Timer has reached 00:00:00');
      openYouTubeSound();
    }

    return () => clearInterval(intervalId);
  }, [timerRunning, timeLeft, alertTriggered]);

    const openYouTubeSound = () => {

    const randomIndex = Math.floor(Math.random() * youtubePlaylist.length);
        
    const youtubeLink = youtubePlaylist[randomIndex].link;

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

  const addToPlaylist = () => {
    let newVideo = {
      index: youtubePlaylist.length,
      title: youtubeTitle,
      link: youtubeLink,
      edit: 'edit',
      delete: 'delete'
    }
    setYoutubePlaylist([...youtubePlaylist, newVideo])
  }

  const resetTimer = () => {
    setHours(0);
    setMinutes(25);
    setSeconds(0);
    setTimeLeft(0);
    setTimerRunning(false);
    setAlertTriggered(false);
    setDirty(false)
  };

  const deleteTitle = (titleIndex,link) => {
    const filteredYoutubeList = youtubePlaylist.filter((item,i)=> item.link != link && titleIndex != i)
    setYoutubePlaylist(filteredYoutubeList);
  }

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
      <div>
        <p>Youtube Playlist</p>
        <input
        type="text"
        placeholder="Youtube Title"
        onChange={(e)=>setYoutubeTitle(e.target.value)}
        />
        <input
        type="text"
        placeholder="Youtube Link"
        onChange={(e)=>setYoutubeLink(e.target.value)}
        />
        <button onClick={addToPlaylist}>Add to playlist</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {youtubeTableRowMenu.map((item, index)=><th key={index}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {youtubePlaylist.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td><a href={item.link} target="_blank" rel="noopener noreferrer">Watch</a></td>
              <td><button>{item.edit}</button></td>
              <td><button onClick={()=>deleteTitle(index,item.link)}>{item.delete}</button></td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PomodoroCounter;

