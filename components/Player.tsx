import { FC, useEffect, useRef } from "react";
const shaka = require("shaka-player/dist/shaka-player.ui.js");

type PlayerProps = {
  licenseServer: string;
  manifestUri: string;
  posterUrl: string;
};

const Player: FC<PlayerProps> = (props) => {
  const video = useRef<HTMLVideoElement>(null);
  const videoContainer = useRef(null);

  useEffect(() => {
    if (video === null) return;
    if (videoContainer === null) return;

    const player = new shaka.Player(video.current);
    const ui = new shaka.ui.Overlay(
      player,
      videoContainer.current,
      video.current
    );
    const controls = ui.getControls();

    console.log(Object.keys(shaka.ui));

    player.configure({
      drm: {
        servers: { "com.widevine.alpha": props.licenseServer },
      },
    });

    player
      .load(props.manifestUri)
      .then(function () {
        if (video.current === null) return;
        // video.current.play();
        // This runs if the asynchronous load is successful.
        console.log("The video has now been loaded!");
      })
      .catch((err: any) => {
        console.log(err);
      }); // onError is executed if the asynchronous load fails.
  }, [props.licenseServer, props.manifestUri]);

  return (
    <div
      className="shadow-lg mx-auto max-w-full"
      ref={videoContainer}
      style={{ maxWidth: "768px", width: "100%", margin: "auto" }}
    >
      <video
        style={{ width: "100%" }}
        ref={video}
        className="w-full h-full"
        poster={props.posterUrl}
      ></video>
    </div>
  );
};
export default Player;
