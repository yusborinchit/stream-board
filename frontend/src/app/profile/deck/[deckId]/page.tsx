import { redirect } from "next/navigation";
import ClientDeck, {
  type Audio,
  type Video,
} from "~/components/profile/client-deck";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getDeckById, getVideos } from "~/server/queries";

export interface Deck {
  id: string;
  userId: string;
  size: string;
  layout: string | null;
}

interface Props {
  params: {
    deckId: string;
  };
}

export default async function DeckPage(props: Readonly<Props>) {
  const session = await getServerAuthSession();
  if (!session) redirect("/sign-in");

  const deck = await getDeckById(props.params.deckId);
  if (!deck || session.user.id !== deck.userId) redirect("/sign-in");

  const [videos, audios] = await Promise.all([
    await getVideos(session.user.id),
    await getAudios(session.user.id),
  ]);

  return (
    <ClientDeck
      deck={deck}
      userId={deck.userId}
      videos={videos as Video[]}
      audios={audios as Audio[]}
    />
  );
}
