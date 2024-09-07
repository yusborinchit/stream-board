"use client";

import { HexColorPicker } from "react-colorful";

interface Props {
  children: React.ReactNode;
  color: string;
  handleChange: (newColor: string) => void;
}

export default function ColorInput(props: Readonly<Props>) {
  return (
    <div className="flex h-[150px] flex-col gap-1">
      <label className="text-sm font-semibold">{props.children}</label>
      <HexColorPicker color={props.color} onChange={props.handleChange} />
    </div>
  );
}
