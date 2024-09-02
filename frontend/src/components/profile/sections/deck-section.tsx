import { type Deck } from "~/app/profile/deck/[deckId]/page";
import { type Trigger } from "../client-deck";

interface Props {
  deck: Deck;
  triggers: Trigger[];
}

export default function DeckSection(props: Readonly<Props>) {
  const [cols, rows] = props.deck.size.split(";");
  const totalCells = Number(cols) * Number(rows);

  const css = {
    "--cols": `${cols}`,
    "--rows": `${rows}`,
  } as React.CSSProperties;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">
        Your Deck<span className="text-blue-500">:</span>
      </h2>
      <div
        style={css}
        className="grid grid-cols-[repeat(var(--cols),1fr)] grid-rows-[repeat(var(--rows),1fr)] gap-2"
      >
        {Array.from({ length: totalCells }).map((_, i) => (
          <select
            key={i}
            className="grid aspect-square appearance-none place-items-center rounded-md border border-neutral-800 bg-neutral-900/80"
          >
            <option></option>
            {props.triggers.map((trigger) => (
              <option key={trigger.fileId}>{trigger.fileName}</option>
            ))}
          </select>
        ))}
      </div>
    </section>
  );
}
