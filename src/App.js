import "./styles/app.scss";
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data";
import Nav from "./components/Nav";
import { useState, useRef } from "react";
import Library from "./components/Library";
function App() {
  const [libraryStatus, setlibraryStatus] = useState(false);
  const [songinfo, setsonginfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
    
  });
  const [songs, setSong] = useState(data());
  const [currentsong, setCurrentsong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeUbdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setsonginfo({
      ...songinfo,
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const audioRf = useRef(null);
  const songEndhandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentsong.id);
    await setCurrentsong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRf.current.play();
  };
  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav setlibraryStatus={setlibraryStatus} libraryStatus={libraryStatus} />
      <Song currentsong={currentsong} />
      <Player
        currentsong={currentsong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        audioRf={audioRf}
        songinfo={songinfo}
        setsonginfo={setsonginfo}
        songs={songs}
        setCurrentsong={setCurrentsong}
        setSong={setSong}
      />
      <Library
        isPlaying={isPlaying}
        audioRf={audioRf}
        songs={songs}
        setCurrentsong={setCurrentsong}
        setSong={setSong}
        libraryStatus={libraryStatus}
      />
      <audio
        ref={audioRf}
        src={currentsong.audio}
        onTimeUpdate={timeUbdateHandler}
        onEnded={songEndhandler}
      ></audio>
    </div>
  );
}

export default App;
