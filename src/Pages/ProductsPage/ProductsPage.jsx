import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"
import productHero from "../../assets/products/prod-4.png"

const ProductsPage = () => {
  return (
    <PageTemplate
      title="Product Photography"
      description="Making your products stand out with professional imagery"
      heroImage={productHero}
    >
      <Gallery images={galleryData.products} />
    </PageTemplate>
  )
}

export default ProductsPage