interface Props {
  deckUrl: string;
}

export default function DeckSection(props: Readonly<Props>) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold tracking-tight">
        Your Deck<span className="text-blue-500">:</span>
      </h2>
      <a
        href={props.deckUrl}
        target="_blank"
        className="w-full rounded bg-gradient-to-t from-blue-800 to-blue-500 px-4 py-2.5 text-center font-semibold text-neutral-50 hover:shadow-xl hover:shadow-blue-600/30"
      >
        Go to your Deck
      </a>
    </section>
  );
}
