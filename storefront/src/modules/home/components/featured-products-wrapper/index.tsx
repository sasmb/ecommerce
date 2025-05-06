import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import { Suspense } from "react"

const FeaturedProductsFallback = () => {
  return (
    <div className="content-container py-12">
      <Text className="txt-xlarge">Featured Collections</Text>
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

export default async function FeaturedProductsWrapper({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  try {
    // Dynamic import to prevent build issues
    const { default: FeaturedProducts } = await import("../featured-products")
    
    return (
      <Suspense fallback={<FeaturedProductsFallback />}>
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </Suspense>
    )
  } catch (error) {
    console.error("Error loading featured products:", error)
    return <FeaturedProductsFallback />
  }
} 