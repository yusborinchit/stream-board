import { getVideos } from "~/server/queries";
import CardsList from "../cards/cards-list";
import VideoCard from "../cards/video-card";
import UploadVideoButton from "../upload-thing/upload-video-button";

interface Props {
  userId: string;
}

export default async function VideosSection(props: Readonly<Props>) {
  const videos = await getVideos(props.userId);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-center justify-between gap-4 min-[450px]:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          Your Videos{" "}
          <span className="text-neutral-700">({videos.length}/20)</span>
          <span className="text-blue-500">:</span>
        </h2>
        <UploadVideoButton disabled={videos.length === 20} />
      </header>
      {videos.length > 0 && (
        <CardsList>
          {videos.map((video) => (
            <VideoCard
              key={video.fileId}
              id={video.fileId}
              name={video.fileName}
            />
          ))}
        </CardsList>
      )}
    </section>
  );
}
