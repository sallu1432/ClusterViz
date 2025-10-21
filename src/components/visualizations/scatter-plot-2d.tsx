
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
        <CardTitle>2D Cluster Projection (PCA)</CardTitle>
        <CardDescription>
          Clusters visualized in two dimensions using Principal Component Analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[600px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 30,
                bottom: 40,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="PC1" 
                label={{ value: 'Principal Component 1', position: 'insideBottom', offset: -25, fill: 'hsl(var(--foreground))' }} 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="PC2" 
                label={{ value: 'Principal Component 2', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))' }}
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
              <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }}/>
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
