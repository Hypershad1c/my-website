import { auth, signOut } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const session = await auth()
  const products = await db.product.findMany({ include: { category: true } })
  const categories = await db.category.findMany()

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'DM Mono', monospace" }}>
      <nav style={{ borderBottom: "1px solid #222", padding: "16px 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ letterSpacing: "0.1em", fontSize: "14px" }}>ADMIN — {session?.user?.email}</span>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }) }}>
          <button style={{ background: "none", border: "1px solid #333", color: "#888", padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontSize: "12px" }}>
            SIGN OUT
          </button>
        </form>
      </nav>

      <div style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "16px", marginBottom: "48px" }}>
          <Link href="/admin/products/new" style={{
            background: "#fff", color: "#000", padding: "12px 24px", textDecoration: "none",
            fontSize: "13px", letterSpacing: "0.05em"
          }}>+ NEW PRODUCT</Link>
          <Link href="/admin/categories/new" style={{
            border: "1px solid #333", color: "#fff", padding: "12px 24px", textDecoration: "none",
            fontSize: "13px", letterSpacing: "0.05em"
          }}>+ NEW CATEGORY</Link>
        </div>

        <h2 style={{ fontSize: "12px", color: "#555", letterSpacing: "0.1em", marginBottom: "16px" }}>
          PRODUCTS ({products.length})
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "48px" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #222", textAlign: "left" }}>
              {["Name", "Category", "Price", "Stock", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", fontSize: "11px", color: "#555", letterSpacing: "0.1em" }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} style={{ borderBottom: "1px solid #111" }}>
                <td style={{ padding: "16px", fontSize: "14px" }}>{p.name}</td>
                <td style={{ padding: "16px", fontSize: "14px", color: "#666" }}>{p.category.name}</td>
                <td style={{ padding: "16px", fontSize: "14px" }}>${p.price.toFixed(2)}</td>
                <td style={{ padding: "16px", fontSize: "14px" }}>{p.stock}</td>
                <td style={{ padding: "16px", display: "flex", gap: "8px" }}>
                  <Link href={`/admin/products/${p.id}/edit`} style={{ color: "#888", fontSize: "12px", textDecoration: "none" }}>EDIT</Link>
                  <span style={{ color: "#333" }}>|</span>
                  <Link href={`/admin/products/${p.id}/delete`} style={{ color: "#ff4444", fontSize: "12px", textDecoration: "none" }}>DELETE</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2 style={{ fontSize: "12px", color: "#555", letterSpacing: "0.1em", marginBottom: "16px" }}>
          CATEGORIES ({categories.length})
        </h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #222", textAlign: "left" }}>
              {["Name", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", fontSize: "11px", color: "#555", letterSpacing: "0.1em" }}>{h.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {categories.map(c => (
              <tr key={c.id} style={{ borderBottom: "1px solid #111" }}>
                <td style={{ padding: "16px", fontSize: "14px" }}>{c.name}</td>
                <td style={{ padding: "16px", display: "flex", gap: "8px" }}>
                  <Link href={`/admin/categories/${c.id}/edit`} style={{ color: "#888", fontSize: "12px", textDecoration: "none" }}>EDIT</Link>
                  <span style={{ color: "#333" }}>|</span>
                  <Link href={`/admin/categories/${c.id}/delete`} style={{ color: "#ff4444", fontSize: "12px", textDecoration: "none" }}>DELETE</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}