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



        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://sirish-workout-plan.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gym Workout Scheduler - Sirish Titaju" />
        <meta property="og:description" content="sirish titaju showcasing his workout schdeule" />
        <meta
          property="og:image"
          content="https://opengraph.b-cdn.net/production/images/6ebd657a-3a66-4fb1-b31d-3100463334a0.png?token=D-1dpqfBGhdUKjiAI9PfHh2Q7C42GrqUdBp1AVRzYN0&height=1505&width=1080&expires=33291518188"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="sirish-workout-plan.vercel.app" />
        <meta property="twitter:url" content="https://sirish-workout-plan.vercel.app/" />
        <meta name="twitter:title" content="Gym Workout Scheduler - Sirish Titaju" />
        <meta name="twitter:description" content="sirish titaju showcasing his workout schdeule" />
        <meta
          name="twitter:image"
          content="https://opengraph.b-cdn.net/production/images/6ebd657a-3a66-4fb1-b31d-3100463334a0.png?token=D-1dpqfBGhdUKjiAI9PfHh2Q7C42GrqUdBp1AVRzYN0&height=1505&width=1080&expires=33291518188"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
