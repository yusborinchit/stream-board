import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { audios, files, videos } from "./db/schema";

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
    .innerJoin(videos, eq(files.userId, userId));
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
    .innerJoin(audios, eq(files.userId, userId));
}
