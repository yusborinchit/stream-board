import { redirect } from "next/navigation";
import Container from "~/components/layouts/container";
import BoardLink from "~/components/profile/board-link";
import Header from "~/components/profile/header";
import AudiosSection from "~/components/profile/sections/audios-section";
import VideosSection from "~/components/profile/sections/videos-section";
import { getServerAuthSession } from "~/server/auth";
import { getDeck } from "~/server/queries";

export default async function ProfilePage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/sign-in");

  const deck = await getDeck(session.user.id);
  if (!deck) redirect("/error?code=404&message=Deck%20not%20found");

  return (
    <>
      <Header user={session.user} />
      <Container as="main" className="flex flex-col gap-8 py-4">
        <section className="flex flex-col gap-4">
          <BoardLink boardId={deck.id} />
          {/* <a
            href={`/board/${session.user.id}`}
            target="_blank"
            className="flex items-center gap-1"
          >
            <span className="text-neutral-700">&rarr;</span>
            <span className="underline decoration-blue-500 underline-offset-2">
              Go to your Board
            </span>
          </a> */}
          <a
            href={`/profile/deck/${deck.id}`}
            target="_blank"
            className="flex items-center gap-1"
          >
            <span className="text-neutral-700">&rarr;</span>
            <span className="underline decoration-blue-500 underline-offset-2">
              Go to your Deck
            </span>
          </a>
        </section>
        <VideosSection userId={session.user.id} />
        <AudiosSection userId={session.user.id} />
      </Container>
    </>
  );
}
