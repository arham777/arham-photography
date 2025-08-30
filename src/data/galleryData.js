// Gallery categories and their images

// Auto-import product photos named like prod-1.jpg/png/webp/avif from src/assets/products
// and build a sorted list with description set to null
const productImports = import.meta.glob(
  "../assets/products/prod-*.{jpg,jpeg,png,webp,avif}",
  { eager: true, import: "default" }
)

const products = Object.entries(productImports)
  .sort(([a], [b]) => {
    const na = Number(a.match(/prod-(\d+)/)?.[1] ?? 0)
    const nb = Number(b.match(/prod-(\d+)/)?.[1] ?? 0)
    return na - nb
  })
  .map(([, url], i) => ({ id: i + 1, url, description: null }))

// Auto-import nature photos named like nat-1.jpg/png from src/assets/nature
// and build a sorted list with description set to null
const natureImports = import.meta.glob(
  "../assets/nature/nat-*.{jpg,jpeg,png}",
  { eager: true, import: "default" }
)

const nature = Object.entries(natureImports)
  .sort(([a], [b]) => {
    const na = Number(a.match(/nat-(\d+)/)?.[1] ?? 0)
    const nb = Number(b.match(/nat-(\d+)/)?.[1] ?? 0)
    return na - nb
  })
  .map(([, url], i) => ({ id: i + 1, url, description: null }))

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
  portraits: [
    {
      id: 1,
      url: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg",
      description: "Natural Light Portrait"
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg",
      description: "Studio Portrait"
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1559486/pexels-photo-1559486.jpeg",
      description: "Professional Headshot"
    },
    {
      id: 4,
      url: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
      description: "Outdoor Portrait"
    },
    {
      id: 5,
      url: "https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg",
      description: "Lifestyle Portrait"
    },
    {
      id: 6,
      url: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
      description: "Black & White Portrait"
    }
  ]
}