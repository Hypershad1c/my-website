import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary with your credentials (put these in your .env file)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function createProduct(formData: FormData) {
  "use server"

  const imageFile = formData.get("image") as File
  let imageUrl = ""

  // 1. Upload to Cloudinary if a file is present
  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "ecommerce_products" }, (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }).end(buffer)
    })
    
    imageUrl = uploadResponse.secure_url
  }

  // 2. Save product to MongoDB
  await db.product.create({
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      // Use the cloud URL here
      images: imageUrl ? [imageUrl] : [],
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
      
      {/* CRITICAL: Added encType="multipart/form-data" to allow file uploads */}
      <form action={createProduct} encType="multipart/form-data" style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "480px" }}>
        
        <input name="name" type="text" placeholder="Product name" required
          style={{ background: "#111", border: "1px solid #222", color: "#fff", padding: "14px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
        
        {/* NEW: Image Upload Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontSize: "10px", color: "#666" }}>UPLOAD IMAGE</label>
          <input name="image" type="file" accept="image/*" required
            style={{ background: "#111", border: "1px solid #222", color: "#888", padding: "12px 16px", fontSize: "14px", outline: "none", fontFamily: "inherit" }} />
        </div>

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