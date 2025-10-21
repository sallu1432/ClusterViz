"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColor = (value: number | null) => {
    if (value === null) return 'hsl(var(--muted))';
    // Blue (negative) -> White (zero) -> Red (positive)
    const h = value > 0 ? 0 : 220; // Red for positive, Blue for negative
    const s = 100;
    const l = 95 - (Math.abs(value) * 45); // Adjust lightness for more contrast
    return `hsl(${h}, ${s}%, ${l}%)`;
};


const FeatureCorrelationHeatmap = ({ data }: FeatureCorrelationHeatmapProps) => {
  if (!data || data.matrix.length === 0) return null;

  const { features, matrix } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Correlation Heatmap</CardTitle>
        <CardDescription>Shows the Pearson correlation between features. (Max 8 shown).</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <TooltipProvider>
          <div className="flex">
            <div className="flex flex-col text-xs text-muted-foreground pt-10">
                {features.map(feature => (
                    <div key={feature} className="h-10 flex items-center pr-2 truncate font-medium" style={{maxWidth: '80px'}} title={feature}>{feature}</div>
                ))}
            </div>
            <div className="flex flex-col">
              <div className="flex pl-10">
                {features.map(feature => (
                  <div key={feature} className="w-10 h-10 flex items-end justify-center text-xs text-muted-foreground -rotate-45 origin-bottom-left" title={feature}>
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${features.length}, minmax(0, 1fr))` }}>
                {matrix.map((row, i) =>
                  row.map((value, j) => (
                    <Tooltip key={`${i}-${j}`} delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div
                          className="w-10 h-10 border border-background/20 rounded-sm transition-transform duration-200 ease-in-out hover:scale-110 hover:z-10"
                          style={{ backgroundColor: getColor(value) }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="font-medium">{features[i]} vs {features[j]}: <span className="font-mono">{value?.toFixed(3) ?? 'N/A'}</span></p>
                      </TooltipContent>
                    </Tooltip>
                  ))
                )}
              </div>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
