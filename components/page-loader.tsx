"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simple, smooth progress
    const duration = 3000
    const startTime = Date.now()

    const updateProgress = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)

      setProgress(newProgress)

      if (newProgress >= 100) {
        setTimeout(() => setIsLoading(false), 300)
      } else {
        requestAnimationFrame(updateProgress)
      }
    }

    requestAnimationFrame(updateProgress)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="text-center">
            {/* Moon Logo - Same as Hero */}
            <motion.div
              className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Outer glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-600/30 blur-xl" />

              {/* 3D Moon with mouse rotation */}
              <div className="relative w-full h-full cursor-pointer">
                {/* Moon body */}
                <motion.div
                  className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-purple-600 relative overflow-hidden shadow-2xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 200 }}
                >
                  {/* Moon crater effects - Same as hero */}
                  <div className="absolute top-1/4 right-1/4 w-5 h-5 rounded-full bg-black/25 shadow-inner" />
                  <div className="absolute bottom-1/3 left-1/4 w-4 h-4 rounded-full bg-black/20 shadow-inner" />
                  <div className="absolute top-1/2 left-1/3 w-3 h-3 rounded-full bg-white/15 shadow-inner" />
                  <div className="absolute bottom-1/4 right-1/3 w-2 h-2 rounded-full bg-black/25 shadow-inner" />
                  <div className="absolute top-1/3 right-1/2 w-6 h-6 rounded-full bg-black/15 shadow-inner" />

                  {/* Highlight effect */}
                  <div className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-md" />

                  {/* Crescent shadow */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-full bg-black/50 rounded-full"
                    initial={{ x: "100%" }}
                    animate={{ x: "30%" }}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
                  />
                </motion.div>

                {/* Sparkle effects - Same as hero */}
                <motion.div
                  className="absolute -top-2 -right-2 w-2 h-2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 3,
                  }}
                >
                  <div
                    className="w-full h-full bg-white shadow-lg shadow-white/50"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    }}
                  />
                </motion.div>

                <motion.div
                  className="absolute -bottom-1 -left-1 w-1 h-1"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 4,
                  }}
                >
                  <div
                    className="w-full h-full bg-pink-300 shadow-lg shadow-pink-300/50"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                    }}
                  />
                </motion.div>
              </div>

              {/* Slowly rotating orbit ring */}
              <motion.div
                className="absolute inset-0 border border-purple-500/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Secondary orbit ring */}
              <motion.div
                className="absolute inset-2 border border-pink-500/15 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 45, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>

            {/* Text - Same fonts as hero */}
            <motion.h1
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 glow tracking-wide text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-300">
                MOON FILMS
              </span>
            </motion.h1>

            <motion.h2
              className="font-heading text-lg md:text-xl lg:text-2xl mb-4 font-medium tracking-wide text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              VIDEO EDITING & VISUAL STORYTELLING
            </motion.h2>

            <motion.p
              className="text-base md:text-lg mb-10 max-w-2xl mx-auto text-gray-300 font-normal tracking-normal text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              TURNING MOMENTS INTO MOTION
            </motion.p>

            {/* Simple Progress Bar */}
            <motion.div
              className="w-80 max-w-sm mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <div className="h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-600 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <div className="text-center">
                <span className="text-gray-500 text-sm font-mono">{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
