import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const [volume, setVolume] = useState(0.75);
  const audioRef = useRef(new Audio("/audio.mp3"));

  const toggleMute = () => {
    const newVolume = isMute ? 0.75 : 0;
    setVolume(newVolume);
    setIsMute(!isMute);
  };

  // Set the volume whenever it changes
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  // Play or pause the audio when isPlaying changes
  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  return (
    <div>
      <Button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pause" : "Play"}
      </Button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(e.target.value as unknown as number)}
      />
      <Button sx={{width: "100px"}} onClick={() => toggleMute()}>{isMute ? "Mute" : "Unmute"}</Button>
    </div>
  );
}

export default AudioPlayer;
