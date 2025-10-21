
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Cluster Feature Heatmap</CardTitle>
        <CardDescription>Normalized mean feature values for each cluster. Darker shades indicate higher values.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <TooltipProvider>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold">Cluster</TableHead>
                  {features.map(feature => <TableHead key={feature} className="text-center font-bold">{feature}</TableHead>)}
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
                           <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div style={{ backgroundColor: getColor(value) }} className="h-14 flex items-center justify-center text-sm text-foreground/80 font-mono transition-transform hover:scale-110 hover:z-10">
                                {value.toFixed(2)}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Cluster {row.cluster}, {feature}: {value.toFixed(3)}</p>
                            </TooltipContent>
                           </Tooltip>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default ClusterHeatmap;
