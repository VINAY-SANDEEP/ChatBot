'use client';

import React, { useState, useRef, useEffect } from 'react';
import students from '../data/students.json';
import StudentCard from './StudentCard';

const ChatBot = () => {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState('');
  const [student, setStudent] = useState(null);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '👋 Hi! Please enter your roll number to begin:', time: new Date() }
  ]);
  const [botTyping, setBotTyping] = useState(false);
  const [exited, setExited] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, botTyping]);

  const addMessage = (from, text) => {
    setMessages((prev) => [...prev, { from, text, time: new Date() }]);
  };

  const handleSubmit = () => {
    if (!input.trim()) return;

    addMessage('user', input.trim());

    setBotTyping(true);
    setTimeout(() => {
      setBotTyping(false);

      if (step === 1) {
        const found = students.find(
          (s) => s.roll_number.toLowerCase() === input.trim().toLowerCase()
        );
        if (found) {
          setStudent(found);
          setStep(2);
          addMessage('bot', `Is your name **${found.Name}**? Please type "yes" to confirm.`);
        } else {
          addMessage('bot', '❌ Roll number not found. Please try again.');
        }
      } else if (step === 2) {
        if (input.trim().toLowerCase() === 'yes') {
          setStep(4);
          addMessage('bot', `✅ Verification successful! Here is your information for **${student.Name}**:`);

          setTimeout(() => {
            addMessage('bot', 'Do you want to enter another student data? (yes/no)');
            setStep(5);
          }, 9000);
        } else {
          setStudent(null);
          setStep(1);
          addMessage('bot', '❌ Confirmation failed. Please enter your roll number again:');
        }
      } else if (step === 5) {
        if (input.trim().toLowerCase() === 'yes') {
          setStudent(null);
          setStep(1);
          addMessage('bot', '👋 Please enter the next student\'s roll number to begin:');
        } else {
          addMessage('bot', '🙏 Thank you for using MyApp. Goodbye!');
          setExited(true);
        }
      }
    }, 1000);

    setInput('');
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col max-w-md mx-auto h-[90vh] bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 rounded-2xl shadow-2xl overflow-hidden">
      <header className="bg-white/95 backdrop-blur-md px-6 py-5 flex items-center justify-between border-b border-indigo-300">
        <h2 className="text-2xl font-bold text-indigo-800 tracking-wide">Student Verification Bot</h2>
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-extrabold select-none shadow-lg">
          🎓
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto flex flex-col space-y-3 bg-white/90">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-6 py-3 rounded-3xl relative 
              ${
                msg.from === 'bot'
                  ? 'self-start bg-indigo-50 text-indigo-900 shadow-md'
                  : 'self-end bg-indigo-600 text-white shadow-xl'
              }
              `}
            style={{ animation: 'fadeIn 0.3s ease forwards' }}
          >
            <span
              className={`absolute bottom-0 ${
                msg.from === 'bot' ? '-left-3' : '-right-3'
              } w-4 h-4 bg-transparent`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={msg.from === 'bot' ? 'text-indigo-50' : 'text-indigo-600'}
                style={{ filter: 'drop-shadow(0 0 1px rgba(0,0,0,0.05))' }}
              >
                <path
                  d={msg.from === 'bot' ? 'M20 0L0 20V0H20Z' : 'M0 0L20 20V0H0Z'}
                  fill={msg.from === 'bot' ? '#E0E7FF' : '#4F46E5'}
                />
              </svg>
            </span>
            {msg.from === 'bot' ? (
              <p
                className="whitespace-pre-wrap break-words font-medium"
                dangerouslySetInnerHTML={{
                  __html: msg.text.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
                }}
              />
            ) : (
              <p>{msg.text}</p>
            )}
            <span
              className={`block mt-1 text-xs opacity-60 font-mono ${
                msg.from === 'bot' ? 'text-indigo-700' : 'text-indigo-300'
              }`}
            >
              {formatTime(msg.time)}
            </span>
          </div>
        ))}

        {botTyping && (
          <div className="self-start max-w-[30%] px-4 py-2 bg-indigo-100 text-indigo-700 rounded-2xl shadow-md italic font-semibold animate-pulse select-none">
            Bot is typing...
          </div>
        )}

        {step === 4 && student && (
          <div className="self-start w-full mt-6">
            <StudentCard student={student} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* Show input form only if not exited and step not 4 (since at 4 we show info and then move to 5) */}
      {!exited && step !== 4 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="bg-white/95 backdrop-blur-md px-6 py-4 flex items-center gap-4 border-t border-indigo-300 shadow-inner"
        >
          <input
            type="text"
            autoFocus
            className="flex-grow px-5 py-3 rounded-full border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-black-500 focus:border-indigo-500 placeholder:text-black-400 transition text-black"
            placeholder={
              step === 1
                ? 'Type your roll number...'
                : step === 2
                ? 'Type "yes" to confirm...'
                : step === 5
                ? 'Type "yes" or "no"...'
                : ''
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-transform active:scale-95"
          >
            Send
          </button>
        </form>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
export default ChatBot;
