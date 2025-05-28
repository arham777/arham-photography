import { motion } from "framer-motion"
import { useRef } from "react"
import PageTransition from "../../Components/Layout/PageTransition"

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
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Professional photographer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-950/70" />
        </div>
        
        <div className="relative h-full flex items-center justify-center px-6 md:px-8 pt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-4xl text-center space-y-12"
          >
            <div className="space-y-6">
              <h1 className="text-6xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                Capturing Moments in Their Purest Form
              </h1>
              <p className="text-2xl text-neutral-200 font-light">
                Professional photography with a minimalist approach
              </p>
            </div>
            
            <motion.button
              onClick={scrollToCollections}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-white text-neutral-900 rounded-full text-lg font-medium hover:bg-neutral-100 transition-colors"
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
            With a decade behind the lens, I've developed a minimalist approach to photography
            that focuses on the essential elements of each moment. My work aims to tell stories
            through simplicity and authenticity.
          </motion.p>
        </div>