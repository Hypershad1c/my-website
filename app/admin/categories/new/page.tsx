import { db } from "@/lib/db"
import { redirect } from "next/navigation"

export default async function NewCategoryPage() {
  async function createCategory(formData: FormData) {
    "use server"
    await db.category.create({
      data: {
        name: formData.get("name") as string,
      }
    })
    redirect("/admin")
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'DM Mono', monospace", padding: "48px 32px" }}>
      <h1 style={{ fontSize: "14px", letterSpacing: "0.1em", marginBottom: "32px" }}>NEW CATEGORY</h1>
      <form action={createCategory} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
        <input
          name="name"
          type="text"
          placeholder="Category name"
          required
          style={{ background: "#111", border: "1px solid #222", color: "#fff", padding: "14px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
        />
        <div style={{ display: "flex", gap: "12px" }}>
          <button type="submit" style={{ background: "#fff", color: "#000", border: "none", padding: "14px 32px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", letterSpacing: "0.05em" }}>
            SAVE
          </button>
          <a href="/admin" style={{ border: "1px solid #333", color: "#888", padding: "14px 32px", textDecoration: "none", fontSize: "13px" }}>
            CANCEL
          </a>
        </div>
      </form>
    </div>
  )
}