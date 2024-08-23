interface Props {
  children: React.ReactNode;
  as?: React.ElementType;
}

export default function Container(props: Readonly<Props>) {
  const Component = props.as ?? "div";

  return (
    <Component className="mx-auto max-w-screen-md px-4">
      {props.children}
    </Component>
  );
}
