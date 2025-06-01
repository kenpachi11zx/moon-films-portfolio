"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Instagram } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | "loading" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        type: "error",
        message: "Please fill in all fields",
      })
      return
    }

    if (!formData.email.includes("@")) {
      setFormStatus({
        type: "error",
        message: "Please enter a valid email address",
      })
      return
    }

    // Set loading state
    setFormStatus({
      type: "loading",
      message: "Sending message...",
    })

    try {
      // EmailJS configuration with your credentials
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Moon Films",
      }

      // Send email using EmailJS with your credentials
      await emailjs.send(
        "service_09jykuv", // Your Service ID
        "template_sjo0o0g", // Your Template ID
        templateParams,
        "xdQV4RUShMMJtD2mL", // Your Public Key
      )

      // Success
      setFormStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      console.error("EmailJS error:", error)
      setFormStatus({
        type: "error",
        message: "Failed to send message. Please try again or contact me directly.",
      })
    }
  }

  return (
    <section id="contact" className="relative py-16">
      <div className="section-container">
        <motion.h2
          className="section-title font-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          GET IN TOUCH
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-heading text-lg font-medium mb-6 tracking-wide uppercase">CONTACT INFORMATION</h3>
            <p className="mb-8 text-gray-300 font-normal leading-relaxed tracking-normal max-w-2xl mx-auto">
              Ready to bring your vision to life? Reach out and let's create something amazing together.
            </p>

            <div className="flex justify-center gap-4 mb-10">
              <a
                href="mailto:moonfilms07@gmail.com"
                className="w-12 h-12 rounded-sm bg-purple-900/50 border border-purple-500/30 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/50 transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/themoonfilms_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-sm bg-purple-900/50 border border-purple-500/30 flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-500/50 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {formStatus.type && (
                <div
                  className={`p-4 rounded-sm border text-center font-medium ${
                    formStatus.type === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : formStatus.type === "loading"
                        ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {formStatus.message}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="font-heading block mb-3 text-sm font-medium tracking-wide uppercase text-center"
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={formStatus.type === "loading"}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-sm focus:outline-none focus:border-pink-500/50 transition-colors font-normal tracking-normal text-center disabled:opacity-50"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-heading block mb-3 text-sm font-medium tracking-wide uppercase text-center"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={formStatus.type === "loading"}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-sm focus:outline-none focus:border-pink-500/50 transition-colors font-normal tracking-normal text-center disabled:opacity-50"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-heading block mb-3 text-sm font-medium tracking-wide uppercase text-center"
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={formStatus.type === "loading"}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/20 rounded-sm focus:outline-none focus:border-pink-500/50 transition-colors font-normal tracking-normal resize-none text-center disabled:opacity-50"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={formStatus.type === "loading"}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={formStatus.type !== "loading" ? { scale: 1.02 } : {}}
                whileTap={formStatus.type !== "loading" ? { scale: 0.98 } : {}}
              >
                {formStatus.type === "loading" ? "SENDING..." : "SEND MESSAGE"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
