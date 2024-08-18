"use client";

import { UploadButton } from "~/utils/uploadthing";

export default function UploadVideoButton() {
  return (
    <UploadButton
      endpoint="videoUploader"
      className="w-full ut-button:w-full ut-button:rounded ut-button:bg-blue-500 ut-button:px-4 ut-button:py-2.5 ut-button:font-semibold ut-allowed-content:text-neutral-500 sm:w-fit sm:ut-button:w-fit"
    />
  );
}
