// import { useState, useRef, useEffect } from 'react';
// import { Transition } from '@headlessui/react';

// function ChatUI() {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [chat]);

//   const handleSend = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;

//     const userMessage = { sender: "user", text: message };
//     setChat((prev) => [...prev, userMessage]);
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await fetch('http://127.0.0.1:8000/api/chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           message: chat
//             .filter(msg => msg.text.trim() !== "")  // filter out empty
//             .map(msg => ({
//               role: msg.sender === "user" ? "user" : "assistant",
//               content: msg.text
//             }))
//         }),
//       });
//       const data = await res.json();

//       const aiMessage = { sender: "ai", text: data.reply || "Sorry, no reply." };
//       setChat((prev) => [...prev, aiMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage = { sender: "ai", text: "Error connecting to server." };
//       setChat((prev) => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
//       <div className="flex flex-col h-[90vh] w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">

//         {/* Header */}
//         <div className="text-center py-6">
//           <h1 className="text-2xl font-semibold text-gray-800">Conversational Support AI</h1>
//           <p className="text-sm text-gray-500 mt-2">
//             Ask anything about Apple products, services, or your account
//           </p>
//         </div>

//         {/* Chat messages */}
//         <div className="flex-1 overflow-y-auto space-y-2 p-4">
//           {chat.map((msg, idx) => (
//             <Transition
//               key={idx}
//               appear={true}
//               show={true}
//               enter="transition-opacity duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//             >
//               <div className={`text-sm p-2 rounded-md max-w-[80%] ${
//                 msg.sender === 'user' ? 'bg-blue-100 text-blue-800 self-end' : 'bg-gray-100 text-gray-800 self-start'
//               }`}>
//                 {msg.text}
//               </div>
//             </Transition>
//           ))}
//           {loading && (
//             <div className="flex items-center space-x-1 justify-center text-gray-500 text-sm mt-2">
//               <span className="animate-bounce">.</span>
//               <span className="animate-bounce delay-150">.</span>
//               <span className="animate-bounce delay-300">.</span>
//             </div>
//           )}
//           <div ref={chatEndRef} />
//         </div>

//         {/* Input form */}
//         <form onSubmit={handleSend} className="flex border-t p-3">
//           <input
//             type="text"
//             className="flex-1 border rounded-l-lg p-2 focus:outline-none"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask a question..."
//           />
//           <button
//             type="submit"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-r-lg"
//           >
//             Send
//           </button>
//         </form>

//       </div>
//     </div>
//   );
// }

// export default ChatUI;
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Transition } from '@headlessui/react';

function ChatUI() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    setChat(prev => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch('https://care-agent-backend-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...chat
              .filter(msg => msg.text.trim() !== "")
              .map(msg => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text
              })),
            { role: "user", content: message }  // Add current message
          ]
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const botMessage = { sender: "assistant", text: data.reply };
        setChat(prev => [...prev, botMessage]);
      } else {
        console.error("Error:", data.error || data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = { sender: "assistant", text: "Error connecting to server." };
      setChat(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col h-[90vh] w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">

        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-2xl font-semibold text-gray-800">Conversational Support AI</h1>
          <p className="text-sm text-gray-500 mt-2">
            Ask anything about Apple products, services, or your account
          </p>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto space-y-2 p-4">
          {chat.map((msg, idx) => (
            <Transition
              key={idx}
              appear={true}
              show={true}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
            >
              <div className={`text-sm p-2 rounded-md max-w-[80%] ${
                msg.sender === 'user' ? 'bg-blue-100 text-blue-800 self-end' : 'bg-gray-100 text-gray-800 self-start'
              }`}>
                {msg.text}
              </div>
            </Transition>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex items-center space-x-1 justify-center text-gray-500 text-sm mt-2">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-300">.</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input form */}
        <form onSubmit={handleSend} className="flex border-t p-3">
          <input
            type="text"
            className="flex-1 border rounded-l-lg p-2 focus:outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask a question..."
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 rounded-r-lg"
          >
            Send
          </button>
        </form>

      </div>
    </div>
  );
}

export default ChatUI;
