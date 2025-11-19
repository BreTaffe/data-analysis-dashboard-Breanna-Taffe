import React, { useState } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';
import { BrokenNullProperty, BrokenArrayOutOfBounds, BrokenFailedFetch } from '@/components/broken/BrokenExamples';
import LoadingExample from '@/components/LoadingExample';
import { SkeletonRow, SkeletonCard, SkeletonTable, SkeletonAvatar } from '@/components/SkeletonLoader';
import { Performance } from '@/components/Performance';
import { AccessibilityDemo } from '@/components/AccessibilityDemo';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * Week 8 Live Session: Polish & Performance
 * 
 * This page demonstrates:
 * 1. Error Boundaries - Graceful error handling
 * 2. Loading States - Skeleton screens and loading UX
 * 3. Performance - Memoization, lazy loading, virtual scrolling
 * 4. Accessibility - Keyboard navigation, ARIA, semantic HTML
 */

export const Week8Live: React.FC = () => {
  const [showBrokenComponent, setShowBrokenComponent] = useState<string | null>(null);
  const [showErrorBoundary, setShowErrorBoundary] = useState(false);

  const BrokenComponent: React.FC = () => {
    switch (showBrokenComponent) {
      case 'null-property':
        return <BrokenNullProperty />;
      case 'array-bounds':
        return <BrokenArrayOutOfBounds />;
      case 'fetch-error':
        return <BrokenFailedFetch />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Week 8: Polish & Performance</h1>
          <p className="text-gray-600">
            Learn professional React patterns for error handling, performance optimization, and accessibility.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="error-boundaries" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="error-boundaries">Error Boundaries</TabsTrigger>
            <TabsTrigger value="loading">Loading States</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          </TabsList>

          {/* Tab 1: Error Boundaries */}
          <TabsContent value="error-boundaries" className="space-y-6">
            <Card className="p-6 bg-red-50 border-red-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">🛡️ Error Boundaries</h2>
              <p className="text-gray-600">
                Error boundaries catch JavaScript errors in child components and prevent your entire app from
                crashing. Learn to use them strategically.
              </p>
            </Card>

            {/* Learning Section */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">What is an Error Boundary?</h3>
              <div className="space-y-4 text-gray-700">
                <p>
                  An error boundary is a React component that catches JavaScript errors anywhere in the child
                  component tree, logs those errors, and displays a fallback UI instead of crashing the whole app.
                </p>
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="font-semibold text-yellow-900">⚠️ Errors that DO get caught:</p>
                  <ul className="mt-2 space-y-1 text-sm text-yellow-800">
                    <li>• Render errors (e.g., accessing null.property)</li>
                    <li>• Lifecycle method errors</li>
                    <li>• Errors in component constructors</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-blue-900">ℹ️ Errors that DON'T get caught:</p>
                  <ul className="mt-2 space-y-1 text-sm text-blue-800">
                    <li>• Event handler errors (use try/catch instead)</li>
                    <li>• Async errors (setTimeout, promises)</li>
                    <li>• Server-side rendering errors</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Implementation Section */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Class-Based Error Boundary</h3>
              <code className="block bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono mb-4">
                {`import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) { 
    super(props); 
    this.state = { hasError: false }; 
  }
  
  static getDerivedStateFromError(error) { 
    return { hasError: true }; 
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;`}
              </code>
              <p className="text-sm text-gray-600">
                The error boundary catches errors in its children and displays a fallback UI.
              </p>
            </Card>

            {/* Interactive Demo */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">🧪 Interactive Demo</h3>
              <p className="text-gray-600 mb-4">
                Click a button to render a broken component, then see how the error boundary catches it.
              </p>

              <div className="grid md:grid-cols-3 gap-3 mb-6">
                <Button
                  onClick={() => {
                    setShowBrokenComponent('null-property');
                    setShowErrorBoundary(true);
                  }}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Null Property Error
                </Button>
                <Button
                  onClick={() => {
                    setShowBrokenComponent('array-bounds');
                    setShowErrorBoundary(true);
                  }}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Array Out of Bounds
                </Button>
                <Button
                  onClick={() => {
                    setShowBrokenComponent('fetch-error');
                    setShowErrorBoundary(true);
                  }}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Failed Fetch
                </Button>
              </div>

              <Button
                onClick={() => {
                  setShowBrokenComponent(null);
                  setShowErrorBoundary(false);
                }}
                className="bg-gray-600 hover:bg-gray-700"
              >
                Clear Error
              </Button>

              {showErrorBoundary && (
                <div className="mt-6 p-4 border-2 border-red-300 rounded-lg bg-red-50">
                  <h4 className="font-bold text-red-900 mb-3">Wrapped in ErrorBoundary:</h4>
                  <ErrorBoundary>
                    <BrokenComponent />
                  </ErrorBoundary>
                </div>
              )}

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900">
                  <strong>✅ Notice:</strong> The error was caught and the app didn't crash! Only the error
                  boundary component shows the fallback message. Everything else continues to work.
                </p>
              </div>
            </Card>

            {/* Best Practices */}
            <Card className="p-6 bg-green-50 border-green-200">
              <h3 className="text-lg font-bold text-green-900 mb-3">📋 When to Use Error Boundaries</h3>
              <ul className="space-y-2 text-sm text-green-800">
                <li>✓ Wrap entire pages/routes to catch component tree errors</li>
                <li>✓ Wrap third-party components you don't trust</li>
                <li>✓ Wrap data visualization components (charts, complex renders)</li>
                <li>✗ Don't use for event handler errors (use try/catch instead)</li>
                <li>✗ Don't use for API call errors (handle in useEffect/catch blocks)</li>
              </ul>
            </Card>
          </TabsContent>

          {/* Tab 2: Loading States */}
          <TabsContent value="loading" className="space-y-6">
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">⏳ Loading States & Skeletons</h2>
              <p className="text-gray-600">
                Improve perceived performance by showing users what's coming instead of a generic spinner.
              </p>
            </Card>

            {/* Concept */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Why Skeleton Screens?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <p className="font-semibold text-red-900 mb-2">❌ Old Way (Spinner)</p>
                  <div className="animate-spin h-12 w-12 border-4 border-red-300 border-t-red-600 rounded-full" />
                  <p className="text-sm text-red-800 mt-3">Generic spinner - users don't know what's loading</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="font-semibold text-green-900 mb-2">✅ New Way (Skeleton)</p>
                  <div className="space-y-2">
                    <div className="animate-pulse bg-gray-300 h-6 w-32 rounded" />
                    <div className="animate-pulse bg-gray-300 h-4 w-full rounded" />
                    <div className="animate-pulse bg-gray-300 h-4 w-5/6 rounded" />
                  </div>
                  <p className="text-sm text-green-800 mt-3">
                    Skeleton shows layout - users know what to expect
                  </p>
                </div>
              </div>
            </Card>

            {/* Skeleton Examples */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Skeleton Patterns</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Text Rows (for lists)</h4>
                  <div className="space-y-2">
                    <SkeletonRow count={3} />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Cards (for grid layouts)</h4>
                  <SkeletonCard count={2} />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Table (for data)</h4>
                  <SkeletonTable rows={4} cols={4} />
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Avatar + Text (for profiles)</h4>
                  <SkeletonAvatar count={2} />
                </div>
              </div>
            </Card>

            {/* Real Example */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Real Loading Component</h3>
              <LoadingExample />
            </Card>

            {/* Code Example */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Implementation Pattern</h3>
              <code className="block bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                {`function DataComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(data => {
      setData(data);
      setLoading(false);
    });
  }, []);

  // Show skeleton while loading
  if (loading) {
    return <SkeletonCard count={3} />;
  }

  // Show real content when done
  return <Card data={data} />;
}`}
              </code>
            </Card>

            {/* Tips */}
            <Card className="p-6 bg-yellow-50 border-yellow-200">
              <h3 className="text-lg font-bold text-yellow-900 mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>
                  ✓ Match skeleton shape to real content (avatar, text widths, button shapes)
                </li>
                <li>
                  ✓ Use <code className="bg-yellow-100 px-1 rounded">animate-pulse</code> for visual feedback
                </li>
                <li>
                  ✓ Keep skeleton duration consistent (usually 1-3 seconds)
                </li>
                <li>
                  ✓ Never show skeletons longer than actual load time
                </li>
              </ul>
            </Card>
          </TabsContent>

          {/* Tab 3: Performance */}
          <TabsContent value="performance">
            <Performance />
          </TabsContent>

          {/* Tab 4: Accessibility */}
          <TabsContent value="accessibility">
            <AccessibilityDemo />
          </TabsContent>
        </Tabs>

        {/* Summary Section */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">✅ Week 8 Checklist</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-700 mb-2">Error Boundaries</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Catch render errors with class component</li>
                <li>✓ Wrap specific component trees</li>
                <li>✓ Show helpful fallback UI</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-700 mb-2">Loading UX</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Replace spinners with skeletons</li>
                <li>✓ Match skeleton to real content</li>
                <li>✓ Use animate-pulse for feedback</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-700 mb-2">Performance</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Memoize expensive calculations</li>
                <li>✓ Lazy load heavy components</li>
                <li>✓ Use virtual scrolling for big lists</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-gray-700 mb-2">Accessibility</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>✓ Use semantic HTML</li>
                <li>✓ Keyboard navigation works</li>
                <li>✓ Screen reader support</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Homework */}
        <Card className="mt-6 p-6 bg-orange-50 border-orange-200">
          <h2 className="text-xl font-bold text-orange-900 mb-3">📝 Homework Assignment</h2>
          <div className="space-y-3 text-orange-800">
            <p className="font-semibold">Pick at least 2 of the following:</p>
            <ol className="space-y-2 text-sm">
              <li>
                <strong>1. Error Boundaries:</strong> Wrap a page or component tree with ErrorBoundary. Test
                it by temporarily breaking a component to see the fallback UI.
              </li>
              <li>
                <strong>2. Skeleton Screens:</strong> Replace at least one "Loading..." text with a skeleton
                screen that matches the real content shape.
              </li>
              <li>
                <strong>3. Performance:</strong> Add useMemo to one expensive calculation, or wrap a list
                item with React.memo.
              </li>
              <li>
                <strong>4. Accessibility:</strong> Make one custom button or table keyboard and screen reader
                accessible. Test with keyboard navigation and a screen reader.
              </li>
              <li>
                <strong>5. Advanced:</strong> Run axe DevTools on your app and fix 3+ accessibility issues.
              </li>
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Week8Live;
