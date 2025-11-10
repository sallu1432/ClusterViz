
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ZAxis } from 'recharts';

interface ScatterPlot2DProps {
    data: ClusteringResults['scatter_data_2d'];
}

const chartColors = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];

const ScatterPlot2D = ({ data }: ScatterPlot2DProps) => {
    if (!data || data.length === 0) return null;

    const clusters = [...new Set(data.map(p => p.cluster))];

    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
            <CardHeader>
                <CardTitle>2D Cluster Visualization</CardTitle>
                <CardDescription>
                    This scatter plot shows a 2D projection of your data points, colored by their assigned cluster. It provides an intuitive, at-a-glance view of how the clusters are separated in space.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                            margin={{ top: 10, right: 20, bottom: 20, left: 10 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                            <XAxis 
                                type="number" 
                                dataKey="x" 
                                name="Dimension 1" 
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                stroke="hsl(var(--border))"
                                label={{ value: 'Dimension 1', position: 'insideBottom', offset: -10, fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />
                            <YAxis 
                                type="number" 
                                dataKey="y" 
                                name="Dimension 2" 
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} 
                                stroke="hsl(var(--border))"
                                label={{ value: 'Dimension 2', angle: -90, position: 'insideLeft', offset: 0, fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3', stroke: 'hsl(var(--accent))' }}
                                contentStyle={{
                                    background: "hsl(var(--background) / 0.8)",
                                    borderColor: "hsl(var(--border))",
                                    backdropFilter: "blur(4px)",
                                    borderRadius: "var(--radius)",
                                }}
                            />
                            <Legend iconType="circle" formatter={(value) => <span className="text-foreground">Cluster {value}</span>}/>
                            {clusters.map(clusterId => (
                                <Scatter 
                                    key={clusterId}
                                    name={`${clusterId}`}
                                    data={data.filter(p => p.cluster === clusterId)} 
                                    fill={`hsl(var(${chartColors[clusterId % chartColors.length]}))`} 
                                    shape="circle"
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
