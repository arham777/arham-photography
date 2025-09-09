// Gallery categories and their images

// Simple importer: use direct asset URLs only (no imagetools). If both an original and a "-final" version
// exist for the same base filename, prefer the "-final" one. Description is derived from the filename
// without extension and without the "-final" suffix.
// NOTE: Vite requires static strings for glob patterns. We import all images once and
// then filter by category via the path prefix.
const ALL_IMAGES = import.meta.glob(
  "../assets/**/*.{jpg,jpeg,png,webp,avif,gif,svg}",
  { eager: true, import: "default" }
)
const importCategory = (category) => {
  // Only keep files that are within the category directory
  const all = Object.fromEntries(
    Object.entries(ALL_IMAGES).filter(([path]) => path.startsWith(`../assets/${category}/`))
  )

  const chooseKey = (file) => {
    // Remove extension
    const noExt = file.replace(/\.[^.]+$/, "")
    // Normalize to base key without -final
    return noExt.replace(/-final$/i, "")
  }

  const entries = Object.entries(all)
  const byBase = new Map()

  for (const [path, url] of entries) {
    const file = path.split("/").pop() || ""
    const baseKey = chooseKey(file)
    const isFinal = /-final\.[^.]+$/i.test(file)

    const current = byBase.get(baseKey)
    if (!current || (isFinal && !current.isFinal)) {
      byBase.set(baseKey, {
        path,
        url,
        isFinal,
        description: baseKey,
      })
    }
  }

  const items = Array.from(byBase.values())
    .sort((a, b) => a.path.localeCompare(b.path))
    .map((item, i) => ({ id: i + 1, url: item.url, description: item.description }))

  return items
}

// Auto-import all images in each category folder (direct URLs)
const products = importCategory('products')

const nature = importCategory('nature')

const portraits = importCategory('portraits')

const streets = importCategory('street')

export const galleryData = {
  products,
  weddings: [
    {
      id: 1,
      url: "https://images.pexels.com/photos/1244627/pexels-photo-1244627.jpeg",
      description: "First Dance"
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1589216/pexels-photo-1589216.jpeg",
      description: "Wedding Ceremony"
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/2959192/pexels-photo-2959192.jpeg",
      description: "Bride Preparation"
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg",
      description: "Wedding Details"
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/3014856/pexels-photo-3014856.jpeg",
      description: "Couple Portrait"
    },
    {
      id: 6,
      url: "https://images.pexels.com/photos/2253870/pexels-photo-2253870.jpeg",
      description: "Reception Moments"
    }
  ],
  nature,
  portraits,
  streets
}