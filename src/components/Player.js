import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
const Player = ({
  currentsong,
  isPlaying,
  setIsPlaying,
  audioRf,
  songinfo,
  setsonginfo,
  songs,
  setCurrentsong,
  
  setSong,
}) => {
  useEffect(() => {
    const newsongs = songs.map((song) => {
      if (song.id === currentsong.id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSong(newsongs);
  }, [currentsong]);
  const skipMusic = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentsong.id);
    if (direction === "skip-forward") {
      await setCurrentsong(songs[(currentIndex + 1) % songs.length]);
    } else {
      if (currentIndex === 0) {
        setCurrentsong(songs[songs.length - 1]);
      } else {
        setCurrentsong(songs[currentIndex - 1]);
      }
    }
    if (isPlaying) audioRf.current.play();
  };
  const playsonghandler = () => {
    if (isPlaying) {
      setIsPlaying(!isPlaying);
      audioRf.current.pause();
    } else {
      audioRf.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    console.log("its works");
    audioRf.current.currentTime = e.target.value;
    setsonginfo({ ...songinfo, currentTime: e.target.value });
  };
  const trackstyle = {
    transform: `translateX(${songinfo.animationPercentage}%)`,
  };
  return (
    <div>
      <div className="player">
        <div className="time-control">
          <p>{getTime(songinfo.currentTime)}</p>
          <div
            className="track"
            style={{
              background: `linear-gradient(to right, ${currentsong.color[0]}, ${currentsong.color[1]})`,
            }}
          >
            <input
              min={0}
              max={songinfo.duration}
              value={songinfo.currentTime}
              onChange={dragHandler}
              type="range"
            />
            <div style={trackstyle} className="animate-track"></div>
          </div>

          <p>{songinfo.duration ? getTime(songinfo.duration) : "0:00"}</p>
        </div>
        <div className="play-control">
          <FontAwesomeIcon
            className="skip-back"
            size="2x"
            icon={faAngleLeft}
            onClick={() => skipMusic("skip-back")}
          />
          <FontAwesomeIcon
            onClick={playsonghandler}
            className="play"
            size="2x"
            icon={!isPlaying ? faPlay : faPause}
          />
          <FontAwesomeIcon
            className="skip-forward"
            size="2x"
            icon={faAngleRight}
            onClick={() => skipMusic("skip-forward")}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
