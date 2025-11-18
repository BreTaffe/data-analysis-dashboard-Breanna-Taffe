import { useState } from 'react';

type Dataset = number[];

const round = (n: number, digits = 2) => Math.round(n * Math.pow(10, digits)) / Math.pow(10, digits);

const analyze = (arr: any[]) => {
  // Filter numeric values (coerce strings that are numeric)
  const nums: number[] = arr
    .map(x => {
      if (typeof x === 'number' && !isNaN(x)) return x;
      if (typeof x === 'string' && x.trim() !== '' && !isNaN(Number(x))) return Number(x);
      return null;
    })
    .filter((x): x is number => x !== null && typeof x === 'number');

  if (nums.length === 0) {
    return { error: 'No valid numeric values found.' };
  }

  nums.sort((a, b) => a - b);
  const count = nums.length;
  const sum = nums.reduce((s, v) => s + v, 0);
  const avg = sum / count;
  const min = nums[0];
  const max = nums[nums.length - 1];
  const range = max - min;

  // median
  let median: number;
  if (count % 2 === 1) {
    median = nums[(count - 1) / 2];
  } else {
    median = (nums[count / 2 - 1] + nums[count / 2]) / 2;
  }

  // standard deviation (population)
  const variance = nums.reduce((acc, v) => acc + Math.pow(v - avg, 2), 0) / count;
  const stddev = Math.sqrt(variance);

  // percentiles helper
  const percentile = (p: number) => {
    if (p < 0 || p > 100) return NaN;
    const idx = (p / 100) * (count - 1);
    const lower = Math.floor(idx);
    const upper = Math.ceil(idx);
    if (lower === upper) return nums[lower];
    const weight = idx - lower;
    return nums[lower] * (1 - weight) + nums[upper] * weight;
  };

  const aboveAvg = nums.filter(n => n > avg);
  const belowAvg = nums.filter(n => n < avg);

  return {
    nums,
    count,
    sum: round(sum, 2),
    avg: round(avg, 2),
    min,
    max,
    range: round(range, 2),
    median: round(median, 2),
    stddev: round(stddev, 2),
    percentile,
    aboveAvg,
    belowAvg,
  };
};

const exampleDatasets: { [key: string]: any[] } = {
  temperatures: [72, 75, 68, 80, 77, 74, 69, 78, 76, 73],
  testScores: [88, 92, 79, 95, 87, 90, 84, 89, 93, 86],
  salesFigures: [1200, 1450, 980, 1680, 1250, 1520, 1100, 1400],
  mixed: ["100", 50, null, 'abc', 75, '85.5'],
};

const DataAnalyzer = () => {
  const [selected, setSelected] = useState<string>('temperatures');
  const [data, setData] = useState<any[]>(exampleDatasets[selected]);
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = () => {
    setError(null);
    const res = analyze(data);
    if ((res as any).error) {
      setResult(null);
      setError((res as any).error);
    } else {
      setResult(res);
    }
  };

  const handleDatasetChange = (name: string) => {
    setSelected(name);
    setData(exampleDatasets[name]);
    setResult(null);
    setError(null);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    try {
      // allow comma separated values
      const arr = val.split(',').map(s => s.trim()).filter(s => s !== '');
      setData(arr as any[]);
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">Data Analyzer</h3>

      <div className="flex gap-3 mb-4">
        <select value={selected} onChange={e => handleDatasetChange(e.target.value)} className="px-3 py-2 border rounded">
          {Object.keys(exampleDatasets).map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>

        <button onClick={runAnalysis} className="px-4 py-2 bg-blue-500 text-white rounded">Analyze</button>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Custom dataset (comma separated)</label>
        <textarea onChange={handleCustomInput} className="w-full h-20 p-2 border rounded" defaultValue={exampleDatasets[selected].join(', ')} />
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded mb-4">{error}</div>
      )}

      {result && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Count</div>
            <div className="font-semibold">{result.count}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Sum</div>
            <div className="font-semibold">{result.sum}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Average</div>
            <div className="font-semibold">{result.avg}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Median</div>
            <div className="font-semibold">{result.median}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Min</div>
            <div className="font-semibold">{result.min}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Max</div>
            <div className="font-semibold">{result.max}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Range</div>
            <div className="font-semibold">{result.range}</div>
          </div>

          <div className="p-3 bg-gray-50 rounded">
            <div className="text-xs text-gray-500">Std Dev</div>
            <div className="font-semibold">{result.stddev}</div>
          </div>

          <div className="col-span-2 mt-2 p-3 bg-white/50 rounded md:col-span-4">
            <div className="text-xs text-gray-500">Above Average ({result.aboveAvg.length})</div>
            <div className="font-mono text-sm mt-1">{result.aboveAvg.join(', ')}</div>
          </div>

          <div className="col-span-2 mt-2 p-3 bg-white/50 rounded md:col-span-4">
            <div className="text-xs text-gray-500">Below Average ({result.belowAvg.length})</div>
            <div className="font-mono text-sm mt-1">{result.belowAvg.join(', ')}</div>
          </div>

          <div className="col-span-2 mt-2 p-3 bg-white/50 rounded md:col-span-4">
            <div className="text-xs text-gray-500">Percentiles (10,25,50,75,90)</div>
            <div className="font-mono text-sm mt-1">{[10,25,50,75,90].map(p => `${p}p:${round(result.percentile(p),2)}`).join(' | ')}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAnalyzer;
