import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from "~/server/auth";
import {
  getAudiosCount,
  getVideosCount,
  insertAudio,
  insertFile,
  insertVideo,
} from "~/server/queries";

const f = createUploadthing();

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "8MB" } })
    .middleware(async () => {
      const session = await getServerAuthSession();
      if (!session) throw new UploadThingError("Unauthorized");

      const [videosCount] = await getVideosCount(session.user.id);
      if (!videosCount || videosCount.count >= 20)
        throw new UploadThingError("Exceeded limit of videos");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileResult = await insertFile(metadata.userId, file.name, file.url);
      if (fileResult.error || !fileResult.fileId)
        throw new UploadThingError("Failed to insert file");

      const videoResult = await insertVideo(fileResult.fileId);
      if (videoResult.error || !videoResult.videoId)
        throw new UploadThingError("Failed to insert video");

      return { videoId: videoResult.videoId, uploadedBy: metadata.userId };
    }),
  audioUploader: f({ audio: { maxFileSize: "8MB" } })
    .middleware(async () => {
      const session = await getServerAuthSession();
      if (!session) throw new UploadThingError("Unauthorized");

      const [audiosCount] = await getAudiosCount(session.user.id);
      if (!audiosCount || audiosCount.count >= 20)
        throw new UploadThingError("Exceeded limit of sounds");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const fileResult = await insertFile(metadata.userId, file.name, file.url);
      if (fileResult.error || !fileResult.fileId)
        throw new UploadThingError("Failed to insert file");

      const audioResult = await insertAudio(fileResult.fileId);
      if (audioResult.error || !audioResult.audioId)
        throw new UploadThingError("Failed to insert video");

      return { audioId: audioResult.audioId, uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
