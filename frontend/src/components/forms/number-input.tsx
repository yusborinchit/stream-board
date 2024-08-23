"use client";

import { useId } from "react";

interface Props {
  children: React.ReactNode;
  name: string;
  minValue: number;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export default function NumberInput(props: Readonly<Props>) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold">
        {props.children}
      </label>
      <input
        id={id}
        name={props.name}
        type="number"
        min={props.minValue}
        value={props.value}
        onChange={props.handleChange}
        disabled={props.disabled}
        className="rounded border border-neutral-800 bg-neutral-900 px-4 py-2.5 placeholder:text-neutral-500 disabled:cursor-not-allowed disabled:appearance-none disabled:opacity-50"
      />
    </div>
  );
}
