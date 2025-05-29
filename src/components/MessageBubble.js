export default function MessageBubble({ text, isUser }) {
  return (
    <div className={`my-2 ${isUser ? "text-right" : "text-left"}`}>
      <div className={`inline-block px-4 py-2 rounded-xl ${isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
        {text}
      </div>
    </div>
  );
}
