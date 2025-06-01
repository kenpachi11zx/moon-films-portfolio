"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function MoonPhaseIndicator() {
  const [currentPhase, setCurrentPhase] = useState("")
  const [phasePercentage, setPhasePercentage] = useState(0)

  useEffect(() => {
    const calculateMoonPhase = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1
      const day = now.getDate()

      // Calculate days since known new moon (January 6, 2000)
      const knownNewMoon = new Date(2000, 0, 6)
      const daysSinceKnownNewMoon = Math.floor((now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24))

      // Moon cycle is approximately 29.53 days
      const lunarCycle = 29.53058867
      const currentCycle = (daysSinceKnownNewMoon % lunarCycle) / lunarCycle

      // Convert to percentage (0-100)
      const percentage = currentCycle * 100

      // Determine phase name
      let phaseName = ""
      if (percentage < 1 || percentage > 99) {
        phaseName = "New Moon"
      } else if (percentage < 25) {
        phaseName = "Waxing Crescent"
      } else if (percentage < 26) {
        phaseName = "First Quarter"
      } else if (percentage < 49) {
        phaseName = "Waxing Gibbous"
      } else if (percentage < 51) {
        phaseName = "Full Moon"
      } else if (percentage < 74) {
        phaseName = "Waning Gibbous"
      } else if (percentage < 76) {
        phaseName = "Last Quarter"
      } else {
        phaseName = "Waning Crescent"
      }

      setCurrentPhase(phaseName)
      setPhasePercentage(percentage)
    }

    calculateMoonPhase()
    // Update every hour
    const interval = setInterval(calculateMoonPhase, 3600000)

    return () => clearInterval(interval)
  }, [])

  const getShadowStyle = () => {
    const illumination = phasePercentage / 100

    if (illumination < 0.5) {
      // Waxing phases (right side illuminated)
      const rightIllumination = illumination * 2
      return {
        background: `linear-gradient(90deg, 
          rgba(0,0,0,0.7) 0%, 
          rgba(0,0,0,0.7) ${(1 - rightIllumination) * 50}%, 
          transparent ${(1 - rightIllumination) * 50}%, 
          transparent 100%)`,
      }
    } else {
      // Waning phases (left side illuminated)
      const leftIllumination = (1 - illumination) * 2
      return {
        background: `linear-gradient(90deg, 
          transparent 0%, 
          transparent ${leftIllumination * 50}%, 
          rgba(0,0,0,0.7) ${leftIllumination * 50}%, 
          rgba(0,0,0,0.7) 100%)`,
      }
    }
  }

  return (
    <motion.div
      className="fixed top-4 left-4 z-50 group cursor-pointer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      whileHover={{ scale: 1.1 }}
    >
      {/* Moon Icon */}
      <div className="relative">
        {/* Outer glow */}
        <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-600/20 blur-lg" />

        {/* Moon body */}
        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 overflow-hidden border border-purple-500/30">
          {/* Moon craters */}
          <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black/20" />
          <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-black/15" />
          <div className="absolute top-3 left-3 w-0.5 h-0.5 rounded-full bg-white/30" />

          {/* Phase shadow overlay */}
          <div className="absolute inset-0 rounded-full" style={getShadowStyle()} />
        </div>

        {/* Sparkle effect */}
        <motion.div
          className="absolute -top-1 -right-1 w-1 h-1"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <div
            className="w-full h-full bg-white shadow-sm shadow-white/50"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        </motion.div>
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute top-14 left-0 bg-black/90 backdrop-blur-sm border border-purple-500/30 rounded-sm px-3 py-2 text-xs font-medium text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ y: -10 }}
        whileHover={{ y: 0 }}
      >
        <div className="text-pink-400 font-heading tracking-wide">{currentPhase}</div>
        <div className="text-gray-400 text-xs">{Math.round(phasePercentage)}% illuminated</div>

        {/* Tooltip arrow */}
        <div className="absolute -top-1 left-4 w-2 h-2 bg-black/90 border-l border-t border-purple-500/30 rotate-45" />
      </motion.div>
    </motion.div>
  )
}
