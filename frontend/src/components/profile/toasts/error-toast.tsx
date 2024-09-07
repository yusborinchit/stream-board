import { CircleX } from "lucide-react";

interface Props {
  message: string;
}

export default function ErrorToast(props: Readonly<Props>) {
  return (
    <div className="flex items-center gap-2 rounded border border-red-900/80 bg-red-950 p-4 font-semibold text-red-700 backdrop-blur-md">
      <CircleX className="size-7" />
      <span>{props.message}</span>
    </div>
  );
}
