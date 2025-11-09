
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColor = (value: number | null) => {
    if (value === null) return 'hsl(var(--muted))';
    // Blue for negative, Red for positive, more vibrant
    const h = value > 0 ? 0 : 210;
    const s = 100;
    const l = 100 - (Math.abs(value) * 60 + 15);
    return `hsl(${h}, ${s}%, ${l}%)`;
};

const FeatureCorrelationHeatmap = ({ data }: FeatureCorrelationHeatmapProps) => {
  if (!data || data.matrix.length === 0) return null;

  const { features, matrix } = data;
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Feature Correlation Heatmap</CardTitle>
        <CardDescription>This heatmap shows the Pearson correlation between pairs of features, which measures their linear relationship. A value near +1 (red) indicates a strong positive correlation (as one feature increases, the other tends to increase), while a value near -1 (blue) indicates a strong negative correlation. A value near 0 suggests no linear correlation. This helps identify redundant features and understand relationships in the data.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6 overflow-x-auto">
        <TooltipProvider>
          <div className="grid gap-1" style={{gridTemplateColumns: `auto repeat(${features.length}, minmax(60px, 1fr))`}}>
              {/* Top-left empty cell */}
              <div className="sticky left-0 bg-card z-10"></div>
              {/* Column headers */}
              {features.map((feature, i) => (
                  <div key={`col-header-${i}`} className="text-xs text-muted-foreground truncate text-center pb-2 self-end" title={feature}>
                      {feature}
                  </div>
              ))}
              
              {/* Matrix rows */}
              {features.map((feature, i) => (
                  <React.Fragment key={`row-${i}`}>
                      {/* Row header */}
                      <div className="text-xs text-muted-foreground truncate text-right pr-2 self-center sticky left-0 bg-card z-10" title={feature}>
                          {feature}
                      </div>
                      {/* Cells */}
                      {matrix[i].map((value, j) => (
                          <Tooltip key={`${i}-${j}`} delayDuration={100}>
                              <TooltipTrigger asChild>
                                  <div
                                      className="w-full rounded-sm flex items-center justify-center aspect-square"
                                      style={{ 
                                          backgroundColor: getColor(value),
                                      }}
                                  >
                                      <span className="text-xs font-mono text-foreground/80 mix-blend-difference">{value?.toFixed(2)}</span>
                                  </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p className="font-medium">{features[i]} &amp; {features[j]}: <span className="font-mono">{value?.toFixed(3) ?? 'N/A'}</span></p>
                              </TooltipContent>
                          </Tooltip>
                      ))}
                  </React.Fragment>
              ))}
          </div>
        </TooltipProvider>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground w-64 mx-auto mt-4">
          <span className="font-mono">-1.0</span>
          <div className="flex-1 h-3 rounded-full overflow-hidden border">
             <div style={{ background: 'linear-gradient(to right, hsl(210, 100, 25%), hsl(210, 100, 85%), white, hsl(0, 100%, 85%), hsl(0, 100%, 25%))' }} className="w-full h-full" />
          </div>
          <span className="font-mono">+1.0</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
