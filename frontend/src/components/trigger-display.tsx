import { memo } from "react";
import { type TriggerWithId } from "./board";
import { type Video } from "./deck";

interface Props {
  onEnded: () => void;
  trigger: TriggerWithId;
}

const TriggerDisplay = memo(
  function TriggerDisplay(props: Readonly<Props>) {
    const video = props.trigger as Video;

    const [x, y] = video.position.split(";");
    const [w, h] = video.size.split(";");

    const css = {
      "--x": `${x}px`,
      "--y": `${y}px`,
      "--w": `${w}px`,
      "--h": `${h}px`,
    } as React.CSSProperties;

    return (
      <video
        src={video.fileUrl}
        autoPlay={true}
        onEnded={(event) => {
          props.onEnded();
          event.currentTarget.style.display = "none";
        }}
        style={css}
        className="absolute left-[var(--x)] top-[var(--y)] z-10 h-[var(--h)] w-[var(--w)] object-fill"
      />
    );
  },
  (prev, next) => prev.trigger.id === next.trigger.id,
);

export default TriggerDisplay;
