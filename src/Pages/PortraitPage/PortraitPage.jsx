import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"

const PortraitPage = () => {
  return (
    <PageTemplate
      title="Portrait Photography"
      description="Capturing personalities, one frame at a time"
      heroImage="https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg"
    >
      <Gallery images={galleryData.portraits} />
    </PageTemplate>
  )
}

export default PortraitPage