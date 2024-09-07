"use client";

import { useState } from "react";

type InputType = string | boolean | number;

export default function useForm(defaultInputs: Record<string, InputType>) {
  const [inputs, setInputs] = useState(defaultInputs);

  function handleCheckboxChange(checkbox: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        [checkbox]: event.target.checked,
      });
    };
  }

  function handleInputChange(input: string, type: "text" | "number") {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        [input]:
          type === "text" ? event.target.value : Number(event.target.value),
      });
    };
  }

  return { inputs, handleCheckboxChange, handleInputChange };
}
