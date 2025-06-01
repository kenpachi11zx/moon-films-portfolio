"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

const videos = [
  {
    url: "https://youtu.be/L2I2QvAK54E",
    embedUrl: "https://www.youtube.com/embed/L2I2QvAK54E",
    thumbnail: "https://img.youtube.com/vi/L2I2QvAK54E/maxresdefault.jpg",
  },
  {
    url: "https://www.youtube.com/watch?v=PHPdOiyTW4o",
    embedUrl: "https://www.youtube.com/embed/PHPdOiyTW4o",
    thumbnail: "https://img.youtube.com/vi/PHPdOiyTW4o/maxresdefault.jpg",
  },
  {
    url: "https://youtu.be/lb2nQow3S98",
    embedUrl: "https://www.youtube.com/embed/lb2nQow3S98",
    thumbnail: "https://img.youtube.com/vi/lb2nQow3S98/maxresdefault.jpg",
  },
  {
    url: "https://youtu.be/EqL9PeK1k9I",
    embedUrl: "https://www.youtube.com/embed/EqL9PeK1k9I",
    thumbnail: "https://img.youtube.com/vi/EqL9PeK1k9I/maxresdefault.jpg",
  },
  {
    url: "https://youtube.com/shorts/EBnQITCMN3Q",
    embedUrl: "https://www.youtube.com/embed/EBnQITCMN3Q",
    thumbnail: "https://img.youtube.com/vi/EBnQITCMN3Q/maxresdefault.jpg",
  },
  {
    url: "https://youtu.be/Lkrep-XuCK0",
    embedUrl: "https://www.youtube.com/embed/Lkrep-XuCK0",
    thumbnail: "https://img.youtube.com/vi/Lkrep-XuCK0/maxresdefault.jpg",
  },
  {
    url: "https://youtu.be/eo1W28JDkD4",
    embedUrl: "https://www.youtube.com/embed/eo1W28JDkD4",
    thumbnail: "https://img.youtube.com/vi/eo1W28JDkD4/maxresdefault.jpg",
  },
  {
    url: "https://youtube.com/shorts/ZdlPHcTI6e0",
    embedUrl: "https://www.youtube.com/embed/ZdlPHcTI6e0",
    thumbnail: "https://img.youtube.com/vi/ZdlPHcTI6e0/maxresdefault.jpg",
  },
]

export default function Work() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="work" className="relative py-16">
      <div className="section-container">
        <motion.h2
          className="section-title font-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          MY WORK
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative aspect-video rounded-sm overflow-hidden group cursor-pointer bg-gradient-to-br from-purple-900/30 to-black/30 border border-purple-500/20"
              onClick={() => setActiveVideo(video.embedUrl)}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg?height=720&width=1280"
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl aspect-video">
            <iframe
              src={activeVideo}
              className="w-full h-full rounded-sm"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-pink-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
