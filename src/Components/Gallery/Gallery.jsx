import { useMemo, useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence, useMotionValue } from "framer-motion"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import PropTypes from "prop-types"
import useEmblaCarousel from "embla-carousel-react"

const Gallery = ({ images }) => {
  // One-time shuffle for a natural, Pinterest-like random order
  const shuffledImages = useMemo(() => {
    const arr = images ? [...images] : []
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [images])

  // Lightbox state & controls
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const isLightboxOpen = lightboxIndex !== null

  const openLightbox = useCallback((index) => setLightboxIndex(index), [])

  // Embla carousel for the lightbox
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [viewportNode, setViewportNode] = useState(null)
  const setViewportRef = useCallback(
    (node) => {
      setViewportNode(node)
      emblaRef(node)
    },
    [emblaRef]
  )

  const [zoomScale, setZoomScale] = useState(1)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 })
  const currentImageRef = useRef(null)

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    setZoomScale(1)
    x.set(0)
    y.set(0)
  }, [x, y])

  const showPrev = useCallback(
    (e) => {
      e?.stopPropagation?.()
      emblaApi?.scrollPrev()
    },
    [emblaApi]
  )

  const showNext = useCallback(
    (e) => {
      e?.stopPropagation?.()
      emblaApi?.scrollNext()
    },
    [emblaApi]
  )

  // Keyboard navigation + scroll lock when lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKey = (e) => {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev()
      if (e.key === "ArrowRight") emblaApi?.scrollNext()
    }

    window.addEventListener("keydown", handleKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isLightboxOpen, closeLightbox, emblaApi])

  // Reset zoom when the selected slide changes
  useEffect(() => {
    setZoomScale(1)
    x.set(0)
    y.set(0)
  }, [lightboxIndex, x, y])

  // Compute drag bounds for panning while zoomed
  useEffect(() => {
    if (!viewportNode || !currentImageRef.current) return
    if (zoomScale <= 1) {
      setDragBounds({ left: 0, right: 0, top: 0, bottom: 0 })
      x.set(0)
      y.set(0)
      return
    }

    const compute = () => {
      if (!viewportNode || !currentImageRef.current) return
      const viewportRect = viewportNode.getBoundingClientRect()
      const imgRect = currentImageRef.current.getBoundingClientRect()
      const extraW = Math.max(0, imgRect.width - viewportRect.width)
      const extraH = Math.max(0, imgRect.height - viewportRect.height)
      const limitX = Math.round(extraW / 2)
      const limitY = Math.round(extraH / 2)
      setDragBounds({ left: -limitX, right: limitX, top: -limitY, bottom: limitY })
    }

    const raf = requestAnimationFrame(compute)
    const onResize = () => requestAnimationFrame(compute)
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [viewportNode, zoomScale, lightboxIndex, x, y])

  // When the lightbox opens, jump to the clicked image
  useEffect(() => {
    if (!emblaApi) return
    if (lightboxIndex === null) return
    // Scroll to the selected image on open
    emblaApi.scrollTo(lightboxIndex)
    // Update the index as the user navigates
    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap()
      setLightboxIndex(idx)
    }
    emblaApi.on("select", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi, lightboxIndex])

  return (
    <div className="py-20">
      <ResponsiveMasonry 
        columnsCountBreakPoints={{ 
          0: 1,        // Mobile: 1 column
          480: 2,      // Small mobile: 2 columns  
          768: 3,      // Tablet: 3 columns
          1024: 3,     // Desktop: 3 columns
          1280: 4      // Large desktop: 4 columns
        }}
      >
        <Masonry 
          gutter="16px"
          className="masonry-container"
        >
          {shuffledImages.map((photo, index) => (
            <motion.div
              key={photo.id ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.03, 0.3) }}
              className="relative group overflow-hidden rounded-lg cursor-pointer mb-4 break-inside-avoid"
              onClick={() => openLightbox(index)}
              style={{ 
                breakInside: 'avoid',
                pageBreakInside: 'avoid',
                display: 'inline-block',
                width: '100%'
              }}
            >
              {photo.picture?.sources && photo.picture?.img?.src ? (
                <picture>
                  {Object.values(photo.picture.sources).map((s) => (
                    <source 
                      key={s.type} 
                      srcSet={s.srcset} 
                      type={s.type} 
                      sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:768px) 33vw, (min-width:480px) 50vw, 100vw" 
                    />
                  ))}
                  <img
                    src={photo.picture.img.src}
                    alt={photo.description ?? ""}
                    loading="lazy"
                    onError={(e) => {
                      const fb = photo.rawUrl || photo.url
                      if (fb && e.currentTarget.src !== fb) {
                        e.currentTarget.srcset = ''
                        e.currentTarget.src = fb
                      }
                    }}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02] block"
                    style={{ 
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      verticalAlign: 'top'
                    }}
                  />
                </picture>
              ) : (
                <img
                  src={photo.url || photo.rawUrl}
                  alt={photo.description ?? ""}
                  loading="lazy"
                  onError={(e) => {
                    const fb = photo.rawUrl || photo.url
                    if (fb && e.currentTarget.src !== fb) {
                      e.currentTarget.src = fb
                    }
                  }}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02] block"
                  style={{ 
                    display: 'block',
                    width: '100%',
                    height: 'auto',
                    verticalAlign: 'top'
                  }}
                />
              )}
              {photo.description && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-light">{photo.description}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </Masonry>
      </ResponsiveMasonry>

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              aria-label="Previous"
              onClick={showPrev}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white select-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8 md:h-10 md:w-10" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              aria-label="Next"
              onClick={showNext}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/80 hover:text-white select-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-8 w-8 md:h-10 md:w-10" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-[92vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="overflow-hidden"
                ref={setViewportRef}
                onWheel={(e) => {
                  // Prevent carousel wheel-scroll when zoomed
                  if (zoomScale > 1) e.stopPropagation()
                }}
              >
                <div className="flex">
                  {shuffledImages.map((img, i) => (
                    <div
                      key={img.id ?? i}
                      className="min-w-0 shrink-0 grow-0 basis-full flex items-center justify-center bg-black overflow-hidden"
                    >
                      {img.picture?.sources && img.picture?.img?.src ? (
                        <motion.img
                          ref={i === lightboxIndex ? (el) => { currentImageRef.current = el } : null}
                          src={img.picture.img.src}
                          srcSet={img.picture.img.srcset}
                          sizes="90vw"
                          onError={(e) => {
                            const fb = img.rawUrl || img.url
                            if (fb && e.currentTarget.src !== fb) {
                              e.currentTarget.srcset = ''
                              e.currentTarget.src = fb
                            }
                          }}
                          alt={img.description ?? ""}
                          className="max-h-[85vh] object-contain rounded-lg shadow-2xl"
                          loading="eager"
                          style={{ x, y, scale: zoomScale, cursor: zoomScale > 1 ? "grab" : "zoom-in" }}
                          drag={zoomScale > 1}
                          dragConstraints={dragBounds}
                          dragElastic={0.05}
                          dragMomentum={false}
                          onPointerDown={(e) => {
                            if (zoomScale > 1) e.stopPropagation()
                          }}
                          onDoubleClick={(e) => {
                            e.stopPropagation()
                            if (zoomScale > 1) {
                              setZoomScale(1)
                              x.set(0)
                              y.set(0)
                            } else {
                              setZoomScale(2)
                            }
                          }}
                        />
                      ) : (
                        <motion.img
                          ref={i === lightboxIndex ? (el) => { currentImageRef.current = el } : null}
                          src={img.url || img.rawUrl}
                          alt={img.description ?? ""}
                          className="max-h-[85vh] object-contain rounded-lg shadow-2xl"
                          loading="eager"
                          onError={(e) => {
                            const fb = img.rawUrl || img.url
                            if (fb && e.currentTarget.src !== fb) {
                              e.currentTarget.src = fb
                            }
                          }}
                          style={{ x, y, scale: zoomScale, cursor: zoomScale > 1 ? "grab" : "zoom-in" }}
                          drag={zoomScale > 1}
                          dragConstraints={dragBounds}
                          dragElastic={0.05}
                          dragMomentum={false}
                          onPointerDown={(e) => {
                            if (zoomScale > 1) e.stopPropagation()
                          }}
                          onDoubleClick={(e) => {
                            e.stopPropagation()
                            if (zoomScale > 1) {
                              setZoomScale(1)
                              x.set(0)
                              y.set(0)
                            } else {
                              setZoomScale(2)
                            }
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {shuffledImages[lightboxIndex]?.description && (
                <div className="absolute -bottom-12 left-0 right-0 text-center px-6">
                  <p className="text-white/90 text-sm md:text-base font-light">
                    {shuffledImages[lightboxIndex].description}
                  </p>
                </div>
              )}
            </motion.div>

            <button
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/70 hover:text-white leading-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-7 w-7" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      url: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
}

export default Gallery