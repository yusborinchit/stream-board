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

  if (!session || session.user.id !== props.params.userId) redirect("/sign-in");

  return <Board userId={props.params.userId} />;
}
