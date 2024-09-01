"use client";

import { useId } from "react";

interface Props {
  children: React.ReactNode;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput(props: Readonly<Props>) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold">
        {props.children}
      </label>
      <input
        id={id}
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        className="rounded border border-neutral-800 bg-neutral-900 px-4 py-2.5 placeholder:text-neutral-500"
      />
    </div>
  );
}
