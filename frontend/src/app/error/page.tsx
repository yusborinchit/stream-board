import Background from "~/components/layouts/background";

interface Props {
  searchParams: {
    code: string;
    message: string;
  };
}

export default function ErrorPage(props: Readonly<Props>) {
  return (
    <>
      <main className="grid h-screen place-items-center p-4">
        <div className="text-center">
          <h1 className="text-7xl font-black tracking-tight">
            Error <span className="text-blue-600">#</span>
            {props.searchParams.code}
          </h1>
          <p className="mx-auto max-w-xl text-lg text-neutral-500">
            {props.searchParams.message}
          </p>
        </div>
      </main>
      <Background />
    </>
  );
}
