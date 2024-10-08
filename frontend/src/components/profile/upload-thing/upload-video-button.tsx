"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { UploadButton } from "~/utils/uploadthing";

interface Props {
  disabled: boolean;
}

export default function UploadVideoButton(props: Readonly<Props>) {
  const router = useRouter();

  return (
    <UploadButton
      disabled={props.disabled}
      endpoint="videoUploader"
      onClientUploadComplete={() => router.refresh()}
      content={{
        button({ isUploading, uploadProgress }) {
          if (isUploading)
            return <span className="z-10">{`${uploadProgress}%`}</span>;
          return "New Video";
        },
      }}
      className={twMerge(
        "w-full ut-button:grid ut-button:h-auto ut-button:w-full ut-button:place-items-center ut-button:rounded ut-button:bg-gradient-to-t ut-button:from-blue-800 ut-button:to-blue-500 ut-button:px-4 ut-button:py-2.5 ut-button:text-base ut-button:font-semibold hover:ut-button:shadow-lg hover:ut-button:shadow-blue-600/30 ut-button:disabled:bg-neutral-900 ut-allowed-content:hidden min-[450px]:w-fit sm:ut-button:w-fit",
        props.disabled && "ut-button:opacity-50",
      )}
    />
  );
}
