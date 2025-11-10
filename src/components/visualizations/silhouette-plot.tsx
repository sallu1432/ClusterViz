
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList, ReferenceLine } from 'recharts';

interface SilhouettePlotProps {
    data: ClusteringResults['silhouette_scores'];
}

const SilhouettePlot = ({ data }: SilhouettePlotProps) => {
    if (!data || data.length === 0) return null;

    const averageScore = data.reduce((acc, curr) => acc + curr.score, 0) / data.length;

    return (
        <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
                <CardTitle>Cluster Quality (Silhouette Score)</CardTitle>
                <CardDescription>
                    This score (from -1 to 1) measures cluster quality. High scores mean clusters are dense and well-separated. Scores near 0 suggest overlapping clusters. The dashed line is the average score for this analysis.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center pt-2">
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 40, left: 10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                            <XAxis type="number" domain={[0, 1]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))"/>
                            <YAxis type="category" dataKey="cluster" width={70} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} stroke="hsl(var(--border))" tickLine={false} axisLine={false}/>
                            <Tooltip
                                contentStyle={{
                                    background: "hsl(var(--background) / 0.8)",
                                    borderColor: "hsl(var(--border))",
                                    backdropFilter: "blur(4px)",
                                    borderRadius: "var(--radius)",
                                }}
                                formatter={(value: number) => value.toFixed(3)}
                                cursor={{ fill: 'hsl(var(--muted))' }}
                            />
                             <ReferenceLine x={averageScore} stroke="hsl(var(--accent))" strokeWidth={1.5} strokeDasharray="3 3">
                                <LabelList value={`Avg: ${averageScore.toFixed(2)}`} position="insideTopRight" fill="hsl(var(--accent))" fontSize={12}/>
                            </ReferenceLine>
                            <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]}>
                                <LabelList dataKey="score" position="right" formatter={(value: number) => value.toFixed(2)} style={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <p className="text-sm text-center text-muted-foreground mt-2">
                    Average Silhouette Score: <span className="font-bold text-lg text-foreground">{averageScore.toFixed(3)}</span>
                </p>
            </CardContent>
        </Card>
    );
};

export default SilhouettePlot;
