import StepCard from "~/components/landing/step-card";
import Background from "~/components/layouts/background";
import Container from "~/components/layouts/container";

export default function HomePage() {
  return (
    <>
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
      <main className="py-4">
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
              Whether you&apos;re a professional streamer or just getting
              started, our platform gives you the tools to elevate your content
              effortlessly.
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
        <Container as="section" className="mt-32 grid gap-4 sm:grid-cols-2">
          <article className="rounded-md bg-gradient-to-t from-neutral-900/40 via-neutral-900/10 px-6 py-10 shadow">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-blue-600"># </span>
              All this... Free?
            </h2>
            <p className="mt-4 text-neutral-500">
              Yes, you heard that right, all the tools you need to elevate your
              stream are completely free to use!
            </p>
            <p className="mt-4 text-neutral-500">
              Upload your media, customize your deck, and take charge of your
              streaming experience—all without spending a single cent.
            </p>
          </article>
          <article className="rounded-md bg-gradient-to-t from-neutral-900/40 via-neutral-900/10 px-6 py-10 shadow">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="text-blue-600"># </span>
              What&apos;s the Catch?
            </h2>
            <p className="mt-4 text-neutral-500">
              Our free plan provides access to all the essential features to
              kickstart your streaming journey.
            </p>
            <p className="mt-4 text-neutral-500">
              Stay within the generous limit of 20 videos and 20 sounds, and
              you’ll never have to pay a single penny.
            </p>
          </article>
        </Container>
        <Container as="section" className="mt-32">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight">
            <span className="text-blue-600"># </span>
            And How it Works?
          </h2>
          <p className="mx-auto max-w-xl text-center text-neutral-500">
            Follow the steps below to get started with Stream Board and level up
            your stream.
          </p>
          <div className="mt-12">
            <StepCard
              step={1}
              title="Sign Up"
              description="Sign up with your Twitch account here."
            />
            <StepCard
              step={2}
              title="Submit your media"
              description="Submit up to 20 videos and 20 sounds to our platform."
            />
            <StepCard
              step={3}
              title="Customize your deck"
              description="Customize your deck with our drag-and-drop editor."
            />
            <StepCard
              step={4}
              title="Enjoy! 🎉"
              description="Upload your media, customize your deck, and take charge of your streaming experience, all without spending a single cent."
            />
          </div>
        </Container>
      </main>
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
      <Background />
    </>
  );
}
