"use server";

import { type Video } from "~/components/deck";
import { updateVideo } from "./queries";

export async function updateVideoAction(formData: FormData) {
  const video = JSON.parse(formData.get("video") as string) as Video;
  await updateVideo(video);
}
