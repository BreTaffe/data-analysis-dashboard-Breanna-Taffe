import React from 'react';

/**
 * SkeletonLoader Component
 * Reusable skeleton/placeholder UI for loading states
 * Uses Tailwind's animate-pulse for smooth visual feedback
 */

interface SkeletonRowProps {
  count?: number;
  width?: string;
}

export const SkeletonRow: React.FC<SkeletonRowProps> = ({ count = 1, width = 'w-full' }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`animate-pulse bg-gray-300 h-6 ${width} rounded mb-3`}
        aria-hidden="true"
      />
    ))}
  </>
);

interface SkeletonCardProps {
  count?: number;
}

export const SkeletonCard: React.FC<SkeletonCardProps> = ({ count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse border rounded-lg p-4 mb-4 bg-white">
        <div className="bg-gray-300 h-6 w-2/3 rounded mb-3" aria-hidden="true" />
        <div className="bg-gray-300 h-4 w-full rounded mb-2" aria-hidden="true" />
        <div className="bg-gray-300 h-4 w-5/6 rounded mb-2" aria-hidden="true" />
        <div className="bg-gray-300 h-4 w-4/5 rounded" aria-hidden="true" />
      </div>
    ))}
  </>
);

interface SkeletonTableProps {
  rows?: number;
  cols?: number;
}

export const SkeletonTable: React.FC<SkeletonTableProps> = ({ rows = 5, cols = 4 }) => (
  <div className="animate-pulse border rounded-lg overflow-hidden">
    {/* Header */}
    <div className="flex bg-gray-100 border-b">
      {Array.from({ length: cols }).map((_, i) => (
        <div key={i} className="flex-1 p-3 bg-gray-300 h-10 rounded" aria-hidden="true" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIdx) => (
      <div key={rowIdx} className="flex border-b">
        {Array.from({ length: cols }).map((_, colIdx) => (
          <div
            key={colIdx}
            className="flex-1 p-3 bg-gray-200 h-8 rounded"
            aria-hidden="true"
          />
        ))}
      </div>
    ))}
  </div>
);

interface SkeletonAvatarProps {
  count?: number;
}

export const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({ count = 3 }) => (
  <div className="flex gap-4">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="animate-pulse flex items-center gap-3">
        <div className="bg-gray-300 h-12 w-12 rounded-full" aria-hidden="true" />
        <div className="flex-1">
          <div className="bg-gray-300 h-4 w-32 rounded mb-2" aria-hidden="true" />
          <div className="bg-gray-300 h-3 w-24 rounded" aria-hidden="true" />
        </div>
      </div>
    ))}
  </div>
);

interface SkeletonChartProps {
  height?: string;
}

export const SkeletonChart: React.FC<SkeletonChartProps> = ({ height = 'h-64' }) => (
  <div className={`animate-pulse bg-gray-200 ${height} rounded-lg p-4`} aria-hidden="true">
    <div className="bg-gray-300 h-6 w-1/4 rounded mb-4" />
    <div className="flex items-end gap-2 h-40">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-gray-300 rounded"
          style={{ height: `${Math.random() * 100 + 20}%` }}
          aria-hidden="true"
        />
      ))}
    </div>
  </div>
);

/**
 * Generic DemoList Loader
 * Shows skeleton rows matching the structure of the real list
 */
export const DemoList: React.FC<{
  items?: string[];
  isLoading?: boolean;
}> = ({ items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'], isLoading = false }) => {
  const [loading, setLoading] = React.useState(isLoading);
  const [data, setData] = React.useState<string[]>([]);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(items);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [items]);

  if (loading) {
    return (
      <ul aria-busy="true" aria-label="Loading list" className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="animate-pulse bg-gray-300 h-8 rounded"
            aria-hidden="true"
          />
        ))}
      </ul>
    );
  }

  return (
    <ul aria-label="Loaded list" className="space-y-2">
      {data.map((item, idx) => (
        <li
          key={idx}
          className="p-2 bg-white border rounded hover:bg-blue-50 focus:outline focus:ring-2 focus:ring-blue-500 cursor-pointer"
          tabIndex={0}
          aria-label={`Item: ${item}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default {
  SkeletonRow,
  SkeletonCard,
  SkeletonTable,
  SkeletonAvatar,
  SkeletonChart,
  DemoList,
};
