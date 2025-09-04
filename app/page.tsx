"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, Users, Hash, Zap, Activity, Cpu, Wifi } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const trendingHashtags = [
  { tag: "neuroenhance", posts: "42.3K", growth: "+127%", color: "from-cyan-400 to-blue-500" },
  { tag: "mindware", posts: "38.7K", growth: "+89%", color: "from-purple-400 to-pink-500" },
  { tag: "datastream", posts: "51.2K", growth: "+156%", color: "from-green-400 to-cyan-500" },
  { tag: "cognitec", posts: "29.4K", growth: "+203%", color: "from-yellow-400 to-orange-500" },
  { tag: "synaptic", posts: "67.1K", growth: "+74%", color: "from-red-400 to-purple-500" },
]

const suggestedCreators = [
  {
    id: "1",
    username: "neural_alex",
    displayName: "Alex_7834",
    avatar: "/placeholder.svg?key=cyber1",
    followers: "125K",
    verified: true,
    bio: "Cognitive Enhancement Specialist 🧠⚡",
    status: "online",
  },
  {
    id: "3",
    username: "dr_synaptic",
    displayName: "Dr.Maya_Neural",
    avatar: "/placeholder.svg?key=cyber2",
    followers: "89K",
    verified: true,
    bio: "Neuroscience | Brain-Computer Interface",
    status: "streaming",
  },
  {
    id: "4",
    username: "habit_matrix",
    displayName: "Matrix_Habits",
    avatar: "/placeholder.svg?key=cyber3",
    followers: "234K",
    verified: true,
    bio: "Pattern Recognition • Habit Optimization",
    status: "online",
  },
]

interface GlitchTextProps {
  children: React.ReactNode
  className?: string
}

const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
  const [glitch, setGlitch] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 3000 + Math.random() * 2000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <span className={`${className} ${glitch ? 'animate-pulse' : ''}`} style={{
      textShadow: glitch ? '0 0 5px currentColor, 2px 2px 0px #ff00ff, -2px -2px 0px #00ffff' : 'none'
    }}>
      {children}
    </span>
  )
}

const NeonBorder = ({ children, className = "", color = "cyan" }: { children: React.ReactNode, className?: string, color?: string }) => {
  const [glow, setGlow] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGlow(true)
      setTimeout(() => setGlow(false), 200)
    }, 4000 + Math.random() * 3000)
    
    return () => clearInterval(interval)
  }, [])
  
  const glowStyles = {
    cyan: 'shadow-[0_0_20px_rgba(6,182,212,0.5)] border-cyan-400',
    purple: 'shadow-[0_0_20px_rgba(147,51,234,0.5)] border-purple-400',
    green: 'shadow-[0_0_20px_rgba(34,197,94,0.5)] border-green-400',
    pink: 'shadow-[0_0_20px_rgba(236,72,153,0.5)] border-pink-400'
  }
  
  return (
    <div className={`${className} transition-all duration-300 ${glow ? glowStyles[color as keyof typeof glowStyles] : ''}`}>
      {children}
    </div>
  )
}

interface StreamData {
  id: number
  chars: string
  x: number
  duration: number
}

const DataStream = () => {
  const [streams, setStreams] = useState<StreamData[]>([])
  
  useEffect(() => {
    const chars = '01101001011010110110111001110100'
    const interval = setInterval(() => {
      const newStream: StreamData = {
        id: Math.random(),
        chars: chars.split('').sort(() => Math.random() - 0.5).join('').slice(0, 8),
        x: Math.random() * 100,
        duration: 2000 + Math.random() * 3000
      }
      setStreams(prev => [...prev.slice(-10), newStream])
    }, 800)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {streams.map(stream => (
        <div
          key={stream.id}
          className="absolute text-xs font-mono text-cyan-400 animate-pulse"
          style={{
            left: `${stream.x}%`,
            top: '-20px',
            animation: `fall ${stream.duration}ms linear forwards`
          }}
        >
          {stream.chars}
        </div>
      ))}
      <style jsx>{`
        @keyframes fall {
          to { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [scanlines, setScanlines] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setScanlines(prev => !prev)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]" />
      <div className="fixed inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(6,182,212,0.03)_25%,rgba(6,182,212,0.03)_26%,transparent_27%,transparent_74%,rgba(6,182,212,0.03)_75%,rgba(6,182,212,0.03)_76%,transparent_77%)] bg-[length:100%_4px]" />
      <DataStream />
      
      {/* Scanlines */}
      <div 
        className={`fixed inset-0 pointer-events-none transition-opacity duration-75 ${scanlines ? 'opacity-20' : 'opacity-5'}`}
        style={{
          background: 'linear-gradient(transparent 50%, rgba(0,255,0,0.02) 50%)',
          backgroundSize: '100% 4px'
        }}
      />

      <div className="relative max-w-6xl mx-auto p-6 space-y-8">
        <header className="space-y-6">
          <div className="flex items-center gap-4">
            <Activity className="h-8 w-8 text-cyan-400 animate-pulse" />
            <GlitchText className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              NEURAL_EXPLORE.EXE
            </GlitchText>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
          </div>
          
          <NeonBorder className="relative border border-cyan-500/30 bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10" />
            <div className="relative flex items-center p-4">
              <Search className="h-5 w-5 text-cyan-400 mr-3 animate-pulse" />
              <Input
                placeholder="SEARCH NEURAL_NETWORKS // USERS // DATA_STREAMS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none text-green-400 placeholder-gray-500 font-mono focus:ring-0 focus:ring-offset-0"
              />
              <div className="ml-3 flex items-center gap-2">
                <Wifi className="h-4 w-4 text-green-400 animate-bounce" />
                <span className="text-xs text-cyan-400">CONNECTED</span>
              </div>
            </div>
          </NeonBorder>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <NeonBorder className="border border-purple-500/30 bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden" color="purple">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5" />
            <CardHeader className="relative border-b border-purple-500/30 bg-gray-900/50">
              <CardTitle className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-purple-400 animate-pulse" />
                <GlitchText className="text-xl text-purple-400">TRENDING_HASHTAGS</GlitchText>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-400 to-transparent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 relative">
              {trendingHashtags.map((item, i) => (
                <div key={item.tag} className="group flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30 hover:border-purple-400/50 hover:bg-gray-800/40 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="text-gray-500 text-sm font-mono bg-gray-800 px-2 py-1 rounded">
                      #{String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <p className={`font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                        #{item.tag}
                      </p>
                      <p className="text-sm text-gray-400 font-mono">{item.posts} SIGNALS</p>
                    </div>
                  </div>
                  <Badge className="bg-green-400/20 text-green-400 border-green-400/30 font-mono animate-pulse">
                    <Zap className="h-3 w-3 mr-1" />
                    {item.growth}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </NeonBorder>

          <NeonBorder className="border border-cyan-500/30 bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden" color="cyan">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-green-500/5" />
            <CardHeader className="relative border-b border-cyan-500/30 bg-gray-900/50">
              <CardTitle className="flex items-center gap-3">
                <Users className="h-6 w-6 text-cyan-400 animate-pulse" />
                <GlitchText className="text-xl text-cyan-400">NEURAL_CREATORS</GlitchText>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-400 to-transparent" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6 relative">
              {suggestedCreators.map((creator) => (
                <div key={creator.id} className="group flex items-center justify-between p-4 rounded-lg bg-gray-800/20 border border-gray-700/30 hover:border-cyan-400/50 hover:bg-gray-800/40 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                        <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gray-800 text-cyan-400 font-mono">{creator.displayName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                        creator.status === 'online' ? 'bg-green-400 animate-pulse' :
                        creator.status === 'streaming' ? 'bg-red-400 animate-ping' : 'bg-gray-500'
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-white">{creator.displayName}</p>
                        {creator.verified && (
                          <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30 px-1 py-0 text-xs">
                            <Cpu className="h-3 w-3" />
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 font-mono">@{creator.username}</p>
                      <p className="text-xs text-cyan-400 font-mono">{creator.followers} FOLLOWERS</p>
                      <p className="text-xs text-gray-500 mt-1">{creator.bio}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold border-none shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all duration-300"
                  >
                    CONNECT
                  </Button>
                </div>
              ))}
            </CardContent>
          </NeonBorder>
        </div>

        <NeonBorder className="border border-green-500/30 bg-gray-800/30 backdrop-blur-sm rounded-lg overflow-hidden" color="green">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-cyan-500/5" />
          <CardHeader className="relative border-b border-green-500/30 bg-gray-900/50">
            <CardTitle className="flex items-center gap-3">
              <Hash className="h-6 w-6 text-green-400 animate-pulse" />
              <GlitchText className="text-xl text-green-400">POPULAR_PROTOCOLS</GlitchText>
              <div className="flex-1 h-px bg-gradient-to-r from-green-400 to-transparent" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "NeuroBoost", color: "from-cyan-400 to-blue-500" },
                { name: "MindHack", color: "from-purple-400 to-pink-500" },
                { name: "CogniFlow", color: "from-green-400 to-cyan-500" },
                { name: "SynapSync", color: "from-yellow-400 to-orange-500" },
                { name: "BrainWave", color: "from-red-400 to-purple-500" },
                { name: "NeuralLink", color: "from-blue-400 to-cyan-500" },
                { name: "DataMind", color: "from-pink-400 to-red-500" },
                { name: "CyberLearn", color: "from-green-400 to-blue-500" },
              ].map((topic) => (
                <Button 
                  key={topic.name} 
                  variant="outline" 
                  className={`relative border-gray-600/50 bg-gray-800/20 text-white hover:border-transparent hover:text-black font-mono group overflow-hidden transition-all duration-300`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    {topic.name}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </NeonBorder>

        {/* System Status */}
        <div className="fixed bottom-4 right-4 bg-gray-900/90 border border-green-400/30 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400">SYSTEM_ONLINE</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            NEURAL_NET: ACTIVE • PING: 12ms
          </div>
        </div>
      </div>
    </div>
  )
}