import type { NextPage } from "next";
import dynamic from "next/dynamic";
import "shaka-player/dist/controls.css";

const PlayerContainer = dynamic(import("../components/Player"), { ssr: false });

const Home: NextPage = () => {
  const licenseServer = "https://widevine-proxy.appspot.com/proxy";
  const mpdFile =
    "https://dash.akamaized.net/dash264/TestCases/1c/qualcomm/2/MultiRate.mpd";
  const videoThumbnail =
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/Big_Buck_Bunny_thumbnail_vlc.png";

  return (
    <main>
      <h1 style={{ textAlign: "center" }}>Nextjs Shaka Player Demo</h1>
      <PlayerContainer
        licenseServer={licenseServer}
        manifestUri={mpdFile}
        posterUrl={videoThumbnail}
      />
    </main>
  );
};

export default Home;
