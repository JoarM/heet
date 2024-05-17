import { boolean, datetime, float, int, mysqlTable, smallint, varchar } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
    id: varchar("id", { length: 255 }).unique().notNull().primaryKey(),
    username: varchar("username", { length: 128 }).unique(),
    email: varchar("email", {  length: 255 }).notNull(),
    emailConfirmed: boolean("emailConfirmed").default(false),
    phoneNumber: varchar("phoneNumber", { length: 32 }),
    country: varchar("country", { length: 128 }),
    displayName: varchar("display_name", { length: 128 }).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }).notNull()
})

export const sessionTable = mysqlTable("session", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 255
	})
		.notNull()
		.references(() => userTable.id),
	expiresAt: datetime("expires_at").notNull()
})

export const twoFactorKeyTable = mysqlTable("session", {
	id: varchar("id", {
		length: 255
	}).primaryKey(),
	userId: varchar("user_id", {
		length: 255
	})
    .notNull()
    .references(() => userTable.id),
	expiresAt: datetime("expires_at").notNull()
})

export const reviewTable = mysqlTable("review", {
    publisherId: varchar("publisher_id", {
		length: 255
	})
    .notNull()
    .references(() => userTable.id),
    title: varchar("title", { length: 128 }),
    body: varchar("body", { length: 512 }),
    rating: smallint("rating"),
    host_id: varchar("host_id", {
		length: 255
	})
    .notNull()
    .references(() => userTable.id)
})

export const eventTable = mysqlTable("event", {
    id: int("id").notNull().autoincrement().primaryKey(),
    host_id: varchar("host_id", {
		length: 255
	})
    .notNull()
    .references(() => userTable.id),
    longitude: float("longitude").notNull(),
    latitude: float("latitude").notNull(),
    title: varchar("title", { length: 128 }).notNull(),
    description: varchar("description", { length: 512 }).notNull(),
    activity: varchar("activity", { length: 64 }).notNull(),
    from: datetime("from", { mode: "date" }).notNull(),
    to: datetime("to", { mode: "date" }).notNull(),
})