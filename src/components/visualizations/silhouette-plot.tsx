"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface SilhouettePlotProps {
    data: ClusteringResults['silhouette_scores'];
}

const SilhouettePlot = ({ data }: SilhouettePlotProps) => {
    if (!data || data.length === 0) return null;

    const averageScore = data.reduce((acc, curr) => acc + curr.score, 0) / data.length;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Silhouette Scores</CardTitle>
                <CardDescription>Measures cluster cohesion vs. separation. Higher is better (max 1.0).</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[352px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 1]} />
                            <YAxis type="category" dataKey="cluster" width={80} />
                            <Tooltip
                                contentStyle={{
                                    background: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                }}
                            />
                            <Bar dataKey="score" fill="hsl(var(--chart-1))">
                                <LabelList dataKey="score" position="right" formatter={(value: number) => value.toFixed(2)} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                 <p className="text-sm text-center text-muted-foreground mt-2">
                    Average Silhouette Score: <span className="font-bold text-foreground">{averageScore.toFixed(3)}</span>
                </p>
            </CardContent>
        </Card>
    );
};

export default SilhouettePlot;
