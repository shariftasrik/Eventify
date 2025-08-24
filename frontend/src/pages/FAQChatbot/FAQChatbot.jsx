import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./FAQChatbot.css";

const FaqChatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! Ask me anything about the club or events." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/faqs/chat", {
        message: input,
      });
      const answers = response.data.answers;

      if (answers && answers.length > 0) {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: answers[0].answer },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: "Sorry, I couldn't find an answer." },
        ]);
      }
    } catch (err) {
      console.error("Error fetching chatbot response:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Oops! Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">FAQ Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${msg.from === "bot" ? "bot" : "user"}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chatbot-message bot typing">Bot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default FaqChatbot;
