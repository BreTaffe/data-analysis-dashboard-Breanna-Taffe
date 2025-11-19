import React, { useState, useMemo } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

/**
 * AccessibilityDemo Component - Week 8
 * Demonstrates accessible patterns:
 * 1. Semantic HTML (button, section, nav, main, etc.)
 * 2. ARIA labels and attributes
 * 3. Keyboard navigation (Tab, Arrow Keys, Enter, Space)
 * 4. Screen reader support
 * 5. Focus management and visual indicators
 */

/**
 * PATTERN 1: Semantic HTML and ARIA Labels
 */
const SemanticHTMLExample: React.FC = () => {
  return (
    <section className="space-y-4" aria-labelledby="semantic-heading">
      <h3 id="semantic-heading" className="text-lg font-bold text-gray-800">
        📝 Semantic HTML & ARIA
      </h3>

      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
        <h4 className="font-semibold text-blue-900">❌ Bad: Non-semantic</h4>
        <code className="block bg-white p-2 rounded border text-xs font-mono text-gray-700">
          {`<div onClick={handleSubmit}>Submit</div>`}
        </code>

        <h4 className="font-semibold text-blue-900">✅ Good: Semantic with ARIA</h4>
        <code className="block bg-white p-2 rounded border text-xs font-mono text-gray-700">
          {`<button 
  onClick={handleSubmit}
  aria-label="Submit form data"
>
  Submit
</button>`}
        </code>

        <div className="mt-4 p-3 bg-white rounded border-l-4 border-blue-500">
          <p className="text-sm text-gray-700">
            <strong>Why it matters:</strong> Screen readers announce this as a button. Keyboard users
            can activate it with Enter/Space. Native <code>&lt;button&gt;</code> elements have built-in
            accessibility.
          </p>
        </div>
      </div>
    </section>
  );
};

/**
 * PATTERN 2: Keyboard Navigation with Arrow Keys
 */
interface DataRow {
  id: number;
  name: string;
  value: number;
  category: string;
}

const KeyboardNavigationExample: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState(0);

  const data: DataRow[] = [
    { id: 1, name: 'Sales Report', value: 45000, category: 'Finance' },
    { id: 2, name: 'Customer Data', value: 23500, category: 'Analytics' },
    { id: 3, name: 'Performance', value: 78900, category: 'Metrics' },
    { id: 4, name: 'Forecast', value: 61200, category: 'Planning' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTableElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedRow(prev => Math.min(prev + 1, data.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedRow(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        alert(`Selected: ${data[selectedRow].name}`);
        break;
      default:
        break;
    }
  };

  return (
    <section className="space-y-4" aria-labelledby="keyboard-heading">
      <h3 id="keyboard-heading" className="text-lg font-bold text-gray-800">
        ⌨️ Keyboard Navigation (Arrow Keys)
      </h3>

      <p className="text-sm text-gray-600">
        Try using <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">↑</kbd> and{' '}
        <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">↓</kbd> to navigate rows, then press{' '}
        <kbd className="px-2 py-1 bg-gray-200 rounded text-sm">Enter</kbd> to select.
      </p>

      <div className="overflow-x-auto">
        <table
          role="table"
          aria-label="Keyboard navigable data table"
          onKeyDown={handleKeyDown}
          tabIndex={0}
          className="w-full border-collapse border rounded-lg overflow-hidden"
        >
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="text-left p-3 border">
                Name
              </th>
              <th scope="col" className="text-left p-3 border">
                Value
              </th>
              <th scope="col" className="text-left p-3 border">
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row.id}
                aria-selected={selectedRow === index}
                aria-label={`Row ${index + 1}: ${row.name}, ${row.value}, ${row.category}`}
                className={`transition-colors ${
                  selectedRow === index
                    ? 'bg-blue-100 border-l-4 border-l-blue-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <td className="p-3 border">{row.name}</td>
                <td className="p-3 border">${row.value.toLocaleString()}</td>
                <td className="p-3 border">{row.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-sm text-gray-600">
        Selected row: <strong>{data[selectedRow].name}</strong>
      </p>
    </section>
  );
};

/**
 * PATTERN 3: Screen Reader Support with aria-live and aria-describedby
 */
const ChartAccessibilityExample: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const data = [
    { month: 'Jan', sales: 45000 },
    { month: 'Feb', sales: 52000 },
    { month: 'Mar', sales: 48000 },
    { month: 'Apr', sales: 61000 },
    { month: 'May', sales: 55000 },
  ];

  const chartDescription = useMemo(() => {
    const values = data.map(d => d.sales);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;

    return `Chart displays ${data.length} months of sales data. Values range from $${min.toLocaleString()} to $${max.toLocaleString()}, with an average of $${Math.round(avg).toLocaleString()}. The trend shows an ${
      avg > values[0] ? 'increase' : 'decrease'
    } over the period.`;
  }, []);

  const handleLoadChart = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <section className="space-y-4" aria-labelledby="chart-heading">
      <h3 id="chart-heading" className="text-lg font-bold text-gray-800">
        📊 Screen Reader Support for Charts
      </h3>

      {loading && (
        <div role="status" aria-live="polite" aria-busy={true}>
          <span className="sr-only">Loading chart data...</span>
          <div className="animate-pulse bg-gray-300 h-40 rounded" aria-hidden="true" />
        </div>
      )}

      {!loading && (
        <div
          className="p-4 bg-gray-50 rounded-lg border"
          role="img"
          aria-label={chartDescription}
          aria-describedby="chart-description"
        >
          {/* Visual chart (for sighted users) */}
          <div aria-hidden="true" className="h-40 bg-white rounded border flex items-end gap-2 p-4">
            {data.map((d, i) => (
              <div
                key={i}
                className="flex-1 bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                style={{ height: `${(d.sales / Math.max(...data.map(x => x.sales))) * 100}%` }}
              >
                <span className="text-xs text-white text-center block mt-1">{d.month}</span>
              </div>
            ))}
          </div>

          {/* Text description (for screen readers) */}
          <p id="chart-description" className="sr-only">
            {chartDescription}
          </p>

          {/* Data table alternative (accessible) */}
          <details className="mt-4 p-2 bg-white rounded border">
            <summary className="cursor-pointer font-semibold text-gray-700">View Data Table</summary>
            <table className="w-full mt-3 text-sm">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">Month</th>
                  <th className="text-left p-2 border-b">Sales</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td className="p-2 border-b">{d.month}</td>
                    <td className="p-2 border-b">${d.sales.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>
      )}

      <Button onClick={handleLoadChart} className="bg-blue-500 hover:bg-blue-600">
        {loading ? 'Loading...' : 'Load Chart'}
      </Button>
    </section>
  );
};

/**
 * PATTERN 4: Custom Button Accessibility
 * Shows how to make custom interactive elements keyboard and screen reader accessible
 */
const CustomAccessibleButton: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="space-y-4" aria-labelledby="custom-button-heading">
      <h3 id="custom-button-heading" className="text-lg font-bold text-gray-800">
        🔘 Custom Accessible Button
      </h3>

      <div className="space-y-3">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setExpanded(!expanded)}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setExpanded(!expanded);
            }
          }}
          aria-expanded={expanded}
          aria-label={`${expanded ? 'Hide' : 'Show'} details`}
          className="p-3 bg-purple-50 border border-purple-300 rounded-lg cursor-pointer hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-purple-900">Professional Standards</span>
            {expanded ? (
              <ChevronUp className="text-purple-600" />
            ) : (
              <ChevronDown className="text-purple-600" />
            )}
          </div>
        </div>

        {expanded && (
          <div
            className="p-4 bg-purple-50 rounded-lg border border-purple-200 space-y-2"
            role="region"
            aria-label="Details about professional standards"
          >
            <p className="text-sm text-gray-700">
              ✓ Use semantic HTML elements (<code>&lt;button&gt;</code>, not <code>&lt;div&gt;</code>)
            </p>
            <p className="text-sm text-gray-700">
              ✓ Make interactive elements keyboard accessible with <code>tabIndex</code>
            </p>
            <p className="text-sm text-gray-700">
              ✓ Provide clear focus indicators with <code>focus:ring</code>
            </p>
            <p className="text-sm text-gray-700">
              ✓ Use <code>aria-*</code> attributes to describe state and purpose
            </p>
          </div>
        )}
      </div>

      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200 flex gap-3">
        <AlertCircle className="text-yellow-600 flex-shrink-0" size={20} />
        <p className="text-sm text-yellow-900">
          <strong>Test:</strong> Tab to this element, then press Enter or Space to toggle. Try a screen
          reader to hear the button announce "{expanded ? 'Hide' : 'Show'} details".
        </p>
      </div>
    </section>
  );
};

/**
 * PATTERN 5: Focus Management and Color Contrast
 */
const FocusAndContrastExample: React.FC = () => {
  return (
    <section className="space-y-4" aria-labelledby="focus-heading">
      <h3 id="focus-heading" className="text-lg font-bold text-gray-800">
        🎯 Focus Management & Color Contrast
      </h3>

      <div className="space-y-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-300">
          <h4 className="font-semibold text-green-900 mb-2">✅ Good Focus Indicators</h4>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 focus:ring-offset-2 transition-all"
            aria-label="Example button with excellent focus indicator"
          >
            Click me (Tab to see focus ring)
          </button>
          <p className="text-xs text-green-700 mt-2">
            Has 4px focus ring with offset - clearly visible when tabbing
          </p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-300">
          <h4 className="font-semibold text-blue-900 mb-2">Color Contrast Levels</h4>
          <div className="space-y-2">
            <div className="p-2 bg-white border border-gray-300">
              <p className="text-lg font-bold text-gray-900">
                WCAG AAA (7:1) - Excellent contrast, meets highest standard
              </p>
            </div>
            <div className="p-2 bg-white border border-gray-300">
              <p className="text-lg font-bold text-gray-700">
                WCAG AA (4.5:1) - Good contrast, meets most standards
              </p>
            </div>
            <div className="p-2 bg-white border border-gray-300">
              <p className="text-lg font-semibold text-gray-500">
                Poor contrast - Hard to read, fails standards
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-900 mb-2">Test Tools</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• <strong>Chrome DevTools:</strong> Inspect → Accessibility panel → Check contrast ratios</li>
            <li>• <strong>axe DevTools:</strong> Browser extension for automated a11y scanning</li>
            <li>• <strong>WAVE:</strong> WebAIM tool for accessibility evaluation</li>
            <li>• <strong>Lighthouse:</strong> Built into Chrome DevTools, includes a11y audit</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

/**
 * Main Accessibility Demo Component
 */
export const AccessibilityDemo: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">♿ Accessibility (a11y) Fundamentals</h2>
        <p className="text-gray-600">
          Build inclusive interfaces that work for everyone, including users with disabilities.
        </p>
      </Card>

      <Card className="p-6">
        <SemanticHTMLExample />
      </Card>

      <Card className="p-6">
        <KeyboardNavigationExample />
      </Card>

      <Card className="p-6">
        <ChartAccessibilityExample />
      </Card>

      <Card className="p-6">
        <CustomAccessibleButton />
      </Card>

      <Card className="p-6">
        <FocusAndContrastExample />
      </Card>

      {/* Summary Checklist */}
      <Card className="p-6 bg-teal-50 border-teal-200">
        <h3 className="text-lg font-bold text-teal-900 mb-4">✅ Accessibility Checklist</h3>
        <ul className="space-y-2 text-sm text-teal-800">
          <li>✓ Use semantic HTML (<code className="bg-teal-100 px-1 rounded">&lt;button&gt;</code>, <code className="bg-teal-100 px-1 rounded">&lt;section&gt;</code>, <code className="bg-teal-100 px-1 rounded">&lt;nav&gt;</code>)</li>
          <li>✓ All interactive elements are keyboard accessible (Tab, Enter, Space)</li>
          <li>✓ Clear focus indicators on all buttons and inputs</li>
          <li>✓ ARIA labels for buttons without text (<code className="bg-teal-100 px-1 rounded">aria-label</code>)</li>
          <li>✓ ARIA live regions for dynamic content (<code className="bg-teal-100 px-1 rounded">aria-live="polite"</code>)</li>
          <li>✓ Color contrast meets WCAG AA standard (4.5:1 for text)</li>
          <li>✓ Form inputs have associated labels</li>
          <li>✓ Images have descriptive alt text</li>
          <li>✓ Page structure uses proper heading hierarchy (h1, h2, h3)</li>
          <li>✓ Test with keyboard navigation and screen readers</li>
        </ul>
      </Card>

      {/* Resources */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className="text-lg font-bold text-blue-900 mb-3">📚 Learning Resources</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <a href="https://www.w3.org/WAI/WCAG21/quickref/" className="underline hover:text-blue-600">WCAG 2.1 Quick Reference</a></li>
          <li>• <a href="https://www.a11y-101.com/" className="underline hover:text-blue-600">A11y 101 - Accessibility Primer</a></li>
          <li>• <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility" className="underline hover:text-blue-600">MDN Web Docs - Accessibility</a></li>
          <li>• <a href="https://www.w3.org/WAI/test-evaluate/testing-with-screen-readers/" className="underline hover:text-blue-600">Testing with Screen Readers</a></li>
        </ul>
      </Card>
    </div>
  );
};

export default AccessibilityDemo;
