import PageTemplate from "../../Components/Layout/PageTemplate"
import Gallery from "../../Components/Gallery/Gallery"
import { galleryData } from "../../data/galleryData"

const WeddingPage = () => {
  return (
    <PageTemplate
      title="Wedding Photography"
      description="Capturing your special moments with elegance"
      heroImage="https://images.pexels.com/photos/1244627/pexels-photo-1244627.jpeg"
    >
      <Gallery images={galleryData.weddings} />
    </PageTemplate>
  )
}

export default WeddingPage