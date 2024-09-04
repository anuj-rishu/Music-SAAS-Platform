"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Play, Music } from "lucide-react"
import { Footer } from "../components/footer"

// Default thumbnail URL
const DEFAULT_THUMBNAIL = "https://placehold.co/90x68/3730A3/ffffff/png?text=No+Thumbnail"

// Mock data for the queue with thumbnails and actual titles
const initialQueue = [
  { id: 1, title: "Rick Astley - Never Gonna Give You Up (Official Music Video)", votes: 5, youtubeId: "dQw4w9WgXcQ", thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/default.jpg" },
  { id: 2, title: "Darude - Sandstorm", votes: 3, youtubeId: "y6120QOlsfU", thumbnail: "https://img.youtube.com/vi/y6120QOlsfU/default.jpg" },
  { id: 3, title: "Smash Mouth - All Star", votes: 1, youtubeId: "L_jWHffIx5E", thumbnail: "https://img.youtube.com/vi/L_jWHffIx5E/default.jpg" },
]

export default function Component() {
  const [queue, setQueue] = useState(initialQueue)
  const [currentVideo, setCurrentVideo] = useState(queue[0])
  const [youtubeLink, setYoutubeLink] = useState("")
  const [previewId, setPreviewId] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const youtubeId = youtubeLink.split("v=")[1]
    if (youtubeId) {
      // In a real app, you'd want to fetch this data from your server
      // This is a mock implementation
      const response = await fetch(`https://noembed.com/embed?url=${youtubeLink}`)
      const data = await response.json()
      setQueue([...queue, { 
        id: Date.now(), 
        title: data.title || "Unknown Title", 
        votes: 0, 
        youtubeId,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/default.jpg`
      }])
      setYoutubeLink("")
      setPreviewId("")
    }
  }

  const handlePreview = () => {
    const youtubeId = youtubeLink.split("v=")[1]
    if (youtubeId) {
      setPreviewId(youtubeId)
    }
  }

  const handleVote = (id: number, increment: number) => {
    setQueue(
      queue.map((song) =>
        song.id === id ? { ...song, votes: song.votes + increment } : song
      ).sort((a, b) => b.votes - a.votes)
    )
  }

  const playNext = () => {
    if (queue.length > 1) {
      setCurrentVideo(queue[1])
      setQueue(queue.slice(1))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black text-white relative overflow-hidden">
      <div className="container mx-auto p-4 max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-300">Song Voting Queue</h1>
        
        {/* Current video player */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200">Now Playing</h2>
          <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentVideo.youtubeId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <Button onClick={playNext} className="mt-4 bg-purple-600 hover:bg-purple-700 text-white">Play Next</Button>
        </div>

        {/* Submit new song form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-200">Add a Song</h2>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              placeholder="Paste YouTube link here"
              className="flex-grow bg-gray-800 text-white border-gray-700 focus:border-purple-500"
            />
            <Button type="button" onClick={handlePreview} className="bg-purple-600 hover:bg-purple-700 text-white">Preview</Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Submit</Button>
          </div>
          {previewId && (
            <div className="aspect-video max-w-sm rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${previewId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </form>

        {/* Queue */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-purple-200">Upcoming Songs</h2>
          {queue.slice(1).map((song) => (
            <Card key={song.id} className="p-4 mb-4 bg-gray-800 border-gray-700 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative w-[90px] h-[68px]">
                    <img 
                      src={song.thumbnail || DEFAULT_THUMBNAIL} 
                      alt={song.title}
                      className="rounded object-cover w-full h-full"
                      onError={(e) => {
                        e.currentTarget.src = DEFAULT_THUMBNAIL
                      }}
                    />
                    {!song.thumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-700 rounded">
                        <Music className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium line-clamp-2">{song.title}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Play className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-400">YouTube</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => handleVote(song.id, 1)} className="bg-purple-600 hover:bg-purple-700 text-white">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    <span>{song.votes}</span>
                  </Button>
                  <Button size="sm" onClick={() => handleVote(song.id, -1)} className="bg-gray-600 hover:bg-gray-700 text-white">
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Footer/>
    </div>

  )
}