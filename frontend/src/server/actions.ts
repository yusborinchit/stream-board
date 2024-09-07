"use server";

import { redirect } from "next/navigation";
import { UTApi } from "uploadthing/server";
import { type Audio, type Video } from "~/components/profile/client-deck";
import {
  deleteFile,
  getAudioById,
  getVideoById,
  updateAudio,
  updateVideo,
} from "./queries";

export async function updateVideoAction(formData: FormData) {
  const video = JSON.parse(formData.get("video") as string) as Video;
  await updateVideo(video);
}

export async function updateAudioAction(formData: FormData) {
  const audio = JSON.parse(formData.get("audio") as string) as Audio;
  await updateAudio(audio);
}

export async function deleteVideoAction(formData: FormData) {
  const { fileId } = JSON.parse(formData.get("video") as string) as Video;

  const video = await getVideoById(fileId);
  if (!video) return;

  const videoKey = video.fileUrl.split("/").pop();
  if (!videoKey) return;

  const api = new UTApi();
  await api.deleteFiles(videoKey);

  await deleteFile(video.fileId);
  redirect("/profile/");
}

export async function deleteAudioAction(formData: FormData) {
  const { fileId } = JSON.parse(formData.get("audio") as string) as Audio;

  const audio = await getAudioById(fileId);
  if (!audio) return;

  const audioKey = audio.fileUrl.split("/").pop();
  if (!audioKey) return;

  const api = new UTApi();
  await api.deleteFiles(audioKey);

  await deleteFile(audio.fileId);
  redirect("/profile/");
}
