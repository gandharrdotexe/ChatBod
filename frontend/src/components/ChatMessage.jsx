const ChatMessage = ({ role, content }) => {
    const isUser = role === "user"
  
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-[80%] px-4 py-2 rounded-lg ${
            isUser ? "bg-blue-600 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"
          }`}
        >
          {content}
        </div>
      </div>
    )
  }
  
  export default ChatMessage
  
  