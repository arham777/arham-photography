import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"

const ProductsPage = () => {
  return (
    <PageTemplate
      title="Product Photography"
      description="Making your products stand out with professional imagery"
      heroImage="https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg"
    >
      <Gallery images={galleryData.products} />
    </PageTemplate>
  )
}

export default ProductsPage