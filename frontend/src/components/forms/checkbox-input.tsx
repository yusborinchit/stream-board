"use client";

import { useId } from "react";

interface Props {
  children: React.ReactNode;
  name: string;
  value: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxInput(props: Readonly<Props>) {
  const id = useId();

  return (
    <label htmlFor={id} className="flex items-center gap-3">
      <input
        id={id}
        name={props.name}
        type="checkbox"
        checked={props.value}
        onChange={props.handleChange}
        className="size-[16px] rounded-full border border-neutral-800 bg-neutral-900"
      />
      <span>{props.children}</span>
    </label>
  );
}
