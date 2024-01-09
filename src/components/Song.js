import React from "react";

const Song = ({ currentsong }) => {
  return (
    <div className="song-container">
      <img src={currentsong.cover} alt="" />
      <h3>{currentsong.name}</h3>
      <h3>{currentsong.artist}</h3>
      
    </div>
  );
};

export default Song;
