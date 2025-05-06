import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"
import InteractiveLink from "@modules/common/components/interactive-link"
import { Suspense } from "react"
import dynamic from "next/dynamic"
import { getCollectionByHandle } from "@lib/data/collections"

// Use dynamic import with no SSR to prevent build issues
const CategorySection = dynamic(() => import("./CategorySection"), {
  ssr: false,
  loading: () => (
    <div className="w-full bg-ui-bg-subtle animate-pulse h-[350px] rounded-md"></div>
  ),
})

const CategoryWrapper = ({ 
  collectionHandle, 
  region 
}: { 
  collectionHandle: string, 
  region: HttpTypes.StoreRegion 
}) => {
  return (
    <Suspense fallback={<div className="w-full bg-ui-bg-subtle animate-pulse h-[350px] rounded-md"></div>}>
      <CategorySection tag={collectionHandle} region={region} />
    </Suspense>
  )
}

export default async function ProductCategories({
  region,
}: {
  region: HttpTypes.StoreRegion
}) {
  try {
    // Define our category sections with their titles and collection handles
    const categorySections = [
      {
        title: "Latest Drops",
        collectionHandle: "latest-drops",
        viewAllLink: "/collections/latest-drops",
      },
      {
        title: "Sale",
        collectionHandle: "sale",
        viewAllLink: "/collections/sale",
      },
      {
        title: "Weekly Picks",
        collectionHandle: "weekly-picks",
        viewAllLink: "/collections/weekly-picks",
      },
    ]

    return (
      <div className="flex flex-col gap-24">
        {categorySections.map((section) => (
          <div key={section.title} className="content-container py-12">
            <div className="flex justify-between mb-8">
              <Text className="txt-xlarge">{section.title}</Text>
              <InteractiveLink href={section.viewAllLink}>
                View all
              </InteractiveLink>
            </div>
            <CategoryWrapper collectionHandle={section.collectionHandle} region={region} />
          </div>
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in ProductCategories:", error)
    return null
  }
} 