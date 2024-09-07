import { type User } from "next-auth";
import SignOutButton from "../auth/sign-out-button";
import Container from "../layouts/container";

interface Props {
  user: User;
}

export default function Header(props: Readonly<Props>) {
  return (
    <Container as="header">
      <div className="flex items-center justify-between gap-4 py-4">
        <a href="/" className="text-xl font-bold tracking-tight">
          stream<span className="text-blue-500">/</span>board
        </a>
        <div>
          <SignOutButton user={props.user} />
        </div>
      </div>
    </Container>
  );
}
