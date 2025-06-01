"use client"

import { useEffect } from "react"

export default function SmoothScroll() {
  useEffect(() => {
    // Add smooth scrolling behavior
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
        scroll-snap-type: y mandatory;
      }
      
      section {
        scroll-snap-align: start;
      }
      
      /* Custom scrollbar with neon effect */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.8);
      }
      
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(45deg, #ec4899, #a855f7);
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(45deg, #f472b6, #c084fc);
        box-shadow: 0 0 15px rgba(236, 72, 153, 0.8);
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return null
}
