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

  const clusters = [...new Set(data.map((p) => p.cluster))];
  const chartColors = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>2D Cluster Projection (PCA)</CardTitle>
        <CardDescription>
          Clusters visualized in two dimensions using Principal Component Analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="PC1" label={{ value: 'Principal Component 1', position: 'insideBottom', offset: -10 }} />
              <YAxis type="number" dataKey="y" name="PC2" label={{ value: 'Principal Component 2', angle: -90, position: 'insideLeft' }} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Legend />
              {clusters.map((clusterId) => (
                <Scatter
                  key={clusterId}
                  name={`Cluster ${clusterId}`}
                  data={data.filter((p) => p.cluster === clusterId)}
                  fill={`hsl(var(${chartColors[clusterId % chartColors.length]}))`}
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
