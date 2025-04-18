

import { useState, useRef, useEffect } from "react"
import ChatMessage from "./components/ChatMessage"
import ThinkingIndicator from "./components/ThinkingIndicator"
import axios from "axios";
function App() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])



  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!input.trim()) return; // Prevent empty submissions

  // Append user message
  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setIsThinking(true); // Show loading indicator

  try {
    // Send request to backend
    const response = await axios.post("http://localhost:5009/chat", { message: input , prevconvo: messages });
    
    // Append AI response
    const aiMessage = { role: "ai", content: response.data };
    setMessages((prev) => [...prev, aiMessage]);
    console.log();
  } catch (error) {
    console.error("Error fetching AI response:", error);
    setMessages((prev) => [...prev, { role: "ai", content: "Sorry, something went wrong." }]);
  }

    setIsThinking(false); // Hide loading indicator
    
  setInput(""); // Clear input field
};


  return (
    <div className="flex flex-col h-screen bg-gray-100">
      
      <header className="bg-white shadow-sm py-4 px-6">
        <h1 className="text-xl font-bold text-gray-800">AI Chatbot</h1>
      </header>

      
      <div className="flex-1 overflow-hidden flex flex-col w-full mx-auto p-4">
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 rounded-lg bg-white shadow-sm ">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-2 max-w-md">
                <h2 className="text-xl font-semibold text-gray-700">Welcome to the AI Chatbot</h2>
                <p className="text-gray-500">Type a message to start the conversation.</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => <ChatMessage key={index} role={message.role} content={message.content} />)
          )}

          
          {isThinking && <ThinkingIndicator />}

          
          <div ref={messagesEndRef} />
        </div>

        
        <form onSubmit={handleSubmit} className="flex items-center space-x-2 bg-white p-2 rounded-lg shadow-sm">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isThinking}
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="bg-blue-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default App

