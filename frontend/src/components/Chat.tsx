// import { useState } from "react";

// interface ChatResponse {
//   response: string;
//   error?: string;
// }

// const ChatComponent: React.FC = () => {
//   const [message, setMessage] = useState<string>("");
//   const [response, setResponse] = useState<string>("");

//   const sendMessage = async () => {
//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });

//       const data: ChatResponse = await res.json();

//       if (!res.ok) {
//         throw new Error(data.error || "Failed to process message");
//       }

//       setResponse(data.response);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       setResponse("Error sending message");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendMessage}>Send</button>
//       <div>Response: {response}</div>
//     </div>
//   );
// };

// export default ChatComponent;
