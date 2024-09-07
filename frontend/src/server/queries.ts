"use server";

import { count, eq, sql } from "drizzle-orm";
import { type Audio, type Video } from "~/components/profile/client-deck";
import { db } from "./db";
import { audios, decks, files, videos } from "./db/schema";

export async function insertFile(userId: string, name: string, url: string) {
  const [insertedFile] = await db
    .insert(files)
    .values({ userId, name, url })
    .returning({ fileId: files.id });

  return {
    error: !insertedFile,
    fileId: insertedFile?.fileId,
  };
}

export async function insertVideo(fileId: string) {
  const [insertedVideo] = await db
    .insert(videos)
    .values({ fileId })
    .returning({ videoId: videos.fileId });

  return {
    error: !insertedVideo,
    videoId: insertedVideo?.videoId,
  };
}

export async function insertAudio(fileId: string) {
  const [insertedAudio] = await db
    .insert(audios)
    .values({ fileId })
    .returning({ audioId: audios.fileId });

  return {
    error: !insertedAudio,
    audioId: insertedAudio?.audioId,
  };
}

export async function getVideos(userId: string) {
  return await db
    .selectDistinct({
      type: sql`'video'`.as("type"),
      fileId: files.id,
      fileName: files.name,
      fileUrl: files.url,
      position: videos.position,
      size: videos.size,
      isFullscreen: videos.isFullscreen,
      isRandom: videos.isRandom,
    })
    .from(files)
    .innerJoin(videos, eq(files.id, videos.fileId))
    .where(eq(files.userId, userId));
}

export async function getAudios(userId: string) {
  return await db
    .selectDistinct({
      type: sql`'audio'`.as("type"),
      fileId: files.id,
      fileName: files.name,
      fileUrl: files.url,
    })
    .from(files)
    .innerJoin(audios, eq(files.id, audios.fileId))
    .where(eq(files.userId, userId));
}

export async function getAudioById(audioId: string) {
  const [audio] = await db
    .select({
      type: sql`'audio'`.as("type"),
      fileId: files.id,
      userId: files.userId,
      fileName: files.name,
      fileUrl: files.url,
    })
    .from(files)
    .innerJoin(audios, eq(files.id, audios.fileId))
    .where(eq(files.id, audioId));

  return audio;
}

export async function updateAudio(audio: Audio) {
  await db
    .update(files)
    .set({
      name: audio.fileName,
      url: audio.fileUrl,
    })
    .where(eq(files.id, audio.fileId));
}

export async function getVideoById(videoId: string) {
  const [video] = await db
    .select({
      type: sql`'video'`.as("type"),
      fileId: files.id,
      userId: files.userId,
      fileName: files.name,
      fileUrl: files.url,
      position: videos.position,
      size: videos.size,
      isFullscreen: videos.isFullscreen,
      isRandom: videos.isRandom,
    })
    .from(files)
    .innerJoin(videos, eq(files.id, videos.fileId))
    .where(eq(files.id, videoId));

  return video;
}

export async function updateVideo(video: Video) {
  const updateFileQuery = db
    .update(files)
    .set({
      name: video.fileName,
      url: video.fileUrl,
    })
    .where(eq(files.id, video.fileId));

  const updateVideoQuery = db
    .update(videos)
    .set({
      position: video.position,
      size: video.size,
      isFullscreen: video.isFullscreen,
      isRandom: video.isRandom,
    })
    .where(eq(videos.fileId, video.fileId));

  await Promise.all([updateFileQuery, updateVideoQuery]);
}

export async function getVideosCount(userId: string) {
  return await db
    .selectDistinct({ count: count(videos.fileId) })
    .from(files)
    .innerJoin(videos, eq(files.id, videos.fileId))
    .where(eq(files.userId, userId));
}

export async function getAudiosCount(userId: string) {
  return await db
    .selectDistinct({ count: count(audios.fileId) })
    .from(files)
    .innerJoin(audios, eq(files.id, audios.fileId))
    .where(eq(files.userId, userId));
}

export async function getDeck(userId: string) {
  const [deck] = await db.select().from(decks).where(eq(decks.userId, userId));

  return deck;
}

export async function getDeckById(deckId: string) {
  const [deck] = await db.select().from(decks).where(eq(decks.id, deckId));

  return deck;
}

export async function deleteFile(fileId: string) {
  return await db.delete(files).where(eq(files.id, fileId));
}
