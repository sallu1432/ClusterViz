
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
} from "recharts";

interface ScatterPlot2DProps {
  data: ClusteringResults['scatter_data_2d'];
}

const ScatterPlot2D = ({ data }: ScatterPlot2DProps) => {
  if (!data || data.length === 0) return null;

  const clusters = [...new Set(data.map((p) => p.cluster))].sort((a,b) => a - b);
  const chartColors = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>2D Cluster Projection</CardTitle>
        <CardDescription>
          This scatter plot visualizes the clusters in a two-dimensional space. Each point represents a sample from the dataset, colored according to its assigned cluster. This helps to visually assess the separation between clusters. The axes represent the two main dimensions that capture the most variation in the data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 30,
                bottom: 60,
                left: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Component 1" 
                label={{ value: 'Principal Component 1', position: 'insideBottom', offset: -25, fill: 'hsl(var(--foreground))' }} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Component 2" 
                label={{ value: 'Principal Component 2', angle: -90, position: 'insideLeft', offset: -10, fill: 'hsl(var(--foreground))' }}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <Tooltip 
                cursor={{ strokeDasharray: "3 3" }} 
                contentStyle={{
                    background: "hsl(var(--background) / 0.9)",
                    borderColor: "hsl(var(--border))",
                    backdropFilter: "blur(4px)",
                    borderRadius: "var(--radius)",
                }}
              />
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '40px' }}/>
              {clusters.map((clusterId) => (
                <Scatter
                  key={clusterId}
                  name={`Cluster ${clusterId}`}
                  data={data.filter((p) => p.cluster === clusterId)}
                  fillOpacity={0.7}
                  fill={`hsl(var(${chartColors[clusterId % chartColors.length]}))`
                }
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScatterPlot2D;
