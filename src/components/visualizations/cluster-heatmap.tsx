"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClusteringResults } from "@/types";

interface ClusterHeatmapProps {
  data: ClusteringResults['cluster_heatmap'];
}

const getColor = (value: number) => {
  const hue = 200; // Blueish
  const saturation = 70;
  const lightness = 95 - (value * 50); // Lighter for lower values, darker for higher
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const ClusterHeatmap = ({ data }: ClusterHeatmapProps) => {
  if (!data || data.cluster_data.length === 0) return null;

  const { features, cluster_data } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cluster Feature Heatmap</CardTitle>
        <CardDescription>Normalized mean feature values for each cluster. Darker shades indicate higher values.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cluster</TableHead>
                {features.map(feature => <TableHead key={feature} className="text-center">{feature}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cluster_data.map(row => (
                <TableRow key={row.cluster}>
                  <TableCell className="font-medium">{row.cluster}</TableCell>
                  {features.map(feature => {
                    const value = row[feature] as number;
                    return (
                      <TableCell key={feature} className="p-0 text-center">
                        <div style={{ backgroundColor: getColor(value) }} className="h-12 flex items-center justify-center text-xs text-foreground/80 font-mono">
                          {value.toFixed(2)}
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClusterHeatmap;
