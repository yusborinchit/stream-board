"use client";

import { LoaderCircle, Save, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useForm from "~/hooks/use-form";
import { VideoFormSchema } from "~/schemas/form-schemas";
import { deleteVideoAction, updateVideoAction } from "~/server/actions";
import { type Video } from "../client-deck";
import ErrorToast from "../toasts/error-toast";
import CheckboxInput from "./checkbox-input";
import ColorInput from "./color-input";
import NumberInput from "./number-input";
import TextInput from "./text-input";

interface Props {
  video: Video;
}

export default function VideoForm(props: Readonly<Props>) {
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState<"save" | "delete">("save");

  const { inputs, handleCheckboxChange, handleInputChange, handleColorChange } =
    useForm({
      name: props.video.fileName,
      color: props.video.color,
      fullscreen: props.video.isFullscreen,
      width: Number(props.video.size.split(";")[0]),
      height: Number(props.video.size.split(";")[1]),
      random: props.video.isRandom,
      x: Number(props.video.position.split(";")[0]),
      y: Number(props.video.position.split(";")[1]),
    });

  console.log(inputs.color);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (actionType === "delete") {
      formData.append("video", JSON.stringify(props.video));

      setIsLoading(true);
      if (actionType === "delete") await deleteVideoAction(formData);
      setIsLoading(false);

      return form.reset();
    }

    const result = VideoFormSchema.safeParse(inputs);

    if (!result.success)
      return toast.custom(() => <ErrorToast message="Invalid Form Data" />);

    const video = {
      ...props.video,
      fileName: result.data.name,
      color: result.data.color,
      isFullscreen: result.data.fullscreen,
      size: `${result.data.width};${result.data.height}`,
      isRandom: result.data.random,
      position: `${result.data.x};${result.data.y}`,
    };

    formData.append("video", JSON.stringify(video));

    setIsLoading(true);
    if (actionType === "save") await updateVideoAction(formData);
    setIsLoading(false);

    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
      <TextInput
        name="name"
        placeholder="Your new name here..."
        value={String(inputs.name)}
        handleChange={handleInputChange("name", "text")}
      >
        Button Name<span className="text-blue-500">:</span>
      </TextInput>
      <ColorInput
        color={String(inputs.color)}
        handleChange={handleColorChange("color")}
      >
        Button Color<span className="text-blue-500">:</span>
      </ColorInput>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold">
          Video Preview<span className="text-blue-500">:</span>
        </p>
        <video controls className="max-h-[300px] w-full rounded">
          <source src={props.video.fileUrl} type="video/mp4" />
        </video>
      </div>
      <CheckboxInput
        name="fullscreen"
        value={Boolean(inputs.fullscreen)}
        handleChange={handleCheckboxChange("fullscreen")}
      >
        Fullscreen
      </CheckboxInput>
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          name="width"
          minValue={50}
          value={String(inputs.width)}
          handleChange={handleInputChange("width", "number")}
          disabled={inputs.fullscreen as boolean}
        >
          Width <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
        <NumberInput
          name="height"
          minValue={50}
          value={String(inputs.height)}
          handleChange={handleInputChange("height", "number")}
          disabled={inputs.fullscreen as boolean}
        >
          Width <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
      </div>
      <CheckboxInput
        name="random"
        value={Boolean(inputs.random)}
        handleChange={handleCheckboxChange("random")}
      >
        Random
      </CheckboxInput>
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          name="x"
          minValue={0}
          value={String(inputs.x)}
          handleChange={handleInputChange("x", "number")}
          disabled={inputs.random as boolean}
        >
          X Position <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
        <NumberInput
          name="y"
          minValue={0}
          value={String(inputs.y)}
          handleChange={handleInputChange("y", "number")}
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
