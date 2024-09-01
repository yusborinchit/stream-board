import { type Audio } from "../client-deck";

interface Props {
  onEnded: () => void;
  audio: Audio;
}

export default function AudioDisplay(props: Readonly<Props>) {
  function handleOnVideoEnded(event: React.SyntheticEvent<HTMLVideoElement>) {
    props.onEnded();
    event.currentTarget.style.display = "none";
  }

  return (
    <audio
      src={props.audio.fileUrl}
      autoPlay={true}
      onEnded={handleOnVideoEnded}
      className="opacity-0"
    />
  );
}
