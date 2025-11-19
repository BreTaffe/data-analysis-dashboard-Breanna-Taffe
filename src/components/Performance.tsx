import React, { useState, useMemo, Suspense, lazy } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

/**
 * Performance Component - Week 8
 * Demonstrates three key optimization patterns:
 * 1. useMemo - Cache expensive calculations
 * 2. React.memo - Prevent unnecessary re-renders of child components
 * 3. Lazy Loading & Code Splitting - Load components only when needed
 */

/**
 * PATTERN 1: useMemo - Expensive Calculation
 * Without useMemo: slowDouble runs on every render
 * With useMemo: slowDouble only runs when 'num' changes
 */
interface ExpensiveComponentProps {
  num: number;
}

const ExpensiveComponent: React.FC<ExpensiveComponentProps> = ({ num }) => {
  function slowDouble(n: number): number {
    // Simulate expensive calculation
    console.log('🔄 Computing slowDouble for:', n);
    for (let i = 0; i < 1e8; i++) {
      // Heavy computation
    }
    return n * 2;
  }

  // ✅ Optimized with useMemo - only recalculates when 'num' changes
  const doubled = useMemo(() => slowDouble(num), [num]);

  return (
    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
      <h4 className="font-semibold text-blue-900">useMemo Optimization</h4>
      <p className="text-sm text-gray-600 mt-2">Input: {num}</p>
      <p className="text-lg font-bold text-blue-600 mt-1">Result: {doubled}</p>
      <p className="text-xs text-gray-500 mt-2">
        💡 Check console: slowDouble only logs when input changes, not on every render
      </p>
    </div>
  );
};

/**
 * PATTERN 2: React.memo - Prevent Re-renders of Child Components
 * ListItem will ONLY re-render if its 'value' prop changes
 */
interface ListItemProps {
  value: string;
}

const ListItem = React.memo(function ListItem({ value }: ListItemProps) {
  console.log('📝 Rendering ListItem:', value);
  return (
    <li className="p-3 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
      {value}
    </li>
  );
});

interface MemoListProps {
  items: string[];
}

const MemoList: React.FC<MemoListProps> = ({ items }) => {
  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <ListItem key={idx} value={item} />
      ))}
    </ul>
  );
};

/**
 * PATTERN 3: Lazy Loading & Suspense
 * The ChartComponentLazy is only loaded when needed (not on initial page load)
 * This reduces initial bundle size and improves first-page load
 */
const ChartComponentLazy = lazy(() => {
  // Simulate network delay for lazy-loaded component
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(
        import('./SimpleChart').then(module => ({
          default: () => (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900">Lazy-Loaded Chart</h4>
              <p className="text-sm text-gray-600 mt-2">
                This component was only loaded when you clicked "Show Lazy Component"
              </p>
              <p className="text-xs text-gray-500 mt-2">
                🚀 This reduces your initial app bundle size!
              </p>
            </div>
          ),
        }))
      );
    }, 800);
  });
});

/**
 * Virtual Scrolling Example
 * For very large datasets, render only visible items
 */
interface VirtualScrollExampleProps {
  dataSize?: number;
}

const VirtualScrollExample: React.FC<VirtualScrollExampleProps> = ({ dataSize = 1000 }) => {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 });
  const itemHeight = 50;
  const containerHeight = 400;

  const data = useMemo(() => {
    // Generate sample data only once
    return Array.from({ length: dataSize }, (_, i) => ({
      id: i,
      name: `Item ${i + 1}`,
      value: Math.random() * 1000,
    }));
  }, [dataSize]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = (e.currentTarget as HTMLDivElement).scrollTop;
    const start = Math.floor(scrollTop / itemHeight);
    const end = start + Math.ceil(containerHeight / itemHeight) + 1;
    setVisibleRange({ start, end });
  };

  const visibleItems = data.slice(visibleRange.start, visibleRange.end);

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        Virtual Scroll Example: {dataSize.toLocaleString()} items total, showing {visibleItems.length} visible
      </p>
      <div
        className="border rounded-lg overflow-y-auto bg-white"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        {/* Spacer for items above viewport */}
        <div style={{ height: visibleRange.start * itemHeight }} />

        {/* Visible items */}
        {visibleItems.map(item => (
          <div
            key={item.id}
            className="border-b p-3 h-12 flex items-center hover:bg-gray-50"
            style={{ height: itemHeight }}
          >
            <span className="text-sm font-medium text-gray-700">
              {item.name} - ${item.value.toFixed(2)}
            </span>
          </div>
        ))}

        {/* Spacer for items below viewport */}
        <div style={{ height: Math.max(0, (dataSize - visibleRange.end) * itemHeight) }} />
      </div>
    </div>
  );
};

/**
 * Main Performance Demo Component
 */
export const Performance: React.FC = () => {
  const [memoNum, setMemoNum] = useState(5);
  const [listItems, setListItems] = useState(['React', 'TypeScript', 'Tailwind', 'Vite']);
  const [showLazy, setShowLazy] = useState(false);

  const memoizedItems = useMemo(() => listItems, [listItems]);

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🚀 Performance Optimization</h2>
        <p className="text-gray-600">
          Learn three essential React patterns to make your app faster and more efficient.
        </p>
      </Card>

      {/* PATTERN 1: useMemo */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">1️⃣ useMemo - Cache Calculations</h3>
        <p className="text-sm text-gray-600 mb-4">
          Use <code className="bg-gray-100 px-2 py-1 rounded">useMemo</code> to cache expensive computations.
          The calculation only re-runs when dependencies change.
        </p>

        <ExpensiveComponent num={memoNum} />

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => setMemoNum(memoNum + 1)}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Increase Number
          </Button>
          <Button
            onClick={() => setMemoNum(memoNum - 1)}
            className="bg-gray-400 hover:bg-gray-500"
          >
            Decrease Number
          </Button>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 font-mono">
          <p>💻 Code Pattern:</p>
          <pre>{`const result = useMemo(
  () => expensiveCalculation(num),
  [num] // Only recalculate when num changes
);`}</pre>
        </div>
      </Card>

      {/* PATTERN 2: React.memo */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">2️⃣ React.memo - Prevent Re-renders</h3>
        <p className="text-sm text-gray-600 mb-4">
          Wrap components with <code className="bg-gray-100 px-2 py-1 rounded">React.memo</code> to prevent
          re-renders when props haven't changed. Check console to see when items actually re-render.
        </p>

        <MemoList items={memoizedItems} />

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => setListItems([...listItems, `Tech ${listItems.length + 1}`])}
            className="bg-green-500 hover:bg-green-600"
          >
            Add Item
          </Button>
          <Button
            onClick={() => setListItems(listItems.slice(0, -1))}
            className="bg-red-500 hover:bg-red-600"
            disabled={listItems.length === 0}
          >
            Remove Item
          </Button>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 font-mono">
          <p>💻 Code Pattern:</p>
          <pre>{`const ListItem = React.memo(
  function ListItem({ value }) {
    return <li>{value}</li>;
  }
);
// Re-renders only when value prop changes`}</pre>
        </div>
      </Card>

      {/* PATTERN 3: Lazy Loading */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">3️⃣ Lazy Loading & Code Splitting</h3>
        <p className="text-sm text-gray-600 mb-4">
          Use <code className="bg-gray-100 px-2 py-1 rounded">React.lazy</code> and{' '}
          <code className="bg-gray-100 px-2 py-1 rounded">Suspense</code> to load components only when needed.
          This reduces initial bundle size.
        </p>

        {showLazy ? (
          <Suspense fallback={<div className="animate-pulse bg-gray-300 h-20 rounded">Loading component...</div>}>
            <ChartComponentLazy />
          </Suspense>
        ) : (
          <div className="p-4 bg-gray-100 rounded text-center text-gray-600">
            Component not loaded yet (not in DOM)
          </div>
        )}

        <div className="mt-4">
          <Button
            onClick={() => setShowLazy(!showLazy)}
            className="bg-purple-500 hover:bg-purple-600"
          >
            {showLazy ? 'Hide' : 'Show'} Lazy Component
          </Button>
        </div>

        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 font-mono">
          <p>💻 Code Pattern:</p>
          <pre>{`const LazyComponent = React.lazy(
  () => import('./HeavyComponent')
);

// Usage:
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>`}</pre>
        </div>
      </Card>

      {/* Virtual Scrolling */}
      <Card className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">4️⃣ Virtual Scrolling - Large Lists</h3>
        <p className="text-sm text-gray-600 mb-4">
          For very large datasets, only render visible items. This keeps performance smooth even with
          thousands of items.
        </p>

        <VirtualScrollExample dataSize={1000} />

        <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-700 font-mono">
          <p>💻 Pattern: Calculate visible range based on scroll position, render only those items.</p>
        </div>
      </Card>

      {/* Summary */}
      <Card className="p-6 bg-green-50 border-green-200">
        <h3 className="text-lg font-bold text-green-900 mb-2">✅ Performance Checklist</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>✓ Use <code className="bg-green-100 px-1 rounded">useMemo</code> for expensive calculations</li>
          <li>✓ Wrap list items with <code className="bg-green-100 px-1 rounded">React.memo</code></li>
          <li>✓ Lazy load heavy components with <code className="bg-green-100 px-1 rounded">React.lazy</code></li>
          <li>✓ Use virtual scrolling for lists with 100+ items</li>
          <li>✓ Profile with React DevTools Profiler</li>
        </ul>
      </Card>
    </div>
  );
};

export default Performance;