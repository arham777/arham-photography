import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"
import natureHero from "../../assets/nature/nat-12.jpg?as=picture&format=avif;webp;jpeg&w=800;1200;1600&imagetools"

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