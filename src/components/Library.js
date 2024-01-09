import React from "react";
import LibrarySongs from "./LibrarySong";

const Library = ({
  songs,
  setCurrentsong,
  audioRf,
  isPlaying,
  setSong,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        
        {songs.map((song) => (
          <LibrarySongs
            currentsong={song}
            setCurrentsong={setCurrentsong}
            songs={songs}
            id={song.id}
            key={song.id}
            audioRf={audioRf}
            isPlaying={isPlaying}
            setSong={setSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
