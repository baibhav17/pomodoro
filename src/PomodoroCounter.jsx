import React, { useState, useEffect } from 'react';
import './PomodoroCounter.css';
import TaskList from './TaskList';

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
  const baseColor = '#ffffff'
  const defaultColor = JSON.parse(localStorage.getItem('ThemeColor')) || 'E647C3';
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const youtubeTableRowMenu = ['index','title', 'link','edit', 'delete'];
  let youtubePlaylisttoLocalDB = [
    {
      index: 1,
      title: 'Madhubala',
      link:'https://youtu.be/vEmBUhnBtFI?si=W9Rza6mjBUuNyWfo',
      edit: 'edit',
      delete: 'delete'
    },
    {
      
      index: 2,
      title: 'Iraday',
      link: 'https://youtu.be/Qwm6BSGrOq0?si=NncWGYO_gGBdGVOj',
      edit: 'edit',
      delete: 'delete'
    },
    {
      
      index: 3,
      title: 'Kinna Chir',
      link: 'https://www.youtube.com/watch?v=cRsV7OXIyi0',
      edit: 'edit',
      delete: 'delete'
    },
    {
      
      index: 4,
      title: 'Tere Bin',
      link: 'https://www.youtube.com/watch?v=_trU-Wt9ucI',
      edit: 'edit',
      delete: 'delete'
    },
    {
      
      index: 5,
      title: 'Tere Bina',
      link: 'https://www.youtube.com/watch?v=UX2Xx4LIKSA',
      edit: 'edit',
      delete: 'delete'
    }
  ];
  const youtubePlaylistLocalDB = JSON.parse(localStorage.getItem('youtubePlaylist')) || youtubePlaylisttoLocalDB;
  const [youtubePlaylist, setYoutubePlaylist] = useState(youtubePlaylistLocalDB)

  useEffect(() => {
    localStorage.setItem('youtubePlaylist', JSON.stringify(youtubePlaylist));
  }, [youtubePlaylist]);

  useEffect(() => {
    localStorage.setItem('ThemeColor', JSON.stringify(selectedColor));
  }, [selectedColor]);

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
    if(youtubeTitle.length > 0 && youtubeLink.length > 0) {
      let newVideo = {
        index: youtubePlaylist.length + 1,
        title: youtubeTitle,
        link: youtubeLink,
        edit: 'edit',
        delete: 'delete'
      }
      setYoutubePlaylist([...youtubePlaylist, newVideo])
    // localStorage.setItem("youtubePlayList", JSON.stringify(youtubePlaylist));
      setYoutubeTitle('');
      setYoutubeLink('');
    } else {
      alert("link and title can't be empty")
    }
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

  const handleColorChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedColor(selectedValue);
  };

  const gradientColor = `linear-gradient(to top, ${selectedColor}, ${baseColor})`;

  return (
    <div className="main-wrapper" style={{ backgroundImage: gradientColor }}>
      <div className="header-wrapper">
        <h1>Pomodoro Timer</h1>
      </div>
      <div className="timer-wrapper" >
      <div>
      <p>Select Background Color:</p>
        <input
          type="color"
          value={selectedColor}
          onChange={handleColorChange}
        />
      </div>
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
        value={youtubeTitle}
        />
        <input
        type="text"
        placeholder="Youtube Link"
        onChange={(e)=>setYoutubeLink(e.target.value)}
        value={youtubeLink}
        />
        <button onClick={addToPlaylist}>Add to playlist</button>
      </div>
      <div>
      <TaskList />
      </div>
      <div className="youtube-table">
        <table>
          <thead>
            <tr>
              {youtubeTableRowMenu.map((item, index)=><th key={index}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {youtubePlaylist.map((item, index) => (
            <tr key={index}>
              <td>{item.index}</td>
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
    </div>
  );
};

export default PomodoroCounter;

