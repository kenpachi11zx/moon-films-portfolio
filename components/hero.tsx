"use client"

import { motion } from "framer-motion"
import { Play, Mail } from "lucide-react"
import InteractiveMoonLogo from "./interactive-moon-logo"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center">
      <div className="section-container text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* Interactive Moon Logo */}
          <InteractiveMoonLogo />

          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glow tracking-wide text-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-300">
              MOON FILMS
            </span>
          </h1>
          <h2 className="font-heading text-lg md:text-xl lg:text-2xl mb-4 font-medium tracking-wide text-center">
            VIDEO EDITING & VISUAL STORYTELLING
          </h2>
          <p className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-gray-300 font-normal tracking-normal text-center">
            TURNING MOMENTS INTO MOTION
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              onClick={() => scrollToSection("work")}
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-4 h-4 mr-2" />
              FEATURED WORK
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("contact")}
              className="btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4 mr-2" />
              CONTACT ME
            </motion.button>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <button onClick={() => scrollToSection("about")} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-300"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </button>
      </motion.div>
    </section>
  )
}
