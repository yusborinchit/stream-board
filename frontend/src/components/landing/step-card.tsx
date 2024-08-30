interface Props {
  children: React.ReactNode;
}

export default function StepCard(props: Readonly<Props>) {
  return (
    <article className="flex h-full gap-4">
      <div className="relative ml-2 min-h-full w-[2.5px] bg-neutral-800 before:absolute before:left-1/2 before:top-0 before:size-4 before:-translate-x-1/2 before:rounded-full before:bg-neutral-800 before:outline before:outline-4 before:outline-neutral-950"></div>
      {props.children}
    </article>
  );
}
