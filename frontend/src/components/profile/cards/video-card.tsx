import { FileVideo } from "lucide-react";

interface Props {
  id: string;
  name: string;
}

export default function VideoCard(props: Readonly<Props>) {
  return (
    <li className="grid">
      <a
        href={`/profile/edit/video/${props.id}`}
        className="flex h-full w-full items-center gap-2 rounded border border-neutral-800 bg-neutral-900/80 p-4 backdrop-blur-sm"
      >
        <FileVideo aria-hidden className="size-6 text-neutral-500" />
        <span className="line-clamp-1">{props.name}</span>
      </a>
    </li>
  );
}
