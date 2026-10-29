import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"
import portraitHero from "../../assets/portraits/port-12-final.jpg"

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