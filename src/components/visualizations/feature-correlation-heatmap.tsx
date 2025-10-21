"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColor = (value: number | null) => {
    if (value === null) return 'hsl(var(--muted))';
    // Scale from blue (negative) to red (positive)
    const h = value > 0 ? 0 : 220;
    const s = 70;
    const l = 90 - (Math.abs(value) * 30);
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
      <CardContent>
        <TooltipProvider>
          <div className="flex">
            <div className="flex flex-col text-xs text-muted-foreground pt-6">
                {features.map(feature => (
                    <div key={feature} className="h-8 flex items-center pr-2 truncate" style={{maxWidth: '60px'}} title={feature}>{feature}</div>
                ))}
            </div>
            <div className="flex flex-col">
              <div className="flex pl-8">
                {features.map(feature => (
                  <div key={feature} className="w-8 h-6 flex items-center justify-center text-xs text-muted-foreground -rotate-45" title={feature}>{feature}</div>
                ))}
              </div>
              <div className="grid" style={{ gridTemplateColumns: `repeat(${features.length}, minmax(0, 1fr))` }}>
                {matrix.map((row, i) =>
                  row.map((value, j) => (
                    <Tooltip key={`${i}-${j}`}>
                      <TooltipTrigger asChild>
                        <div
                          className="w-8 h-8 border border-background/20"
                          style={{ backgroundColor: getColor(value) }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{features[i]} vs {features[j]}: {value?.toFixed(2) ?? 'N/A'}</p>
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
