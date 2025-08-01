import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

const Header = () => {
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/weddings", label: "Weddings" },
    { path: "/nature", label: "Nature" },
    { path: "/portraits", label: "Portraits" },
    { path: "/contact", label: "Contact" },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-zinc-900/90 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <nav className="px-6 py-6">
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center justify-center space-x-12">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path} 
                className="relative group"
              >
                <span className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-300">
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-px bg-white bottom-0"
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-end gap-1.5 p-2 group"
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              y: isMobileMenuOpen ? 8 : 0,
              width: isMobileMenuOpen ? 24 : 24
            }}
            transition={{ duration: 0.3 }}
            className="h-[2px] bg-white origin-center transform transition-all duration-300"
          />
          <motion.span
            animate={{
              opacity: isMobileMenuOpen ? 0 : 1,
              width: isMobileMenuOpen ? 0 : 16
            }}
            transition={{ duration: 0.3 }}
            className="h-[2px] bg-white group-hover:w-24 transition-all duration-300"
          />
          <motion.span
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              y: isMobileMenuOpen ? -8 : 0,
              width: isMobileMenuOpen ? 24 : 20
            }}
            transition={{ duration: 0.3 }}
            className="h-[2px] bg-white origin-center transform transition-all duration-300"
          />
        </motion.button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 mt-2 px-4"
            >
              <motion.div 
                className="bg-zinc-900/95 backdrop-blur-lg rounded-2xl overflow-hidden border border-zinc-800"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              >
                <ul className="py-2">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-6 py-3 text-sm font-medium text-zinc-300 hover:text-white transition-colors ${
                          location.pathname === item.path ? 'text-white bg-white/5' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Header