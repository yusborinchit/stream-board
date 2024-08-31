import Container from "../layouts/container";

export default function Footer() {
  return (
    <Container
      as="footer"
      className="mt-32 flex items-center justify-between py-8 text-neutral-800"
    >
      <p>Copyright © 2024 Stream Board. All rights reserved.</p>
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://github.com/yusborinchit"
          target="_blank"
          className="font-semibold underline"
        >
          @yusborinchit
        </a>
      </p>
    </Container>
  );
}
