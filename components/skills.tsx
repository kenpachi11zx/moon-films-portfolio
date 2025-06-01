"use client"

import { motion } from "framer-motion"
import { Monitor, Zap, Palette, Layers, BarChart3, Mic } from "lucide-react"

const skills = [
  { name: "ADOBE PREMIERE PRO", icon: Monitor },
  { name: "AFTER EFFECTS", icon: Zap },
  { name: "DAVINCI RESOLVE", icon: Palette },
  { name: "COLOR GRADING", icon: Layers },
  { name: "MOTION GRAPHICS", icon: BarChart3 },
  { name: "SOUND DESIGN", icon: Mic },
]

export default function Skills() {
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
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" className="relative py-16 bg-black/50">
      <div className="section-container">
        <motion.h2
          className="section-title font-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          SKILLS
        </motion.h2>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-6 gap-4 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => {
            const IconComponent = skill.icon
            return (
              <motion.div
                key={index}
                variants={item}
                className="bg-gradient-to-br from-purple-900/20 to-black/20 backdrop-blur-sm p-4 rounded-sm border border-purple-500/10 flex flex-col items-center justify-center text-center group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(236, 72, 153, 0.3)",
                }}
              >
                <div className="mb-3">
                  <IconComponent className="w-6 h-6 text-pink-500 group-hover:text-purple-300 transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xs font-medium tracking-normal leading-tight">{skill.name}</h3>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
