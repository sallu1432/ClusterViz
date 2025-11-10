
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Line, Scatter, Tooltip, ReferenceLine } from "recharts";

interface DendrogramChartProps {
  data: ClusteringResults['dendrogram'];
}

const DendrogramChart = ({ data }: DendrogramChartProps) => {
  if (!data || !data.links || data.links.length === 0) {
    return null;
  }

  const CustomDot = (props: any) => {
    return null; // We don't want to render default dots for the structure
  };

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
      <CardHeader>
        <CardTitle>Hierarchical Dendrogram</CardTitle>
        <CardDescription>
            <span className="font-bold text-primary">Definition:</span> A tree diagram that illustrates the arrangement of clusters produced by hierarchical clustering. This diagram shows how data points are merged into clusters. The y-axis represents the distance between them; long vertical lines indicate that two very different clusters were merged.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                margin={{ top: 10, right: 10, bottom: 20, left: 20 }}
            >
              <XAxis 
                dataKey="x" 
                type="number" 
                domain={['dataMin - 1', 'dataMax + 1']}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                stroke="hsl(var(--border))"
                label={{ value: 'Sample Index', position: 'insideBottom', offset: -10, fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis 
                dataKey="y"
                type="number"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                stroke="hsl(var(--border))"
                label={{ value: 'Distance', angle: -90, position: 'insideLeft', offset: -10, fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                    background: "hsl(var(--background) / 0.8)",
                    borderColor: "hsl(var(--border))",
                    backdropFilter: "blur(4px)",
                    borderRadius: "var(--radius)",
                    fontSize: '12px'
                }}
                formatter={(value: number, name) => [value.toFixed(2), name === 'y' ? 'Distance' : name]}
                cursor={{ stroke: 'hsl(var(--accent))', strokeDasharray: '3 3' }}
              />
              {data.links.map((link, i) => (
                <Line
                  key={`link-${i}`}
                  data={[link.source, link.target]}
                  dataKey="y"
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth={1}
                  dot={false}
                  activeDot={false}
                  isAnimationActive={false}
                />
              ))}
              <Scatter data={data.nodes} fill="hsl(var(--primary))" shape={<CustomDot />} />
              {data.cluster_threshold && (
                 <ReferenceLine
                    y={data.cluster_threshold}
                    label={{ value: `Cutoff (${data.cluster_threshold.toFixed(2)})`, position: 'insideTopRight', fill: 'hsl(var(--accent))', fontSize: 12 }}
                    stroke="hsl(var(--accent))"
                    strokeWidth={1.5}
                    strokeDasharray="3 3"
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
