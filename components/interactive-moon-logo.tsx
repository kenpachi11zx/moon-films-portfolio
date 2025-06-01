"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion"

export default function InteractiveMoonLogo() {
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Transform mouse position to rotation values with more sensitivity
  const rotateX = useTransform(mouseY, [-200, 200], [20, -20])
  const rotateY = useTransform(mouseX, [-200, 200], [-20, 20])

  // Add spring physics for smoother rotation
  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 })

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      mouseX.set(deltaX)
      mouseY.set(deltaY)
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  if (!isMounted) return null

  return (
    <div ref={containerRef} className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8">
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-600/30 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 3D Moon with mouse rotation */}
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {/* Moon body */}
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-br from-pink-500 to-purple-600 relative overflow-hidden shadow-2xl"
          whileHover={{
            scale: 1.08,
            rotateZ: 5,
            boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)",
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
        >
          {/* Moon crater effects */}
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
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>

        {/* Sparkle effects */}
        <motion.div
          className="absolute -top-2 -right-2 w-2 h-2"
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
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
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
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

        <motion.div
          className="absolute top-1/2 right-0 w-1.5 h-1.5"
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 5,
          }}
        >
          <div
            className="w-full h-full bg-purple-300 shadow-lg shadow-purple-300/50"
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Twinkling stars around the moon */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Star 1 */}
        <motion.div
          className="absolute top-2 left-8 w-1 h-1"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0,
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-lg shadow-white/50" />
        </motion.div>

        {/* Star 2 */}
        <motion.div
          className="absolute top-8 right-4 w-0.5 h-0.5"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 1,
          }}
        >
          <div className="w-full h-full bg-pink-300 rounded-full shadow-lg shadow-pink-300/50" />
        </motion.div>

        {/* Star 3 */}
        <motion.div
          className="absolute bottom-4 left-2 w-1 h-1"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            delay: 2,
          }}
        >
          <div className="w-full h-full bg-purple-300 rounded-full shadow-lg shadow-purple-300/50" />
        </motion.div>

        {/* Star 4 */}
        <motion.div
          className="absolute bottom-8 right-8 w-0.5 h-0.5"
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: 0.5,
          }}
        >
          <div className="w-full h-full bg-white rounded-full shadow-lg shadow-white/50" />
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
    </div>
  )
}
