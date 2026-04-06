import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminHash = '$2b$10$5x/NpYuRpRa4xSiUY9szm.ef7mud0xW4yKRB054NIJLpbHFOGi6BC'

  console.log('EMAIL ENV:', adminEmail)
  console.log('HASH ENV:', adminHash)
  console.log('INPUT EMAIL:', credentials?.email)
  console.log('INPUT PASSWORD:', credentials?.password)

  if (!credentials?.email || !credentials?.password) {
    console.log('FAIL: missing credentials')
    return null
  }
  if (credentials.email !== adminEmail) {
    console.log('FAIL: email mismatch')
    return null
  }

  const valid = await bcrypt.compare(
    credentials.password as string,
    adminHash as string
  )
  console.log('PASSWORD VALID:', valid)
  if (!valid) return null

  return { id: "1", email: adminEmail, name: "Admin" }
},
    }),
  ],
  pages: { 
  signIn: "/admin/login",
  error: "/api/auth/error"
},
})