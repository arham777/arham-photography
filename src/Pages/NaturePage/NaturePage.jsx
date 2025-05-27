import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"

const NaturePage = () => {
  return (
    <PageTemplate
      title="Nature Photography"
      description="Capturing Earth's breathtaking moments"
      heroImage="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg"
    >
      <Gallery images={galleryData.nature} />
    </PageTemplate>
  )
}

export default NaturePage