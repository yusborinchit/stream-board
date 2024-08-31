import Container from "~/components/layouts/container";
import PricingCard from "../pricing-card";

export default function PricingSection() {
  return (
    <Container as="section" className="mt-32 grid gap-4 sm:grid-cols-2">
      <PricingCard title="All this... Free?">
        <p>
          Yes, you heard that right, all the tools you need to elevate your
          stream are completely free to use!
        </p>
        <p>
          Upload your media, customize your deck, and take charge of your
          streaming experience—all without spending a single cent.
        </p>
      </PricingCard>
      <PricingCard title="What's the Catch?">
        <p>
          Our free plan provides access to all the essential features to
          kickstart your streaming journey.
        </p>
        <p>
          Stay within the generous limit of 20 videos and 20 sounds, and you’ll
          never have to pay a single penny.
        </p>
      </PricingCard>
    </Container>
  );
}
