import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import TwitchProvider from "next-auth/providers/twitch";
import { env } from "~/env";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },

  adapter: DrizzleAdapter(db, {
    /* @ts-expect-error t3 error */
    usersTable: users,
    /* @ts-expect-error t3 error */
    accountsTable: accounts,
    /* @ts-expect-error t3 error */
    sessionsTable: sessions,
    /* @ts-expect-error t3 error */
    verificationTokensTable: verificationTokens,
  }) as Adapter,
  providers: [
    TwitchProvider({
      clientId: env.TWITCH_CLIENT_ID,
      clientSecret: env.TWITCH_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = () => getServerSession(authOptions);
