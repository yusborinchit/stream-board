import Container from "~/components/layouts/container";

export default function HeroSection() {
  return (
    <Container as="div" className="flex flex-col items-center gap-4 py-4">
      <h1 className="mt-48 text-center text-5xl font-bold tracking-tight">
        Enhance your Stream with Stream Board
      </h1>
      <p className="max-w-md text-pretty text-center text-neutral-500">
        Stream Board is a tool to enhance your stream with custom videos and
        audios.
      </p>
      <a
        href="/profile"
        className="grid rounded bg-gradient-to-t from-blue-800 to-blue-500 px-4 py-2.5 text-lg font-semibold text-neutral-50 hover:shadow-xl hover:shadow-blue-600/30"
      >
        Start Now with Us
      </a>
    </Container>
  );
}
