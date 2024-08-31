interface Props {
  step: number;
  title: string;
  description: string;
  className?: string;
}

export default function StepCard(props: Readonly<Props>) {
  return (
    <article className="group grid grid-cols-[14px_1fr] gap-4 sm:grid-cols-[1fr_14px_1fr]">
      <div className="relative row-start-1 mx-auto w-[2px] bg-neutral-900 before:absolute before:left-1/2 before:top-0 before:size-3.5 before:-translate-x-1/2 before:rounded-full before:bg-neutral-900 before:outline before:outline-4 before:outline-neutral-950 sm:col-start-2" />
      <div className="row-start-1 sm:group-odd:col-start-1 sm:group-odd:text-end sm:group-even:col-start-3 sm:group-even:text-start">
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
