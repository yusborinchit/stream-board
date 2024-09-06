import { redirect } from "next/navigation";
import Container from "~/components/layouts/container";
import { type Audio } from "~/components/profile/client-deck";
import AudioForm from "~/components/profile/forms/audio-form";
import Header from "~/components/profile/header";
import { getServerAuthSession } from "~/server/auth";
import { getAudioById } from "~/server/queries";

interface Props {
  params: {
    audioId: string;
  };
}

export default async function AudioPage(props: Readonly<Props>) {
  const session = await getServerAuthSession();
  if (!session) redirect("/sign-in");

  const audio = await getAudioById(props.params.audioId);
  if (!audio || audio.userId !== session.user.id) redirect("/");

  return (
    <div className="bg-neutral-950">
      <Header user={session.user} />
      <Container as="main">
        <AudioForm audio={audio as Audio} />
      </Container>
    </div>
  );
}
