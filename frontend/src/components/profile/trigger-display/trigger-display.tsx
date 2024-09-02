import { memo } from "react";
import { type TriggerWithId } from "../client-board";
import { type Audio, type Video } from "../client-deck";
import AudioDisplay from "./audio-display";
import VideoDisplay from "./video-display";

interface Props {
  onEnded: () => void;
  trigger: TriggerWithId;
}

const TriggerDisplay = memo(
  function TriggerDisplay(props: Readonly<Props>) {
    return props.trigger.type === "video" ? (
      <VideoDisplay onEnded={props.onEnded} video={props.trigger as Video} />
    ) : (
      <AudioDisplay onEnded={props.onEnded} audio={props.trigger as Audio} />
    );
  },
  (prev, next) => prev.trigger.id === next.trigger.id,
);

export default TriggerDisplay;
