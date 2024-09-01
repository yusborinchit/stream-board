"use server";

import { type Audio, type Video } from "~/components/profile/client-deck";
import { updateAudio, updateVideo } from "./queries";

export async function updateVideoAction(formData: FormData) {
  const video = JSON.parse(formData.get("video") as string) as Video;
  await updateVideo(video);
}

export async function updateAudioAction(formData: FormData) {
  const audio = JSON.parse(formData.get("audio") as string) as Audio;
  await updateAudio(audio);
}
