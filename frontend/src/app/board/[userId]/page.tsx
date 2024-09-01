import Board from "~/components/profile/board";

interface Props {
  params: {
    userId: string;
  };
}

export default async function BoardPage(props: Readonly<Props>) {
  return <Board userId={props.params.userId} />;
}
