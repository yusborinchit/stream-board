import SignOutButton from "./auth/sign-out-button";
import Container from "./container";

export default function Header() {
  return (
    <Container as="header">
      <div className="flex items-center justify-between gap-4 py-4">
        <a href="/" className="text-xl font-bold tracking-tight">
          stream<span className="text-blue-500">/</span>board
        </a>
        <div>
          <SignOutButton />
        </div>
      </div>
    </Container>
  );
}
