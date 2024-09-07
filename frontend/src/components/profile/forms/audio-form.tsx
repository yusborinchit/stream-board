"use client";

import { LoaderCircle, Save, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import useForm from "~/hooks/use-form";
import { AudioFormSchema } from "~/schemas/form-schemas";
import { deleteAudioAction, updateAudioAction } from "~/server/actions";
import { type Audio } from "../client-deck";
import ErrorToast from "../toasts/error-toast";
import TextInput from "./text-input";

interface Props {
  audio: Audio;
}

export default function AudioForm(props: Readonly<Props>) {
  const [isLoading, setIsLoading] = useState(false);
  const [actionType, setActionType] = useState<"save" | "delete">("save");

  const { inputs, handleInputChange } = useForm({
    name: props.audio.fileName,
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (actionType === "delete") {
      formData.append("audio", JSON.stringify(props.audio));

      setIsLoading(true);
      await deleteAudioAction(formData);
      setIsLoading(false);

      return form.reset();
    }

    const result = AudioFormSchema.safeParse(inputs);

    if (!result.success)
      return toast.custom(() => <ErrorToast message="Invalid Form Data" />);

    const audio = {
      ...props.audio,
      fileName: result.data.name,
    };

    formData.append("audio", JSON.stringify(audio));

    setIsLoading(true);
    if (actionType === "save") await updateAudioAction(formData);
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
          {isLoading ? <span>Loading...</span> : <span>Save Sound</span>}
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
          {isLoading ? <span>Loading...</span> : <span>Delete Sound</span>}
        </button>
      </div>
    </form>
  );
}
