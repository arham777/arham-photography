import { motion } from "framer-motion"

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ backgroundColor: '#0a0a0b', minHeight: '100%' }}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition 