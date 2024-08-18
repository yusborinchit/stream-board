import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerAuthSession } from "~/server/auth";
import { insertFile, insertVideo } from "~/server/queries";

const f = createUploadthing();

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "8MB" } })
    .middleware(async () => {
      const session = await getServerAuthSession();
      if (!session) throw new UploadThingError("Unauthorized");
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
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
