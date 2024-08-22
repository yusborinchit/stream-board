import { redirect } from "next/navigation";
import SignOutButton from "~/components/auth/sign-out-button";
import UploadAudioButton from "~/components/upload-audio-button";
import UploadVideoButton from "~/components/upload-video-button";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getVideos } from "~/server/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session) redirect("/sign-in");

  const [videos, audios] = await Promise.all([
    await getVideos(session.user.id),
    await getAudios(session.user.id),
  ]);

  return (
    <>
      <header className="mx-auto flex max-w-screen-md items-center justify-between gap-4 p-4">
        <a href="/" className="text-xl font-bold tracking-tight">
          stream<span className="text-blue-500">/</span>board
        </a>
        <div>
          <SignOutButton />
        </div>
      </header>
      <main className="mx-auto flex max-w-screen-md flex-col gap-8 p-4">
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
        <section>
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
                    href={video.fileUrl}
                    target="_blank"
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
        <section>
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
                  <a
                    href={audio.fileUrl}
                    target="_blank"
                    className="flex items-center gap-1"
                  >
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
      </main>
    </>
  );
}
