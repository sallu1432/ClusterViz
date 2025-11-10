
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ClusterHeatmapProps {
  data: ClusteringResults['cluster_heatmap'];
}

const getColors = (value: number) => {
  const hue = 200; // Blueish
  const saturation = 70;
  const lightness = 95 - (value * 50); // Lighter for lower values, darker for higher
  
  const isDarkTheme = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  
  let textColor = 'hsl(var(--foreground))';
  if (isDarkTheme) {
    if (lightness > 65) {
      textColor = 'hsl(224 71.4% 4.1%)'; // dark text for very light cells
    } else {
      textColor = 'hsl(var(--card-foreground))'; // light text for darker cells
    }
  } else {
     if (lightness < 50) {
      textColor = 'hsl(var(--card-foreground))'; // light text for dark cells
     } else {
      textColor = 'hsl(224 71.4% 4.1%)'; // dark text for light cells
     }
  }


  return { 
    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    textColor: textColor
  };
};

const ClusterHeatmap = ({ data }: ClusterHeatmapProps) => {
  if (!data || data.cluster_data.length === 0) return null;

  const { features, cluster_data } = data;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Cluster Heatmap</CardTitle>
        <CardDescription>
            <span className="font-bold block mt-2">Definition:</span>
            This heatmap visualizes the central tendency (mean) of each feature for each cluster. The values are typically scaled from 0 to 1 for consistent comparison.
            <br /><br />
            <span className="font-bold block">What It Explains:</span>
            It provides a "fingerprint" for each cluster, showing the feature values that are most characteristic of that group. By looking across a row, you can quickly understand the unique profile of a cluster.
            <br /><br />
            <span className="font-bold block">Summary from the Chart:</span>
            Darker cells indicate a higher average value for a feature within that cluster, while lighter cells indicate a lower average. For example, if "Cluster 0" has a dark cell (e.g., 0.9) for "petal length" and "Cluster 1" has a light cell (e.g., 0.1), it strongly suggests that petal length is a key differentiator between these two groups.
        </CardDescription>
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
                      const { backgroundColor, textColor } = getColors(value);
                      return (
                        <TableCell key={feature} className="p-0 text-center">
                           <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div style={{ backgroundColor, color: textColor }} className="h-14 flex items-center justify-center text-sm font-mono transition-transform hover:scale-110 hover:z-10">
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
