import { Wind } from "lucide-react";
import CardsList from "../cards/cards-list";
import VideoCard from "../cards/video-card";
import { type Video } from "../client-deck";
import UploadVideoButton from "../upload-thing/upload-video-button";

interface Props {
  userId: string;
  videos: Video[];
}

export default async function VideosSection(props: Readonly<Props>) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-center justify-between gap-4 min-[450px]:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          Your Videos{" "}
          <span className="text-neutral-700">({props.videos.length}/20)</span>
          <span className="text-blue-500">:</span>
        </h2>
        <UploadVideoButton disabled={props.videos.length === 20} />
      </header>
      {props.videos.length > 0 ? (
        <CardsList>
          {props.videos.map((video) => (
            <VideoCard
              key={video.fileId}
              id={video.fileId}
              name={video.fileName}
            />
          ))}
        </CardsList>
      ) : (
        <div className="flex items-center gap-4 text-neutral-700">
          <Wind className="size-24" />
          <p className="text-3xl font-bold leading-tight tracking-tighter">
            Ups!
            <br /> You don&apos;t have any videos yet.
          </p>
        </div>
      )}
    </section>
  );
}
