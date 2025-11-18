// ==========================================
// 🔧 WEEK 2: UploadProgressSimulator.tsx
// ==========================================
// This is an interactive component that simulates file upload progress
// with realistic animation and state management!

import { useState, useRef } from 'react';

const UploadProgressSimulator = () => {
  // 🧠 State variables - your component's memory
  const [progress, setProgress] = useState(0);        // Tracks progress percentage (0-100)
  const [isUploading, setIsUploading] = useState(false); // Tracks if upload is in progress
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Reference to clear interval later

  // 🔄 Event handler functions - what happens when buttons are clicked
  const startUpload = () => {
    setIsUploading(true);
    setProgress(0);
    
    // Simulate upload progress with intervals
    intervalRef.current = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 15 + 5; // Random chunks (5-20%)
        
        // Complete upload when we reach 100%
        if (newProgress >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setIsUploading(false);
          return 100;
        }
        
        return newProgress;
      });
    }, 300); // Update every 300ms for smooth animation
  };

  const resetProgress = () => {
    // Clear any running interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setProgress(0);
    setIsUploading(false);
  };

  const addProgress = () => {
    // Add 25% to current progress (max 100%)
    setProgress(prev => Math.min(prev + 25, 100));
    if (progress + 25 >= 100) {
      setIsUploading(false);
    }
  };

  return (
    <div className="progress-container p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">File Upload Simulator</h2>
      
      {/* 📊 Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 📈 Progress Display */}
      <div className="text-center mb-6">
        <span className="text-3xl font-bold text-blue-600">{Math.round(progress)}%</span>
        <div className="text-sm text-gray-600 mt-2">
          {isUploading && "📤 Uploading file..."}
          {!isUploading && progress === 0 && "📁 Ready to upload"}
          {!isUploading && progress > 0 && progress < 100 && "⏸️ Upload paused"}
          {!isUploading && progress === 100 && "✅ Upload complete!"}
        </div>
      </div>

      {/* 🎮 Control Buttons */}
      <div className="flex justify-center gap-3">
        <button 
          onClick={startUpload}
          disabled={isUploading || progress === 100}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          {isUploading ? 'Uploading...' : 'Start Upload'}
        </button>
        
        <button 
          onClick={addProgress}
          disabled={isUploading || progress >= 100}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-gray-400"
        >
          +25%
        </button>
        
        <button 
          onClick={resetProgress}
          disabled={isUploading}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:bg-gray-400"
        >
          Reset
        </button>
      </div>

      {/* 🎉 Fun progress messages */}
      <div className="text-center mt-4 text-sm text-gray-600">
        {progress === 0 && "Click 'Start Upload' to begin the simulation!"}
        {progress > 0 && progress <= 25 && "📦 Just getting started..."}
        {progress > 25 && progress <= 50 && "📦📦 You're doing great!"}
        {progress > 50 && progress < 100 && "📦📦📦 Almost there!"}
        {progress === 100 && "🎉 Perfect! Ready for another file?"}
      </div>
    </div>
  );
};

export default UploadProgressSimulator;

// 📝 This component demonstrates:
// 🎯 useState for managing progress and upload state
// 🎯 useRef for storing the interval ID to clean it up later
// 🎯 Event handlers for button clicks
// 🎯 Conditional rendering based on state values
// 🎯 setProgress with prevProgress pattern for accurate updates
