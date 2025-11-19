import MockAIChatSolution from '@/components/MockAIChatSolution';

const Week7AIChatDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🤖 Week 7: AI Chat Interface
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Simple AI Chat Solution
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            This is a beginner-friendly example showing how to build a chat interface with async/await, state management, and mock AI responses.
          </p>
        </div>

        <MockAIChatSolution />

        {/* Learning Notes */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="font-semibold text-lg mb-3">📖 Key Concepts</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li className="flex gap-2"><span>✓</span> State management with arrays</li>
              <li className="flex gap-2"><span>✓</span> Async/await pattern</li>
              <li className="flex gap-2"><span>✓</span> Conditional rendering</li>
              <li className="flex gap-2"><span>✓</span> Event handling (Enter key)</li>
              <li className="flex gap-2"><span>✓</span> Loading states</li>
              <li className="flex gap-2"><span>✓</span> Error handling</li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <h3 className="font-semibold text-lg mb-3">💬 Try Asking About</h3>
            <ul className="text-sm space-y-2 text-gray-700">
              <li>📊 <strong>Average</strong> - Get mean value stats</li>
              <li>📈 <strong>Trend</strong> - See data patterns</li>
              <li>📍 <strong>Maximum</strong> - Find highest values</li>
              <li>📍 <strong>Minimum</strong> - Find lowest values</li>
              <li>🔢 <strong>Count</strong> - Get data point count</li>
              <li>❓ <strong>Help</strong> - Get suggestions</li>
            </ul>
          </div>
        </div>

        {/* Code Structure */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">🔍 Code Structure</h3>
          <pre className="bg-white p-4 rounded overflow-x-auto text-xs text-gray-800">
{`interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const [messages, setMessages] = useState<Message[]>([]);
const [loading, setLoading] = useState(false);

const mockAIResponse = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Process question and return response
      resolve(aiResponse);
    }, 1000);
  });
};`}
          </pre>
        </div>

        {/* What You're Learning */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">💡 What You're Learning</h3>
          <p className="text-sm text-gray-700 mb-3">
            This chat component demonstrates fundamental React patterns used in real-world applications:
          </p>
          <ul className="text-sm space-y-2 text-gray-700 list-disc list-inside">
            <li><strong>Message Array Pattern:</strong> Store messages as objects with type, content, and metadata</li>
            <li><strong>Async/Await:</strong> Handle long-running operations (API calls, delays) gracefully</li>
            <li><strong>Loading States:</strong> Provide user feedback while waiting for responses</li>
            <li><strong>Discriminated Unions:</strong> Use type property to distinguish message sources</li>
            <li><strong>Enter Key Handling:</strong> Improve UX with keyboard shortcuts</li>
            <li><strong>TypeScript Types:</strong> Define Message interface for type safety</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Week7AIChatDemo;
