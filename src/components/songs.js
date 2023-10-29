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
  const deletesvg = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        d="M4.62476 1.87357H4.49976C4.56851 1.87357 4.62476 1.81732 4.62476 1.74857V1.87357H9.37476V1.74857C9.37476 1.81732 9.43101 1.87357 9.49976 1.87357H9.37476V2.99857H10.4998V1.74857C10.4998 1.197 10.0513 0.748566 9.49976 0.748566H4.49976C3.94819 0.748566 3.49976 1.197 3.49976 1.74857V2.99857H4.62476V1.87357ZM12.4998 2.99857H1.49976C1.22319 2.99857 0.999756 3.222 0.999756 3.49857V3.99857C0.999756 4.06732 1.05601 4.12357 1.12476 4.12357H2.06851L2.45444 12.2954C2.47944 12.8283 2.92007 13.2486 3.45288 13.2486H10.5466C11.081 13.2486 11.5201 12.8298 11.5451 12.2954L11.931 4.12357H12.8748C12.9435 4.12357 12.9998 4.06732 12.9998 3.99857V3.49857C12.9998 3.222 12.7763 2.99857 12.4998 2.99857ZM10.4263 12.1236H3.57319L3.19507 4.12357H10.8044L10.4263 12.1236Z"
        fill="black"
        fill-opacity="0.45"
      />
    </svg> `;
  const formclose = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.92473 7.99919L13.6122 2.41169C13.6908 2.31884 13.6247 2.17776 13.5033 2.17776H12.0783C11.9944 2.17776 11.914 2.21526 11.8587 2.27955L7.99259 6.88848L4.12652 2.27955C4.07295 2.21526 3.99259 2.17776 3.90688 2.17776H2.48188C2.36045 2.17776 2.29437 2.31884 2.37295 2.41169L7.06045 7.99919L2.37295 13.5867C2.35535 13.6074 2.34405 13.6327 2.34041 13.6596C2.33677 13.6866 2.34093 13.714 2.3524 13.7386C2.36387 13.7632 2.38216 13.784 2.40511 13.7986C2.42806 13.8131 2.45471 13.8208 2.48188 13.8206H3.90688C3.9908 13.8206 4.07116 13.7831 4.12652 13.7188L7.99259 9.10991L11.8587 13.7188C11.9122 13.7831 11.9926 13.8206 12.0783 13.8206H13.5033C13.6247 13.8206 13.6908 13.6796 13.6122 13.5867L8.92473 7.99919Z"
        fill="black"
        fill-opacity="0.45"
      />
    </svg>
  `;
  const previous = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path d="M3.00088 18.3821V3.14978M19.6676 17.6897V3.84215L9.94535 10.7659L19.6676 17.6897Z" stroke="black" stroke-width="2.08334" stroke-linejoin="round"/>
</svg>`;
  const forward = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
  <path d="M18.7929 3.14978V18.3821M2.12622 3.84216V17.6897L11.8485 10.7659L2.12622 3.84216Z" stroke="black" stroke-width="2.08334" stroke-linejoin="round"/>
</svg>`;
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
  const handlePreviousSong = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      audioRef.current.src = songs[currentIndex - 1].audioFile;
      audioRef.current.play();
    }
  };
  const handleForwardSong = () => {
    if (currentIndex < songs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      audioRef.current.src = songs[currentIndex + 1].audioFile;
      audioRef.current.play();
    }
  };
  const handleDeleteSong = (index) => {
    const updatedSongs = [...songs];
    updatedSongs.splice(index, 1);
    setSongs(updatedSongs);
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

      <div className="default-song-info">
        <div className="song-info">
          <p className="songname">SongName</p>

          <p className="songsource">Source</p>
          <p className="playsong">Playsong</p>
          <p className="playsong">Delete song</p>
        </div>
      </div>
      <div className="horizontal-line"></div>

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
              <button onClick={() => handleDeleteSong(index)}>
                <div dangerouslySetInnerHTML={{ __html: deletesvg }} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddSongForm && (
        <div className="add-song-form">
          <div className="formtop">
            <h1 className="headform">Add Song</h1>
            <button onClick={() => setShowAddSongForm(false)}>
              <div dangerouslySetInnerHTML={{ __html: formclose }} />
            </button>
          </div>
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
        <button onClick={handlePreviousSong}>
          {" "}
          <div dangerouslySetInnerHTML={{ __html: previous }} />
        </button>
        <audio ref={audioRef} controls />
        <button onClick={handleForwardSong}>
          {" "}
          <div dangerouslySetInnerHTML={{ __html: forward }} />
        </button>
      </div>
    </div>
  );
}

export default MusicApp;
