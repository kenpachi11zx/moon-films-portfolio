"use client"

import { motion } from "framer-motion"
import { MapPin, Globe } from "lucide-react"

export default function About() {
  return (
    <section id="about" className="relative py-16">
      <div className="section-container">
        <motion.h2
          className="section-title font-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ABOUT
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12 text-center"
          >
            <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56 mb-8">
              <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-pink-500 to-purple-600 blur-lg opacity-70"></div>
              <div className="relative w-full h-full rounded-sm overflow-hidden border border-pink-500/50 glow-border">
                <img
                  src="/images/moon-films-logo.png"
                  alt="Moon Films Logo"
                  className="w-full h-full object-contain p-4"
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-lg mb-10 text-gray-300 font-normal leading-relaxed tracking-normal max-w-3xl mx-auto">
              I'm a creative video editor driven by rhythm, emotion, and storytelling. Through cinematic visuals and
              thoughtful pacing, I turn raw footage into compelling visual experiences.
            </p>

            <div className="flex justify-center">
              <div className="bg-gradient-to-br from-purple-900/20 to-black/20 rounded-sm border border-purple-500/20 p-6 max-w-md">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-5 h-5 text-pink-500" />
                  <span className="font-medium tracking-normal text-center text-sm">ENGLISH, HINDI, ASSAMESE</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-pink-500" />
                  <span className="font-medium tracking-normal text-center text-sm">GUWAHATI, ASSAM</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
