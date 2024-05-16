import { Config } from "drizzle-kit"

export default {
    out: "./drizzle",
    schema: "./db/schema.ts",
    breakpoints: false,
    dialect: "mysql"
} satisfies Config