import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Container(props: Readonly<Props>) {
  const Component = props.as ?? "div";

  return (
    <Component
      className={twMerge("mx-auto max-w-screen-md px-4", props.className ?? "")}
    >
      {props.children}
    </Component>
  );
}
