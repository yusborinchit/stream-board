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
  if (!session) redirect("/sign-in/");

  const audio = await getAudioById(props.params.audioId);
  if (!audio || audio.userId !== session.user.id) redirect("/");

  return (
    <>
      <Header user={session.user} />
      <Container as="main" className="flex flex-col gap-4">
        <a href="/profile/" className="text-neutral-500">
          &larr; Back to Profile
        </a>
        <AudioForm audio={audio as Audio} />
      </Container>
    </>
  );
}
