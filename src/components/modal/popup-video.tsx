"use client";
import React from "react";

type IPropType = {
  isVideoOpen: boolean;
  onHide: () => void;
  videoId: string;
  vimeoPlayer?: boolean;
};

const VideoPopup = ({ isVideoOpen, onHide, videoId }: IPropType) => {
  if (!isVideoOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999
    }} onClick={onHide}>
      <div style={{ backgroundColor: '#000', padding: '20px', borderRadius: '8px' }}>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <button onClick={onHide} style={{ color: '#fff', marginTop: '10px', display: 'block' }}>Fechar</button>
      </div>
    </div>
  );
};

export default VideoPopup;