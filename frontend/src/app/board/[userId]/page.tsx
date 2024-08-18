import { redirect } from "next/navigation";
import Board from "~/components/board";
import { getServerAuthSession } from "~/server/auth";

interface Props {
  params: {
    userId: string;
  };
}

export default async function BoardPage(props: Readonly<Props>) {
  const session = await getServerAuthSession();
  const user = session?.user ?? null;

  if (!user || user.id !== props.params.userId) redirect("/");

  return <Board userId={props.params.userId} />;
}
