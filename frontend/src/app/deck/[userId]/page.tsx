import { redirect } from "next/navigation";
import Deck from "~/components/deck";
import { getServerAuthSession } from "~/server/auth";

interface Props {
  params: {
    userId: string;
  };
}

export default async function DeckPage(props: Readonly<Props>) {
  const session = await getServerAuthSession();

  if (!session || session.user.id !== props.params.userId) redirect("/");

  return <Deck userId={props.params.userId} />;
}
