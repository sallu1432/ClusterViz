"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface FeatureDistributionChartsProps {
  data: ClusteringResults['feature_distributions'];
}

const FeatureDistributionCharts = ({ data }: FeatureDistributionChartsProps) => {
  if (!data || data.length === 0) return null;

  return (
    <Card>
        <CardHeader>
            <CardTitle>Feature Distributions</CardTitle>
            <CardDescription>Histograms for the first 4 selected features.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.map(({ feature, bins }) => (
            <div key={feature}>
                <h3 className="text-sm font-medium text-center mb-2">{feature}</h3>
                <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bins}>
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip
                        cursor={{fill: 'hsl(var(--muted))'}}
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                        }}
                    />
                    <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
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
