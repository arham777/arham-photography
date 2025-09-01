import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"
import streetHero from "../../assets/street/street-5.jpg?as=picture&format=avif;webp;jpeg&w=800;1200;1600&imagetools"

const StreetsPage = () => {
  return (
    <PageTemplate
      title="Street Photography"
      description="Candid moments from everyday life"
      heroImage={streetHero}
    >
      <Gallery images={galleryData.streets} />
    </PageTemplate>
  )
}

export default StreetsPage


