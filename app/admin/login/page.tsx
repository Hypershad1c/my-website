"use client"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const form = e.currentTarget
    const res = await signIn("credentials", {
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      password: (form.elements.namedItem("password") as HTMLInputElement).value,
      redirect: false,
    })
    if (res?.error) {
      setError("Invalid credentials")
      setLoading(false)
    } else {
      router.push("/admin")
    }
  }

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "#0a0a0a", fontFamily: "'DM Mono', monospace"
    }}>
      <div style={{
        background: "#111", border: "1px solid #222", padding: "48px",
        width: "100%", maxWidth: "400px"
      }}>
        <h1 style={{ color: "#fff", fontSize: "20px", marginBottom: "8px", letterSpacing: "0.1em" }}>
          ADMIN ACCESS
        </h1>
        <p style={{ color: "#555", fontSize: "12px", marginBottom: "32px" }}>ZeroLag Labs</p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input name="email" type="email" placeholder="email" required style={{
            background: "#0a0a0a", border: "1px solid #333", color: "#fff",
            padding: "12px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit"
          }} />
          <input name="password" type="password" placeholder="password" required style={{
            background: "#0a0a0a", border: "1px solid #333", color: "#fff",
            padding: "12px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit"
          }} />
          {error && <p style={{ color: "#ff4444", fontSize: "12px" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            background: "#fff", color: "#000", border: "none", padding: "12px",
            fontSize: "14px", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em",
            marginTop: "8px"
          }}>
            {loading ? "..." : "ENTER"}
          </button>
        </form>
      </div>
    </div>
  )
}