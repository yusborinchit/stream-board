import { redirect } from "next/navigation";
import Footer from "~/components/landing/footer";
import Container from "~/components/layouts/container";
import { type Audio, type Video } from "~/components/profile/client-deck";
import Header from "~/components/profile/header";
import AudiosSection from "~/components/profile/sections/audios-section";
import BoardSection from "~/components/profile/sections/board-section";
import VideosSection from "~/components/profile/sections/videos-section";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getVideos } from "~/server/queries";

export default async function ProfilePage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/sign-in");

  const [videos, audios] = await Promise.all([
    getVideos(session.user.id),
    getAudios(session.user.id),
  ]);

  return (
    <>
      <Header user={session.user} />
      <Container as="main" className="flex flex-col gap-12 py-4">
        <section className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Your Deck<span className="text-blue-500">:</span>
          </h2>
          <a
            href={`/profile/deck/${session.user.id}`}
            target="_blank"
            className="w-full rounded bg-gradient-to-t from-blue-800 to-blue-500 px-4 py-2.5 text-center font-semibold text-neutral-50 hover:shadow-xl hover:shadow-blue-600/30"
          >
            Go to your Deck
          </a>
        </section>
        <BoardSection boardId={session.user.id} />
        <VideosSection userId={session.user.id} videos={videos as Video[]} />
        <AudiosSection userId={session.user.id} audios={audios as Audio[]} />
      </Container>
      <Footer />
    </>
  );
}
