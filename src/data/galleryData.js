// Gallery categories and their images

// Build with responsive sources for raster images via vite-imagetools,
// merge with RAW imports for a safe fallback URL, and keep SVGs/GIFs as direct URLs
const buildFromMixed = (rasterPictureMap, rawRasterMap, svgMap) => {
  const byPath = new Map()

  // 1) Seed with RAW raster URLs (no imagetools) as a safe fallback
  Object.entries(rawRasterMap).forEach(([path, url]) => {
    const file = path.split("/").pop() || ""
    const description = file.replace(/\.[^.]+$/, "")
    byPath.set(path, { path, url, rawUrl: url, description })
  })

  // 2) Overlay imagetools picture objects (keys contain query; normalize to base path)
  Object.entries(rasterPictureMap).forEach(([pathWithQuery, picture]) => {
    const basePath = pathWithQuery.split("?")[0]
    const file = basePath.split("/").pop() || ""
    const description = file.replace(/\.[^.]+$/, "")
    const existing = byPath.get(basePath) || { path: basePath, url: "", rawUrl: "", description }
    const url = picture?.img?.src || existing.url || ""
    const rawUrl = existing.rawUrl || existing.url || ""
    byPath.set(basePath, { ...existing, picture, url, rawUrl, description })
  })

  // 3) Add SVG/GIF entries (not processed by imagetools)
  Object.entries(svgMap).forEach(([path, url]) => {
    const file = path.split("/").pop() || ""
    const description = file.replace(/\.[^.]+$/, "")
    const existing = byPath.get(path)
    if (existing) {
      // Keep any existing data, but ensure URL/description present
      byPath.set(path, { ...existing, url: existing.url || url, rawUrl: existing.rawUrl || url, description: existing.description || description })
    } else {
      byPath.set(path, { path, url, rawUrl: url, description })
    }
  })

  // 4) Deterministic order, then assign IDs
  const items = Array.from(byPath.values()).sort((a, b) => a.path.localeCompare(b.path))
  return items.map(({ path, ...rest }, i) => ({ id: i + 1, ...rest }))
}

// Auto-import all images in each category folder (responsive + dynamic)
// Note: Using imagetools to generate AVIF/WEBP/JPEG across multiple widths
const productRasterImports = import.meta.glob(
  "../assets/products/*.{jpg,jpeg,png,webp,avif}?as=picture&format=avif;webp;jpeg&w=480;768;1024;1280;1600&quality=75&imagetools",
  { eager: true, import: "default" }
)
const productRawRasterImports = import.meta.glob(
  "../assets/products/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
)
const productSvgImports = import.meta.glob(
  "../assets/products/*.{svg,gif}",
  { eager: true, import: "default" }
)
const products = buildFromMixed(productRasterImports, productRawRasterImports, productSvgImports)

const natureRasterImports = import.meta.glob(
  "../assets/nature/*.{jpg,jpeg,png,webp,avif}?as=picture&format=avif;webp;jpeg&w=480;768;1024;1280;1600&quality=75&imagetools",
  { eager: true, import: "default" }
)
const natureRawRasterImports = import.meta.glob(
  "../assets/nature/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
)
const natureSvgImports = import.meta.glob(
  "../assets/nature/*.{svg,gif}",
  { eager: true, import: "default" }
)
const nature = buildFromMixed(natureRasterImports, natureRawRasterImports, natureSvgImports)

const portraitRasterImports = import.meta.glob(
  "../assets/portraits/*.{jpg,jpeg,png,webp,avif}?as=picture&format=avif;webp;jpeg&w=480;768;1024;1280;1600&quality=75&imagetools",
  { eager: true, import: "default" }
)
const portraitRawRasterImports = import.meta.glob(
  "../assets/portraits/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
)
const portraitSvgImports = import.meta.glob(
  "../assets/portraits/*.{svg,gif}",
  { eager: true, import: "default" }
)
const portraits = buildFromMixed(portraitRasterImports, portraitRawRasterImports, portraitSvgImports)

const streetRasterImports = import.meta.glob(
  "../assets/street/*.{jpg,jpeg,png,webp,avif}?as=picture&format=avif;webp;jpeg&w=480;768;1024;1280;1600&quality=75&imagetools",
  { eager: true, import: "default" }
)
const streetRawRasterImports = import.meta.glob(
  "../assets/street/*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
)
const streetSvgImports = import.meta.glob(
  "../assets/street/*.{svg,gif}",
  { eager: true, import: "default" }
)
const streets = buildFromMixed(streetRasterImports, streetRawRasterImports, streetSvgImports)

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