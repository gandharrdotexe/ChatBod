const ThinkingIndicator = () => {
    return (
      <div className="flex justify-start">
        <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none max-w-[80%]">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Thinking</span>
            <span className="flex space-x-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </span>
          </div>
        </div>
      </div>
    )
  }
  
  export default ThinkingIndicator
  
  