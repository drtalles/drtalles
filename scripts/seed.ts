import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { users } from "../src/db/schema"
import bcrypt from "bcryptjs"
import * as dotenv from "dotenv"

dotenv.config()

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle(sql)

async function seed() {
  const email = "admin@drtalles.com.br"
  const senha = "Admin@2025"

  const hash = await bcrypt.hash(senha, 12)

  await db.insert(users).values({
    name: "Dr. Talles",
    email,
    password: hash,
  }).onConflictDoNothing()

  console.log("✅ Usuário admin criado com sucesso!")
  console.log(`   Email: ${email}`)
  console.log(`   Senha: ${senha}`)
  console.log("\n⚠️  Troque a senha após o primeiro acesso.")
}

seed().catch(console.error)
