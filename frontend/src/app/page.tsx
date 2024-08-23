import { redirect } from "next/navigation";
import Container from "~/components/container";
import Header from "~/components/header";
import UploadAudioButton from "~/components/upload-thing/upload-audio-button";
import UploadVideoButton from "~/components/upload-thing/upload-video-button";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getVideos } from "~/server/queries";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) redirect("/sign-in");

  const [videos, audios] = await Promise.all([
    await getVideos(session.user.id),
    await getAudios(session.user.id),
  ]);

  return (
    <>
      <Header />
      <Container as="main">
        <div className="flex flex-col gap-8 py-4">
          <section>
            <a
              href={`/board/${session.user.id}`}
              target="_blank"
              className="flex items-center gap-1"
            >
              <span className="text-neutral-500">&rarr;</span>
              <span className="underline decoration-blue-500 underline-offset-2">
                Go to your Board
              </span>
            </a>
            <a
              href={`/deck/${session.user.id}`}
              target="_blank"
              className="flex items-center gap-1"
            >
              <span className="text-neutral-500">&rarr;</span>
              <span className="underline decoration-blue-500 underline-offset-2">
                Go to your Deck
              </span>
            </a>
          </section>
          <section className="flex flex-col gap-4">
            <header className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <h2 className="text-3xl font-bold tracking-tight">
                <span className="text-neutral-500"># </span>
                Your Videos<span className="text-blue-500">:</span>
              </h2>
              <UploadVideoButton />
            </header>
            {videos.length > 0 && (
              <ul className="flex flex-col gap-2">
                {videos.map((video) => (
                  <li key={video.fileId} className="flex items-center gap-4">
                    <a
                      href={`/video/${video.fileId}`}
                      className="flex items-center gap-1"
                    >
                      <span className="text-neutral-500">&rarr;</span>
                      <span className="underline decoration-blue-500 underline-offset-2">
                        {video.fileName}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className="flex flex-col gap-4">
            <header className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <h2 className="text-3xl font-bold tracking-tight">
                <span className="text-neutral-500"># </span>
                Your Audios<span className="text-blue-500">:</span>
              </h2>
              <UploadAudioButton />
            </header>
            {audios.length > 0 && (
              <ul className="flex flex-col gap-2">
                {audios.map((audio) => (
                  <li key={audio.fileId} className="flex items-center gap-4">
                    <a href={audio.fileUrl} className="flex items-center gap-1">
                      <span className="text-neutral-500">&rarr;</span>
                      <span className="underline decoration-blue-500 underline-offset-2">
                        {audio.fileName}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </Container>
    </>
  );
}
