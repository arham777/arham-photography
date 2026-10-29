import { motion } from "framer-motion"
import { useRef } from "react"
import { Link } from "react-router-dom"
import PageTransition from "../../Components/Layout/PageTransition"
import productHero from "../../assets/products/prod-4-final.jpg"
import natureHero from "../../assets/nature/nat-12-final.jpg"
import streetHero from "../../assets/street/street-5-final.jpg"
import portraitHero from "../../assets/portraits/home-hero.jpg"
import { galleryData } from "../../data/galleryData"

const HomePage = () => {
  const collectionsRef = useRef(null)
  
  const scrollToCollections = () => {
    collectionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[calc(100svh+96px)] md:h-[calc(100vh+96px)] -mt-24 bg-neutral-950">
        <div className="absolute inset-0">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            {portraitHero?.sources && portraitHero?.img?.src ? (
              <picture>
                {Object.values(portraitHero.sources).map((s) => (
                  <source key={s.type} srcSet={s.srcset} type={s.type} sizes="100vw" />
                ))}
                <img
                  src={portraitHero.img.src}
                  alt="Professional photographer"
                  className="w-full h-full object-cover will-change-transform object-[84%_18%] sm:object-[100%_18%] md:object-[100%_20%] lg:object-[100%_20%]"
                  decoding="async"
                />
              </picture>
            ) : (
              <img 
                src={portraitHero}
                alt="Professional photographer"
                className="w-full h-full object-cover will-change-transform object-[84%_18%] sm:object-[100%_18%] md:object-[100%_20%] lg:object-[100%_20%]"
                decoding="async"
              />
            )}
          </motion.div>
          <div
            className="absolute inset-0 bg-gradient-to-b from-neutral-900/30 via-neutral-950/60 to-neutral-950/80 pointer-events-none"
          />
        </div>
        
        <div className="relative h-full flex items-center justify-center px-4 md:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl text-center space-y-3"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.25em] sm:tracking-[0.3em] text-neutral-300/90">
              Minimal • Emotive • Timeless
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-tight">
              Capturing Stories In Their Purest Form
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-neutral-200/90 font-light">
              Contemporary photography with a refined, minimalist approach — crafted to make you feel.
            </p>
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 pt-1">
              <motion.button
                onClick={scrollToCollections}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-neutral-900 rounded-full text-sm md:text-base font-medium hover:bg-neutral-100 transition-colors"
              >
                View Portfolio
              </motion.button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors text-sm md:text-base font-medium"
                >
                  Get in touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Trust Band */}
      <section className="bg-neutral-950">
        <div className="px-4 max-w-5xl mx-auto -mt-28 md:-mt-32 lg:-mt-36 relative z-10">
          <div className="grid grid-cols-3 divide-x divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
            {stats.map((item) => (
              <div key={item.label} className="px-3 sm:px-4 md:px-8 py-4 sm:py-5 md:py-6 text-center">
                <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">{item.value}</div>
                <div className="mt-1 text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-neutral-300">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section ref={collectionsRef} className="py-20 md:py-24 bg-neutral-950">
        <div className="px-4 max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white mb-10 text-center"
          >
            Featured Collections
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link key={category.title} to={category.path} aria-label={`Open ${category.title}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10 hover:border-white/20"
                >
                  {category.image?.sources && category.image?.img?.src ? (
                    <picture>
                      {Object.values(category.image.sources).map((s) => (
                        <source key={s.type} srcSet={s.srcset} type={s.type} sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" />
                      ))}
                      <img 
                        src={category.image.img.src}
                        alt={category.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  ) : (
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-medium text-white mb-1">{category.title}</h3>
                    <p className="text-neutral-300 text-sm font-light opacity-90">{category.description}</p>
                    <span className="mt-3 hidden sm:inline-flex items-center gap-2 text-xs text-white/90 bg-white/10 rounded-full px-2.5 py-1 transition-colors group-hover:bg-white/20">
                      View collection
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M13.5 4.5L21 12l-7.5 7.5m7.5-7.5H3" />
                      </svg>
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-10 md:py-20 bg-neutral-950">
        <div className="px-4 max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-light text-white mb-10 text-center"
          >
            Selected Work
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {selectedWork.map((item, i) => (
              <Link key={`${item.path}-${i}`} to={item.path} aria-label="Open gallery">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.25) }}
                  className={`relative overflow-hidden rounded-xl border border-white/10 group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
                >
                  {item.picture?.sources && item.picture?.img?.src ? (
                    <picture>
                      {Object.values(item.picture.sources).map((s) => (
                        <source key={s.type} srcSet={s.srcset} type={s.type} sizes="(min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw" />
                      ))}
                      <img
                        src={item.picture.img.src}
                        alt="Selected work"
                        className="w-full h-full object-cover aspect-square md:aspect-[4/5] transition-transform duration-500 group-hover:scale-[1.03] will-change-transform"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const fb = item.rawUrl || item.url
                          if (fb && e.currentTarget.src !== fb) {
                            e.currentTarget.srcset = ''
                            e.currentTarget.src = fb
                          }
                        }}
                      />
                    </picture>
                  ) : (
                    <img
                      src={item.url || item.rawUrl}
                      alt="Selected work"
                      className="w-full h-full object-cover aspect-square md:aspect-[4/5] transition-transform duration-500 group-hover:scale-[1.03] will-change-transform"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const fb = item.rawUrl || item.url
                        if (fb && e.currentTarget.src !== fb) {
                          e.currentTarget.src = fb
                        }
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-28 md:py-32 bg-neutral-900">
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

const stats = [
  { label: "Completed Shoots", value: "150+" },
  { label: "Happy Clients", value: "90+" },
  { label: "Years Experience", value: "10+" },
]

const categories = [
  {
    title: "Portraits",
    description: "Authentic expressions, minimal settings",
    image: portraitHero,
    path: "/portraits",
  },
  {
    title: "Nature",
    description: "The world in its purest form",
    image: natureHero,
    path: "/nature",
  },
  {
    title: "Products",
    description: "Simple, elegant product photography",
    image: productHero,
    path: "/products",
  },
  {
    title: "Streets",
    description: "Life in motion, candid and raw",
    image: streetHero,
    path: "/streets",
  }
]

// Build a small curated grid for Selected Work
const selectedWork = [
  ...galleryData.portraits.slice(0, 2).map((x) => ({ ...x, path: "/portraits" })),
  ...galleryData.nature.slice(0, 2).map((x) => ({ ...x, path: "/nature" })),
  ...galleryData.streets.slice(0, 2).map((x) => ({ ...x, path: "/streets" })),
]

export default HomePage