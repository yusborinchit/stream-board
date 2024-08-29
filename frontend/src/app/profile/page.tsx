import { redirect } from "next/navigation";
import AudioCard from "~/components/cards/audio-card";
import CardsList from "~/components/cards/cards-list";
import VideoCard from "~/components/cards/video-card";
import Header from "~/components/header";
import Container from "~/components/layouts/container";
import UploadAudioButton from "~/components/upload-thing/upload-audio-button";
import UploadVideoButton from "~/components/upload-thing/upload-video-button";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getVideos } from "~/server/queries";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  if (!session) redirect("/sign-in");

  const [videos, audios] = await Promise.all([
    await getVideos(session.user.id),
    await getAudios(session.user.id),
  ]);

  return (
    <>
      <Header user={session.user} />
      <Container as="main">
        <div className="flex flex-col gap-8 py-4">
          <section>
            <a
              href={`/board/${session.user.id}`}
              target="_blank"
              className="flex items-center gap-1"
            >
              <span className="text-neutral-600">&rarr;</span>
              <span className="underline decoration-blue-500 underline-offset-2">
                Go to your Board
              </span>
            </a>
            <a
              href={`/profile/deck/${session.user.id}`}
              target="_blank"
              className="flex items-center gap-1"
            >
              <span className="text-neutral-600">&rarr;</span>
              <span className="underline decoration-blue-500 underline-offset-2">
                Go to your Deck
              </span>
            </a>
          </section>
          <section className="flex flex-col gap-4">
            <header className="flex flex-col items-center justify-between gap-4 min-[450px]:flex-row">
              <h2 className="text-3xl font-bold tracking-tight">
                Your Videos
                <span className="text-blue-500">:</span>
              </h2>
              <UploadVideoButton />
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
          <section className="flex flex-col gap-4">
            <header className="flex flex-col items-center justify-between gap-4 min-[450px]:flex-row">
              <h2 className="text-3xl font-bold tracking-tight">
                Your Audios
                <span className="text-blue-500">:</span>
              </h2>
              <UploadAudioButton />
            </header>
            {audios.length > 0 && (
              <CardsList>
                {audios.map((audio) => (
                  <AudioCard
                    key={audio.fileId}
                    id={audio.fileId}
                    name={audio.fileName}
                  />
                ))}
              </CardsList>
            )}
          </section>
        </div>
      </Container>
    </>
  );
}
