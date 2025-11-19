import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send, Loader } from "lucide-react";

interface Message {
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const mockAIResponse = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerQuestion = question.toLowerCase();
      
      if (lowerQuestion.includes('average') || lowerQuestion.includes('mean')) {
        resolve('The average value in your dataset is 78.3. This represents the central tendency of your data.');
      } else if (lowerQuestion.includes('trend')) {
        resolve('There is a positive trend in your data. Values are generally increasing over time.');
      } else if (lowerQuestion.includes('max') || lowerQuestion.includes('maximum')) {
        resolve('The maximum value in your dataset is 96. This is the highest data point recorded.');
      } else if (lowerQuestion.includes('min') || lowerQuestion.includes('minimum')) {
        resolve('The minimum value in your dataset is 42. This is the lowest data point recorded.');
      } else if (lowerQuestion.includes('count') || lowerQuestion.includes('how many')) {
        resolve('There are 150 data points in your dataset.');
      } else if (lowerQuestion.includes('help') || lowerQuestion.includes('?')) {
        resolve('I can help you analyze your data! Try asking about:\n- Average or mean values\n- Trends in your data\n- Maximum or minimum values\n- Count of data points\n- Statistical insights');
      } else {
        resolve("That's an interesting question about your data! Could you be more specific? Try asking about average, trend, max, min, or count.");
      }
    }, 1000); // 1 second delay for realistic feel
  });
};

const MockAIChatSolution = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'ai',
      content: '👋 Hello! I\'m your AI data assistant. Ask me anything about your dataset. Try asking about averages, trends, maximums, minimums, or data count!',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const aiReply = await mockAIResponse(input);
      const aiMessage: Message = {
        type: 'ai',
        content: aiReply,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error('Error:', err);
      const errorMessage: Message = {
        type: 'ai',
        content: 'Sorry, I encountered an error processing your question. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🤖 AI Data Assistant
          <span className="text-xs font-normal text-gray-600 ml-auto">Week 7 Demo</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chat Messages Container */}
        <div className="h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white border border-gray-300 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap break-words">
                  {msg.content}
                </p>
                <span className="text-xs opacity-70 mt-1 block">
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-300 text-gray-800 px-4 py-2 rounded-lg rounded-bl-none">
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span className="text-sm">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me about your data... (press Enter to send)"
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-4"
          >
            {loading ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Info Section */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p className="font-semibold mb-1">💡 Learning Objectives</p>
          <ul className="text-xs space-y-1 list-disc list-inside">
            <li>State management with arrays (messages)</li>
            <li>Async/await for simulated API calls</li>
            <li>Conditional rendering based on message type</li>
            <li>Event handling (Enter key, button click)</li>
            <li>Type guards and discriminated unions</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockAIChatSolution;