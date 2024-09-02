import { redirect } from "next/navigation";
import Footer from "~/components/landing/footer";
import Container from "~/components/layouts/container";
import { type Audio, type Video } from "~/components/profile/client-deck";
import Header from "~/components/profile/header";
import AudiosSection from "~/components/profile/sections/audios-section";
import BoardSection from "~/components/profile/sections/board-section";
import VideosSection from "~/components/profile/sections/videos-section";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getDeck, getVideos } from "~/server/queries";

export default async function ProfilePage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/sign-in");

  const deck = await getDeck(session.user.id);
  if (!deck) redirect("/error?code=404&message=Deck%20not%20found");

  const [videos, audios] = await Promise.all([
    getVideos(session.user.id),
    getAudios(session.user.id),
  ]);

  return (
    <>
      <Header user={session.user} />
      <Container as="main" className="flex flex-col gap-12 py-4">
        <a href={`/profile/deck/${deck.id}`}>deck link</a>
        <BoardSection boardId={deck.id} />
        <VideosSection userId={session.user.id} videos={videos as Video[]} />
        <AudiosSection userId={session.user.id} audios={audios as Audio[]} />
      </Container>
      <Footer />
    </>
  );
}
