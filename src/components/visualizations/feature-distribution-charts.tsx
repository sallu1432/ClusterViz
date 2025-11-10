
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface FeatureDistributionChartsProps {
  data: ClusteringResults['feature_distributions'];
}

const FeatureDistributionCharts = ({ data }: FeatureDistributionChartsProps) => {
  if (!data || data.length === 0) return null;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
            <CardTitle>Feature Distributions</CardTitle>
            <CardDescription>
                <span className="font-bold text-primary">Definition:</span> A histogram that shows the frequency of values for a feature, grouped into bins.
                <br />
                <span className="font-bold text-primary">What it shows:</span> These charts reveal the underlying distribution of each feature, helping to identify skewness, outliers, and common value ranges.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {data.map(({ feature, bins }) => (
            <div key={feature}>
                <h3 className="text-sm font-medium text-center mb-2 text-muted-foreground">{feature}</h3>
                <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bins} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))' }}/>
                        <Tooltip
                            cursor={{fill: 'hsl(var(--muted))'}}
                            contentStyle={{
                                background: "hsl(var(--background) / 0.8)",
                                borderColor: "hsl(var(--border))",
                                backdropFilter: "blur(4px)",
                                borderRadius: "var(--radius)",
                                fontSize: '12px'
                            }}
                        />
                        <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[2, 2, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </div>
            </div>
            ))}
      </CardContent>
    </Card>
  );
};

export default FeatureDistributionCharts;
