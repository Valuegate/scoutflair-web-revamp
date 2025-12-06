"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Send, 
  Bot, 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Target,
  ChevronRight
} from "lucide-react";

export default function AIAnalystPage() {
  const [query, setQuery] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { role: "ai", message: "Hello Coach. I've analyzed the upcoming match against Lagoon FC. Their defense is weak against counter-attacks on the right flank. How can I help you prepare?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSend = () => {
    if (!query.trim()) return;
    
    // Add user message
    setChatHistory(prev => [...prev, { role: "user", message: query }]);
    
    // Simulate AI response (mock)
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: "ai", 
        message: "Based on our current squad depth and Lagoon FC's defensive patterns, I recommend a 4-3-3 formation to exploit their full-backs. Daniel Okon's pace will be key on the break." 
      }]);
    }, 1000);

    setQuery("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-8rem)] gap-4 md:gap-6 p-4 md:p-0">
      {/* Page Header */}
      <div className="shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="text-blue-600 w-5 h-5 md:w-6 md:h-6" /> AI Analyst
        </h1>
        <p className="text-gray-500 text-xs md:text-sm">Your virtual assistant for tactical insights and data-driven decisions.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-h-0">
        
        {/* LEFT COLUMN: CHAT INTERFACE (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden h-full">
          <div className="p-3 md:p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                <Bot size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">Tactical Assistant</h3>
                <span className="flex items-center gap-1 text-[10px] text-green-600">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                </span>
              </div>
            </div>
            <button 
              onClick={() => setChatHistory([])}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              Clear History
            </button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4">
            {chatHistory.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] md:max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 md:p-4 border-t border-gray-200 bg-white shrink-0">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about tactics, player stats, or opponent analysis..." 
                className="flex-1 border border-gray-300 rounded-lg px-3 md:px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button 
                onClick={handleSend}
                className="bg-[#0A2342] text-white p-2 rounded-lg hover:bg-purple-700 transition-colors shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
            {/* Quick Prompts */}
            <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar touch-pan-x">
              <span className="text-[10px] text-gray-400 whitespace-nowrap self-center hidden md:block">Suggested:</span>
              <button onClick={() => setQuery("Analyze next opponent")} className="text-[10px] px-2 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 whitespace-nowrap">Analyze next opponent</button>
              <button onClick={() => setQuery("Suggest starting XI")} className="text-[10px] px-2 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 whitespace-nowrap">Suggest starting XI</button>
              <button onClick={() => setQuery("Find replacement for #4")} className="text-[10px] px-2 py-1 bg-gray-50 border border-gray-200 rounded-full text-gray-600 hover:bg-gray-100 whitespace-nowrap">Find replacement for #4</button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PROACTIVE INSIGHTS FEED (1/3 width) */}
        <div className="space-y-4 lg:overflow-y-auto lg:pr-1 pb-4 lg:pb-0 h-auto lg:h-full">
          <h3 className="font-bold text-gray-700 text-sm flex items-center gap-2">
            <Sparkles size={16} className="text-blue-500" /> 
            Proactive Insights
          </h3>

          {/* Insight Card 1 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-8 -mt-8 z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Target size={16} className="text-red-500" />
                <h4 className="font-bold text-gray-800 text-sm">Opponent Weakness</h4>
              </div>
              <p className="text-xs text-gray-600 mb-3">
                Lagoon FC has conceded <span className="font-bold">65%</span> of their goals from crosses on the right flank.
              </p>
              <div className="bg-red-50 p-2 rounded-lg border border-red-100">
                <p className="text-[10px] font-semibold text-red-700">AI Recommendation</p>
                <p className="text-[10px] text-red-600">Start <span className="font-bold">Emeka Nwosu</span> (RW) to exploit this weakness.</p>
              </div>
            </div>
          </div>

          {/* Insight Card 2 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-green-500" />
              <h4 className="font-bold text-gray-800 text-sm">Performance Trend</h4>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Your midfield pass completion rate has dropped by <span className="font-bold text-red-500">12%</span> in the last 2 games.
            </p>
            <button className="w-full py-1.5 text-xs font-medium text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 flex items-center justify-center gap-1">
              View Midfield Stats <ChevronRight size={12} />
            </button>
          </div>

          {/* Insight Card 3 */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} className="text-orange-500" />
              <h4 className="font-bold text-gray-800 text-sm">Tactical Warning</h4>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              High defensive line strategy is risky against next opponent's fast counter-attacks (Avg pace: 88).
            </p>
            <div className="flex items-center gap-2 text-[10px] text-gray-500 bg-gray-50 px-2 py-1 rounded">
              <AlertTriangle size={12} className="text-orange-500" />
              <span>Consider dropping line depth by 10m</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}