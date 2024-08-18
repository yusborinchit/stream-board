import { redirect } from "next/navigation";
import Deck from "~/components/deck";
import { getServerAuthSession } from "~/server/auth";
import { getAudios, getVideos } from "~/server/queries";

interface Props {
  params: {
    userId: string;
  };
}

export default async function DeckPage(props: Readonly<Props>) {
  const session = await getServerAuthSession();

  if (!session || session.user.id !== props.params.userId) redirect("/");

  const [videos, audios] = await Promise.all([
    await getVideos(session.user.id),
    await getAudios(session.user.id),
  ]);

  return <Deck userId={props.params.userId} videos={videos} audios={audios} />;
}
