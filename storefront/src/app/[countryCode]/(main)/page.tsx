import { Metadata } from "next"

import FeaturedProductsWrapper from "@modules/home/components/featured-products-wrapper"
import Hero from "@modules/home/components/hero"
import ProductCategoriesWrapper from "@modules/home/components/product-categories-wrapper"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        {/* Product Categories Sections (wrapped with error handling) */}
        {/* <ProductCategoriesWrapper region={region} /> */}
        
        {/* Featured Products (wrapped with error handling) */}
        <div className="mt-24">
          <FeaturedProductsWrapper collections={collections} region={region} />
        </div>
      </div>
    </>
  )
}
