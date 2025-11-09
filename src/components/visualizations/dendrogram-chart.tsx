
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, Line, Scatter, Tooltip } from "recharts";

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
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Dendrogram</CardTitle>
        <CardDescription>
          The dendrogram is a tree diagram that illustrates the hierarchical relationship between clusters. It shows how data points are grouped together at different levels of similarity. The vertical lines represent clusters, and the horizontal lines represent the distance (or dissimilarity) at which clusters are merged. Longer vertical lines indicate greater dissimilarity between clusters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
            >
              <XAxis 
                dataKey="x" 
                type="number" 
                domain={['dataMin - 1', 'dataMax + 1']}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
                label={{ value: 'Sample Index', position: 'insideBottom', offset: -10, fill: 'hsl(var(--foreground))' }}
              />
              <YAxis 
                dataKey="y"
                type="number"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                stroke="hsl(var(--border))"
                label={{ value: 'Distance', angle: -90, position: 'insideLeft', fill: 'hsl(var(--foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                    background: "hsl(var(--background) / 0.9)",
                    borderColor: "hsl(var(--border))",
                    backdropFilter: "blur(4px)",
                    borderRadius: "var(--radius)",
                }}
                formatter={(value, name) => [value, name === 'y' ? 'Distance' : name]}
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
                />
              ))}
              <Scatter data={data.nodes} fill="hsl(var(--primary))" shape={<CustomDot />} />
              {data.cluster_threshold && (
                 <Line
                    name="Cluster Threshold"
                    data={[{x: -1, y: data.cluster_threshold}, {x: 51, y: data.cluster_threshold}]}
                    dataKey="y"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    activeDot={false}
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
