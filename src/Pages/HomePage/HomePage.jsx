import { motion } from "framer-motion"
import { useRef } from "react"
import PageTransition from "../../Components/Layout/PageTransition"
import productHero from "../../assets/products/prod-4.png"
import natureHero from "../../assets/nature/nat-12.jpg"
import streetHero from "../../assets/street/street-5.jpg"


const HomePage = () => {
  const collectionsRef = useRef(null)
  
  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-screen -mt-24">
        <div className="absolute inset-0">
          <motion.img 
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2 }}
            src={productHero}
            alt="Professional photographer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/60" />
        </div>
        
        <div className="relative h-full flex items-center justify-center px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl text-center space-y-5"
          >
            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white">
              Capturing Moments in Their Purest Form
            </h1>
            <p className="text-lg text-neutral-200 font-light">
              Professional photography with a minimalist approach
            </p>
            <motion.button
              onClick={scrollToCollections}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 px-8 py-3 bg-white text-neutral-900 rounded-full text-base font-medium hover:bg-neutral-100 transition-colors"
            >
              View Work
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section ref={collectionsRef} className="py-32 bg-neutral-950">
        <div className="px-4 max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white mb-16 text-center"
          >
            Featured Collections
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-xl"
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-2xl font-medium text-white mb-2">{category.title}</h3>
                    <p className="text-neutral-300 text-lg font-light opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 bg-neutral-900">
        <div className="px-4 max-w-3xl mx-auto text-center">
          <motion.p 
            className="text-xl font-light text-neutral-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            With a decade behind the lens, I&apos;ve developed a minimalist approach to photography
            that focuses on the essential elements of each moment. My work aims to tell stories
            through simplicity and authenticity.
          </motion.p>
        </div>
      </section>
    </PageTransition>
  )
}

const categories = [
  {
    title: "Weddings",
    description: "Elegant moments, naturally captured",
    image: "https://images.pexels.com/photos/1244627/pexels-photo-1244627.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    title: "Portraits",
    description: "Authentic expressions, minimal settings",
    image: "https://images.pexels.com/photos/2613260/pexels-photo-2613260.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    title: "Nature",
    description: "The world in its purest form",
    image: natureHero,
  },
  {
    title: "Products",
    description: "Simple, elegant product photography",
    image: productHero,
  },
  {
    title: "Streets",
    description: "Life in motion, candid and raw",
    image: streetHero,
  }
]

export default HomePage