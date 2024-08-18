import { eq } from "drizzle-orm";
import { db } from "./db";
import { files, videos } from "./db/schema";

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

export async function getVideos(userId: string) {
  return await db
    .select({
      fileId: files.id,
      fileName: files.name,
      fileUrl: files.url,
      isFullscreen: videos.isFullscreen,
      isRandom: videos.isRandom,
    })
    .from(files)
    .innerJoin(videos, eq(files.userId, userId));
}
