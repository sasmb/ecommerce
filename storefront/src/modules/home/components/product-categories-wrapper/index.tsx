import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { Suspense } from "react"

const ProductCategoriesFallback = () => {
  return (
    <div className="content-container py-12">
      <Text className="txt-xlarge">Featured Products</Text>
      <div className="grid grid-cols-1 small:grid-cols-3 gap-x-6 gap-y-8 mt-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div 
            key={i}
            className="bg-ui-bg-subtle animate-pulse h-[350px] rounded-md"
          />
        ))}
      </div>
    </div>
  )
}

export default async function ProductCategoriesWrapper({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  try {
    // Dynamic import to prevent build issues
    const { default: ProductCategories } = await import("../product-categories")
    
    return (
      <Suspense fallback={<ProductCategoriesFallback />}>
        <ProductCategories region={region} />
      </Suspense>
    )
  } catch (error) {
    console.error("Error loading product categories:", error)
    return <ProductCategoriesFallback />
  }
} 