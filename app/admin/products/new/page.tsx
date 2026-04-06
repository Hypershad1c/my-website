import { db } from "@/lib/db"
import { redirect } from "next/navigation"

async function createProduct(formData: FormData) {
  "use server"
  await db.product.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      images: [],
      categoryId: formData.get("categoryId") as string,
    }
  })
  redirect("/admin")
}

export default async function NewProductPage() {
  const categories = await db.category.findMany()

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'DM Mono', monospace", padding: "48px 32px" }}>
      <h1 style={{ fontSize: "14px", letterSpacing: "0.1em", marginBottom: "32px" }}>NEW PRODUCT</h1>
      <form action={createProduct} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
        <input name="name" type="text" placeholder="Product name" required
          style={{ background: "#111", border: "1px solid #222", color: "#fff", padding: "14px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
        <input name="price" type="number" step="0.01" placeholder="Price (e.g. 29.99)" required
          style={{ background: "#111", border: "1px solid #222", color: "#fff", padding: "14px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
        <input name="stock" type="number" placeholder="Stock quantity" required
          style={{ background: "#111", border: "1px solid #222", color: "#fff", padding: "14px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
        <textarea name="description" placeholder="Description" required rows={4}
          style={{ background: "#111", border: "1px solid #222", color: "#fff", padding: "14px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit", resize: "vertical" }} />
        <select name="categoryId" required
          style={{ background: "#111", border: "1px solid #222", color: "#fff", padding: "14px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }}>
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
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