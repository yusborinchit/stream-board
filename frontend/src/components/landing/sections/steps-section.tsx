import Container from "~/components/layouts/container";
import StepCard from "../step-card";

export default function StepsSection() {
  return (
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
  );
}
