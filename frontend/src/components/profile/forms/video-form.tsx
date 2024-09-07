"use client";

import { LoaderCircle, Save, Trash } from "lucide-react";
import { useState } from "react";
import useForm from "~/hooks/use-form";
import { deleteVideoAction, updateVideoAction } from "~/server/actions";
import { type Video } from "../client-deck";
import CheckboxInput from "./checkbox-input";
import NumberInput from "./number-input";
import TextInput from "./text-input";

interface Props {
  video: Video;
}

export default function VideoForm(props: Readonly<Props>) {
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState<"save" | "delete">("save");

  const { inputs, handleCheckboxChange, handleInputChange } = useForm({
    name: props.video.fileName,
    fullscreen: props.video.isFullscreen,
    width: props.video.size.split(";")[0]!,
    height: props.video.size.split(";")[1]!,
    random: props.video.isRandom,
    x: props.video.position.split(";")[0]!,
    y: props.video.position.split(";")[1]!,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append(
      "video",
      JSON.stringify({
        ...props.video,
        fileName: inputs.name,
        isFullscreen: inputs.fullscreen,
        size: `${inputs.width};${inputs.height}`,
        isRandom: inputs.random,
        position: `${inputs.x};${inputs.y}`,
      }),
    );

    setIsLoading(true);
    if (actionType === "save") await updateVideoAction(formData);
    if (actionType === "delete") await deleteVideoAction(formData);
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
      <CheckboxInput
        name="fullscreen"
        value={inputs.fullscreen as boolean}
        handleChange={handleCheckboxChange("fullscreen")}
      >
        Fullscreen
      </CheckboxInput>
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          name="width"
          minValue={50}
          value={inputs.width as string}
          handleChange={handleInputChange("width")}
          disabled={inputs.fullscreen as boolean}
        >
          Width <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
        <NumberInput
          name="height"
          minValue={50}
          value={inputs.height as string}
          handleChange={handleInputChange("height")}
          disabled={inputs.fullscreen as boolean}
        >
          Width <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
      </div>
      <CheckboxInput
        name="random"
        value={inputs.random as boolean}
        handleChange={handleCheckboxChange("random")}
      >
        Random
      </CheckboxInput>
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          name="x"
          minValue={0}
          value={inputs.x as string}
          handleChange={handleInputChange("x")}
          disabled={inputs.random as boolean}
        >
          X Position <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
        <NumberInput
          name="y"
          minValue={0}
          value={inputs.y as string}
          handleChange={handleInputChange("y")}
          disabled={inputs.random as boolean}
        >
          Y Position <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-4">
        <button
          disabled={isLoading}
          type="submit"
          onClick={() => setActionType("save")}
          value="save"
          className="flex items-center justify-center gap-2 rounded bg-gradient-to-t from-blue-700 to-blue-500 px-4 py-2.5 font-semibold disabled:opacity-50"
        >
          {isLoading ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            <Save className="size-5" />
          )}
          {isLoading ? <span>Loading...</span> : <span>Save Video</span>}
        </button>
        <button
          disabled={isLoading}
          type="submit"
          onClick={() => setActionType("delete")}
          value="delete"
          className="flex items-center justify-center gap-2 rounded bg-gradient-to-t from-red-900 to-red-600 px-4 py-2.5 font-semibold disabled:opacity-50"
        >
          {isLoading ? (
            <LoaderCircle className="size-5 animate-spin" />
          ) : (
            <Trash className="size-5" />
          )}
          {isLoading ? <span>Loading...</span> : <span>Delete Video</span>}
        </button>
      </div>
    </form>
  );
}
