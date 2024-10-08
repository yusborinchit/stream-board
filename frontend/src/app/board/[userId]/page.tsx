import ClientBoard from "~/components/profile/client-board";

interface Props {
  params: {
    userId: string;
  };
}

export default async function BoardPage(props: Readonly<Props>) {
  return <ClientBoard userId={props.params.userId} />;
}
