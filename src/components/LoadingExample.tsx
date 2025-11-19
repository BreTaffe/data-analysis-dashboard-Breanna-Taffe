import React, { useEffect, useState } from 'react';
import { SkeletonRow, SkeletonCard } from './SkeletonLoader';
import { Card } from './ui/card';

/**
 * LoadingExample Component
 * Demonstrates skeleton loading pattern for better perceived performance
 * Instead of showing "Loading..." text, displays skeleton UI that matches real content shape
 */

function LoadingExample() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setData('Your data has been successfully loaded from the API!');
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card className="p-6 max-w-md mx-auto">
        <div className="space-y-4">
          {/* Title skeleton */}
          <div className="animate-pulse bg-gray-300 h-6 w-1/3 rounded" aria-hidden="true" />
          {/* Content skeleton rows */}
          <div className="space-y-2">
            <SkeletonRow count={3} />
          </div>
          {/* Button skeleton */}
          <div className="animate-pulse bg-gray-300 h-10 w-24 rounded" aria-hidden="true" />
        </div>
        <div className="mt-4 text-sm text-gray-500 animate-pulse" role="status" aria-live="polite">
          Loading data...
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Data Loaded Successfully!</h2>
      <p className="text-gray-700 mb-4">{data}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        aria-label="Reload data"
        onClick={() => {
          setLoading(true);
          const timer = setTimeout(() => {
            setData('Data reloaded at ' + new Date().toLocaleTimeString());
            setLoading(false);
          }, 2000);
          return () => clearTimeout(timer);
        }}
      >
        Reload Data
      </button>
    </Card>
  );
}

export default LoadingExample;
