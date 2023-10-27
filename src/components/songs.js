import React, { useState, useRef, useEffect } from "react";
import "./song.css";
import { useNavigate } from "react-router-dom";

function MusicApp() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [source, setSource] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const playButtonSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM15 29V11L29 20L15 29Z" fill="#FDB927"/>
    </svg>
  `;

  const audioRef = useRef(null);
  const [showAddSongForm, setShowAddSongForm] = useState(false);

  useEffect(() => {
    const storedSongs = localStorage.getItem("songs");
    if (storedSongs) {
      setSongs(JSON.parse(storedSongs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("songs", JSON.stringify(songs));
  }, [songs]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAudioFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type.includes("image")) {
        const objectURL = URL.createObjectURL(selectedFile);
        setThumbnail(objectURL);
      } else {
        setThumbnail(null);
        alert("Please select an image file for the thumbnail.");
      }
    } else {
      setThumbnail(null);
    }
  };

  const handleAddSong = () => {
    if (title && audioFile) {
      const newSong = {
        title: title,
        audioFile: URL.createObjectURL(audioFile),
        source: source,
        thumbnail: thumbnail,
      };
      setSongs([...songs, newSong]);
      setTitle("");
      setAudioFile(null);
      setSource("");
      setThumbnail(null);
      setShowAddSongForm(false);
    }
  };

  const handlePlaySong = (index) => {
    setCurrentIndex(index);
    console.log(currentIndex);
    audioRef.current.src = songs[index].audioFile;
    audioRef.current.play();
  };
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="music-app">
      <nav className="navigation">
        <h1 className="songs">Songs</h1>
        <div className="navbtns">
          <button
            className="addsongsbtn"
            onClick={() => setShowAddSongForm(true)}
          >
            Add Song
          </button>
          <button className="logoutbtn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="song-list">
        {songs.map((song, index) => (
          <div key={index} className="song-item">
            <div className="song-info">
              <div className="sidebyside">
                {song.thumbnail && (
                  <img
                    src={song.thumbnail}
                    alt={`Thumbnail for ${song.title}`}
                    className="song-thumbnail custom-thumbnail-style"
                  />
                )}
                <p className="song-title">{song.title}</p>{" "}
              </div>
              <p className="song-source">{song.source}</p>
              <button onClick={() => handlePlaySong(index)}>
                <div dangerouslySetInnerHTML={{ __html: playButtonSVG }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddSongForm && (
        <div className="add-song-form">
          <h1 className="headform">Add Song</h1>
          <div>
            <label htmlFor="titleInput">Song Title:</label>
            <input
              type="text"
              id="titleInput"
              placeholder="Enter song title"
              value={title}
              onChange={handleTitleChange}
              className="inputtitle"
            />
          </div>

          <div>
            <label htmlFor="audioFileInput">Select Audio File:</label>
            <input
              type="file"
              id="audioFileInput"
              accept="audio/*"
              onChange={handleAudioFileChange}
              className="inputfile"
            />
          </div>

          <div>
            <label htmlFor="sourceInput">Source (e.g. YouTube):</label>
            <input
              type="text"
              id="sourceInput"
              placeholder="Enter source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="inputsource"
            />
          </div>

          <div>
            <label htmlFor="thumbnail">Select image:</label>
            <input
              type="file"
              id="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="inputfile"
            />
          </div>

          {thumbnail && (
            <img
              src={thumbnail}
              alt={`Thumbnail for ${songs.title}`}
              className="song-thumbnail fixed-thumbnail"
            />
          )}

          <button className="btnadd" onClick={handleAddSong}>
            Add Song
          </button>
        </div>
      )}

      <div className="audio-player">
        <audio ref={audioRef} controls />
      </div>
    </div>
  );
}

export default MusicApp;
