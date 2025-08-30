import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"
import natureHero from "../../assets/nature/nat-12.jpg"

const NaturePage = () => {
  return (
    <PageTemplate
      title="Nature Photography"
      description="Capturing Earth's breathtaking moments"
      heroImage={natureHero}
    >
      <Gallery images={galleryData.nature} />
    </PageTemplate>
  )
}

export default NaturePage