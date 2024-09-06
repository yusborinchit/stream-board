import Container from "../layouts/container";

export default function Footer() {
  return (
    <div className="bg-neutral-950">
      <Container
        as="footer"
        className="flex items-center justify-between py-8 pt-32 text-neutral-500"
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
    </div>
  );
}
