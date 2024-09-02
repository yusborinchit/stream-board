import { Info } from "lucide-react";
import BoardLink from "../board-link";

interface Props {
  boardId: string;
}

export default function BoardSection(props: Readonly<Props>) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">
        Your Board<span className="text-blue-500">:</span>
      </h2>
      <div className="flex flex-col gap-4 rounded border border-red-900/80 bg-red-950/60 p-4">
        <div className="flex items-center gap-2 text-red-700">
          <Info className="size-7" />
          <p className="font-semibold">
            Please <span className="underline">don&apos;t share</span> this link
            with <span className="underline">anyone</span> &darr;
          </p>
        </div>
      </div>
      <BoardLink boardId={props.boardId} />
    </section>
  );
}
