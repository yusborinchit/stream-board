"use client";

import { LoaderCircle, Save } from "lucide-react";
import { useState } from "react";
import useForm from "~/hooks/use-form";
import { updateAudioAction } from "~/server/actions";
import { type Audio } from "../deck";
import TextInput from "./text-input";

interface Props {
  audio: Audio;
}

export default function AudioForm(props: Readonly<Props>) {
  const [isLoading, setIsLoading] = useState(false);
  const { inputs, handleInputChange } = useForm({
    name: props.audio.fileName,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "audio",
      JSON.stringify({
        ...props.audio,
        fileName: inputs.name,
      }),
    );

    setIsLoading(true);
    await updateAudioAction(formData);
    setIsLoading(false);

    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
      <TextInput
        name="name"
        placeholder="Your new name here..."
        value={inputs.name as string}
        handleChange={handleInputChange("name")}
      >
        Button Name<span className="text-blue-500">:</span>
      </TextInput>
      <button
        disabled={isLoading}
        type="submit"
        className="mt-8 flex items-center justify-center gap-2 rounded bg-gradient-to-t from-blue-700 to-blue-500 px-4 py-2.5 font-semibold disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <LoaderCircle className="size-5 animate-spin" />
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save className="size-5" />
            <span>Save Video</span>
          </>
        )}
      </button>
    </form>
  );
}
