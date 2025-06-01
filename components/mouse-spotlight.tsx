"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  if (!isMounted) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-0 opacity-40"
      animate={{
        x: mousePosition.x - 200,
        y: mousePosition.y - 200,
      }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
    >
      <div
        className="w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.2) 40%, rgba(0,0,0,0) 70%)",
        }}
      />
    </motion.div>
  )
}
