import React from "react";
import './VideoDetail.css'

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>
       <h1>Enter search keyword to load...</h1>
       <br></br>
    </div>;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
  console.log(typeof video);
  return (
    <div>
      <div className="ui segment">
        <h4 id="vidTitle" className="ui header"><span id = "np">Now playing: </span><span id="vt">{video.snippet.title}</span></h4>
      </div>
      <div className="ui embed">
        <iframe src={videoSrc} allowFullScreen title="Video player" />
      </div>
    </div>
  );
};

export default VideoDetail;
