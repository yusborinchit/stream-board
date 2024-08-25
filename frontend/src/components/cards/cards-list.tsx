interface Props {
  children: React.ReactNode;
}

export default function CardsList(props: Readonly<Props>) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
      {props.children}
    </ul>
  );
}