import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `stream-board_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const files = createTable(
  "file",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    name: varchar("name", { length: 255 }).notNull(),
    url: varchar("url", { length: 255 }).notNull(),
  },
  (file) => ({
    userIdIdx: index("file_user_id_idx").on(file.userId),
  }),
);

export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, { fields: [files.userId], references: [users.id] }),
}));

export const videos = createTable(
  "video",
  {
    fileId: varchar("file_id", { length: 255 })
      .notNull()
      .primaryKey()
      .references(() => files.id),
    isFullscreen: boolean("is_fullscreen").notNull().default(false),
    isRandom: boolean("is_random").notNull().default(true),
  },
  (video) => ({
    fileIdIdx: index("video_file_id_idx").on(video.fileId),
  }),
);

export const videosRelations = relations(videos, ({ one }) => ({
  file: one(files, { fields: [videos.fileId], references: [files.id] }),
}));

export const audios = createTable(
  "audio",
  {
    fileId: varchar("file_id", { length: 255 })
      .notNull()
      .primaryKey()
      .references(() => files.id),
  },
  (audio) => ({
    fileIdIdx: index("audio_file_id_idx").on(audio.fileId),
  }),
);

export const audiosRelations = relations(audios, ({ one }) => ({
  file: one(files, { fields: [audios.fileId], references: [files.id] }),
}));
