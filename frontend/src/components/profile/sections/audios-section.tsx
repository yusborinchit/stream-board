import { Wind } from "lucide-react";
import AudioCard from "../cards/audio-card";
import CardsList from "../cards/cards-list";
import { type Audio } from "../client-deck";
import UploadAudioButton from "../upload-thing/upload-audio-button";

interface Props {
  userId: string;
  audios: Audio[];
}

export default async function AudiosSection(props: Readonly<Props>) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-center justify-between gap-4 min-[450px]:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          Your Sounds{" "}
          <span className="text-neutral-700">({props.audios.length}/20)</span>
          <span className="text-blue-500">:</span>
        </h2>
        <UploadAudioButton disabled={props.audios.length === 20} />
      </header>
      {props.audios.length > 0 ? (
        <CardsList>
          {props.audios.map((audio) => (
            <AudioCard
              key={audio.fileId}
              id={audio.fileId}
              name={audio.fileName}
            />
          ))}
        </CardsList>
      ) : (
        <div className="flex items-center gap-4 text-neutral-900">
          <Wind className="size-24" />
          <p className="text-3xl font-bold leading-tight tracking-tighter">
            Ups!
            <br /> You don&apos;t have any videos yet.
          </p>
        </div>
      )}
    </section>
  );
}
