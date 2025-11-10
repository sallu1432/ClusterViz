
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ClusteringResults } from "@/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FeatureCorrelationHeatmapProps {
  data: ClusteringResults['feature_correlation'];
}

const getColors = (value: number | null) => {
    if (value === null) return { backgroundColor: 'hsl(var(--muted))', textColor: 'hsl(var(--muted-foreground))' };
    
    // Blue for negative, Red for positive
    const h = value > 0 ? 0 : 210;
    const s = 100;
    const l = 100 - (Math.abs(value) * 60 + 15); // Lightness from 85% (for 0) to 25% (for 1/-1)

    const isDarkTheme = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
    
    let textColor: string;
    if (isDarkTheme) {
        textColor = l > 50 ? 'hsl(224 71.4% 4.1%)' : 'hsl(210 40% 98%)'; // Dark text on light colors, light text on dark colors
    } else {
        textColor = l > 50 ? 'hsl(224 71.4% 4.1%)' : 'hsl(0 0% 100%)'; // Dark text on light colors, white text on dark colors
    }

    return {
        backgroundColor: `hsl(${h}, ${s}%, ${l}%)`,
        textColor: textColor,
    };
};

const FeatureCorrelationHeatmap = ({ data }: FeatureCorrelationHeatmapProps) => {
  if (!data || data.matrix.length === 0) return null;

  const { features, matrix } = data;
  
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight">Feature Correlation Heatmap</CardTitle>
        <CardDescription>
            <span className="font-bold block mt-2 text-primary">Definition:</span>
            A correlation heatmap is a graphical representation of a correlation matrix, where the correlation coefficients between different variables are represented as colors.
            <br /><br />
            <span className="font-bold block text-primary">What It Explains:</span>
            This chart shows how different features in your dataset relate to each other. It helps answer the question, "When one feature's value increases, what happens to another's?". Understanding these relationships provides deep context about the structure of your data.
            <br /><br />
            <span className="font-bold block text-primary">Summary from the Chart:</span>
            Bright red cells indicate a strong positive correlation (e.g., +0.9), meaning as one feature increases, the other tends to increase. Bright blue cells show a strong negative correlation (e.g., -0.8), meaning as one increases, the other decreases. This helps spot redundant features and understand which variables move together.
        </CardDescription>
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
                      {matrix[i].map((value, j) => {
                         const { backgroundColor, textColor } = getColors(value);
                         return (
                          <Tooltip key={`${i}-${j}`} delayDuration={100}>
                              <TooltipTrigger asChild>
                                  <div
                                      className="w-full rounded-sm flex items-center justify-center aspect-square"
                                      style={{ backgroundColor }}
                                  >
                                      <span className="text-xs font-mono" style={{ color: textColor }}>{value?.toFixed(2)}</span>
                                  </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                  <p className="font-medium">{features[i]} &amp; {features[j]}: <span className="font-mono">{value?.toFixed(3) ?? 'N/A'}</span></p>
                              </TooltipContent>
                          </Tooltip>
                         )
                      })}
                  </React.Fragment>
              ))}
          </div>
        </TooltipProvider>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground w-64 mx-auto mt-4">
          <span className="font-mono">-1.0</span>
          <div className="flex-1 h-3 rounded-full overflow-hidden border">
             <div style={{ background: 'linear-gradient(to right, hsl(210, 100%, 25%), hsl(210, 100%, 85%), white, hsl(0, 100%, 85%), hsl(0, 100%, 25%))' }} className="w-full h-full" />
          </div>
          <span className="font-mono">+1.0</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCorrelationHeatmap;
