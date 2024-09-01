import { getAudios } from "~/server/queries";
import AudioCard from "../cards/audio-card";
import CardsList from "../cards/cards-list";
import UploadAudioButton from "../upload-thing/upload-audio-button";

interface Props {
  userId: string;
}

export default async function AudiosSection(props: Readonly<Props>) {
  const audios = await getAudios(props.userId);

  return (
    <section className="flex flex-col gap-4">
      <header className="flex flex-col items-center justify-between gap-4 min-[450px]:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          Your Sounds{" "}
          <span className="text-neutral-700">({audios.length}/20)</span>
          <span className="text-blue-500">:</span>
        </h2>
        <UploadAudioButton disabled={audios.length === 20} />
      </header>
      {audios.length > 0 && (
        <CardsList>
          {audios.map((audio) => (
            <AudioCard
              key={audio.fileId}
              id={audio.fileId}
              name={audio.fileName}
            />
          ))}
        </CardsList>
      )}
    </section>
  );
}
