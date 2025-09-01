import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"
import portraitHero from "../../assets/portraits/port-12.jpg?as=picture&format=avif;webp;jpeg&w=800;1200;1600&imagetools"

const PortraitPage = () => {
  return (
    <PageTemplate
      title="Portrait Photography"
      description="Capturing personalities, one frame at a time"
      heroImage={portraitHero}
    >
      <Gallery images={galleryData.portraits} />
    </PageTemplate>
  )
}

export default PortraitPage