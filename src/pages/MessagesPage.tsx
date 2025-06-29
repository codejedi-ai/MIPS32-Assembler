import { useState } from "react"
import { FloatingCard } from "@/components/ui/floating-card"
import { AnimatedText } from "@/components/ui/animated-text"
import { MorphingButton } from "@/components/ui/morphing-button"
import { Input } from "@/components/ui/input"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Sparkles } from "lucide-react"

// Mock data for conversations
const mockConversations = [
  {
    id: "1",
    name: "Sophia",
    lastMessage: "I was thinking about what you said earlier...",
    time: "2 min ago",
    unread: 2,
    avatar: "/hero-image.png",
    online: true,
  },
  {
    id: "2",
    name: "Emma",
    lastMessage: "Would you like to continue our discussion about travel?",
    time: "1 hour ago",
    unread: 0,
    avatar: "/placeholder.svg?height=100&width=100&text=E",
    online: false,
  },
  {
    id: "3",
    name: "Olivia",
    lastMessage: "I found a new art piece I think you'd appreciate!",
    time: "Yesterday",
    unread: 0,
    avatar: "/placeholder.svg?height=100&width=100&text=O",
    online: true,
  },
]

// Mock data for messages
const mockMessages = [
  {
    id: "1",
    senderId: "1",
    text: "Hello! How are you doing today?",
    time: "10:30 AM",
    isUser: false,
  },
  {
    id: "2",
    senderId: "user",
    text: "I'm doing well, thanks for asking! Just thinking about some philosophical questions lately.",
    time: "10:32 AM",
    isUser: true,
  },
  {
    id: "3",
    senderId: "1",
    text: "That sounds interesting! Philosophy is one of my favorite subjects. What kind of questions have been on your mind?",
    time: "10:33 AM",
    isUser: false,
  },
]

export function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(mockConversations[0])
  const [messageText, setMessageText] = useState("")
  const [messages, setMessages] = useState(mockMessages)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = mockConversations.filter((convo) =>
    convo.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (!messageText.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      senderId: "user",
      text: messageText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isUser: true,
    }

    setMessages([...messages, newMessage])
    setMessageText("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        senderId: activeConversation.id,
        text: "That's an interesting perspective! I'd love to hear more about your thoughts on this topic.",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isUser: false,
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="flex h-screen">
        {/* Conversation List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-gray-800/50 overflow-hidden flex flex-col">
          <FloatingCard variant="glass" className="m-4 mb-0 rounded-b-none">
            <div className="p-4">
              <AnimatedText variant="gradient" className="text-xl font-bold mb-4">
                Messages
              </AnimatedText>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search conversations"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </FloatingCard>

          <div className="flex-1 overflow-y-auto px-4">
            {filteredConversations.map((conversation) => (
              <FloatingCard
                key={conversation.id}
                variant={activeConversation.id === conversation.id ? "glow" : "glass"}
                className={`mb-2 cursor-pointer transition-all duration-300 ${
                  activeConversation.id === conversation.id ? "scale-105" : "hover:scale-102"
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="flex items-center p-4">
                  <div className="relative mr-3">
                    <img
                      src={conversation.avatar || "/placeholder.svg"}
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-400">{conversation.time}</span>
                    </div>
                    <p className="text-gray-400 text-sm truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-teal-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </FloatingCard>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-col flex-1">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <FloatingCard variant="glass" className="m-4 mb-0 rounded-b-none">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <img
                        src={activeConversation.avatar || "/placeholder.svg"}
                        alt={activeConversation.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      {activeConversation.online && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black"></span>
                      )}
                    </div>
                    <div>
                      <AnimatedText variant="gradient" className="font-medium">
                        {activeConversation.name}
                      </AnimatedText>
                      <p className="text-xs text-gray-400">{activeConversation.online ? "Online" : "Offline"}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <MorphingButton
                      variant="glass"
                      className="w-10 h-10 rounded-full p-0"
                      morphTo={<Phone size={20} className="text-teal-400" />}
                    >
                      <Phone size={20} />
                    </MorphingButton>
                    <MorphingButton
                      variant="glass"
                      className="w-10 h-10 rounded-full p-0"
                      morphTo={<Video size={20} className="text-teal-400" />}
                    >
                      <Video size={20} />
                    </MorphingButton>
                    <MorphingButton
                      variant="glass"
                      className="w-10 h-10 rounded-full p-0"
                      morphTo={<MoreVertical size={20} className="text-teal-400" />}
                    >
                      <MoreVertical size={20} />
                    </MorphingButton>
                  </div>
                </div>
              </FloatingCard>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                    {!message.isUser && (
                      <div className="mr-2 flex-shrink-0">
                        <img
                          src={activeConversation.avatar || "/placeholder.svg"}
                          alt={activeConversation.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>
                    )}
                    <FloatingCard
                      variant={message.isUser ? "glow" : "glass"}
                      className={`max-w-[70%] p-4 ${
                        message.isUser ? "rounded-tr-none" : "rounded-tl-none"
                      }`}
                    >
                      <p className="text-white">{message.text}</p>
                      <p className="text-xs text-gray-400 mt-2 text-right">{message.time}</p>
                    </FloatingCard>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <FloatingCard variant="glass" className="m-4 mt-0 rounded-t-none">
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <MorphingButton
                      variant="glass"
                      className="w-10 h-10 rounded-full p-0"
                      morphTo={<Paperclip size={20} className="text-teal-400" />}
                    >
                      <Paperclip size={20} />
                    </MorphingButton>
                    <Input
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          handleSendMessage()
                        }
                      }}
                      className="flex-1"
                    />
                    <MorphingButton
                      variant="glow"
                      className="w-12 h-12 rounded-full p-0"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                      morphTo={<Send size={20} className="animate-pulse" />}
                    >
                      <Send size={20} />
                    </MorphingButton>
                  </div>
                </div>
              </FloatingCard>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <FloatingCard variant="glass" className="p-12 text-center max-w-md">
                <Sparkles size={48} className="mx-auto mb-4 text-teal-400" />
                <AnimatedText variant="gradient" className="text-2xl font-bold mb-4">
                  No Conversation Selected
                </AnimatedText>
                <p className="text-gray-400">Select a conversation from the list to start chatting.</p>
              </FloatingCard>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}