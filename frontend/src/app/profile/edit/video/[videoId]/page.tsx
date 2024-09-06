import { redirect } from "next/navigation";
import Container from "~/components/layouts/container";
import { type Video } from "~/components/profile/client-deck";
import VideoForm from "~/components/profile/forms/video-form";
import Header from "~/components/profile/header";
import { getServerAuthSession } from "~/server/auth";
import { getVideoById } from "~/server/queries";

interface Props {
  params: {
    videoId: string;
  };
}

export default async function VideoPage(props: Readonly<Props>) {
  const session = await getServerAuthSession();
  if (!session) redirect("/sign-in");

  const video = await getVideoById(props.params.videoId);
  if (!video || video.userId !== session.user.id) redirect("/");

  return (
    <div className="bg-neutral-950">
      <Header user={session.user} />
      <Container as="main">
        <VideoForm video={video as Video} />
      </Container>
    </div>
  );
}
