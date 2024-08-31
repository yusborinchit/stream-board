import Container from "~/components/layouts/container";

export default function AboutUsSection() {
  return (
    <Container as="section" className="mt-32 grid gap-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          <span className="text-blue-600"># </span>
          What is Stream Board?
        </h2>
        <p className="max-w-xl text-neutral-500">
          Unleash the full potential of your live streams with our powerful,
          web-based stream deck!
        </p>
        <p className="max-w-xl text-neutral-500">
          Whether you&apos;re a professional streamer or just getting started,
          our platform gives you the tools to elevate your content effortlessly.
        </p>
      </div>
      <picture className="relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-neutral-950 before:via-neutral-950/60">
        <img
          src="/iconos.png"
          alt="An image of flying buttons"
          className="mx-auto h-full max-h-[300px] w-full max-w-[500px] object-cover object-bottom"
        />
      </picture>
    </Container>
  );
}
