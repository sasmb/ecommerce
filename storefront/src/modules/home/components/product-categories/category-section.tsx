'use server'

import { HttpTypes } from "@medusajs/types"
import ProductPreview from "@modules/products/components/product-preview"
import { sdk } from "@lib/config"
import { getAuthHeaders } from "@lib/data/cookies"

export default async function CategorySection({
  tag,
  region,
}: {
  tag: string
  region: HttpTypes.StoreRegion
}) {
  try {
    // Fetch products with the specified collection
    const limit = 3 // Show 3 products per category
    
    const headers = {
      ...(await getAuthHeaders()),
    }

    const { products } = await sdk.client.fetch<{ 
      products: HttpTypes.StoreProduct[], 
      count: number 
    }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          collection_id: tag,
          region_id: region.id,
          fields: "*,variants.calculated_price,+variants.inventory_quantity",
        },
        headers,
        cache: "force-cache",
      }
    )

    if (!products || products.length === 0) {
      return (
        <div className="text-center py-24">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )
    }

    return (
      <ul className="grid grid-cols-1 small:grid-cols-3 gap-x-6 gap-y-8">
        {products.map((product: HttpTypes.StoreProduct) => (
          <li key={product.id} className="bg-ui-bg-base rounded-md overflow-hidden">
            <ProductPreview product={product} region={region} />
          </li>
        ))}
      </ul>
    )
  } catch (error) {
    console.error(`Error fetching products with collection "${tag}":`, error)
    return (
      <div className="text-center py-24">
        <p className="text-gray-500">Could not load products. Please try again later.</p>
      </div>
    )
  }
} 