"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  originalX: number
  originalY: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  const colors = ["#ec4899", "#a855f7", "#f3b0dc", "#8b5cf6"]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          originalX: x,
          originalY: y,
        })
      }
      particlesRef.current = particles
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current
      const repelRadius = 150
      const repelForce = 0.8

      particlesRef.current.forEach((particle, i) => {
        // Calculate distance from mouse
        const dx = particle.x - mouse.x
        const dy = particle.y - mouse.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Apply repel force if within radius
        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius
          const angle = Math.atan2(dy, dx)

          // Apply repel force
          particle.vx += Math.cos(angle) * force * repelForce
          particle.vy += Math.sin(angle) * force * repelForce
        }

        // Apply slight attraction back to original position
        const returnForce = 0.02
        particle.vx += (particle.originalX - particle.x) * returnForce
        particle.vy += (particle.originalY - particle.y) * returnForce

        // Apply friction
        particle.vx *= 0.95
        particle.vy *= 0.95

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.5
          particle.x = Math.max(0, Math.min(canvas.width, particle.x))
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.5
          particle.y = Math.max(0, Math.min(canvas.height, particle.y))
        }

        // Draw particle with enhanced glow when near mouse
        const glowIntensity = distance < repelRadius ? (repelRadius - distance) / repelRadius : 0
        const particleSize = particle.size + glowIntensity * 2

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2)

        // Enhanced glow effect when near mouse
        if (glowIntensity > 0) {
          const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particleSize * 3)
          gradient.addColorStop(0, particle.color)
          gradient.addColorStop(0.5, particle.color + "80")
          gradient.addColorStop(1, "transparent")
          ctx.fillStyle = gradient
        } else {
          ctx.fillStyle = particle.color
        }

        ctx.globalAlpha = particle.opacity + glowIntensity * 0.5
        ctx.fill()

        // Draw connections with enhanced effects near mouse
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const connectionDx = particle.x - otherParticle.x
          const connectionDy = particle.y - otherParticle.y
          const connectionDistance = Math.sqrt(connectionDx * connectionDx + connectionDy * connectionDy)

          if (connectionDistance < 150) {
            // Check if connection line is near mouse
            const lineToMouseDist = distanceToLine(
              mouse.x,
              mouse.y,
              particle.x,
              particle.y,
              otherParticle.x,
              otherParticle.y,
            )

            let lineOpacity = ((150 - connectionDistance) / 150) * 0.3
            let lineColor = "#a855f7"
            let lineWidth = 1

            // Enhance line if near mouse
            if (lineToMouseDist < 100) {
              const enhancement = (100 - lineToMouseDist) / 100
              lineOpacity += enhancement * 0.4
              lineWidth += enhancement * 2
              lineColor = `rgba(236, 72, 153, ${lineOpacity})`
            }

            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = lineColor
            ctx.globalAlpha = lineOpacity
            ctx.lineWidth = lineWidth
            ctx.stroke()
          }
        })
      })

      ctx.globalAlpha = 1
    }

    // Helper function to calculate distance from point to line
    const distanceToLine = (px: number, py: number, x1: number, y1: number, x2: number, y2: number) => {
      const A = px - x1
      const B = py - y1
      const C = x2 - x1
      const D = y2 - y1

      const dot = A * C + B * D
      const lenSq = C * C + D * D
      let param = -1
      if (lenSq !== 0) param = dot / lenSq

      let xx, yy

      if (param < 0) {
        xx = x1
        yy = y1
      } else if (param > 1) {
        xx = x2
        yy = y2
      } else {
        xx = x1 + param * C
        yy = y1 + param * D
      }

      const dx = px - xx
      const dy = py - yy
      return Math.sqrt(dx * dx + dy * dy)
    }

    const animate = () => {
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createParticles()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createParticles()
    }

    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: "linear-gradient(135deg, #000000 0%, #1a0b2e 50%, #000000 100%)" }}
    />
  )
}
