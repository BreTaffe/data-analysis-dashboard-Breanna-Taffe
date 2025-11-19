import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  ComposedChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

// Sample data (can be replaced with DataAnalyzer results for real data)
const sampleData = [
  { name: "Jan", value: 400, value2: 240 },
  { name: "Feb", value: 300, value2: 221 },
  { name: "Mar", value: 200, value2: 229 },
  { name: "Apr", value: 278, value2: 200 },
  { name: "May", value: 189, value2: 220 },
  { name: "Jun", value: 239, value2: 250 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF", "#82CA9D"];

interface SimpleChartProps {
  data?: typeof sampleData;
  title?: string;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ data = sampleData, title = "Data Visualization" }) => {
  const [chartType, setChartType] = useState<"Bar" | "Line" | "Pie" | "Scatter" | "Composed">("Bar");

  // Error handling
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
            <p className="font-semibold">⚠️ No Data Available</p>
            <p className="text-sm mt-1">Please provide a valid array of data with at least one item to display the chart.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Chart type selector buttons
  const chartButtons = [
    { type: "Bar" as const, label: "📊 Bar Chart" },
    { type: "Line" as const, label: "📈 Line Chart" },
    { type: "Pie" as const, label: "🥧 Pie Chart" },
    { type: "Scatter" as const, label: "🔵 Scatter" },
    { type: "Composed" as const, label: "📉 Composed" },
  ];

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-sm text-gray-600 mt-2">Data points: {data.length}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2">
          {chartButtons.map(btn => (
            <Button
              key={btn.type}
              onClick={() => setChartType(btn.type)}
              variant={chartType === btn.type ? "default" : "outline"}
              className="text-sm"
            >
              {btn.label}
            </Button>
          ))}
        </div>

        {/* Chart Container */}
        <div className="w-full h-96 bg-gray-50 rounded-lg p-4 border border-gray-200">
          <ResponsiveContainer width="100%" height="100%">
            {(() => {
              switch (chartType) {
                case "Bar":
                  return (
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                      />
                      <Legend />
                      <Bar dataKey="value" fill={COLORS[0]} name="Primary Value" />
                      {data[0]?.value2 && <Bar dataKey="value2" fill={COLORS[1]} name="Secondary Value" />}
                    </BarChart>
                  );

                case "Line":
                  return (
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke={COLORS[1]} 
                        strokeWidth={2}
                        dot={{ fill: COLORS[1], r: 4 }}
                        activeDot={{ r: 6 }}
                        name="Primary Value"
                      />
                      {data[0]?.value2 && (
                        <Line 
                          type="monotone" 
                          dataKey="value2" 
                          stroke={COLORS[3]} 
                          strokeWidth={2}
                          dot={{ fill: COLORS[3], r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Secondary Value"
                        />
                      )}
                    </LineChart>
                  );

                case "Pie":
                  return (
                    <PieChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
                      />
                      <Legend />
                      <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {data.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  );

                case "Scatter":
                  return (
                    <ScatterChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        name="Category"
                        type="category"
                      />
                      <YAxis 
                        dataKey="value" 
                        name="Value"
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
                        cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                      />
                      <Legend />
                      <Scatter 
                        name="Primary Value" 
                        data={data} 
                        fill={COLORS[4]}
                      />
                      {data[0]?.value2 && (
                        <Scatter 
                          name="Secondary Value" 
                          data={data.map(d => ({ name: d.name, value: d.value2 }))} 
                          fill={COLORS[5]}
                        />
                      )}
                    </ScatterChart>
                  );

                case "Composed":
                  return (
                    <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
                      />
                      <Legend />
                      <Bar dataKey="value" fill={COLORS[0]} name="Primary Value" />
                      {data[0]?.value2 && (
                        <Line 
                          type="monotone" 
                          dataKey="value2" 
                          stroke={COLORS[3]} 
                          strokeWidth={2}
                          name="Secondary Value"
                        />
                      )}
                    </ComposedChart>
                  );

                default:
                  return null;
              }
            })()}
          </ResponsiveContainer>
        </div>

        {/* Data Info */}
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p className="font-semibold mb-1">📊 Chart Information</p>
          <p>Current chart type: <strong>{chartType}</strong></p>
          <p>Data points displayed: <strong>{data.length}</strong></p>
          <p className="mt-2 text-xs text-blue-700">
            💡 Click different chart buttons to visualize the same data in different ways.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleChart;
