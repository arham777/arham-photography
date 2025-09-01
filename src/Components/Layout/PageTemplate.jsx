import { motion } from "framer-motion"
import PageTransition from "./PageTransition"
import PropTypes from "prop-types"

const PageTemplate = ({ title, description, heroImage, children }) => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="relative h-[60vh] -mt-24 pt-24 bg-zinc-900">
        <div className="absolute inset-0">
          {heroImage && heroImage.sources && heroImage.img ? (
            <picture>
              {Object.values(heroImage.sources).map((s) => (
                <source key={s.type} srcSet={s.srcset} type={s.type} sizes="100vw" />
              ))}
              <img 
                src={heroImage.img.src}
                alt={title}
                className="w-full h-full object-cover"
                decoding="async"
              />
            </picture>
          ) : (
            <img 
              src={heroImage}
              alt={title}
              className="w-full h-full object-cover"
              decoding="async"
            />
          )}
          <div className="absolute inset-0 bg-zinc-900/70" />
        </div>
        
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl text-white mb-4 sm:mb-6">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-zinc-200 font-light">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-zinc-900 min-h-screen">
        {children}
      </section>
    </PageTransition>
  )
}

export default PageTemplate

PageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  heroImage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      sources: PropTypes.arrayOf(
        PropTypes.shape({
          srcset: PropTypes.string.isRequired,
          type: PropTypes.string.isRequired,
        })
      ).isRequired,
      img: PropTypes.shape({
        src: PropTypes.string.isRequired,
        srcset: PropTypes.string,
      }).isRequired,
    })
  ]).isRequired,
  children: PropTypes.node,
}