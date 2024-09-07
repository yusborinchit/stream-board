import { FileAudio } from "lucide-react";

interface Props {
  id: string;
  name: string;
}

export default function AudioCard(props: Readonly<Props>) {
  return (
    <li className="grid">
      <a
        href={`/profile/edit/audio/${props.id}`}
        className="flex h-full w-full items-center gap-2 overflow-hidden rounded border border-neutral-800 bg-neutral-900/80 p-4 backdrop-blur-sm"
      >
        <FileAudio aria-hidden className="size-6 shrink-0 text-neutral-500" />
        <span className="line-clamp-1">{props.name}</span>
      </a>
    </li>
  );
}
