"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Line, Scatter } from "recharts";

interface DendrogramChartProps {
  data: ClusteringResults['dendrogram'];
}

const DendrogramChart = ({ data }: DendrogramChartProps) => {
  if (!data || !data.links || data.links.length === 0) {
    return null;
  }
  
  const CustomDot = (props: any) => {
    return null; // We don't want to render default dots
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dendrogram</CardTitle>
        <CardDescription>
          Hierarchical structure of clusters. The height of the links represents the distance between clusters. A subset of 50 samples is shown for clarity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis 
                dataKey="x" 
                type="number" 
                domain={['dataMin', 'dataMax']}
                hide
              />
              <YAxis 
                dataKey="y"
                type="number"
                label={{ value: 'Distance', angle: -90, position: 'insideLeft' }}
              />
              {data.links.map((link, i) => (
                <Line
                  key={`link-${i}`}
                  data={[link.source, link.target]}
                  dataKey="y"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}
              <Scatter data={data.nodes} fill="hsl(var(--primary))" shape={<CustomDot />} />
              {data.cluster_threshold && (
                 <Line
                    data={[{x: -1, y: data.cluster_threshold}, {x: 51, y: data.cluster_threshold}]}
                    dataKey="y"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={false}
                    isAnimationActive={false}
                 />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DendrogramChart;
