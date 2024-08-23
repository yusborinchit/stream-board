import { memo } from "react";
import { type TriggerWithId } from "../board";
import { type Video } from "../deck";
import VideoDisplay from "./video-display";

interface Props {
  onEnded: () => void;
  trigger: TriggerWithId;
}

const TriggerDisplay = memo(
  function TriggerDisplay(props: Readonly<Props>) {
    return (
      <VideoDisplay onEnded={props.onEnded} video={props.trigger as Video} />
    );
  },
  (prev, next) => prev.trigger.id === next.trigger.id,
);

export default TriggerDisplay;
