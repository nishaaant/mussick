import React from "react";

const LibrarySongs = ({
  currentsong,
  setCurrentsong,
  audioRf,
  isPlaying,
  songs,
  id,
  setSong,
}) => {
  const songSelecthandler = async () => {
    await setCurrentsong(currentsong);
    const newsongs = songs.map((song) => {
      if (song.id === id) {
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
      if (isPlaying) audioRf.current.play();
    });
    setSong(newsongs);
  };

  return (
    <div
      onClick={songSelecthandler}
      className={`library-song ${currentsong.active ? "selected" : ""}`}
    >
      <img src={currentsong.cover} alt="" />
      <div className="song-description">
        <h3>{currentsong.name}</h3>
        <h4>{currentsong.artist}</h4>
      </div>
    </div>
  );
};


export default LibrarySongs;
