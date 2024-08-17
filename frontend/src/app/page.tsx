import AccountButton from "~/components/auth/account-button";
import Board from "~/components/board";
import { getServerAuthSession } from "~/server/auth";

export default async function HomePage() {
  const session = await getServerAuthSession();
  const user = session?.user ?? null;

  return (
    <main className="mx-auto flex max-w-screen-md flex-col gap-4 p-4">
      <header className="flex items-center justify-between gap-4">
        <h1>Your Board</h1>
        <AccountButton user={user} />
      </header>
      <Board />
    </main>
  );
}
