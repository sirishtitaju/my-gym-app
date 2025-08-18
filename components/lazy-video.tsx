"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Loader2 } from "lucide-react"
import { Button } from "./ui/button"

interface LazyVideoProps {
  videoUrl: string
  title: string
  className?: string
}

export function LazyVideo({ videoUrl, title, className = "" }: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [thumbnailUrl, setThumbnailUrl] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:embed\/|v=|\/v\/|youtu\.be\/|\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  // Generate YouTube thumbnail URL
  useEffect(() => {
    const videoId = getYouTubeVideoId(videoUrl)
    if (videoId) {
      setThumbnailUrl(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
    }
  }, [videoUrl])

  const loadVideo = () => {
    setIsLoading(true)
    // Small delay to show loading state
    setTimeout(() => {
      setIsLoaded(true)
      setIsLoading(false)
    }, 300)
  }

  if (isLoaded) {
    return (
      <div className={className}>
        <iframe
          width="100%"
          height="280"
          src={videoUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-3xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] border-0"
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-gray-100 rounded-3xl overflow-hidden shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] cursor-pointer group ${className}`}
      style={{ height: "280px" }}
      onClick={loadVideo}
    >
      {/* Thumbnail Background */}
      {thumbnailUrl && (
        <img
          src={thumbnailUrl || "/placeholder.svg"}
          alt={`${title} thumbnail`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        {isLoading ? (
          <div className="flex items-center gap-3 bg-white/90 px-6 py-3 rounded-2xl shadow-lg">
            <Loader2 className="h-6 w-6 animate-spin text-gray-600" />
            <span className="text-gray-700 font-medium">Loading video...</span>
          </div>
        ) : (
          <Button
            size="lg"
            className="bg-white/90 hover:bg-white text-gray-700 hover:text-gray-900 rounded-full h-16 w-16 p-0 shadow-lg group-hover:scale-110 transition-transform duration-200"
          >
            <Play className="h-8 w-8 ml-1" fill="currentColor" />
          </Button>
        )}
      </div>

      {/* Video Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <p className="text-white font-medium text-sm truncate">{title}</p>
      </div>
    </div>
  )
}
