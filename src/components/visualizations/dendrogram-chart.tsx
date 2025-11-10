
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
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Dendrogram</CardTitle>
        <CardDescription>
            <span className="font-semibold block mt-2">Definition:</span>
            A dendrogram is a tree diagram that illustrates the arrangement of clusters produced by hierarchical clustering.
            <br /><br />
            <span className="font-semibold block">What It Explains:</span>
            This chart tells the story of how your data was grouped. Starting from individual points at the bottom, the algorithm merges the most similar points or groups as you move up. The height of the horizontal lines represents the "distance" or dissimilarity between the merged clusters.
            <br /><br />
            <span className="font-semibold block">Summary from the Diagram:</span>
            Long vertical lines indicate that two very different groups were merged, often highlighting the most natural divisions in the data. The red dashed line shows the "cut-off" point where the algorithm stopped to form the number of clusters you selected. This reveals the structure of your data at different levels of similarity.
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
                  isAnimationActive={false}
                />
              ))}
              <Scatter data={data.nodes} fill="hsl(var(--primary))" shape={<CustomDot />} />
              {data.cluster_threshold && (
                 <ReferenceLine
                    y={data.cluster_threshold}
                    label={{ value: 'Cluster Cutoff', position: 'insideTopRight', fill: 'hsl(var(--accent))', fontSize: 12 }}
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
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
