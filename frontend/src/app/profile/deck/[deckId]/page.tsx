import { redirect } from "next/navigation";
import ClientDeck, {
  type Audio,
  type Video,
} from "~/components/profile/client-deck";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getVideos } from "~/server/queries";

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
  if (!session || session.user.id !== props.params.deckId)
    redirect("/sign-in/");

  const [videos, audios] = await Promise.all([
    await getVideos(session.user.id),
    await getAudios(session.user.id),
  ]);

  return (
    <ClientDeck
      userId={props.params.deckId}
      videos={videos as Video[]}
      audios={audios as Audio[]}
    />
  );
}
