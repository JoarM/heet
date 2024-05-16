import { mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("user", {
    id: varchar("id", { length: 255 }).unique().notNull().primaryKey(),
    username: varchar("username", { length: 128 }).unique()
})