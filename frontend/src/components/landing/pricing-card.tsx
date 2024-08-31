import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function PricingCard(props: Readonly<Props>) {
  return (
    <article className="flex flex-col gap-4 rounded-md bg-gradient-to-t from-neutral-900/40 via-neutral-900/10 px-6 py-10 shadow [&>p]:text-neutral-500">
      <h2 className="text-3xl font-bold tracking-tight">
        <span className="text-blue-600"># </span>
        {props.title}
      </h2>
      {props.children}
    </article>
  );
}
