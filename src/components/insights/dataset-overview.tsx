"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface DatasetOverviewProps {
  summary: ClusteringResults['dataset_summary'];
}

const DatasetOverview = ({ summary }: DatasetOverviewProps) => {
  if (!summary) return null;

  const { n_samples, n_features, description, target_distribution } = summary;
  const chartColors = ["--chart-1", "--chart-2", "--chart-3", "--chart-4", "--chart-5"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataset Overview</CardTitle>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
            <div>
                <p className="text-2xl font-bold">{n_samples}</p>
                <p className="text-xs text-muted-foreground">Samples</p>
            </div>
            <div>
                <p className="text-2xl font-bold">{n_features}</p>
                <p className="text-xs text-muted-foreground">Features</p>
            </div>
        </div>

        {target_distribution && target_distribution.length > 0 && (
            <>
                <h4 className="text-sm font-medium text-center my-2">Original Class Distribution</h4>
                <div className="h-[120px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={target_distribution}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={30}
                                outerRadius={50}
                                paddingAngle={5}
                            >
                                {target_distribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={`hsl(var(${chartColors[index % chartColors.length]}))`}/>
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: "hsl(var(--background))",
                                    borderColor: "hsl(var(--border))",
                                }}
                            />
                            <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </>
        )}
      </CardContent>
    </Card>
  );
};

export default DatasetOverview;
