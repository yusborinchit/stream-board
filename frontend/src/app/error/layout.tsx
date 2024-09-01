interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Stream Board | Error",
};

export default function ErrorLayout(props: Readonly<Props>) {
  return props.children;
}
