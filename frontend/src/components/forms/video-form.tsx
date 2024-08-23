"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { updateVideoAction } from "~/server/actions";
import { type Video } from "../deck";
import CheckboxInput from "./checkbox-input";
import NumberInput from "./number-input";
import TextInput from "./text-input";

interface Props {
  video: Video;
}

export default function VideoForm(props: Readonly<Props>) {
  const [inputs, setInputs] = useState({
    name: props.video.fileName,
    fullscreen: props.video.isFullscreen,
    width: props.video.size.split(";")[0]!,
    height: props.video.size.split(";")[1]!,
    random: props.video.isRandom,
    x: props.video.position.split(";")[0]!,
    y: props.video.position.split(";")[1]!,
  });

  function handleCheckboxChange(checkbox: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        [checkbox]: event.target.checked,
      });
    };
  }

  function handleInputChange(input: string) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputs({
        ...inputs,
        [input]: event.target.value,
      });
    };
  }

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

    await updateVideoAction(formData);
    form.reset();
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 py-4">
      <TextInput
        name="name"
        placeholder="Your new name here..."
        value={inputs.name}
        handleChange={handleInputChange("name")}
      >
        Video Name<span className="text-blue-500">:</span>
      </TextInput>
      <CheckboxInput
        name="fullscreen"
        value={inputs.fullscreen}
        handleChange={handleCheckboxChange("fullscreen")}
      >
        Fullscreen
      </CheckboxInput>
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          name="width"
          minValue={50}
          value={inputs.width}
          handleChange={handleInputChange("width")}
          disabled={inputs.fullscreen}
        >
          Width <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
        <NumberInput
          name="height"
          minValue={50}
          value={inputs.height}
          handleChange={handleInputChange("height")}
          disabled={inputs.fullscreen}
        >
          Width <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
      </div>
      <CheckboxInput
        name="random"
        value={inputs.random}
        handleChange={handleCheckboxChange("random")}
      >
        Random
      </CheckboxInput>
      <div className="grid grid-cols-2 gap-4">
        <NumberInput
          name="x"
          minValue={0}
          value={inputs.x}
          handleChange={handleInputChange("x")}
          disabled={inputs.random}
        >
          X Position <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
        <NumberInput
          name="y"
          minValue={0}
          value={inputs.y}
          handleChange={handleInputChange("y")}
          disabled={inputs.random}
        >
          Y Position <span className="text-neutral-500">(On Pixels)</span>
          <span className="text-blue-500">:</span>
        </NumberInput>
      </div>
      <button className="mt-8 flex items-center justify-center gap-2 rounded bg-gradient-to-t from-blue-700 to-blue-500 px-4 py-2.5 font-semibold">
        <Save className="size-5" />
        <span>Save Video</span>
      </button>
    </form>
  );
}
