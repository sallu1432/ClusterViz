
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, Line, ReferenceLine } from 'recharts';

interface SilhouettePlotProps {
    data: ClusteringResults['silhouette_scores'];
}

const SilhouettePlot = ({ data }: SilhouettePlotProps) => {
    if (!data || data.length === 0) return null;

    const averageScore = data.reduce((acc, curr) => acc + curr.score, 0) / data.length;

    return (
        <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
                <CardTitle>Silhouette Score</CardTitle>
                <CardDescription>
                    <span className="font-semibold block mt-2">Definition:</span>
                    The Silhouette Score measures how similar a data point is to its own cluster compared to other clusters.
                    <br /><br />
                    <span className="font-semibold block">What It Explains:</span>
                    This chart shows the silhouette score for each cluster, answering the question: "How meaningful are my clusters?". A score near +1 indicates that the cluster is dense and well-separated from others. A score near 0 suggests overlapping clusters, and a negative score implies that samples might have been assigned to the wrong cluster.
                    <br /><br />
                    <span className="font-semibold block">Summary from the Chart:</span>
                    Each bar represents a cluster's average silhouette score. The red dashed line shows the average score across all clusters, providing a quick quality benchmark. Look for clusters with scores well above the average as they are the most distinct.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 40, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                            <XAxis type="number" domain={[0, 1]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))"/>
                            <YAxis type="category" dataKey="cluster" width={80} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))"/>
                            <Tooltip
                                contentStyle={{
                                    background: "hsl(var(--background) / 0.9)",
                                    borderColor: "hsl(var(--border))",
                                    backdropFilter: "blur(4px)",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                             <ReferenceLine x={averageScore} stroke="hsl(var(--accent))" strokeWidth={2} strokeDasharray="5 5" >
                                <LabelList value="Average" position="top" fill="hsl(var(--accent))" fontSize={12}/>
                            </ReferenceLine>
                            <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="score" position="right" formatter={(value: number) => value.toFixed(2)} style={{ fill: 'hsl(var(--foreground))' }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <p className="text-sm text-center text-muted-foreground mt-4">
                    Average Silhouette Score: <span className="font-bold text-lg text-foreground">{averageScore.toFixed(3)}</span>
                </p>
            </CardContent>
        </Card>
    );
};

export default SilhouettePlot;
