"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function UploadVideoButton() {
  const router = useRouter();

  return (
    <UploadButton
      endpoint="videoUploader"
      onClientUploadComplete={() => router.refresh()}
      content={{
        button({ isUploading, uploadProgress }) {
          if (isUploading)
            return <span className="z-10">{`${uploadProgress}%`}</span>;
          return "New Video";
        },
      }}
      className="w-full ut-button:grid ut-button:h-auto ut-button:w-full ut-button:place-items-center ut-button:rounded ut-button:bg-gradient-to-t ut-button:from-blue-800 ut-button:to-blue-500 ut-button:px-4 ut-button:py-2.5 ut-button:text-base ut-button:font-semibold ut-allowed-content:text-neutral-500 sm:w-fit sm:ut-button:w-fit"
    />
  );
}
