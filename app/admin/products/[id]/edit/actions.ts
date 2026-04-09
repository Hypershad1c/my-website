"use server"

import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function updateProduct(id: string, formData: FormData) {
  const imageFile = formData.get("image") as File
  const currentImageUrl = formData.get("currentImageUrl") as string
  let imageUrl = currentImageUrl

  // 1. Upload to Cloudinary only if a new file is provided
  if (imageFile && imageFile.size > 0) {
    const arrayBuffer = await imageFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResponse: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "ecommerce_products" },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })
    
    imageUrl = uploadResponse.secure_url
  }

  // 2. Update the record in MongoDB
  await db.product.update({
    where: { id },
    data: {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      stock: parseInt(formData.get("stock") as string),
      images: imageUrl ? [imageUrl] : [],
      categoryId: formData.get("categoryId") as string,
    }
  })

  redirect("/admin")
}