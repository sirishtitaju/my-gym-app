import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gym Workout Scheduler - Sirish Titaju',
  description: 'A Gym Workout Scheduler by Sirish Titaju',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
        <meta property="og:image" content="ogImage.jpg" />
        <meta property="og:image:alt" content="sirish titaju showcasing his workout schdeule" />
        <meta property="og:description" content="sirish titaju showcasing his workout schdeule" />
      </head>
      <body>{children}</body>
    </html>
  )
}
