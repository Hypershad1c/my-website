import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { updateProduct } from "./actions"

// In Next.js 15, params is a Promise
type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  // FIX: Await params before using the id
  const { id } = await params

  // Fetch data
  const [product, categories] = await Promise.all([
    db.product.findUnique({ where: { id } }),
    db.category.findMany()
  ])

  if (!product) {
    notFound()
  }

  // Bind the ID to the server action
  const updateProductWithId = updateProduct.bind(null, id)

  const inputStyle = {
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    padding: "14px 16px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
    width: "100%"
  }

  const labelStyle = {
    fontSize: "10px",
    color: "#666",
    letterSpacing: "0.1em",
    marginBottom: "8px",
    display: "block"
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'DM Mono', monospace", padding: "48px 32px" }}>
      <h1 style={{ fontSize: "14px", letterSpacing: "0.1em", marginBottom: "32px" }}>EDIT PRODUCT / {id.slice(-6).toUpperCase()}</h1>
      
      <form action={updateProductWithId} encType="multipart/form-data" style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "480px" }}>
        
        {/* Preserve image if no new one is uploaded */}
        <input type="hidden" name="currentImageUrl" value={product.images[0] || ""} />

        <div>
          <label style={labelStyle}>PRODUCT NAME</label>
          <input name="name" type="text" defaultValue={product.name} required style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>PRODUCT IMAGE</label>
          {product.images[0] && (
            <div style={{ marginBottom: "16px" }}>
              <img 
                src={product.images[0]} 
                alt="Preview" 
                style={{ width: "120px", height: "120px", objectFit: "cover", border: "1px solid #333" }} 
              />
            </div>
          )}
          <input name="image" type="file" accept="image/*" style={inputStyle} />
          <p style={{ fontSize: "11px", color: "#444", marginTop: "8px" }}>Leave empty to keep the current image.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div>
            <label style={labelStyle}>PRICE</label>
            <input name="price" type="number" step="0.01" defaultValue={product.price} required style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>STOCK</label>
            <input name="stock" type="number" defaultValue={product.stock} required style={inputStyle} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>DESCRIPTION</label>
          <textarea name="description" defaultValue={product.description} required rows={5} 
            style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div>
          <label style={labelStyle}>CATEGORY</label>
          <select name="categoryId" defaultValue={product.categoryId || ""} required style={inputStyle}>
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <button type="submit" style={{ background: "#fff", color: "#000", border: "none", padding: "14px 32px", cursor: "pointer", fontFamily: "inherit", fontSize: "13px", fontWeight: "600" }}>
            UPDATE
          </button>
          <a href="/admin" style={{ border: "1px solid #333", color: "#888", padding: "14px 32px", textDecoration: "none", fontSize: "13px", textAlign: "center" }}>
            CANCEL
          </a>
        </div>
      </form>
    </div>
  )
}