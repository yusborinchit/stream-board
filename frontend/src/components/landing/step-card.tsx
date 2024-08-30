interface Props {
  step: number;
  title: string;
  description: string;
  className?: string;
}

export default function StepCard(props: Readonly<Props>) {
  return (
    <article className="group grid grid-cols-[1fr_14px_1fr] gap-4">
      <div className="relative col-start-2 row-start-1 mx-auto w-[2px] bg-neutral-800 before:absolute before:left-1/2 before:top-0 before:size-3.5 before:-translate-x-1/2 before:rounded-full before:bg-neutral-800 before:outline before:outline-4 before:outline-neutral-950" />
      <div className="row-start-1 group-odd:col-start-1 group-odd:text-end group-even:col-start-3 group-even:text-start">
        <h4 className="text-xl font-semibold group-last:text-4xl">
          {props.step}
          <span className="text-blue-600">. </span>
          {props.title}
        </h4>
        <p className="pb-8 text-neutral-500 group-last:pb-4">
          {props.description}
        </p>
      </div>
    </article>
  );
}
