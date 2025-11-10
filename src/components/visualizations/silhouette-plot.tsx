
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
                <CardDescription>This chart uses the Silhouette Score to answer that question. It measures how well-defined your clusters are. A score near +1 means a cluster is dense and well-separated. Scores near 0 suggest clusters overlap, and negative scores mean samples might be in the wrong cluster. The red dashed line shows the average score, giving you a quick benchmark for the overall quality of your clustering result.</CardDescription>
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
