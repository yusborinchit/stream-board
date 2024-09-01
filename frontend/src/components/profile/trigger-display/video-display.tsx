import { getRandomPosition } from "~/utils/get-random-position";
import { type Video } from "../client-deck";

interface Props {
  onEnded: () => void;
  video: Video;
}

export default function VideoDisplay(props: Readonly<Props>) {
  const [w, h] = props.video.size.split(";");
  const [x, y] = props.video.isRandom
    ? getRandomPosition(
        window.innerWidth - Number(w),
        window.innerHeight - Number(h),
      )
    : props.video.position.split(";");

  const css = {
    "--x": `${x}px`,
    "--y": `${y}px`,
    "--w": `${w}px`,
    "--h": `${h}px`,
  } as React.CSSProperties;

  function handleOnVideoEnded(event: React.SyntheticEvent<HTMLVideoElement>) {
    props.onEnded();
    event.currentTarget.style.display = "none";
  }

  return (
    <video
      src={props.video.fileUrl}
      autoPlay={true}
      onEnded={handleOnVideoEnded}
      style={css}
      data-fullscreen={props.video.isFullscreen}
      className="absolute left-[var(--x)] top-[var(--y)] z-10 h-[var(--h)] w-[var(--w)] object-fill data-[fullscreen=true]:inset-0 data-[fullscreen=true]:h-screen data-[fullscreen=true]:w-screen"
    />
  );
}
