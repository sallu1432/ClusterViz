
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ClusterHeatmapProps {
  data: ClusteringResults['cluster_heatmap'];
}

const getColors = (value: number) => {
  const hue = 220; // Consistent blue
  const saturation = 85;
  const lightness = 95 - (value * 60); 
  
  const isDarkTheme = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
  
  let textColor: string;
  if (isDarkTheme) {
    textColor = lightness > 60 ? 'hsl(224 71.4% 4.1%)' : 'hsl(210 40% 98%)';
  } else {
    textColor = lightness > 55 ? 'hsl(224 71.4% 4.1%)' : 'hsl(0 0% 100%)';
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
        <CardTitle>Cluster Feature Heatmap</CardTitle>
        <CardDescription>
          <span className="font-bold text-primary">Definition:</span> A graphical representation of data where values are depicted by color.
          <br />
          <span className="font-bold text-primary">What it shows:</span> This heatmap uses color intensity to show the average value of each feature within a cluster (scaled from 0 to 1). Darker cells indicate higher average values. This helps reveal the defining "fingerprint" or characteristics that make each cluster unique.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <TooltipProvider>
          <div className="overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-bold whitespace-nowrap">Cluster</TableHead>
                  {features.map(feature => <TableHead key={feature} className="text-center font-bold">{feature}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {cluster_data.map(row => (
                  <TableRow key={row.cluster}>
                    <TableCell className="font-medium whitespace-nowrap">{row.cluster}</TableCell>
                    {features.map(feature => {
                      const value = row[feature] as number;
                      const { backgroundColor, textColor } = getColors(value);
                      return (
                        <TableCell key={feature} className="p-0 text-center">
                           <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                <div style={{ backgroundColor, color: textColor }} className="h-14 flex items-center justify-center text-sm font-mono transition-transform duration-200 hover:scale-110 hover:z-10 hover:shadow-lg hover:rounded-sm">
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
