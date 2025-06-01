import type React from "react"
import type { Metadata } from "next"
import { Sora, Urbanist } from "next/font/google"
import "./globals.css"

// Initialize the Sora font for headings
const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
})

// Initialize the Urbanist font for body text
const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "Moon Films | Video Editing & Visual Storytelling",
  description: "Turning moments into motion. Professional video editing services by Moon Films.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${sora.variable} ${urbanist.variable}`}>
      <body className="bg-black text-white antialiased font-sans">{children}</body>
    </html>
  )
}
