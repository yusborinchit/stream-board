import { LoaderCircle, Save } from "lucide-react";
import { useFormStatus } from "react-dom";

interface Props {
  children: React.ReactNode;
}

export default function SaveButton(props: Readonly<Props>) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="mt-8 flex items-center justify-center gap-2 rounded bg-gradient-to-t from-blue-700 to-blue-500 px-4 py-2.5 font-semibold disabled:opacity-50"
    >
      {pending ? (
        <>
          <LoaderCircle className="size-5 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Save className="size-5" />
          <span>{props.children}</span>
        </>
      )}
    </button>
  );
}
