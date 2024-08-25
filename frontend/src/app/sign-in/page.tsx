import SignInButton from "~/components/auth/sign-in-button";
import Background from "~/components/layouts/background";

export default function SignInPage() {
  return (
    <>
      <main className="grid h-screen place-items-center">
        <section className="max-w-[350px]">
          <h1 className="flex gap-1 text-6xl font-bold">
            <span className="text-blue-500">#</span>
            <span>Sign In</span>
          </h1>
          <p className="mt-4 text-neutral-500">
            Sign in with your Twitch account to start using our service.
          </p>
          <SignInButton />
        </section>
      </main>
      <Background />
    </>
  );
}
